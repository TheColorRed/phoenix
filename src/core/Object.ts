namespace Phoenix {
  export class Object {

    protected gameObject: GameObject
    private _game: Game
    private _transform: Transform
    private _components: Component[] = []

    public get transform(): Transform { return this._transform }
    public get game(): Game { return this._game }

    public addComponent<T extends Component>(component: ComponentType<T>): T {
      let c = new component(this.gameObject)
      this.gameObject._components.push(c)
      return c
    }

    public removeComponent<T extends Component>(component: T) {
      let index = this.gameObject._components.indexOf(component)
      if (index > -1) {
        this.gameObject._components.splice(index, 1)
      }
    }

    public getComponent<T extends Component>(component: ComponentType<T>): T | null {
      for (let i = 0; i < this.gameObject._components.length; i++) {
        if (this.gameObject._components[i] instanceof component) {
          return <T>this.gameObject._components[i]
        }
      }
      return null
    }

    public getComponents<T extends Component>(component: ComponentType<T>): T[] {
      let components: T[] = []
      for (let i = 0; i < this.gameObject._components.length; i++) {
        if (this.gameObject._components[i] instanceof component) {
          components.push(<T>this.gameObject._components[i])
        }
      }
      return components
    }

    public instantiate<T extends Prefab>(prefab: PrefabType<T>, position?: Vector2, rotation?: number): GameObject | null {
      return this.game.instantiate(prefab, position, rotation)
    }

    public destroy(item: Object | null, delay: number = 0) {
      if (!item) return
      delay > 0 ? setTimeout(() => { this._destroy(item) }, delay) : this._destroy(item)
    }

    private _destroy(item: Object) {
      if (item instanceof GameObject) {
        let spr = item.getComponents(SpriteRenderer)
        let colliders = item.getComponents(Collider)
        spr && spr.forEach(s => this._game.renderer.game.remove(s.displayObject))
        colliders && colliders.forEach(c => this._game.renderer.game.remove(c['debugLine']))
        colliders && colliders.forEach(c => this.game.physicsEngine2d.world && c.body && Matter.World.remove(this.game.physicsEngine2d.world, c.body))
        let index = this.game['_gameObjects'].indexOf(item)
        this.game['_gameObjects'].splice(index, 1)
      } else if (item instanceof Component) {
        let idx = item._components.indexOf(item)
        item._components.splice(idx, 1)
      }
    }
  }
}