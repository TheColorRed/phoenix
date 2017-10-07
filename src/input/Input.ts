import { Key, Button } from './index'
export class Input<T extends Key | Button> {
  protected _map: T[] = []

  public get map(): T[] { return this._map }

  public add(key: T) {
    this._map.push(key)
  }

  public keyExists(key: T): boolean {
    return this._map.indexOf(key) > -1
  }

  public getItem(key: string | number | T): T {
    if (key instanceof Key) key = key.key
    if (key instanceof Button) key = key.button
    for (let i = 0; i < this.map.length; i++) {
      let ckey = this.map[i]
      if (ckey instanceof Key && ckey.key == (<string>key).toLowerCase()) {
        return ckey
      }
      if (ckey instanceof Button && ckey.button == <number>key) {
        return ckey
      }
    }
    return this.map.find(x => {
      if (x instanceof Key && x.key == '') return true
      else if (x instanceof Button && x.button == -1) return true
      return false
    }) as T
  }

  public remove(key: T, idx?: number) {
    idx = typeof idx == 'undefined' ? this._map.indexOf(key) : idx
    this._map.splice(idx, 1)
  }
}