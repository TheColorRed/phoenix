namespace Phoenix {
  export class SpriteRenderer extends Component {

    public static debug: boolean = false

    private _sprite: Sprite

    public set sprite(value: Sprite) { this._sprite = value }
    public get displayObject(): PIXI.DisplayObject { return this._sprite.displayObject }

    private debugLine: PIXI.Graphics

    public awake() {
      if (this._sprite instanceof Sprite) {
        this._sprite['_game'] = this.game
        let asset = this.game.assets.getAssetByName<PIXI.Texture>(this._sprite.name, AssetType.Image)
        this._sprite.asset = asset
        this.game.renderer.game.add(this.displayObject)
      }
    }

    public start() {
      this.createDebugBox()
    }

    public update() {
      this.displayObject.x = this.transform.position.x * this.settings.game.units
      this.displayObject.y = this.transform.position.y * this.settings.game.units
      this.displayObject.rotation = this.transform.rotation
      this.updateDebugBox()
    }

    ////////////////////////////////////////////////////////////////////////////
    // Begin Debugging
    ////////////////////////////////////////////////////////////////////////////
    private createDebugBox() {
      if (SpriteRenderer.debug) {
        this.debugLine = new PIXI.Graphics
        this.game.renderer.debug.add(this.debugLine)
      }
    }

    private updateDebugBox() {
      if (SpriteRenderer.debug) {
        this.debugLine.clear()
        this.debugLine.lineStyle(1, 0x00FFFF)
        let bounds = this.displayObject.getBounds()
        this.debugLine.drawRect(
          this.transform.position.x * this.settings.game.units - (bounds.width / 2),
          this.transform.position.y * this.settings.game.units - (bounds.height / 2),
          bounds.width,
          bounds.height
        )
        this.drawDirectionIndicators()
      }
    }

    private drawDirectionIndicators() {
      if (SpriteRenderer.debug) {
        let bounds = this.displayObject.getBounds()
        let x = this.transform.position.x * this.settings.game.units
        let y = this.transform.position.y * this.settings.game.units
        this.debugLine.lineStyle(1, 0x00FFFF)
        this.debugLine.moveTo(x, y)
        this.debugLine.lineTo(
          x + (bounds.width / 2 * this.transform.scale) * Math.cos(this.transform.rotation),
          y + (bounds.width / 2 * this.transform.scale) * Math.sin(this.transform.rotation)
        )
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    // End Debugging
    ////////////////////////////////////////////////////////////////////////////
  }
}