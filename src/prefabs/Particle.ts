namespace Phoenix {
  export class Particle extends Prefab {

    public init(): void {
      this.addComponent(CircleCollider)
      let spr = this.addComponent(SpriteRenderer)
      spr.sprite = Sprite.create('phoenix_particle')
      this.destroy(this.gameObject, 1000)
    }

  }
}