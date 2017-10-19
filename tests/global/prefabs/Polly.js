export class Polly extends Phoenix.Prefab {
  init() {
    let c = this.addComponent(Phoenix.PollyCollider)
    c.friction = 0.5
    c.bounciness = .3
  }
}