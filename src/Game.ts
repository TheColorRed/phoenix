import { Keyboard, Mouse } from './input/index'
import { Vector2, GameObject, Sprite } from './util/index'
import * as PIXI from 'pixi.js'
import * as Matter from 'matter-js'

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
  private toLoad: number = 0

  public static get app(): PIXI.Application { return this._app }

  public constructor(container: string | HTMLElement, width?: number, height?: number) {
    if (typeof container == 'string') {
      container = document.querySelector(container) as HTMLElement
    }
    if (container instanceof HTMLElement) {
      Game._app = new PIXI.Application({ width: width || container.clientWidth, height: height || container.clientHeight })
      console.log(Game._app)
      container.appendChild(Game.app.view)
      Game.app.view.addEventListener('contextmenu', e => e.preventDefault())
    }
    new Keyboard(Game.app.view)
    new Mouse(Game.app.view)
    this.startPhysicsEngine()
  }

  public startPhysicsEngine() {
    let engine = Matter.Engine.create()
    let boxa = Matter.Bodies.rectangle(400, 200, 80, 80)
    Matter.World.add(engine.world, [boxa])
    Matter.Engine.run(engine)
    // Matter.Render.run()
  }

  public loadImage(name: string, value: string): Promise<void> {
    this.toLoad++
    return new Promise<void>(resolve => {
      PIXI.loader.add(name, value).load((loader: PIXI.loaders.Loader, resources: PIXI.loaders.Resource) => {
        Game._assets.push({
          name: name,
          type: AssetType.Image,
          data: new PIXI.Sprite((<any>resources)[name].texture)
        })
        this.toLoad--
        resolve()
      })
    })
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
      await this.loading()
    }
    if (typeof this.gameStarter == 'function') {
      await this.gameStarter()
    }
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
    return go
  }

  private mainLoop() {

    Keyboard.clear()
    Mouse.clear()

    requestAnimationFrame(this.mainLoop.bind(this))
  }

  public static getAsset(key: string) {
    for (let i = 0; i < this._assets.length; i++) {
      if (this._assets[i].name == key) {
        return this._assets[i]
      }
    }
  }
}
