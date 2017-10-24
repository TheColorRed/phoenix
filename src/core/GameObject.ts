namespace Phoenix {
  export class GameObject extends Object {

    private _isActive: boolean = true

    public sprite: Sprite
    public tag: string = ''
    public get isActive(): boolean { return this._isActive }
    public readonly name: string

    public constructor(name?: string) {
      super()
      this.name = name || `GameObject ${Game.gameObjects.length > 0 ? `(${Game.gameObjects.length})` : ''}`.trim()
      this['_gameObject'] = this
      this['_transform'] = this.addComponent(Transform)
      Game.gameObjects.push(this)
    }

    public static findGameObjectsWithTag(tag: string): GameObject[] {
      return Game.gameObjects.filter(go => go.isActive && go.tag == tag)
    }

    public static findWithTag(tag: string) {
      return Game.gameObjects.find(go => go.isActive && go.tag == tag)
    }

  }
}