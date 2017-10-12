// import { Game, Asset } from '../Game'
namespace Phoenix {
  export class Sprite {

    protected _name: string
    protected _sprite: PIXI.Sprite
    protected _game: Game
    public get displayObject(): PIXI.DisplayObject { return this._sprite }

    public get name(): string { return this._name }

    public static create(name: string) {
      return new Sprite(name)
      // spr._game = game
      // spr.init()
      // return spr
    }

    public constructor(name: string) {
      this._name = name
    }

    // public init() {
    //   this._sprite = <Asset<PIXI.Sprite>>this._game.getAsset(this._name)
    //   this._sprite.data.anchor.x = 0.5
    //   this._sprite.data.anchor.y = 0.5
    //   // loader.load((loader: PIXI.loaders.Loader, resources: PIXI.loaders.Resource) => {
    //   //   this._sprite = new PIXI.Sprite((<any>resources)[name].texture)
    //   // })
    // }

  }
}