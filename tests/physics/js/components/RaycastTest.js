export class RaycastTest extends Phoenix.Component {

  awake() {
    let go = new Phoenix.GameObject
    go.addComponent(Phoenix.BoxCollider)
    go.transform.position = Phoenix.Vector2.one
  }

  start() {
    let ray = Phoenix.Physics2d.raycastAll(this.transform.position, new Phoenix.Vector2(this.transform.position.x, 1000))
    let area = Phoenix.Physics2d.overlapAreaAll(this.transform.position, this.transform.position.times(2))
    console.log(ray, area)
  }

}