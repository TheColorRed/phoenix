export class PlayerMove extends Phoenix.Component {

  start() {
    this.rb = this.getComponent(Phoenix.Rigidbody)
    this.fired = false
  }

  update() {
    // Fire the missile on click
    if (Phoenix.Mouse.buttonDown(Phoenix.Button.Left)) this.fired = true
    this.fired ? this.rb.addForce(new Phoenix.Vector2(.1, 0)) : null

    // Move Left
    if (Phoenix.Keyboard.oneKeyHeld(Phoenix.Key.A, Phoenix.Key.Left)) {
      this.transform.translate(Phoenix.Vector2.left.times(10))
    }

    // Move Right
    if (Phoenix.Keyboard.oneKeyHeld(Phoenix.Key.D, Phoenix.Key.Right)) {
      this.transform.translate(Phoenix.Vector2.right.times(10))
    }

    // Move Up
    if (Phoenix.Keyboard.oneKeyHeld(Phoenix.Key.W, Phoenix.Key.Up)) {
      this.transform.translate(Phoenix.Vector2.up.times(10))
    }

    // Move Down
    if (Phoenix.Keyboard.oneKeyHeld(Phoenix.Key.S, Phoenix.Key.Down)) {
      this.transform.translate(Phoenix.Vector2.down.times(10))
    }
  }
}