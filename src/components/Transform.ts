namespace Phoenix {
  export class Transform extends Component {

    private _position: Vector2 = Vector2.zero
    private _rotation: number = 0
    private _scale: number = 1
    private _parent: Transform

    public set position(value: Vector2) {
      this._position = value
    }

    public get position(): Vector2 {
      return this._position
    }

    public get localPosition(): Vector2 {
      return this.position
    }

    public set rotation(value: number) {
      this._rotation = value
    }

    public get rotation(): number {
      return this._rotation
    }

    public set scale(value: number) {
      this._scale = value
    }

    public get scale(): number {
      return this._scale
    }

    public set parent(value: Transform) {
      this._parent = value
      let selfSpr = this.getComponent(SpriteRenderer)
      let otherSpr = value.getComponent(SpriteRenderer)
      if (selfSpr && otherSpr) {
        selfSpr.getDisplayObject.setParent(otherSpr.getDisplayObject.parent)
      }
      // let spr = this.getComponent(SpriteRenderer)

      // if(spr){
      //   let index = this.game.app.stage.getChildIndex(spr.getDisplayObject)
      //   let this.game.app.stage.getChildAt(index)
      // }
    }

    public get parent(): Transform {
      return this._parent
    }

    public translate(position: Vector2) {
      this.gameObject.sprite.displayObject.x += position.x
      this.gameObject.sprite.displayObject.y += position.y
    }

  }
}