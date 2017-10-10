namespace Phoenix {
  export class RectangleCollider extends Collider {

    public width: number = 1
    public height: number = 1

    public awake() {
      this._body = Matter.Bodies.rectangle(
        this.transform.position.x,
        this.transform.position.y,
        this.width,
        this.height,
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine.world, this._body)
    }

  }
}