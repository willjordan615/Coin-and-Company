export function createAiSim(GameClass){
  const now = (typeof performance !== 'undefined') ? (()=>performance.now()) : (()=>Date.now());

  function scoreGuild(gcopy){
    return (gcopy.reputation||0) + (gcopy.completed||0) + ((gcopy.gold||0)/10);
  }

  function applyAction(sim, guildId, action){
    const gcopy = sim.state.guilds.find(x=>x.id===guildId);
    if(!gcopy) return null;
    if(action.type==='recruit'){
      const candidate = sim.state.tavern.find(x=>x.id===action.candidateId) || sim.state.tavern.find(x=>x.name===action.candidateName);
      if(!candidate) return gcopy;
      if(sim.state.phase==='setup' && sim.draftFounderForGuild) sim.draftFounderForGuild(gcopy,candidate);
      else if(sim.hire) sim.hire(gcopy,candidate,false);
      return gcopy;
    }
    if(action.type==='placement'){
      const contractCopy = sim.state.boardContracts.find(x=>x.instanceId===action.contractId);
      if(!contractCopy) return gcopy;
      contractCopy.placements = contractCopy.placements || {};
      const list = contractCopy.placements[gcopy.id] || [];
      for(const w of action.addIds){
        const wcopy = gcopy.roster.find(x=>x.id===w);
        if(wcopy) list.push(wcopy.id);
      }
      contractCopy.placements[gcopy.id] = list;
      return gcopy;
    }
    if(action.type==='facility'){
      const wcopy = gcopy.roster.find(x=>x.id===action.workerId);
      if(!wcopy) return gcopy;
      wcopy.placement = {type:'facility', id:action.facilityKey, mode:'work'};
      return gcopy;
    }
    if(action.type==='rest'){
      if(sim.restGuild) sim.restGuild(gcopy);
      return gcopy;
    }
    return gcopy;
  }

  function runSingleTrial(payload){
    const {data, state, guildId, action, seasons} = payload;
    const sim = new GameClass();
    sim.isSimulation = true;
    sim.render = ()=>{};
    sim.bindDropSlots = ()=>{};
    sim.openTraitChoice = ()=>{};
    sim.data = structuredClone(data);
    sim.state = structuredClone(state);
    if(sim.rehydrateLoadedState) sim.rehydrateLoadedState();
    sim.state.guilds.forEach(g=>g.human=false);
    const gcopy = applyAction(sim, guildId, action);
    // simulate forward
    for(let s=0;s<seasons;s++){
      if(sim.state.phase==='awaitHuman' || sim.state.phase==='seasonStart'){
        for(const g of sim.snakeGuildOrder().filter(x=>!x.human)){
          if(sim.aiTurn) sim.aiTurn(g);
        }
      }
      if(sim.state.phase==='seasonComplete' && sim.nextSeason) sim.nextSeason();
      if(sim.state.phase==='gameOver') break;
    }
    return scoreGuild(gcopy);
  }

  return {
    runSingleTrial
  };
}
