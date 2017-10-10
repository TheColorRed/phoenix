namespace Phoenix {

  export class Rigidbody extends Collider {
    public awake() {
      this._body = Matter.Bodies.rectangle(
        this.transform.position.x * this.game.unit,
        this.transform.position.y * this.game.unit,
        0, 0,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine.world, this._body)
    }
  }

}