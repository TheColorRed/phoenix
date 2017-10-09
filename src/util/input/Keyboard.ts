// import { Input, Key, KeyState } from '.'
namespace Phoenix {
  export class Keyboard extends Input<Key> {

    public static instance: Keyboard

    public constructor(canvas: HTMLCanvasElement) {
      if (Keyboard.instance) return
      super()
      Keyboard.instance = this
      this._generateKeyMap()

      document.addEventListener('keydown', e => {
        for (let i = 0; i < Keyboard.instance.map.length; i++) {
          let key = Keyboard.instance.map[i]
          if (e.key.toLowerCase() == key.key) {
            if (!key.isDown) key.state = KeyState.Pressed
            key.isDown = true
            break;
          }
        }
      })

      document.addEventListener('keyup', e => {
        for (let i = 0; i < Keyboard.instance.map.length; i++) {
          let key = Keyboard.instance.map[i]
          if (e.key.toLowerCase() == key.key) {
            key.isDown = false
            key.state = KeyState.Released
            break;
          }
        }
      })

    }

    public static clear() {
      for (let i = 0; i < Keyboard.instance.map.length; i++) {
        Keyboard.instance.map[i].state = KeyState.None
      }
    }

    // The key was pressed
    public static keyDown(testkey: Key): boolean {
      let key = Keyboard.instance.getItem(testkey) || false
      return key && key.isDown && key.state == KeyState.Pressed
    }

    // The key was released
    public static keyUp(testkey: Key): boolean {
      let key = Keyboard.instance.getItem(testkey) || false
      return key && !key.isDown && key.state == KeyState.Released
    }

    // The key is held
    public static keyHeld(testkey: Key): boolean {
      let key = Keyboard.instance.getItem(testkey) || false
      return key && key.isDown
    }

    public static oneKeyDown(...keys: Key[]) {
      for (let i = 0; i < keys.length; i++) {
        if (this.keyDown(keys[i])) {
          return true
        }
      }
      return false
    }
    public static oneKeyUp(...keys: Key[]) {
      for (let i = 0; i < keys.length; i++) {
        if (this.keyUp(keys[i])) {
          return true
        }
      }
      return false
    }
    public static oneKeyHeld(...keys: Key[]) {
      for (let i = 0; i < keys.length; i++) {
        if (this.keyHeld(keys[i])) {
          return true
        }
      }
      return false
    }

    public static anyKeyDown() {
      for (let i = 0; i < Keyboard.instance.map.length; i++) {
        if (this.keyDown(Keyboard.instance.map[i])) {
          return true
        }
      }
      return false
    }

    public static anyKeyUp() {
      for (let i = 0; i < Keyboard.instance.map.length; i++) {
        if (this.keyUp(Keyboard.instance.map[i])) {
          return true
        }
      }
      return false
    }

    public static anyKeyHeld() {
      for (let i = 0; i < Keyboard.instance.map.length; i++) {
        if (this.keyHeld(Keyboard.instance.map[i])) {
          return true
        }
      }
      return false
    }

    public static anyKeyUpExcept(...keys: Key[]) {
      for (let i = 0; i < Keyboard.instance.map.length; i++) {
        if (this.keyUp(Keyboard.instance.map[i]) && keys.indexOf(Keyboard.instance.map[i]) == -1) {
          return true
        }
      }
      return false
    }

    public static anyKeyHeldExcept(...keys: Key[]) {
      for (let i = 0; i < Keyboard.instance.map.length; i++) {
        if (this.keyHeld(Keyboard.instance.map[i]) && keys.indexOf(Keyboard.instance.map[i]) == -1) {
          return true
        }
      }
      return false
    }

    public static anyKeyDownExcept(...keys: Key[]) {
      for (let i = 0; i < Keyboard.instance.map.length; i++) {
        if (this.keyDown(Keyboard.instance.map[i]) && keys.indexOf(Keyboard.instance.map[i]) == -1) {
          return true
        }
      }
      return false
    }

    private _generateKeyMap() {
      // Generate letters
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (var i = 0; i < str.length; i++) {
        this.add(new Key(str.charAt(i)))
      }
      // Generate numbers
      for (var i = 0; i < 10; i++) {
        this.add(new Key(i.toString()))
      }
      // Generate the 'F' Keys
      for (var i = 1; i <= 12; i++) {
        this.add(new Key('F' + i.toString()))
      }
      // Generate the named keys
      this.add(new Key(''))
      this.add(new Key('ArrowUp'))
      this.add(new Key('ArrowLeft'))
      this.add(new Key('ArrowRight'))
      this.add(new Key('ArrowDown'))
      this.add(new Key('Enter'))
      this.add(new Key('Backspace'))
      this.add(new Key('Control'))
      this.add(new Key('Alt'))
      this.add(new Key('Shift'))
      this.add(new Key(' '))
      this.add(new Key('-'))
      this.add(new Key('='))
      this.add(new Key('['))
      this.add(new Key(']'))
      this.add(new Key(';'))
      this.add(new Key('\''))
      this.add(new Key(','))
      this.add(new Key('.'))
      this.add(new Key('/'))
      this.add(new Key('\\'))
    }
  }
}