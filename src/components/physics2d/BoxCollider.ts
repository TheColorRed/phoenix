namespace Phoenix {
  export class BoxCollider extends Collider {

    public width: number = 1
    public height: number = 1

    public awake() {
      if (this.settings.physics.enabled) {
        this._body = Matter.Bodies.rectangle(
          (this.transform.position.x + this.offset.x) * this.settings.game.units,
          (this.transform.position.y + this.offset.y) * this.settings.game.units,
          this.width * this.settings.game.units * this.transform.scale * this.scale.x,
          this.height * this.settings.game.units * this.transform.scale * this.scale.y,
          this.bodySettings
        )
        Matter.World.add(this.game.physicsEngine2d.world, this._body)
      }
    }

  }
}