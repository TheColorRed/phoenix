import { Sprite, Vector2, Component, ComponentType } from './index'
import { Game } from '../index'
import { Transform } from '../components/index'
export class GameObject {

  public sprite: Sprite
  public transform: Transform
  protected _components: Component[] = []

  // public set x(value: number) { this.sprite.sprite.x = value }
  // public get x() { return this.sprite.sprite.x }
  // public set y(value: number) { this.sprite.sprite.y = value }
  // public get y() { return this.sprite.sprite.y }
  // public set rotation(value: number) { this.sprite.sprite.rotation = value }

  public constructor() {
    this.transform = this.addComponent(Transform)
    Game.app.ticker.add(() => {
      for (let i = 0, l = this._components.length; i < l; i++) {
        let c = this._components[i] as any
        if (typeof c['update'] == 'function') {
          c['update']()
        }
      }
    })
  }

  public addComponent<T extends Component>(component: ComponentType<T>): T {
    let c = new component(this)
    this._components.push(c)
    return c
  }

  public removeComponent<T extends Component>(component: T) {
    let index = this._components.indexOf(component)
    if (index > -1) {
      this._components.splice(index, 1)
    }
  }

}