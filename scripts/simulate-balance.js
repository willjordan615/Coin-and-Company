import fs from 'fs';
import { Game } from '../engine/game.js';

const games = Number(process.argv[2] || 20);

const baseSeed = Number(process.argv[3] || 4242);
const seasonLimit = Number(process.argv[4] || 80);
const aiDifficulty = process.argv.slice(5).find(arg => !arg.startsWith('--')) || 'hard';
const jsonOutput = process.argv.includes('--json');
const eventOutput = process.argv.includes('--events');

function readJson(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p))];
}

function increment(map, key, amount = 1) {
  map[key] = (map[key] || 0) + amount;
}

function loadGame() {
  const game = new Game();
  game.render = () => {};
  game.bindDropSlots = () => {};
  game.openTraitChoice = () => {};
  game.data = {
    statuses: readJson('data/statuses.json'),
    recruits: readJson('data/recruits.json'),
    contractParts: readJson('data/contract_parts.json'),
    characterParts: readJson('data/character_parts.json'),
    firstNames: readJson('data/first_names.json'),
    lastNames: readJson('data/last_names.json'),
    aiProfiles: readJson('data/ai_profiles.json')
  };
  game.data.contracts = game.expandContracts(readJson('data/contracts.json'), game.data.contractParts, game.data.characterParts);
  return game;
}

async function allAiSeason(game) {
  for (const guild of game.snakeGuildOrder()) await game.aiTurn(guild);
  for (const guild of game.snakeGuildOrder()) game.resolveAIPlacements(guild);
  game.resolveSeasonContracts();
  if (game.checkVictory()) return;
  game.state.phase = 'seasonComplete';
}

function forceHeadlessHumanPhase(game) {
  game.state.activeGuildId = null;
  game.state.phase = 'awaitHuman';
  game.state.humanActionUsed = false;
}

function nextHeadlessSeason(game) {
  if (game.state.seasonIndex === 3) {
    if (game.state.year === 20) {
      game.endGame();
      return;
    }
    game.state.year++;
    game.state.seasonIndex = 0;
    game.state.starterIndex = (game.state.starterIndex + 1) % 4;
  } else {
    game.state.seasonIndex++;
  }
  for (const guild of game.state.guilds) guild.hiredThisSeason = false;
  if (game.state.seasonIndex === 0) game.startYear();
  if (game.state.startedSeasons > 0) game.evolveWorld();
  game.revealRosterTraits();
  if (game.state.startedSeasons > 0 || !game.state.boardContracts.length) game.refreshContracts();
  game.refreshTavernMarket(game.state.startedSeasons === 0);
  game.state.startedSeasons++;
  game.log(null, 'season', `Year ${game.state.year}, ${game.currentSeason()} begins.`);
  forceHeadlessHumanPhase(game);
}

function score(guild, goals) {
  return Object.entries(goals).reduce((sum, [stat, target]) => sum + ((guild[stat] || 0) / target) * 100, 0);
}

function laneProgress(guild, goals) {
  return Object.fromEntries(Object.entries(goals).map(([stat, target]) => [stat, (guild[stat] || 0) / target]));
}

async function runGame(seed) {
  const previousRandom = Math.random;
  Math.random = seededRandom(seed);
  try {
    const game = loadGame();
    const stats = {
      seed,
      seasons: 0,
      successes: 0,
      failures: 0,
      completedWork: [],
      successChances: [],
      failureChances: [],
      completionsByRisk: {},
      failuresByRisk: {},
      patronFavorTotals: {},
      patronFavorByProfile: {},
      facilityFavorTotals: {},
      boardActive: [],
      boardOpen: [],
      lockedWorkers: [],
      availableWorkers: [],
      rosters: [],
      finalGuilds: [],
      profileResults: {}
    };

    const recordSuccess = (guild, contract, chance) => {
      const profileId = guild.personality?.id || 'unknown';
      stats.successes++;
      stats.completedWork.push(contract.workSeasons || 1);
      stats.successChances.push(chance);
      increment(stats.completionsByRisk, contract.risk);
      stats.profileResults[profileId] = stats.profileResults[profileId] || { successes: 0, failures: 0 };
      stats.profileResults[profileId].successes++;
    };
    const recordFailure = (guild, contract) => {
      const profileId = guild.personality?.id || 'unknown';
      const eventKey = `${game.state.year}-${game.state.seasonIndex}-${contract.instanceId || contract.id}`;
      stats.failureEvents = stats.failureEvents || new Set();
      if (!stats.failureEvents.has(eventKey)) {
        stats.failureEvents.add(eventKey);
        stats.failures++;
        increment(stats.failuresByRisk, contract.risk);
      }
      stats.profileResults[profileId] = stats.profileResults[profileId] || { successes: 0, failures: 0 };
      stats.profileResults[profileId].failures++;
    };

    const originalPrimaryAward = game.awardPrimaryContract.bind(game);
    game.awardPrimaryContract = (contract, guild, chance, verb) => {
      recordSuccess(guild, contract, chance);
      originalPrimaryAward(contract, guild, chance, verb);
    };

    const originalCooperativeAward = game.awardCooperativeContract.bind(game);
    game.awardCooperativeContract = (contract, claimant, participants, chance) => {
      recordSuccess(claimant, contract, chance);
      originalCooperativeAward(contract, claimant, participants, chance);
    };

    const originalApplyFailure = game.applyFailure.bind(game);
    game.applyFailure = (guild, contract) => {
      recordFailure(guild, contract);
      originalApplyFailure(guild, contract);
    };

    game.newGame();
    game.menuOpen = false;
    game.pickAiProfiles(4).forEach((profile, index) => {
      const personality = game.aiPersonalityForPlayer({control: 'ai', difficulty: aiDifficulty, personalityId: profile.id}, profile);
      game.state.guilds[index].personality = personality;
      game.state.guilds[index].name = personality.defaultName || personality.label || game.state.guilds[index].name;
    });
    while (game.state.phase === 'setup') {
      const guild = game.currentSetupGuild();
      if (!guild) break;
      if (guild.human) {
        game.draftFounderForGuild(guild, game.chooseRecruit(guild, game.state.tavern) || game.state.tavern[0]);
        game.advanceSetupDraft();
      } else {
        await game.aiDraftFounder(guild);
      }
    }
    game.state.guilds.forEach(guild => { guild.human = false; });
    forceHeadlessHumanPhase(game);

    while (game.state.phase !== 'gameOver' && (stats.seasons < seasonLimit || game.state.phase === 'seasonComplete')) {
      if (game.state.phase === 'awaitHuman') {
        stats.seasons++;
        stats.boardActive.push(game.state.boardContracts.filter(c => game.hasContractPlacements(c)).length);
        stats.boardOpen.push(game.state.boardContracts.filter(c => c.offerSeasons > 0).length);
        stats.lockedWorkers.push(game.state.guilds.reduce((sum, guild) => sum + guild.roster.filter(c => c.placement?.type === 'contract').length, 0));
        stats.availableWorkers.push(game.state.guilds.reduce((sum, guild) => sum + game.availableWorkers(guild).length, 0));
        await allAiSeason(game);
      } else if (game.state.phase === 'seasonComplete') {
        nextHeadlessSeason(game);
      } else {
        break;
      }
    }

    const goals = game.victoryGoals();
    stats.finalGuilds = game.state.guilds.map(guild => ({
      name: guild.name,
      profileId: guild.personality?.id || 'unknown',
      profile: guild.personality?.label || 'Unknown',
      identity: game.guildIdentity(guild).label,
      score: score(guild, goals),
      gold: guild.gold,
      reputation: guild.reputation,
      completed: guild.completed,
      resources: guild.resources,
      connections: guild.connections,
      engineTraits: guild.roster.filter(c => c.alive).reduce((sum, c) => sum + game.visibleTraits(c).filter(t => game.data.characterParts.traitEffects?.[t]?.length).length, 0),
      roster: guild.roster.filter(c => c.alive).length,
      dead: guild.roster.filter(c => !c.alive).length,
      conditions: guild.roster.reduce((sum, c) => sum + (c.conditions?.filter(x => x.key !== 'Dead').length || 0), 0)
    })).map(guild => ({...guild, laneProgress: laneProgress(guild, goals)})).sort((a, b) => b.score - a.score).map((guild, index) => ({...guild, rank: index + 1}));
    for (const guild of game.state.guilds) {
      const profileId = guild.personality?.id || 'unknown';
      for (const [patronKey, favor] of Object.entries(guild.patronFavor || {})) {
        const patron = game.patronDef(patronKey);
        increment(stats.patronFavorTotals, patronKey, favor);
        increment(stats.facilityFavorTotals, patron?.facility || 'unknown', favor);
        stats.patronFavorByProfile[profileId] = stats.patronFavorByProfile[profileId] || {};
        increment(stats.patronFavorByProfile[profileId], patronKey, favor);
      }
    }

    const ending = game.state.log.find(entry => entry.type === 'game' && (/wins /.test(entry.summary) || /campaign ends/.test(entry.summary)));
    stats.completionYear = game.state.year;
    stats.completionSeason = game.currentSeason();
    stats.completionSeasonIndex = game.state.seasonIndex;
    stats.completionProgress = game.state.year + game.state.seasonIndex / 4;
    stats.endedBy = ending?.summary?.includes('no victory-lane winner') ? 'twenty-year limit' : ending?.summary?.includes('wins by') ? 'victory threshold' : stats.seasons >= seasonLimit ? 'season limit' : 'unknown';
    stats.endingSummary = ending?.summary || '';
    delete stats.failureEvents;
    stats.rosters = stats.finalGuilds.map(g => g.roster);
    stats.dead = stats.finalGuilds.reduce((sum, g) => sum + g.dead, 0);
    stats.conditions = stats.finalGuilds.reduce((sum, g) => sum + g.conditions, 0);
    stats.topGuild = stats.finalGuilds[0].name;
    stats.winner = stats.endedBy === 'victory threshold' ? (stats.endingSummary.match(/^(.*?) wins by/)?.[1] || stats.finalGuilds[0].name) : null;
    stats.winnerDetails = stats.winner ? stats.finalGuilds.find(guild => guild.name === stats.winner) : null;
    if (eventOutput && stats.winner) {
      stats.winnerEvents = game.state.log
        .filter(entry => entry.guildId === game.state.guilds.find(guild => guild.name === stats.winner)?.id)
        .map(entry => entry.summary)
        .filter(summary => /Resources|Connection|ready|Ready|facility|exploited|Reputation|Gold|Contracts|wins by/.test(summary))
        .slice(-80);
    }
    stats.topScore = stats.finalGuilds[0].score;

    return stats;
  } finally {
    Math.random = previousRandom;
  }
}

const results = [];
for (let i = 0; i < games; i++) results.push(await runGame(baseSeed + i * 9973));
const allSuccessChances = results.flatMap(r => r.successChances);
const allFailureChances = results.flatMap(r => r.failureChances);
const allWork = results.flatMap(r => r.completedWork);
const thresholdWinners = {};
const topGuilds = {};
const risks = {};
const patronFavor = {};
const facilityFavor = {};
const patronFavorByProfile = {};
const laneProgressValues = {};
const topGuildLaneProgressValues = {};
const profileStats = {};
function profileBucket(id, label = id) {
  profileStats[id] = profileStats[id] || {
    id,
    label,
    appearances: 0,
    wins: 0,
    topFinishes: 0,
    rank: [],
    score: [],
    gold: [],
    reputation: [],
    completed: [],
    resources: [],
    connections: [],
    roster: [],
    dead: [],
    conditions: [],
    engineTraits: [],
    successes: 0,
    failures: 0
  };
  return profileStats[id];
}
for (const result of results) {
  if (result.winner) increment(thresholdWinners, result.winner);
  increment(topGuilds, result.topGuild);
  for (const [risk, count] of Object.entries(result.completionsByRisk)) increment(risks, `${risk} success`, count);
  for (const [risk, count] of Object.entries(result.failuresByRisk)) increment(risks, `${risk} fail`, count);
  for (const [patron, favor] of Object.entries(result.patronFavorTotals || {})) increment(patronFavor, patron, favor);
  for (const [facility, favor] of Object.entries(result.facilityFavorTotals || {})) increment(facilityFavor, facility, favor);
  for (const [profileId, patrons] of Object.entries(result.patronFavorByProfile || {})) {
    patronFavorByProfile[profileId] = patronFavorByProfile[profileId] || {};
    for (const [patron, favor] of Object.entries(patrons)) increment(patronFavorByProfile[profileId], patron, favor);
  }
  for (const guild of result.finalGuilds) {
    const bucket = profileBucket(guild.profileId, guild.profile);
    bucket.appearances++;
    if (guild.rank === 1) bucket.topFinishes++;
    if (guild.name === result.winner) bucket.wins++;
    for (const key of ['rank', 'score', 'gold', 'reputation', 'completed', 'resources', 'connections', 'roster', 'dead', 'conditions', 'engineTraits']) bucket[key].push(guild[key]);
    for (const [lane, progress] of Object.entries(guild.laneProgress || {})) {
      laneProgressValues[lane] = laneProgressValues[lane] || [];
      laneProgressValues[lane].push(progress);
      if (guild.rank === 1) {
        topGuildLaneProgressValues[lane] = topGuildLaneProgressValues[lane] || [];
        topGuildLaneProgressValues[lane].push(progress);
      }
    }
  }
  for (const [profileId, counts] of Object.entries(result.profileResults)) {
    const bucket = profileBucket(profileId);
    bucket.successes += counts.successes || 0;
    bucket.failures += counts.failures || 0;
  }
}

const profiles = Object.values(profileStats)
  .map(profile => ({
    id: profile.id,
    label: profile.label,
    appearances: profile.appearances,
    wins: profile.wins,
    topFinishes: profile.topFinishes,
    winRate: profile.wins / Math.max(1, profile.appearances),
    topFinishRate: profile.topFinishes / Math.max(1, profile.appearances),
    avgRank: average(profile.rank),
    avgScore: average(profile.score),
    avgGold: average(profile.gold),
    avgReputation: average(profile.reputation),
    avgCompleted: average(profile.completed),
    avgResources: average(profile.resources),
    avgConnections: average(profile.connections),
    avgRoster: average(profile.roster),
    avgDead: average(profile.dead),
    avgConditions: average(profile.conditions),
    avgEngineTraits: average(profile.engineTraits),
    completionRate: profile.successes / Math.max(1, profile.successes + profile.failures)
  }))
  .sort((a, b) => b.avgScore - a.avgScore);

const summary = {
  games,
  avgSuccesses: average(results.map(r => r.successes)),
  avgFailures: average(results.map(r => r.failures)),
  completionRate: results.reduce((sum, r) => sum + r.successes, 0) / Math.max(1, results.reduce((sum, r) => sum + r.successes + r.failures, 0)),
  avgSuccessChance: average(allSuccessChances),
  avgFailureChance: average(allFailureChances),
  successChanceP10: percentile(allSuccessChances, 0.1),
  avgCompletedWorkSeasons: average(allWork),
  avgBoardActive: average(results.flatMap(r => r.boardActive)),
  avgBoardOpen: average(results.flatMap(r => r.boardOpen)),
  avgLockedWorkers: average(results.flatMap(r => r.lockedWorkers)),
  avgAvailableWorkers: average(results.flatMap(r => r.availableWorkers)),
  avgDead: average(results.map(r => r.dead)),
  avgConditions: average(results.map(r => r.conditions)),
  avgTopScore: average(results.map(r => r.topScore)),
  avgCompletionYear: average(results.map(r => r.completionProgress)),
  avgLaneProgress: Object.fromEntries(Object.entries(laneProgressValues).map(([lane, values]) => [lane, average(values)])),
  avgTopGuildLaneProgress: Object.fromEntries(Object.entries(topGuildLaneProgressValues).map(([lane, values]) => [lane, average(values)])),
  maxLaneProgress: Object.fromEntries(Object.entries(laneProgressValues).map(([lane, values]) => [lane, Math.max(...values)])),
  nearThresholds: Object.fromEntries(Object.entries(laneProgressValues).map(([lane, values]) => [lane, values.filter(value => value >= 0.9).length])),
  completionYears: results.reduce((map, result) => {
    increment(map, `${result.completionYear} ${result.completionSeason}`);
    return map;
  }, {}),
  endings: results.map(result => ({
    seed: result.seed,
    endedBy: result.endedBy,
    winner: result.winner,
    winnerProfile: result.winnerDetails?.profile || null,
    winnerProfileId: result.winnerDetails?.profileId || null,
    topGuild: result.topGuild,
    completionYear: result.completionYear,
    completionSeason: result.completionSeason,
    summary: result.endingSummary
  })),
  endingReasons: results.reduce((map, result) => {
    increment(map, result.endedBy);
    return map;
  }, {}),
  thresholdWinners,
  topGuilds,
  risks,
  topPatrons: Object.entries(patronFavor).sort((a, b) => b[1] - a[1]).slice(0, 8),
  facilityFavor: Object.entries(facilityFavor).sort((a, b) => b[1] - a[1])
};

const samples = results.slice(0, Math.min(3, games)).map(result => ({
  seed: result.seed,
  winner: result.winner,
  topGuild: result.topGuild,
  endedBy: result.endedBy,
  completionYear: result.completionYear,
  completionSeason: result.completionSeason,
  topScore: result.topScore,
  successes: result.successes,
  failures: result.failures,
  finalGuilds: result.finalGuilds
}));

function percent(value) {
  return `${Math.round(value * 100)}%`;
}

function fixed(value, digits = 2) {
  return Number.isFinite(value) ? value.toFixed(digits) : '0';
}

function mapLine(map) {
  const entries = Object.entries(map || {});
  return entries.length ? entries.map(([key, value]) => `${key}: ${value}`).join(', ') : 'none';
}

function laneLine(map) {
  return Object.entries(map || {}).map(([lane, value]) => `${lane} ${percent(value)}`).join(', ');
}

function readableReport() {
  const thresholdGames = summary.endingReasons['victory threshold'] || 0;
  const limitGames = summary.endingReasons['twenty-year limit'] || 0;
  const lines = [
    `Balance simulation: ${summary.games} games, seed ${baseSeed}, ${seasonLimit} season cap, ${aiDifficulty} AI`,
    `Endings: ${thresholdGames} threshold wins, ${limitGames} twenty-year limits, avg end year ${fixed(summary.avgCompletionYear)}`,
    `Completion rate: ${percent(summary.completionRate)}, avg successes/failures ${fixed(summary.avgSuccesses, 1)}/${fixed(summary.avgFailures, 1)}, P10 success chance ${summary.successChanceP10}%`,
    `Average lane progress: ${laneLine(summary.avgLaneProgress)}`,
    `Average top-guild lane progress: ${laneLine(summary.avgTopGuildLaneProgress)}`,
    `Max lane progress: ${laneLine(summary.maxLaneProgress)}`,
    `Near-threshold guild lanes (>=90%): ${mapLine(summary.nearThresholds)}`,
    `Threshold winners: ${mapLine(summary.thresholdWinners)}`,
    `Top final scorers: ${mapLine(summary.topGuilds)}`,
    '',
    'Endings:',
    ...summary.endings.map(result => `- ${result.seed}: ${result.completionYear} ${result.completionSeason} - ${result.winnerProfile?`${result.winnerProfile} - `:''}${result.summary || result.endedBy}`),
    '',
    'Profiles:',
    ...profiles.map(profile => `- ${profile.label}: wins ${profile.wins}/${profile.appearances}, top finishes ${profile.topFinishes}, avg rank ${fixed(profile.avgRank)}, avg score ${fixed(profile.avgScore, 1)}, lanes G ${fixed(profile.avgGold, 0)} / R ${fixed(profile.avgReputation, 0)} / D ${fixed(profile.avgCompleted, 1)} / Res ${fixed(profile.avgResources, 1)} / Conn ${fixed(profile.avgConnections, 1)}`),
    '',
    `Top patrons: ${summary.topPatrons.map(([patron, favor]) => `${patron} ${favor}`).join(', ')}`,
    `Facility favor: ${summary.facilityFavor.map(([facility, favor]) => `${facility} ${favor}`).join(', ')}`
  ];
  return lines.join('\n');
}

if (jsonOutput) {
  console.log(JSON.stringify({ summary, profiles, samples }, null, 2));
} else {
  console.log(readableReport());
  if (eventOutput) {
    for (const result of results.filter(result => result.winnerEvents?.length)) {
      console.log(`\nWinner events for ${result.seed} (${result.winner}):`);
      for (const event of result.winnerEvents) console.log(`  ${event}`);
    }
  }
}
