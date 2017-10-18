namespace Phoenix {
  export class PlayerController extends Component {

    public keys = {
      /**
       * Keys that are used to move the character around the stage
       */
      move: {
        left: [Phoenix.Key.A, Phoenix.Key.Left],
        right: [Phoenix.Key.D, Phoenix.Key.Right],
        up: [Phoenix.Key.W, Phoenix.Key.Up],
        down: [Phoenix.Key.S, Phoenix.Key.Down],
      },
      jump: [Phoenix.Key.Space]
    }

    public speed: number = 0.02

    private _collider: Collider | null

    public start() {
      this._collider = this.getComponent(Collider)
      if (this._collider) {
        Matter.Body.setInertia(this._collider.body, Infinity)
      }
    }

    public onCollisionEnter(other: GameObject) {
      console.log(other)
    }

    public update() {
      // Move Left
      if (this.keys.move.left.length > 0 && Phoenix.Keyboard.oneKeyHeld(...this.keys.move.left)) {
        // if (this._collider) {
        //   this._collider.setVelocity(Vector2.left.times(this.speed))
        // } else {
        this.transform.translate(Phoenix.Vector2.left.times(this.speed))
        // }
      }

      // Move Right
      if (this.keys.move.right.length > 0 && Phoenix.Keyboard.oneKeyHeld(...this.keys.move.right)) {
        //   if (this._collider) {
        // this._collider.setVelocity(Vector2.right.times(this.speed))
        // } else {
        this.transform.translate(Phoenix.Vector2.right.times(this.speed))
        // }
      }

      // Move Up
      if (this.keys.move.up.length > 0 && Phoenix.Keyboard.oneKeyHeld(...this.keys.move.up)) {
        // if (this._collider) {
        //   this._collider.setVelocity(Vector2.up.times(this.speed))
        // } else {
        this.transform.translate(Phoenix.Vector2.up.times(this.speed))
        // }
      }

      // Move Down
      if (this.keys.move.down.length > 0 && Phoenix.Keyboard.oneKeyHeld(...this.keys.move.down)) {
        // if (this._collider) {
        //   this._collider.setVelocity(Vector2.down.times(this.speed))
        // } else {
        this.transform.translate(Phoenix.Vector2.down.times(this.speed))
        // }
      }


      // if (this.keys.move.left.length > 0 &&
      //   Phoenix.Keyboard.oneKeyUp(
      //     ...this.keys.move.left.concat(this.keys.move.right, this.keys.move.up, this.keys.move.down)
      //   )
      // ) {
      //   if (this._collider) {
      //     this._collider.setVelocity(Vector2.zero)
      //   }
      // }
    }

  }
}