namespace Phoenix {
  export class Collider extends Component {

    public isStatic: boolean = false

    public x: number = 0
    public y: number = 0
    public bounciness: number = 0
    public friction: number = 0
    public airFriction: number = 0.01

    public get body(): Matter.Body { return this._body }
    protected _body: Matter.Body

    private debugLine: PIXI.Graphics

    public start() {
      this._body.restitution = clamp01(this.bounciness)
      this._body.friction = clamp01(this.friction)
      this._body.frictionAir = clampMin(this.airFriction, 0)
      this._body.slop = 0
      this._body.vertices
      this.createDebugBox()
      Matter.Events.on(this.game.physicsEngine, 'collisionStart', e => {
        for (let item of e.source.pairs.list) {
          for (let i = 0; i < this.game['_gameObjects'].length; i++) {
            let obj = this.game['_gameObjects'][i]
            let comps = obj.getComponents(Collider)
            for (let comp of comps) {
              if (item.bodyB == comp.body) {
                // Run Collision code here
              }
            }
          }
        }
        // console.log(e.source.pairs.list)
      })
      // this.game.physics.
      // Matter.Events.on(this._body, 'collisionStart', e => {
      //   console.log(e)
      // })
    }

    public update() {
      this.updateDebugBox()
      // console.log(this.game.physicsEngine.on)
    }

    private createDebugBox() {
      if (Rigidbody.debug) {
        this.debugLine = new PIXI.Graphics
        this.debugLine.lineStyle(1, 0x00FF00)
        let points: number[] = []
        this._body.vertices.forEach(v => {
          points.push(v.x - this.transform.position.x)
          points.push(v.y - this.transform.position.y)
        })
        points.push(this._body.vertices[0].x - this.transform.position.x)
        points.push(this._body.vertices[0].y - this.transform.position.y)
        this.debugLine.drawPolygon(points)
        // this.debugLine.rotation = this._body.angle
        this.game.app.stage.addChild(this.debugLine)
      }
    }

    private updateDebugBox() {
      if (Rigidbody.debug) {
        this.debugLine.x = this._body.position.x
        this.debugLine.y = this._body.position.y
        // this.debugLine.rotation = this._body.angle
      }
    }
    // public awake() {
    //   this.x = 0//this.transform.localPosition.x
    //   this.y = 0//this.transform.localPosition.y
    // }

    // public update() {
    //   this.x = this.transform.position.x
    //   this.y = this.transform.position.y
    // }

  }
}