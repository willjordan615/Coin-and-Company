import { createAiSim } from './ai-sim.js';
import { Game } from './game.js';

const aiSim = createAiSim(Game);
self.addEventListener('message', (ev)=>{
  const msg = ev.data;
  const { id, kind, payload } = msg;
  try{
    if(kind==='recruit'){
      const { candidates, trials, seasons, data, state, guildId } = payload;
      const totals = new Map();
      for(const c of candidates) totals.set(c.id, 0);
      for(const c of candidates){
        for(let t=0;t<trials;t++){
          const score = aiSim.runSingleTrial({data, state, guildId, action:{type:'recruit', candidateId:c.id, candidateName:c.name}, seasons});
          totals.set(c.id, (totals.get(c.id)||0)+score);
        }
      }
      let best=null, bestAvg=-Infinity;
      for(const c of candidates){ const total=totals.get(c.id)||0; const avg = total/trials; if(avg>bestAvg){bestAvg=avg; best=c.id;} }
      self.postMessage({ id, ok:true, result:{bestId:best, bestAvg} });
    } else if(kind==='placement'){
      const { options, trials, seasons, data, state, guildId } = payload;
      const totals = new Map();
      for(const o of options) totals.set(o.contractId, 0);
      for(const o of options){
        for(let t=0;t<trials;t++){
          const score = aiSim.runSingleTrial({data, state, guildId, action:{type:'placement', contractId:o.contractId, addIds:o.addIds}, seasons});
          totals.set(o.contractId, (totals.get(o.contractId)||0)+score);
        }
      }
      let best=null, bestAvg=-Infinity;
      for(const o of options){ const total=totals.get(o.contractId)||0; const avg=total/trials; if(avg>bestAvg){bestAvg=avg; best=o.contractId;} }
      self.postMessage({ id, ok:true, result:{bestContractId:best, bestAvg} });
    } else if(kind==='facility'){
      const { candidates, trials, seasons, data, state, guildId } = payload;
      const totals = new Map();
      for(const c of candidates) totals.set(`${c.workerId}-${c.facilityKey}`, 0);
      for(const c of candidates){
        for(let t=0;t<trials;t++){
          const score = aiSim.runSingleTrial({data, state, guildId, action:{type:'facility', workerId:c.workerId, facilityKey:c.facilityKey}, seasons});
          totals.set(`${c.workerId}-${c.facilityKey}`, (totals.get(`${c.workerId}-${c.facilityKey}`)||0)+score);
        }
      }
      let best=null, bestAvg=-Infinity;
      for(const c of candidates){ const total=totals.get(`${c.workerId}-${c.facilityKey}`)||0; const avg=total/trials; if(avg>bestAvg){bestAvg=avg; best={workerId:c.workerId, facilityKey:c.facilityKey};} }
      self.postMessage({ id, ok:true, result:{best, bestAvg} });
    } else if(kind==='rest'){
      const { trials, seasons, data, state, guildId } = payload;
      let restTotal=0, contTotal=0;
      for(let t=0;t<trials;t++){
        const restScore = aiSim.runSingleTrial({data, state, guildId, action:{type:'rest'}, seasons});
        const contScore = aiSim.runSingleTrial({data, state, guildId, action:{type:'none'}, seasons});
        restTotal += restScore; contTotal += contScore;
      }
      const restAvg = restTotal/trials; const contAvg = contTotal/trials;
      self.postMessage({ id, ok:true, result:{restAvg, contAvg, chooseRest: restAvg>contAvg} });
    } else {
      self.postMessage({ id, ok:false, error:'unknown kind' });
    }
  }catch(e){
    self.postMessage({ id, ok:false, error: String(e) });
  }
});
