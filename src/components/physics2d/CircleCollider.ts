namespace Phoenix {
  export class CircleCollider extends Collider {

    public radius: number = 0.5

    public awake() {
      if (this.settings.physics.enabled) {
        this._body = Matter.Bodies.circle(
          this.transform.position.x * this.settings.game.units,
          this.transform.position.y * this.settings.game.units,
          this.radius * this.settings.game.units * this.transform.scale,
          (<any>window).deepmerge(this.bodySettings, { collider: 123 })
        )
        Matter.World.add(this.game.physicsEngine2d.world, this._body)
      }
    }

  }
}