export class Ball extends Phoenix.Prefab {
  init() {
    let c = this.addComponent(Phoenix.CircleCollider)
    this.transform.scale = 2
    c.friction = 1
    c.bounciness = 0
  }
}