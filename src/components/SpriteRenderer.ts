namespace Phoenix {
  export class SpriteRenderer extends Component {
    private _sprite: Sprite

    public set sprite(value: Sprite) { this._sprite = value }
    public get displayObject(): PIXI.DisplayObject { return this._sprite.displayObject }

    public awake() {
      this._sprite['_game'] = this.game
      let asset = this.game.assets.getAssetByName<PIXI.Texture>(this._sprite.name, AssetType.Image)
      this._sprite.asset = asset
      // this._sprite['_sprite'] = new PIXI.Sprite(asset)
      this._sprite['_init']()
      this.game.renderer.game.add(this.displayObject)
    }

    public update() {
      this.displayObject.x = this.transform.position.x
      this.displayObject.y = this.transform.position.y
      this.displayObject.rotation = this.transform.rotation
    }
  }
}