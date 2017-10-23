namespace Phoenix {
  export class FreeFormCollider extends Collider {

    public verticies: Vector2[] = []

    public awake() {
      if (Game.settings.physics.enabled) {
        let v: number[] = []
        this.verticies.forEach(vert => {
          v.push(vert.x * Game.settings.game.units)
          v.push(vert.y * Game.settings.game.units)
        })
        let path = Matter.Vertices.fromPath(v.join(' '), this._body)
        this._body = Matter.Bodies.fromVertices(
          this.transform.position.x * Game.settings.game.units,
          this.transform.position.y * Game.settings.game.units,
          [path],
          this.bodySettings
        )
        Matter.World.add(Game.physicsEngine2d.world, this._body)
      }
    }

  }
}