namespace Phoenix {
  export class BoxCollider extends Collider {

    public width: number = 1
    public height: number = 1

    public awake() {
      if (Game.settings.physics.enabled) {
        this._body = Matter.Bodies.rectangle(
          (this.transform.position.x + this.offset.x) * Game.settings.game.units,
          (this.transform.position.y + this.offset.y) * Game.settings.game.units,
          this.width * Game.settings.game.units * this.transform.scale * this.scale.x,
          this.height * Game.settings.game.units * this.transform.scale * this.scale.y,
          this.bodySettings
        )
        Matter.World.add(Game.physicsEngine2d.world, this._body)
      }
    }

  }
}