namespace Phoenix {

  export class Rigidbody extends Component {
    // public isKinematic: boolean = false

    // protected _body: Matter.Body | null
    // protected _collider: Collider | null
    // public awake() {
    //   if (Game.settings.physics.enabled) {
    //     this._body = Matter.Bodies.rectangle(
    //       this.transform.position.x * Game.settings.game.units,
    //       this.transform.position.y * Game.settings.game.units,
    //       0, 0,
    //       this.bodySettings
    //     )
    //     Matter.World.add(this.game.physicsEngine2d.world, this._body)
    //   }
    // }

    // public start() {
    //   if (Game.settings.physics.enabled) {
    //     this._collider = this.getComponent(Collider)
    //     this._body = this._collider ? this._collider.body : null
    //   }
    // }

    // public update() {
    //   if (Game.settings.physics.enabled && this._body && this._collider) {
    //     if (!this.isKinematic) {
    //       this.transform.position = new Vector2(
    //         (this._body.position.x / Game.settings.game.units) - this._collider.offset.x,
    //         (this._body.position.y / Game.settings.game.units) - this._collider.offset.y
    //       )
    //       this.transform.rotation = this._body.angle
    //     } else {
    //       Matter.Body.setPosition(this._body, {
    //         x: (this.transform.position.x + this._collider.offset.x) * Game.settings.game.units,
    //         y: (this.transform.position.y + this._collider.offset.y) * Game.settings.game.units
    //       })
    //     }
    //   }
    // }
  }

}