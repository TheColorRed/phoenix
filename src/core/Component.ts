namespace Phoenix {

  export interface ComponentType<T extends Component> {
    new(gameObject: GameObject): T
  }

  export abstract class Component extends Object {

    private startRan: boolean = false
    private awakeRan: boolean = false

    public awake(): void { }
    public start(): void { }
    public update(): void { }
    public lateUpdate(): void { }

    /**
     * Creates an instance of Component
     *
     * @param {GameObject} gameObject The gameObject associated with this component
     * @memberof Component
     */
    public constructor(gameObject: GameObject) {
      super()
      this['_gameObject'] = gameObject
      this['_transform'] = gameObject.transform
    }

  }
}