namespace Phoenix {
  export class Transform extends Component {

    public set position(value: Vector2) {
      this.gameObject.sprite.sprite.x = value.x
      this.gameObject.sprite.sprite.y = value.y
    }

    public get position(): Vector2 {
      let pos = this.gameObject.sprite.sprite.getGlobalPosition()
      return new Vector2(pos.x, pos.y)
    }
    public get localPosition(): Vector2 {
      return new Vector2(this.gameObject.sprite.sprite.x, this.gameObject.sprite.sprite.y)
    }

    public set rotation(value: number) {
      this.gameObject.sprite.sprite.rotation = value
    }

    public get rotation(): number {
      return this.gameObject.sprite.sprite.rotation
    }

    public translate(position: Vector2) {
      this.gameObject.sprite.sprite.x += position.x
      this.gameObject.sprite.sprite.y += position.y
    }

  }
}