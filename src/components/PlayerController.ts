namespace Phoenix {
  export class PlayerController extends Component {

    public keys = {
      /**
       * Keys that are used to move the character around the stage
       */
      move: {
        left: [Key.A, Key.Left],
        right: [Key.D, Key.Right],
        up: [Key.W, Key.Up],
        down: [Key.S, Key.Down],
      },
      jump: [Key.Space]
    }

    public speed: number = 0.02
    public jumpForce: number = 0.05

    private _collider: Collider | null
    private _jumping: boolean = false

    public start() {
      this._collider = this.getComponent(Collider)
      if (this._collider) {
        Matter.Body.setInertia(this._collider.body, Infinity)
      }
      console.log(Game.gameObjects)
    }

    // public onCollisionEnter(other: GameObject) {
    //   console.log(other)
    // }

    public update() {
      // console.log(items)
      // Move Left
      if (!this._jumping && this.keys.move.left.length > 0 && Keyboard.oneKeyHeld(...this.keys.move.left)) {
        if (this._collider) {
          this._collider.setVelocity(Vector2.left.times(this.speed))
        } else {
          this.transform.translate(Vector2.left.times(this.speed))
        }
      }

      // Move Right
      if (!this._jumping && this.keys.move.right.length > 0 && Keyboard.oneKeyHeld(...this.keys.move.right)) {
        if (this._collider) {
          this._collider.setVelocity(Vector2.right.times(this.speed))
        } else {
          this.transform.translate(Vector2.right.times(this.speed))
        }
      }

      // Move Up
      if (!this._jumping && this.keys.move.up.length > 0 && Keyboard.oneKeyHeld(...this.keys.move.up)) {
        if (this._collider) {
          this._collider.setVelocity(Vector2.up.times(this.speed))
        } else {
          this.transform.translate(Vector2.up.times(this.speed))
        }
      }

      // Move Down
      if (!this._jumping && this.keys.move.down.length > 0 && Keyboard.oneKeyHeld(...this.keys.move.down)) {
        if (this._collider) {
          this._collider.setVelocity(Vector2.down.times(this.speed))
        } else {
          this.transform.translate(Vector2.down.times(this.speed))
        }
      }

      // let items = Physics2d.raycastAll(this.transform.position, this.transform.position.down).filter(obj => obj != this.gameObject)
      // if (this.keys.jump.length > 0 && Keyboard.oneKeyDown(...this.keys.jump)) {
      //   if (this._collider && items.length > 0) {
      //     this._jumping = true
      //     this._collider.addForce(new Vector2(0, -this.jumpForce))
      //   }
      // }
      // if (items.length > 0) { this._jumping = false }

      if (this.keys.move.left.length > 0 &&
        Keyboard.oneKeyUp(
          ...this.keys.move.left.concat(this.keys.move.right, this.keys.move.up, this.keys.move.down)
        )
      ) {
        if (this._collider) {
          this._collider.setVelocity(Vector2.zero)
        }
      }
    }

  }
}