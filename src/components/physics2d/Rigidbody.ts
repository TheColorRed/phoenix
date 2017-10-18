namespace Phoenix {

  export class Rigidbody extends Collider {
    public awake() {
      if (this.settings.physics.enabled) {
        this._body = Matter.Bodies.rectangle(
          this.transform.position.x * this.settings.game.units,
          this.transform.position.y * this.settings.game.units,
          0, 0,
          this.bodySettings
        )
        Matter.World.add(this.game.physicsEngine2d.world, this._body)
      }
    }
  }

}