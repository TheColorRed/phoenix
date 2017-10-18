namespace Phoenix {
  export class FreeFormCollider extends Collider {

    public verticies: Vector2[] = []

    public awake() {
      if (this.settings.physics.enabled) {
        let v: number[] = []
        this.verticies.forEach(vert => {
          v.push(vert.x * this.settings.game.units)
          v.push(vert.y * this.settings.game.units)
        })
        let path = Matter.Vertices.fromPath(v.join(' '), this._body)
        this._body = Matter.Bodies.fromVertices(
          this.transform.position.x * this.settings.game.units,
          this.transform.position.y * this.settings.game.units,
          [path],
          this.bodySettings
        )
        Matter.World.add(this.game.physicsEngine2d.world, this._body)
      }
    }

  }
}