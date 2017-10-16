namespace Phoenix {

  export interface QueueProcessType<T extends QueueProcess> {
    new(): T
  }

  export class Queue<T extends new () => QueueProcess> {

    private _queue: T[] = []
    private _running: boolean = false
    private _prevResult: any

    public add(...process: T[]) {
      this._queue.push(...process)
      this.run()
    }

    public remove(process: T) {
      if (process instanceof QueueProcess) {
        let idx = this._queue.indexOf(process)
        if (idx > -1) {
          this._queue.splice(idx, 1)
          return true
        }
      }
      return false
    }

    private async run() {
      if (this._running) return
      this._running = true
      await this.runFirstProcess()
    }

    private async runFirstProcess() {
      if (this._queue.length == 0) return
      let process = new this._queue[0]
      if (process && process instanceof QueueProcess) {
        let result = null
        typeof process['start'] == 'function' && process['start']()
        try {
          result = await process.process(this._prevResult)
          typeof process['success'] == 'function' && process['success']()
        } catch (e) {
          typeof process['error'] == 'function' && process['error']()
        }
        typeof process['complete'] == 'function' && process['complete']()
        this._queue.splice(0, 1)
        this._prevResult = result
        if (this._queue.length > 0) {
          this.runFirstProcess()
        }
      }
      this._running = false
    }
  }

  export abstract class QueueProcess {
    public abstract process: (prevResult: any) => void

    public start: any
    public complete: any
    public success: any
    public error: any

  }
}