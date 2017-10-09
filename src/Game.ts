namespace Phoenix {
  export enum AssetType { Image, Sound, Video }
  export interface Asset<T> {
    name: string
    type: AssetType
    data: T
  }

  export class Game {

    private gameStarter: Function
    private gamePreloader: Function
    private static _app: PIXI.Application
    private static _physics: Matter.Engine
    private static _assets: Asset<any>[] = []
    private _gameObjects: GameObject[] = []
    private toLoad: number = 0

    public static get app(): PIXI.Application { return this._app }
    public static get physics(): Matter.Engine { return this._physics }

    public constructor(container: string | HTMLElement, width?: number, height?: number) {
      if (typeof container == 'string') {
        container = document.querySelector(container) as HTMLElement
      }
      if (container instanceof HTMLElement) {
        Game._app = new PIXI.Application({ width: width || container.clientWidth, height: height || container.clientHeight })
        container.appendChild(Game.app.view)
        Game.app.view.addEventListener('contextmenu', e => e.preventDefault())
      }
      new Keyboard(Game.app.view)
      new Mouse(Game.app.view)
      this.startPhysicsEngine()
    }

    public startPhysicsEngine() {
      Game._physics = Matter.Engine.create()
      Matter.Engine.run(Game._physics)
    }

    public loadImage(name: string, value: string) {
      this.toLoad++
      PIXI.loader.add(name, value)
    }

    public async preload(callback: Function) {
      this.gamePreloader = callback
    }

    public start(callback: Function) {
      this.gameStarter = callback
    }

    public async run() {
      if (typeof this.gamePreloader == 'function') {
        this.gamePreloader()
        PIXI.loader.load((loader: PIXI.loaders.Loader, resources: PIXI.loaders.Resource) => {
          for (let name in resources) {
            Game._assets.push({
              name: name,
              type: AssetType.Image,
              data: new PIXI.Sprite((<any>resources)[name].texture)
            })
            this.toLoad--
          }
        })
        await this.loading()
      }
      if (typeof this.gameStarter == 'function') {
        await this.gameStarter()
      }
      this.startRenderer()
      requestAnimationFrame(this.mainLoop.bind(this))
    }

    public loading() {
      return new Promise(resolve => {
        let int = setInterval(() => {
          if (this.toLoad == 0) {
            clearInterval(int)
            resolve()
          }
        }, 200)
      })
    }

    public instantiate(assetKey: string, position?: Vector2) {
      let go = new GameObject
      go.sprite = Sprite.create(assetKey)
      if (position) {
        go.transform.position = position
      } else {
        go.transform.position = new Vector2(Game.app.renderer.width / 2, Game.app.renderer.height / 2)
      }
      Game.app.stage.addChild(go.sprite.sprite)
      this._gameObjects.push(go)
      return go
    }

    private mainLoop() {

      Keyboard.clear()
      Mouse.clear()

      requestAnimationFrame(this.mainLoop.bind(this))
    }

    public static destroy(item: Object, delay: number = 0) {
      setTimeout(() => {
        if (item instanceof GameObject) {

        } else if (item instanceof Component) {

        }
      }, delay)
    }

    private startRenderer() {
      Game.app.ticker.add(() => {
        for (let i = 0, l = this._gameObjects.length; i < l; i++) {
          let go = this._gameObjects[i]
          for (let i = 0, l = go['_components'].length; i < l; i++) {
            let c = go['_components'][i] as any
            if (!c['runAwake']) {
              if (typeof c['awake'] == 'function') {
                c['awake']()
              }
              c['runAwake'] = true
            }
          }
          for (let i = 0, l = go['_components'].length; i < l; i++) {
            let c = go['_components'][i] as any
            if (!c['runStart']) {
              if (typeof c['start'] == 'function') {
                c['start']()
              }
              c['runStart'] = true
            }
          }
          for (let i = 0, l = go['_components'].length; i < l; i++) {
            let c = go['_components'][i] as any
            if (typeof c['update'] == 'function') {
              c['update']()
            }
          }
        }
      })
    }

    public static getAsset(key: string) {
      for (let i = 0; i < this._assets.length; i++) {
        if (this._assets[i].name == key) {
          return this._assets[i]
        }
      }
    }
  }
}