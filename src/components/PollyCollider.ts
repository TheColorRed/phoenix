namespace Phoenix {
  export class PollyCollider extends Collider {

    public sides: number = 5
    public radius: number = 0.5

    public awake() {
      this._body = Matter.Bodies.polygon(
        this.transform.position.x * this.game.unit,
        this.transform.position.y * this.game.unit,
        this.sides,
        this.radius * this.game.unit * this.transform.scale,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine.world, this._body)
    }

  }
}