namespace Phoenix {
  export class SpriteRenderer extends Component {
    private _sprite: Sprite

    public set sprite(value: Sprite) { this._sprite = value }
    public get getDisplayObject(): PIXI.DisplayObject { return this._sprite.displayObject }

    public awake() {
      this._sprite['_game'] = this.game
      this._sprite['_sprite'] = <Asset<PIXI.Sprite>>this.game.getAsset(this._sprite.name)
      this._sprite['_sprite'].data.anchor.x = 0.5
      this._sprite['_sprite'].data.anchor.y = 0.5
      this.game.app.stage.addChild(this.getDisplayObject)
    }

    public update() {
      this.getDisplayObject.x = this.transform.position.x
      this.getDisplayObject.y = this.transform.position.y
      this.getDisplayObject.rotation = this.transform.rotation
    }
  }
}