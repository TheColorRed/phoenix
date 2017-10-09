namespace Phoenix {

  export class Rigidbody extends Component {

    public static debug: boolean = false

    public update() {
      let colliders = this.getComponents(Collider)
      for (let c of colliders) {
        this.transform.position = new Vector2(c.body.position.x, c.body.position.y)
      }
    }

  }
}