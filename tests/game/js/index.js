// import { Game } from '../../engine/index.js'
import { PlayerMove } from './components/PlayerMove.js'

const game = new GameBoy.Game('#container')

game.preload(() => {
  game.loadImage('dog', 'assets/dog.jpg')
})

game.start(() => {
  let dog = game.instantiate('dog')
  dog.addComponent(PlayerMove)
})

game.run()
