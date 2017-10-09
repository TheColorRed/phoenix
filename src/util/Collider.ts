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

    private debugGraphic: PIXI.Graphics

    public start() {
      this._body.restitution = clamp01(this.bounciness)
      this._body.friction = clamp01(this.friction)
      this._body.frictionAir = clampMin(this.airFriction, 0)
      this.createDebugBox()
    }

    public update() {
      this.updateDebugBox()
    }

    private createDebugBox() {
      if (Rigidbody.debug) {
        this.debugGraphic = new PIXI.Graphics
        this.debugGraphic.lineStyle(1, 0x00FF00)
        let points: number[] = []
        this._body.vertices.forEach(v => {
          points.push(v.x - this.transform.position.x)
          points.push(v.y - this.transform.position.y)
        })
        points.push(this._body.vertices[0].x - this.transform.position.x)
        points.push(this._body.vertices[0].y - this.transform.position.y)
        this.debugGraphic.drawPolygon(points)
        Game.app.stage.addChild(this.debugGraphic)
      }
    }

    private updateDebugBox() {
      if (Rigidbody.debug) {
        this.debugGraphic.x = this._body.position.x
        this.debugGraphic.y = this._body.position.y
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