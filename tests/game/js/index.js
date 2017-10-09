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
  let collider = dog.addComponent(Phoenix.CircleCollider)
  collider.radius = 150
  // collider.width = 300
  // collider.height = 300
  collider.bounciness = 0
  // collider.airFriction = 1
  // collider.isStatic = true
  // collider.x = 1000
  // collider.y = 0

  let cat = game.instantiate('cat', new Phoenix.Vector2(900, 800))
  cat.transform.rotation = .3
  // let renderer = cat.addComponent(Phoenix.SpriteRenderer)
  // renderer.sprite = Phoenix.Sprite.create('cat')
  let rb = cat.addComponent(Phoenix.Rigidbody)
  let floorCollider = cat.addComponent(Phoenix.RectangleCollider)
  floorCollider.isStatic = true
  floorCollider.width = 520
  floorCollider.height = 100
  // floorCollider.y = 10
})

game.run()
