namespace Phoenix {
  export class Transform extends Component {

    private _position: Vector2 = Vector2.zero
    private _rotation: number = 0

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

    public translate(position: Vector2) {
      this.gameObject.sprite.displayObject.x += position.x
      this.gameObject.sprite.displayObject.y += position.y
    }

  }
}