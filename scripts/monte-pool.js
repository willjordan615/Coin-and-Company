import os from 'os';
import { Worker } from 'worker_threads';

class MontePool {
  constructor(numWorkers){
    this.numWorkers = numWorkers || Math.max(1, os.cpus().length - 1);
    this.workers = [];
    this.next = 0;
    this.taskCounter = 0;
    for(let i=0;i<this.numWorkers;i++){
      const w = new Worker(new URL('./ai-worker.js', import.meta.url));
      w.on('error', err => console.error('MontePool worker error', err));
      this.workers.push(w);
    }
  }

  // run task synchronously by using SharedArrayBuffer and Atomics.wait
  runTaskSync(payload, timeoutMs=5000){
    const worker = this.workers[this.next];
    this.next = (this.next+1)%this.workers.length;
    const taskId = String(++this.taskCounter);
    // shared buffers: Int32 flag and Float64 result
    const sabFlag = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
    const sabResult = new SharedArrayBuffer(Float64Array.BYTES_PER_ELEMENT);
    const flagView = new Int32Array(sabFlag);
    const resultView = new Float64Array(sabResult);
    flagView[0] = 0;
    // send task
    worker.postMessage({ taskId, payload, sabFlag, sabResult });
    // block until worker sets flag or timeout
    const res = Atomics.wait(flagView, 0, 0, timeoutMs);
    if(res === 'timed-out'){
      return { ok: false, timedOut: true, result: null };
    }
    return { ok: true, timedOut: false, result: resultView[0] };
  }

  destroy(){
    for(const w of this.workers) w.terminate();
    this.workers.length = 0;
  }
}

let singleton = null;
export function initMontePool(numWorkers){
  if(singleton) return singleton;
  singleton = new MontePool(numWorkers);
  // expose globally for engine usage
  globalThis.__MONTE_POOL = singleton;
  return singleton;
}

export function getMontePool(){
  return singleton;
}
