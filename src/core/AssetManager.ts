namespace Phoenix {

  export enum AssetType { Image, Audio, Video }
  export interface Asset<T> {
    name: string
    type: AssetType
    data: T
  }

  interface UnloadedAsset {
    name: string
    soruce: string
    type: AssetType
  }

  export class AssetManager {

    private _assets: Asset<any>[] = []
    private _toLoad: number = 0
    private _unloaded: UnloadedAsset[] = []

    public getAssetByName<T>(name: string, type?: AssetType): Asset<T> {
      return this._assets.find(i => {
        if (type)
          return i.name == name && i.type == type
        else
          return i.name == name
      }) as Asset<T>
    }

    public loadImage(name: string, source: string) {
      this._toLoad++
      PIXI.loader.add(name, source)
    }

    public loadAudio(name: string, source: string) {
      this._toLoad++
      this._unloaded.push({ name: name, soruce: source, type: AssetType.Audio })
    }

    private _load() {
      PIXI.loader.load((pixiloader: PIXI.loaders.Loader, resources: PIXI.loaders.Resource) => {
        for (let name in resources) {
          this._assets.push({
            name: name,
            type: AssetType.Image,
            data: (<any>resources)[name].texture
          })
          this._toLoad--
        }
      })
      for (let i = 0, l = this._unloaded.length; i < l; i++) {
        let item = this._unloaded[i]
        if (item.type == AssetType.Audio) {
          let audio = new Audio(item.soruce)
          audio.addEventListener('load', e => {
            this._assets.push({
              name: name,
              type: item.type,
              data: audio
            })
            this._toLoad--
          })
        }
      }
      this._unloaded = []
    }

  }
}