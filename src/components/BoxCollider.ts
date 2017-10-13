namespace Phoenix {
  export class BoxCollider extends Collider {

    public width: number = 1
    public height: number = 1

    public awake() {
      this._body = Matter.Bodies.rectangle(
        this.transform.position.x * this.game.settings.game.units,
        this.transform.position.y * this.game.settings.game.units,
        this.width * this.game.settings.game.units * this.transform.scale,
        this.height * this.game.settings.game.units * this.transform.scale,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine2d.world, this._body)
    }

  }
}