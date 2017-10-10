namespace Phoenix {
  export class BoxCollider extends Collider {

    public width: number = 1
    public height: number = 1

    public awake() {
      this._body = Matter.Bodies.rectangle(
        this.transform.position.x * this.game.unit,
        this.transform.position.y * this.game.unit,
        this.width * this.game.unit * this.transform.scale,
        this.height * this.game.unit * this.transform.scale,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine.world, this._body)
    }

  }
}