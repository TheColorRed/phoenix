export class Player extends Phoenix.Prefab {
  init() {
    let spr = this.addComponent(Phoenix.SpriteRenderer)
    let sprite = Phoenix.Sprite.create('player')
    sprite.rows = 4
    sprite.cols = 9

    spr.sprite = sprite

    let pc = this.addComponent(Phoenix.PlayerController)
    pc.speed = 0.03

    let collider = this.addComponent(Phoenix.CapsuleCollider)
    collider.scale = new Phoenix.Vector2(0.3, 0.5)
    collider.offset = new Phoenix.Vector2(0, 0.05)
    // collider.isKinematic = true
  }
}