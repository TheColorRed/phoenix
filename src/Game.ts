namespace Phoenix {
  export interface PhysicsSettings {

  }
  export interface GameSettings {
    units: number
  }
  export interface AppSettings {
    game: GameSettings
    physics: PhysicsSettings
  }
  export enum AssetType { Image, Sound, Video }
  export interface Asset<T> {
    name: string
    type: AssetType
    data: T
  }

  export class Game {

    private gameStarter: Function
    private gamePreloader: Function
    private _app: PIXI.Application
    private _physics: Matter.Engine
    private _assets: Asset<any>[] = []
    private _gameObjects: GameObject[] = []
    private toLoad: number = 0
    private _settings: AppSettings
    private _gameTime: number = 0

    public get app(): PIXI.Application { return this._app }
    public get physicsEngine(): Matter.Engine { return this._physics }
    public get unit(): number { return this._settings.game.units }
    public get time(): number { return this._gameTime }

    public constructor(container: string | HTMLElement, width?: number, height?: number) {
      if (typeof container == 'string') {
        container = document.querySelector(container) as HTMLElement
      }
      if (container instanceof HTMLElement) {
        this._app = new PIXI.Application({ width: width || container.clientWidth, height: height || container.clientHeight })
        container.appendChild(this.app.view)
        this.app.view.addEventListener('contextmenu', e => e.preventDefault())
      }
      this._settings = {
        game: { units: 100 },
        physics: {}
      }
      new Keyboard(this)
      new Mouse(this)
      this.startPhysicsEngine()
    }

    public settings(settings: AppSettings) {
      this._settings = (<any>window).deepmerge(this._settings, settings)
    }

    public startPhysicsEngine() {
      this._physics = Matter.Engine.create(undefined, {
        positionIterations: 10,
        velocityIterations: 10
      })
      // Game._physics.positionIterations = 10
      Matter.Engine.run(this._physics)
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
      this.loadImage('phoenix_particle', '../../images/Particle.png')
      if (typeof this.gamePreloader == 'function') {
        this.gamePreloader()
      }
      PIXI.loader.load((loader: PIXI.loaders.Loader, resources: PIXI.loaders.Resource) => {
        for (let name in resources) {
          this._assets.push({
            name: name,
            type: AssetType.Image,
            data: (<any>resources)[name].texture
          })
          this.toLoad--
        }
      })
      await this.loading()
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

    public instantiate<T extends Prefab>(prefab: PrefabType<T>, position?: Vector2, rotation?: number): GameObject | null {
      let p: Prefab = new prefab(this)
      p.init()
      let gameObject: GameObject = p.gameObject
      if (gameObject instanceof GameObject) {
        if (position && position instanceof Vector2) {
          gameObject.transform.position = position.times(gameObject.game.unit)
        } else {
          gameObject.transform.position = new Vector2(
            this.app.renderer.width / 2 / this.unit,
            this.app.renderer.height / 2 / this.unit
          )
        }
        if (rotation && typeof rotation == 'number') {
          gameObject.transform.rotation = rotation
        }
        this._gameObjects.push(gameObject)
      }
      return gameObject
    }

    private mainLoop() {

      Keyboard.clear()
      Mouse.clear()

      requestAnimationFrame(this.mainLoop.bind(this))
    }

    private startRenderer() {
      let startTime = Date.now()
      this.app.ticker.add(() => {
        this._gameTime = parseFloat(((Date.now() - startTime) / 1000).toFixed(2))
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

    public getAsset(key: string) {
      for (let i = 0; i < this._assets.length; i++) {
        if (this._assets[i].name == key) {
          return this._assets[i]
        }
      }
    }
  }
}