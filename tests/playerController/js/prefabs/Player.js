export class Player extends Phoenix.Prefab {
  init() {
    let spr = this.addComponent(Phoenix.SpriteRenderer)
    let sprite = Phoenix.Sprite.create('player')
    sprite.rows = 4
    sprite.cols = 9

    spr.sprite = sprite
  }
}