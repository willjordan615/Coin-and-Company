const SEASONS = ['Winter','Spring','Summer','Fall'];
const SAVE_KEY = 'coin-and-company-save-v1';

export class Game {
  constructor() {
    this.state = null;
    this.data = {};
    this.ui = {};
    this.pendingGuildName = 'Amber Company';
    this.menuOpen = true;
    this.isSimulation = false;
  }

  async init() {
    const [statuses,recruits,contracts,contractParts,characterParts,firstNames,lastNames,aiProfiles] = await Promise.all([
      fetch('./data/statuses.json').then(r=>r.json()),
      fetch('./data/recruits.json').then(r=>r.json()),
      fetch('./data/contracts.json').then(r=>r.json()),
      fetch('./data/contract_parts.json').then(r=>r.json()),
      fetch('./data/character_parts.json').then(r=>r.json()),
      fetch('./data/first_names.json').then(r=>r.json()),
      fetch('./data/last_names.json').then(r=>r.json()),
      fetch('./data/ai_profiles.json').then(r=>r.json())
    ]);
    this.data = {statuses,recruits,contractParts,characterParts,firstNames,lastNames,aiProfiles,contracts:this.expandContracts(contracts,contractParts,characterParts)};
    this.newGame();
  }

  newGame() {
    const rivals=this.pickAiProfiles(3);
    this.state = {
      year:1, seasonIndex:0, phase:'setup', starterIndex:this.randomInt(0,3), humanActionUsed:false,
      tavern:[],
      contractDeck:this.shuffle(this.data.contracts.map(c=>structuredClone(c))),
      boardContracts:[], log:[], nextContractInstance:1, nextCharacterInstance:1, tavernHasNew:true, tavernOpen:true,
      world:this.makeWorld(), startedSeasons:0, pendingTraitChoice:null, setupDraftIndex:0, setupDraftPending:false, activeGuildId:null,
      guilds:[
        this.makeGuild('amber-company',this.cleanGuildName(this.pendingGuildName),true),
        this.makeGuild('white-raven','White Raven',false,rivals[0]),
        this.makeGuild('iron-oath','Iron Oath',false,rivals[1]),
        this.makeGuild('green-lantern','Green Lantern',false,rivals[2])
      ]
    };
    this.refillTavern();
    this.log(null,'game',`A new twenty-year contest begins in ${this.state.world.name}.`);
    this.refreshContracts();
    this.state.activeGuildId=this.currentSetupGuild()?.id||null;
  }

  expandContracts(baseContracts,parts,characterParts) {
    const settings=parts.settings;
    const limits=settings.limits;
    const professionNames=new Set(characterParts.professions.map(p=>p.name));
    const coverageTags=[...new Set(characterParts.traits.filter(t=>!professionNames.has(t)))];
    const generated=[];
    for(const job of parts.jobs) for(const patron of parts.patrons) for(const twist of parts.twists) {
      const coverageTag=coverageTags[generated.length%coverageTags.length];
      const difficulty=job.difficulty+patron.difficulty+twist.difficulty;
      const rewardGold=Math.max(settings.minRewardGold,Math.round((job.gold+patron.gold+twist.gold)*(settings.rewardGoldScale||1)));
      const rewardRep=Math.max(settings.minRewardReputation,job.rep+patron.rep+twist.rep);
      const contract={
        id:`${job.key}-${patron.key}-${twist.key}`,
        title:`${twist.label}${job.title} for ${patron.name}`,
        type:job.type,
        risk:twist.risk,
        description:`${job.desc} Patron: ${patron.name}.`,
        patron:{key:patron.key,name:patron.name,trait:patron.trait},
        workSeasons:this.clamp(job.work+twist.work,...limits.workSeasons),
        offerSeasons:this.clamp(job.offer+twist.offer,...limits.offerSeasons),
        baseDifficulty:difficulty,
        requirements:job.traits.map((trait,i)=>({trait,weight:settings.requirementWeights[i]||settings.requirementWeights.at(-1)})),
        materials:this.clamp(job.materials+(settings.materialBonusByTwist[twist.key]||0),...limits.materials),
        support:[...new Set([...job.support,patron.trait,coverageTag])].filter(Boolean).map((trait,i)=>({trait,weight:settings.supportWeights[i]||settings.supportWeights.at(-1)})),
        reward:{gold:rewardGold,reputation:rewardRep},
        failure:twist.failure
      };
      contract.pool=this.contractPoolFor(contract,parts);
      generated.push(contract);
    }
    const base=baseContracts.map(c=>{const contract=structuredClone(c);contract.pool=this.contractPoolFor(contract,parts);return contract;});
    return [...base,...generated];
  }

  contractPoolFor(contract,parts=this.data.contractParts) {
    const tags=this.contractTags(contract);
    return parts.world.pools.find(p=>p.types?.includes(contract.type)||p.traits?.some(t=>tags.includes(t)))?.key||'Civic';
  }
  contractTags(contract){return [...contract.requirements.map(r=>r.trait),...contract.support.map(r=>r.trait)];}
  poolForTag(tag){
    const affinity=this.data.characterParts.tagAffinities?.[tag];
    const domains=affinity?.domains||[];
    return this.data.contractParts.world.pools.find(pool=>domains.includes(pool.key)||pool.types?.some(type=>domains.includes(type))||pool.traits?.includes(tag))?.key||null;
  }
  secondaryContractPool(contract){
    const tags=[contract.patron?.trait,...(contract.support||[]).map(r=>r.trait),...(contract.requirements||[]).map(r=>r.trait)].filter(Boolean);
    return tags.map(tag=>this.poolForTag(tag)).find(pool=>pool&&pool!==contract.pool)||contract.pool;
  }
  poolAccent(pool){
    const colors={
      Agriculture:'72, 143, 90',
      Military:'190, 81, 75',
      Commerce:'84, 156, 104',
      Exploration:'70, 150, 160',
      Religion:'168, 139, 211',
      Civic:'214, 174, 78',
      Crafting:'178, 139, 92'
    };
    return colors[pool]||'197, 154, 84';
  }
  contractAccentStyle(contract){
    const primary=this.poolAccent(contract.pool);
    const secondary=this.poolAccent(this.secondaryContractPool(contract));
    return `--pool-a:${primary};--pool-b:${secondary};`;
  }

  makeWorld() {
    const template=this.pick(this.data.contractParts.world.starts);
    const values={};
    for(const [key,range] of Object.entries(template.ranges)) values[key]=this.randomInt(range[0],range[1]);
    return {name:template.name,values,trend:{},lastShift:'Starting conditions vary from game to game.'};
  }

  makeGuild(id,name,human,personality=null) {
    return {
      id,name,human,personality,
      gold:0,reputation:0,completed:0,roster:[],resources:2,connections:1,
      poolWins:{}
    };
  }
  pickAiProfiles(count,profiles=this.data.aiProfiles||[]){
    return this.shuffle(profiles).slice(0,count).map(profile=>structuredClone(profile));
  }
  cleanGuildName(name){return String(name||'').trim().slice(0,28)||'Amber Company';}
  aiProfileValue(guild,key,fallback){return guild.personality?.[key]??fallback;}
  makeCharacter(base) { const profession=this.pickProfession();const traits=this.pickTraits(profession);const allTraits=[profession.name,...traits].slice(0,this.maxTraits());const variance=this.data.characterParts.settings;const character={...structuredClone(base),templateId:base.id,id:`${base.id}-${this.state.nextCharacterInstance++}`,archetype:profession.name,status:profession.status,traits:allTraits,revealedTraits:[profession.name],revealAfterSeason:false,conditions:[],resources:this.clamp(profession.resources+this.randomInt(...variance.resourceVariance),0,5),connections:this.clamp(profession.connections+this.randomInt(...variance.connectionVariance),0,5),history:[],placement:null,alive:true,refusesGuildIds:[]};character.name=this.generateCharacterName(base);return character; }
  pickProfession(){
    const weights=this.data.characterParts.settings.professionStatusWeights||{};
    return this.weightedPick(this.data.characterParts.professions.map(profession=>({item:profession,weight:weights[profession.status]??1})))||this.pick(this.data.characterParts.professions);
  }
  pickTraits(profession) {
    const count=this.generatedTraitCount();
    return this.shuffle(this.data.characterParts.traits.filter(t=>t!==profession.name)).slice(0,Math.min(count,this.maxTraits()-1));
  }
  generatedTraitCount(){
    const weights=this.data.characterParts.settings.traitCountWeights||[{count:this.data.characterParts.settings.traitsPerCharacter||0,weight:1}];
    const total=weights.reduce((sum,row)=>sum+(row.weight||0),0);
    let roll=Math.random()*Math.max(1,total);
    for(const row of weights){
      roll-=row.weight||0;
      if(roll<=0)return row.count||0;
    }
    return weights.at(-1)?.count||0;
  }
  maxTraits(){return this.data.characterParts.settings.maxTraits||4;}
  secondaryTraitCount(c){return Math.max(0,(c.traits?.length||0)-1);}
  baseRecruitCost(c){return this.getStatus(c.status).recruitCost+this.secondaryTraitCount(c)*(this.data.characterParts.settings.traitRecruitCost||0);}
  characterSalary(c){return this.getStatus(c.status).salary+this.secondaryTraitCount(c)*(this.data.characterParts.settings.traitSalary||0);}
  generateCharacterName(base) { const used=new Set([...this.state.tavern,...this.state.guilds.flatMap(g=>g.roster)].map(c=>c.name));for(let i=0;i<20;i++){const first=this.pick(this.data.firstNames);const last=this.pick(this.data.lastNames);const name=`${first} ${last}`;if(!used.has(name))return name;}return `${base.name} ${this.state.nextCharacterInstance}`; }
  getStatus(id) { return this.data.statuses.find(s=>s.id===id); }
  currentSeason() { return SEASONS[this.state.seasonIndex]; }
  boardSize() { return this.data.contractParts.settings.boardSize; }
  pick(a) { return a[Math.floor(Math.random()*a.length)]; }
  randomInt(min,max) { return min+Math.floor(Math.random()*(max-min+1)); }
  shuffle(a) {
    const copy=[...a];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }
  clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
  humanGuild(){return this.state.guilds.find(g=>g.human);}
  guildName(id){return this.state.guilds.find(g=>g.id===id)?.name||id;}
  findCharacter(characterId){
    for(const guild of this.state.guilds){
      const character=guild.roster.find(c=>c.id===characterId);
      if(character)return {guild,character};
    }
    return null;
  }
  activeWorkers(guild){return guild.roster.filter(c=>c.alive);}
  availableWorkers(guild){return this.activeWorkers(guild).filter(c=>!this.isPlaced(c));}
  guildOrder() { return this.state.guilds.map((_,i)=>this.state.guilds[(this.state.starterIndex+i)%4]); }
  snakeGuildOrder(round=this.state.startedSeasons) { const order=this.guildOrder(); return round%2?[...order].reverse():order; }
  setupDraftOrder() { return this.snakeGuildOrder(0); }
  currentSetupGuild() { return this.setupDraftOrder()[this.state.setupDraftIndex]||null; }
  humanTurnSplit(round=this.state.startedSeasons) {
    const order=this.snakeGuildOrder(round);
    const humanIndex=order.findIndex(g=>g.human);
    if(humanIndex<0)return {before:order,after:[]};
    return {before:order.slice(0,humanIndex),after:order.slice(humanIndex+1)};
  }
  aiBeforeHuman() { return this.humanTurnSplit().before.filter(g=>!g.human); }
  aiAfterHuman() { return this.humanTurnSplit().after.filter(g=>!g.human); }
  reverseGuildOrder() { return [...this.guildOrder()].reverse(); }

  bindUI() {
    const $ = id => document.getElementById(id);
    this.ui = {date:$('dateLabel'),phase:$('phaseLabel'),guildGrid:$('guildGrid'),world:$('worldGrid'),peopleGrid:$('peopleGrid'),recoveryGrid:$('recoveryGrid'),recruitGrid:$('recruitGrid'),contractGrid:$('contractGrid'),facilityGrid:$('facilityGrid'),tavernPanel:$('tavernPanel'),tavernTitle:$('tavernTitle'),tavernEyebrow:$('tavernEyebrow'),tavernClose:$('tavernClose'),tavernBtn:$('tavernBtn'),characterPanel:$('characterPanel'),characterPanelTitle:$('characterPanelTitle'),characterPanelBody:$('characterPanelBody'),characterPanelClose:$('characterPanelClose'),advance:$('advanceBtn'),newGame:$('newGameBtn'),humanStatus:$('humanActionStatus'),entry:$('entryScreen'),guildName:$('guildNameInput'),singlePlayer:$('singlePlayerBtn'),loadGame:$('loadGameBtn'),multiplayer:$('multiplayerBtn'),settings:$('settingsBtn'),glossary:$('glossaryBtn'),settingsPanel:$('settingsPanel'),glossaryPanel:$('glossaryPanel'),glossaryBody:$('glossaryBody'),entryNote:$('entryNote'),aiPace:$('aiPaceSelect')};
    this.ui.newGame.addEventListener('click',()=>this.returnToMenu());
    this.ui.singlePlayer.addEventListener('click',()=>this.startSinglePlayer());
    this.ui.loadGame.addEventListener('click',()=>this.loadGame());
    this.ui.multiplayer.addEventListener('click',()=>this.showEntryNote('Multiplayer is a menu slot for now. The current build is local single player against AI guilds.'));
    this.ui.settings.addEventListener('click',()=>this.toggleEntryPanel('settings'));
    this.ui.glossary.addEventListener('click',()=>this.toggleEntryPanel('glossary'));
    this.ui.guildName.addEventListener('input',()=>{this.pendingGuildName=this.cleanGuildName(this.ui.guildName.value);});
    this.ui.aiPace.addEventListener('change',()=>{this.data.contractParts.settings.aiTurnDelayMs=Number(this.ui.aiPace.value)||550;this.showEntryNote(`AI turn pace set to ${this.ui.aiPace.options[this.ui.aiPace.selectedIndex].text}.`);});
    this.ui.advance.addEventListener('click',()=>this.advance());
    this.ui.tavernBtn.addEventListener('click',()=>{if(this.state.phase==='setup'&&!this.currentSetupGuild()?.human)return;this.state.tavernOpen=!this.state.tavernOpen;this.state.tavernHasNew=false;this.render();});
    this.ui.tavernClose.addEventListener('click',()=>this.closeTavern());
    this.ui.tavernPanel.addEventListener('click',evt=>{if(evt.target===this.ui.tavernPanel)this.closeTavern();});
    this.ui.characterPanelClose.addEventListener('click',()=>this.closeCharacterPanel());
    this.ui.characterPanel.addEventListener('click',evt=>{if(evt.target===this.ui.characterPanel)this.closeCharacterPanel();});
    this.ui.characterPanelBody.addEventListener('click',evt=>{
      const choice=evt.target.closest?.('[data-replace-trait]');
      if(choice){this.resolveTraitChoice(choice.dataset.replaceTrait);return;}
      const release=evt.target.closest?.('[data-release-merc]');
      if(release){this.releaseMerc(release.dataset.characterId,release.dataset.releaseMerc);return;}
      const character=evt.target.closest?.('[data-inspect-character]');
      if(character)this.openCharacterPanel(character.dataset.inspectCharacter);
    });
    this.ui.characterPanelBody.addEventListener('keydown',evt=>{
      if(evt.key!=='Enter'&&evt.key!==' ')return;
      const release=evt.target.closest?.('[data-release-merc]');
      if(release){evt.preventDefault();this.releaseMerc(release.dataset.characterId,release.dataset.releaseMerc);return;}
      const character=evt.target.closest?.('[data-inspect-character]');
      if(!character)return;
      evt.preventDefault();
      this.openCharacterPanel(character.dataset.inspectCharacter);
    });
    document.addEventListener('keydown',evt=>{if(evt.key==='Escape'){this.closeTavern();this.closeCharacterPanel();}});
    this.bindTooltips();
    this.renderGlossary();
    this.updateSaveUi();
  }

  openEntryScreen(panel='single'){
    this.menuOpen=true;
    this.closeTavern();
    this.closeCharacterPanel();
    this.ui.entry?.classList.remove('closed');
    if(this.ui.guildName)this.ui.guildName.value=this.cleanGuildName(this.pendingGuildName||this.humanGuild()?.name);
    this.toggleEntryPanel(panel,false);
    this.updateSaveUi();
  }
  closeEntryScreen(){this.menuOpen=false;this.ui.entry?.classList.add('closed');}
  returnToMenu(){
    const saved=this.saveGame({silent:true});
    this.openEntryScreen('single');
    this.showEntryNote(saved?'Game saved. Choose Single Player to start fresh or Load Game to resume this run.':'Choose Single Player to start fresh or Load Game to resume a saved run.');
  }
  startSinglePlayer(){
    this.pendingGuildName=this.cleanGuildName(this.ui.guildName?.value);
    this.newGame();
    this.closeEntryScreen();
    this.render();
  }
  toggleEntryPanel(panel,flip=true){
    const showSettings=panel==='settings'&&(flip?this.ui.settingsPanel.classList.contains('closed'):true);
    const showGlossary=panel==='glossary'&&(flip?this.ui.glossaryPanel.classList.contains('closed'):true);
    this.ui.settingsPanel?.classList.toggle('closed',!showSettings);
    this.ui.glossaryPanel?.classList.toggle('closed',!showGlossary);
  }
  showEntryNote(text){if(this.ui.entryNote)this.ui.entryNote.textContent=text;}
  hasStorage(){try{return typeof localStorage!=='undefined';}catch{return false;}}
  readSave(){
    if(!this.hasStorage())return null;
    try{return JSON.parse(localStorage.getItem(SAVE_KEY)||'null');}
    catch{return null;}
  }
  updateSaveUi(){
    const save=this.readSave();
    if(!this.ui.loadGame)return;
    this.ui.loadGame.textContent=save?.state?`Load Game`: 'Load Game';
    if(save?.state){
      const guild=save.state.guilds?.find(g=>g.human)?.name||'Saved Guild';
      const season=SEASONS[save.state.seasonIndex]||'Season';
      this.ui.loadGame.dataset.tip=`${guild}\nYear ${save.state.year} - ${season}\nSaved ${this.saveTimeLabel(save.savedAt)}.`;
      this.ui.loadGame.classList.add('has-tip');
    }else{
      this.ui.loadGame.dataset.tip='No saved game found in this browser.';
      this.ui.loadGame.classList.add('has-tip');
    }
  }
  saveTimeLabel(value){
    if(!value)return 'recently';
    const date=new Date(value);
    return Number.isNaN(date.getTime())?'recently':date.toLocaleString();
  }
  serializableState(){
    const state=structuredClone(this.state);
    if(this.state.pendingTraitChoice){
      const choice=this.state.pendingTraitChoice;
      state.pendingTraitChoice={guildId:choice.guild?.id||null,workerId:choice.worker?.id||null,facilityKey:choice.facility?.key||null,trait:choice.trait};
    }
    return state;
  }
  saveGame({silent=false}={}){
    if(!this.hasStorage()){this.showEntryNote('Save failed: browser storage is unavailable.');return false;}
    if(this.state.phase==='aiTurn'){this.log(null,'bad','Save skipped while AI turns are resolving.');this.render();return false;}
    const payload={version:1,savedAt:new Date().toISOString(),pendingGuildName:this.cleanGuildName(this.humanGuild()?.name||this.pendingGuildName),aiTurnDelayMs:this.data.contractParts.settings.aiTurnDelayMs,state:this.serializableState()};
    try{
      localStorage.setItem(SAVE_KEY,JSON.stringify(payload));
      this.pendingGuildName=payload.pendingGuildName;
      if(!silent)this.log(null,'game',`Game saved: ${payload.pendingGuildName}, Year ${this.state.year} - ${this.currentSeason()}.`);
      this.updateSaveUi();
      if(!silent)this.render();
      return true;
    }catch{
      if(!silent){this.log(null,'bad','Save failed: browser storage rejected the save file.');this.render();}
      return false;
    }
  }
  loadGame(){
    const save=this.readSave();
    if(!save?.state){this.showEntryNote('No saved game found in this browser.');this.updateSaveUi();return false;}
    this.state=save.state;
    this.data.contractParts.settings.aiTurnDelayMs=Number(save.aiTurnDelayMs)||this.data.contractParts.settings.aiTurnDelayMs;
    this.pendingGuildName=this.cleanGuildName(save.pendingGuildName||this.humanGuild()?.name);
    this.rehydrateLoadedState();
    this.log(null,'game',`Loaded saved game: ${this.pendingGuildName}, Year ${this.state.year} - ${this.currentSeason()}.`);
    if(this.ui.guildName)this.ui.guildName.value=this.pendingGuildName;
    if(this.ui.aiPace)this.ui.aiPace.value=String(this.data.contractParts.settings.aiTurnDelayMs);
    this.closeEntryScreen();
    this.closeTavern();
    this.closeCharacterPanel();
    this.render();
    if(this.state.pendingTraitChoice)this.openTraitChoice(this.state.pendingTraitChoice);
    else if(this.state.phase==='seasonComplete')this.openSeasonRecap();
    return true;
  }
  rehydrateLoadedState(){
    const choice=this.state.pendingTraitChoice;
    if(choice?.workerId){
      const guild=this.state.guilds.find(g=>g.id===choice.guildId);
      const worker=guild?.roster.find(c=>c.id===choice.workerId);
      const facility=this.facilityDef(choice.facilityKey);
      this.state.pendingTraitChoice=guild&&worker&&facility&&choice.trait?{guild,worker,facility,trait:choice.trait}:null;
    }
    if(this.state.phase==='aiTurn'){
      this.state.phase='awaitHuman';
      this.state.activeGuildId=this.humanGuild()?.id||null;
      this.state.humanActionUsed=false;
      this.log(null,'game','Loaded during an AI turn; returned control to the player.');
    }
  }
  renderGlossary(){
    if(!this.ui.glossaryBody)return;
    const settings=this.data.contractParts.settings;
    const facilities=this.data.contractParts.facilities.map(f=>`<li><strong>${this.escapeHtml(f.label)}</strong><span>Train traits through worker placement</span></li>`).join('');
    const pools=this.data.contractParts.world.pools.map(p=>`<li><strong>${this.escapeHtml(p.key)}</strong><span>${this.escapeHtml((p.types||[]).slice(0,4).join(', '))}</span></li>`).join('');
    this.ui.glossaryBody.innerHTML=`<section><h3>Core Rules</h3><p><strong>Contracts</strong> hold up to two workers per guild. Multi-season contracts keep workers committed until finished.</p><p><strong>Traits</strong> are the engine. Profession tags give about ${settings.requirementWeights[0]}% when demanded; support tags give about ${settings.supportWeights[0]}%.</p><p><strong>Hiring</strong> is limited to one paid tavern recruit per guild each season. Founders ignore reputation gates. Professionals require 10 reputation, gentry require 25, and nobles require 50.</p><p><strong>Resources</strong> are guild capacity. Contracts check them for odds, but do not spend them. <strong>Connections</strong> give +2% odds each on every contract.</p></section><section><h3>Facilities</h3><ul>${facilities}</ul></section><section><h3>Contract Pools</h3><ul>${pools}</ul></section>`;
  }

  closeTavern(){if(this.state.phase==='setup'&&!this.currentSetupGuild()?.human)return;this.state.tavernOpen=false;this.render();}
  closeCharacterPanel(){this.ui.characterPanel.classList.add('closed');}
  openCharacterPanel(characterId){
    const found=this.findCharacter(characterId);
    if(!found)return;
    const {guild,character}=found;
    this.state.selectedCharacterId=character.id;
    this.ui.characterPanelTitle.textContent=character.name;
    this.ui.characterPanelBody.innerHTML=this.characterCard(character,{showHistory:true,showAllTraits:true,guild});
    this.ui.characterPanel.classList.remove('closed');
  }
  openGuildPanel(guildId){
    const guild=this.state.guilds.find(g=>g.id===guildId);
    if(!guild)return;
    this.ui.characterPanelTitle.textContent=guild.name;
    this.ui.characterPanelBody.innerHTML=this.guildInspectionHtml(guild);
    this.ui.characterPanel.classList.remove('closed');
  }
  openSeasonRecap(){
    if(!this.ui.characterPanel||this.state.phase!=='seasonComplete')return;
    const entries=this.state.log.filter(entry=>entry.year===this.state.year&&entry.season===this.currentSeason()).slice(0,16);
    const human=this.humanGuild();
    const engineSummary=this.activeWorkers(human).map(c=>this.workerEngineSummary(c)).filter(Boolean).slice(0,4).map(text=>`<span>${this.escapeHtml(text)}</span>`).join('');
    this.ui.characterPanelTitle.textContent=`${this.currentSeason()} Recap`;
    this.ui.characterPanelBody.innerHTML=`<article class="game-card recap-card"><p class="history">${human.name} is reading as <strong>${this.guildIdentity(human).label}</strong>.</p>${engineSummary?`<div class="recap-pills">${engineSummary}</div>`:''}<div class="recap-list">${entries.map(entry=>`<p class="recap-line ${entry.type}"><span>${entry.guildId?this.guildName(entry.guildId):'World'}</span>${this.escapeHtml(entry.summary)}</p>`).join('')||'<p class="empty">Nothing notable happened.</p>'}</div></article>`;
    this.ui.characterPanel.classList.remove('closed');
  }
  openTraitChoice(choice){
    const worker=choice.worker;
    this.ui.characterPanelTitle.textContent=`Train ${worker.name}`;
    const removable=worker.traits.filter(t=>t!==worker.archetype);
    this.ui.characterPanelBody.innerHTML=`<p class="history">${worker.name} can learn ${choice.trait}, but already has ${this.maxTraits()} tags. Replace one trait or keep the current build.</p><div class="trait-choice-grid">${removable.map(t=>`<div class="trait-choice" role="button" tabindex="0" data-replace-trait="${t}">Replace ${t}</div>`).join('')}<div class="trait-choice keep" role="button" tabindex="0" data-replace-trait="">Keep current traits</div></div>`;
    this.ui.characterPanel.classList.remove('closed');
  }
  resolveTraitChoice(oldTrait){
    const choice=this.state.pendingTraitChoice;
    if(!choice)return;
    const worker=choice.worker;
    if(oldTrait){
      this.replaceTrait(worker,oldTrait,choice.trait);
      worker.history.push(`Year ${this.state.year}: replaced ${oldTrait} with ${choice.trait} at the ${choice.facility.label}.`);
      this.log(choice.guild,'good',`${worker.name} replaced ${oldTrait} with ${choice.trait}.`);
    }else{
      worker.history.push(`Year ${this.state.year}: declined ${choice.trait} training at the ${choice.facility.label}.`);
      this.log(choice.guild,'train',`${worker.name} kept their current traits instead of learning ${choice.trait}.`);
    }
    this.state.pendingTraitChoice=null;
    this.closeCharacterPanel();
    this.render();
    if(this.state.phase==='seasonComplete')this.openSeasonRecap();
  }

  bindTooltips(){
    let timer=null;
    const show=(el,evt)=>{if(!el?.dataset.tip)return;this.showTooltip(el,evt);};
    const hide=()=>{clearTimeout(timer);this.hideTooltip();};
    document.addEventListener('pointerover',evt=>show(evt.target.closest?.('[data-tip]'),evt));
    document.addEventListener('pointermove',evt=>{if(this.tooltip?.classList.contains('visible'))this.positionTooltip(evt.clientX,evt.clientY);});
    document.addEventListener('pointerout',evt=>{if(evt.target.closest?.('[data-tip]'))hide();});
    document.addEventListener('focusin',evt=>show(evt.target.closest?.('[data-tip]'),evt));
    document.addEventListener('focusout',hide);
    document.addEventListener('pointerdown',evt=>{
      const el=evt.target.closest?.('[data-tip]');
      if(!el){this.hideTooltip();return;}
      timer=setTimeout(()=>{el.dataset.longPressed='true';show(el,evt);},520);
    });
    document.addEventListener('pointerup',evt=>{
      clearTimeout(timer);
      if(!evt.target.closest?.('[data-long-pressed]'))this.hideTooltip();
    });
    document.addEventListener('pointercancel',hide);
    document.addEventListener('click',evt=>{
      const el=evt.target.closest?.('[data-long-pressed]');
      if(!el)return;
      evt.preventDefault();
      evt.stopPropagation();
      delete el.dataset.longPressed;
    },true);
  }

  ensureTooltip(){
    if(this.tooltip)return this.tooltip;
    const el=document.createElement('div');
    el.className='game-tooltip';
    document.body.appendChild(el);
    this.tooltip=el;
    return el;
  }
  showTooltip(el,evt){
    const tip=this.ensureTooltip();
    tip.innerHTML=this.escapeHtml(el.dataset.tip);
    tip.classList.add('visible');
    const rect=el.getBoundingClientRect?.();
    this.positionTooltip(evt.clientX||rect?.left||20,evt.clientY||rect?.bottom||20);
  }
  hideTooltip(){if(this.tooltip)this.tooltip.classList.remove('visible');}
  positionTooltip(x,y){
    const tip=this.ensureTooltip();
    const pad=12;
    tip.style.left=`${Math.min(window.innerWidth-tip.offsetWidth-pad,Math.max(pad,x+14))}px`;
    tip.style.top=`${Math.min(window.innerHeight-tip.offsetHeight-pad,Math.max(pad,y+14))}px`;
  }

  advance() {
    if(this.state.phase==='setup') return;
    if(this.state.phase==='awaitHuman') return this.finishHumanAction('season',this.resolveHumanPlacements(this.humanGuild()));
    if(this.state.phase==='seasonComplete') return this.nextSeason();
    if(this.state.phase==='gameOver') return;
  }

  draftFounder(characterId) {
    if(this.state.phase!=='setup') return;
    const human=this.currentSetupGuild();
    if(!human?.human)return false;
    const pick=this.state.tavern.find(c=>c.id===characterId);
    if(!pick) return;
    this.draftFounderForGuild(human,pick);
    this.state.tavernHasNew=false;
    this.advanceSetupDraft();
  }

  draftFounderForGuild(guild,pick){
    if(!pick)return false;
    this.hire(guild,pick,true);
    this.revealAllTraits(pick,guild.human?'as founder':'for AI planning');
    this.log(guild,'recruit',`${guild.name} drafted founder ${pick.name}.`);
    if(guild.human)this.prepareInitialBoardForFounder();
    return true;
  }
  advanceSetupDraft(){
    this.state.setupDraftIndex++;
    const next=this.currentSetupGuild();
    if(next){
      this.state.activeGuildId=next.id;
      this.state.tavernOpen=next.human;
      this.state.setupDraftPending=false;
      this.render();
      this.maybeContinueSetupDraft();
      return;
    }
    this.finishSetupDraft();
  }
  finishSetupDraft(){
    this.state.phase='seasonStart';
    this.state.activeGuildId=null;
    this.state.setupDraftPending=false;
    this.state.tavernOpen=false;
    this.startSeason();
  }
  maybeContinueSetupDraft(){
    if(this.state.phase!=='setup'||this.state.setupDraftPending)return;
    const guild=this.currentSetupGuild();
    if(!guild||guild.human)return;
    if(typeof window==='undefined'){this.aiDraftFounder(guild);return;}
    this.state.setupDraftPending=true;
    setTimeout(()=>this.aiDraftFounder(guild),this.aiTurnDelay());
  }
  aiDraftFounder(guild){
    if(this.state.phase!=='setup'||this.currentSetupGuild()!==guild)return;
    if(!this.state.tavern.length)this.refillTavern();
    const pick=this.chooseRecruit(guild);
    if(pick)this.draftFounderForGuild(guild,pick);
    this.advanceSetupDraft();
  }

  startSeason() {
    for(const guild of this.state.guilds)guild.hiredThisSeason=false;
    if(this.state.seasonIndex===0) this.startYear();
    if(this.state.startedSeasons>0) this.evolveWorld();
    this.revealRosterTraits();
    if(this.state.startedSeasons>0||!this.state.boardContracts.length)this.refreshContracts();
    this.refreshTavernMarket(this.state.startedSeasons===0);
    this.state.startedSeasons++;
    this.log(null,'season',`Year ${this.state.year}, ${this.currentSeason()} begins.`);
    this.runAITurnSequence(this.aiBeforeHuman(),()=>this.beginHumanTurn());
  }

  beginHumanTurn(){
    this.state.activeGuildId=null;
    this.state.phase='awaitHuman';
    this.state.humanActionUsed=false;
    this.render();
  }

  revealRosterTraits(){
    for(const guild of this.state.guilds){
      for(const c of guild.roster.filter(ch=>ch.revealAfterSeason))this.revealAllTraits(c,'after a season with the guild');
    }
  }

  startYear() {
    for(const guild of this.state.guilds) {
      if(this.state.year>1) this.paySalaries(guild);
      if(this.activeWorkers(guild).length===0) {
        this.refillTavern();
        const pick=this.chooseRecruit(guild);
        if(pick){this.hire(guild,pick,true);this.log(guild,'recruit',`${guild.name} received a free recovery recruit: ${pick.name}.`);}
      }
    }
    if(this.state.year>1) this.evolveTavern();
  }

  paySalaries(guild) {
    const roster=[...guild.roster].filter(c=>c.alive);
    const due=roster.reduce((s,c)=>s+this.characterSalary(c),0);
    if(guild.gold>=due){guild.gold-=due;this.log(guild,'salary',`${guild.name} paid ${due} gold in salaries.`);return;}
    roster.sort((a,b)=>this.characterSalary(b)-this.characterSalary(a));
    for(const c of roster){const salary=this.characterSalary(c);if(guild.gold>=salary){guild.gold-=salary;}else{this.dismissUnpaid(guild,c);}}
  }

  dismissUnpaid(guild,c) {
    this.unplaceWorker(c,guild,true);
    this.removeMercCapacity(guild,c);
    guild.roster=guild.roster.filter(x=>x!==c); c.refusesGuildIds.push(guild.id); this.state.tavern.push(c); guild.reputation=Math.max(0,guild.reputation-2);
    this.log(guild,'bad',`${c.name} went unpaid, left ${guild.name}, and will never work for them again. Reputation -2.`);
  }
  addMercCapacity(guild,c) {
    guild.resources+=c.resources||0;
    guild.connections+=c.connections||0;
  }
  removeMercCapacity(guild,c) {
    guild.resources=Math.max(0,guild.resources-(c.resources||0));
    guild.connections=Math.max(0,guild.connections-(c.connections||0));
  }

  refillTavern(target=8){
    while(this.state.tavern.length<target){
      const template=this.pick(this.data.recruits);
      this.state.tavern.push(this.makeCharacter(template));
      this.state.tavernHasNew=true;
    }
  }
  refreshTavernMarket(firstSeason=false){
    const settings=this.data.contractParts.settings;
    const min=settings.tavernMarketSize||6;
    const max=Math.max(min,settings.tavernMarketMax||8);
    const arrivals=firstSeason?0:(settings.tavernSeasonalArrivals||2);
    const keep=Math.max(0,max-arrivals);
    if(this.state.tavern.length>keep)this.state.tavern=this.state.tavern.slice(this.state.tavern.length-keep);
    const before=this.state.tavern.length;
    this.refillTavern(Math.min(max,Math.max(min,before+arrivals)));
    const added=this.state.tavern.length-before;
    if(added)this.log(null,'recruit',`${added} new recruit${added===1?'':'s'} arrived at the tavern.`);
  }

  evolveTavern(){
    const evolutions={Smith:'Seasoned',Scholar:'Learned',Soldier:'Battlewise',Hunter:'Watchful',Builder:'Practical',Merchant:'Connected',Healer:'Compassionate',Noble:'Influential',Rural:'Resourceful'};
    for(const c of this.state.tavern){const key=c.traits.find(t=>evolutions[t]);if(key&&c.traits.length<this.maxTraits()&&!c.traits.includes(evolutions[key])){c.traits.push(evolutions[key]);c.history.push(`Year ${this.state.year}: gained ${evolutions[key]} while living independently.`);}}
  }

  evolveWorld(){
    const world=this.state.world;
    const old={...world.values};
    for(const key of Object.keys(world.values)){
      const pull=50-world.values[key];
      world.values[key]=this.clamp(world.values[key]+Math.round(pull*0.08)+this.randomInt(-7,7),0,100);
    }
    const shocks=[
      {name:'a harsh winter',when:()=>this.currentSeason()==='Winter',effects:{food:-10,trade:-4,monsters:6}},
      {name:'raids along the border',when:()=>world.values.order<35||world.values.politics<35,effects:{military:8,order:-6,trade:-7}},
      {name:'a fervent revival',when:()=>world.values.faith>70,effects:{faith:6,order:3,politics:-3}},
      {name:'merchant confidence',when:()=>world.values.trade>70&&world.values.order>55,effects:{trade:6,food:3,politics:2}},
      {name:'beasts pressing the roads',when:()=>world.values.monsters>65,effects:{trade:-6,order:-5,military:4}}
    ].filter(s=>s.when());
    if(shocks.length&&Math.random()<0.55){
      const shock=this.pick(shocks);
      for(const [key,delta] of Object.entries(shock.effects)) world.values[key]=this.clamp(world.values[key]+delta,0,100);
      world.lastShift=`Rumors point to ${shock.name}.`;
    } else {
      world.lastShift='No single crisis dominates the season.';
    }
    world.trend=Object.fromEntries(Object.entries(world.values).map(([key,value])=>[key,value-old[key]]));
  }

  refreshContracts(){
    for(const c of this.state.boardContracts) c.offerSeasons=Math.max(0,c.offerSeasons-1);
    this.state.boardContracts=this.state.boardContracts.filter(c=>c.offerSeasons>0||this.hasContractPlacements(c));
    const boardSize=this.boardSize();
    const active=this.state.boardContracts.filter(c=>this.hasContractPlacements(c));
    const idle=this.state.boardContracts.filter(c=>!this.hasContractPlacements(c));
    this.state.boardContracts=[...active,...this.shuffle(idle).slice(0,Math.max(0,boardSize-active.length))];
    this.fillContractBoard();
  }

  fillContractBoard(){
    while(this.state.boardContracts.length<this.boardSize()){
      if(!this.state.contractDeck.length)this.state.contractDeck=this.shuffle(this.data.contracts.map(c=>structuredClone(c)));
      const index=this.chooseBoardContractIndex();
      const base=this.state.contractDeck.splice(index,1)[0];
      this.prepareBoardContract(base);
      base.instanceId=`contract-${this.state.nextContractInstance++}`;
      base.placements={};
      this.state.boardContracts.push(base);
    }
  }

  prepareBoardContract(contract){
    const settings=this.data.contractParts.settings;
    const human=this.humanGuild();
    if(!human?.roster.length||this.state.year>settings.beginnerBoardYears)return;
    const team=this.chooseBestTeam(human,contract);
    const rawChance=this.rawSuccessChanceForTeam(human,contract,team);
    if(rawChance>=settings.beginnerMinChance)return;
    contract.baseDifficulty-=settings.beginnerMinChance-rawChance;
    contract.beginnerAdjusted=true;
    contract.description=`${contract.description} The terms are simple enough for a new guild.`;
  }
  prepareInitialBoardForFounder(){
    if(this.state.year!==1||this.state.startedSeasons!==0)return;
    for(const contract of this.state.boardContracts){
      if(contract.setupPrepared)continue;
      this.prepareBoardContract(contract);
      contract.setupPrepared=true;
    }
  }

  chooseBoardContractIndex(){
    const types=new Set(this.state.boardContracts.map(c=>c.type));
    const settings=this.data.contractParts.settings;
    const human=this.humanGuild();
    const isBeginnerBoard=human?.roster.length&&this.state.year<=settings.beginnerBoardYears;
    const candidates=this.state.contractDeck.map((c,index)=>({c,index,hasFreshType:!types.has(c.type),chance:isBeginnerBoard?this.contractPreview(human,c).chance:0,weight:this.contractMarketWeight(c)}));
    if(isBeginnerBoard){
      const easy=candidates.filter(x=>x.chance>=settings.beginnerMinChance);
      if(easy.length)return this.weightedPick(easy.map(x=>({item:x.index,weight:x.weight+(x.hasFreshType?20:0)+x.chance/2})));
    }
    if(types.size<this.state.boardContracts.length){
      const fresh=candidates.filter(x=>x.hasFreshType);
      if(fresh.length)return this.weightedPick(fresh.map(x=>({item:x.index,weight:x.weight+15})));
    }
    return this.weightedPick(candidates.map(x=>({item:x.index,weight:x.weight})));
  }

  contractMarketWeight(contract){
    const pool=this.data.contractParts.world.pools.find(p=>p.key===contract.pool);
    let weight=10;
    if(!pool)return weight;
    for(const [key,direction] of Object.entries(pool.pressure||{})){
      const value=this.state.world.values[key]??50;
      if(direction==='low') weight+=value<45?32+(45-value)/2:Math.max(0,12-(value-45)/3);
      if(direction==='high') weight+=value>55?32+(value-55)/2:Math.max(0,12-(55-value)/3);
    }
    return Math.max(1,weight);
  }

  claimContractPhase(guild){
    if(guild.human) return;
    this.aiPlaceContractWorkers(guild);
  }

  chooseBestTeam(guild,contract){
    return this.bestWorkersForContract(this.availableWorkers(guild),contract,2);
  }
  bestWorkersForContract(workers,contract,limit){return workers.map(c=>({c,score:this.characterFit(c,contract)})).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.c);}
  aiPlaceContractWorkers(guild){
    const minChance=this.aiMinClaimChance(guild);
    let placed=0;
    while(this.availableWorkers(guild).length){
      const options=this.state.boardContracts.map(contract=>this.aiContractPlacementOption(guild,contract)).filter(Boolean).sort((a,b)=>b.value-a.value);
      if(!options.length)break;
      const viable=options.filter(o=>o.chance>=minChance);
      const pool=viable.length?viable:options.slice(0,3);
      const pick=this.weightedPick(pool.map((o,i)=>({item:o,weight:Math.max(1,o.value)+(pool.length-i)*3})));
      if(!pick)break;
      if(pick.chance<minChance&&Math.random()>0.35*this.aiRisk(guild))break;
      pick.contract.placements=pick.contract.placements||{};
      const list=pick.contract.placements[guild.id]||[];
      for(const worker of pick.add){list.push(worker.id);worker.placement={type:'contract',id:pick.contract.instanceId};placed++;}
      pick.contract.placements[guild.id]=list;
      this.log(guild,'contract',`${guild.name} committed ${pick.add.map(c=>c.name).join(', ')} to "${pick.contract.title}" at ${pick.chance}% odds.`);
      if(placed>=Math.max(1,this.activeWorkers(guild).length-1)&&Math.random()>0.25*this.aiRisk(guild))break;
    }
    return placed>0;
  }
  aiContractPlacementOption(guild,contract){
    if(contract.offerSeasons<=0||this.contractProgress(guild,contract))return null;
    const current=this.placedTeam(guild,contract);
    const open=2-current.length;
    if(open<=0)return null;
    const add=this.bestWorkersForContract(this.availableWorkers(guild),contract,open);
    if(!add.length)return null;
    const team=[...current,...add];
    const chance=this.successChanceForTeam(guild,contract,team);
    if(chance<this.aiFallbackChance(guild))return null;
    const mode=this.aiStrategicMode(guild);
    if(mode.rebuilding&&['deadly','lethal'].includes(contract.risk)&&chance<72)return null;
    if(mode.startup&&contract.risk==='dangerous'&&chance<58)return null;
    if(mode.behind&&contract.risk==='dangerous'&&chance<66)return null;
    if(mode.desperate&&contract.risk!=='low'&&chance<66)return null;
    if(mode.rebuilding&&contract.risk==='moderate'&&chance<54)return null;
    const value=this.aiContractValue(guild,contract,chance,team,add.length);
    return {contract,add,chance,value};
  }
  isPlaced(c){return Boolean(c.placement);}
  isLockedPlacement(c,guild=this.humanGuild()){
    if(c.placement?.type!=='contract')return false;
    const contract=this.state.boardContracts.find(x=>x.instanceId===c.placement.id);
    return Boolean(contract&&this.contractProgress(guild,contract));
  }
  visibleTraits(c){return c.revealedTraits?.length?c.revealedTraits:c.traits;}
  revealAllTraits(c,reason=''){const before=c.revealedTraits?.length||0;c.revealedTraits=[...c.traits];c.revealAfterSeason=false;if(c.revealedTraits.length>before)c.history.push(`Year ${this.state.year}: revealed ${c.traits.slice(before).join(', ')}${reason?` ${reason}`:''}.`);}
  revealTrait(worker,trait){worker.revealedTraits=worker.revealedTraits||[];if(!worker.revealedTraits.includes(trait))worker.revealedTraits.push(trait);}
  replaceTrait(worker,oldTrait,newTrait){worker.traits=worker.traits.map(t=>t===oldTrait?newTrait:t);worker.revealedTraits=(worker.revealedTraits||[]).map(t=>t===oldTrait?newTrait:t);this.revealTrait(worker,newTrait);}
  isProfession(tag){return this.data.characterParts.professions.some(p=>p.name===tag);}
  contractDomains(contract){return [...new Set([contract.pool,contract.type].filter(Boolean))];}
  explicitTagWeight(req,kind){if(kind==='primary')return this.isProfession(req.trait)?30:req.weight;return this.isProfession(req.trait)?15:req.weight;}
  explicitContractScore(traits,contract){let s=0;for(const r of contract.requirements)if(traits.includes(r.trait))s+=this.explicitTagWeight(r,'primary');for(const r of contract.support)if(traits.includes(r.trait))s+=this.explicitTagWeight(r,'support');return s;}
  affinityScoreForTraits(traits,contract){
    const explicit=new Set(this.contractTags(contract));
    const domains=this.contractDomains(contract);
    let s=0;
    for(const tag of traits){
      if(explicit.has(tag))continue;
      const affinity=this.data.characterParts.tagAffinities?.[tag];
      if(!affinity)continue;
      if((affinity.domains||[]).some(d=>domains.includes(d)))s+=affinity.bonus||5;
    }
    return s;
  }
  characterTagScore(c,contract){const traits=this.visibleTraits(c);return this.explicitContractScore(traits,contract)+this.affinityScoreForTraits(traits,contract);}
  characterFit(c,contract){return this.characterTagScore(c,contract)+c.resources*3+c.connections*2-this.conditionPenalty(c);}
  contractPreview(guild,c){const team=this.placedTeam(guild,c);const previewTeam=team.length?team:this.chooseBestTeam(guild,c);return {team:previewTeam,chance:previewTeam.length?this.successChanceForTeam(guild,c,previewTeam):null};}
  contractValue(guild,c){const p=this.contractPreview(guild,c);return p.chance===null?-999:this.aiContractValue(guild,c,p.chance,p.team);}
  aiRisk(guild){return guild.personality?.risk||1;}
  aiMinClaimChance(guild){
    const mode=this.aiStrategicMode(guild);
    let chance=Math.round(this.data.contractParts.settings.aiMinClaimChance/this.aiRisk(guild));
    if(mode.startup)chance-=2;
    if(mode.behind)chance-=3;
    if(mode.desperate)chance-=4;
    return Math.max(mode.desperate?38:mode.rebuilding?44:40,chance);
  }
  aiFallbackChance(guild){
    const settings=this.data.contractParts.settings;
    const mode=this.aiStrategicMode(guild);
    const floor=this.aiProfileValue(guild,'absoluteMinChance',settings.aiAbsoluteMinChance||30)-(mode.rebuilding?4:0);
    return Math.max(Math.max(28,floor),Math.round(this.aiMinClaimChance(guild)*(settings.aiFallbackChanceFactor||0.75)));
  }
  aiRiskAppeal(guild,contract){
    const appeal={low:-2,moderate:0,dangerous:6,deadly:12,lethal:18}[contract.risk]||0;
    return appeal*this.aiProfileValue(guild,'dangerBias',0);
  }
  aiRewardValue(guild,contract){return contract.reward.gold*this.aiProfileValue(guild,'goldBias',0.25)+contract.reward.reputation*this.aiProfileValue(guild,'reputationBias',3);}
  aiFlavorScore(guild,tags){const prefs=guild.personality?.preferredTags||[];return tags.filter(t=>prefs.includes(t)).length;}
  aiScore(guild){return guild.reputation+guild.completed*3+guild.gold/12;}
  aiStrategicMode(guild){
    const active=this.activeWorkers(guild).length;
    const cap=this.guildRosterCap();
    const score=this.aiScore(guild);
    const scores=this.state.guilds.map(g=>this.aiScore(g)).sort((a,b)=>a-b);
    const median=scores[Math.floor(scores.length/2)]||score;
    const leader=scores.at(-1)||score;
    const startup=this.state.year<=2||active<Math.min(4,cap)||guild.completed<2;
    const behind=this.state.year>=3&&(score<median-10||score<leader*0.58||active<4||guild.reputation<10);
    const desperate=active<=2||(this.state.year>=3&&guild.completed<2&&guild.reputation<12);
    return {startup,behind,desperate,rebuilding:startup||behind||desperate};
  }
  aiContractValue(guild,contract,chance,team,addCount=0){
    const mode=this.aiStrategicMode(guild);
    const flavor=this.aiFlavorScore(guild,this.contractTags(contract))*(mode.rebuilding?3:8);
    const riskAppeal=mode.rebuilding?Math.min(0,this.aiRiskAppeal(guild,contract)):this.aiRiskAppeal(guild,contract);
    const riskRecovery={low:12,moderate:5,dangerous:-12,deadly:-28,lethal:-45}[contract.risk]||0;
    const oddsDiscipline=mode.rebuilding?(chance-62)*2:0;
    const recovery=mode.rebuilding?riskRecovery+oddsDiscipline+Math.max(0,4-(contract.workSeasons||1))*8+contract.reward.reputation*2.5:0;
    const workPenalty=contract.workSeasons*this.aiProfileValue(guild,'workPenalty',2)*(mode.rebuilding?1.7:1);
    return chance*(mode.rebuilding?1.25:this.aiRisk(guild))+this.aiRewardValue(guild,contract)+riskAppeal+this.aiActivatedRuleValue(guild,contract,team)-workPenalty+flavor+addCount*5+recovery;
  }
  aiActivatedRuleValue(guild,contract,team){
    return team.reduce((sum,worker)=>sum+this.workerTraitEffects(worker).filter(effect=>['contractScore','contractSuccess','contractFailure','contractProgress'].includes(effect.trigger)&&this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)})).length*5,0);
  }

  placedTeam(guild,contract){return (contract.placements?.[guild.id]||[]).map(id=>guild.roster.find(c=>c.id===id)).filter(Boolean);}
  hasContractPlacements(contract){return Object.values(contract.placements||{}).some(list=>list?.length);}
  contractProgress(guild,contract){return contract.progress?.[guild.id]||null;}
  ensureContractProgress(guild,contract){
    contract.progress=contract.progress||{};
    if(!contract.progress[guild.id]){
      const materials=Math.min(guild.resources,contract.materials||0);
      contract.progress[guild.id]={remaining:contract.workSeasons||1,total:contract.workSeasons||1,materials};
    }
    return contract.progress[guild.id];
  }
  placeWorker(characterId,targetId,targetType='contract',mode='work'){
    const guild=this.humanGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.alive)return false;
    if(targetType==='recovery')return this.placeRecoveryWorker(worker,guild);
    if(targetType==='facility')return this.placeFacilityWorker(worker,targetId,guild,mode);
    const contract=this.state.boardContracts.find(c=>c.instanceId===targetId);
    if(!contract)return false;
    if(contract.offerSeasons<=0||this.contractProgress(guild,contract))return false;
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    contract.placements=contract.placements||{};
    const list=contract.placements[guild.id]||[];
    if(list.length>=2)return false;
    list.push(worker.id);
    contract.placements[guild.id]=list;
    worker.placement={type:'contract',id:contract.instanceId};
    this.render();
    return true;
  }
  placeFacilityWorker(worker,facilityKey,guild=this.humanGuild(),mode='work'){
    const facility=this.facilityDef(facilityKey);
    if(!facility)return false;
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    const placed=this.facilityWorkers(guild,facilityKey,'work');
    const limit=facility.slots;
    if(placed.length>=limit)return false;
    worker.placement={type:'facility',id:facilityKey,mode:'work'};
    this.render();
    return true;
  }
  placeRecoveryWorker(worker,guild=this.humanGuild()){
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    if(this.recoveryWorkers(guild).length>=this.recoverySlotCount())return false;
    worker.placement={type:'recovery'};
    this.render();
    return true;
  }
  returnWorker(characterId){
    const guild=this.humanGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.placement)return false;
    if(!this.unplaceWorker(worker,guild))return false;
    this.render();
    return true;
  }
  unplaceWorker(worker,guild=this.humanGuild(),force=false){
    if(!worker?.placement)return true;
    if(worker.placement.type==='contract'){
      const contract=this.state.boardContracts.find(c=>c.instanceId===worker.placement.id);
      if(contract&&!force&&this.contractProgress(guild,contract))return false;
      if(contract?.placements?.[guild.id])contract.placements[guild.id]=contract.placements[guild.id].filter(id=>id!==worker.id);
      if(contract?.progress?.[guild.id]&&!this.placedTeam(guild,contract).length)delete contract.progress[guild.id];
    }
    if(worker.placement.type==='facility'){
      // Facility placement lives on the worker, so clearing the worker is enough.
    }
    worker.placement=null;
    return true;
  }
  facilityDef(key){return this.data.contractParts.facilities.find(f=>f.key===key);}
  facilityWorkers(guild,key,mode=null){return guild.roster.filter(c=>c.placement?.type==='facility'&&c.placement.id===key&&(!mode||c.placement.mode===mode));}
  recoverySlotCount(){return this.data.contractParts.settings.recoverySlots||2;}
  recoveryWorkers(guild){return guild.roster.filter(c=>c.placement?.type==='recovery');}

  resolveHumanPlacements(guild){
    const occupied=this.state.boardContracts.filter(c=>this.placedTeam(guild,c).length);
    const recoveryCount=this.resolveRecovery(guild);
    const facilityCount=this.resolveFacilities(guild);
    if(!occupied.length&&!facilityCount&&!recoveryCount)return `${guild.name} committed no workers.`;
    const results=occupied.map(contract=>this.resolveBoardContract(guild,contract));
    const advanced=results.filter(r=>r==='progress').length;
    const finished=results.filter(r=>r==='finished').length;
    return `${guild.name} advanced ${advanced} contract tile(s), finished ${finished}, resolved ${facilityCount} facility placement(s), and rested ${recoveryCount} merc(s).`;
  }

  finishHumanAction(type,msg,fn){if(fn)fn();if(msg)this.log(this.humanGuild(),type,msg);this.state.humanActionUsed=true;this.runAITurns();}

  runAITurns(){
    this.runAITurnSequence(this.aiAfterHuman(),()=>this.finishAITurns());
  }
  finishAITurns(){
    for(const guild of this.snakeGuildOrder().filter(g=>!g.human)) this.resolveAIPlacements(guild);
    this.state.activeGuildId=null;
    this.state.phase='seasonComplete';
    this.render();
    if(!this.state.pendingTraitChoice)this.openSeasonRecap();
  }
  aiTurnDelay(){
    if(typeof window==='undefined')return 0;
    return this.data.contractParts.settings.aiTurnDelayMs??550;
  }
  runAITurnSequence(guilds,done,index=0){
    if(index>=guilds.length){done();return;}
    const guild=guilds[index];
    const delay=this.aiTurnDelay();
    this.state.activeGuildId=guild.id;
    this.state.phase='aiTurn';
    this.render();
    const act=()=>{
      this.aiTurn(guild);
      this.render();
      const next=()=>this.runAITurnSequence(guilds,done,index+1);
      if(delay>0)setTimeout(next,delay);
      else next();
    };
    if(delay>0)setTimeout(act,delay);
    else act();
  }

  aiTurn(guild){
    const mode=this.aiStrategicMode(guild);
    const rosterCap=this.guildRosterCap();
    const coreSize=Math.min(mode.rebuilding?5:(this.data.contractParts.settings.aiCoreRosterSize||4),rosterCap);
    const targetRoster=Math.min(Math.max(this.aiProfileValue(guild,'rosterGoal',6),mode.rebuilding?6:0),rosterCap);
    if(this.activeWorkers(guild).length<coreSize&&this.aiCatchUpRecruit(guild,coreSize))return true;
    if(mode.desperate&&this.activeWorkers(guild).length<3&&this.aiEmergencyRecruit(guild))return true;
    if(this.guildNeedsRest(guild)&&Math.random()<this.aiRestChance(guild,mode)){this.log(guild,'rest',this.restGuild(guild));return true;}
    if(this.activeWorkers(guild).length<targetRoster&&this.aiCatchUpRecruit(guild,this.activeWorkers(guild).length+1))return true;
    if(mode.behind&&this.activeWorkers(guild).length<rosterCap&&!guild.hiredThisSeason&&Math.random()<0.45&&this.aiCatchUpRecruit(guild,this.activeWorkers(guild).length+1))return true;
    const plannedSupport=this.availableWorkers(guild).length>3&&Math.random()<this.aiFacilityChance(guild,mode)&&this.aiPlaceFacility(guild);
    if(this.aiPlaceContractWorkers(guild))return true;
    if((mode.desperate||(mode.behind&&guild.gold<10&&guild.reputation<10))&&this.aiLocalRecoveryWork(guild))return true;
    if(Math.random()<this.aiFacilityChance(guild,mode)&&this.aiPlaceFacility(guild))return true;
    if(plannedSupport||this.aiPlaceFacility(guild))return true;
    this.log(guild,'operate',`${guild.name} held workers in reserve.`);
    return true;
  }
  aiRestChance(guild,mode=this.aiStrategicMode(guild)){
    const base=this.aiProfileValue(guild,'restChance',0.55);
    if(mode.desperate&&this.activeWorkers(guild).length<4)return base*0.55;
    if(mode.rebuilding)return base*0.85;
    return base;
  }
  aiFacilityChance(guild,mode=this.aiStrategicMode(guild)){
    const base=this.aiProfileValue(guild,'facilityChance',0.35);
    if(mode.desperate)return Math.min(base,0.12);
    if(mode.startup)return Math.min(base,0.22);
    if(mode.behind)return Math.min(base,0.24);
    return base;
  }
  aiCatchUpRecruit(guild,target){
    let hired=0;
    if(guild.hiredThisSeason)return hired;
    while(this.activeWorkers(guild).length<target&&this.activeWorkers(guild).length<this.guildRosterCap()){
      if(!this.state.tavern.some(c=>!c.refusesGuildIds.includes(guild.id)))this.refillTavern(this.state.tavern.length+4);
      let affordable=this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.canRecruit(guild,c));
      if(!affordable.length&&this.aiStrategicMode(guild).rebuilding&&this.state.tavern.length<14){
        this.refillTavern(this.state.tavern.length+3);
        affordable=this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.canRecruit(guild,c));
      }
      if(!affordable.length)break;
      const c=this.chooseRecruit(guild,affordable);
      if(!this.hire(guild,c,false))break;
      this.log(guild,'recruit',`${guild.name} recruited ${c.name}.`);
      hired++;
      break;
    }
    return hired;
  }
  aiEmergencyRecruit(guild){
    if(guild.hiredThisSeason||this.activeWorkers(guild).length>=this.guildRosterCap())return false;
    const eligible=()=>this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.reputationRequirement(c)===0&&this.characterSalary(c)<=2);
    let candidates=eligible();
    if(!candidates.length&&this.state.tavern.length<14){
      this.refillTavern(this.state.tavern.length+4);
      candidates=eligible();
    }
    const pick=this.chooseRecruit(guild,candidates);
    if(!pick)return false;
    this.hire(guild,pick,false,0,{sponsored:true});
    this.log(guild,'recruit',`${guild.name} took on ${pick.name} with deferred pay to rebuild.`);
    return true;
  }
  aiLocalRecoveryWork(guild){
    const workers=this.availableWorkers(guild).slice(0,Math.max(1,Math.min(2,this.availableWorkers(guild).length)));
    if(!workers.length)return false;
    const gold=4+workers.length*3;
    const rep=guild.reputation<10?2:1;
    guild.gold+=gold;
    guild.reputation+=rep;
    this.log(guild,'operate',`${guild.name} worked local recovery jobs with ${workers.map(c=>c.name).join(', ')}. +${gold} gold, +${rep} reputation.`);
    return true;
  }

  resolveAIPlacements(guild){
    const occupied=this.state.boardContracts.filter(c=>this.placedTeam(guild,c).length);
    this.resolveFacilities(guild);
    for(const contract of occupied)this.resolveBoardContract(guild,contract);
  }

  aiPlaceFacility(guild){
    const mode=this.aiStrategicMode(guild);
    const target=Math.min(mode.rebuilding?1:this.aiProfileValue(guild,'facilityWorkers',2),this.availableWorkers(guild).length);
    const placed=[];
    while(placed.length<target){
      const worker=this.chooseFacilityWorker(guild);
      if(!worker)break;
      const facility=this.chooseFacility(guild,worker);
      if(!facility)break;
      if(this.facilityWorkers(guild,facility.key,'work').length>=facility.slots)break;
      worker.placement={type:'facility',id:facility.key,mode:'work'};
      placed.push(`${worker.name} to the ${facility.label}`);
      if(Math.random()>0.65)break;
    }
    if(!placed.length)return false;
    this.log(guild,'train',`${guild.name} assigned ${placed.join(', ')}.`);
    return true;
  }
  chooseFacilityWorker(guild){
    return [...this.availableWorkers(guild)].sort((a,b)=>this.workerFacilityNeed(b,guild)-this.workerFacilityNeed(a,guild))[0]||null;
  }
  workerFacilityNeed(worker,guild){
    const profileFit=this.aiFlavorScore(guild,this.visibleTraits(worker))*4;
    const trainNeed=Math.max(0,this.maxTraits()-(worker.traits?.length||0))*6;
    return trainNeed+profileFit+Math.random()*5;
  }
  chooseFacility(guild,worker){
    const prefs=guild.personality?.preferredTags||[];
    return [...this.data.contractParts.facilities]
      .filter(f=>this.facilityHasOpenSlot(guild,f,worker))
      .sort((a,b)=>this.facilityValue(guild,worker,b,prefs)-this.facilityValue(guild,worker,a,prefs))[0];
  }
  facilityHasOpenSlot(guild,facility,worker=null){
    return facility.slots>this.facilityWorkers(guild,facility.key,'work').length;
  }
  facilityValue(guild,worker,facility,prefs=[]){
    const train=(facility.traits||[]).filter(t=>!this.visibleTraits(worker).includes(t)).length*4;
    const flavor=(facility.traits||[]).filter(t=>prefs.includes(t)).length*8;
    const priorities=guild.personality?.facilityPriorities||[];
    const priority=priorities.includes(facility.key)?(priorities.length-priorities.indexOf(facility.key))*12:0;
    const activation=this.workerTraitEffects(worker,'facilityResolve').filter(effect=>this.effectMatchesContract(effect,null,{guild,worker,facility,mode:'work'})).length*12;
    const support=this.state.boardContracts.reduce((sum,contract)=>sum+this.workerTraitEffects(worker,'facilitySupport').filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,facility,mode:'work',team:this.chooseBestTeam(guild,contract)})).reduce((s,effect)=>s+(effect.amount||0),0),0);
    return train+flavor+priority+activation+support+Math.random()*5;
  }

  guildNeedsRest(guild){return this.availableWorkers(guild).some(c=>c.conditions?.some(condition=>this.conditionDef(condition.key)?.recoveryPerRest>0));}
  restGuild(guild){
    const rested=[];
    const candidates=[...this.availableWorkers(guild)]
      .filter(c=>c.conditions?.some(condition=>this.conditionDef(condition.key)?.recoveryPerRest>0))
      .sort((a,b)=>this.conditionPenalty(b)-this.conditionPenalty(a))
      .slice(0,this.recoverySlotCount());
    for(const c of candidates){
      const recovered=this.recoverCharacter(c);
      if(recovered.length) rested.push(c.name);
    }
    return rested.length?`${guild.name} rested ${rested.join(', ')}.`:`${guild.name} rested, but no available conditions improved.`;
  }
  recoverCharacter(c){
    const recovered=[];
    c.conditions=(c.conditions||[]).map(condition=>{
      const def=this.conditionDef(condition.key);
      if(!def?.recoveryPerRest||condition.remaining===null)return condition;
      const next=Math.max(0,condition.remaining-def.recoveryPerRest);
      if(next===0)recovered.push(condition.key);
      return {...condition,remaining:next};
    }).filter(condition=>condition.remaining===null||condition.remaining>0);
    return recovered;
  }
  resolveRecovery(guild){
    let count=0;
    for(const worker of this.recoveryWorkers(guild)){
      const recovered=this.recoverCharacter(worker);
      if(recovered.length)this.log(guild,'rest',`${worker.name} recovered from ${recovered.join(', ')}.`);
      else this.log(guild,'rest',`${worker.name} rested, but had no recoverable condition.`);
      worker.placement=null;
      count++;
    }
    return count;
  }
  resolveFacilities(guild){
    let count=0;
    for(const facility of this.data.contractParts.facilities){
      for(const worker of this.facilityWorkers(guild,facility.key)){
        this.resolveFacilityWorker(guild,worker,facility);
        worker.placement=null;
        count++;
      }
    }
    return count;
  }
  resolveFacilityWorker(guild,worker,facility){
    this.applyFacilityTraitEffects(guild,worker,facility,[]);
    const pool=[...(facility.traits||[])];
    if((facility.rareTraits||[]).length&&Math.random()<(facility.rareChance??0.12))pool.push(...facility.rareTraits);
    const candidates=pool.filter(t=>!worker.traits.includes(t));
    const trainChance=this.facilityTrainingChance(worker,facility);
    if(candidates.length&&Math.random()*100<trainChance){
      const trait=this.pick(candidates);
      this.awardFacilityTrait(guild,worker,facility,trait);
    } else {
      this.log(guild,'train',`${worker.name} trained at the ${facility.label}, but gained no new trait.`);
    }
  }
  facilityTrainingChance(worker,facility){
    const assist=this.workerTraitEffects(worker,'facilityWork').filter(effect=>effect.type==='trainingAssist'&&this.effectMatchesContract(effect,null,{worker,facility,mode:worker.placement?.mode})).reduce((sum,effect)=>sum+(effect.amount||0),0);
    return this.clamp((facility.trainChance||0)+assist,0,85);
  }
  applyFacilityTraitEffects(guild,worker,facility,recovered=[]){
    for(const effect of this.workerTraitEffects(worker,'facilityResolve')){
      if(!this.effectMatchesContract(effect,null,{guild,worker,facility,mode:worker.placement?.mode,recovered}))continue;
      const source=`${worker.name}'s ${effect.trait}`;
      if(effect.type==='gainGuild')this.gainGuildStat(guild,effect.stat,effect.amount||1,effect.cap,source);
      if(effect.type==='goldPerAssignedContractMerc'){
        const amount=(effect.amount||1)*this.assignedContractMercCount(guild);
        this.gainGuildStat(guild,'gold',amount,null,source);
      }
      if(effect.type==='statPerAssignedContractMerc'){
        const amount=(effect.amount||1)*this.assignedContractMercCount(guild);
        this.gainGuildStat(guild,effect.stat,amount,effect.cap,source);
      }
      if(effect.type==='revealRosterTrait')this.revealHiddenTraitFrom(guild,this.activeWorkers(guild),source);
      if(effect.type==='revealTavernTrait')this.revealHiddenTraitFrom(guild,this.state.tavern,source);
      if(effect.type==='recoverGuild')this.recoverFromGroup(guild,this.activeWorkers(guild),effect.kinds,effect.amount||1,source);
      if(effect.type==='recoverSelf')this.recoverFromGroup(guild,[worker],effect.kinds,effect.amount||1,source);
    }
  }
  awardFacilityTrait(guild,worker,facility,trait){
    if(worker.traits.length<this.maxTraits()){
      worker.traits.push(trait);
      this.revealTrait(worker,trait);
      worker.history.push(`Year ${this.state.year}: gained ${trait} at the ${facility.label}.`);
      this.log(guild,'good',`${worker.name} gained ${trait} at the ${facility.label}.`);
      return;
    }
    const removable=worker.traits.filter(t=>t!==worker.archetype);
    if(!removable.length){this.log(guild,'train',`${worker.name} could not replace their profession with ${trait}.`);return;}
    if(guild.human){
      this.state.pendingTraitChoice={guild,worker,facility,trait};
      this.openTraitChoice(this.state.pendingTraitChoice);
      return;
    }
    const oldTrait=this.chooseTraitToReplace(guild,worker,trait,removable);
    if(!oldTrait){this.log(guild,'train',`${worker.name} kept their current traits instead of learning ${trait}.`);return;}
    this.replaceTrait(worker,oldTrait,trait);
    worker.history.push(`Year ${this.state.year}: replaced ${oldTrait} with ${trait} at the ${facility.label}.`);
    this.log(guild,'good',`${worker.name} replaced ${oldTrait} with ${trait}.`);
  }
  chooseTraitToReplace(guild,worker,newTrait,removable){
    const targets=this.state.boardContracts.length?this.state.boardContracts:[];
    const score=tag=>this.aiFlavorScore(guild,[tag])*12+targets.reduce((s,c)=>s+this.affinityScoreForTraits([tag],c)+this.explicitContractScore([tag],c),0);
    const worst=[...removable].sort((a,b)=>score(a)-score(b))[0];
    return score(newTrait)>score(worst)?worst:null;
  }
  chooseRecruit(guild,arr=this.state.tavern){
    // Use Monte Carlo selection during setup and the first two seasons when running headless and NOT in a simulation.
    if(!this.isSimulation && (this.state.phase==='setup' || (this.state.year===1 && this.state.seasonIndex<2)) && typeof window==='undefined'){
      const pick = this.monteCarloSelectRecruit(guild, arr, 4, 1);
      if(pick) return pick;
    }
    const target=[...this.state.boardContracts].sort((a,b)=>this.contractValue(guild,b)-this.contractValue(guild,a))[0];
    return [...arr].sort((a,b)=>this.recruitValue(guild,b,target)-this.recruitValue(guild,a,target))[0]||null;
  }
  recruitValue(guild,c,target){
    const traits=this.visibleTraits(c);
    const mode=this.aiStrategicMode(guild);
    const profileFit=this.aiFlavorScore(guild,traits)*(mode.rebuilding?5:12);
    const targetFit=target?this.characterFit(c,target):0;
    const boardFit=this.state.boardContracts.reduce((best,contract)=>Math.max(best,this.characterFit(c,contract)),0);
    const cheapStarter=mode.rebuilding&&(this.reputationRequirement(c)===0?10:0)+(this.characterSalary(c)<=2?4:0);
    const professionDemand=this.state.boardContracts.some(contract=>contract.requirements.some(req=>req.trait===c.archetype))?7:0;
    return targetFit+profileFit+traits.length*2+c.connections*3+c.resources*3-this.recruitCost(guild,c)/3+(mode.rebuilding?boardFit*0.45+cheapStarter+professionDemand:0);
  }

  monteCarloSelectRecruit(guild, arr=this.state.tavern, trials=4, seasons=1){
    if(!arr || !arr.length) return null;
    const totals = new Map();
    for(const c of arr) totals.set(c.id, 0);
    for(const c of arr){
      for(let t=0;t<trials;t++){
        try{
          const sim = new Game();
          sim.isSimulation = true;
          sim.render = ()=>{};
          sim.bindDropSlots = ()=>{};
          sim.openTraitChoice = ()=>{};
          // copy data and state
          sim.data = structuredClone(this.data);
          sim.state = structuredClone(this.state);
          if(sim.rehydrateLoadedState) sim.rehydrateLoadedState();
          // force AI-only simulation
          sim.state.guilds.forEach(g=>g.human=false);
          const gcopy = sim.state.guilds.find(x=>x.id===guild.id);
          if(!gcopy) continue;
          // find matching candidate in simulated tavern
          const candidate = sim.state.tavern.find(x=>x.id===c.id) || sim.state.tavern.find(x=>x.name===c.name);
          if(!candidate) continue;
          // apply the pick appropriately for setup vs normal
          if(sim.state.phase==='setup' && sim.draftFounderForGuild) sim.draftFounderForGuild(gcopy,candidate);
          else if(sim.hire) sim.hire(gcopy,candidate,false);
          // simulate a small number of seasons (just 1, fast)
          for(let s=0;s<seasons;s++){
            if(sim.state.phase==='awaitHuman' || sim.state.phase==='seasonStart'){
              // run AI for other guilds only, skip full turn sequence overhead
              for(const g of sim.snakeGuildOrder().filter(x=>!x.human&&x.id!==guild.id)){
                if(sim.aiTurn) sim.aiTurn(g);
              }
            }
            if(sim.state.phase==='seasonComplete' && sim.nextSeason) sim.nextSeason();
            if(sim.state.phase==='gameOver') break;
          }
          const gscore = (gcopy.reputation||0) + (gcopy.completed||0) + ((gcopy.gold||0)/10);
          totals.set(c.id, (totals.get(c.id)||0) + gscore);
        }catch(e){
          // ignore simulation failures
        }
      }
    }
    let best=null, bestAvg=-Infinity;
    for(const c of arr){
      const total = totals.get(c.id) || 0;
      const avg = total / trials;
      if(avg>bestAvg){ bestAvg=avg; best=c; }
    }
    return best;
  }
  weightedPick(options){const total=options.reduce((s,o)=>s+o.weight,0);let r=Math.random()*total;return (options.find(o=>(r-=o.weight)<=0)||options[0])?.item||null;}
  hire(guild,c,free,cost=null,{sponsored=false}={}){
    if(!c)return false;
    if(!free&&this.activeWorkers(guild).length>=this.guildRosterCap())return false;
    if(!free&&!sponsored&&this.recruitBlockReason(guild,c))return false;
    const s=this.getStatus(c.status);
    if(!free&&!sponsored){guild.gold-=cost??this.recruitCost(guild,c);}else if(free&&guild.roster.length===0){guild.gold=s.startingGold;}
    guild.roster.push(c);
    this.addMercCapacity(guild,c);
    this.state.tavern=this.state.tavern.filter(x=>x!==c);
    if(!free||sponsored)guild.hiredThisSeason=true;
    c.revealAfterSeason=guild.human&&(!free||guild.roster.length>1);
    if(!guild.human)this.revealAllTraits(c,'for AI planning');
    c.history.push(`Year ${this.state.year}: joined ${guild.name}.`);
    return true;
  }
  hireFromTavern(characterId){
    const guild=this.humanGuild();
    const c=this.state.tavern.find(x=>x.id===characterId);
    if(!c||this.state.phase!=='awaitHuman')return false;
    const blocked=this.recruitBlockReason(guild,c);
    if(blocked){this.log(guild,'bad',blocked);this.render();return false;}
    const cost=this.recruitCost(guild,c);
    this.hire(guild,c,false,cost);
    const hidden=this.hiddenTraitCount(c);
    this.log(guild,'recruit',`${guild.name} recruited ${c.name} for ${cost} gold. ${hidden?`${hidden} secondary trait${hidden===1?' is':'s are'} still unknown.`:'They have no secondary traits yet.'}`);
    this.render();
    return true;
  }
  recruitCost(guild,c){
    const base=this.baseRecruitCost(c);
    const discount=this.availableWorkers(guild).flatMap(worker=>this.workerTraitEffects(worker,'recruitCost').filter(effect=>this.effectMatchesContract(effect,null,{guild,worker}))).filter(effect=>effect.type==='discount').reduce((sum,effect)=>sum+(effect.amount||0),0);
    return Math.max(0,base-discount);
  }
  reputationRequirement(c){return ({professional:10,gentry:25,noble:50})[c.status]||0;}
  recruitBlockReason(guild,c){
    if(guild.hiredThisSeason)return `${guild.name} has already hired a mercenary this season.`;
    if(this.activeWorkers(guild).length>=this.guildRosterCap())return `${guild.name} is at its ${this.guildRosterCap()} mercenary capacity.`;
    const required=this.reputationRequirement(c);
    if(guild.reputation<required)return `${c.name} requires ${required} reputation. ${guild.name} has ${guild.reputation}.`;
    const cost=this.recruitCost(guild,c);
    if(guild.gold<cost)return `${guild.name} could not afford ${c.name}.`;
    return '';
  }
  canRecruit(guild,c){return !this.recruitBlockReason(guild,c);}
  severanceCost(c){return Math.max(5,this.baseRecruitCost(c)+this.characterSalary(c)*2);}
  dismissalReputationPenalty(){return 5;}
  releaseMerc(characterId,mode='paid'){
    const guild=this.humanGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.alive)return false;
    if(this.isLockedPlacement(worker,guild)){this.log(guild,'bad',`${worker.name} is committed to contract work and cannot be dismissed right now.`);this.render();return false;}
    if(this.activeWorkers(guild).length<=1){this.log(guild,'bad',`${guild.name} cannot dismiss its last active mercenary.`);this.render();return false;}
    const paid=mode==='paid';
    const severance=this.severanceCost(worker);
    if(paid&&guild.gold<severance){this.log(guild,'bad',`${guild.name} needs ${severance} gold to release ${worker.name} honorably.`);this.render();return false;}
    this.unplaceWorker(worker,guild,true);
    if(paid)guild.gold-=severance;
    else{
      const penalty=this.dismissalReputationPenalty(worker);
      guild.reputation=Math.max(0,guild.reputation-penalty);
      if(!worker.refusesGuildIds.includes(guild.id))worker.refusesGuildIds.push(guild.id);
    }
    this.removeMercCapacity(guild,worker);
    guild.roster=guild.roster.filter(c=>c!==worker);
    worker.placement=null;
    this.state.tavern.push(worker);
    worker.history.push(`Year ${this.state.year}: left ${guild.name}${paid?' with severance':' after a cold dismissal'}.`);
    this.log(guild,paid?'recruit':'bad',paid?`${guild.name} released ${worker.name} honorably for ${severance} gold.`:`${guild.name} dismissed ${worker.name} without severance. Reputation -${this.dismissalReputationPenalty(worker)}.`);
    this.closeCharacterPanel();
    this.render();
    return true;
  }
  guildRosterCap(){return this.data.contractParts.settings.guildRosterCap||6;}

  resolveBoardContract(guild,contract){
    const team=this.placedTeam(guild,contract);
    if(!team.length)return null;
    const progress=this.ensureContractProgress(guild,contract);
    progress.remaining=Math.max(0,progress.remaining-1);
    if(progress.remaining>0){
      this.applyContractProgressTraitEffects(guild,contract,team,progress);
      if(progress.remaining<=0)this.log(guild,'contract',`${guild.name}'s trait engine pushed "${contract.title}" to completion.`);
    }
    if(progress.remaining>0){
      this.log(guild,'contract',`${guild.name} advanced "${contract.title}". ${progress.remaining} season(s) remain.`);
      return 'progress';
    }
    const chance=this.successChanceForTeam(guild,contract,team);
    const roll=Math.random()*100;
    if(roll<=chance||this.convertNearMiss(guild,contract,team,roll,chance))this.succeedBoardContract(guild,contract,chance);
    else this.failBoardContract(guild,contract,chance);
    this.releaseBoardPlacement(guild,contract);
    return 'finished';
  }
  succeedBoardContract(guild,contract,chance){
    const team=this.placedTeam(guild,contract);
    const progress=this.contractProgress(guild,contract);
    const materials=progress?progress.materials:Math.min(guild.resources,contract.materials||0);
    const facilitySupport=this.facilitySupportTraitEffectScore(guild,contract,team,materials);
    guild.gold+=contract.reward.gold;
    guild.reputation+=contract.reward.reputation;
    guild.completed++;
    guild.poolWins=guild.poolWins||{};
    guild.poolWins[contract.pool]=(guild.poolWins[contract.pool]||0)+1;
    this.applyContractWorldEffect(contract);
    this.log(guild,'good',`${guild.name} completed "${contract.title}" at ${chance}% odds. +${contract.reward.gold} gold, +${contract.reward.reputation} reputation.`);
    if(facilitySupport>0)this.log(guild,'good',`${guild.name}'s facility engine added ${facilitySupport}% support to "${contract.title}".`);
    this.applyContractSuccessTraitEffects(guild,contract,team);
  }
  failBoardContract(guild,contract,chance){
    guild.reputation=Math.max(0,guild.reputation-3);
    this.applyFailure(guild,contract);
    this.log(guild,'bad',`${guild.name} failed "${contract.title}" at ${chance}% odds.`);
  }
  convertNearMiss(guild,contract,team,roll,chance){
    const effects=team.flatMap(worker=>this.workerTraitEffects(worker,'contractFailure').filter(effect=>effect.type==='nearMissSuccess'&&this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)})).map(effect=>({worker,effect})));
    for(const {worker,effect} of effects){
      if(roll-chance<=(effect.margin||0)&&Math.random()*100<(effect.chance||0)){
        this.log(guild,'good',`${worker.name}'s ${effect.trait} turned a near miss into a success.`);
        return true;
      }
    }
    return false;
  }
  applyContractSuccessTraitEffects(guild,contract,team){
    for(const worker of team){
      for(const effect of this.workerTraitEffects(worker,'contractSuccess')){
        if(!this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)}))continue;
        if(effect.type==='gainGuild')this.gainGuildStat(guild,effect.stat,effect.amount||1,effect.cap,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='recoverTeam')this.recoverFromGroup(guild,team,effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='recoverGuild')this.recoverFromGroup(guild,this.activeWorkers(guild),effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='recoverSelf')this.recoverFromGroup(guild,[worker],effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='revealRosterTrait')this.revealHiddenTraitFrom(guild,this.activeWorkers(guild),`${worker.name}'s ${effect.trait}`);
        if(effect.type==='revealTavernTrait')this.revealHiddenTraitFrom(guild,this.state.tavern,`${worker.name}'s ${effect.trait}`);
      }
    }
  }
  applyContractProgressTraitEffects(guild,contract,team,progress){
    for(const worker of team){
      for(const effect of this.workerTraitEffects(worker,'contractProgress')){
        if(!this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)}))continue;
        if(effect.type==='advanceWork'&&Math.random()*100<(effect.chance||100)){
          progress.remaining=Math.max(0,progress.remaining-(effect.amount||1));
          this.log(guild,'good',`${worker.name}'s ${effect.trait} advanced "${contract.title}" faster.`);
        }
        if(effect.type==='recoverTeam')this.recoverFromGroup(guild,team,effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
        if(effect.type==='recoverSelf')this.recoverFromGroup(guild,[worker],effect.kinds,effect.amount||1,`${worker.name}'s ${effect.trait}`);
      }
    }
  }
  gainGuildStat(guild,stat,amount,cap=null,source='Trait'){
    if(typeof guild[stat]!=='number')return;
    const before=guild[stat];
    guild[stat]=cap===undefined||cap===null?guild[stat]+amount:Math.min(cap,guild[stat]+amount);
    if(guild[stat]!==before)this.log(guild,'good',`${source} gained ${guild[stat]-before} ${stat}.`);
  }
  recoverFromGroup(guild,workers,kinds=[],amount=1,source='Trait'){
    for(const worker of workers){
      const recovered=this.recoverConditionKinds(worker,kinds,amount);
      if(recovered.length){this.log(guild,'rest',`${source} helped ${worker.name} recover from ${recovered.join(', ')}.`);return true;}
    }
    return false;
  }
  recoverConditionKinds(worker,kinds=[],amount=1){
    const recovered=[];
    let spent=amount;
    worker.conditions=(worker.conditions||[]).map(condition=>{
      if(spent<=0)return condition;
      const def=this.conditionDef(condition.key);
      if(!def||condition.remaining===null||!kinds.includes(def.kind))return condition;
      spent--;
      const next=Math.max(0,condition.remaining-1);
      if(next===0)recovered.push(condition.key);
      return {...condition,remaining:next};
    }).filter(condition=>condition.remaining===null||condition.remaining>0);
    return recovered;
  }
  revealHiddenTraitFrom(guild,workers,source){
    const worker=workers.find(c=>this.hiddenTraitCount(c)>0);
    if(!worker)return false;
    const trait=worker.traits.find(t=>!this.visibleTraits(worker).includes(t));
    if(!trait)return false;
    this.revealTrait(worker,trait);
    worker.history.push(`Year ${this.state.year}: ${source} revealed ${trait}.`);
    this.log(guild,'good',`${source} revealed ${worker.name}'s ${trait}.`);
    return true;
  }
  releaseBoardPlacement(guild,contract){
    for(const id of contract.placements?.[guild.id]||[]){
      const worker=guild.roster.find(c=>c.id===id);
      if(worker)worker.placement=null;
    }
    if(contract.placements)contract.placements[guild.id]=[];
    if(contract.progress)delete contract.progress[guild.id];
  }
  rawSuccessChanceForTeam(guild,c,chars){const progress=this.contractProgress(guild,c);const materials=progress?progress.materials:Math.min(guild.resources,c.materials||0);const score=chars.reduce((s,ch)=>s+this.characterTagScore(ch,c)+ch.resources*3+ch.connections*2-this.conditionPenalty(ch),0)+materials*10+guild.connections*2+this.contractTraitEffectScore(guild,c,chars,materials)+this.facilitySupportTraitEffectScore(guild,c,chars,materials);return Math.round(50+score-c.baseDifficulty);}
  contractTraitEffectScore(guild,contract,team,materials=0){
    let score=0;
    for(const worker of team){
      for(const effect of this.workerTraitEffects(worker,'contractScore')){
        if(!this.effectMatchesContract(effect,contract,{guild,worker,team,materials,role:this.workerContractRole(team,worker)}))continue;
        if(effect.type==='contractBonus')score+=effect.amount||0;
        if(effect.type==='pairBonus'&&team.some(mate=>mate!==worker&&this.workerHasAny(mate,effect.requiresAny)))score+=effect.amount||0;
        if(effect.type==='teamBonus'&&team.some(mate=>mate!==worker&&this.workerHasAny(mate,effect.teammateAny||effect.requiresAny)))score+=effect.amount||0;
        if(effect.type==='patronBonus')score+=effect.amount||0;
        if(effect.type==='roleBonus')score+=effect.amount||0;
        if(effect.type==='worldBonus')score+=effect.amount||0;
        if(effect.type==='materialEcho'&&materials>0)score+=effect.amount||0;
        if(effect.type==='missingMaterialBuffer'&&materials<(contract.materials||0))score+=effect.amount||0;
        if(effect.type==='conditionBuffer'&&this.teamHasConditionKind(team,effect.kinds))score+=effect.amount||0;
      }
    }
    return score;
  }
  facilitySupportTraitEffects(guild,contract,team,materials=0){
    return guild.roster
      .filter(worker=>worker.placement?.type==='facility'&&worker.placement.mode==='work')
      .flatMap(worker=>{
        const facility=this.facilityDef(worker.placement.id);
        return this.workerTraitEffects(worker,'facilitySupport')
          .filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,team,facility,mode:'work',materials}))
          .map(effect=>({worker,facility,effect}));
      });
  }
  facilitySupportTraitEffectScore(guild,contract,team,materials=0){
    return this.facilitySupportTraitEffects(guild,contract,team,materials).reduce((score,{effect})=>{
      if(effect.type==='contractBonus'||effect.type==='roleBonus'||effect.type==='patronBonus'||effect.type==='worldBonus')return score+(effect.amount||0);
      if(effect.type==='materialEcho'&&materials>0)return score+(effect.amount||0);
      if(effect.type==='missingMaterialBuffer'&&materials<(contract.materials||0))return score+(effect.amount||0);
      if(effect.type==='conditionBuffer'&&this.teamHasConditionKind(team,effect.kinds))return score+(effect.amount||0);
      return score;
    },0);
  }
  workerTraitEffects(worker,trigger=null){
    const effects=this.data.characterParts.traitEffects||{};
    return this.visibleTraits(worker).flatMap(trait=>(effects[trait]||[]).filter(effect=>!trigger||effect.trigger===trigger).map(effect=>({...effect,trait})));
  }
  effectMatchesContract(effect,contract=null,ctx={}){
    if(contract){
      if(effect.pools&&!effect.pools.includes(contract.pool))return false;
      if(effect.types&&!effect.types.some(type=>this.contractDomains(contract).includes(type)))return false;
      if(effect.risks&&!effect.risks.includes(contract.risk))return false;
      if(effect.minWorkSeasons&&(contract.workSeasons||1)<effect.minWorkSeasons)return false;
      if(effect.patronTags&&!effect.patronTags.some(tag=>this.contractPatronTags(contract).includes(tag)))return false;
    }
    if(effect.facilities&&!effect.facilities.includes(ctx.facility?.key))return false;
    if(effect.modes&&!effect.modes.includes(ctx.mode))return false;
    if(effect.roles&&!effect.roles.includes(ctx.role))return false;
    if(effect.selfHasAny&&(!ctx.worker||!this.workerHasAny(ctx.worker,effect.selfHasAny)))return false;
    if(effect.selfHasAll&&(!ctx.worker||!effect.selfHasAll.every(tag=>this.visibleTraits(ctx.worker).includes(tag))))return false;
    if(effect.victimSelf&&ctx.victim!==ctx.worker)return false;
    if(effect.teammateAny&&!(ctx.team||[]).some(mate=>mate!==ctx.worker&&this.workerHasAny(mate,effect.teammateAny)))return false;
    if(effect.teammateConditionKinds&&!this.teamHasConditionKind((ctx.team||[]).filter(mate=>mate!==ctx.worker),effect.teammateConditionKinds))return false;
    if(effect.world&&!Object.entries(effect.world).every(([key,band])=>this.worldBand(key)===band))return false;
    if(effect.minAssignedContractMercs&&this.assignedContractMercCount(ctx.guild)<effect.minAssignedContractMercs)return false;
    return true;
  }
  contractPatronTags(contract){return [...new Set([contract.patron?.trait,...(contract.support||[]).map(r=>r.trait)].filter(Boolean))];}
  workerContractRole(team,worker){return team.indexOf(worker)===0?'lead':'support';}
  assignedContractMercCount(guild){return guild?guild.roster.filter(c=>c.placement?.type==='contract').length:0;}
  worldBand(key){const value=this.state.world.values[key]??50;return value<35?'low':value>65?'high':'mid';}
  workerHasAny(worker,tags=[]){return this.visibleTraits(worker).some(t=>tags.includes(t));}
  teamHasConditionKind(team,kinds=[]){return team.some(worker=>(worker.conditions||[]).some(condition=>kinds.includes(this.conditionDef(condition.key)?.kind)));}
  conditionPenalty(c){return (c.conditions||[]).reduce((s,condition)=>s+(this.conditionDef(condition.key)?.penalty||0),0);}
  conditionDef(key){return this.data.contractParts.conditions.find(c=>c.key===key);}
  successChanceForTeam(guild,c,chars){return this.clamp(this.rawSuccessChanceForTeam(guild,c,chars),2,98);}
  applyContractWorldEffect(contract){
    const pool=this.data.contractParts.world.pools.find(p=>p.key===contract.pool);
    if(!pool?.effects)return;
    for(const [key,delta] of Object.entries(pool.effects)) this.state.world.values[key]=this.clamp((this.state.world.values[key]??50)+delta,0,100);
  }
  applyFailure(guild,c){
    const total=c.failure.reduce((s,f)=>s+f.weight,0);
    let r=Math.random()*total;
    const f=c.failure.find(x=>(r-=x.weight)<=0)||c.failure[0];
    const assigned=(c.placements?.[guild.id]||[]).map(id=>guild.roster.find(ch=>ch.id===id)).filter(Boolean);
    const victim=assigned[Math.floor(Math.random()*assigned.length)];
    const softened=this.softenedFailure(guild,c,assigned,f,victim);
    if(softened==='ignore')return;
    const softenedBy=softened&&softened!==true?softened:null;
    const isSoftened=Boolean(softened);
    if(f.type==='gold_loss'){
      const loss=isSoftened?Math.ceil(f.amount/2):f.amount;
      guild.gold=Math.max(0,guild.gold-loss);
      if(softenedBy)this.logSoftenedFailure(guild,softenedBy,f,victim,'reduced gold loss');
      this.log(guild,'bad',`${guild.name} paid ${loss} gold in failure costs.`);
    }
    if(f.type==='material_loss'){
      const loss=Math.min(guild.resources,isSoftened?Math.ceil(f.amount/2):f.amount);
      guild.resources-=loss;
      if(softenedBy)this.logSoftenedFailure(guild,softenedBy,f,victim,'reduced Resource loss');
      if(loss>0)this.log(guild,'bad',`${guild.name} lost ${loss} Resource${loss===1?'':'s'} from the failed work.`);
    }
    if(f.type==='reputation_loss'){
      if(softenedBy)this.logSoftenedFailure(guild,softenedBy,f,victim,'reduced reputation loss');
      guild.reputation=Math.max(0,guild.reputation-(isSoftened?Math.ceil(f.amount/2):f.amount));
    }
    const context={contract:c,team:assigned,victim};
    if(f.type==='negative_trait'&&victim&&!isSoftened)this.addCondition(victim,f.trait,c.title,guild,context);
    if(f.type==='injury'&&victim&&!isSoftened)this.addCondition(victim,'Injured',c.title,guild,context);
    if(f.type==='death'&&victim&&!isSoftened)this.applySevereHarm(guild,victim,c.title,context);
    if(isSoftened&&['negative_trait','injury','death'].includes(f.type)&&victim){
      if(softenedBy)this.logSoftenedFailure(guild,softenedBy,f,victim,'Shaken');
      this.addCondition(victim,'Shaken',c.title,guild,context);
    }
  }
  softenedFailure(guild,contract,team,failure,victim){
    const effects=team.flatMap(worker=>this.workerTraitEffects(worker,'contractFailure').filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker),victim})).map(effect=>({worker,effect})));
    for(const {worker,effect} of effects){
      if(effect.type==='softenFailure'&&effect.failureTypes?.includes(failure.type)&&Math.random()*100<(effect.chance||0)){
        return {worker,effect};
      }
      if(effect.type==='ignoreCondition'&&['negative_trait','injury'].includes(failure.type)&&victim===worker&&Math.random()*100<(effect.chance||0)){
        this.log(guild,'good',`${worker.name}'s ${effect.trait} prevented ${worker.name} from gaining ${this.failureResultLabel(failure)}.`);
        return 'ignore';
      }
    }
    return false;
  }
  logSoftenedFailure(guild,softened,failure,victim,result){
    const actor=softened.worker;
    const trait=softened.effect.trait;
    const target=victim?.name||guild.name;
    this.log(guild,'good',`${actor.name}'s ${trait} saved ${target}, turning ${this.failureResultLabel(failure)} into ${result}.`);
  }
  failureResultLabel(failure){
    if(failure.type==='death')return 'Dead';
    if(failure.type==='injury')return 'Injured';
    if(failure.type==='negative_trait')return failure.trait||'a condition';
    if(failure.type==='gold_loss')return 'full gold loss';
    if(failure.type==='material_loss')return 'full Resource loss';
    if(failure.type==='reputation_loss')return 'full reputation loss';
    return failure.type;
  }
  addCondition(character,key,source,guild=null,context={}){
    const def=this.conditionDef(key)||this.conditionDef('Shaken');
    const conditionKey=def.key;
    character.conditions=character.conditions||[];
    const existing=character.conditions.find(c=>c.key===conditionKey);
    const remaining=def.duration===null?null:def.duration;
    if(existing){existing.remaining=existing.remaining===null?null:Math.max(existing.remaining,remaining);return;}
    character.conditions.push({key:conditionKey,remaining});
    character.history.push(`Year ${this.state.year}: gained ${conditionKey} during ${source}.`);
    if(guild)this.log(guild,'bad',`${character.name} became ${conditionKey} during "${source}".`);
    if(guild)this.applyConditionAddedTraitEffects(guild,character,def,{...context,condition:def});
  }
  applyConditionAddedTraitEffects(guild,victim,condition,context={}){
    const team=context.team||[];
    for(const worker of team){
      for(const effect of this.workerTraitEffects(worker,'conditionAdded')){
        if(!this.effectMatchesContract(effect,context.contract,{guild,worker,team,victim,condition,role:this.workerContractRole(team,worker)}))continue;
        const source=`${worker.name}'s ${effect.trait}`;
        if(effect.conditionKinds&&!effect.conditionKinds.includes(condition.kind))continue;
        if(effect.type==='gainGuild')this.gainGuildStat(guild,effect.stat,effect.amount||1,effect.cap,source);
        if(effect.type==='recoverVictim')this.recoverFromGroup(guild,[victim],effect.kinds||[condition.kind],effect.amount||1,source);
        if(effect.type==='recoverTeam')this.recoverFromGroup(guild,team,effect.kinds||[condition.kind],effect.amount||1,source);
      }
    }
  }
  applySevereHarm(guild,character,source,context={}){
    if(Math.random()<0.35&&!this.hasCondition(character,'Maimed')){
      this.addCondition(character,'Maimed',source,guild,context);
      return;
    }
    character.alive=false;
    character.placement=null;
    this.removeMercCapacity(guild,character);
    character.conditions=(character.conditions||[]).filter(c=>c.key!=='Dead');
    character.conditions.push({key:'Dead',remaining:null});
    character.history.push(`Year ${this.state.year}: died during ${source}.`);
    this.log(guild,'bad',`${character.name} died during "${source}".`);
    this.applyDeathTraitEffects(guild,character,{...context,source});
  }
  applyDeathTraitEffects(guild,victim,context={}){
    const team=context.team||[];
    for(const worker of team.filter(c=>c.alive)){
      for(const effect of this.workerTraitEffects(worker,'death')){
        if(!this.effectMatchesContract(effect,context.contract,{guild,worker,team,victim,role:this.workerContractRole(team,worker)}))continue;
        const source=`${worker.name}'s ${effect.trait}`;
        if(effect.type==='gainGuild')this.gainGuildStat(guild,effect.stat,effect.amount||1,effect.cap,source);
        if(effect.type==='recoverGuild')this.recoverFromGroup(guild,this.activeWorkers(guild),effect.kinds,effect.amount||1,source);
        if(effect.type==='contractBonusNext')this.log(guild,'good',`${source} hardened ${guild.name} after ${victim.name}'s death.`);
      }
    }
  }
  hasCondition(character,key){return (character.conditions||[]).some(c=>c.key===key);}
  nextSeason(){
    if(this.state.seasonIndex===3){if(this.state.year===20){this.endGame();return;}this.state.year++;this.state.seasonIndex=0;this.state.starterIndex=(this.state.starterIndex+1)%4;}else this.state.seasonIndex++;
    this.startSeason();
  }
  endGame(){this.state.phase='gameOver';const ranked=[...this.state.guilds].sort((a,b)=>(b.reputation+b.completed+b.gold/10)-(a.reputation+a.completed+a.gold/10));this.log(null,'game',`${ranked[0].name} wins. Final score uses reputation, completed contracts, and gold.`);this.render();}

  log(guild,type,summary){this.state.log.unshift({year:this.state.year,season:this.currentSeason(),guildId:guild?.id||null,type,summary});this.state.log.length=Math.min(this.state.log.length,80);}

  render(){this.ui.date.textContent=`Year ${this.state.year} - ${this.currentSeason()}`;const active=this.state.guilds.find(g=>g.id===this.state.activeGuildId);const humanDraft=this.state.phase==='setup'&&active?.human;this.ui.phase.textContent=this.state.phase==='setup'&&active?`${active.name} draft`:this.state.phase==='aiTurn'&&active?`${active.name} turn`:this.state.phase;this.ui.advance.textContent=this.state.phase==='setup'?'Drafting':this.state.phase==='seasonComplete'?'Next Season':this.state.phase==='gameOver'?'Game Over':'Resolve Season';this.ui.advance.disabled=this.state.phase==='setup'||this.state.phase==='gameOver'||this.state.phase==='aiTurn';this.ui.tavernBtn.textContent=humanDraft?`${this.state.tavernOpen?'Hide':'Show'} Founder Draft`:`Tavern (${this.state.tavern.length})`;this.ui.tavernBtn.classList.toggle('has-new',this.state.tavernHasNew||humanDraft&&!this.state.tavernOpen);this.renderGuilds();this.renderWorld();this.renderPeople();this.renderTavern();this.renderContracts();this.renderFacilities();this.ui.humanStatus.textContent=this.state.phase==='setup'?(active?.human?'Pick':'Watch'):this.state.phase==='awaitHuman'?'Drag':this.state.phase==='aiTurn'?'Watch':'';
    this.maybeContinueSetupDraft();
  }
  renderGuilds(){
    this.ui.guildGrid.innerHTML=this.state.guilds.map(g=>`<article class="guild-card has-tip ${g.human?'human':''} ${g.id===this.state.activeGuildId?'acting':''}" role="button" tabindex="0" data-guild-id="${g.id}" data-tip="${this.escapeAttr(`${this.guildTip(g)}\nClick to inspect roster.`)}"><h3>${g.name}${g.human?' - You':''}</h3><div class="guild-identity">${this.guildIdentity(g).label}</div><div class="guild-score"><span><strong>${g.gold}</strong>Gold</span><span><strong>${g.reputation}</strong>Rep</span><span><strong>${g.completed}</strong>Done</span><span><strong>${g.resources}</strong>Res</span><span><strong>${g.connections}</strong>Conn</span></div></article>`).join('');
    this.ui.guildGrid.querySelectorAll('.guild-card').forEach(card=>{
      card.addEventListener('click',()=>this.openGuildPanel(card.dataset.guildId));
      card.addEventListener('keydown',evt=>{if(evt.key==='Enter'||evt.key===' '){evt.preventDefault();this.openGuildPanel(card.dataset.guildId);}});
    });
  }
  guildTip(guild){return `${guild.name}${guild.human?' - Your guild':' - Rival guild'}${guild.personality?.label?`\nProfile: ${guild.personality.label}.`:''}\nEmergent identity: ${this.guildIdentity(guild).label}.\nGold: ${guild.gold}.\nReputation: ${guild.reputation}.\nCompleted contracts: ${guild.completed}.\nResources: ${guild.resources}. Contracts check Resources as capacity and do not spend them; each covered requirement gives +10% odds.\nConnections: ${guild.connections}. Each guild Connection gives +2% odds on contracts.\nWorkers: ${this.activeWorkers(guild).length}.\nPlaced this season: ${guild.roster.filter(c=>this.isPlaced(c)).length}.\nEngine: ${this.engineSummary(guild)}.`;}
  engineSummary(guild){
    const placed=this.data.contractParts.facilities.filter(f=>this.facilityWorkers(guild,f.key).length).map(f=>`${f.label} ${this.facilityWorkers(guild,f.key).length}`);
    const engines=this.activeWorkers(guild).map(c=>this.workerEngineSummary(c)).filter(Boolean).slice(0,2);
    return [...engines,...placed].join(', ')||'No active trait engines yet';
  }
  guildIdentity(guild){
    const scores={};
    const add=(key,amount)=>{if(key)scores[key]=(scores[key]||0)+amount;};
    const poolIdentity={Agriculture:'Relief Brotherhood',Military:'Military Company',Commerce:'Merchant House',Exploration:'Explorer Lodge',Religion:'Religious Order',Civic:'Civic League',Crafting:'Craft Guild'};
    for(const [pool,count] of Object.entries(guild.poolWins||{}))add(poolIdentity[pool]||pool,count);
    for(const worker of this.activeWorkers(guild))for(const trait of this.visibleTraits(worker))add(this.traitIdentity(trait),0.15);
    const [label,score]=Object.entries(scores).sort((a,b)=>b[1]-a[1])[0]||['Unproven Guild',0];
    return {label:score>=2?label:'Unproven Guild',score};
  }
  traitIdentity(trait){
    const affinity=this.data.characterParts.tagAffinities?.[trait];
    const domains=affinity?.domains||[];
    if(domains.some(d=>['Military','Combat','Defense','Assault','Guard Duty','Hunt','Legendary Hunt'].includes(d)))return 'Military Company';
    if(domains.some(d=>['Commerce','Accounting','Diplomacy','Influence'].includes(d)))return 'Merchant House';
    if(domains.some(d=>['Scholarship','Inquiry','Legal','Administration'].includes(d)))return 'Scholarly Society';
    if(domains.some(d=>['Relief','Sanitation','Religion','Pilgrimage'].includes(d)))return 'Religious Order';
    if(domains.some(d=>['Construction','Engineering','Crafting','Manufacturing','Foundry','Extraction'].includes(d)))return 'Craft Guild';
    if(domains.some(d=>['Exploration','Intrigue','Logistics'].includes(d)))return 'Explorer Lodge';
    if(domains.some(d=>['Civic','Public Works'].includes(d)))return 'Civic League';
    return null;
  }
  renderWorld(){const world=this.state.world;this.ui.world.innerHTML=`<article class="world-card"><strong>World State</strong><span>${world.name}</span></article>`+this.data.contractParts.world.states.map(s=>{const value=world.values[s.key];const trend=world.trend[s.key]||0;const band=value<35?s.low:value>65?s.high:s.mid;const arrow=trend>3?'rising':trend<-3?'falling':'steady';return `<article class="world-card has-tip" data-tip="${this.escapeAttr(this.worldStateTip(s,value,trend))}"><strong>${s.label}</strong><span>${band}, ${arrow}</span></article>`;}).join('');}
  renderPeople(){
    const human=this.humanGuild();
    this.ui.peopleGrid.innerHTML=human.roster.map(c=>this.workerToken(c)).join('')||'<p class="empty">No workers.</p>';
    this.ui.recoveryGrid.innerHTML=Array.from({length:this.recoverySlotCount()},(_,i)=>this.recoverySlot(this.recoveryWorkers(human)[i])).join('');
    this.ui.peopleGrid.querySelectorAll('.merc-token').forEach(token=>{token.addEventListener('click',()=>this.openCharacterPanel(token.dataset.id));});
    this.bindDragSources();
    this.bindReturnDrop(this.ui.peopleGrid);
  }
  workerToken(c){const placed=Boolean(c.placement);const locked=this.isLockedPlacement(c);const conditions=(c.conditions||[]).map(x=>x.key).join(', ');return `<div class="merc-token has-tip ${placed?'assigned':''} ${locked?'locked':''} ${c.alive?'':'dead'}" role="button" tabindex="0" draggable="${c.alive&&this.state.phase==='awaitHuman'&&!this.state.humanActionUsed&&!locked?'true':'false'}" data-id="${c.id}" data-tip="${this.escapeAttr(this.characterSummaryTip(c))}"><strong>${this.workerInitials(c)}</strong><div class="token-meta">${c.name}</div><div class="token-meta">${c.archetype}${locked?' - committed':placed?' - placed':''}</div><div class="token-meta">${this.traitPreviewText(c)}</div>${conditions?`<div class="token-meta">${conditions}</div>`:''}</div>`;}
  renderDetail(){return;}
  guildInspectionHtml(guild){
    const identity=this.guildIdentity(guild);
    const roster=guild.roster.map(c=>this.guildRosterRow(c,guild)).join('')||'<p class="empty">No hired mercenaries.</p>';
    const profile=guild.personality?.label?`<span>${this.escapeHtml(guild.personality.label)} AI</span>`:'';
    return `<article class="game-card guild-inspection"><div class="guild-inspection-summary"><span><strong>${guild.gold}</strong>Gold</span><span><strong>${guild.reputation}</strong>Rep</span><span><strong>${guild.completed}</strong>Done</span><span><strong>${guild.resources}</strong>Resources</span><span><strong>${guild.connections}</strong>Connections</span></div><div class="guild-inspection-meta"><span>${this.escapeHtml(identity.label)}</span>${profile}<span>${this.activeWorkers(guild).length}/${guild.roster.length} active</span></div><div class="guild-roster-list">${roster}</div></article>`;
  }
  guildRosterRow(c,guild){
    const s=this.getStatus(c.status);
    const conditions=(c.conditions||[]).map(condition=>condition.key).join(', ');
    return `<div class="guild-roster-row has-tip ${c.alive?'':'dead'}" role="button" tabindex="0" data-inspect-character="${c.id}" data-tip="${this.escapeAttr(`${this.characterSummaryTip(c,true)}\nClick for full trait rules.`)}"><div><strong>${this.escapeHtml(c.name)}</strong><p>${this.escapeHtml(c.archetype)} - ${this.escapeHtml(s.name)}</p><div class="guild-row-traits">${c.traits.map(t=>this.tagHtml(t)).join('')}</div>${conditions?`<p class="guild-roster-conditions">${this.escapeHtml(conditions)}</p>`:''}</div><span class="guild-roster-status">${this.escapeHtml(this.workerPlacementText(c,guild))}</span></div>`;
  }
  workerPlacementText(worker,guild){
    if(!worker.alive)return 'Dead';
    const placement=worker.placement;
    if(!placement)return 'Available';
    if(placement.type==='contract'){
      const contract=this.state.boardContracts.find(c=>c.instanceId===placement.id);
      const progress=contract&&this.contractProgress(guild,contract);
      const title=contract?.title||'contract';
      return `${progress?'Committed':'Placed'}: ${title}`;
    }
    if(placement.type==='facility'){
      const facility=this.facilityDef(placement.id);
      return `Working: ${facility?.label||placement.id}`;
    }
    if(placement.type==='recovery')return 'Recovering';
    return 'Placed';
  }
  characterSummaryTip(c,showAllTraits=false){const s=this.getStatus(c.status);const conditions=(c.conditions||[]).map(x=>x.key).join(', ')||'None';return `${c.name}\n${c.archetype} - ${s.name}\nTraits: ${this.traitPreviewText(c,showAllTraits)}\nUpkeep: ${this.characterSalary(c)}g/year.\nResources: ${c.resources}. Connections: ${c.connections}.\nConditions: ${conditions}.\nClick to open sheet.`;}
  characterCard(c,{showHistory=false,showAllTraits=false,guild=null}={}){
    const s=this.getStatus(c.status);
    const owner=guild?`<p class="archetype">${this.escapeHtml(guild.name)}</p>`:'';
    const status=guild?this.workerPlacementText(c,guild):c.alive?(this.isPlaced(c)?'Placed':'Available'):'Dead';
    const conditions=(c.conditions||[]).map(condition=>this.conditionHtml(condition)).join('');
    return `<article class="game-card character-card"><div class="card-header"><div><h3>${c.name}</h3><p class="archetype">${c.archetype}</p>${owner}</div><span class="status-badge has-tip" data-tip="${this.escapeAttr(this.statusTip(s))}">${s.name}</span></div><div class="traits">${this.renderTraitChips(c,showAllTraits)}</div>${conditions?`<div class="conditions">${conditions}</div>`:''}<dl class="stats"><dt>Recruit cost</dt><dd>${this.baseRecruitCost(c)}</dd><dt>Annual salary</dt><dd>${this.characterSalary(c)}</dd><dt>Reputation required</dt><dd>${this.reputationRequirement(c)}</dd><dt>Resources</dt><dd>${c.resources}</dd><dt>Connections</dt><dd>${c.connections}</dd><dt>Status</dt><dd>${this.escapeHtml(status)}</dd></dl>${this.dismissalHtml(c,guild)}${this.characterEngineHtml(c,showAllTraits)}${showHistory?`<p class="history">${c.history.slice(-3).join(' ')||'No history yet.'}</p>`:''}</article>`;
  }
  dismissalHtml(c,guild){
    if(!guild?.human||!c.alive)return '';
    const disabled=this.state.phase!=='awaitHuman'||this.state.humanActionUsed||this.isLockedPlacement(c,guild)||this.activeWorkers(guild).length<=1;
    const severance=this.severanceCost(c);
    const penalty=this.dismissalReputationPenalty(c);
    const note=disabled?'Available only on your turn, not for committed workers, and not for your last active merc.':'Choose severance or reputation damage.';
    return `<section class="dismissal-actions"><h4>Release</h4><p>${this.escapeHtml(note)}</p><div class="trait-choice-grid"><div class="trait-choice ${disabled||guild.gold<severance?'keep':''}" role="button" tabindex="0" data-release-merc="paid" data-character-id="${c.id}">Pay ${severance}g severance</div><div class="trait-choice danger-choice ${disabled?'keep':''}" role="button" tabindex="0" data-release-merc="cold" data-character-id="${c.id}">No severance: -${penalty} reputation</div></div></section>`;
  }
  characterEngineHtml(c,showAllTraits=false){
    const traits=showAllTraits?c.traits:this.visibleTraits(c);
    const rules=traits.flatMap(trait=>(this.data.characterParts.traitEffects?.[trait]||[]).map(effect=>({trait,effect})));
    if(!rules.length)return `<section class="engine-rules"><h4>Engine Rules</h4><p class="empty">No revealed trait rules yet.</p></section>`;
    return `<section class="engine-rules"><h4>Engine Rules</h4>${rules.map(({trait,effect})=>`<div class="engine-rule"><strong>${this.escapeHtml(trait)}</strong><span>${this.escapeHtml(this.effectTriggerLabel(effect))}</span><p>${this.escapeHtml(this.effectRuleText(effect))}</p></div>`).join('')}</section>`;
  }
  effectTriggerLabel(effect){
    const labels={contractScore:'Contract odds',contractSuccess:'On success',contractFailure:'On failure',contractProgress:'Long work',facilityResolve:'Facility placement',facilitySupport:'Facility support',facilityWork:'Training',conditionAdded:'When condition lands',death:'On death',recruitCost:'Recruiting'};
    const scopes=[];
    if(effect.facilities)scopes.push(effect.facilities.map(key=>this.facilityDef(key)?.label||key).join(', '));
    if(effect.types)scopes.push(effect.types.join(', '));
    if(effect.risks)scopes.push(effect.risks.join(', '));
    if(effect.roles)scopes.push(effect.roles.join('/'));
    return [labels[effect.trigger]||effect.trigger,...scopes].filter(Boolean).join(' - ');
  }
  effectRuleText(effect){
    const filters=this.effectFilterClauses(effect);
    const when=this.effectTriggerText(effect);
    const result=this.effectResultText(effect);
    return `${when}${filters.length?` (${filters.join('; ')})`:''}: ${result}.`;
  }
  effectTriggerText(effect){
    const labels={
      contractScore:'Contract odds',
      contractSuccess:'Contract success',
      contractFailure:'Contract failure',
      contractProgress:'Unfinished contract progress',
      facilityResolve:'Facility resolve',
      facilitySupport:'Facility support',
      facilityWork:'Facility training',
      conditionAdded:'Condition added',
      death:'Contract death',
      recruitCost:'Recruiting'
    };
    return labels[effect.trigger]||`When ${effect.trigger} triggers`;
  }
  effectFilterClauses(effect){
    const clauses=[];
    if(effect.types)clauses.push(this.formatList(effect.types));
    if(effect.risks)clauses.push(`risk: ${this.formatList(effect.risks)}`);
    if(effect.roles)clauses.push(`role: ${this.formatList(effect.roles)}`);
    if(effect.facilities)clauses.push(this.formatList(effect.facilities.map(key=>this.facilityDef(key)?.label||key)));
    if(effect.patronTags)clauses.push(`patron/support tag: ${this.formatList(effect.patronTags)}`);
    if(effect.minWorkSeasons)clauses.push(`work >= ${effect.minWorkSeasons} seasons`);
    if(effect.world)clauses.push(...Object.entries(effect.world).map(([key,band])=>`${this.worldLabel(key)}: ${band}`));
    if(effect.conditionKinds)clauses.push(`condition: ${this.formatList(effect.conditionKinds)}`);
    if(effect.failureTypes)clauses.push(`failure: ${this.formatList(effect.failureTypes)}`);
    if(effect.selfHasAny)clauses.push(`this worker has ${this.formatList(effect.selfHasAny)}`);
    if(effect.selfHasAll)clauses.push(`this worker has all of ${this.formatList(effect.selfHasAll)}`);
    if(effect.victimSelf)clauses.push('self affected');
    if(effect.teammateConditionKinds)clauses.push(`teammate condition: ${this.formatList(effect.teammateConditionKinds)}`);
    return clauses;
  }
  effectResultText(effect){
    const amount=effect.amount||1;
    const chance=effect.chance??100;
    const stat=this.statLabel(effect.stat,amount);
    const teammateTags=effect.teammateAny||effect.requiresAny;
    if(effect.type==='contractBonus'||effect.type==='roleBonus'||effect.type==='patronBonus'||effect.type==='worldBonus')return `+${amount}% success chance`;
    if(effect.type==='pairBonus'||effect.type==='teamBonus')return `+${amount}% success chance if teammate has ${this.formatList(teammateTags||[])}`;
    if(effect.type==='materialEcho')return `+${amount}% success chance if guild covers 1+ Resource requirement`;
    if(effect.type==='missingMaterialBuffer')return `+${amount}% success chance if guild Resources are below contract requirement`;
    if(effect.type==='conditionBuffer')return `+${amount}% success chance if team has ${this.formatList(effect.kinds||[])} condition`;
    if(effect.type==='gainGuild')return `+${amount} ${stat}${effect.cap!==undefined?` (max ${effect.cap})`:''}`;
    if(effect.type==='goldPerAssignedContractMerc')return `+${amount} gold per merc assigned to contracts`;
    if(effect.type==='statPerAssignedContractMerc')return `+${amount} ${stat} per merc assigned to contracts`;
    if(effect.type==='revealRosterTrait')return 'reveal 1 hidden roster trait';
    if(effect.type==='revealTavernTrait')return 'reveal 1 hidden tavern trait';
    if(effect.type==='recoverGuild')return `recover ${amount} ${this.formatList(effect.kinds||[])} condition step from any active guild member`;
    if(effect.type==='recoverTeam')return `recover ${amount} ${this.formatList(effect.kinds||[])} condition step from assigned team`;
    if(effect.type==='recoverSelf')return `recover ${amount} ${this.formatList(effect.kinds||[])} condition step from self`;
    if(effect.type==='recoverVictim')return `recover ${amount} ${this.formatList(effect.kinds||[])} condition step from affected worker`;
    if(effect.type==='trainingAssist')return `+${amount}% training chance`;
    if(effect.type==='advanceWork')return `${chance}% chance: -${amount} extra remaining work`;
    if(effect.type==='softenFailure')return `${chance}% chance: halve gold/reputation/Resource loss; condition/death becomes Shaken`;
    if(effect.type==='ignoreCondition')return `${chance}% chance: prevent new injury/negative condition`;
    if(effect.type==='nearMissSuccess')return `${chance}% chance: success if failed by ${effect.margin||0} or less`;
    if(effect.type==='discount')return `-${amount} gold recruit cost`;
    if(effect.type==='contractBonusNext')return 'no current numeric effect';
    return effect.description||'apply this trait effect';
  }
  formatList(items=[]){
    const list=[...items].filter(Boolean);
    if(!list.length)return 'any matching value';
    if(list.length===1)return String(list[0]);
    if(list.length===2)return `${list[0]} or ${list[1]}`;
    return `${list.slice(0,-1).join(', ')}, or ${list.at(-1)}`;
  }
  statLabel(stat,amount=1){
    const labels={gold:'gold',reputation:'reputation',resources:amount===1?'Resource':'Resources',connections:amount===1?'Connection':'Connections'};
    return labels[stat]||stat||'guild stat';
  }
  renderTavern(){
    const setupGuild=this.currentSetupGuild();
    const setupDraft=this.state.phase==='setup'&&setupGuild;
    const humanDraft=setupDraft&&setupGuild.human;
    const isOpen=this.state.phase==='setup'?(humanDraft?this.state.tavernOpen:Boolean(setupGuild)):this.state.tavernOpen;
    this.ui.tavernPanel.classList.toggle('closed',!isOpen);
    this.ui.tavernPanel.classList.remove('setup-draft');
    this.ui.tavernClose.style.visibility=humanDraft?'visible':'hidden';
    this.ui.tavernClose.textContent=humanDraft?'Hide':'Close';
    this.ui.tavernEyebrow.textContent=setupDraft?'Founding Draft':'Tavern';
    this.ui.tavernTitle.textContent=setupDraft?`${setupGuild.name} ${setupGuild.human?'chooses':'is choosing'} a Founder`:'Available Recruits';
    if(setupDraft){
      this.ui.recruitGrid.innerHTML=this.state.tavern.map(c=>{const s=this.getStatus(c.status);return `<div class="merc-token founder-token ${setupGuild.human?'':'locked'}" role="button" tabindex="0" data-id="${c.id}"><strong>${c.name}</strong><div class="token-meta">${c.archetype} - ${s.name}</div><div class="token-meta">${c.traits.join(', ')}</div><div class="token-meta">Upkeep: ${this.characterSalary(c)}g/year</div><div class="token-meta">${setupGuild.human?'Draft founder':'Available'}</div></div>`;}).join('')||'<p class="empty">The tavern is empty.</p>';
      if(setupGuild.human)document.querySelectorAll('.founder-token').forEach(b=>b.addEventListener('click',()=>{this.state.tavernHasNew=false;this.draftFounder(b.dataset.id);}));
      return;
    }
    const human=this.humanGuild();
    this.ui.recruitGrid.innerHTML=(this.state.tavern.map(c=>{
      const s=this.getStatus(c.status);
      const cost=this.recruitCost(human,c);
      const required=this.reputationRequirement(c);
      const blocked=this.recruitBlockReason(human,c);
      const status=blocked||'Hire recruit';
      const tip=`${c.name}\n${s.name}. ${cost} gold hire, ${this.characterSalary(c)}g annual upkeep.\nReputation required: ${required}.\nOne paid tavern hire per season. Founders ignore reputation requirements.`;
      return `<div class="merc-token recruit-token has-tip ${blocked?'dead':''}" role="button" tabindex="0" data-id="${c.id}" data-tip="${this.escapeAttr(tip)}"><strong>${c.name}</strong><div class="token-meta">${c.archetype} - ${cost}g hire</div><div class="token-meta">${this.traitPreviewText(c)}</div><div class="token-meta">Upkeep: ${this.characterSalary(c)}g/year</div>${required?`<div class="token-meta">Requires ${required} rep</div>`:''}<div class="token-meta">${this.escapeHtml(status)}</div></div>`;
    }).join('')||'<p class="empty">The tavern is empty.</p>');
    if(isOpen)this.state.tavernHasNew=false;
    document.querySelectorAll('.recruit-token').forEach(b=>b.addEventListener('click',()=>this.hireFromTavern(b.dataset.id)));
  }
  escapeAttr(s){return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  escapeHtml(s){return this.escapeAttr(s);}
  hiddenTraitCount(c){return Math.max(0,c.traits.length-(c.revealedTraits?.length||0));}
  traitPreviewText(c,showAllTraits=false){return showAllTraits?c.traits.join(', '):[...this.visibleTraits(c),...Array(this.hiddenTraitCount(c)).fill('?')].join(', ');}
  renderTraitChips(c,showAllTraits=false){
    if(showAllTraits)return c.traits.map(t=>this.tagHtml(t)).join('');
    return this.visibleTraits(c).map(t=>this.tagHtml(t)).join('')+Array.from({length:this.hiddenTraitCount(c)},()=>`<span class="trait has-tip" data-tip="${this.escapeAttr('Unknown trait\nThis will reveal after the next season progression.')}">?</span>`).join('');
  }
  tagHtml(tag){return `<span class="trait has-tip" data-tip="${this.escapeAttr(this.tagTip(tag))}">${tag}</span>`;}
  conditionHtml(condition){return `<span class="condition has-tip" data-tip="${this.escapeAttr(this.conditionTip(condition))}">${condition.key}${condition.remaining===null?'':` ${condition.remaining}`}</span>`;}
  conditionTip(condition){
    const def=this.conditionDef(condition.key);
    if(!def)return condition.key;
    const duration=condition.remaining===null?'Permanent':`${condition.remaining} season${condition.remaining===1?'':'s'} remaining`;
    const penalty=def.penalty?`-${def.penalty}% success chance when assigned to contract work.`:'No contract success penalty.';
    return `${condition.key}\n${penalty}\n${duration}.`;
  }
  contractTagHtml(req,kind){return `<span class="has-tip" data-tip="${this.escapeAttr(this.tagTip(req.trait,this.explicitTagWeight(req,kind)))}">${req.trait}</span>`;}
  tagTip(tag,weight=null){
    const profession=this.data.characterParts.professions.find(p=>p.name===tag);
    const affinity=this.data.characterParts.tagAffinities?.[tag];
    const primary=this.data.contracts.filter(c=>c.requirements.some(r=>r.trait===tag)).slice(0,4).map(c=>c.type);
    const support=this.data.contracts.filter(c=>c.support.some(r=>r.trait===tag)).slice(0,4).map(c=>c.type);
    const lines=[tag];
    if(profession) lines.push(`Profession: usually ${this.getStatus(profession.status).name}, ${profession.resources} resources, ${profession.connections} connections before variance.`);
    if(weight!==null) lines.push(`This contract weight: +${weight}% success for each assigned worker with this tag.`);
    if(affinity) lines.push(`Broad fit: +${affinity.bonus||5}% on ${affinity.domains.join(', ')} contracts. ${affinity.description||''}`);
    const effects=this.data.characterParts.traitEffects?.[tag]||[];
    for(const effect of effects)lines.push(`Engine: ${this.effectRuleText(effect)}`);
    if(primary.length) lines.push(`Primary demand: ${[...new Set(primary)].join(', ')}.`);
    if(support.length) lines.push(`Support demand: ${[...new Set(support)].join(', ')}.`);
    if(!profession&&!affinity&&!primary.length&&!support.length) lines.push('Character trait. It may matter through generated contracts, AI preferences, or future events.');
    return lines.join('\n');
  }
  workerEngineSummary(worker){
    const effects=this.visibleTraits(worker).flatMap(trait=>this.data.characterParts.traitEffects?.[trait]||[]);
    if(!effects.length)return '';
    return `${worker.name}: ${this.visibleTraits(worker).filter(trait=>this.data.characterParts.traitEffects?.[trait]?.length).slice(0,2).join(' + ')}`;
  }
  statusTip(status){return `${status.name}\nRecruit cost: ${status.recruitCost} gold.\nAnnual salary: ${status.salary} gold.\nFounder starting gold: ${status.startingGold}.\nPaid hire reputation requirement: ${({professional:10,gentry:25,noble:50})[status.id]||0}. Founders ignore this requirement.`;}
  riskTip(risk){
    const text={low:'Low risk failures usually cost time, reputation, resources, or morale.',moderate:'Moderate risk can punish failed work and often pays better.',dangerous:'Dangerous work can injure or kill assigned people.',deadly:'Deadly contracts are late-game threats with severe failure outcomes.',lethal:'Lethal contracts can decide a campaign and can destroy a weak retinue.'};
    return `${risk}\n${text[risk]||'Risk controls the failure table and reward scale.'}`;
  }
  poolTip(contract){
    const pool=this.data.contractParts.world.pools.find(p=>p.key===contract.pool);
    if(!pool)return `${contract.type}\nContract category.`;
    const pressures=Object.entries(pool.pressure||{}).map(([key,direction])=>`${this.worldLabel(key)} ${direction}`).join(', ');
    const effects=Object.entries(pool.effects||{}).map(([key,delta])=>`${this.worldLabel(key)} ${delta>0?'+':''}${delta}`).join(', ');
    return `${contract.pool} Pool\nThis offer is weighted by: ${pressures||'general market conditions'}.\nOn completion it nudges: ${effects||'no world values'}.`;
  }
  contractDetailTip(contract){
    const human=this.humanGuild();
    const preview=this.contractPreview(human,contract);
    const pool=this.poolTip(contract);
    const primary=contract.requirements.map(r=>`${r.trait} +${this.explicitTagWeight(r,'primary')}%`).join(', ');
    const support=contract.support.map(r=>`${r.trait} +${this.explicitTagWeight(r,'support')}%`).join(', ')||'None';
    const offer=contract.offerSeasons>0?`${contract.offerSeasons} season(s) before it closes to new placements`:'closed to new placements';
    return `${contract.title}\n${contract.description}\nRisk: ${contract.risk}.\nWork: ${contract.workSeasons} season(s). Workers remain committed until completion.\nOffer: ${offer}.\nResource requirement: ${contract.materials||0}. Covered Resources add +10% odds each and are not spent.\nPrimary tags: ${primary}.\nSupport tags: ${support}.\nReward: ${contract.reward.gold} gold, ${contract.reward.reputation} reputation.\n\n${this.contractOddsTip(human,contract,preview.team)}\n\n${pool}`;
  }
  contractOddsTip(guild,contract,team){
    if(!team.length)return `Odds preview\nNo free mercenary team is available for this contract. Workers already committed to multi-season contracts cannot be reassigned.`;
    const progress=this.contractProgress(guild,contract);
    const materials=progress?progress.materials:Math.min(guild.resources,contract.materials||0);
    const traitBonus=this.contractTraitEffectScore(guild,contract,team,materials);
    const facilityBonus=this.facilitySupportTraitEffectScore(guild,contract,team,materials);
    const workerLines=team.map(worker=>{
      const tags=this.characterTagScore(worker,contract);
      const stats=worker.resources*3+worker.connections*2;
      const penalty=this.conditionPenalty(worker);
      return `${worker.name}: +${tags}% tags, +${stats}% resources/connections${penalty?`, -${penalty}% conditions`:''}`;
    });
    const raw=this.rawSuccessChanceForTeam(guild,contract,team);
    return `Odds preview: ${this.successChanceForTeam(guild,contract,team)}% (${raw}% raw)\nTeam: ${team.map(worker=>worker.name).join(', ')}\nBase: 50%, Difficulty: -${contract.baseDifficulty}%\n${workerLines.join('\n')}\nGuild Connections: +${guild.connections*2}%\nResource capacity: +${materials*10}% (${materials}/${contract.materials||0}, not spent)\nTrait engine rules: +${traitBonus}%\nFacility support: +${facilityBonus}%`;
  }
  worldStateTip(state,value,trend){
    const direction=trend>3?'rising':trend<-3?'falling':'steady';
    const band=value<35?state.low:value>65?state.high:state.mid;
    const active=this.activeWorldMarketPools(state.key,value);
    const rules=this.worldPressureRules(state.key);
    return `${state.label}\nCurrent: ${band}, ${direction}.\nMarket effect: ${active.length?`${active.join(', ')} contracts are more likely.`:'No strong contract-pool pressure right now.'}${rules?`\nRules: ${rules}.`:''}`;
  }
  activeWorldMarketPools(key,value){
    const band=value<45?'low':value>55?'high':null;
    if(!band)return [];
    return this.data.contractParts.world.pools.filter(pool=>pool.pressure?.[key]===band).map(pool=>pool.key);
  }
  worldPressureRules(key){
    const low=this.data.contractParts.world.pools.filter(pool=>pool.pressure?.[key]==='low').map(pool=>pool.key);
    const high=this.data.contractParts.world.pools.filter(pool=>pool.pressure?.[key]==='high').map(pool=>pool.key);
    const parts=[];
    if(low.length)parts.push(`low favors ${low.join(', ')}`);
    if(high.length)parts.push(`high favors ${high.join(', ')}`);
    return parts.join('; ');
  }
  worldLabel(key){return this.data.contractParts.world.states.find(s=>s.key===key)?.label||key;}
  renderContracts(){const human=this.humanGuild();this.ui.contractGrid.innerHTML=this.state.boardContracts.map(c=>this.contractTile(c,human)).join('');this.bindDropSlots();}
  contractTile(c,human){
    const placed=this.placedTeam(human,c);
    const previewData=placed.length?{team:placed,chance:this.successChanceForTeam(human,c,placed)}:this.contractPreview(human,c);
    const preview=previewData.chance===null?'No free team':`${previewData.chance}% odds`;
    const previewTeam=previewData.team.length?previewData.team.map(worker=>worker.name.split(' ')[0]).join(' + '):'Assign mercs';
    const rivals=this.state.guilds.filter(g=>!g.human&&this.placedTeam(g,c).length).map(g=>this.contractOccupantLabel(g,c)).join(', ');
    return `<article class="contract-tile has-tip" style="${this.contractAccentStyle(c)}" data-tip="${this.escapeAttr(this.contractDetailTip(c))}"><div class="card-header"><div><h3>${c.title}</h3><p class="contract-type">${c.type} / ${c.pool}</p></div>${this.contractMetaHtml(c,human)}</div><p class="description">${c.description}</p><div class="requirements"><strong>Needs:</strong> ${c.requirements.map(r=>this.contractTagHtml(r,'primary')).join(', ')}<br><strong>Helps:</strong> ${c.support.map(r=>this.contractTagHtml(r,'support')).join(', ')||'None'}</div><div class="contract-mini"><span>${preview}</span><span>2 slots</span><span>${c.reward.gold}g/${c.reward.reputation}r</span></div><div class="preview-team">${previewTeam}</div><div class="slot-row">${[0,1].map(i=>this.workerSlot(c,placed[i],human,i)).join('')}</div><div class="occupants">${rivals?`<span class="occupant-pill">${rivals}</span>`:''}<span class="occupant-pill">${this.contractOfferLabel(c)}</span></div></article>`;
  }
  contractMetaHtml(contract,guild){
    const resource=contract.materials?`<span class="contract-chip">${contract.materials} Res</span>`:'';
    return `<div class="contract-meta"><span class="risk-badge has-tip" data-tip="${this.escapeAttr(this.riskTip(contract.risk))}">${contract.risk}</span><span class="contract-chip">${this.contractWorkLabel(contract,guild)}</span>${resource}</div>`;
  }
  contractWorkLabel(contract,guild){
    const progress=this.contractProgress(guild,contract);
    if(progress)return `${progress.remaining}/${progress.total} left`;
    return `${contract.workSeasons} season${contract.workSeasons===1?'':'s'} work`;
  }
  contractOfferLabel(contract){return contract.offerSeasons>0?`${contract.offerSeasons} season${contract.offerSeasons===1?'':'s'} open`:'closed';}
  contractOccupantLabel(guild,contract){
    const count=this.placedTeam(guild,contract).length;
    const progress=this.contractProgress(guild,contract);
    return `${guild.name}: ${count}${progress?` (${progress.remaining}/${progress.total})`:''}`;
  }
  workerSlot(contract,worker,guild=this.humanGuild(),index=0){
    const locked=this.contractProgress(guild,contract);
    const closed=contract.offerSeasons<=0&&!worker&&!locked;
    const label=index===0?'Lead':'Support';
    return `<div class="worker-slot ${locked?'locked':''}" data-drop-type="contract" data-target="${contract.instanceId}">${worker?this.slotWorkerHtml(worker,`${label}: ${worker.name}`,locked):closed?'Closed':label}</div>`;
  }
  recoverySlot(worker){
    return `<div class="worker-slot recovery-slot" data-drop-type="recovery">${worker?this.slotWorkerHtml(worker,this.workerInitials(worker),false):'Rest'}</div>`;
  }
  renderFacilities(){const human=this.humanGuild();this.ui.facilityGrid.innerHTML=this.data.contractParts.facilities.map(f=>this.facilityTile(f,human)).join('');this.bindDropSlots();}
  facilityTile(f,guild){
    const workers=this.facilityWorkers(guild,f.key,'work');
    return `<article class="facility-tile has-tip" data-tip="${this.escapeAttr(this.facilityTip(f))}"><div class="facility-top"><h3>${f.label}</h3><span>${f.slots}</span></div><div class="facility-note"></div><div class="slot-row">${Array.from({length:f.slots},(_,i)=>this.facilitySlot(f,workers[i])).join('')}</div></article>`;
  }
  facilitySlot(f,worker){return `<div class="worker-slot" data-drop-type="facility" data-target="${f.key}">${worker?this.slotWorkerHtml(worker,worker.name,false):'Slot'}</div>`;}
  slotWorkerHtml(worker,label,locked=false){
    const draggable=worker.alive&&this.state.phase==='awaitHuman'&&!this.state.humanActionUsed&&!locked;
    return `<span class="slot-worker" ${draggable?`draggable="true" data-id="${worker.id}"`:''}>${label}</span>`;
  }
  workerInitials(worker){return worker.name.split(' ').map(x=>x[0]).join('').slice(0,2);}
  bindDragSources(){document.querySelectorAll('[draggable="true"][data-id]').forEach(el=>{el.addEventListener('dragstart',evt=>{evt.dataTransfer.setData('text/plain',el.dataset.id);evt.dataTransfer.effectAllowed='move';});});}
  bindReturnDrop(el){if(!el)return;el.classList.add('return-drop');el.ondragover=evt=>{if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return;evt.preventDefault();el.classList.add('over');};el.ondragleave=()=>el.classList.remove('over');el.ondrop=evt=>{evt.preventDefault();el.classList.remove('over');const id=evt.dataTransfer.getData('text/plain');this.returnWorker(id);};}
  bindDropSlots(){this.bindDragSources();this.bindReturnDrop(this.ui.peopleGrid);document.querySelectorAll('.worker-slot').forEach(slot=>{slot.addEventListener('dragover',evt=>{evt.preventDefault();slot.classList.add('over');});slot.addEventListener('dragleave',()=>slot.classList.remove('over'));slot.addEventListener('drop',evt=>{evt.preventDefault();slot.classList.remove('over');const id=evt.dataTransfer.getData('text/plain');this.placeWorker(id,slot.dataset.target,slot.dataset.dropType,slot.dataset.mode||'work');});});}
  facilityTip(f){
    const effects=[
      `Training roll: ${f.trainChance}%`
    ].filter(Boolean).join('\n');
    return `${f.label}\nEffects: ${effects}\nTrainable traits: ${(f.traits||[]).join(', ')||'none'}${f.rareTraits?.length?`\nRare traits: ${f.rareTraits.join(', ')} (${Math.round((f.rareChance??0.12)*100)}% pool chance)`:''}\nSlots: ${f.slots}.`;
  }
}
