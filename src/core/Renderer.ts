namespace Phoenix {

  export class Renderer {

    /**
     * The gui layer renders all of the gui elements
     *
     * @memberof Renderer
     */
    public readonly gui = new RenderLayer

    /**
     * The game layer renders all of the game elements
     *
     * @memberof Renderer
     */
    public readonly game = new RenderLayer

    /**
     * The debug layer renders all of the debug elements
     * This layer gets disabled on a production build
     *
     * @memberof Renderer
     */
    public readonly debug = new RenderLayer

    private _app: PIXI.Application

    public get view(): HTMLCanvasElement { return this._app.view }

    public constructor(container: HTMLElement, width?: number, height?: number) {
      this._app = new PIXI.Application({ width: width || container.clientWidth, height: height || container.clientHeight })
      // Add the base layers to the canvas
      this._app.stage.addChild(this.game.layer)
      this._app.stage.addChild(this.gui.layer)
      this._app.stage.addChild(this.debug.layer)
      container.appendChild(this._app.view)
      this._app.view.addEventListener('contextmenu', e => e.preventDefault())
    }

    public createLayer(): RenderLayer {
      let layer = new RenderLayer
      this._app.stage.addChildAt(layer.layer, 1)
      return layer
    }

    public destroyLayer(layer: RenderLayer) {
      this._app.stage.removeChild(layer.layer)
    }
  }

  export class RenderLayer {
    public readonly layer = new PIXI.Container

    public add(item: PIXI.DisplayObject) {
      this.layer.addChild(item)
    }

    public remove(item: PIXI.DisplayObject) {
      this.layer.removeChild(item)
    }
  }

}