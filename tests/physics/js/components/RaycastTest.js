export class RaycastTest extends Phoenix.Component {

  start() {
    Phoenix.Physics2d.raycastAll(this.transform.position, new Phoenix.Vector2(this.transform.position.x, 1000))
  }

}