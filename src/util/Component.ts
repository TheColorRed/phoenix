namespace Phoenix {

  export interface ComponentType<T extends Component> {
    new(gameObject: GameObject): T;
  }

  export class Component extends Object {

    private runStart: boolean = false
    private runAwake: boolean = false

    public constructor(gameObject: GameObject) {
      super()
      this.gameObject = gameObject
      this['_transform'] = gameObject.transform
      this['_game'] = this.gameObject.game
    }

  }
}