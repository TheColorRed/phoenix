namespace Phoenix {
  export class Object {

    private _gameObject: GameObject
    private _transform: Transform

    public destroyMe: boolean = false

    public get transform(): Transform { return this._transform }
    public get settings(): AppSettings { return Game.settings }
    public get gameObject(): GameObject { return this._gameObject }
    public get components(): Component[] { return Game.components.filter(comp => comp.gameObject == this.gameObject) }

    /**
     * Finds all gameObject's with the provided name
     *
     * @static
     * @param {string} name The name of the gameObject
     * @returns {GameObject[]}
     * @memberof Object
     */
    public static findObjectsByName(name: string): GameObject[] {
      return Game.gameObjects.filter(go => go.name == name)
    }

    /**
     * Finds the first found gameObject with the provided name
     *
     * @static
     * @param {string} name The name of the gameObject
     * @returns {(GameObject | null)}
     * @memberof Object
     */
    public static findObjectByName(name: string): GameObject | null {
      let objs = this.findObjectsByName(name)
      return objs.length > 0 ? objs[0] : null
    }

    /**
     * Finds all gameObject's that cointain a particular component
     *
     * @static
     * @template T
     * @param {ComponentType<T>} component The component to find
     * @returns {GameObject[]}
     * @memberof Object
     */
    public static findObjectsByType<T extends Component>(component: ComponentType<T>): GameObject[] {
      let go: GameObject[] = []
      Game.components.filter(comp => comp instanceof component)
        .forEach(c => go.push(c.gameObject))
      return go
    }

    /**
     * Finds the first gameObject that contains a particular component
     *
     * @static
     * @template T
     * @param {ComponentType<T>} component The component to find
     * @returns {(GameObject | null)}
     * @memberof Object
     */
    public static findObjectByType<T extends Component>(component: ComponentType<T>): GameObject | null {
      let objs = this.findObjectsByType(component)
      return objs.length > 0 ? objs[0] : null
    }

    /**
     * Adds a component to the current gameObject
     *
     * @template T
     * @param {ComponentType<T>} component The component to add
     * @returns {T}
     * @memberof Object
     */
    public addComponent<T extends Component>(component: ComponentType<T>): T {
      let c = new component(this.gameObject)
      Game.components.push(c)
      // this.gameObject._components.push(c)
      if (!(c instanceof Transform)) {
        if (!Game.settings.physics.enabled && c instanceof Collider) {
          Debug.warning('You are adding a collider to a game without physics')
        }
      }
      return c
    }

    /**
     * Removes a component from the current gameObject
     *
     * @template T
     * @param {ComponentType<T>} component The component to remove
     * @memberof Object
     */
    public removeComponent<T extends Component>(component: ComponentType<T>) {
      let c = this.getComponent(component)
      let idx = Game.components.indexOf(c)
      idx > -1 && Game.components.splice(idx, 1)
    }

    /**
     * Gets the first instance of a component on the current gameObject
     *
     * @template T
     * @param {ComponentType<T>} component The component to get
     * @returns {T}
     * @memberof Object
     */
    public getComponent<T extends Component>(component: ComponentType<T>): T {
      return Game.components.find(comp => {
        return comp instanceof component && comp.gameObject == this.gameObject
      }) as T
    }

    /**
     * Gets all the instances of a component on the current gameObject
     *
     * @template T
     * @param {ComponentType<T>} component The component to get
     * @returns {T[]}
     * @memberof Object
     */
    public getComponents<T extends Component>(component: ComponentType<T>): T[] {
      return Game.components.filter(comp => {
        return comp instanceof component && comp.gameObject == this.gameObject
      }) as T[]
    }

    public instantiate<T extends Prefab>(prefab: PrefabType<T>, position?: Vector2, rotation?: number): GameObject | null {
      return Game.instance.instantiate(prefab, position, rotation)
    }

    /**
     * Destroys an Object
     *
     * @param {*} item
     * @param {number} [delay=0]
     * @memberof Object
     */
    public destroy(item: any, delay: number = 0) {
      if (!item && !(item instanceof Object)) return
      delay > 0 ? setTimeout(() => { this.markForDestruction() }, delay) : this.markForDestruction()
    }

    private markForDestruction() {
      this.destroyMe = true
    }
  }
}