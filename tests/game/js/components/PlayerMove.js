// import { Keyboard, Key, Mouse, Button, Component, Vector2 } from '../../../bundle.js'

export class PlayerMove extends GameBoy.Component {
  update() {
    // Move Left
    if (GameBoy.Keyboard.oneKeyHeld(GameBoy.Key.A, GameBoy.Key.Left)) {
      this.transform.translate(GameBoy.Vector2.left.times(10))
    }

    // Move Right
    if (GameBoy.Keyboard.oneKeyHeld(GameBoy.Key.D, GameBoy.Key.Right)) {
      this.transform.translate(GameBoy.Vector2.right.times(10))
    }

    // Move Up
    if (GameBoy.Keyboard.oneKeyHeld(GameBoy.Key.W, GameBoy.Key.Up)) {
      this.transform.translate(GameBoy.Vector2.up.times(10))
    }

    // Move Down
    if (GameBoy.Keyboard.oneKeyHeld(GameBoy.Key.S, GameBoy.Key.Down)) {
      this.transform.translate(GameBoy.Vector2.down.times(10))
    }
  }
}