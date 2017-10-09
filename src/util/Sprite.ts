// import { Game, Asset } from '../Game'
namespace Phoenix {
  export class Sprite {

    protected name: string
    protected _sprite: Asset<PIXI.Sprite>
    public get sprite(): PIXI.Sprite { return this._sprite.data }

    public static create(name: string) {
      return new Sprite(name)
    }

    public constructor(name: string) {
      this.name = name
      this._sprite = <Asset<PIXI.Sprite>>Game.getAsset(name)
      this._sprite.data.anchor.x = 0.5
      this._sprite.data.anchor.y = 0.5
      // loader.load((loader: PIXI.loaders.Loader, resources: PIXI.loaders.Resource) => {
      //   this._sprite = new PIXI.Sprite((<any>resources)[name].texture)
      // })
    }

  }
}