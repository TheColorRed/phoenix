import { Floor } from './prefabs/Floor.js'
import { Ball } from './prefabs/Ball.js'
import { Polly } from './prefabs/Polly.js'
const game = new Phoenix.Game('#container')

game.preload(loader => {
  loader.loadImage('cat0', 'assets/cat.jpg')
  loader.loadImage('cat1', 'assets/dog.jpg')
})

game.start(() => {
  Phoenix.Collider.debug = true

  // Add the bottom 2 floors
  let floor1 = game.instantiate(Floor, new Phoenix.Vector2(10.3, 10))
  floor1.transform.rotation = -0.2

  let floor2 = game.instantiate(Floor, new Phoenix.Vector2(10.3, 10))
  floor2.transform.rotation = 0.2

  // Add the top floor
  let floor3 = game.instantiate(Floor, new Phoenix.Vector2(10.3, 5))
  floor3.transform.rotation = 0.2
  let c2 = floor3.getComponent(Phoenix.BoxCollider)
  c2.width = 10

  // Add the items
  game.instantiate(Ball, new Phoenix.Vector2(8, 1))
  game.instantiate(Polly, new Phoenix.Vector2(9, 1))
  game.instantiate(Polly, new Phoenix.Vector2(12, 7))

})

game.run()
