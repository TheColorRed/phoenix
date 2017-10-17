import { Player } from './prefabs/Player.js'
const game = new Phoenix.Game('#container')

game.preload(loader => {
  loader.loadImage('player', 'assets/player.png')
})

game.start(() => {
  game.instantiate(Player)
})

game.run()