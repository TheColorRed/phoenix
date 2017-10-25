namespace Phoenix {
  export class CircleCollider extends Collider2d {

    public radius: number = 0.5

    public awake() {
      if (Game.settings.physics.enabled) {
        this._body = Matter.Bodies.circle(
          this.transform.position.x * Game.settings.game.units,
          this.transform.position.y * Game.settings.game.units,
          this.radius * Game.settings.game.units * this.transform.scale,
          (<any>window).deepmerge(this.bodySettings, { collider: 123 })
        )
        Matter.World.add(Game.physicsEngine2d.world, this._body)
      }
    }

  }
}