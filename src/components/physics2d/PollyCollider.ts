namespace Phoenix {
  export class PollyCollider extends Collider {

    public sides: number = 5
    public radius: number = 0.5

    public awake() {
      if (Game.settings.physics.enabled) {
        this._body = Matter.Bodies.polygon(
          this.transform.position.x * Game.settings.game.units,
          this.transform.position.y * Game.settings.game.units,
          this.sides,
          this.radius * Game.settings.game.units * this.transform.scale,
          (<any>window).deepmerge(this.bodySettings, { collider: 123 })
        )
        Matter.World.add(Game.physicsEngine2d.world, this._body)
      }
    }

  }
}