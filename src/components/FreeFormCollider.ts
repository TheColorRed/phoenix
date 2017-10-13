namespace Phoenix {
  export class FreeFormCollider extends Collider {

    public verticies: Vector2[] = []

    public awake() {
      let v: number[] = []
      this.verticies.forEach(vert => {
        v.push(vert.x * this.game.settings.game.units)
        v.push(vert.y * this.game.settings.game.units)
      })
      let path = Matter.Vertices.fromPath(v.join(' '), this._body)
      this._body = Matter.Bodies.fromVertices(
        this.transform.position.x * this.game.settings.game.units,
        this.transform.position.y * this.game.settings.game.units,
        [path],
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine2d.world, this._body)
    }

  }
}