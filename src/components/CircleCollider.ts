namespace Phoenix {
  export class CircleCollider extends Collider {

    public radius: number = 0.5

    public awake() {
      this._body = Matter.Bodies.circle(
        this.transform.position.x * this.game.settings.game.units,
        this.transform.position.y * this.game.settings.game.units,
        this.radius * this.game.settings.game.units * this.transform.scale,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine2d.world, this._body)
    }

  }
}