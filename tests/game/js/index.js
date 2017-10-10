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
  dog.transform.position.x = 0
  // dog.addComponent(PlayerMove)
  dog.addComponent(Phoenix.Rigidbody)
  let renderer = dog.addComponent(Phoenix.SpriteRenderer)
  renderer.sprite = Phoenix.Sprite.create('cat')
  let collider = dog.addComponent(Phoenix.RectangleCollider)
  collider.radius = 25
  collider.friction = 1
  collider.width = 100
  collider.height = 100
  collider.bounciness = 0
  // collider.airFriction = 1
  // collider.isStatic = true
  // collider.x = 1000
  // collider.y = 0

  let cat = game.instantiate('cat', new Phoenix.Vector2(100, 800))
  cat.transform.rotation = 0.1
  // let renderer = cat.addComponent(Phoenix.SpriteRenderer)
  // renderer.sprite = Phoenix.Sprite.create('cat')
  let rb = cat.addComponent(Phoenix.Rigidbody)
  let floorCollider = cat.addComponent(Phoenix.RectangleCollider)
  floorCollider.isStatic = true
  floorCollider.width = 1000
  floorCollider.height = 50
})

game.run()
