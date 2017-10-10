namespace Phoenix {
  export class Collider extends Component {

    public static debug: boolean = false

    public isStatic: boolean = false

    public x: number = 0
    public y: number = 0
    public bounciness: number = 0
    public friction: number = 0
    public airFriction: number = 0

    public get body(): Matter.Body { return this._body }
    protected _body: Matter.Body

    private debugLine: PIXI.Graphics

    protected get bodySettings(): Matter.IBodyDefinition {
      return {
        angle: this.transform.rotation,
        isStatic: this.isStatic, restitution: clamp01(this.bounciness),
        friction: clamp01(this.friction), frictionAir: clampMin(this.airFriction, 0)
      }
    }

    public start() {
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
      this.transform.position = new Vector2(this.body.position.x, this.body.position.y)
      this.updateDebugBox()
      // console.log(this.game.physicsEngine.on)
    }

    private createDebugBox() {
      if (Collider.debug) {
        this.debugLine = new PIXI.Graphics
        this.game.app.stage.addChild(this.debugLine)
      }
    }

    private drawDirectionIndicators() {
      if (Collider.debug) {
        this.debugLine.lineStyle(1, 0xFF0000)
        let x = this.body.position.x
        let y = this.body.position.y
        this.debugLine.moveTo(x, y)
        if (this instanceof CircleCollider || this instanceof PollyCollider) {
          this.debugLine.lineTo(
            x + (this.radius * this.game.unit * this.transform.scale) * Math.cos(this.body.angle),
            y + (this.radius * this.game.unit * this.transform.scale) * Math.sin(this.body.angle)
          )
        } else if (this instanceof BoxCollider) {
          this.debugLine.lineTo(
            x + (this.width * this.game.unit / 2 * this.transform.scale) * Math.cos(this.body.angle),
            y + (this.width * this.game.unit / 2 * this.transform.scale) * Math.sin(this.body.angle)
          )
        }
      }
    }

    private updateDebugBox() {
      if (Collider.debug) {
        this.debugLine.clear()
        this.debugLine.lineStyle(1, 0x00FF00)
        if (this instanceof CircleCollider) {
          this.debugLine.drawCircle(
            this.body.position.x,
            this.body.position.y,
            this.radius * this.game.unit * this.transform.scale
          )
        } else {
          let points: number[] = []
          this._body.vertices.forEach(v => {
            points.push(v.x)
            points.push(v.y)
          })
          points.push(this._body.vertices[0].x)
          points.push(this._body.vertices[0].y)
          this.debugLine.drawPolygon(points)
        }
        this.drawDirectionIndicators()
      }
    }
  }
}