import { Floor } from './../../global/prefabs/Floor.js'
import { Ball } from './../../global/prefabs/Ball.js'
import { Polly } from './../../global/prefabs/Polly.js'
const game = new Phoenix.Game('#container')

game.preload(loader => {
  loader.loadImage('cat0', 'assets/cat.jpg')
  loader.loadImage('cat1', 'assets/dog.jpg')
})

class BallGroundCollide extends Phoenix.Component {
  onCollisionEnter2d(other) {
    Phoenix.Object.destroy(other)
  }
}


game.run(() => {
  Phoenix.Collider2d.debug = true

  // Add the bottom 2 floors
  let floor1 = game.instantiate(Floor, new Phoenix.Vector2(10.3, 10))
  floor1.transform.rotation = -0.2

  let floor2 = game.instantiate(Floor, new Phoenix.Vector2(10.3, 10))
  floor2.transform.rotation = 0.2

  // Add the top floor
  let floor3 = game.instantiate(Floor, new Phoenix.Vector2(10.3, 5))
  floor3.transform.rotation = 0.1
  let c2 = floor3.getComponent(Phoenix.BoxCollider)
  c2.width = 10

  // Add the items
  let ball = game.instantiate(Ball, new Phoenix.Vector2(8, 1))
  ball.getComponent(Phoenix.Collider2d).bounciness = 0.9
  ball.tag = 'ball'
  ball.addComponent(BallGroundCollide)

  game.instantiate(Polly, new Phoenix.Vector2(9, 1)).getComponent(Phoenix.Collider2d).bounciness = 0.8
  game.instantiate(Polly, new Phoenix.Vector2(12, 7))

})
