namespace Phoenix {

  export interface ComponentType<T extends Component> {
    new(gameObject: GameObject): T
  }

  export abstract class Component extends Object {

    private runStart: boolean = false
    private runAwake: boolean = false

    public constructor(gameObject: GameObject) {
      super()
      this['_gameObject'] = gameObject
      this['_game'] = this.gameObject.game
      this['_transform'] = gameObject.transform
    }

  }
}