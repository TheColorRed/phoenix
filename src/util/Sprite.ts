namespace Phoenix {

  export interface Keyframe {
    name: string
    speed: number
  }

  export enum SpriteRowDir {
    LeftToRight, RightToLeft
  }

  export enum SpriteColDir {
    TopToBottom, BottomToTop
  }

  export class Sprite {

    protected _name: string
    protected _sprite: PIXI.Sprite
    protected _asset: Asset<PIXI.Texture>
    protected _game: Game
    protected _anchor: Vector2
    protected _rows: number = 1
    protected _cols: number = 1
    protected _frames: PIXI.Texture[] = []

    public get displayObject(): PIXI.DisplayObject { return this._sprite }

    public get name(): string { return this._name }
    public get asset(): Asset<PIXI.Texture> { return this._asset }
    public set asset(value: Asset<PIXI.Texture>) {
      this._asset = value
      this._sprite = new PIXI.Sprite(value.data)
    }
    private set anchor(value: Vector2) { this._anchor = value }
    private set rows(value: number) { this._rows = value }
    private set cols(value: number) { this._cols = value }

    public static create(name: string, anchor?: Vector2) {
      return new Sprite(name, anchor)
      // spr._game = game
      // spr.init()
      // return spr
    }

    public constructor(name: string, anchor?: Vector2) {
      this._name = name
      if (anchor) {
        this.anchor = anchor
      } else {
        this.anchor = new Vector2(0.5, 0.5)
      }
    }

    public playRow(row: number, dir: SpriteRowDir = SpriteRowDir.LeftToRight) {

    }

    public playcolumn(col: number, dir: SpriteColDir = SpriteColDir.TopToBottom) {

    }

    public playCell(row: number, col: number) {

    }

    public playCells(cells: { row: number, col: number }[]) {

    }

    private _init() {
      if (this._rows > 1 || this._cols > 1) {
        let bounds = this.displayObject.getBounds()
        let width = bounds.width
        let height = bounds.height
        let cellWidth = width / this._cols
        let cellHeight = height / this._rows
        let cellCount = this._cols * this._rows
        let currentCol = 0
        let currentRow = 0
        for (let i = 0; i < cellCount; i++) {
          this._frames.push(
            new PIXI.Texture(
              this._asset.data.baseTexture,
              new PIXI.Rectangle(cellWidth * currentCol, cellHeight * currentRow, cellWidth, cellHeight)
            )
          )
          currentCol++
          if (i % this._cols == this._cols - 1) {
            currentRow++
            currentCol = 0
          }
        }
      }
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