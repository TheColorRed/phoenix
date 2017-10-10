export class Floor extends Phoenix.Prefab {

  init() {
    let c = this.addComponent(Phoenix.BoxCollider)
    c.width = 20
    c.height = 0.5
    c.friction = 1
    c.isStatic = true
  }

}