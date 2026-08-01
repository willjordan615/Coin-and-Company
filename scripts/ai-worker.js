import { parentPort } from 'worker_threads';
import { Game } from '../engine/game.js';
import { createAiSim } from '../engine/ai-sim.js';

const aiSim = createAiSim(Game);

parentPort.on('message', async (msg) => {
  const { taskId, payload, sabFlag, sabResult } = msg;
  try {
    const start = Date.now();
    const score = aiSim.runSingleTrial(payload);
    // write result into shared buffers
    if(sabResult){
      const resultView = new Float64Array(sabResult);
      resultView[0] = Number(score) || 0;
    }
    if(sabFlag){
      const flagView = new Int32Array(sabFlag);
      Atomics.store(flagView, 0, 1);
      Atomics.notify(flagView, 0, 1);
    }
    parentPort.postMessage({ taskId, ok: true, durationMs: Date.now() - start });
  } catch (e) {
    if(sabFlag){
      const flagView = new Int32Array(sabFlag);
      Atomics.store(flagView, 0, 1);
      Atomics.notify(flagView, 0, 1);
    }
    parentPort.postMessage({ taskId, ok: false, error: String(e) });
  }
});
