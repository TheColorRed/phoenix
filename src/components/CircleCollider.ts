namespace Phoenix {
  export class CircleCollider extends Collider {

    public radius: number = 0.5

    public awake() {
      this._body = Matter.Bodies.circle(
        this.transform.position.x * this.game.unit,
        this.transform.position.y * this.game.unit,
        this.radius * this.game.unit * this.transform.scale,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine.world, this._body)
    }

  }
}