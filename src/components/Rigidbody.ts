namespace Phoenix {

  export class Rigidbody extends Collider {
    public awake() {
      this._body = Matter.Bodies.rectangle(
        this.transform.position.x * this.game.settings.game.units,
        this.transform.position.y * this.game.settings.game.units,
        0, 0,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine2d.world, this._body)
    }
  }

}