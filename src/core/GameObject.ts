namespace Phoenix {
  export class GameObject extends Object {

    public sprite: Sprite

    public constructor() {
      super()
      this.gameObject = this
      this['_transform'] = this.addComponent(Transform)
    }

  }
}