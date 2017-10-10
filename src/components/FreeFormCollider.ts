namespace Phoenix {
  export class FreeFormCollider extends Collider {

    public verticies: Vector2[] = []

    public awake() {
      let v: number[] = []
      this.verticies.forEach(vert => {
        v.push(vert.x * this.game.unit)
        v.push(vert.y * this.game.unit)
      })
      let path = Matter.Vertices.fromPath(v.join(' '), this._body)
      this._body = Matter.Bodies.fromVertices(
        this.transform.position.x * this.game.unit,
        this.transform.position.y * this.game.unit,
        [path],
        this.bodySettings
      )
      Matter.World.add(this.game.physicsEngine.world, this._body)
    }

  }
}