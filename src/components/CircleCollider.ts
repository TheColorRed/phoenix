namespace Phoenix {
  export class CircleCollider extends Collider {

    public radius: number = 1

    public awake() {
      this._body = Matter.Bodies.circle(
        this.transform.position.x,
        this.transform.position.y,
        this.radius, this.bodySettings
      )
      // this._body.d
      Matter.World.add(this.game.physicsEngine.world, this._body)
    }

  }
}