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
    private static _renderer: Renderer
    private static _physics2d: Physics2d
    private static _settings: AppSettings
    private static _assetManager: AssetManager = new AssetManager
    private static _gameObjects: GameObject[] = []
    private static _gameTime: number = 0
    private static _startTime: number = 0

    public static instance: Game

    public static get renderer(): Renderer { return this._renderer }
    public static get physicsEngine2d(): Physics2d { return this._physics2d }
    public static get settings(): AppSettings { return this._settings }
    public static get time(): number { return this._gameTime }
    public static get assets(): AssetManager { return this._assetManager }
    public static get gameObjects(): GameObject[] { return this._gameObjects }

    public constructor(container: string | HTMLElement, width?: number, height?: number) {
      if (Game.instance) return
      if (typeof container == 'string') {
        container = document.querySelector(container) as HTMLElement
      }
      if (container instanceof HTMLElement) {
        Game._renderer = new Renderer(container, width, height)
      }
      Game._settings = {
        game: { units: 100 },
        physics: { enabled: true, gravity: Vector2.down }
      }
      new Keyboard()
      new Mouse()
      Game.instance = this
    }

    public setSettings(settings: AppSettings) {
      Game._settings = (<any>window).deepmerge(Game._settings, settings)
    }

    public start2dPhysicsEngine() {
      if (Game.settings.physics.enabled) {
        Game._physics2d = Physics2d.create()
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
        this._gamePreloader(Game._assetManager)
      }
      Game._assetManager['_load']()
      await this.loading()
      if (typeof this._gameStarter == 'function') {
        await this._gameStarter()
      }
      Game._startTime = Date.now()
      setTimeout(this.mainLoop.bind(this))
    }

    public loading() {
      return new Promise(resolve => {
        let int = setInterval(() => {
          if (Game._assetManager['_toLoad'] == 0) {
            clearInterval(int)
            resolve()
          }
        })
      })
    }

    public instantiate<T extends Prefab>(prefab: PrefabType<T>, position?: Vector2, rotation?: number): GameObject | null {
      let p: Prefab = new prefab()
      p.init()
      if (p.gameObject instanceof GameObject) {
        if (position && position instanceof Vector2) {
          p.gameObject.transform.position = position
        } else {
          p.gameObject.transform.position = new Vector2(
            Game.renderer.view.width / 2 / Game.settings.game.units,
            Game.renderer.view.height / 2 / Game.settings.game.units
          )
        }
        if (rotation && typeof rotation == 'number') {
          p.gameObject.transform.rotation = rotation
        }
        Game._gameObjects.push(p.gameObject)
      }
      return p.gameObject
    }

    private mainLoop() {
      Game._gameTime = parseFloat(((Date.now() - Game._startTime) / 1000).toFixed(2))
      for (let i = 0, l = Game._gameObjects.length; i < l; i++) {
        let go = Game._gameObjects[i]
        // Run the awake
        for (let i = 0, l = go['_components'].length; i < l; i++) {
          let c = go['_components'][i] as any
          if (!c['awakeRan']) {
            if (typeof c['awake'] == 'function') {
              c['awake']()
            }
            c['awakeRan'] = true
          }
        }
        // Run the start
        for (let i = 0, l = go['_components'].length; i < l; i++) {
          let c = go['_components'][i] as any
          if (!c['startRan']) {
            if (typeof c['start'] == 'function') {
              c['start']()
            }
            c['startRan'] = true
          }
        }
        // Run the update
        for (let i = 0, l = go['_components'].length; i < l; i++) {
          let c = go['_components'][i] as any
          if (typeof c['update'] == 'function') {
            c['update']()
          }
        }
        // Run the lateUpdate
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