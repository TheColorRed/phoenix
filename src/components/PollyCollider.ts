namespace Phoenix {
  export class PollyCollider extends Collider {

    public sides: number = 5
    public radius: number = 0.5

    public awake() {
      this._body = Matter.Bodies.polygon(
        this.transform.position.x * this.game.settings.game.units,
        this.transform.position.y * this.game.settings.game.units,
        this.sides,
        this.radius * this.game.settings.game.units * this.transform.scale,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine2d.world, this._body)
    }

  }
}