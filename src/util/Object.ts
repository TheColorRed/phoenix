// import { Component, ComponentType, GameObject } from '.'
// import { Transform } from '../components/Transform'
// import { Game } from '../'
namespace Phoenix {
  export class Object {

    protected gameObject: GameObject
    private _transform: Transform
    private _components: Component[] = []

    public get transform(): Transform { return this._transform }

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

    public destroy(delay: number = 0) {
      Game.destroy(this, delay)
    }
  }
}