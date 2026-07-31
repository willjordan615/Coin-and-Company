import fs from 'fs';
import { Game } from '../engine/game.js';

const games = Number(process.argv[2] || 20);
const baseSeed = Number(process.argv[3] || 4242);
const seasonLimit = Number(process.argv[4] || 80);

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

function allAiSeason(game) {
  for (const guild of game.snakeGuildOrder()) game.aiTurn(guild);
  for (const guild of game.snakeGuildOrder()) game.resolveAIPlacements(guild);
  game.state.phase = 'seasonComplete';
}

function score(guild) {
  return guild.reputation + guild.completed + guild.gold / 10;
}

function runGame(seed) {
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
      boardActive: [],
      boardOpen: [],
      lockedWorkers: [],
      availableWorkers: [],
      rosters: [],
      finalGuilds: [],
      profileResults: {}
    };

    const originalSuccess = game.succeedBoardContract.bind(game);
    game.succeedBoardContract = (guild, contract, chance) => {
      const profileId = guild.personality?.id || 'unknown';
      stats.successes++;
      stats.completedWork.push(contract.workSeasons || 1);
      stats.successChances.push(chance);
      increment(stats.completionsByRisk, contract.risk);
      stats.profileResults[profileId] = stats.profileResults[profileId] || { successes: 0, failures: 0 };
      stats.profileResults[profileId].successes++;
      originalSuccess(guild, contract, chance);
    };

    const originalFailure = game.failBoardContract.bind(game);
    game.failBoardContract = (guild, contract, chance) => {
      const profileId = guild.personality?.id || 'unknown';
      stats.failures++;
      stats.failureChances.push(chance);
      increment(stats.failuresByRisk, contract.risk);
      stats.profileResults[profileId] = stats.profileResults[profileId] || { successes: 0, failures: 0 };
      stats.profileResults[profileId].failures++;
      originalFailure(guild, contract, chance);
    };

    game.newGame();
    game.pickAiProfiles(4).forEach((profile, index) => { game.state.guilds[index].personality = profile; });
    while (game.state.phase === 'setup') {
      const guild = game.currentSetupGuild();
      if (!guild) break;
      if (guild.human) game.draftFounder(game.chooseRecruit(guild, game.state.tavern)?.id || game.state.tavern[0].id);
      else game.aiDraftFounder(guild);
    }
    game.state.guilds.forEach(guild => { guild.human = false; });

    while (game.state.phase !== 'gameOver' && stats.seasons < seasonLimit) {
      if (game.state.phase === 'awaitHuman') {
        stats.seasons++;
        stats.boardActive.push(game.state.boardContracts.filter(c => game.hasContractPlacements(c)).length);
        stats.boardOpen.push(game.state.boardContracts.filter(c => c.offerSeasons > 0).length);
        stats.lockedWorkers.push(game.state.guilds.reduce((sum, guild) => sum + guild.roster.filter(c => c.placement?.type === 'contract').length, 0));
        stats.availableWorkers.push(game.state.guilds.reduce((sum, guild) => sum + game.availableWorkers(guild).length, 0));
        allAiSeason(game);
      } else if (game.state.phase === 'seasonComplete') {
        game.nextSeason();
      } else {
        break;
      }
    }

    stats.finalGuilds = game.state.guilds.map(guild => ({
      name: guild.name,
      profileId: guild.personality?.id || 'unknown',
      profile: guild.personality?.label || 'Unknown',
      identity: game.guildIdentity(guild).label,
      score: score(guild),
      gold: guild.gold,
      reputation: guild.reputation,
      completed: guild.completed,
      engineTraits: guild.roster.filter(c => c.alive).reduce((sum, c) => sum + game.visibleTraits(c).filter(t => game.data.characterParts.traitEffects?.[t]?.length).length, 0),
      roster: guild.roster.filter(c => c.alive).length,
      dead: guild.roster.filter(c => !c.alive).length,
      conditions: guild.roster.reduce((sum, c) => sum + (c.conditions?.filter(x => x.key !== 'Dead').length || 0), 0)
    })).sort((a, b) => b.score - a.score).map((guild, index) => ({...guild, rank: index + 1}));
    stats.rosters = stats.finalGuilds.map(g => g.roster);
    stats.dead = stats.finalGuilds.reduce((sum, g) => sum + g.dead, 0);
    stats.conditions = stats.finalGuilds.reduce((sum, g) => sum + g.conditions, 0);
    stats.winner = stats.finalGuilds[0].name;
    stats.topScore = stats.finalGuilds[0].score;
    return stats;
  } finally {
    Math.random = previousRandom;
  }
}

const results = Array.from({ length: games }, (_, i) => runGame(baseSeed + i * 9973));
const allSuccessChances = results.flatMap(r => r.successChances);
const allFailureChances = results.flatMap(r => r.failureChances);
const allWork = results.flatMap(r => r.completedWork);
const winners = {};
const risks = {};
const profileStats = {};
function profileBucket(id, label = id) {
  profileStats[id] = profileStats[id] || {
    id,
    label,
    appearances: 0,
    wins: 0,
    rank: [],
    score: [],
    gold: [],
    reputation: [],
    completed: [],
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
  increment(winners, result.winner);
  for (const [risk, count] of Object.entries(result.completionsByRisk)) increment(risks, `${risk} success`, count);
  for (const [risk, count] of Object.entries(result.failuresByRisk)) increment(risks, `${risk} fail`, count);
  for (const guild of result.finalGuilds) {
    const bucket = profileBucket(guild.profileId, guild.profile);
    bucket.appearances++;
    if (guild.rank === 1) bucket.wins++;
    for (const key of ['rank', 'score', 'gold', 'reputation', 'completed', 'roster', 'dead', 'conditions', 'engineTraits']) bucket[key].push(guild[key]);
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
    winRate: profile.wins / Math.max(1, profile.appearances),
    avgRank: average(profile.rank),
    avgScore: average(profile.score),
    avgGold: average(profile.gold),
    avgReputation: average(profile.reputation),
    avgCompleted: average(profile.completed),
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
  winners,
  risks
};

const samples = results.slice(0, Math.min(3, games)).map(result => ({
  seed: result.seed,
  winner: result.winner,
  topScore: result.topScore,
  successes: result.successes,
  failures: result.failures,
  finalGuilds: result.finalGuilds
}));

console.log(JSON.stringify({ summary, profiles, samples }, null, 2));
