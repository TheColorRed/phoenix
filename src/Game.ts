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

    // private _gameInit: Function
    private _gamePreloader: (loader: AssetManager) => void
    private static _renderer: Renderer
    private static _physics2d: Physics2d
    private static _settings: AppSettings
    private static _assetManager: AssetManager = new AssetManager
    private static _gameObjects: GameObject[] = []
    private static _components: Component[] = []
    private static _gameTime: number = 0
    private static _startTime: number = 0

    public static instance: Game

    public static get renderer(): Renderer { return this._renderer }
    public static get physicsEngine2d(): Physics2d { return this._physics2d }
    public static get settings(): AppSettings { return this._settings }
    public static get time(): number { return this._gameTime }
    public static get assets(): AssetManager { return this._assetManager }
    public static get gameObjects(): GameObject[] { return this._gameObjects }
    public static get components(): Component[] { return this._components }

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

    // public init(callback: Function) {
    //   this._gameInit = callback
    // }

    public async run(callback: Function) {
      this.start2dPhysicsEngine()
      // this.loadImage('phoenix_particle', '../../images/Particle.png')
      // let loader = new Preloader
      if (typeof this._gamePreloader == 'function') {
        this._gamePreloader(Game._assetManager)
      }
      Game._assetManager['_load']()
      await this.loading()
      if (typeof callback == 'function') {
        await callback()
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
        }, 0)
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
      }
      return p.gameObject
    }

    private mainLoop() {
      Game._gameTime = parseFloat(((Date.now() - Game._startTime) / 1000).toFixed(2))
      // Run the awake
      this._awake()
      // Run the start
      this._start()
      // Run the update
      this._update()
      // Run the lateUpdate
      this._lateUpdate()
      // Run the object destroyer
      this._destroy()

      Keyboard.clear()
      Mouse.clear()
      setTimeout(this.mainLoop.bind(this))
    }

    private _awake() {
      for (let i = 0, l = Game._components.length; i < l; i++) {
        let c = Game._components[i]
        if (!c['awakeRan']) {
          c.awake()
          c['awakeRan'] = true
        }
      }
    }

    private _start() {
      for (let i = 0, l = Game._components.length; i < l; i++) {
        let c = Game._components[i]
        if (!c['startRan']) {
          c.start()
          c['startRan'] = true
        }
      }
    }

    private _update() {
      for (let i = 0, l = Game._components.length; i < l; i++) {
        let c = Game._components[i]
        if (c.gameObject.isActive && c['startRan'] && c['awakeRan']) {
          c.update()
        }
      }
    }

    private _lateUpdate() {
      for (let i = 0, l = Game._components.length; i < l; i++) {
        let c = Game._components[i]
        if (c.gameObject.isActive && c['startRan'] && c['awakeRan']) {
          c.lateUpdate()
        }
      }
    }

    private _destroy() {
      let i = Game.gameObjects.length
      while (i >= 0) {
        // for (let i = 0, l = Game.gameObjects.length; i < l; i++) {
        let item = Game.gameObjects[i]
        // If the gameObject is marked for destruction, then destroy it
        if (item && item.destroyMe) {
          // Remove the sprite from pixi
          let spr = item.getComponents(SpriteRenderer)
          spr && spr.forEach(s => Game.renderer.game.remove(s.displayObject))
          // Remove the bodies from the physics engine
          // Remove the debug items from pixi
          let colliders = item.getComponents(Collider2d)
          colliders && colliders.forEach(c => Game.renderer.debug.remove(c['debugLine']))
          colliders && colliders.forEach(c => Game.physicsEngine2d.world && c.body && Matter.World.remove(Game.physicsEngine2d.world, c.body))
          // Remove the gameObject's components from the cache
          let components = Game.components.filter(comp => comp.gameObject == item.gameObject)
          for (let i = 0, l = components.length; i < l; i++) {
            let idx = Game.components.indexOf(Game.components[i])
            idx > -1 && Game.components.splice(idx, 1)
          }
          // Remove the game object
          let index = Game.gameObjects.indexOf(item)
          index > -1 && Game.gameObjects.splice(index, 1)
        }
        i--
      }
      for (let i = 0, l = Game._components.length; i < l; i++) {
        let item = Game._components[i]
        // If a component is marked for destruction, then destroy it
        // This does not destroy the gameobject just the component
        if (item && item.destroyMe) {
          let idx = Game.components.indexOf(item)
          idx > -1 && Game.components.splice(idx, 1)
        }
      }
    }
  }
}