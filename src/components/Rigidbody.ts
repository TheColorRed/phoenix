namespace Phoenix {

  export class Rigidbody extends Component {

    public static debug: boolean = false

    public update() {
      let colliders = this.getComponents(Collider)
      for (let c of colliders) {
        this.transform.position = new Vector2(c.body.position.x, c.body.position.y)
        this.transform.rotation = c.body.angle
      }
    }

    public addForce(amount: Vector2) {
      let colliders = this.getComponents(Collider)
      for (let c of colliders) {
        Matter.Body.applyForce(c.body, { x: this.transform.position.x, y: this.transform.position.y }, { x: amount.x, y: amount.y })
      }
    }

  }
}