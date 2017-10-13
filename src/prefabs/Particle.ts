namespace Phoenix {
  export class Particle extends Prefab {

    public init(): void {
      // let collider = this.addComponent(CircleCollider)
      // collider.isTrigger = true
      let spr = this.addComponent(SpriteRenderer)
      spr.sprite = Sprite.create('phoenix_particle')
      this.destroy(this.gameObject, 1000)
    }

  }
}