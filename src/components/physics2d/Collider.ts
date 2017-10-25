namespace Phoenix {
  export class Collider2d extends Component {

    public static debug: boolean = false

    public x: number = 0
    public y: number = 0
    public bounciness: number = 0
    public friction: number = 0
    public airFriction: number = 0
    public isTrigger: boolean = false
    public scale: Vector2 = Vector2.one
    public offset: Vector2 = Vector2.zero
    public isKinematic: boolean = false
    public isStatic: boolean = false

    public get body(): Matter.Body { return this._body }
    public get id(): number { return this._body && this._body.id ? this.body.id : 0 }
    protected _body: Matter.Body

    private debugLine: PIXI.Graphics

    protected get bodySettings(): Matter.IBodyDefinition {
      return {
        isSensor: this.isTrigger,
        angle: this.transform.rotation,
        isStatic: this.isStatic, restitution: clamp01(this.bounciness),
        friction: clamp01(this.friction), frictionAir: clampMin(this.airFriction, 0)
      }
    }

    public setVelocity(value: Vector2) {
      let vx = this.body.velocity.x / Game.settings.game.units
      let vy = this.body.velocity.y / Game.settings.game.units
      Matter.Body.setVelocity(this.body, {
        x: value.x * Game.settings.game.units,
        y: value.y * Game.settings.game.units
      })
    }

    public start() {
      if (Game.settings.physics.enabled) {
        if (this.isKinematic) {
          Matter.Body.setInertia(this.body, -100)
        }
        this.createDebugBox()
      }
    }

    // public update() {
    //   Matter.Body.setPosition(this.body, {
    //     x: this.transform.position.x * Game.settings.game.units,
    //     y: this.transform.position.y * Game.settings.game.units
    //   })
    // }

    public onCollisionEnter(other: GameObject) {
      // console.log(other)
    }

    public lateUpdate() {
      if (Game.settings.physics.enabled) {
        if (!this.isKinematic) {
          this.transform.position = new Vector2(
            (this.body.position.x / Game.settings.game.units) - this.offset.x,
            (this.body.position.y / Game.settings.game.units) - this.offset.y
          )
          this.transform.rotation = this.body.angle
        } else {
          Matter.Body.setPosition(this.body, {
            x: (this.transform.position.x + this.offset.x) * Game.settings.game.units,
            y: (this.transform.position.y + this.offset.y) * Game.settings.game.units
          })
        }
        // Matter.Body.setPosition(this.body, {
        //   x: (this.transform.position.x + this.offset.x) * Game.settings.game.units,
        //   y: (this.transform.position.y + this.offset.y) * Game.settings.game.units
        // })
        this.updateDebugBox()
      }
    }

    public addForce(amount: Vector2) {
      Matter.Body.applyForce(this.body,
        { x: this.transform.position.x * Game.settings.game.units, y: this.transform.position.y * Game.settings.game.units },
        { x: amount.x, y: amount.y }
      )
    }

    ////////////////////////////////////////////////////////////////////////////
    // Begin Debugging
    ////////////////////////////////////////////////////////////////////////////
    private createDebugBox() {
      if (Collider2d.debug) {
        this.debugLine = new PIXI.Graphics
        Game.renderer.debug.add(this.debugLine)
      }
    }

    private updateDebugBox() {
      if (Collider2d.debug) {
        this.debugLine.clear()
        this.debugLine.lineStyle(1, 0x00FF00)
        if (this instanceof CircleCollider) {
          this.debugLine.drawCircle(
            this.body.position.x,
            this.body.position.y,
            this.radius * Game.settings.game.units * this.transform.scale
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

    private drawDirectionIndicators() {
      if (Collider2d.debug) {
        this.debugLine.lineStyle(1, 0x00FF00)
        let x = this.body.position.x
        let y = this.body.position.y
        this.debugLine.moveTo(x, y)
        if (this instanceof CircleCollider || this instanceof PollyCollider) {
          this.debugLine.lineTo(
            x + (this.radius * Game.settings.game.units * this.transform.scale * this.scale.x) * Math.cos(this.body.angle),
            y + (this.radius * Game.settings.game.units * this.transform.scale * this.scale.x) * Math.sin(this.body.angle)
          )
        } else if (this instanceof BoxCollider) {
          this.debugLine.lineTo(
            x + (this.width * Game.settings.game.units / 2 * this.transform.scale * this.scale.x) * Math.cos(this.body.angle),
            y + (this.width * Game.settings.game.units / 2 * this.transform.scale * this.scale.x) * Math.sin(this.body.angle)
          )
        }
      }
    }
    ////////////////////////////////////////////////////////////////////////////
    // End Debugging
    ////////////////////////////////////////////////////////////////////////////
  }
}