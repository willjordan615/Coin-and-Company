const SEASONS = ['Winter','Spring','Summer','Fall'];
const SAVE_KEY = 'coin-and-company-save-v1';

export class Game {
  constructor() {
    this.state = null;
    this.data = {};
    this.ui = {};
    this.pendingGuildName = 'Amber Company';
    this.pendingSetup = null;
    this.menuOpen = true;
    this.isSimulation = false;
    this._openingSplashTimer = null;
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

  newGame(matchSetup=this.defaultMatchSetup()) {
    const playerSetup=this.playersForMatch(matchSetup);
    const aiCount=playerSetup.filter(player=>player.control!=='local').length;
    const rivals=this.pickAiProfiles(aiCount);
    let aiIndex=0;
    this.state = {
      year:1, seasonIndex:0, phase:'setup', starterIndex:this.randomInt(0,Math.max(0,playerSetup.length-1)), humanActionUsed:false, localTurnIndex:0,
      tavern:[],
      contractDeck:this.shuffle(this.data.contracts.map(c=>structuredClone(c))),
      boardContracts:[], log:[], nextContractInstance:1, nextCharacterInstance:1, tavernHasNew:true, tavernOpen:true,
      world:this.makeWorld(matchSetup.worldKey), match:{mode:matchSetup.mode||'ffa',playerCount:playerSetup.length,contractAvailability:matchSetup.contractAvailability||1,worldKey:matchSetup.worldKey||'random'}, startedSeasons:0, pendingTraitChoice:null, pendingContractResponses:[], resolvingContractResponses:false, setupDraftIndex:0, setupDraftPending:false, openingSplashUntil:this.browserDelayUntil(5000), activeGuildId:null, focusContractId:null, aiActivity:[],
      guilds:playerSetup.map((player,index)=>{
        const guild=this.makeGuild(player.id,player.name,player.control,player.control==='local'?null:this.aiPersonalityForPlayer(player,rivals[aiIndex++]));
        guild.teamId=player.teamId||player.id;
        guild.factionId=player.factionId||player.id;
        return guild;
      })
    };
    this.log(null,'game',`A new twenty-year contest begins in ${this.state.world.name}.`);
    this.refreshContracts();
    this.seedOpeningFounderMarket();
    this.state.activeGuildId=this.currentSetupGuild()?.id||null;
  }

  defaultMatchSetup(){
    return this.matchSetup('ffa',[
      {control:'local'},
      {control:'ai',difficulty:'normal'},
      {control:'ai',difficulty:'normal'},
      {control:'ai',difficulty:'normal'}
    ]);
  }
  hotseatMatchSetup(){
    return this.matchSetup('ffa',[
      {control:'local'},
      {control:'local'},
      {control:'ai',difficulty:'normal'},
      {control:'ai',difficulty:'normal'}
    ]);
  }
  duelMatchSetup(){
    return this.matchSetup('ffa',[
      {control:'local'},
      {control:'ai',difficulty:'normal',personalityId:'fighters'}
    ]);
  }
  fourPlayerFfaMatchSetup(){
    return this.matchSetup('ffa',[
      {control:'local'},
      {control:'local'},
      {control:'local'},
      {control:'local'}
    ]);
  }
  pairedTeamsMatchSetup(){
    return this.matchSetup('teams',[
      {control:'local',teamId:'team-1'},
      {control:'local',teamId:'team-1'},
      {control:'ai',teamId:'team-2',difficulty:'normal',personalityId:'builders'},
      {control:'ai',teamId:'team-2',difficulty:'normal',personalityId:'fighters'},
      {control:'ai',teamId:'team-3',difficulty:'normal',personalityId:'civic'},
      {control:'ai',teamId:'team-3',difficulty:'normal',personalityId:'operators'},
      {control:'ai',teamId:'team-4',difficulty:'normal',personalityId:'merchants'},
      {control:'ai',teamId:'team-4',difficulty:'normal',personalityId:'explorers'}
    ]);
  }
  matchSetup(mode='ffa',players=[],options={}){
    return {mode,contractAvailability:options.contractAvailability||1,worldKey:options.worldKey||'random',players:players.map((player,index)=>({...player,teamId:mode==='teams'?(player.teamId||`team-${index+1}`):`player-${index+1}`}))};
  }
  playersForMatch(matchSetup){
    const guildNames=['Amber Company','White Raven','Iron Oath','Green Lantern','Blue Banner','Red Sash','Silver Hand','Black Tower'];
    const mode=matchSetup.mode||'ffa';
    return (matchSetup.players||[]).map((player,index)=>{
      const fallbackName=guildNames[index]||`Guild ${index+1}`;
      const id=(player.id||fallbackName).toLowerCase().replaceAll(' ','-');
      return {
        id,
        name:index===0?this.cleanGuildName(this.pendingGuildName):player.name||fallbackName,
        control:player.control==='local'?'local':'ai',
        teamId:mode==='teams'?(player.teamId||`team-${index+1}`):id,
        factionId:player.factionId||id,
        difficulty:player.difficulty||'normal',
        personalityId:player.personalityId||player.aiArchetype||null
      };
    });
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
        titlePrefix:twist.label.trim(),
        twistKey:twist.key,
        workTitle:job.title,
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

  makeWorld(worldKey='random') {
    const starts=this.data.contractParts.world.starts;
    const template=starts.find(start=>start.key===worldKey)||this.pick(starts);
    const values={};
    for(const [key,range] of Object.entries(template.ranges)) values[key]=this.randomInt(range[0],range[1]);
    return {name:template.name,key:template.key||worldKey,values,trend:{},lastShift:'Starting conditions vary from game to game.'};
  }

  openingWorldIntroHtml(guild){
    const world=this.state.world;
    const worldName=this.titleCase(world.name);
    const plentiful=this.plentifulContractPools().slice(0,3);
    const pressures=this.worldOpeningPressureLines().slice(0,4);
    const neighbors=this.neighboringWorldPackages().slice(0,2);
    const turnOrder=this.setupDraftOrder().map(g=>this.escapeHtml(g.name)).join(' -> ');
    const competitors=this.setupDraftOrder().filter(g=>g.id!==guild.id).map(g=>this.escapeHtml(g.name));
    const current=this.currentSetupGuild();
    const draftPrompt=current?this.isLocalGuild(current)?'Select your founder.':`${current.name} is selecting a founder.`:'Select your founder.';
    const plentifulText=plentiful.length?`${this.readableList(plentiful.map(pool=>this.contractPoolDisplayName(pool.key)))} contracts are plentiful.`:'The contract board is unusually balanced.';
    const driftText=neighbors.length?`${worldName} can slide toward ${this.readableList(neighbors.map(start=>this.titleCase(start.name)),'or')} if the region keeps changing in that direction.`:`${worldName} can change as contracts push the region's pressures around.`;
    return `<section class="founder-world-intro"><h3>${this.escapeHtml(worldName)}</h3><p>Your region of the world starts with ${this.escapeHtml(world.name)}. ${this.escapeHtml(plentifulText)}</p><p>${this.escapeHtml(driftText)}</p><div class="world-pressure-list">${pressures.map(line=>`<span>${this.escapeHtml(line)}</span>`).join('')}</div><p>You are controlling <strong>${this.escapeHtml(guild.name)}</strong>.</p><p>Competitors: ${competitors.length?this.readableList(competitors,'and'):'none'}.</p><p>Turn order: ${turnOrder}.</p><h4>${this.escapeHtml(draftPrompt)}</h4></section>`;
  }
  readableList(items=[],conjunction='and'){
    const list=[...items].filter(Boolean);
    if(!list.length)return '';
    if(list.length===1)return String(list[0]);
    if(list.length===2)return `${list[0]} ${conjunction} ${list[1]}`;
    return `${list.slice(0,-1).join(', ')}, ${conjunction} ${list.at(-1)}`;
  }
  plentifulContractPools(){
    return [...(this.data.contractParts.world.pools||[])]
      .map(pool=>({...pool,score:this.poolPressureScore(pool)}))
      .sort((a,b)=>b.score-a.score)
      .filter(pool=>pool.score>12);
  }
  poolPressureScore(pool){
    let score=0;
    for(const [key,direction] of Object.entries(pool.pressure||{})){
      const value=this.state.world.values[key]??50;
      if(direction==='low')score+=value<45?32+(45-value)/2:Math.max(0,12-(value-45)/3);
      if(direction==='high')score+=value>55?32+(value-55)/2:Math.max(0,12-(55-value)/3);
    }
    return score;
  }
  contractPoolDisplayName(poolKey){
    return ({Civic:'Building/Civic',Crafting:'Crafting',Commerce:'Commerce',Agriculture:'Agriculture',Military:'Military',Exploration:'Exploration',Religion:'Religion'})[poolKey]||poolKey;
  }
  worldOpeningPressureLines(){
    return this.data.contractParts.world.states.map(state=>{
      const value=this.state.world.values[state.key]??50;
      const band=value<35?state.low:value>65?state.high:state.mid;
      return `${state.label}: ${band}`;
    });
  }
  neighboringWorldPackages(){
    const starts=this.data.contractParts.world.starts||[];
    const distance=start=>Object.entries(start.ranges||{}).reduce((sum,[key,range])=>{
      const mid=(range[0]+range[1])/2;
      const value=this.state.world.values[key]??50;
      return sum+Math.abs(value-mid);
    },0);
    return starts
      .filter(start=>start.name!==this.state.world.name)
      .map(start=>({...start,distance:distance(start)}))
      .sort((a,b)=>a.distance-b.distance);
  }
  titleCase(text){
    return String(text||'').replace(/\b\w/g,ch=>ch.toUpperCase());
  }

  makeGuild(id,name,control='ai',personality=null) {
    const isLocal=control===true||control==='local';
    return {
      id,name,control:isLocal?'local':'ai',human:isLocal,personality,teamId:id,factionId:id,
      gold:0,reputation:0,completed:0,roster:[],resources:2,connections:1,facilityReadiness:{},
      poolWins:{}
    };
  }
  pickAiProfiles(count,profiles=this.data.aiProfiles||[]){
    return this.shuffle(profiles).slice(0,count).map(profile=>structuredClone(profile));
  }
  aiArchetypePackages(){
    return {
      contractor:{profileIds:['fighters','explorers','gamblers'],label:'Contractor',patch:{facilityChance:-0.04,workPenalty:-0.2}},
      constructor:{profileIds:['builders','miners','civic'],label:'Constructor',patch:{facilityChance:0.08,dangerBias:-0.15,workPenalty:-0.25}},
      politician:{profileIds:['civic','operators','scholars','pious'],label:'Politician',patch:{reputationBias:0.55,goldBias:-0.04,dangerBias:-0.2,facilityChance:0.04}}
    };
  }
  aiDifficultyPackages(){
    return {
      easy:{label:'Easy',adjust:{riskMultiplier:0.92,minChanceDelta:8,facilityChanceDelta:-0.06,restChanceDelta:0.08,workPenaltyDelta:0.45}},
      normal:{label:'Normal',patch:{}},
      hard:{label:'Hard',adjust:{riskMultiplier:1.08,minChanceDelta:-4,facilityChanceDelta:0.06,restChanceDelta:-0.06,workPenaltyDelta:-0.35}}
    };
  }
  aiPersonalityForPlayer(player,fallbackProfile=null){
    if(player.control==='local')return null;
    const profiles=this.data.aiProfiles||[];
    const difficulty=this.aiDifficultyPackages()[player.difficulty]||this.aiDifficultyPackages().normal;
    const baseId=player.personalityId&&player.personalityId!=='random'?player.personalityId:fallbackProfile?.id;
    const base=structuredClone(profiles.find(profile=>profile.id===baseId)||fallbackProfile||profiles[0]||{id:'balanced',label:'Balanced Company'});
    const applyPatch=patch=>{
      for(const [key,value] of Object.entries(patch||{})){
        if(typeof value==='number'&&typeof base[key]==='number')base[key]+=value;
        else base[key]=value;
      }
    };
    applyPatch(difficulty.patch);
    const adjust=difficulty.adjust||{};
    if(adjust.riskMultiplier&&typeof base.risk==='number')base.risk*=adjust.riskMultiplier;
    if(adjust.minChanceDelta)base.absoluteMinChance=(base.absoluteMinChance??this.data.contractParts.settings.aiAbsoluteMinChance??30)+adjust.minChanceDelta;
    if(adjust.facilityChanceDelta&&typeof base.facilityChance==='number')base.facilityChance+=adjust.facilityChanceDelta;
    if(adjust.restChanceDelta&&typeof base.restChance==='number')base.restChance+=adjust.restChanceDelta;
    if(adjust.workPenaltyDelta&&typeof base.workPenalty==='number')base.workPenalty+=adjust.workPenaltyDelta;
    base.difficulty=player.difficulty||'normal';
    base.personalitySelection=player.personalityId||'random';
    base.label=`${difficulty.label} ${base.label}`;
    return base;
  }
  cleanGuildName(name){return String(name||'').trim().slice(0,28)||'Amber Company';}
  aiProfileValue(guild,key,fallback){return guild.personality?.[key]??fallback;}
  makeCharacter(base,professionOverride=null) { const profession=professionOverride||this.pickProfession();const traits=this.pickTraits(profession);const allTraits=[profession.name,...traits].slice(0,this.maxTraits());const variance=this.data.characterParts.settings;const character={...structuredClone(base),templateId:base.id,id:`${base.id}-${this.state.nextCharacterInstance++}`,archetype:profession.name,status:profession.status,traits:allTraits,revealedTraits:[profession.name],revealAfterSeason:false,conditions:[],resources:this.clamp(profession.resources+this.randomInt(...variance.resourceVariance),0,5),connections:this.clamp(profession.connections+this.randomInt(...variance.connectionVariance),0,5),history:[],placement:null,alive:true,refusesGuildIds:[]};character.name=this.generateCharacterName(base);return character; }
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
  boardSize() {
    const settings=this.data.contractParts.settings;
    const base=settings.boardSize||3;
    const availability=this.state?.match?.contractAvailability||1;
    const modified=base+this.contractBoardWorldModifier();
    return this.clamp(Math.round(modified*availability),1,6);
  }
  contractBoardWorldModifier(){
    const world=this.state?.world;
    if(!world)return 0;
    let modifier=0;
    const name=String(world.name||'').toLowerCase();
    if(name.includes('merchant boom')||(world.values?.trade||0)>=75)modifier++;
    if(name.includes('hungry winter')||this.currentSeason()==='Winter'&&(world.values?.food||50)<35)modifier--;
    if((world.values?.trade||50)<30&&(world.values?.food||50)<40)modifier--;
    return this.clamp(modifier,-1,1);
  }
  pick(a) { return a[Math.floor(Math.random()*a.length)]; }
  randomInt(min,max) { return min+Math.floor(Math.random()*(max-min+1)); }
  browserDelayUntil(ms){return typeof window==='undefined'?0:Date.now()+ms;}
  shuffle(a) {
    const copy=[...a];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }
  clamp(n,min,max){ return Math.max(min,Math.min(max,n)); }
  isLocalGuild(guild){return guild?.control==='local'||guild?.human===true;}
  isAiGuild(guild){return !this.isLocalGuild(guild);}
  localGuilds(){return this.state.guilds.filter(g=>this.isLocalGuild(g));}
  humanGuild(){return this.localGuilds()[0]||this.state.guilds[0];}
  activeLocalGuild(){return this.state.guilds.find(g=>g.id===this.state.activeGuildId&&this.isLocalGuild(g))||this.humanGuild();}
  actingGuild(){return this.state.guilds.find(g=>g.id===this.state.activeGuildId)||this.activeLocalGuild();}
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
  guildOrder() { const count=this.state.guilds.length;return this.state.guilds.map((_,i)=>this.state.guilds[(this.state.starterIndex+i)%count]); }
  snakeGuildOrder(round=this.state.startedSeasons) { const order=this.guildOrder(); return round%2?[...order].reverse():order; }
  setupDraftOrder() { return this.snakeGuildOrder(0); }
  currentSetupGuild() { return this.setupDraftOrder()[this.state.setupDraftIndex]||null; }
  openingSplashActive(){return this.state.phase==='setup'&&Date.now()<(this.state.openingSplashUntil||0);}
  openingSplashViewGuild(){return this.localGuilds()[0]||this.currentSetupGuild()||this.state.guilds[0];}
  scheduleOpeningSplashResume(){
    if(typeof window==='undefined'||!this.openingSplashActive()||this._openingSplashTimer)return;
    this._openingSplashTimer=setTimeout(()=>{this._openingSplashTimer=null;this.render();},Math.max(50,(this.state.openingSplashUntil||0)-Date.now()+25));
  }
  firstLocalSetupDraftIndex(){return this.setupDraftOrder().findIndex(g=>this.isLocalGuild(g));}
  humanTurnSplit(round=this.state.startedSeasons) {
    const order=this.snakeGuildOrder(round);
    const humanIndex=order.findIndex(g=>this.isLocalGuild(g));
    if(humanIndex<0)return {before:order,after:[]};
    return {before:order.slice(0,humanIndex),after:order.slice(humanIndex+1)};
  }
  aiBeforeHuman() { return this.humanTurnSplit().before.filter(g=>this.isAiGuild(g)); }
  aiAfterHuman() { return this.humanTurnSplit().after.filter(g=>this.isAiGuild(g)); }
  reverseGuildOrder() { return [...this.guildOrder()].reverse(); }

  bindUI() {
    const $ = id => document.getElementById(id);
    this.ui = {date:$('dateLabel'),phase:$('phaseLabel'),guildGrid:$('guildGrid'),world:$('worldGrid'),aiActivity:$('aiActivityStrip'),peopleGrid:$('peopleGrid'),recoveryGrid:$('recoveryGrid'),recruitGrid:$('recruitGrid'),contractGrid:$('contractGrid'),facilityGrid:$('facilityGrid'),tavernPanel:$('tavernPanel'),tavernTitle:$('tavernTitle'),tavernEyebrow:$('tavernEyebrow'),tavernClose:$('tavernClose'),tavernBtn:$('tavernBtn'),characterPanel:$('characterPanel'),characterPanelEyebrow:$('characterPanelEyebrow'),characterPanelTitle:$('characterPanelTitle'),characterPanelSubtitle:$('characterPanelSubtitle'),characterPanelBody:$('characterPanelBody'),characterPanelClose:$('characterPanelClose'),advance:$('advanceBtn'),aiThinking:$('aiThinking'),newGame:$('newGameBtn'),humanStatus:$('humanActionStatus'),entry:$('entryScreen'),guildName:$('guildNameInput'),singlePlayer:$('singlePlayerBtn'),loadGame:$('loadGameBtn'),multiplayer:$('multiplayerBtn'),settings:$('settingsBtn'),glossary:$('glossaryBtn'),settingsPanel:$('settingsPanel'),glossaryPanel:$('glossaryPanel'),gameSetupPanel:$('gameSetupPanel'),setupMode:$('setupModeSelect'),setupPlayerCount:$('setupPlayerCountSelect'),setupContract:$('setupContractSelect'),setupRows:$('setupPlayerRows'),setupSummary:$('setupSummary'),startCustomGame:$('startCustomGameBtn'),entryNote:$('entryNote'),aiPace:$('aiPaceSelect')};
    this.ui.newGame.addEventListener('click',()=>this.returnToMenu());
    this.ui.singlePlayer.addEventListener('click',()=>this.startSinglePlayer());
    this.ui.loadGame.addEventListener('click',()=>this.loadGame());
    this.ui.multiplayer.addEventListener('click',()=>this.openGameSetup());
    this.ui.startCustomGame.addEventListener('click',()=>this.startConfiguredGame());
    this.ui.setupMode.addEventListener('change',()=>this.updatePendingSetupFromControls());
    this.ui.setupPlayerCount.addEventListener('change',()=>this.updatePendingSetupFromControls());
    this.ui.setupContract.addEventListener('change',()=>this.updatePendingSetupFromControls());
    this.ui.setupRows.addEventListener('input',evt=>this.handleSetupRowInput(evt));
    this.ui.setupRows.addEventListener('change',evt=>this.handleSetupRowInput(evt));
    this.ui.settings.addEventListener('click',()=>this.toggleEntryPanel('settings'));
    this.ui.glossary.addEventListener('click',()=>this.toggleEntryPanel('glossary'));
    this.ui.guildName.addEventListener('input',()=>{this.pendingGuildName=this.cleanGuildName(this.ui.guildName.value);});
    this.ui.aiPace.addEventListener('change',()=>{this.data.contractParts.settings.aiTurnDelayMs=Number(this.ui.aiPace.value)||550;this.showEntryNote(`AI turn pace set to ${this.ui.aiPace.options[this.ui.aiPace.selectedIndex].text}.`);});
    this.ui.advance.addEventListener('click',()=>this.advance());
    this.ui.tavernBtn.addEventListener('click',()=>{if(this.state.phase==='setup')return;this.state.tavernOpen=!this.state.tavernOpen;this.state.tavernHasNew=false;this.render();});
    this.ui.tavernClose.addEventListener('click',()=>this.closeTavern());
    this.ui.tavernPanel.addEventListener('click',evt=>{if(evt.target===this.ui.tavernPanel)this.closeTavern();});
    this.ui.characterPanelClose.addEventListener('click',()=>this.closeCharacterPanel());
    this.ui.characterPanel.addEventListener('click',evt=>{if(evt.target===this.ui.characterPanel)this.closeCharacterPanel();});
    this.ui.characterPanelBody.addEventListener('click',evt=>{
      const choice=evt.target.closest?.('[data-replace-trait]');
      if(choice){this.resolveTraitChoice(choice.dataset.replaceTrait);return;}
      const release=evt.target.closest?.('[data-release-merc]');
      if(release){this.releaseMerc(release.dataset.characterId,release.dataset.releaseMerc);return;}
      const response=evt.target.closest?.('[data-contract-response]');
      if(response){this.resolveContractResponse(response.dataset.responseId,response.dataset.contractResponse);return;}
      const term=evt.target.closest?.('[data-glossary-term]');
      if(term){evt.preventDefault();evt.stopPropagation();this.openGlossaryTerm(term.dataset.glossaryTerm,term.dataset.glossaryWeight);return;}
      const character=evt.target.closest?.('[data-inspect-character]');
      if(character)this.openCharacterPanel(character.dataset.inspectCharacter);
    });
    this.ui.characterPanelBody.addEventListener('keydown',evt=>{
      if(evt.key!=='Enter'&&evt.key!==' ')return;
      const release=evt.target.closest?.('[data-release-merc]');
      if(release){evt.preventDefault();this.releaseMerc(release.dataset.characterId,release.dataset.releaseMerc);return;}
      const response=evt.target.closest?.('[data-contract-response]');
      if(response){evt.preventDefault();this.resolveContractResponse(response.dataset.responseId,response.dataset.contractResponse);return;}
      const term=evt.target.closest?.('[data-glossary-term]');
      if(term){evt.preventDefault();this.openGlossaryTerm(term.dataset.glossaryTerm,term.dataset.glossaryWeight);return;}
      const character=evt.target.closest?.('[data-inspect-character]');
      if(!character)return;
      evt.preventDefault();
      this.openCharacterPanel(character.dataset.inspectCharacter);
    });
    document.addEventListener('keydown',evt=>{if(evt.key==='Escape'){this.closeTavern();this.closeCharacterPanel();}});
    this.bindGlossaryClicks();
    this.renderGlossary();
    this.pendingSetup=this.defaultMatchSetup();
    this.renderGameSetup();
    this.updateSaveUi();
  }

  openEntryScreen(panel='single'){
    this.menuOpen=true;
    this.closeTavern();
    this.closeCharacterPanel();
    this.ui.entry?.classList.remove('closed');
    if(this.ui.guildName)this.ui.guildName.value=this.cleanGuildName(this.pendingGuildName||this.humanGuild()?.name);
    this.toggleEntryPanel(panel,false);
    this.renderGameSetup();
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
    this.newGame(this.defaultMatchSetup());
    this.closeEntryScreen();
    this.render();
  }
  startHotseat(){
    this.pendingGuildName=this.cleanGuildName(this.ui.guildName?.value);
    this.newGame(this.hotseatMatchSetup());
    this.log(null,'game','Hotseat started: Amber Company and White Raven are local seats; Iron Oath and Green Lantern are AI guilds.');
    this.state.activeGuildId=this.currentSetupGuild()?.id||null;
    this.state.tavernOpen=this.isLocalGuild(this.currentSetupGuild());
    this.closeEntryScreen();
    this.render();
  }
  openGameSetup(){
    this.pendingGuildName=this.cleanGuildName(this.ui.guildName?.value);
    this.pendingSetup=this.pendingSetup||this.hotseatMatchSetup();
    this.toggleEntryPanel('setup');
    this.renderGameSetup();
    this.showEntryNote('Configure FFA or Teams, then start a new contest.');
  }
  startConfiguredGame(){
    this.pendingGuildName=this.cleanGuildName(this.ui.guildName?.value);
    const setup=this.pendingSetup||this.defaultMatchSetup();
    const localCount=setup.players.filter(player=>player.control==='local').length;
    if(!localCount){
      setup.players[0].control='local';
      this.showEntryNote('At least one player must be PC. Player 1 was set to PC.');
      this.renderGameSetup();
      return;
    }
    this.newGame(setup);
    this.closeEntryScreen();
    this.render();
  }
  setupDefaultPlayers(count=4,mode='ffa'){
    const previous=this.pendingSetup?.players||[];
    const profileIds=(this.data.aiProfiles||[]).map(profile=>profile.id);
    return Array.from({length:count},(_,index)=>{
      const old=previous[index]||{};
      const defaultControl=index===0?'local':'ai';
      return {
        name:old.name,
        control:old.control||defaultControl,
        teamId:mode==='teams'?(old.teamId||`team-${Math.min(index+1,4)}`):`player-${index+1}`,
        difficulty:old.difficulty||'normal',
        personalityId:old.personalityId||old.aiArchetype||'random'
      };
    });
  }
  updatePendingSetupFromControls(){
    const mode=this.ui.setupMode?.value||'ffa';
    const count=this.clamp(Number(this.ui.setupPlayerCount?.value)||4,2,8);
    const contractAvailability=Number(this.ui.setupContract?.value)||1;
    this.pendingSetup=this.matchSetup(mode,this.setupDefaultPlayers(count,mode),{contractAvailability});
    this.renderGameSetup();
  }
  handleSetupRowInput(evt){
    const field=evt.target.closest?.('[data-setup-field]');
    if(!field||!this.pendingSetup)return;
    const index=Number(field.dataset.playerIndex);
    const player=this.pendingSetup.players[index];
    if(!player)return;
    const key=field.dataset.setupField;
    player[key]=field.value;
    if(key==='control'&&field.value==='local')player.difficulty=player.difficulty||'normal';
    if(this.pendingSetup.mode==='ffa')player.teamId=`player-${index+1}`;
    if(key==='name'){
      this.renderSetupSummary();
      return;
    }
    this.renderGameSetup();
  }
  renderGameSetup(){
    if(!this.ui.setupRows)return;
    this.pendingSetup=this.pendingSetup||this.defaultMatchSetup();
    const setup=this.pendingSetup;
    this.ui.setupMode.value=setup.mode||'ffa';
    this.ui.setupPlayerCount.value=String(setup.players.length||4);
    this.ui.setupContract.value=String(setup.contractAvailability||1);
    this.ui.setupRows.innerHTML=setup.players.map((player,index)=>this.setupPlayerRowHtml(player,index,setup)).join('');
    this.renderSetupSummary();
  }
  renderSetupSummary(){
    if(!this.ui.setupSummary||!this.pendingSetup)return;
    const setup=this.pendingSetup;
    const pc=setup.players.filter(player=>player.control==='local').length;
    const cpu=setup.players.length-pc;
    const teams=setup.mode==='teams'?[...new Set(setup.players.map(player=>player.teamId))].length:setup.players.length;
    this.ui.setupSummary.textContent=`${setup.mode.toUpperCase()} - ${setup.players.length} players - ${pc} PC / ${cpu} CPU - ${teams} ${setup.mode==='teams'?'teams':'factions'}.`;
  }
  setupPlayerRowHtml(player,index,setup){
    const isCpu=player.control!=='local';
    const name=player.name||(['Amber Company','White Raven','Iron Oath','Green Lantern','Blue Banner','Red Sash','Silver Hand','Black Tower'][index]||`Guild ${index+1}`);
    const teamOptions=Array.from({length:Math.min(4,setup.players.length)},(_,i)=>`team-${i+1}`);
    const profiles=this.data.aiProfiles||[];
    const selectedProfile=player.personalityId||player.aiArchetype||'random';
    return `<article class="setup-player-row">
      <strong>P${index+1}</strong>
      <input data-setup-field="name" data-player-index="${index}" value="${this.escapeAttr(name)}" maxlength="28" aria-label="Player ${index+1} guild name">
      <select data-setup-field="control" data-player-index="${index}" aria-label="Player ${index+1} control">
        <option value="local" ${player.control==='local'?'selected':''}>PC</option>
        <option value="ai" ${isCpu?'selected':''}>CPU</option>
      </select>
      <select data-setup-field="teamId" data-player-index="${index}" ${setup.mode==='ffa'?'disabled':''} aria-label="Player ${index+1} team">
        ${teamOptions.map(team=>`<option value="${team}" ${player.teamId===team?'selected':''}>${team.replace('team-','Team ')}</option>`).join('')}
      </select>
      <select data-setup-field="difficulty" data-player-index="${index}" ${isCpu?'':'disabled'} aria-label="Player ${index+1} CPU difficulty">
        ${['easy','normal','hard'].map(value=>`<option value="${value}" ${player.difficulty===value?'selected':''}>${value[0].toUpperCase()+value.slice(1)}</option>`).join('')}
      </select>
      <select data-setup-field="personalityId" data-player-index="${index}" ${isCpu?'':'disabled'} aria-label="Player ${index+1} CPU profile">
        <option value="random" ${selectedProfile==='random'?'selected':''}>Random</option>
        ${profiles.map(profile=>`<option value="${this.escapeAttr(profile.id)}" ${selectedProfile===profile.id?'selected':''}>${this.escapeHtml(profile.label)}</option>`).join('')}
      </select>
    </article>`;
  }
  toggleEntryPanel(panel,flip=true){
    const showSetup=panel==='setup'&&(flip?this.ui.gameSetupPanel.classList.contains('closed'):true);
    const showSettings=panel==='settings'&&(flip?this.ui.settingsPanel.classList.contains('closed'):true);
    const showGlossary=panel==='glossary'&&(flip?this.ui.glossaryPanel.classList.contains('closed'):true);
    this.ui.gameSetupPanel?.classList.toggle('closed',!showSetup);
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
    for(const guild of this.state.guilds||[]){
      guild.control=guild.control||(guild.human?'local':'ai');
      guild.human=this.isLocalGuild(guild);
    }
    const choice=this.state.pendingTraitChoice;
    if(choice?.workerId){
      const guild=this.state.guilds.find(g=>g.id===choice.guildId);
      const worker=guild?.roster.find(c=>c.id===choice.workerId);
      const facility=this.facilityDef(choice.facilityKey);
      this.state.pendingTraitChoice=guild&&worker&&facility&&choice.trait?{guild,worker,facility,trait:choice.trait}:null;
    }
    if(this.state.phase==='aiTurn'){
      this.state.phase='awaitHuman';
      this.state.activeGuildId=this.activeLocalGuild()?.id||this.humanGuild()?.id||null;
      this.state.humanActionUsed=false;
      this.log(null,'game','Loaded during an AI turn; returned control to the player.');
    }
    if(this.state.focusContractId&&!this.state.boardContracts?.some(c=>c.instanceId===this.state.focusContractId))this.state.focusContractId=null;
    for(const guild of this.state.guilds||[])guild.facilityReadiness=guild.facilityReadiness||{};
    this.state.aiActivity=this.state.aiActivity||[];
    this.state.localTurnIndex=this.state.localTurnIndex||0;
    this.state.openingSplashUntil=0;
    this.state.pendingContractResponses=this.state.pendingContractResponses||[];
    this.state.resolvingContractResponses=false;
  }
  renderGlossary(){
    if(!this.ui.glossaryBody)return;
    const settings=this.data.contractParts.settings;
    const goals=this.victoryGoals();
    const facilities=this.data.contractParts.facilities.map(f=>`<li><strong>${this.escapeHtml(f.label)}</strong><span>Train traits through worker placement</span></li>`).join('');
    const pools=this.data.contractParts.world.pools.map(p=>`<li><strong>${this.escapeHtml(p.key)}</strong><span>${this.escapeHtml((p.types||[]).slice(0,4).join(', '))}</span></li>`).join('');
    this.ui.glossaryBody.innerHTML=`<section><h3>Core Rules</h3><p><strong>Victory lanes</strong>: win early by reaching Gold ${goals.gold}, Rep ${goals.reputation}, Done ${goals.completed}, Res ${goals.resources}, or Conn ${goals.connections}.</p><p><strong>Contracts</strong> have ${this.contractSharedSlotLimit()} shared mercenary slots. The first guild to place claims the work; later guilds cooperate by dropping on open slots or compete by dropping on occupied rival slots. Multi-season contracts resolve at season end and keep workers committed until finished.</p><p><strong>Readiness</strong> is explicit setup. Focus a contract, then send fitting workers to Scout Lodge for Scouted +5% per season, max +20%, or Archives for one-time Planned +10%. Facilities can also gain Ready marks; fitting workers exploit Ready into scoreboard progress.</p><p><strong>Traits</strong> are the engine. Profession tags give about ${settings.requirementWeights[0]}% when demanded; support tags give about ${settings.supportWeights[0]}%.</p><p><strong>Hiring</strong> is limited to one paid tavern recruit per guild each season. Founders ignore reputation gates. Professionals require 10 reputation, gentry require 25, and nobles require 50.</p><p><strong>Resources</strong> are guild capacity. Contracts check them for odds, but do not spend them. <strong>Connections</strong> give +2% odds each on every contract.</p></section><section><h3>Facilities</h3><ul>${facilities}</ul></section><section><h3>Contract Pools</h3><ul>${pools}</ul></section>`;
  }

  bindGlossaryClicks(){
    document.addEventListener('click',evt=>{
      const term=evt.target.closest?.('[data-glossary-term]');
      if(!term)return;
      evt.preventDefault();
      evt.stopPropagation();
      this.openGlossaryTerm(term.dataset.glossaryTerm,term.dataset.glossaryWeight);
    });
    document.addEventListener('keydown',evt=>{
      if(evt.key!=='Enter'&&evt.key!==' ')return;
      const term=evt.target.closest?.('[data-glossary-term]');
      if(!term)return;
      evt.preventDefault();
      this.openGlossaryTerm(term.dataset.glossaryTerm,term.dataset.glossaryWeight);
    });
  }

  closeTavern(){if(this.state.phase==='setup')return;this.state.tavernOpen=false;this.render();}
  closeCharacterPanel(){if(this.currentContractResponse())return;this.ui.characterPanel.classList.add('closed');}
  setDetailHeader(eyebrow,title,subtitle=''){
    this.ui.characterPanelEyebrow.textContent=eyebrow;
    this.ui.characterPanelTitle.textContent=title;
    this.ui.characterPanelSubtitle.textContent=subtitle;
    this.ui.characterPanelSubtitle.classList.toggle('closed',!subtitle);
  }
  openGlossaryTerm(term,weight=null){
    const key=String(term||'').trim();
    if(!key)return;
    const entry=this.glossaryEntry(key,weight);
    this.setDetailHeader(entry.eyebrow,entry.title,entry.subtitle);
    this.ui.characterPanelBody.innerHTML=`<article class="game-card glossary-entry"><ul>${entry.bullets.map(line=>`<li>${this.escapeHtml(line)}</li>`).join('')}</ul>${entry.rules.length?`<section class="engine-rules"><h4>Rules</h4>${entry.rules.map(rule=>`<div class="engine-rule"><strong>${this.escapeHtml(rule.label)}</strong><p>${this.escapeHtml(rule.text)}</p></div>`).join('')}</section>`:''}</article>`;
    this.ui.characterPanel.classList.remove('closed');
  }
  glossaryEntry(term,weight=null){
    const profession=this.data.characterParts.professions.find(p=>p.name===term);
    const condition=this.conditionDef(term);
    const status=this.data.statuses.find(s=>s.name===term||s.id===term);
    const facility=this.facilityDef(term)||this.data.contractParts.facilities.find(f=>f.label===term);
    const twist=this.contractTwistByTerm(term);
    const risk=this.contractRiskByTerm(term);
    if(facility)return this.facilityGlossaryEntry(facility);
    if(twist)return this.twistGlossaryEntry(twist);
    if(risk)return this.riskGlossaryEntry(risk);
    if(condition)return this.conditionGlossaryEntry(condition);
    if(status)return this.statusGlossaryEntry(status);
    return this.traitGlossaryEntry(term,profession,weight);
  }
  contractTwistByTerm(term){
    const normalized=String(term||'').toLowerCase();
    return (this.data.contractParts.twists||[]).find(t=>t.key===normalized||t.label?.trim().toLowerCase()===normalized);
  }
  contractRiskByTerm(term){
    const normalized=String(term||'').toLowerCase();
    return ['low','moderate','dangerous','deadly','lethal'].includes(normalized)?normalized:null;
  }
  twistGlossaryEntry(twist){
    const label=twist.label?.trim()||'Routine';
    const failures=(twist.failure||[]).map(f=>`${this.failureResultLabel(f)} (${f.weight})`);
    const bullets=[
      `Contract prefix: changes the risk, difficulty, reward, and timing of a job.`,
      `Risk: ${twist.risk}.`,
      `Difficulty modifier: ${twist.difficulty>=0?'+':''}${twist.difficulty}%.`,
      `Work modifier: ${twist.work>=0?'+':''}${twist.work} season${Math.abs(twist.work)===1?'':'s'}.`,
      `Offer window modifier: ${twist.offer>=0?'+':''}${twist.offer} season${Math.abs(twist.offer)===1?'':'s'}.`,
      `Reward modifier: ${twist.gold>=0?'+':''}${twist.gold} gold, ${twist.rep>=0?'+':''}${twist.rep} reputation.`,
      failures.length?`Failure table: ${failures.join(', ')}.`:'No special failure table.'
    ];
    return {eyebrow:'Contract Prefix',title:label,subtitle:'Work tag',bullets,rules:[]};
  }
  riskGlossaryEntry(risk){
    const text={
      low:'Low risk failures usually cost time, reputation, resources, or morale.',
      moderate:'Moderate risk can punish failed work and often pays better.',
      dangerous:'Dangerous work can injure or kill assigned mercs.',
      deadly:'Deadly contracts are late-game threats with severe failure outcomes.',
      lethal:'Lethal contracts can decide a campaign and can destroy a weak retinue.'
    };
    const matching=(this.data.contractParts.twists||[]).filter(t=>t.risk===risk).map(t=>t.label?.trim()||'Routine');
    return {eyebrow:'Risk',title:risk[0].toUpperCase()+risk.slice(1),subtitle:'Contract difficulty band',bullets:[text[risk]||'Risk controls the failure table and reward scale.',matching.length?`Common prefixes: ${this.formatList(matching)}.`:'No prefix currently uses this risk band.','Higher risk generally means stronger rewards and harsher failures.'],rules:[]};
  }
  traitGlossaryEntry(term,profession=null,weight=null){
    const affinity=this.data.characterParts.tagAffinities?.[term];
    const effects=this.data.characterParts.traitEffects?.[term]||[];
    const primary=[...new Set(this.data.contracts.filter(c=>c.requirements.some(r=>r.trait===term)).slice(0,5).map(c=>c.type))];
    const support=[...new Set(this.data.contracts.filter(c=>c.support.some(r=>r.trait===term)).slice(0,5).map(c=>c.type))];
    const bullets=[];
    if(profession)bullets.push(`Profession: starts around ${this.getStatus(profession.status).name} status, ${profession.resources} resources, and ${profession.connections} connections before variance.`);
    else bullets.push('Trait: improves contract fit when a job needs or helps with this tag.');
    if(weight!==null&&weight!=='')bullets.push(`This contract: +${Number(weight)}% success chance for each assigned merc with this tag.`);
    if(affinity)bullets.push(`Broad fit: +${affinity.bonus||5}% on ${this.formatList(affinity.domains||[])} contracts.`);
    if(primary.length)bullets.push(`Often needed by: ${this.formatList(primary)}.`);
    if(support.length)bullets.push(`Often helps with: ${this.formatList(support)}.`);
    if(!effects.length)bullets.push('No special engine rule beyond contract fit is currently defined.');
    return {eyebrow:profession?'Profession':'Trait',title:term,subtitle:profession?'Also acts as a trait tag':'',bullets,rules:effects.map(effect=>({label:this.effectTriggerLabel(effect),text:this.effectRuleText(effect)}))};
  }
  conditionGlossaryEntry(condition){
    const duration=condition.duration===null?'Permanent':`${condition.duration} season${condition.duration===1?'':'s'} base duration`;
    const bullets=[
      condition.description||'Condition applied by contract events.',
      condition.penalty?`Contract work penalty: -${condition.penalty}% success chance.`:'No direct contract success penalty.',
      `Duration: ${duration}.`,
      condition.recoveryPerRest?`Rest recovery: clears ${condition.recoveryPerRest} step per rest season.`:'Rest does not clear this condition.'
    ];
    return {eyebrow:'Condition',title:condition.key,subtitle:condition.kind,bullets,rules:[]};
  }
  statusGlossaryEntry(status){
    return {eyebrow:'Status',title:status.name,subtitle:'Recruiting tier',bullets:[`Recruit cost: ${status.recruitCost} gold before trait costs.`,`Annual salary: ${status.salary} gold before trait costs.`,`Reputation gate: ${status.reputationRequired||0}.`],rules:[]};
  }
  facilityGlossaryEntry(facility){
    const setup=this.facilityReadinessRuleLines(facility);
    const production=this.facilityProductionGlossaryLines(facility);
    const support=this.facilityEffectGlossaryLines(facility);
    const bullets=[
      facility.description,
      `Identity: ${facility.identity}.`,
      `Slots: ${facility.slots}.`,
      `Training roll: ${facility.trainChance}% before worker and facility support.`,
      `Trains: ${this.formatList(facility.traits||[])}.`,
      facility.rareTraits?.length?`Rare training pool: ${this.formatList(facility.rareTraits)} (${Math.round((facility.rareChance??0.12)*100)}% pool chance).`:'No rare training pool.',
      ...setup,
      ...production,
      ...support
    ].filter(Boolean);
    return {eyebrow:'Facility',title:facility.label,subtitle:facility.identity,bullets,rules:[]};
  }
  facilityReadinessRuleLines(facility){
    const lines=[];
    if(facility.key==='scout')lines.push('Contract readiness: Scout-like workers here add Scouted marks to the focused contract.');
    if(facility.key==='archives')lines.push('Contract readiness: Scholar-like workers here add a Planned mark to the focused contract.');
    for(const rule of this.facilitySetupRules().filter(rule=>rule.facility===facility.key)){
      lines.push(`${this.formatList(rule.tags)} here readies the least-ready of ${this.formatList(rule.targets.map(key=>this.facilityDef(key)?.label||key))}.`);
    }
    return lines;
  }
  facilityProductionGlossaryLines(facility){
    const samples=(this.data.characterParts.professions||[])
      .map(profession=>({profession,rule:this.facilityProductionRule({archetype:profession.name,traits:[profession.name],conditions:[]},facility)}))
      .filter(row=>row.rule)
      .slice(0,5);
    if(!samples.length)return ['Ready production: no profession-specific Ready use currently defined.'];
    return [`Ready production examples: ${samples.map(({profession,rule})=>`${profession.name}: ${this.facilityProductionText(rule)}`).join('; ')}.`];
  }
  facilityEffectGlossaryLines(facility){
    const rules=Object.entries(this.data.characterParts.traitEffects||{}).flatMap(([trait,effects])=>effects.filter(effect=>(effect.facilities||[]).includes(facility.key)||(effect.targetFacilities||[]).includes(facility.key)).map(effect=>`${trait}: ${this.effectRuleText(effect)}`));
    return rules.length?[`Trait effects touching this facility: ${rules.slice(0,4).join(' | ')}${rules.length>4?' | ...':''}`]:[];
  }
  termLink(term,className=''){
    return `<button class="glossary-term ${className}" type="button" data-glossary-term="${this.escapeAttr(term)}">${this.escapeHtml(term)}</button>`;
  }
  openCharacterPanel(characterId){
    const found=this.findCharacter(characterId);
    if(!found)return;
    const {guild,character}=found;
    this.state.selectedCharacterId=character.id;
    this.setDetailHeader('Mercenary',character.name);
    this.ui.characterPanelBody.innerHTML=this.characterCard(character,{showHistory:true,showAllTraits:true,guild});
    this.ui.characterPanel.classList.remove('closed');
  }
  openGuildPanel(guildId){
    const guild=this.state.guilds.find(g=>g.id===guildId);
    if(!guild)return;
    this.setDetailHeader('Guild',guild.name);
    this.ui.characterPanelBody.innerHTML=this.guildInspectionHtml(guild);
    this.ui.characterPanel.classList.remove('closed');
  }
  openContractPanel(contractId){
    const contract=this.state.boardContracts.find(c=>c.instanceId===contractId);
    const guild=this.activeLocalGuild();
    if(!contract||!guild)return;
    const heading=this.contractHeaderParts(contract);
    this.setDetailHeader(heading.prefix,heading.title,heading.patron);
    this.ui.characterPanelEyebrow.innerHTML=this.termLink(heading.prefix,'modal-term-link');
    this.ui.characterPanelBody.innerHTML=this.contractInspectionHtml(contract,guild);
    this.ui.characterPanel.classList.remove('closed');
  }
  currentContractResponse(){
    const response=(this.state.pendingContractResponses||[])[0];
    if(!response)return null;
    const contract=this.state.boardContracts.find(c=>c.instanceId===response.contractId);
    const claimant=this.state.guilds.find(g=>g.id===response.claimantId);
    const intruder=this.state.guilds.find(g=>g.id===response.intruderId);
    return contract&&claimant&&intruder?{...response,contract,claimant,intruder}:null;
  }
  openNextContractResponse(){
    let response=this.currentContractResponse();
    while(!response&&(this.state.pendingContractResponses||[]).length){
      this.state.pendingContractResponses.shift();
      response=this.currentContractResponse();
    }
    if(!response)return false;
    if(this.isAiGuild(response.claimant)){
      this.resolveContractResponse(response.id,this.aiContractResponseDecision(response.claimant,response.intruder,response.contract),{continueSeason:false});
      return this.openNextContractResponse();
    }
    if(typeof document==='undefined'||!this.ui.characterPanel){
      this.resolveContractResponse(response.id,'allow',{continueSeason:false});
      return this.openNextContractResponse();
    }
    const team=this.placedTeam(response.intruder,response.contract).map(worker=>worker.name).join(', ')||'a rival team';
    this.setDetailHeader('Claim Response',response.contract.title,response.intruder.name);
    this.ui.characterPanelBody.innerHTML=`<article class="game-card contract-response-card"><p class="history">${this.escapeHtml(response.intruder.name)} has moved onto ${this.escapeHtml(response.claimant.name)}'s claimed contract with ${this.escapeHtml(team)}.</p><p class="history">Allowing cooperation keeps a shared project chance and weighted payout. Contesting turns their placement into a race for primary credit.</p><div class="trait-choice-grid"><div class="trait-choice" role="button" tabindex="0" data-response-id="${this.escapeAttr(response.id)}" data-contract-response="allow">Allow cooperation</div><div class="trait-choice danger-choice" role="button" tabindex="0" data-response-id="${this.escapeAttr(response.id)}" data-contract-response="contest">Contest the claim</div></div></article>`;
    this.ui.characterPanel.classList.remove('closed');
    return true;
  }
  aiContractResponseDecision(claimant,intruder,contract){
    if(this.cooperationForcedBy(contract,claimant,intruder))return 'allow';
    const claimantTeam=this.placedTeam(claimant,contract);
    const intruderTeam=this.placedTeam(intruder,contract);
    const sharedChance=this.cooperativeSuccessChance(contract,claimant,this.contractParticipantGuilds(contract))||0;
    const claimantChance=this.successChanceForTeam(claimant,contract,claimantTeam);
    const claimantControl=this.contractTeamTraitEffects(claimant,contract,'contractClaim').reduce((sum,effect)=>sum+(effect.type==='blockCompetition'?16:effect.type==='competitionCost'?(effect.amount||0)*5:effect.type==='forceCooperation'?-12:0),0);
    const intruderThreat=this.contractContributionScore(intruder,contract)+this.contestTraitScore(intruder,contract);
    const claimantContest=this.contractContributionScore(claimant,contract)+this.contestTraitScore(claimant,contract)+10+claimantControl;
    const mode=this.aiStrategicMode(claimant);
    const allowValue=sharedChance+(contract.reward.gold||0)*0.04+(contract.reward.reputation||0)*1.6+(mode.rebuilding?8:0);
    const contestValue=claimantChance+(claimantContest-intruderThreat)*0.35+(contract.reward.reputation||0)*3+(mode.behind?14:0)+(mode.desperate?18:0);
    return contestValue>allowValue+8?'contest':'allow';
  }
  resolveContractResponse(responseId,decision,{continueSeason=true}={}){
    const responses=this.state.pendingContractResponses||[];
    const index=responses.findIndex(response=>response.id===responseId);
    if(index<0)return false;
    const [response]=responses.splice(index,1);
    const contract=this.state.boardContracts.find(c=>c.instanceId===response.contractId);
    const claimant=this.state.guilds.find(g=>g.id===response.claimantId);
    const intruder=this.state.guilds.find(g=>g.id===response.intruderId);
    if(contract&&claimant&&intruder){
      contract.claim=contract.claim||{guildId:claimant.id,postures:{}};
      contract.claim.postures=contract.claim.postures||{};
      if(decision==='contest'){
        contract.claim.postures[intruder.id]='compete';
        this.log(claimant,'contract',`${claimant.name} contested ${intruder.name}'s move onto "${contract.title}".`);
      }else{
        contract.claim.postures[intruder.id]='cooperate';
        this.log(claimant,'contract',`${claimant.name} allowed ${intruder.name} to cooperate on "${contract.title}".`);
      }
    }
    this.state.pendingContractResponses=responses;
    this.closeCharacterPanelAfterResponse();
    if(this.state.resolvingContractResponses&&continueSeason)this.finishSeasonAfterContractResponses();
    else if(this.openNextContractResponse())this.render();
    else this.render();
    return true;
  }
  closeCharacterPanelAfterResponse(){this.ui.characterPanel?.classList.add('closed');}
  openSeasonRecap(){
    if(!this.ui.characterPanel||this.state.phase!=='seasonComplete')return;
    const entries=this.state.log.filter(entry=>entry.year===this.state.year&&entry.season===this.currentSeason()).slice(0,16);
    const human=this.activeLocalGuild();
    const engineSummary=this.activeWorkers(human).map(c=>this.workerEngineSummary(c)).filter(Boolean).slice(0,4).map(text=>`<span>${this.escapeHtml(text)}</span>`).join('');
    this.setDetailHeader('Season Recap',`${this.currentSeason()} Recap`);
    this.ui.characterPanelBody.innerHTML=`<article class="game-card recap-card"><p class="history">${human.name} is reading as <strong>${this.guildIdentity(human).label}</strong>.</p>${engineSummary?`<div class="recap-pills">${engineSummary}</div>`:''}<div class="recap-list">${entries.map(entry=>`<p class="recap-line ${entry.type}"><span>${entry.guildId?this.guildName(entry.guildId):'World'}</span>${this.escapeHtml(entry.summary)}</p>`).join('')||'<p class="empty">Nothing notable happened.</p>'}</div></article>`;
    this.ui.characterPanel.classList.remove('closed');
  }
  openTraitChoice(choice){
    const worker=choice.worker;
    this.setDetailHeader('Training',`Train ${worker.name}`);
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

  advance() {
    if(this.state.phase==='setup') return;
    if(this.state.phase==='awaitHuman') {
      const guild=this.activeLocalGuild();
      return this.finishHumanAction('season',this.resolveHumanPlacements(guild),guild);
    }
    if(this.state.phase==='seasonComplete') return this.nextSeason();
    if(this.state.phase==='gameOver') return;
  }

  draftFounder(characterId,evt=null) {
    if(this.state.phase!=='setup') return;
    if(this.menuOpen)return false;
    if(evt&&this._humanDraftClickReadyAt&&performance.now()<this._humanDraftClickReadyAt)return false;
    const human=this.currentSetupGuild();
    if(!this.isLocalGuild(human))return false;
    const pick=this.state.tavern.find(c=>c.id===characterId);
    if(!pick) return;
    this.draftFounderForGuild(human,pick);
    this.state.tavernHasNew=false;
    this.advanceSetupDraft();
  }

  draftFounderForGuild(guild,pick){
    if(!pick)return false;
    this.hire(guild,pick,true);
    this.revealAllTraits(pick,this.isLocalGuild(guild)?'as founder':'for AI planning');
    this.log(guild,'recruit',`${guild.name} drafted founder ${pick.name}.`);
    if(this.isAiGuild(guild))this.recordAiActivity(guild,'recruit',`Drafted ${pick.name}`,pick.archetype);
    if(this.isLocalGuild(guild))this.prepareInitialBoardForFounder(guild);
    return true;
  }
  advanceSetupDraft(){
    this.state.setupDraftIndex++;
    const next=this.currentSetupGuild();
    if(next){
      this.state.activeGuildId=next.id;
      this.state.tavernOpen=this.isLocalGuild(next);
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
    if(this.menuOpen||this.state.phase!=='setup'||this.state.setupDraftPending)return;
    const guild=this.currentSetupGuild();
    if(!guild||this.isLocalGuild(guild))return;
    if(this.openingSplashActive()){this.scheduleOpeningSplashResume();return;}
    if(typeof window==='undefined'){this.aiDraftFounder(guild);return;}
    this.state.setupDraftPending=true;
    try{ this.showAiThinking(guild); }catch(e){}
    setTimeout(()=>this.aiDraftFounder(guild),this.aiTurnDelay());
  }
  async aiDraftFounder(guild){
    if(this.state.phase!=='setup'||this.currentSetupGuild()!==guild){try{ this.hideAiThinking(); }catch(e){};return;}
    if(!this.state.tavern.length)this.refillTavern();
    const pick=this.chooseRecruit(guild);
    if(pick)this.draftFounderForGuild(guild,pick);
    try{ this.hideAiThinking(); }catch(e){}
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
    this.state.localTurnIndex=0;
    this.advanceTurnCursor();
  }

  beginHumanTurn(guild=this.activeLocalGuild()){
    this.state.activeGuildId=guild?.id||null;
    this.state.phase='awaitHuman';
    this.state.humanActionUsed=false;
    this.render();
  }

  turnOrder(){return this.snakeGuildOrder();}
  advanceTurnCursor(){
    const order=this.turnOrder();
    const start=this.state.localTurnIndex||0;
    const aiBatch=[];
    let index=start;
    while(index<order.length&&this.isAiGuild(order[index])){
      aiBatch.push(order[index]);
      index++;
    }
    this.state.localTurnIndex=index;
    if(aiBatch.length){
      this.runAITurnSequence(aiBatch,()=>this.advanceTurnCursor());
      return;
    }
    const local=order[index];
    if(local&&this.isLocalGuild(local)){
      this.state.localTurnIndex=index+1;
      this.beginHumanTurn(local);
      return;
    }
    this.finishAITurns();
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
  seedOpeningFounderMarket(target=8){
    this.state.tavern=[];
    const professions=this.data.characterParts.professions||[];
    const byName=new Map(professions.map(profession=>[profession.name,profession]));
    const scores=new Map();
    const addScore=(name,weight)=>{if(byName.has(name))scores.set(name,(scores.get(name)||0)+weight);};
    for(const contract of this.state.boardContracts){
      for(const req of contract.requirements||[]) addScore(req.trait,10);
      for(const req of contract.support||[]) addScore(req.trait,3);
    }
    for(const pool of this.activeOpeningWorldPools()){
      for(const profession of professions){
        const affinity=this.data.characterParts.tagAffinities?.[profession.name];
        const domains=affinity?.domains||[];
        if(domains.includes(pool.key)||pool.types?.some(type=>domains.includes(type))||pool.traits?.includes(profession.name)){
          addScore(profession.name,5);
        }
      }
    }
    const picked=new Map();
    while(this.state.tavern.length<target&&scores.size){
      const name=this.weightedPick([...scores].map(([item,weight])=>({item,weight})));
      const profession=byName.get(name);
      if(!profession)break;
      this.state.tavern.push(this.makeCharacter(this.pick(this.data.recruits),profession));
      const count=(picked.get(name)||0)+1;
      picked.set(name,count);
      if(count>=2)scores.delete(name);
      else scores.set(name,Math.max(1,Math.round((scores.get(name)||1)*0.35)));
    }
    this.refillTavern(target);
  }
  activeOpeningWorldPools(){
    const pools=this.data.contractParts.world.pools||[];
    return pools.map(pool=>{
      let weight=0;
      for(const [key,direction] of Object.entries(pool.pressure||{})){
        const value=this.state.world.values[key]??50;
        if(direction==='low'&&value<45)weight+=45-value;
        if(direction==='high'&&value>55)weight+=value-55;
      }
      return {pool,weight};
    }).filter(row=>row.weight>0).sort((a,b)=>b.weight-a.weight).slice(0,3).map(row=>row.pool);
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
    if(this.state.focusContractId&&!this.state.boardContracts.some(c=>c.instanceId===this.state.focusContractId))this.state.focusContractId=null;
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
      base.readiness={};
      this.state.boardContracts.push(base);
    }
  }

  prepareBoardContract(contract,guild=this.humanGuild()){
    const settings=this.data.contractParts.settings;
    const human=guild;
    if(!human?.roster.length||this.state.year>settings.beginnerBoardYears)return;
    const team=this.chooseBestTeam(human,contract);
    const rawChance=this.rawSuccessChanceForTeam(human,contract,team);
    if(rawChance>=settings.beginnerMinChance)return;
    contract.baseDifficulty-=settings.beginnerMinChance-rawChance;
    contract.beginnerAdjusted=true;
    contract.description=`${contract.description} The terms are simple enough for a new guild.`;
  }
  prepareInitialBoardForFounder(guild=this.humanGuild()){
    if(this.state.year!==1||this.state.startedSeasons!==0)return;
    for(const contract of this.state.boardContracts){
      if(contract.setupPrepared)continue;
      this.prepareBoardContract(contract,guild);
      contract.setupPrepared=true;
    }
  }

  chooseBoardContractIndex(){
    const types=new Set(this.state.boardContracts.map(c=>c.type));
    const settings=this.data.contractParts.settings;
    const human=this.activeLocalGuild();
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
    if(this.isLocalGuild(guild)) return;
    this.aiPlaceContractWorkers(guild);
  }

  chooseBestTeam(guild,contract){
    return this.bestWorkersForContract(this.availableWorkers(guild),contract,this.contractSharedSlotLimit());
  }
  bestWorkersForContract(workers,contract,limit,guild=null,posture='auto'){return workers.map(c=>({c,score:this.aiWorkerContractFit(guild,c,contract,posture)})).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.c);}
  async aiPlaceContractWorkers(guild,firstPick=null){
    const minChance=this.aiMinClaimChance(guild);
    let placed=0;
    while(this.availableWorkers(guild).length){
      const options=this.state.boardContracts.map(contract=>this.aiContractPlacementOption(guild,contract)).filter(Boolean).sort((a,b)=>b.value-a.value);
      if(!options.length)break;
      let pick=firstPick;
      firstPick=null;
      if(!pick){
        const viable=options.filter(o=>o.chance>=minChance);
        const pool=viable.length?viable:options.slice(0,3);
        pick=this.weightedPick(pool.map((o,i)=>({item:o,weight:Math.max(1,o.value)+(pool.length-i)*3})));
      }
      if(!pick)break;
      if(pick.chance<minChance&&Math.random()>0.35*this.aiRisk(guild))break;
      const claimant=this.contractClaimant(pick.contract);
      if(pick.posture==='compete'){
      const cost=this.competitionReputationCost(guild,pick.contract,claimant,pick.add);
        guild.reputation=Math.max(0,guild.reputation-cost);
        this.log(guild,'contract',`${guild.name} challenged ${claimant?.name}'s claim on "${pick.contract.title}".${cost?` Reputation -${cost}.`:''}`);
      }
      this.commitContractWorkers(guild,pick.contract,pick.add,pick.posture||'cooperate');
      placed+=pick.add.length;
      const postureText=pick.posture==='compete'?'contesting':this.contractClaimant(pick.contract)?.id===guild.id?'claiming':'cooperating on';
      this.log(guild,'contract',`${guild.name} committed ${pick.add.map(c=>c.name).join(', ')} to "${pick.contract.title}" at ${pick.chance}% odds, ${postureText}.`);
      this.recordAiActivity(guild,'contract',`Committed ${pick.add.map(c=>c.name).join(' + ')}`,`${pick.contract.title} - ${pick.chance}% - ${postureText}`);
      this.setAiThinkingDetail(`placed ${pick.add.map(c=>this.workerInitials(c)).join(' + ')} on ${pick.contract.title}`);
      this.render();
      await this.aiVisualPause();
      if(placed>=Math.max(1,this.activeWorkers(guild).length-1)&&Math.random()>0.25*this.aiRisk(guild))break;
    }
    return placed>0;
  }
  aiContractPlacementOption(guild,contract){
    if(contract.offerSeasons<=0||this.contractProgress(guild,contract))return null;
    const current=this.placedTeam(guild,contract);
    const open=this.contractOpenSlotCount(contract);
    const claimant=this.contractClaimant(contract);
    const rivalClaim=claimant&&claimant.id!==guild.id;
    if(open<=0&&!rivalClaim)return null;
    const addPool=this.availableWorkers(guild);
    const coopLimit=Math.max(0,open);
    const contestLimit=rivalClaim?1:coopLimit;
    const coopAdd=coopLimit?this.bestWorkersForContract(addPool,contract,coopLimit,guild,rivalClaim?'cooperate':'claim'):[];
    const contestAdd=contestLimit?this.bestWorkersForContract(addPool,contract,contestLimit,guild,'compete'):[];
    const add=coopAdd;
    if(!add.length&&!rivalClaim)return null;
    const team=[...current,...add];
    const chance=this.successChanceForTeam(guild,contract,team);
    const mode=this.aiStrategicMode(guild);
    if(!rivalClaim){
      if(this.aiRejectsContractRisk(guild,contract,chance,mode))return null;
      const value=this.aiContractValue(guild,contract,chance,team,add.length);
      if(chance<this.aiFallbackChance(guild))return null;
      return {contract,add,chance,value:value+this.aiTraitSurfaceValue(guild,contract,add,'claim'),posture:'cooperate'};
    }
    if(!coopAdd.length&&!contestAdd.length)return null;
    const coopTeam=[...current,...coopAdd];
    const coopChance=this.successChanceForTeam(guild,contract,coopTeam);
    const coopValue=coopAdd.length?this.aiContractValue(guild,contract,coopChance,coopTeam,coopAdd.length)*.68+contract.reward.reputation*1.5+contract.reward.gold*.05+this.aiTraitSurfaceValue(guild,contract,coopAdd,'cooperate'):-Infinity;
    const contestTeam=[...current,...contestAdd];
    const contestChance=this.successChanceForTeam(guild,contract,contestTeam);
    const contestPressure=(mode.behind?24:0)+(mode.desperate?30:0)+(this.aiRisk(guild)-1)*16;
    const claimValue=contract.reward.reputation*4+contract.reward.gold*.12+(contract.risk==='dangerous'?6:0)+(['deadly','lethal'].includes(contract.risk)?12:0);
    const repCost=this.competitionReputationCost(guild,contract,claimant,contestAdd)*8+(guild.reputation>0?0:20);
    const competeValue=this.aiContractValue(guild,contract,contestChance,contestTeam,contestAdd.length)+contestPressure+claimValue+this.aiTraitSurfaceValue(guild,contract,contestAdd,'compete')-repCost;
    const blocked=this.competitionBlockedBy(contract,claimant,guild,contestAdd)||this.cooperationForcedBy(contract,claimant,guild,contestAdd);
    const canCompete=contestAdd.length&&!blocked&&guild.reputation>=this.competitionReputationCost(guild,contract,claimant,contestAdd)&&contestChance>=this.aiFallbackChance(guild)+4;
    const best=canCompete&&competeValue>coopValue?{contract,add:contestAdd,chance:contestChance,value:competeValue,posture:'compete'}:{contract,add:coopAdd,chance:coopChance,value:coopValue,posture:'cooperate'};
    if(!best.add.length)return null;
    if(this.aiRejectsContractRisk(guild,contract,best.chance,mode))return null;
    return best.chance<this.aiFallbackChance(guild)?null:best;
  }
  aiRejectsContractRisk(guild,contract,chance,mode=this.aiStrategicMode(guild)){
    if(mode.rebuilding&&['deadly','lethal'].includes(contract.risk)&&chance<72)return true;
    if(mode.startup&&contract.risk==='dangerous'&&chance<58)return true;
    if(mode.behind&&contract.risk==='dangerous'&&chance<66)return true;
    if(mode.desperate&&contract.risk!=='low'&&chance<66)return true;
    if(mode.rebuilding&&contract.risk==='moderate'&&chance<54)return true;
    return false;
  }
  isPlaced(c){return Boolean(c.placement);}
  isLockedPlacement(c,guild=this.activeLocalGuild()){
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
  aiWorkerContractFit(guild,worker,contract,posture='auto'){
    return this.characterFit(worker,contract)+this.aiTraitSurfaceValue(guild,contract,[worker],posture);
  }
  aiTraitSurfaceValue(guild,contract,workers=[],posture='auto'){
    const claimant=this.contractClaimant(contract);
    const traits=workers.flatMap(worker=>this.visibleTraits(worker));
    let value=0;
    const has=tag=>traits.includes(tag);
    const effectCount=trigger=>workers.flatMap(worker=>this.workerTraitEffects(worker,trigger).filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,team:workers,role:this.workerContractRole(workers,worker)})));
    if(posture==='claim'||!claimant||claimant.id===guild?.id){
      value+=effectCount('contractClaim').reduce((sum,effect)=>sum+(effect.type==='blockCompetition'?16:effect.type==='forceCooperation'?14:effect.type==='competitionCost'?(effect.amount||0)*5:0),0);
    }
    if(posture==='cooperate'){
      value+=effectCount('contractCooperation').reduce((sum,effect)=>sum+(effect.type==='cooperativeChance'?(effect.amount||0)*2:0),0);
      if(has('Honest')||has('Charming')||has('Connected'))value+=5;
    }
    if(posture==='compete'){
      value+=effectCount('contractContest').reduce((sum,effect)=>sum+(effect.type==='contestScore'?(effect.amount||0):effect.type==='bypassCompetitionBlock'?18:effect.type==='competitionCost'?-(effect.amount||0)*7:0),0);
      if(has('Criminal')||has('Shrewd')||has('Disgraced'))value+=6;
    }
    return value;
  }
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
  aiLaneWeights(guild){
    const presets={
      balanced:{gold:1,reputation:1,completed:1,resources:1,connections:1},
      scholars:{gold:.45,reputation:1.35,completed:.55,resources:.55,connections:1.2},
      fighters:{gold:.55,reputation:1.15,completed:1.45,resources:.75,connections:.55},
      operators:{gold:1.05,reputation:.75,completed:.75,resources:.55,connections:1.45},
      merchants:{gold:1.55,reputation:.55,completed:.45,resources:.8,connections:1.05},
      builders:{gold:.85,reputation:.7,completed:.7,resources:1.55,connections:.55},
      explorers:{gold:.8,reputation:.9,completed:1.25,resources:.65,connections:1.15},
      pious:{gold:.35,reputation:1.6,completed:.55,resources:.55,connections:.9},
      relief:{gold:.45,reputation:1.45,completed:.5,resources:.75,connections:.8},
      civic:{gold:.65,reputation:1.2,completed:.65,resources:.9,connections:1.15},
      miners:{gold:.95,reputation:.75,completed:.7,resources:1.55,connections:.55},
      gamblers:{gold:1.2,reputation:1.1,completed:1.05,resources:.55,connections:.65}
    };
    return presets[guild.personality?.id]||presets.balanced;
  }
  aiVictoryScore(guild){
    const goals=this.victoryGoals();
    const weights=this.aiLaneWeights(guild);
    return Object.entries(weights).reduce((sum,[stat,weight])=>sum+((guild[stat]||0)/Math.max(1,goals[stat]||1))*weight*100,0);
  }
  aiScore(guild){return this.aiVictoryScore(guild);}
  aiLaneNeed(guild,stat){
    const goals=this.victoryGoals();
    const weights=this.aiLaneWeights(guild);
    const progress=(guild[stat]||0)/Math.max(1,goals[stat]||1);
    return (weights[stat]||1)*Math.max(0.15,1-progress);
  }
  aiProductionValue(guild,rule){
    if(!rule)return 0;
    return (rule.gold||0)*this.aiLaneNeed(guild,'gold')*0.7
      +(rule.reputation||0)*this.aiLaneNeed(guild,'reputation')*4
      +(rule.completed||0)*this.aiLaneNeed(guild,'completed')*32
      +(rule.resources||0)*this.aiLaneNeed(guild,'resources')*18
      +(rule.connections||0)*this.aiLaneNeed(guild,'connections')*18
      +(rule.recover?10:0);
  }
  aiWorkerLaneValue(guild,worker){
    const prefs=guild.personality?.facilityPriorities||[];
    const facilityValue=this.data.contractParts.facilities.reduce((best,facility)=>{
      if(!this.facilityHasOpenSlot(guild,facility,worker))return best;
      const rule=this.facilityProductionRule(worker,facility);
      const exploit=this.aiProductionValue(guild,rule);
      const setup=this.facilitySetupRules().filter(setupRule=>setupRule.facility===facility.key&&this.workerHasAny(worker,setupRule.tags)).reduce((sum,setupRule)=>sum+setupRule.targets.reduce((targetSum,target)=>targetSum+this.aiFacilityLaneDemand(guild,target),0),0);
      const priority=prefs.includes(facility.key)?8:0;
      return Math.max(best,exploit+setup+priority);
    },0);
    const contractValue=this.state.boardContracts.reduce((best,contract)=>Math.max(best,this.characterFit(worker,contract)),0)*this.aiLaneNeed(guild,'completed')*0.35;
    return facilityValue+contractValue+(worker.resources||0)*this.aiLaneNeed(guild,'resources')*8+(worker.connections||0)*this.aiLaneNeed(guild,'connections')*8;
  }
  aiFacilityLaneDemand(guild,facilityKey){
    const facility=this.facilityDef(facilityKey);
    if(!facility)return 0;
    const ready=this.facilityReadyCount(guild,facilityKey);
    const exploiters=this.activeWorkers(guild).filter(worker=>this.facilityProductionRule(worker,facility));
    const best=exploiters.reduce((value,worker)=>Math.max(value,this.aiProductionValue(guild,this.facilityProductionRule(worker,facility))),0);
    return best*(ready?0.35:1)+Math.max(0,2-ready)*5;
  }
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
    const weights=this.aiLaneWeights(guild);
    const flavor=this.aiFlavorScore(guild,this.contractTags(contract))*(mode.rebuilding?3:8);
    const riskAppeal=mode.rebuilding?Math.min(0,this.aiRiskAppeal(guild,contract)):this.aiRiskAppeal(guild,contract);
    const riskRecovery={low:12,moderate:5,dangerous:-12,deadly:-28,lethal:-45}[contract.risk]||0;
    const oddsDiscipline=mode.rebuilding?(chance-62)*2:0;
    const recovery=mode.rebuilding?riskRecovery+oddsDiscipline+Math.max(0,4-(contract.workSeasons||1))*8+contract.reward.reputation*2.5:0;
    const workPenalty=contract.workSeasons*this.aiProfileValue(guild,'workPenalty',2)*(mode.rebuilding?1.7:1);
    const laneReward=(contract.reward.gold||0)*weights.gold*.18+(contract.reward.reputation||0)*weights.reputation*2.6+weights.completed*18;
    const readinessNeed=Math.max(0,70-chance)*(weights.completed>.9?0.35:0.16);
    return chance*(mode.rebuilding?1.25:this.aiRisk(guild))+this.aiRewardValue(guild,contract)+laneReward+this.contractReadinessBonus(guild,contract)*(weights.completed+.5)+riskAppeal+this.aiActivatedRuleValue(guild,contract,team)-workPenalty+flavor+addCount*5+recovery-readinessNeed;
  }
  aiActivatedRuleValue(guild,contract,team){
    return team.reduce((sum,worker)=>sum+this.workerTraitEffects(worker).filter(effect=>['contractScore','contractSuccess','contractFailure','contractProgress'].includes(effect.trigger)&&this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)})).length*5,0);
  }

  placedTeam(guild,contract){return (contract.placements?.[guild.id]||[]).map(id=>guild.roster.find(c=>c.id===id)).filter(Boolean);}
  hasContractPlacements(contract){return Object.values(contract.placements||{}).some(list=>list?.length);}
  contractProgress(guild,contract){return contract.progress?.[guild.id]||(contract.sharedProgress&&this.placedTeam(guild,contract).length?contract.sharedProgress:null);}
  contractClaimant(contract){return this.state.guilds.find(g=>g.id===contract.claim?.guildId)||this.contractSlotOccupants(contract,null)[0]?.guild||null;}
  ensureContractClaim(contract,guild){
    contract.claim=contract.claim||{guildId:null,postures:{}};
    contract.claim.postures=contract.claim.postures||{};
    if(!contract.claim.guildId&&guild)contract.claim.guildId=guild.id;
    return contract.claim;
  }
  contractPosture(contract,guild){
    const claimant=this.contractClaimant(contract);
    if(!claimant||claimant.id===guild?.id)return 'claim';
    return contract.claim?.postures?.[guild.id]||'cooperate';
  }
  contractTeamTraitEffects(guild,contract,trigger,extraWorkers=[]){
    if(!guild)return [];
    const team=[...this.placedTeam(guild,contract),...extraWorkers].filter(Boolean);
    return team.flatMap(worker=>this.workerTraitEffects(worker,trigger).filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,team,role:this.workerContractRole(team,worker)})).map(effect=>({...effect,guild})));
  }
  competitionBlockedBy(contract,claimant,challenger,incomingWorkers=[]){
    if(!claimant||claimant.id===challenger?.id)return null;
    const bypass=this.contractTeamTraitEffects(challenger,contract,'contractContest',incomingWorkers).some(effect=>effect.type==='bypassCompetitionBlock');
    if(bypass)return null;
    return this.contractTeamTraitEffects(claimant,contract,'contractClaim').find(effect=>effect.type==='blockCompetition')||null;
  }
  cooperationForcedBy(contract,claimant,challenger,incomingWorkers=[]){
    if(!claimant||claimant.id===challenger?.id)return null;
    return this.contractTeamTraitEffects(claimant,contract,'contractClaim').find(effect=>effect.type==='forceCooperation')||null;
  }
  competitionReputationCost(guild,contract,claimant=this.contractClaimant(contract),incomingWorkers=[]){
    let cost=1;
    for(const effect of this.contractTeamTraitEffects(claimant,contract,'contractClaim'))if(effect.type==='competitionCost')cost+=effect.amount||0;
    for(const effect of this.contractTeamTraitEffects(guild,contract,'contractContest',incomingWorkers))if(effect.type==='competitionCost')cost+=effect.amount||0;
    return this.clamp(cost,0,5);
  }
  contestTraitScore(guild,contract){
    return this.contractTeamTraitEffects(guild,contract,'contractContest').filter(effect=>effect.type==='contestScore').reduce((sum,effect)=>sum+(effect.amount||0),0);
  }
  cooperativeTraitBonus(guild,contract){
    return this.contractTeamTraitEffects(guild,contract,'contractCooperation').filter(effect=>effect.type==='cooperativeChance').reduce((sum,effect)=>sum+(effect.amount||0),0);
  }
  syncContractClaim(contract){
    const occupants=this.contractSlotOccupants(contract,null);
    contract.claim=contract.claim||{guildId:null,postures:{}};
    contract.claim.postures=contract.claim.postures||{};
    if(!occupants.some(({guild})=>guild.id===contract.claim.guildId))contract.claim.guildId=occupants[0]?.guild.id||null;
    for(const guildId of Object.keys(contract.claim.postures))if(!occupants.some(({guild})=>guild.id===guildId))delete contract.claim.postures[guildId];
    if(!occupants.length)delete contract.claim;
  }
  commitContractWorkers(guild,contract,workers,posture='cooperate',{suppressResponse=false}={}){
    contract.placements=contract.placements||{};
    const claim=this.ensureContractClaim(contract,guild);
    if(claim.guildId!==guild.id)claim.postures[guild.id]=posture;
    const list=contract.placements[guild.id]||[];
    for(const worker of workers){
      if(!list.includes(worker.id))list.push(worker.id);
      worker.placement={type:'contract',id:contract.instanceId};
    }
    contract.placements[guild.id]=list;
    this.syncContractClaim(contract);
    if(!suppressResponse)this.enqueueContractResponse(contract,guild,posture);
  }
  enqueueContractResponse(contract,intruder,posture='cooperate'){
    if(posture!=='cooperate')return false;
    const claimant=this.contractClaimant(contract);
    if(!claimant||claimant.id===intruder?.id)return false;
    this.state.pendingContractResponses=this.state.pendingContractResponses||[];
    const id=`${contract.instanceId}:${claimant.id}:${intruder.id}`;
    if(this.state.pendingContractResponses.some(response=>response.id===id))return false;
    this.state.pendingContractResponses.push({id,contractId:contract.instanceId,claimantId:claimant.id,intruderId:intruder.id});
    if(!this.state.resolvingContractResponses&&(this.isLocalGuild(claimant)||this.isAiGuild(claimant)))this.openNextContractResponse();
    return true;
  }
  contractSharedSlotLimit(){return this.data.contractParts.settings.contractSharedSlots||5;}
  contractSlotOccupants(contract,viewer=this.activeLocalGuild()){
    const guilds=viewer?[viewer,...this.state.guilds.filter(g=>g.id!==viewer.id)]:this.state.guilds;
    return guilds.flatMap(guild=>this.placedTeam(guild,contract).map((worker,index)=>({guild,worker,index,posture:this.contractPosture(contract,guild)})));
  }
  contractOccupiedSlotCount(contract){return this.contractSlotOccupants(contract,null).length;}
  contractOpenSlotCount(contract){return Math.max(0,this.contractSharedSlotLimit()-this.contractOccupiedSlotCount(contract));}
  placeWorker(characterId,targetId,targetType='contract',mode='work'){
    const guild=this.activeLocalGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.alive)return false;
    if(targetType==='recovery')return this.placeRecoveryWorker(worker,guild);
    if(targetType==='facility')return this.placeFacilityWorker(worker,targetId,guild,mode);
    const contract=this.state.boardContracts.find(c=>c.instanceId===targetId);
    if(!contract)return false;
    if(contract.offerSeasons<=0||this.contractProgress(guild,contract))return false;
    const claimant=this.contractClaimant(contract);
    const posture=claimant&&claimant.id!==guild.id&&mode==='compete'?'compete':'cooperate';
    const alreadyHere=worker.placement?.type==='contract'&&worker.placement.id===contract.instanceId;
    if(!alreadyHere&&posture!=='compete'&&this.contractOpenSlotCount(contract)<=0)return false;
    if(posture==='compete'){
      const forced=this.cooperationForcedBy(contract,claimant,guild,[worker]);
      if(forced){
        if(this.contractOpenSlotCount(contract)<=0){
          this.log(guild,'contract',`${claimant.name}'s ${forced.trait} prevented ${guild.name} from contesting "${contract.title}", but no cooperation slot was open.`);
          this.render();
          return false;
        }
        if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
        this.log(guild,'contract',`${claimant.name}'s ${forced.trait} forced ${guild.name} to cooperate on "${contract.title}".`);
        this.commitContractWorkers(guild,contract,[worker],'cooperate',{suppressResponse:true});
        this.render();
        return true;
      }
      const blocked=this.competitionBlockedBy(contract,claimant,guild,[worker]);
      if(blocked){
        this.log(guild,'contract',`${claimant.name}'s ${blocked.trait} blocked ${guild.name} from contesting "${contract.title}".`);
        this.render();
        return false;
      }
    }
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    if(posture==='compete'){
      const cost=this.competitionReputationCost(guild,contract,claimant,[worker]);
      guild.reputation=Math.max(0,guild.reputation-cost);
      this.log(guild,'contract',`${guild.name} challenged ${claimant.name}'s claim on "${contract.title}".${cost?` Reputation -${cost}.`:''}`);
    }else if(claimant&&claimant.id!==guild.id){
      this.log(guild,'contract',`${guild.name} joined "${contract.title}" as a cooperator with ${claimant.name}.`);
    }
    this.commitContractWorkers(guild,contract,[worker],posture);
    this.render();
    return true;
  }
  placeFacilityWorker(worker,facilityKey,guild=this.activeLocalGuild(),mode='work'){
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
  placeRecoveryWorker(worker,guild=this.activeLocalGuild()){
    if(worker.placement&&!this.unplaceWorker(worker,guild))return false;
    if(this.recoveryWorkers(guild).length>=this.recoverySlotCount())return false;
    worker.placement={type:'recovery'};
    this.render();
    return true;
  }
  returnWorker(characterId){
    const guild=this.activeLocalGuild();
    if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return false;
    const worker=guild.roster.find(c=>c.id===characterId);
    if(!worker||!worker.placement)return false;
    if(!this.unplaceWorker(worker,guild))return false;
    this.render();
    return true;
  }
  unplaceWorker(worker,guild=this.activeLocalGuild(),force=false){
    if(!worker?.placement)return true;
    if(worker.placement.type==='contract'){
      const contract=this.state.boardContracts.find(c=>c.instanceId===worker.placement.id);
      if(contract&&!force&&this.contractProgress(guild,contract))return false;
      if(contract?.placements?.[guild.id])contract.placements[guild.id]=contract.placements[guild.id].filter(id=>id!==worker.id);
      if(contract?.progress?.[guild.id]&&!this.placedTeam(guild,contract).length)delete contract.progress[guild.id];
      if(contract)this.syncContractClaim(contract);
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
    const recoveryCount=this.resolveRecovery(guild);
    const facilityCount=this.resolveFacilities(guild);
    const contractCount=this.state.boardContracts.filter(c=>this.placedTeam(guild,c).length).length;
    this.clearFacilityPlacements(guild);
    if(!contractCount&&!facilityCount&&!recoveryCount)return `${guild.name} committed no workers.`;
    return `${guild.name} committed ${contractCount} contract placement(s), resolved ${facilityCount} facility placement(s), and rested ${recoveryCount} merc(s).`;
  }

  finishHumanAction(type,msg,guild=this.activeLocalGuild(),fn){if(fn)fn();if(msg)this.log(guild,type,msg);this.state.humanActionUsed=true;this.advanceTurnCursor();}

  runAITurns(){
    this.advanceTurnCursor();
  }
  finishAITurns(){
    for(const guild of this.snakeGuildOrder().filter(g=>this.isAiGuild(g))) this.resolveAIPlacements(guild);
    for(const guild of this.snakeGuildOrder().filter(g=>this.isLocalGuild(g))) this.resolveAIPlacements(guild);
    this.state.resolvingContractResponses=true;
    this.finishSeasonAfterContractResponses();
  }
  finishSeasonAfterContractResponses(){
    if(this.openNextContractResponse())return;
    this.state.resolvingContractResponses=false;
    this.resolveSeasonContracts();
    if(this.checkVictory())return;
    this.state.activeGuildId=null;
    this.state.localTurnIndex=0;
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
    try{ this.showAiThinking(guild); }catch(e){}
    const act=()=>{
      const result = this.aiTurn(guild);
      Promise.resolve(result).then(()=>{
        try{ this.hideAiThinking(); }catch(e){}
        this.render();
        const next=()=>this.runAITurnSequence(guilds,done,index+1);
        if(delay>0)setTimeout(next,delay);
        else next();
      }).catch((e)=>{
        try{ this.hideAiThinking(); }catch(ex){}
        console.error('aiTurn error',e);
        this.render();
        const next=()=>this.runAITurnSequence(guilds,done,index+1);
        if(delay>0)setTimeout(next,delay);
        else next();
      });
    };
    if(delay>0)setTimeout(act,delay);
    else act();
  }

  async aiTurn(guild){
    const mode=this.aiStrategicMode(guild);
    const rosterCap=this.guildRosterCap();
    const coreSize=Math.min(mode.rebuilding?5:(this.data.contractParts.settings.aiCoreRosterSize||4),rosterCap);
    const targetRoster=Math.min(Math.max(this.aiProfileValue(guild,'rosterGoal',6),mode.rebuilding?6:0),rosterCap);
    let acted=false;
    if(this.activeWorkers(guild).length<coreSize&&await this.aiCatchUpRecruit(guild,coreSize))acted=true;
    if(mode.desperate&&this.activeWorkers(guild).length<3&&await this.aiEmergencyRecruit(guild))acted=true;
    
    let shouldRest=false;
    if(this.guildNeedsRest(guild)&&Math.random()<this.aiRestChance(guild,mode)){
      shouldRest = true;
    }
    if(shouldRest){const msg=this.restGuild(guild);this.log(guild,'rest',msg);this.setAiThinkingDetail('rested mercenaries');this.render();await this.aiVisualPause();return true;}
    
    const recruitOption=!guild.hiredThisSeason&&this.activeWorkers(guild).length<targetRoster?this.aiRecruitActionValue(guild,targetRoster):null;
    const facilityOption=this.aiFacilityActionValue(guild);
    const contractOption=this.aiContractActionValue(guild);
    const top=[recruitOption,facilityOption,contractOption].filter(Boolean).sort((a,b)=>b.value-a.value)[0];
    if(top?.type==='recruit'&&top.value>18&&await this.aiCatchUpRecruit(guild,this.activeWorkers(guild).length+1))acted=true;
    if(top?.type==='facility'&&top.value>16&&await this.aiPlaceFacility(guild,top.choice))acted=true;
    if(top?.type==='contract'&&await this.aiPlaceContractWorkers(guild,top.choice))return true;
    if(mode.behind&&this.activeWorkers(guild).length<rosterCap&&!guild.hiredThisSeason&&Math.random()<0.35&&await this.aiCatchUpRecruit(guild,this.activeWorkers(guild).length+1))acted=true;
    const plannedSupport=this.availableWorkers(guild).length>3&&Math.random()<this.aiFacilityChance(guild,mode)&&await this.aiPlaceFacility(guild);
    if(plannedSupport)acted=true;
    if(await this.aiPlaceContractWorkers(guild))return true;
    if((mode.desperate||(mode.behind&&guild.gold<10&&guild.reputation<10))&&this.aiLocalRecoveryWork(guild))return true;
    if(Math.random()<this.aiFacilityChance(guild,mode)&&await this.aiPlaceFacility(guild))return true;
    if(acted||await this.aiPlaceFacility(guild))return true;
    this.log(guild,'operate',`${guild.name} held workers in reserve.`);
    return true;
  }
  aiRecruitActionValue(guild,targetRoster){
    const candidates=this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.canRecruit(guild,c));
    if(!candidates.length)return null;
    const target=[...this.state.boardContracts].sort((a,b)=>this.contractValue(guild,b)-this.contractValue(guild,a))[0];
    const best=[...candidates].sort((a,b)=>this.recruitValue(guild,b,target)-this.recruitValue(guild,a,target))[0];
    if(!best)return null;
    const shortage=Math.max(0,targetRoster-this.activeWorkers(guild).length)*8;
    return {type:'recruit',value:this.recruitValue(guild,best,target)*0.55+shortage,choice:best};
  }
  aiFacilityActionValue(guild){
    const best=this.aiFacilityPlacementOptions(guild).sort((a,b)=>b.value-a.value)[0];
    return best?{type:'facility',value:best.value,choice:best}:null;
  }
  aiContractActionValue(guild){
    const best=this.state.boardContracts.map(contract=>this.aiContractPlacementOption(guild,contract)).filter(Boolean).sort((a,b)=>b.value-a.value)[0];
    return best?{type:'contract',value:best.value,choice:best}:null;
  }
  aiRestChance(guild,mode=this.aiStrategicMode(guild)){
    const base=this.aiProfileValue(guild,'restChance',0.55);
    if(mode.desperate&&this.activeWorkers(guild).length<4)return base*0.55;
    if(mode.rebuilding)return base*0.85;
    return base;
  }

  // UI helpers for browser AI turn indicator.
  showAiThinking(guild=null,detail='thinking...'){
    try{
      if(typeof document==='undefined') return;
      const active=guild||this.state.guilds.find(g=>g.id===this.state.activeGuildId);
      const name=active?.name||'AI';
      this._aiThinkingName=name;
      if(!this._aiThinkingEl){
        const el = this.ui.aiThinking || document.getElementById('aiThinking');
        if(!el)return;
        this._aiThinkingEl = el;
      }
      this._aiThinkingEl.classList.remove('closed');
      this._aiThinkingToken = (this._aiThinkingToken||0)+1;
      this._aiThinkingShownAt = performance.now();
      this.setAiThinkingDetail(detail);
    }catch(e){console.warn('showAiThinking failed',e);}    
  }

  setAiThinkingDetail(detail='thinking...'){
    try{
      if(!this._aiThinkingEl)return;
      const copy=this._aiThinkingEl.querySelector('.ai-thinking-copy');
      if(copy)copy.textContent=`${this._aiThinkingName||'AI'} ${detail}`;
    }catch(e){console.warn('setAiThinkingDetail failed',e);}
  }

  hideAiThinking(){
    try{
      if(!this._aiThinkingEl) return;
      const token=this._aiThinkingToken;
      const elapsed=performance.now()-(this._aiThinkingShownAt||0);
      const remove=()=>{
        if(token!==this._aiThinkingToken||!this._aiThinkingEl)return;
        this._aiThinkingEl.classList.add('closed');
      };
      const wait=Math.max(0,900-elapsed);
      if(wait)setTimeout(remove,wait);
      else remove();
    }catch(e){console.warn('hideAiThinking failed',e);}    
  }
  aiFacilityChance(guild,mode=this.aiStrategicMode(guild)){
    const base=this.aiProfileValue(guild,'facilityChance',0.35);
    if(mode.desperate)return Math.min(base,0.12);
    if(mode.startup)return Math.min(base,0.22);
    if(mode.behind)return Math.min(base,0.24);
    return base;
  }
  async aiCatchUpRecruit(guild,target){
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
      let c=this.chooseRecruit(guild,affordable);
      if(!c) break;
      if(!this.hire(guild,c,false))break;
      this.log(guild,'recruit',`${guild.name} recruited ${c.name}.`);
      this.recordAiActivity(guild,'recruit',`Recruited ${c.name}`,`${c.archetype}, ${this.characterSalary(c)}g upkeep`);
      this.setAiThinkingDetail(`recruited ${c.name}`);
      this.render();
      await this.aiVisualPause();
      hired++;
      break;
    }
    return hired;
  }
  async aiEmergencyRecruit(guild){
    if(guild.hiredThisSeason||this.activeWorkers(guild).length>=this.guildRosterCap())return false;
    const eligible=()=>this.state.tavern.filter(c=>!c.refusesGuildIds.includes(guild.id)&&this.reputationRequirement(c)===0&&this.characterSalary(c)<=2);
    let candidates=eligible();
    if(!candidates.length&&this.state.tavern.length<14){
      this.refillTavern(this.state.tavern.length+4);
      candidates=eligible();
    }
    let pick=this.chooseRecruit(guild,candidates);
    if(!pick)return false;
    this.hire(guild,pick,false,0,{sponsored:true});
    this.log(guild,'recruit',`${guild.name} took on ${pick.name} with deferred pay to rebuild.`);
    this.recordAiActivity(guild,'recruit',`Recruited ${pick.name}`,'deferred pay');
    this.setAiThinkingDetail(`recruited ${pick.name}`);
    this.render();
    await this.aiVisualPause();
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
    this.recordAiActivity(guild,'operate','Worked local jobs',`${workers.map(c=>c.name).join(' + ')}: +${gold}g, +${rep} rep`);
    return true;
  }

  resolveAIPlacements(guild){
    this.resolveFacilities(guild);
    this.clearFacilityPlacements(guild);
  }

  async aiPlaceFacility(guild,firstChoice=null){
    const mode=this.aiStrategicMode(guild);
    const laneBuild=this.aiLaneNeed(guild,'resources')+this.aiLaneNeed(guild,'connections')+this.aiLaneNeed(guild,'gold')>3.6;
    const target=Math.min(mode.rebuilding&&!laneBuild?1:this.aiProfileValue(guild,'facilityWorkers',2),this.availableWorkers(guild).length);
    const placed=[];
    while(placed.length<target){
      let choice=firstChoice;
      firstChoice=null;
      if(!choice){
        const worker=this.chooseFacilityWorker(guild);
        if(!worker)break;
        const facility=this.chooseFacility(guild,worker);
        if(!facility)break;
        if(this.facilityWorkers(guild,facility.key,'work').length>=facility.slots)break;
        choice = {worker, facility};
      }
      if(!choice)break;
      choice.worker.placement={type:'facility',id:choice.facility.key,mode:'work'};
      placed.push(`${choice.worker.name} to the ${choice.facility.label}`);
      this.recordAiActivity(guild,'train',`Sent ${choice.worker.name}`,choice.facility.label);
      this.setAiThinkingDetail(`sent ${choice.worker.name} to ${choice.facility.label}`);
      this.render();
      await this.aiVisualPause();
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
    return trainNeed+profileFit+this.aiWorkerLaneValue(guild,worker)*0.45+Math.random()*5;
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
  aiFacilityPlacementOptions(guild){
    const options=[];
    for(const worker of this.availableWorkers(guild)){
      for(const facility of this.data.contractParts.facilities){
        if(!this.facilityHasOpenSlot(guild,facility,worker))continue;
        const value=this.facilityValue(guild,worker,facility,guild.personality?.preferredTags||[]);
        if(value>0)options.push({worker,facility,value});
      }
    }
    return options;
  }
  facilityValue(guild,worker,facility,prefs=[]){
    const train=(facility.traits||[]).filter(t=>!this.visibleTraits(worker).includes(t)).length*4;
    const flavor=(facility.traits||[]).filter(t=>prefs.includes(t)).length*8;
    const priorities=guild.personality?.facilityPriorities||[];
    const priority=priorities.includes(facility.key)?(priorities.length-priorities.indexOf(facility.key))*12:0;
    const activation=this.workerTraitEffects(worker,'facilityResolve').filter(effect=>this.effectMatchesContract(effect,null,{guild,worker,facility,mode:'work'})).length*12;
    const support=this.state.boardContracts.reduce((sum,contract)=>sum+this.workerTraitEffects(worker,'facilitySupport').filter(effect=>this.effectMatchesContract(effect,contract,{guild,worker,facility,mode:'work',team:this.chooseBestTeam(guild,contract)})).reduce((s,effect)=>s+(effect.amount||0),0),0);
    const trainingSupport=this.facilityTrainingSupportTraitEffectScore(guild,worker,facility);
    const outgoingTraining=this.workerTraitEffects(worker,'facilityTrainingSupport').filter(effect=>this.effectMatchesContract(effect,null,{guild,worker,facility,mode:'work'})).length*8;
    const production=this.facilityProductionRule(worker,facility);
    const readyExploit=this.facilityReadyCount(guild,facility.key)?this.aiProductionValue(guild,production):0;
    const readySetup=this.facilitySetupRules().filter(rule=>rule.facility===facility.key&&this.workerHasAny(worker,rule.tags)).reduce((sum,rule)=>sum+rule.targets.reduce((targetSum,target)=>targetSum+this.aiFacilityLaneDemand(guild,target),0),0);
    const doneNeed=this.aiLaneNeed(guild,'completed');
    const contractSetup=(facility.key==='scout'&&this.workerHasAny(worker,['Scout','Outrider','Courier','Forester','Hunter','Watchful','Curious'])?14*doneNeed:0)+(facility.key==='archives'&&this.workerHasAny(worker,['Scholar','Learned','Tutor','Clerk','Scribe','Careful','Curious'])?18*doneNeed:0);
    const productionPotential=this.aiProductionValue(guild,production)*0.35;
    return train+flavor+priority+activation+support+trainingSupport+outgoingTraining+readyExploit+readySetup+contractSetup+productionPotential+Math.random()*5;
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
    this.recordAiActivity(guild,'rest','Rested mercenaries',rested.join(' + ')||'no recovery');
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
    const placements=[];
    for(const facility of this.data.contractParts.facilities){
      for(const worker of this.facilityWorkers(guild,facility.key)){
        placements.push({worker,facility});
      }
    }
    for(const {worker,facility} of placements)this.applyFacilityReadinessWork(guild,worker,facility);
    for(const {worker,facility} of placements){this.resolveFacilityWorker(guild,worker,facility);count++;}
    return count;
  }
  clearFacilityPlacements(guild){
    for(const worker of guild.roster.filter(c=>c.placement?.type==='facility'))worker.placement=null;
  }
  resolveFacilityWorker(guild,worker,facility){
    this.applyReadyFacilityProduction(guild,worker,facility);
    this.applyFacilityTraitEffects(guild,worker,facility,[]);
    const pool=[...(facility.traits||[])];
    if((facility.rareTraits||[]).length&&Math.random()<(facility.rareChance??0.12))pool.push(...facility.rareTraits);
    const candidates=pool.filter(t=>!worker.traits.includes(t));
    const support=this.facilityTrainingSupportTraitEffectScore(guild,worker,facility);
    const trainChance=this.facilityTrainingChance(guild,worker,facility);
    if(support>0)this.log(guild,'good',`${worker.name}'s training at the ${facility.label} gained +${support}% support from other facilities.`);
    if(candidates.length&&Math.random()*100<trainChance){
      const trait=this.pick(candidates);
      this.awardFacilityTrait(guild,worker,facility,trait);
    } else {
      this.log(guild,'train',`${worker.name} trained at the ${facility.label}, but gained no new trait.`);
    }
  }
  facilityTrainingChance(guild,worker,facility){
    const assist=this.workerTraitEffects(worker,'facilityWork').filter(effect=>effect.type==='trainingAssist'&&this.effectMatchesContract(effect,null,{worker,facility,mode:worker.placement?.mode})).reduce((sum,effect)=>sum+(effect.amount||0),0);
    const support=this.facilityTrainingSupportTraitEffectScore(guild,worker,facility);
    return this.clamp((facility.trainChance||0)+assist+support,0,85);
  }
  applyFacilityReadinessWork(guild,worker,facility){
    if(facility.key==='scout'&&this.workerHasAny(worker,['Scout','Outrider','Courier','Forester','Hunter','Watchful','Curious'])){
      const contract=this.readinessTargetContract(guild,'scouted');
      if(contract)this.addContractReadiness(guild,contract,'scouted',1,4,`${worker.name} at the ${facility.label}`);
    }
    if(facility.key==='archives'&&this.workerHasAny(worker,['Scholar','Learned','Tutor','Clerk','Scribe','Careful','Curious'])){
      const contract=this.readinessTargetContract(guild,'planned');
      if(contract)this.addContractReadiness(guild,contract,'planned',1,1,`${worker.name} at the ${facility.label}`);
    }
    for(const rule of this.facilitySetupRules()){
      if(rule.facility!==facility.key||!this.workerHasAny(worker,rule.tags))continue;
      const target=this.readyFacilityTarget(guild,rule.targets);
      if(target)this.addFacilityReady(guild,target,rule.amount||1,rule.max||3,`${worker.name} at the ${facility.label}`);
    }
  }
  facilitySetupRules(){
    return [
      {facility:'archives',tags:['Scholar','Learned','Tutor','Clerk','Scribe','Careful','Curious'],targets:['workshop','market','training','scout','chapel'],amount:1,max:3},
      {facility:'workshop',tags:['Craftsman','Smith','Blacksmith','Armorer','Carpenter','Mason','Miner','Stonecutter','Inventive','Practical'],targets:['market','training','scout'],amount:1,max:3},
      {facility:'market',tags:['Merchant','Connected','Shrewd','Diplomat','Tax Collector','Innkeeper','Influential','Noble'],targets:['chapel','common','archives'],amount:1,max:3},
      {facility:'scout',tags:['Scout','Outrider','Courier','Forester','Hunter','Watchful','Resourceful'],targets:['training','market','workshop'],amount:1,max:3},
      {facility:'chapel',tags:['Monk','Faithful','Compassionate','Honest','Influential','Noble','Patient'],targets:['common','market','infirmary'],amount:1,max:3},
      {facility:'infirmary',tags:['Physician','Chirurgeon','Apothecary','Herbalist','Healer','Patient','Compassionate'],targets:['training','scout','workshop'],amount:1,max:3},
      {facility:'common',tags:['Cook','Innkeeper','Generous','Honest','Seasoned','Patient','Resourceful'],targets:['training','workshop','chapel','market'],amount:1,max:3},
      {facility:'training',tags:['Soldier','Veteran','Warden','Battlewise','Fearless','Strong','Armorer'],targets:['scout','chapel','workshop'],amount:1,max:3}
    ];
  }
  readyFacilityTarget(guild,targets=[]){
    const readable=targets.filter(key=>this.facilityDef(key));
    return readable.sort((a,b)=>this.facilityReadyCount(guild,a)-this.facilityReadyCount(guild,b))[0]||null;
  }
  facilityReadyCount(guild,facilityKey){return guild.facilityReadiness?.[facilityKey]?.ready||0;}
  addFacilityReady(guild,facilityKey,amount=1,max=3,source='Facility work'){
    guild.facilityReadiness=guild.facilityReadiness||{};
    const current={...(guild.facilityReadiness[facilityKey]||{})};
    const before=current.ready||0;
    current.ready=Math.min(max,before+amount);
    guild.facilityReadiness[facilityKey]=current;
    if(current.ready!==before){
      const facility=this.facilityDef(facilityKey);
      this.log(guild,'good',`${source} readied the ${facility?.label||facilityKey}. Ready ${current.ready}/${max}.`);
    }
  }
  consumeFacilityReady(guild,facilityKey,source='Facility work'){
    const current=guild.facilityReadiness?.[facilityKey];
    if(!current?.ready)return false;
    current.ready--;
    if(current.ready<=0)delete current.ready;
    const facility=this.facilityDef(facilityKey);
    this.log(guild,'good',`${source} used Ready at the ${facility?.label||facilityKey}.`);
    return true;
  }
  applyReadyFacilityProduction(guild,worker,facility){
    const rule=this.facilityProductionRule(worker,facility);
    if(!rule||!this.facilityReadyCount(guild,facility.key))return false;
    const source=`${worker.name} at the ${facility.label}`;
    if(!this.consumeFacilityReady(guild,facility.key,source))return false;
    if(rule.gold)this.gainGuildStat(guild,'gold',rule.gold,null,source);
    if(rule.reputation)this.gainGuildStat(guild,'reputation',rule.reputation,null,source);
    if(rule.resources)this.gainGuildStat(guild,'resources',rule.resources,null,source);
    if(rule.connections)this.gainGuildStat(guild,'connections',rule.connections,null,source);
    if(rule.completed)this.gainGuildStat(guild,'completed',rule.completed,null,source);
    if(rule.recover)this.recoverFromGroup(guild,this.activeWorkers(guild),rule.recover,1,source);
    this.log(guild,'good',`${source} exploited a ready facility: ${this.facilityProductionText(rule)}.`);
    return true;
  }
  facilityProductionRule(worker,facility){
    const has=tags=>this.workerHasAny(worker,tags);
    const profession=tags=>tags.includes(worker.archetype);
    const rule={};
    if(facility.key==='workshop'&&profession(['Blacksmith','Armorer','Boatwright','Carpenter','Glassmaker','Mason','Miner','Stonecutter','Weaver'])){
      rule.resources=profession(['Blacksmith','Miner','Stonecutter','Mason'])?3:2;
      if(has(['Craftsman','Smith']))rule.resources+=1;
      if(has(['Inventive','Practical']))rule.gold=4;
    }
    if(facility.key==='market'){
      if(profession(['Merchant','Tax Collector','Innkeeper','Smuggler','Weaver']))rule.gold=profession(['Merchant','Tax Collector'])?22:16;
      if(profession(['Diplomat','Clerk','Bailiff','Innkeeper','Tax Collector']))rule.connections=profession(['Diplomat','Tax Collector'])?3:2;
      if((rule.gold||rule.connections)&&has(['Shrewd','Frugal']))rule.gold=(rule.gold||0)+4;
      if((rule.gold||rule.connections)&&has(['Connected','Influential','Noble']))rule.connections=(rule.connections||0)+1;
      if((rule.gold||rule.connections)&&has(['Influential','Noble','Honest']))rule.reputation=1;
    }
    if(facility.key==='chapel'&&profession(['Monk','Scribe','Tutor','Diplomat','Physician'])){
      rule.reputation=profession(['Monk','Diplomat'])?4:3;
      if(has(['Faithful','Compassionate','Generous','Honest']))rule.reputation+=1;
      if(has(['Connected','Influential']))rule.connections=1;
      rule.recover=['morale','trauma'];
    }
    if(facility.key==='common'&&profession(['Cook','Innkeeper','Tutor','Scribe','Merchant'])){
      rule.reputation=profession(['Innkeeper','Tutor'])?3:2;
      if(has(['Generous','Honest','Seasoned']))rule.reputation+=1;
      if(has(['Cook','Patient','Seasoned']))rule.recover=['strain','morale'];
    }
    if(facility.key==='training'&&profession(['Soldier','Warden','Armorer','Hunter','Outrider'])){
      rule.completed=1;
      if(profession(['Soldier','Warden'])||has(['Veteran','Battlewise']))rule.reputation=2;
    }
    if(facility.key==='scout'&&profession(['Courier','Forester','Hunter','Outrider','Sailor','Smuggler'])){
      rule.connections=profession(['Courier','Outrider','Smuggler'])?2:1;
      if(profession(['Hunter','Outrider','Forester'])||has(['Scout','Watchful']))rule.completed=1;
      if(has(['Curious','Resourceful']))rule.connections=(rule.connections||0)+1;
    }
    if(facility.key==='archives'&&profession(['Clerk','Scribe','Tutor','Monk','Tax Collector','Bailiff'])){
      rule.connections=profession(['Clerk','Tutor','Tax Collector'])?2:1;
      rule.reputation=profession(['Scribe','Tutor','Monk'])?2:1;
      if(has(['Scholar','Learned','Careful']))rule.reputation+=1;
      if(has(['Curious']))rule.connections+=1;
    }
    if(facility.key==='infirmary'&&profession(['Physician','Chirurgeon','Apothecary','Herbalist'])){
      rule.reputation=profession(['Physician','Chirurgeon'])?3:2;
      if(has(['Healer','Patient','Compassionate']))rule.reputation+=1;
      rule.recover=['injury','strain'];
    }
    return Object.keys(rule).length?rule:null;
  }
  facilityProductionText(rule){
    const parts=[];
    if(rule.gold)parts.push(`+${rule.gold} Gold`);
    if(rule.reputation)parts.push(`+${rule.reputation} Rep`);
    if(rule.completed)parts.push(`+${rule.completed} Done`);
    if(rule.resources)parts.push(`+${rule.resources} Res`);
    if(rule.connections)parts.push(`+${rule.connections} Conn`);
    if(rule.recover)parts.push(`recover ${this.formatList(rule.recover)}`);
    return parts.join(', ');
  }
  readinessTargetContract(guild,mark){
    const focused=this.isLocalGuild(guild)?this.state.boardContracts.find(c=>c.instanceId===this.state.focusContractId):null;
    if(focused&&this.contractCanGainReadiness(guild,focused,mark))return focused;
    return this.state.boardContracts
      .filter(contract=>this.contractCanGainReadiness(guild,contract,mark))
      .sort((a,b)=>this.contractValue(guild,b)-this.contractValue(guild,a))[0]||null;
  }
  contractCanGainReadiness(guild,contract,mark){
    if(!contract||contract.offerSeasons<=0&&!this.hasContractPlacements(contract))return false;
    const readiness=this.contractReadiness(guild,contract);
    if(mark==='scouted')return (readiness.scouted||0)<4;
    if(mark==='planned')return !readiness.planned;
    return true;
  }
  addContractReadiness(guild,contract,mark,amount=1,max=1,source='Facility work'){
    contract.readiness=contract.readiness||{};
    const current={...(contract.readiness[guild.id]||{})};
    const before=current[mark]||0;
    current[mark]=Math.min(max,before+amount);
    contract.readiness[guild.id]=current;
    if(current[mark]!==before){
      const label=mark==='scouted'?'Scouted':'Planned';
      const bonus=mark==='scouted'?`${current[mark]*5}%`:'10%';
      this.log(guild,'good',`${source} marked "${contract.title}" as ${label}. Contract readiness now adds ${bonus}.`);
    }
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
    if(this.isLocalGuild(guild)){
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
    const target=[...this.state.boardContracts].sort((a,b)=>this.contractValue(guild,b)-this.contractValue(guild,a))[0];
    return [...arr].sort((a,b)=>this.recruitValue(guild,b,target)-this.recruitValue(guild,a,target))[0]||null;
  }
  recruitValue(guild,c,target){
    const traits=this.visibleTraits(c);
    const mode=this.aiStrategicMode(guild);
    const profileFit=this.aiFlavorScore(guild,traits)*(mode.rebuilding?5:12);
    const targetFit=target?this.characterFit(c,target):0;
    const boardFit=this.state.boardContracts.reduce((best,contract)=>Math.max(best,this.characterFit(c,contract)),0);
    const surfaceFit=this.state.boardContracts.reduce((best,contract)=>{
      const claimant=this.contractClaimant(contract);
      const posture=claimant&&claimant.id!==guild.id?'compete':'claim';
      return Math.max(best,this.aiTraitSurfaceValue(guild,contract,[c],posture),this.aiTraitSurfaceValue(guild,contract,[c],'cooperate'));
    },0);
    const cheapStarter=mode.rebuilding&&(this.reputationRequirement(c)===0?10:0)+(this.characterSalary(c)<=2?4:0);
    const professionDemand=this.state.boardContracts.some(contract=>contract.requirements.some(req=>req.trait===c.archetype))?7:0;
    const laneFit=this.aiWorkerLaneValue(guild,c);
    return targetFit+surfaceFit*.8+profileFit+laneFit*0.65+traits.length*2+c.connections*this.aiLaneNeed(guild,'connections')*5+c.resources*this.aiLaneNeed(guild,'resources')*5-this.recruitCost(guild,c)/3+(mode.rebuilding?boardFit*0.45+cheapStarter+professionDemand:0);
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
    c.revealAfterSeason=this.isLocalGuild(guild)&&(!free||guild.roster.length>1);
    if(this.isAiGuild(guild))this.revealAllTraits(c,'for AI planning');
    c.history.push(`Year ${this.state.year}: joined ${guild.name}.`);
    return true;
  }
  hireFromTavern(characterId){
    const guild=this.activeLocalGuild();
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
    const guild=this.activeLocalGuild();
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

  resolveSeasonContracts(){
    const contracts=this.state.boardContracts.filter(contract=>this.hasContractPlacements(contract));
    for(const contract of contracts)this.resolveSharedBoardContract(contract);
  }
  resolveSharedBoardContract(contract){
    const claimant=this.contractClaimant(contract);
    if(!claimant)return null;
    const progress=this.ensureSharedContractProgress(contract);
    const participants=this.contractParticipantGuilds(contract);
    progress.remaining=Math.max(0,progress.remaining-1);
    for(const guild of participants){
      const team=this.placedTeam(guild,contract);
      this.applyContractProgressTraitEffects(guild,contract,team,progress);
    }
    if(progress.remaining>0){
      this.log(claimant,'contract',`${claimant.name}'s claim on "${contract.title}" advanced. ${progress.remaining} season(s) remain.`);
      return 'progress';
    }
    const competitors=participants.filter(guild=>guild.id!==claimant.id&&this.contractPosture(contract,guild)==='compete');
    if(competitors.length)return this.resolveContestedContract(contract,claimant,competitors);
    return this.resolveCooperativeContract(contract,claimant,participants);
  }
  ensureSharedContractProgress(contract){
    contract.sharedProgress=contract.sharedProgress||{remaining:contract.workSeasons||1,total:contract.workSeasons||1};
    return contract.sharedProgress;
  }
  contractParticipantGuilds(contract){
    return this.state.guilds.filter(guild=>this.placedTeam(guild,contract).length);
  }
  combinedContractTeam(contract,guilds){
    return guilds.flatMap(guild=>this.placedTeam(guild,contract));
  }
  contractContributionScore(guild,contract){
    const team=this.placedTeam(guild,contract);
    if(!team.length)return 0;
    return this.successChanceForTeam(guild,contract,team)+team.reduce((sum,worker)=>sum+Math.max(1,this.characterFit(worker,contract)),0)+team.length*8;
  }
  cooperativeSuccessChance(contract,claimant=this.contractClaimant(contract),participants=this.contractParticipantGuilds(contract)){
    if(!claimant)return null;
    const team=this.combinedContractTeam(contract,participants);
    if(!team.length)return null;
    return this.clamp(this.rawCooperativeSuccessChance(contract,claimant,participants,team),2,98);
  }
  rawCooperativeSuccessChance(contract,claimant,participants,team=this.combinedContractTeam(contract,participants)){
    const ownerRaw=this.rawSuccessChanceForTeam(claimant,contract,team);
    const allyBonus=participants.filter(guild=>guild.id!==claimant.id).reduce((sum,guild)=>{
      const resources=Math.min(guild.resources,contract.materials||0)*4;
      const connections=guild.connections;
      const readiness=this.contractReadinessBonus(guild,contract);
      return sum+resources+connections+readiness+this.cooperativeTraitBonus(guild,contract);
    },this.cooperativeTraitBonus(claimant,contract));
    return ownerRaw+allyBonus;
  }
  resolveCooperativeContract(contract,claimant,participants){
    const team=this.combinedContractTeam(contract,participants);
    const chance=this.cooperativeSuccessChance(contract,claimant,participants);
    const roll=Math.random()*100;
    if(roll<=chance||this.convertNearMiss(claimant,contract,team,roll,chance)){
      this.awardCooperativeContract(contract,claimant,participants,chance);
    }else{
      for(const guild of participants){
        guild.reputation=Math.max(0,guild.reputation-(guild.id===claimant.id?3:1));
        this.applyFailure(guild,contract);
      }
      this.log(claimant,'bad',`${claimant.name}'s cooperative push on "${contract.title}" failed at ${chance}% odds.`);
    }
    this.releaseAllContractPlacements(contract);
    return 'finished';
  }
  resolveContestedContract(contract,claimant,competitors){
    const contenders=[claimant,...competitors];
    const rolls=contenders.map(guild=>({guild,score:this.contractContributionScore(guild,contract)+this.contestTraitScore(guild,contract)+(guild.id===claimant.id?10:0)+Math.random()*50}));
    const winner=rolls.sort((a,b)=>b.score-a.score)[0].guild;
    const team=this.placedTeam(winner,contract);
    const chance=this.successChanceForTeam(winner,contract,team);
    const roll=Math.random()*100;
    if(roll<=chance||this.convertNearMiss(winner,contract,team,roll,chance)){
      this.awardPrimaryContract(contract,winner,chance,`won the contest for`);
      for(const guild of contenders.filter(g=>g.id!==winner.id))guild.reputation=Math.max(0,guild.reputation-1);
    }else{
      for(const guild of contenders)guild.reputation=Math.max(0,guild.reputation-(guild.id===winner.id?3:1));
      this.applyFailure(winner,contract);
      this.log(winner,'bad',`${winner.name} won the contest for "${contract.title}" but failed the work at ${chance}% odds.`);
    }
    this.releaseAllContractPlacements(contract);
    return 'finished';
  }
  awardPrimaryContract(contract,guild,chance,verb='completed'){
    const team=this.placedTeam(guild,contract);
    const materials=Math.min(guild.resources,contract.materials||0);
    const facilitySupport=this.facilitySupportTraitEffectScore(guild,contract,team,materials);
    guild.gold+=contract.reward.gold;
    guild.reputation+=contract.reward.reputation;
    guild.completed++;
    guild.poolWins=guild.poolWins||{};
    guild.poolWins[contract.pool]=(guild.poolWins[contract.pool]||0)+1;
    this.applyContractWorldEffect(contract);
    this.log(guild,'good',`${guild.name} ${verb} "${contract.title}" at ${chance}% odds. +${contract.reward.gold} gold, +${contract.reward.reputation} reputation.`);
    if(facilitySupport>0)this.log(guild,'good',`${guild.name}'s facility engine added ${facilitySupport}% support to "${contract.title}".`);
    this.applyContractSuccessTraitEffects(guild,contract,team);
  }
  awardCooperativeContract(contract,claimant,participants,chance){
    const weights=participants.map(guild=>({guild,score:Math.max(1,this.contractContributionScore(guild,contract))}));
    const total=weights.reduce((sum,row)=>sum+row.score,0)||1;
    for(const {guild,score} of weights){
      const share=score/total;
      const gold=Math.round(contract.reward.gold*share);
      const reputation=Math.round(contract.reward.reputation*share);
      guild.gold+=gold;
      guild.reputation+=reputation;
      if(guild.id===claimant.id){
        guild.completed++;
        guild.poolWins=guild.poolWins||{};
        guild.poolWins[contract.pool]=(guild.poolWins[contract.pool]||0)+1;
      }
      this.applyContractSuccessTraitEffects(guild,contract,this.placedTeam(guild,contract));
      this.log(guild,'good',`${guild.name} earned ${Math.round(share*100)}% of "${contract.title}". +${gold} gold, +${reputation} reputation.`);
    }
    this.applyContractWorldEffect(contract);
    this.log(claimant,'good',`${claimant.name}'s cooperative claim completed "${contract.title}" at ${chance}% odds.`);
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
    this.syncContractClaim(contract);
  }
  releaseAllContractPlacements(contract){
    for(const guild of this.state.guilds)this.releaseBoardPlacement(guild,contract);
    delete contract.sharedProgress;
    delete contract.claim;
  }
  rawSuccessChanceForTeam(guild,c,chars){const progress=this.contractProgress(guild,c);const materials=typeof progress?.materials==='number'?progress.materials:Math.min(guild.resources,c.materials||0);const score=chars.reduce((s,ch)=>s+this.characterTagScore(ch,c)+ch.resources*3+ch.connections*2-this.conditionPenalty(ch),0)+materials*10+guild.connections*2+this.contractTraitEffectScore(guild,c,chars,materials)+this.facilitySupportTraitEffectScore(guild,c,chars,materials)+this.contractReadinessBonus(guild,c);return Math.round(50+score-c.baseDifficulty);}
  contractReadiness(guild,contract){return contract?.readiness?.[guild.id]||{};}
  contractReadinessBonus(guild,contract){
    const readiness=this.contractReadiness(guild,contract);
    return (readiness.scouted||0)*5+(readiness.planned?10:0);
  }
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
  facilityTrainingSupportTraitEffects(guild,targetWorker,targetFacility){
    return guild.roster
      .filter(worker=>worker!==targetWorker&&worker.placement?.type==='facility'&&worker.placement.mode==='work'&&worker.placement.id!==targetFacility.key)
      .flatMap(worker=>{
        const facility=this.facilityDef(worker.placement.id);
        return this.workerTraitEffects(worker,'facilityTrainingSupport')
          .filter(effect=>this.effectMatchesContract(effect,null,{guild,worker,facility,mode:'work',targetWorker,targetFacility}))
          .map(effect=>({worker,facility,effect}));
      });
  }
  facilityTrainingSupportTraitEffectScore(guild,targetWorker,targetFacility){
    if(!guild||!targetWorker||!targetFacility)return 0;
    return this.facilityTrainingSupportTraitEffects(guild,targetWorker,targetFacility).reduce((score,{effect})=>{
      if(effect.type==='trainingAssist')return score+(effect.amount||0);
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
    if(effect.targetFacilities&&!effect.targetFacilities.includes(ctx.targetFacility?.key))return false;
    if(effect.targetHasAny&&(!ctx.targetWorker||!this.workerHasAny(ctx.targetWorker,effect.targetHasAny)))return false;
    if(effect.targetMissingAll&&(!ctx.targetWorker||effect.targetMissingAll.some(tag=>this.visibleTraits(ctx.targetWorker).includes(tag))))return false;
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
    const guildCount=this.state.guilds.length||1;
    if(this.state.seasonIndex===3){if(this.state.year===20){this.endGame();return;}this.state.year++;this.state.seasonIndex=0;this.state.starterIndex=(this.state.starterIndex+1)%guildCount;}else this.state.seasonIndex++;
    this.startSeason();
  }
  victoryGoals(){return this.data.contractParts.settings.victoryGoals||{gold:420,reputation:160,completed:45,resources:55,connections:45};}
  victoryLaneLabel(stat){return {gold:'Wealth',reputation:'Reputation',completed:'Contracts',resources:'Resources',connections:'Connections'}[stat]||stat;}
  checkVictory(){
    const goals=this.victoryGoals();
    const contenders=this.victoryContenders();
    const winner=contenders.flatMap(contender=>Object.entries(goals).map(([stat,target])=>({contender,stat,target,value:contender[stat]||0}))).filter(row=>row.value>=row.target).sort((a,b)=>(b.value/b.target)-(a.value/a.target))[0];
    if(!winner)return false;
    this.state.phase='gameOver';
    this.state.activeGuildId=null;
    this.log(null,'game',`${winner.contender.name} wins by ${this.victoryLaneLabel(winner.stat)}: ${winner.value}/${winner.target}.`);
    this.render();
    return true;
  }
  victoryContenders(){
    if(this.state.match?.mode!=='teams')return this.state.guilds;
    const teams=new Map();
    for(const guild of this.state.guilds){
      const key=guild.teamId||guild.id;
      const team=teams.get(key)||{id:key,name:`${key}`,gold:0,reputation:0,completed:0,resources:0,connections:0,guilds:[]};
      team.guilds.push(guild);
      for(const stat of ['gold','reputation','completed','resources','connections'])team[stat]+=guild[stat]||0;
      team.name=team.guilds.map(g=>g.name).join(' + ');
      teams.set(key,team);
    }
    return [...teams.values()];
  }
  endGame(){this.state.phase='gameOver';const ranked=[...this.victoryContenders()].sort((a,b)=>(b.reputation+b.completed+b.gold/10+b.resources+b.connections)-(a.reputation+a.completed+a.gold/10+a.resources+a.connections));this.log(null,'game',`${ranked[0].name} wins after twenty years. Tiebreak score uses all five guild lanes.`);this.render();}

  log(guild,type,summary){this.state.log.unshift({year:this.state.year,season:this.currentSeason(),guildId:guild?.id||null,type,summary});this.state.log.length=Math.min(this.state.log.length,80);}
  recordAiActivity(guild,type,summary,detail=''){
    if(!guild||this.isLocalGuild(guild))return;
    this.state.aiActivity=this.state.aiActivity||[];
    this.state.aiActivity.unshift({guildId:guild.id,guildName:guild.name,type,summary,detail,year:this.state.year,season:this.currentSeason()});
    this.state.aiActivity.length=Math.min(this.state.aiActivity.length,12);
  }
  aiVisualPause(){
    if(typeof window==='undefined'||this.isSimulation)return Promise.resolve();
    const wait=this.clamp(Math.round((this.aiTurnDelay()||0)*0.45),120,420);
    return new Promise(resolve=>setTimeout(resolve,wait));
  }

  render(){this.ui.date.textContent=`Year ${this.state.year} - ${this.currentSeason()}`;const active=this.state.guilds.find(g=>g.id===this.state.activeGuildId);const humanDraft=this.state.phase==='setup'&&this.isLocalGuild(active);const setupDraft=this.state.phase==='setup'&&active;const openingSplash=this.state.phase==='setup'&&this.openingSplashActive();const aiThinking=!openingSplash&&!this.menuOpen&&(this.state.phase==='aiTurn'||(this.state.phase==='setup'&&active&&this.isAiGuild(active)));this.ui.phase.textContent=this.state.phase==='setup'&&active?`${active.name} draft`:this.state.phase==='aiTurn'&&active?`${active.name} turn`:this.state.phase==='awaitHuman'&&active?`${active.name} turn`:this.state.phase;this.ui.advance.textContent=this.state.phase==='setup'?'Drafting':this.state.phase==='seasonComplete'?'Next Season':this.state.phase==='gameOver'?'Game Over':'Resolve Season';this.ui.advance.disabled=this.state.phase==='setup'||this.state.phase==='gameOver'||this.state.phase==='aiTurn';this.ui.tavernBtn.textContent=setupDraft?'World State':`Tavern (${this.state.tavern.length})`;this.ui.tavernBtn.classList.toggle('has-new',!setupDraft&&(this.state.tavernHasNew||humanDraft&&!this.state.tavernOpen));if(this.ui.aiThinking){this.ui.aiThinking.classList.toggle('closed',!aiThinking);if(aiThinking&&!this._aiThinkingEl){this._aiThinkingEl=this.ui.aiThinking;this._aiThinkingName=active?.name||'AI';this.setAiThinkingDetail('thinking...');}}this.renderGuilds();this.renderWorld();this.renderAiActivity();this.renderPeople();this.renderTavern();this.renderContracts();this.renderFacilities();this.ui.humanStatus.textContent=this.state.phase==='setup'?(this.isLocalGuild(active)?'Pick':'Watch'):this.state.phase==='awaitHuman'?'Drag':this.state.phase==='aiTurn'?'Watch':'';
    this.maybeContinueSetupDraft();
  }
  renderGuilds(){
    this.ui.guildGrid.innerHTML=this.state.guilds.map(g=>`<article class="guild-card ${this.isLocalGuild(g)?'human':''} ${g.id===this.state.activeGuildId?'acting':''}" role="button" tabindex="0" data-guild-id="${g.id}"><h3>${g.name}${this.isLocalGuild(g)?' - Local':''}</h3><div class="guild-identity">${this.guildIdentity(g).label}${this.teamLabel(g)}</div><div class="guild-score"><span><strong>${g.gold}</strong>Gold</span><span><strong>${g.reputation}</strong>Rep</span><span><strong>${g.completed}</strong>Done</span><span><strong>${g.resources}</strong>Res</span><span><strong>${g.connections}</strong>Conn</span></div></article>`).join('');
    this.ui.guildGrid.querySelectorAll('.guild-card').forEach(card=>{
      card.addEventListener('click',()=>this.openGuildPanel(card.dataset.guildId));
      card.addEventListener('keydown',evt=>{if(evt.key==='Enter'||evt.key===' '){evt.preventDefault();this.openGuildPanel(card.dataset.guildId);}});
    });
  }
  teamLabel(guild){return guild.teamId&&guild.teamId!==guild.id?` / ${this.escapeHtml(guild.teamId)}`:'';}
  victoryProgressText(guild){
    const goals=this.victoryGoals();
    return `Gold ${guild.gold}/${goals.gold}, Rep ${guild.reputation}/${goals.reputation}, Done ${guild.completed}/${goals.completed}, Res ${guild.resources}/${goals.resources}, Conn ${guild.connections}/${goals.connections}`;
  }
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
  renderWorld(){const world=this.state.world;this.ui.world.innerHTML=`<article class="world-card"><strong>World State</strong><span>${world.name}</span></article>`+this.data.contractParts.world.states.map(s=>{const value=world.values[s.key];const trend=world.trend[s.key]||0;const band=value<35?s.low:value>65?s.high:s.mid;const arrow=trend>3?'rising':trend<-3?'falling':'steady';return `<article class="world-card"><strong>${s.label}</strong><span>${band}, ${arrow}</span></article>`;}).join('');}
  renderAiActivity(){
    if(!this.ui.aiActivity)return;
    const entries=(this.state.aiActivity||[]).slice(0,5);
    this.ui.aiActivity.innerHTML=entries.length?entries.map(entry=>`<article class="ai-activity-item ${entry.type} ${entry.guildId===this.state.activeGuildId?'active':''}"><strong>${this.escapeHtml(entry.guildName)}</strong><span>${this.escapeHtml(entry.summary)}</span>${entry.detail?`<em>${this.escapeHtml(entry.detail)}</em>`:''}</article>`).join(''):'<article class="ai-activity-item empty-feed"><strong>Rivals</strong><span>No rival moves yet</span></article>';
  }
  renderPeople(){
    const human=this.activeLocalGuild();
    this.ui.peopleGrid.innerHTML=human.roster.map(c=>this.workerToken(c)).join('')||'<p class="empty">No workers.</p>';
    this.ui.recoveryGrid.innerHTML=Array.from({length:this.recoverySlotCount()},(_,i)=>this.recoverySlot(this.recoveryWorkers(human)[i])).join('');
    this.ui.peopleGrid.querySelectorAll('.merc-token').forEach(token=>{token.addEventListener('click',()=>this.openCharacterPanel(token.dataset.id));});
    this.bindDragSources();
    this.bindReturnDrop(this.ui.peopleGrid);
  }
  workerToken(c){const placed=Boolean(c.placement);const locked=this.isLockedPlacement(c);const conditions=(c.conditions||[]).map(x=>x.key).join(', ');return `<div class="merc-token ${placed?'assigned':''} ${locked?'locked':''} ${c.alive?'':'dead'}" role="button" tabindex="0" draggable="${c.alive&&this.state.phase==='awaitHuman'&&!this.state.humanActionUsed&&!locked?'true':'false'}" data-id="${c.id}"><strong>${this.workerInitials(c)}</strong><div class="token-meta">${c.name}</div><div class="token-meta">${c.archetype}${locked?' - committed':placed?' - placed':''}</div><div class="token-meta">${this.traitPreviewText(c)}</div>${conditions?`<div class="token-meta">${conditions}</div>`:''}</div>`;}
  renderDetail(){return;}
  guildInspectionHtml(guild){
    const identity=this.guildIdentity(guild);
    const roster=guild.roster.map(c=>this.guildRosterRow(c,guild)).join('')||'<p class="empty">No hired mercenaries.</p>';
    const profile=guild.personality?.label?`<span>${this.escapeHtml(guild.personality.label)} AI</span>`:'';
    return `<article class="game-card guild-inspection"><div class="guild-inspection-summary"><span><strong>${guild.gold}</strong>Gold</span><span><strong>${guild.reputation}</strong>Rep</span><span><strong>${guild.completed}</strong>Done</span><span><strong>${guild.resources}</strong>Resources</span><span><strong>${guild.connections}</strong>Connections</span></div><p class="victory-progress">${this.escapeHtml(this.victoryProgressText(guild))}</p><div class="guild-inspection-meta"><span>${this.escapeHtml(identity.label)}</span>${profile}<span>${this.activeWorkers(guild).length}/${guild.roster.length} active</span></div><div class="guild-roster-list">${roster}</div></article>`;
  }
  guildRosterRow(c,guild){
    const s=this.getStatus(c.status);
    const conditions=(c.conditions||[]).map(condition=>condition.key).join(', ');
    return `<div class="guild-roster-row ${c.alive?'':'dead'}" role="button" tabindex="0" data-inspect-character="${c.id}"><div><strong>${this.escapeHtml(c.name)}</strong><p>${this.escapeHtml(c.archetype)} - ${this.escapeHtml(s.name)}</p><div class="guild-row-traits">${c.traits.map(t=>this.tagHtml(t)).join('')}</div>${conditions?`<p class="guild-roster-conditions">${this.escapeHtml(conditions)}</p>`:''}</div><span class="guild-roster-status">${this.escapeHtml(this.workerPlacementText(c,guild))}</span></div>`;
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
  characterCard(c,{showHistory=false,showAllTraits=false,guild=null}={}){
    const s=this.getStatus(c.status);
    const owner=guild?`<p class="archetype">${this.escapeHtml(guild.name)}</p>`:'';
    const status=guild?this.workerPlacementText(c,guild):c.alive?(this.isPlaced(c)?'Placed':'Available'):'Dead';
    const conditions=(c.conditions||[]).map(condition=>this.conditionHtml(condition)).join('');
    return `<article class="game-card character-card"><div class="card-header"><div><h3>${c.name}</h3><p class="archetype">${this.termLink(c.archetype)}</p>${owner}</div><button class="status-badge glossary-term" type="button" data-glossary-term="${this.escapeAttr(s.name)}">${this.escapeHtml(s.name)}</button></div><div class="traits">${this.renderTraitChips(c,showAllTraits)}</div>${conditions?`<div class="conditions">${conditions}</div>`:''}<dl class="stats"><dt>Recruit cost</dt><dd>${this.baseRecruitCost(c)}</dd><dt>Annual salary</dt><dd>${this.characterSalary(c)}</dd><dt>Reputation required</dt><dd>${this.reputationRequirement(c)}</dd><dt>Resources</dt><dd>${c.resources}</dd><dt>Connections</dt><dd>${c.connections}</dd><dt>Status</dt><dd>${this.escapeHtml(status)}</dd></dl>${this.dismissalHtml(c,guild)}${this.characterEngineHtml(c,showAllTraits)}${showHistory?`<p class="history">${c.history.slice(-3).join(' ')||'No history yet.'}</p>`:''}</article>`;
  }
  dismissalHtml(c,guild){
    if(!this.isLocalGuild(guild)||!c.alive)return '';
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
    const labels={contractScore:'Contract odds',contractSuccess:'On success',contractFailure:'On failure',contractProgress:'Long work',contractClaim:'Claim control',contractContest:'Contract contest',contractCooperation:'Cooperation',facilityResolve:'Facility placement',facilitySupport:'Facility support',facilityTrainingSupport:'Training support',facilityWork:'Training',conditionAdded:'When condition lands',death:'On death',recruitCost:'Recruiting'};
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
      contractClaim:'Claim control',
      contractContest:'Contract contest',
      contractCooperation:'Contract cooperation',
      facilityResolve:'Facility resolve',
      facilitySupport:'Facility support',
      facilityTrainingSupport:'Training support',
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
    if(effect.targetFacilities)clauses.push(`target facility: ${this.formatList(effect.targetFacilities.map(key=>this.facilityDef(key)?.label||key))}`);
    if(effect.targetHasAny)clauses.push(`target worker has ${this.formatList(effect.targetHasAny)}`);
    if(effect.targetMissingAll)clauses.push(`target worker lacks ${this.formatList(effect.targetMissingAll)}`);
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
    if(effect.type==='blockCompetition')return 'block rival competition drops against this claim';
    if(effect.type==='forceCooperation')return 'turn rival competition drops into cooperation';
    if(effect.type==='competitionCost')return `${amount>=0?'+':''}${amount} reputation cost to compete`;
    if(effect.type==='contestScore')return `+${amount} contest score`;
    if(effect.type==='cooperativeChance')return `+${amount}% shared cooperative project chance`;
    if(effect.type==='bypassCompetitionBlock')return 'ignore one competition-blocking claim rule';
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
    const humanDraft=setupDraft&&this.isLocalGuild(setupGuild);
    const openingSplash=setupDraft&&this.openingSplashActive();
    const isOpen=this.state.phase==='setup'?Boolean(setupGuild):this.state.tavernOpen;
    this.ui.tavernPanel.classList.toggle('closed',!isOpen);
    this.ui.tavernPanel.classList.remove('setup-draft');
    this.ui.tavernClose.style.visibility=setupDraft?'hidden':'visible';
    this.ui.tavernClose.textContent='Close';
    this.ui.tavernEyebrow.textContent=setupDraft?'World State':'Tavern';
    this.ui.tavernTitle.textContent=setupDraft?'Founder Draft Begins':'Available Recruits';
    if(setupDraft){
      if(humanDraft&&this._humanDraftGuardIndex!==this.state.setupDraftIndex){
        this._humanDraftGuardIndex=this.state.setupDraftIndex;
        this._humanDraftClickReadyAt=performance.now()+250;
      }
      if(openingSplash)this.scheduleOpeningSplashResume();
      const intro=this.openingWorldIntroHtml(this.openingSplashViewGuild());
      this.ui.recruitGrid.innerHTML=intro+(this.state.tavern.map(c=>{const s=this.getStatus(c.status);return `<div class="merc-token founder-token ${this.isLocalGuild(setupGuild)?'':'locked'}" role="button" tabindex="0" data-id="${c.id}"><strong>${c.name}</strong><div class="token-meta">${c.archetype} - ${s.name}</div><div class="token-meta">${c.traits.join(', ')}</div><div class="token-meta">Upkeep: ${this.characterSalary(c)}g/year</div><div class="token-meta">${this.isLocalGuild(setupGuild)?'Draft founder':'Available'}</div></div>`;}).join('')||'<p class="empty">The tavern is empty.</p>');
      if(this.isLocalGuild(setupGuild))this.ui.recruitGrid.querySelectorAll('.founder-token').forEach(b=>b.addEventListener('click',evt=>{this.state.tavernHasNew=false;this.draftFounder(b.dataset.id,evt);}));
      return;
    }
    const human=this.activeLocalGuild();
    this.ui.recruitGrid.innerHTML=(this.state.tavern.map(c=>{
      const s=this.getStatus(c.status);
      const cost=this.recruitCost(human,c);
      const required=this.reputationRequirement(c);
      const blocked=this.recruitBlockReason(human,c);
      const status=blocked||'Hire recruit';
      return `<div class="merc-token recruit-token ${blocked?'dead':''}" role="button" tabindex="0" data-id="${c.id}"><strong>${c.name}</strong><div class="token-meta">${c.archetype} - ${cost}g hire</div><div class="token-meta">${this.traitPreviewText(c)}</div><div class="token-meta">Upkeep: ${this.characterSalary(c)}g/year</div>${required?`<div class="token-meta">Requires ${required} rep</div>`:''}<div class="token-meta">${this.escapeHtml(status)}</div></div>`;
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
    return this.visibleTraits(c).map(t=>this.tagHtml(t)).join('')+Array.from({length:this.hiddenTraitCount(c)},()=>`<span class="trait unknown-trait">?</span>`).join('');
  }
  tagHtml(tag){return this.termLink(tag,'trait');}
  conditionHtml(condition){return `<button class="condition glossary-term" type="button" data-glossary-term="${this.escapeAttr(condition.key)}">${this.escapeHtml(condition.key)}${condition.remaining===null?'':` ${condition.remaining}`}</button>`;}
  contractTagHtml(req,kind){return `<button class="glossary-term contract-tag-term" type="button" data-glossary-term="${this.escapeAttr(req.trait)}" data-glossary-weight="${this.explicitTagWeight(req,kind)}">${this.escapeHtml(req.trait)}</button>`;}
  workerEngineSummary(worker){
    const effects=this.visibleTraits(worker).flatMap(trait=>this.data.characterParts.traitEffects?.[trait]||[]);
    if(!effects.length)return '';
    return `${worker.name}: ${this.visibleTraits(worker).filter(trait=>this.data.characterParts.traitEffects?.[trait]?.length).slice(0,2).join(' + ')}`;
  }
  contractOddsBreakdown(guild,contract,team){
    if(!team.length)return `Odds preview\nNo free mercenary team is available for this contract. Workers already committed to multi-season contracts cannot be reassigned.`;
    const progress=this.contractProgress(guild,contract);
    const materials=typeof progress?.materials==='number'?progress.materials:Math.min(guild.resources,contract.materials||0);
    const traitBonus=this.contractTraitEffectScore(guild,contract,team,materials);
    const facilityBonus=this.facilitySupportTraitEffectScore(guild,contract,team,materials);
    const readinessBonus=this.contractReadinessBonus(guild,contract);
    const workerLines=team.map(worker=>{
      const tags=this.characterTagScore(worker,contract);
      const stats=worker.resources*3+worker.connections*2;
      const penalty=this.conditionPenalty(worker);
      return `${worker.name}: +${tags}% tags, +${stats}% resources/connections${penalty?`, -${penalty}% conditions`:''}`;
    });
    const raw=this.rawSuccessChanceForTeam(guild,contract,team);
    return `Odds preview: ${this.successChanceForTeam(guild,contract,team)}% (${raw}% raw)\nTeam: ${team.map(worker=>worker.name).join(', ')}\nBase: 50%, Difficulty: -${contract.baseDifficulty}%\n${workerLines.join('\n')}\nGuild Connections: +${guild.connections*2}%\nResource capacity: +${materials*10}% (${materials}/${contract.materials||0}, not spent)\nReadiness marks: +${readinessBonus}%${this.contractReadinessText(guild,contract)?` (${this.contractReadinessText(guild,contract)})`:''}\nTrait engine rules: +${traitBonus}%\nFacility support: +${facilityBonus}%`;
  }
  cooperativeOddsBreakdown(contract){
    const claimant=this.contractClaimant(contract);
    const allParticipants=this.contractParticipantGuilds(contract);
    if(allParticipants.some(guild=>guild.id!==claimant?.id&&this.contractPosture(contract,guild)==='compete'))return '';
    const participants=allParticipants.filter(guild=>this.contractPosture(contract,guild)!=='compete');
    if(!claimant||!participants.length)return '';
    const team=this.combinedContractTeam(contract,participants);
    const raw=this.rawCooperativeSuccessChance(contract,claimant,participants,team);
    const allyLines=participants.filter(guild=>guild.id!==claimant.id).map(guild=>{
      const resources=Math.min(guild.resources,contract.materials||0)*4;
      const connections=guild.connections;
      const readiness=this.contractReadinessBonus(guild,contract);
      return `${guild.name}: +${resources}% resources, +${connections}% connections, +${readiness}% readiness`;
    });
    return `Cooperative project odds: ${this.cooperativeSuccessChance(contract,claimant,participants)}% (${raw}% raw)\nClaimant: ${claimant.name}\nTeam: ${team.map(worker=>worker.name).join(', ')}\n${allyLines.join('\n')||'No allied guild modifiers.'}`;
  }
  contractDisplayChance(contract,guild){
    const participants=this.contractParticipantGuilds(contract);
    const competitors=participants.filter(participant=>participant.id!==this.contractClaimant(contract)?.id&&this.contractPosture(contract,participant)==='compete');
    if(participants.length>1&&!competitors.length)return this.cooperativeSuccessChance(contract,this.contractClaimant(contract),participants);
    const placed=this.placedTeam(guild,contract);
    return placed.length?this.successChanceForTeam(guild,contract,placed):null;
  }
  worldLabel(key){return this.data.contractParts.world.states.find(s=>s.key===key)?.label||key;}
  renderContracts(){const human=this.activeLocalGuild();this.ui.contractGrid.innerHTML=this.state.boardContracts.map(c=>this.contractTile(c,human)).join('');this.bindContractButtons();this.bindDropSlots();}
  bindContractFocusButtons(){
    this.bindContractButtons();
  }
  bindContractButtons(){
    this.ui.contractGrid.querySelectorAll('[data-focus-contract]').forEach(btn=>btn.addEventListener('click',evt=>{
      evt.stopPropagation();
      this.state.focusContractId=this.state.focusContractId===btn.dataset.focusContract?null:btn.dataset.focusContract;
      this.render();
    }));
    this.ui.contractGrid.querySelectorAll('[data-open-contract]').forEach(btn=>btn.addEventListener('click',evt=>{
      evt.stopPropagation();
      this.openContractPanel(btn.dataset.openContract);
    }));
  }
  contractTile(c,human){
    const placed=this.placedTeam(human,c);
    const chance=this.contractDisplayChance(c,human);
    const preview=chance===null?'No team':`${chance}%`;
    const readiness=this.contractReadinessCompactHtml(human,c);
    const focused=this.state.focusContractId===c.instanceId;
    return `<article class="contract-tile ${focused?'focused-contract':''}" style="${this.contractAccentStyle(c)}"><div class="contract-top"><button class="contract-title-btn" type="button" data-open-contract="${c.instanceId}">${this.escapeHtml(c.title)}</button><button class="risk-badge glossary-term" type="button" data-glossary-term="${this.escapeAttr(c.risk)}">${this.escapeHtml(c.risk)}</button></div><div class="contract-subline"><span>${this.escapeHtml(c.type)}</span><span>${this.escapeHtml(this.contractWorkLabel(c,human))}</span><span>${c.reward.gold}g/${c.reward.reputation}r</span></div>${this.contractClaimStripHtml(c)}${readiness}${this.contractSlotTrayHtml(c,human)}<div class="contract-actions"><button class="focus-contract-btn ${focused?'active':''}" type="button" data-focus-contract="${c.instanceId}">${focused?'Focused':'Focus'}</button><button class="contract-detail-action" type="button" data-open-contract="${c.instanceId}">Info</button><span class="contract-preview">${this.escapeHtml(preview)}</span></div></article>`;
  }
  contractClaimStripHtml(contract){
    const claimant=this.contractClaimant(contract);
    if(!claimant)return '';
    const competitors=this.state.guilds.filter(g=>g.id!==claimant.id&&this.placedTeam(g,contract).length&&this.contractPosture(contract,g)==='compete');
    const cooperators=this.state.guilds.filter(g=>g.id!==claimant.id&&this.placedTeam(g,contract).length&&this.contractPosture(contract,g)!=='compete');
    const parts=[`Claim: ${claimant.name}`];
    if(cooperators.length)parts.push(`Coop: ${cooperators.map(g=>g.name).join(', ')}`);
    if(competitors.length)parts.push(`Contest: ${competitors.map(g=>g.name).join(', ')}`);
    return `<div class="contract-claim-strip">${parts.map(part=>`<span>${this.escapeHtml(part)}</span>`).join('')}</div>`;
  }
  contractInspectionHtml(contract,guild){
    const placed=this.placedTeam(guild,contract);
    const chance=this.contractDisplayChance(contract,guild);
    const needs=contract.requirements.map(r=>this.contractTagHtml(r,'primary')).join(', ')||'None';
    const helps=contract.support.map(r=>this.contractTagHtml(r,'support')).join(', ')||'None';
    const readiness=this.contractReadinessHtml(guild,contract);
    const cooperativeOdds=this.cooperativeOddsBreakdown(contract);
    const odds=cooperativeOdds?this.escapeHtml(cooperativeOdds).replace(/\n/g,'<br>'):placed.length?this.escapeHtml(this.contractOddsBreakdown(guild,contract,placed)).replace(/\n/g,'<br>'):'Assign mercs to preview success odds.';
    const rivals=this.rivalContractRosterHtml(contract);
    return `<article class="game-card contract-inspection"><p class="contract-detail-note">${this.escapeHtml(this.contractDescriptionText(contract))}</p><div class="contract-detail-grid"><span><strong>Odds</strong>${chance===null?'No team':`${chance}%`}</span><span><strong>Work</strong>${this.escapeHtml(this.contractWorkLabel(contract,guild))}</span><span><strong>Reward</strong>${contract.reward.gold}g / ${contract.reward.reputation}r</span><span><strong>Resources</strong>${contract.materials||0}</span><span><strong>Offer</strong>${this.escapeHtml(this.contractOfferLabel(contract))}</span></div><section class="contract-detail-tags"><h4>Needs</h4><p>${needs}</p><h4>Helps</h4><p>${helps}</p><h4>Readiness</h4>${readiness}</section><section class="engine-rules"><h4>Odds Preview</h4><p>${odds}</p></section>${rivals?`<section class="contract-detail-rivals"><h4>Rivals</h4>${rivals}</section>`:''}</article>`;
  }
  contractHeaderParts(contract){
    const patron=contract.patron?.name||'';
    let title=contract.workTitle||contract.title||'Contract';
    let prefix=contract.titlePrefix||'Contract';
    if(!contract.workTitle&&patron&&title.endsWith(` for ${patron}`))title=title.slice(0,-` for ${patron}`.length);
    if(!contract.titlePrefix){
      const twist=(this.data.contractParts.twists||[])
        .map(t=>t.label?.trim())
        .filter(Boolean)
        .sort((a,b)=>b.length-a.length)
        .find(label=>title.startsWith(`${label} `));
      if(twist){
        prefix=twist;
        title=title.slice(twist.length).trim();
      }
    }
    return {prefix,title,patron};
  }
  contractDescriptionText(contract){
    const patron=contract.patron?.name;
    if(!patron)return contract.description;
    return contract.description.replace(` Patron: ${patron}.`,'').replace(/\s+/g,' ').trim();
  }
  contractReadinessText(guild,contract){
    const readiness=this.contractReadiness(guild,contract);
    const parts=[];
    if(readiness.scouted)parts.push(`Scouted +${readiness.scouted*5}%`);
    if(readiness.planned)parts.push('Planned +10%');
    return parts.join(', ');
  }
  contractReadinessHtml(guild,contract){
    const text=this.contractReadinessText(guild,contract);
    return `<div class="readiness-row">${text?text.split(', ').map(part=>`<span class="readiness-mark">${this.escapeHtml(part)}</span>`).join(''):'<span class="readiness-empty">No readiness marks</span>'}</div>`;
  }
  contractReadinessCompactHtml(guild,contract){
    const text=this.contractReadinessText(guild,contract);
    return text?`<div class="contract-readiness-strip">${text.split(', ').map(part=>`<span class="readiness-mark">${this.escapeHtml(part)}</span>`).join('')}</div>`:'';
  }
  contractSlotTrayHtml(contract,guild){
    const occupants=this.contractSlotOccupants(contract,guild).slice(0,this.contractSharedSlotLimit());
    const canDrop=contract.offerSeasons>0&&!contract.sharedProgress&&!this.contractProgress(guild,contract);
    const slots=occupants.map(occupant=>this.contractOccupiedSlot(contract,occupant,guild));
    while(slots.length<this.contractSharedSlotLimit())slots.push(this.contractEmptySlot(contract,canDrop));
    return `<div class="contract-slot-tray">${slots.join('')}</div>`;
  }
  contractOccupiedSlot(contract,{guild,worker},viewer=this.activeLocalGuild()){
    const local=guild?.id===viewer?.id;
    const locked=!local||this.contractProgress(guild,contract);
    const posture=this.contractPosture(contract,guild);
    const challenge=!local&&contract.offerSeasons>0&&!contract.sharedProgress&&!this.contractProgress(viewer,contract)&&!this.contractProgress(guild,contract);
    return `<div class="worker-slot contract-slot ${local?'local-slot':'rival-slot'} ${posture==='compete'?'compete-slot':posture==='cooperate'?'cooperate-slot':''} ${locked?'locked':''}" ${local&&!locked?`data-drop-type="contract" data-target="${contract.instanceId}" data-mode="cooperate"`:challenge?`data-drop-type="contract" data-target="${contract.instanceId}" data-mode="compete"`:''}>${this.slotWorkerHtml(worker,this.workerInitials(worker),locked)}</div>`;
  }
  contractEmptySlot(contract,droppable){
    return `<div class="worker-slot contract-slot empty-slot" ${droppable?`data-drop-type="contract" data-target="${contract.instanceId}" data-mode="cooperate"`:''}></div>`;
  }
  rivalContractRosterHtml(contract){
    const viewer=this.activeLocalGuild();
    const rows=this.state.guilds.filter(g=>g.id!==viewer?.id).map(g=>{
      const team=this.placedTeam(g,contract);
      if(!team.length)return '';
      const progress=this.contractProgress(g,contract);
      const odds=this.successChanceForTeam(g,contract,team);
      const tokens=team.map(worker=>`<span class="rival-merc-token">${this.workerInitials(worker)}</span>`).join('');
      return `<div class="rival-contract-row"><span class="rival-guild-name">${this.escapeHtml(g.name)}</span><div class="rival-token-row">${tokens}</div><span class="rival-odds">${odds}%${progress?` ${progress.remaining}/${progress.total}`:''}</span></div>`;
    }).filter(Boolean);
    return rows.length?`<div class="rival-contract-roster">${rows.join('')}</div>`:'';
  }
  contractMetaHtml(contract,guild){
    const resource=contract.materials?`<span class="contract-chip">${contract.materials} Res</span>`:'';
    return `<div class="contract-meta"><button class="risk-badge glossary-term" type="button" data-glossary-term="${this.escapeAttr(contract.risk)}">${this.escapeHtml(contract.risk)}</button><span class="contract-chip">${this.contractWorkLabel(contract,guild)}</span>${resource}</div>`;
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
  workerSlot(contract,worker,guild=this.activeLocalGuild(),index=0){
    const locked=this.contractProgress(guild,contract);
    const closed=contract.offerSeasons<=0&&!worker&&!locked;
    return `<div class="worker-slot ${locked?'locked':''}" data-drop-type="contract" data-target="${contract.instanceId}">${worker?this.slotWorkerHtml(worker,this.workerInitials(worker),locked):closed?'':''}</div>`;
  }
  recoverySlot(worker){
    return `<div class="worker-slot recovery-slot" data-drop-type="recovery">${worker?this.slotWorkerHtml(worker,this.workerInitials(worker),false):''}</div>`;
  }
  renderFacilities(){const human=this.activeLocalGuild();this.ui.facilityGrid.innerHTML=this.data.contractParts.facilities.map(f=>this.facilityTile(f,human)).join('');this.bindDropSlots();}
  facilityTile(f,guild){
    const workers=this.facilityWorkers(guild,f.key,'work');
    return `<article class="facility-tile"><div class="facility-top"><button class="facility-title-btn" type="button" data-glossary-term="${this.escapeAttr(f.key)}">${this.escapeHtml(f.label)}</button><span class="facility-ready-count">${this.facilityReadyLabel(guild,f)}</span></div><div class="slot-row facility-slot-tray">${Array.from({length:f.slots},(_,i)=>this.facilitySlot(f,workers[i])).join('')}</div></article>`;
  }
  facilitySlot(f,worker){return `<div class="worker-slot facility-slot" data-drop-type="facility" data-target="${f.key}">${worker?this.slotWorkerHtml(worker,this.workerInitials(worker),false):''}</div>`;}
  slotWorkerHtml(worker,label,locked=false){
    const draggable=worker.alive&&this.state.phase==='awaitHuman'&&!this.state.humanActionUsed&&!locked;
    return `<span class="slot-worker" ${draggable?`draggable="true" data-id="${worker.id}"`:''}>${label}</span>`;
  }
  workerInitials(worker){return worker.name.split(' ').map(x=>x[0]).join('').slice(0,2);}
  bindDragSources(){document.querySelectorAll('[draggable="true"][data-id]').forEach(el=>{el.addEventListener('dragstart',evt=>{evt.dataTransfer.setData('text/plain',el.dataset.id);evt.dataTransfer.effectAllowed='move';});});}
  bindReturnDrop(el){if(!el)return;el.classList.add('return-drop');el.ondragover=evt=>{if(this.state.phase!=='awaitHuman'||this.state.humanActionUsed)return;evt.preventDefault();el.classList.add('over');};el.ondragleave=()=>el.classList.remove('over');el.ondrop=evt=>{evt.preventDefault();el.classList.remove('over');const id=evt.dataTransfer.getData('text/plain');this.returnWorker(id);};}
  bindDropSlots(){this.bindDragSources();this.bindReturnDrop(this.ui.peopleGrid);document.querySelectorAll('.worker-slot[data-drop-type]').forEach(slot=>{slot.addEventListener('dragover',evt=>{evt.preventDefault();slot.classList.add('over');});slot.addEventListener('dragleave',()=>slot.classList.remove('over'));slot.addEventListener('drop',evt=>{evt.preventDefault();slot.classList.remove('over');const id=evt.dataTransfer.getData('text/plain');this.placeWorker(id,slot.dataset.target,slot.dataset.dropType,slot.dataset.mode||'work');});});}
  facilityReadyHtml(guild,facility){
    const ready=this.facilityReadyCount(guild,facility.key);
    return `<div class="facility-ready-row">${ready?Array.from({length:ready},()=>`<span class="facility-ready-mark">Ready</span>`).join(''):'<span class="facility-ready-empty">Not ready</span>'}</div>`;
  }
  facilityReadyLabel(guild,facility){
    const ready=this.facilityReadyCount(guild,facility.key);
    return ready?`Ready ${ready}`:'Not ready';
  }
}
