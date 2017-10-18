namespace Phoenix {
  export interface PhysicsSettings2d {
    enabled: boolean
    gravity: Vector2
  }
  export interface GameSettings {
    units: number
  }
  export interface AppSettings {
    game: GameSettings
    physics: PhysicsSettings2d
  }

  export class Game {

    private _gameStarter: Function
    private _gamePreloader: (loader: AssetManager) => void
    private _renderer: Renderer
    private _physics2d: Physics2d
    private _settings: AppSettings
    private _assetManager: AssetManager = new AssetManager
    private _gameObjects: GameObject[] = []
    private _gameTime: number = 0
    private _startTime: number = 0

    public get renderer(): Renderer { return this._renderer }
    public get physicsEngine2d(): Physics2d { return this._physics2d }
    public get settings(): AppSettings { return this._settings }
    public get time(): number { return this._gameTime }
    public get assets(): AssetManager { return this._assetManager }

    public constructor(container: string | HTMLElement, width?: number, height?: number) {
      if (typeof container == 'string') {
        container = document.querySelector(container) as HTMLElement
      }
      if (container instanceof HTMLElement) {
        this._renderer = new Renderer(container, width, height)
      }
      this._settings = {
        game: { units: 100 },
        physics: { enabled: true, gravity: Vector2.down }
      }
      new Keyboard(this)
      new Mouse(this)
    }

    public setSettings(settings: AppSettings) {
      this._settings = (<any>window).deepmerge(this._settings, settings)
    }

    public start2dPhysicsEngine() {
      if (this.settings.physics.enabled) {
        this._physics2d = Physics2d.create(this)
      }
    }

    public async preload(callback: (loader: AssetManager) => void) {
      this._gamePreloader = callback
    }

    public start(callback: Function) {
      this._gameStarter = callback
    }

    public async run() {
      this.start2dPhysicsEngine()
      // this.loadImage('phoenix_particle', '../../images/Particle.png')
      // let loader = new Preloader
      if (typeof this._gamePreloader == 'function') {
        this._gamePreloader(this._assetManager)
      }
      this._assetManager['_load']()
      await this.loading()
      if (typeof this._gameStarter == 'function') {
        await this._gameStarter()
      }
      this._startTime = Date.now()
      setTimeout(this.mainLoop.bind(this))
    }

    public loading() {
      return new Promise(resolve => {
        let int = setInterval(() => {
          if (this._assetManager['_toLoad'] == 0) {
            clearInterval(int)
            resolve()
          }
        })
      })
    }

    public instantiate<T extends Prefab>(prefab: PrefabType<T>, position?: Vector2, rotation?: number): GameObject | null {
      let p: Prefab = new prefab(this)
      p.init()
      if (p.gameObject instanceof GameObject) {
        if (position && position instanceof Vector2) {
          p.gameObject.transform.position = position
        } else {
          p.gameObject.transform.position = new Vector2(
            this.renderer.view.width / 2 / this.settings.game.units,
            this.renderer.view.height / 2 / this.settings.game.units
          )
        }
        if (rotation && typeof rotation == 'number') {
          p.gameObject.transform.rotation = rotation
        }
        this._gameObjects.push(p.gameObject)
      }
      return p.gameObject
    }

    private mainLoop() {
      this._gameTime = parseFloat(((Date.now() - this._startTime) / 1000).toFixed(2))
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
        for (let i = 0, l = go['_components'].length; i < l; i++) {
          let c = go['_components'][i] as any
          if (typeof c['lateUpdate'] == 'function') {
            c['lateUpdate']()
          }
        }
      }
      Keyboard.clear()
      Mouse.clear()
      setTimeout(this.mainLoop.bind(this))
    }

    // public getAsset(key: string) {
    //   for (let i = 0; i < this._assetManager.length; i++) {
    //     if (this._assetManager[i].name == key) {
    //       return this._assetManager[i]
    //     }
    //   }
    // }
  }
}