namespace Phoenix {
  export interface PrefabType<T extends Prefab> {
    new(): T;
  }

  export abstract class Prefab {
    protected components: Component[] = []
    public readonly gameObject: GameObject
    protected transform: Transform

    public abstract init(): void

    public constructor(name?: string) {
      this.gameObject = new GameObject(name)
      this.transform = this.gameObject.transform
    }

    protected addComponent<T extends Component>(component: ComponentType<T>): T {
      return this.gameObject.addComponent(component)
    }

    // protected destroy(item: Object, delay: number = 0) {
    //   this.gameObject.destroy(delay)
    // }

    protected instantiate<T extends Prefab>(prefab: PrefabType<T>, position?: Vector2, rotation?: number): GameObject | null {
      return this.gameObject.instantiate(prefab, position, rotation)
    }

  }
}