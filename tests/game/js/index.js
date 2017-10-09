// import { Game } from '../../engine/index.js'
import { PlayerMove } from './components/PlayerMove.js'

const game = new Phoenix.Game('#container')

game.preload(() => {
  game.loadImage('dog', 'assets/dog.jpg')
  game.loadImage('cat', 'assets/cat.jpg')
})

game.start(() => {
  Phoenix.Rigidbody.debug = true

  let dog = game.instantiate('dog')
  dog.addComponent(PlayerMove)
  dog.addComponent(Phoenix.Rigidbody)
  console.log(dog.sprite)
  let collider = dog.addComponent(Phoenix.RectangleCollider)
  collider.width = 900
  collider.height = 900
  collider.bounciness = 1
  collider.airFriction = 1
  // collider.isStatic = true
  // collider.x = 1000
  // collider.y = 0

  let floor = game.instantiate('cat', new Phoenix.Vector2(900, 1200))
  let rb = floor.addComponent(Phoenix.Rigidbody)
  let floorCollider = floor.addComponent(Phoenix.RectangleCollider)
  floorCollider.isStatic = true
  floorCollider.width = 2000
  floorCollider.height = 100
  floorCollider.y = 10
})

game.run()
