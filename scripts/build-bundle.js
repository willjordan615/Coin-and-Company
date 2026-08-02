const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const readJson = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

const guildData = {
  statuses: readJson('data/statuses.json'),
  recruits: readJson('data/recruits.json'),
  contracts: readJson('data/contracts.json')
};
const contractParts = readJson('data/contract_parts.json');
const characterParts = readJson('data/character_parts.json');
const firstNames = readJson('data/first_names.json');
const lastNames = readJson('data/last_names.json');
const aiProfiles = readJson('data/ai_profiles.json');

let engine = fs.readFileSync(path.join(root, 'engine/game.js'), 'utf8');
engine = engine.replace(/^export class Game/m, 'class Game');
engine = engine.replace(
  /async init\(\) \{[\s\S]*?\r?\n  \}\r?\n\r?\n  newGame[^{]*\{/,
  `init() {\n    this.data = {...GUILD_DATA,contractParts:CONTRACT_PARTS,characterParts:CHARACTER_PARTS,firstNames:FIRST_NAMES,lastNames:LAST_NAMES,contracts:this.expandContracts(GUILD_DATA.contracts,CONTRACT_PARTS,CHARACTER_PARTS)};\n    this.newGame();\n  }\n\n  newGame(matchSetup=this.defaultMatchSetup()) {`
);

engine = engine.replace(
  `this.data = {...GUILD_DATA,contractParts:CONTRACT_PARTS,characterParts:CHARACTER_PARTS,firstNames:FIRST_NAMES,lastNames:LAST_NAMES,contracts:this.expandContracts(GUILD_DATA.contracts,CONTRACT_PARTS,CHARACTER_PARTS)};`,
  `this.data = {...GUILD_DATA,contractParts:CONTRACT_PARTS,characterParts:CHARACTER_PARTS,firstNames:FIRST_NAMES,lastNames:LAST_NAMES,aiProfiles:AI_PROFILES,contracts:this.expandContracts(GUILD_DATA.contracts,CONTRACT_PARTS,CHARACTER_PARTS)};`
);

if (/fetch\('\.\/data\//.test(engine) || /^async init\(\)/m.test(engine)) {
  throw new Error('Failed to convert engine init() into standalone bundled data init().');
}

const bundle = `const GUILD_DATA = ${JSON.stringify(guildData, null, 2)};\n\nconst CONTRACT_PARTS = ${JSON.stringify(contractParts, null, 2)};\n\nconst FIRST_NAMES = ${JSON.stringify(firstNames, null, 2)};\n\nconst LAST_NAMES = ${JSON.stringify(lastNames, null, 2)};\n\nconst CHARACTER_PARTS = ${JSON.stringify(characterParts, null, 2)};\n\nconst AI_PROFILES = ${JSON.stringify(aiProfiles, null, 2)};\n\n${engine}\n\nconst game = new Game();\ngame.init();\ngame.bindUI();\ngame.render();\n`;

fs.writeFileSync(path.join(root, 'bundle.js'), bundle);
console.log('bundle.js built');
