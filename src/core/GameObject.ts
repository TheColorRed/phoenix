namespace Phoenix {
  export class GameObject extends Object {

    public sprite: Sprite

    public constructor() {
      super()
      this['_gameObject'] = this
      this['_game'] = this.gameObject.game
      this['_transform'] = this.addComponent(Transform)
    }

  }
}