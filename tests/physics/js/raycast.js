import { Floor } from './../../global/prefabs/Floor.js'
import { Ball } from './../../global/prefabs/Ball.js'
import { Polly } from './../../global/prefabs/Polly.js'
import { RaycastTest } from './components/RaycastTest.js'
const game = new Phoenix.Game('#container')

game.preload(loader => {
  loader.loadImage('cat0', 'assets/cat.jpg')
  loader.loadImage('cat1', 'assets/dog.jpg')
})

game.run(() => {
  Phoenix.Collider.debug = true

  // Add the bottom 2 floors
  let floor1 = game.instantiate(Floor, new Phoenix.Vector2(10.3, 10))
  floor1.transform.rotation = -0.2

  let floor2 = game.instantiate(Floor, new Phoenix.Vector2(10.3, 10))
  floor2.transform.rotation = 0.2

  // Add the items
  let ball = game.instantiate(Ball, new Phoenix.Vector2(8, 1))
  ball.addComponent(RaycastTest)

  game.instantiate(Polly, new Phoenix.Vector2(9, 1))
  game.instantiate(Polly, new Phoenix.Vector2(12, 7))
})
