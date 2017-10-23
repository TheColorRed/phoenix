namespace Phoenix {

  export interface ComponentType<T extends Component> {
    new(gameObject: GameObject): T
  }

  export abstract class Component extends Object {

    private startRan: boolean = false
    private awakeRan: boolean = false

    public constructor(gameObject: GameObject) {
      super()
      this['_gameObject'] = gameObject
      this['_transform'] = gameObject.transform
    }

  }
}