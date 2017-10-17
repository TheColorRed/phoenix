namespace Phoenix {
  export class Mouse extends Input<Button> {

    public scrollDirection: number
    public static instance: Mouse
    private static mousePosition: Vector2
    private game: Game

    public static get position(): Vector2 { return this.mousePosition }

    public constructor(game: Game) {
      if (Mouse.instance) return
      super()
      this.game = game
      let canvas: HTMLCanvasElement = game.renderer.view
      Mouse.instance = this
      this._generateButtonMap()

      canvas.addEventListener('mousedown', e => {
        for (let i = 0; i < Mouse.instance.map.length; i++) {
          let key = Mouse.instance.map[i]
          if (e.button == key.button) {
            if (!key.isDown) key.state = ButtonState.Pressed
            key.isDown = true
            break;
          }
        }
      })

      canvas.addEventListener('mouseup', e => {
        for (let i = 0; i < Mouse.instance.map.length; i++) {
          let key = Mouse.instance.map[i]
          if (e.button == key.button) {
            key.isDown = false
            key.state = ButtonState.Released
            break;
          }
        }
      })

      canvas.addEventListener('mouseleave', e => {
        Mouse.clear()
        for (let i = 0; i < Mouse.instance.map.length; i++) {
          Mouse.instance.map[i].isDown = false
        }
      })

      canvas.addEventListener('mousemove', e => {
        let rect = this.game.renderer.view.getBoundingClientRect()
        Mouse.mousePosition = new Vector2(e.clientX - rect.left, e.clientY - rect.top)
      })

      canvas.addEventListener('mousewheel', e => {
        e.preventDefault()
        if (e.wheelDelta > 0) {
          this.scrollDirection = 1
        } else if (e.wheelDelta < 0) {
          this.scrollDirection = -1
        } else {
          this.scrollDirection = 0
        }
      })

    }

    public static clear() {
      for (let i = 0; i < Mouse.instance.map.length; i++) {
        Mouse.instance.map[i].state = ButtonState.None
      }
      this.instance.scrollDirection = 0
    }

    // The button was pressed
    public static buttonDown(testbutton: Button): boolean {
      let button = Mouse.instance.getItem(testbutton) || false
      return button && button.isDown && button.state == ButtonState.Pressed
    }

    // The button was released
    public static buttonUp(testbutton: Button): boolean {
      let button = Mouse.instance.getItem(testbutton) || false
      return button && !button.isDown && button.state == ButtonState.Released
    }

    // The button is held
    public static buttonHeld(testbutton: Button): boolean {
      let button = Mouse.instance.getItem(testbutton) || false
      return button && button.isDown
    }

    public static scrollUp(): boolean {
      return this.instance.scrollDirection > 0
    }

    public static scrollDown(): boolean {
      return this.instance.scrollDirection < 0
    }

    private _generateButtonMap() {
      this.add(new Button(-1))
      this.add(new Button(0))
      this.add(new Button(1))
      this.add(new Button(2))
    }
  }
}