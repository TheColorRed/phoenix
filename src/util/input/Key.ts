// import { Keyboard } from '.'
namespace Phoenix {
  export enum KeyState { None, Pressed, Released }

  export class Key {
    public readonly key: string
    protected _isDown: boolean = false
    protected _state: KeyState = KeyState.None;

    public set isDown(value: boolean) { this._isDown = value }
    public get isDown(): boolean { return this._isDown }
    public set state(value: KeyState) { this._state = value }
    public get state(): KeyState { return this._state }

    public constructor(key: string) {
      this.key = key.toLowerCase()
    }

    public static get None(): Key { return Keyboard.instance.getItem('') }
    // Get numeric key
    public static get VK0(): Key { return Keyboard.instance.getItem('0') }
    public static get VK1(): Key { return Keyboard.instance.getItem('1') }
    public static get VK2(): Key { return Keyboard.instance.getItem('2') }
    public static get VK3(): Key { return Keyboard.instance.getItem('3') }
    public static get VK4(): Key { return Keyboard.instance.getItem('4') }
    public static get VK5(): Key { return Keyboard.instance.getItem('5') }
    public static get VK6(): Key { return Keyboard.instance.getItem('6') }
    public static get VK7(): Key { return Keyboard.instance.getItem('7') }
    public static get VK8(): Key { return Keyboard.instance.getItem('8') }
    public static get VK9(): Key { return Keyboard.instance.getItem('9') }
    public static get F1(): Key { return Keyboard.instance.getItem('F1') }
    public static get F2(): Key { return Keyboard.instance.getItem('F2') }
    public static get F3(): Key { return Keyboard.instance.getItem('F3') }
    public static get F4(): Key { return Keyboard.instance.getItem('F4') }
    public static get F5(): Key { return Keyboard.instance.getItem('F5') }
    public static get F6(): Key { return Keyboard.instance.getItem('F6') }
    public static get F7(): Key { return Keyboard.instance.getItem('F7') }
    public static get F8(): Key { return Keyboard.instance.getItem('F8') }
    public static get F9(): Key { return Keyboard.instance.getItem('F9') }
    public static get F10(): Key { return Keyboard.instance.getItem('F10') }
    public static get F11(): Key { return Keyboard.instance.getItem('F11') }
    public static get F12(): Key { return Keyboard.instance.getItem('F12') }
    // Get alphabetic key
    public static get A(): Key { return Keyboard.instance.getItem('A') }
    public static get B(): Key { return Keyboard.instance.getItem('B') }
    public static get C(): Key { return Keyboard.instance.getItem('C') }
    public static get D(): Key { return Keyboard.instance.getItem('D') }
    public static get E(): Key { return Keyboard.instance.getItem('E') }
    public static get F(): Key { return Keyboard.instance.getItem('F') }
    public static get G(): Key { return Keyboard.instance.getItem('G') }
    public static get H(): Key { return Keyboard.instance.getItem('H') }
    public static get I(): Key { return Keyboard.instance.getItem('I') }
    public static get J(): Key { return Keyboard.instance.getItem('J') }
    public static get K(): Key { return Keyboard.instance.getItem('K') }
    public static get L(): Key { return Keyboard.instance.getItem('L') }
    public static get M(): Key { return Keyboard.instance.getItem('M') }
    public static get N(): Key { return Keyboard.instance.getItem('N') }
    public static get O(): Key { return Keyboard.instance.getItem('O') }
    public static get P(): Key { return Keyboard.instance.getItem('P') }
    public static get Q(): Key { return Keyboard.instance.getItem('Q') }
    public static get R(): Key { return Keyboard.instance.getItem('R') }
    public static get S(): Key { return Keyboard.instance.getItem('S') }
    public static get T(): Key { return Keyboard.instance.getItem('T') }
    public static get U(): Key { return Keyboard.instance.getItem('U') }
    public static get V(): Key { return Keyboard.instance.getItem('V') }
    public static get W(): Key { return Keyboard.instance.getItem('W') }
    public static get X(): Key { return Keyboard.instance.getItem('X') }
    public static get Y(): Key { return Keyboard.instance.getItem('Y') }
    public static get Z(): Key { return Keyboard.instance.getItem('Z') }
    // Get named key
    public static get Up(): Key { return Keyboard.instance.getItem('ArrowUp') }
    public static get Down(): Key { return Keyboard.instance.getItem('ArrowDown') }
    public static get Left(): Key { return Keyboard.instance.getItem('ArrowLeft') }
    public static get Right(): Key { return Keyboard.instance.getItem('ArrowRight') }
    public static get Enter(): Key { return Keyboard.instance.getItem('Enter') }
    public static get Backspace(): Key { return Keyboard.instance.getItem('Backspace') }
    public static get Control(): Key { return Keyboard.instance.getItem('Control') }
    public static get Alt(): Key { return Keyboard.instance.getItem('Alt') }
    public static get Shift(): Key { return Keyboard.instance.getItem('Shift') }
    public static get Space(): Key { return Keyboard.instance.getItem(' ') }
    public static get Dash(): Key { return Keyboard.instance.getItem('-') }
    public static get Equal(): Key { return Keyboard.instance.getItem('=') }
    public static get LeftBracket(): Key { return Keyboard.instance.getItem('[') }
    public static get RightBracket(): Key { return Keyboard.instance.getItem(']') }
    public static get Semicolon(): Key { return Keyboard.instance.getItem(';') }
    public static get Apostrophe(): Key { return Keyboard.instance.getItem('\'') }
    public static get Comma(): Key { return Keyboard.instance.getItem(',') }
    public static get Period(): Key { return Keyboard.instance.getItem('.') }
    public static get ForwardSlash(): Key { return Keyboard.instance.getItem('/') }
    public static get BackSlash(): Key { return Keyboard.instance.getItem('\\') }
  }
}