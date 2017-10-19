import { Player } from '../../global/prefabs/Player.js'
import { Floor } from '../../global/prefabs/Floor.js'
const game = new Phoenix.Game('#container')

// game.setSettings({ physics: { gravity: Phoenix.Vector2.zero } })

game.preload(loader => {
  loader.loadImage('player', 'assets/player.png')
})

game.start(() => {

  Phoenix.SpriteRenderer.debug = true
  Phoenix.Collider.debug = true

  game.instantiate(Player, new Phoenix.Vector2(3, 3))
  game.instantiate(Floor, new Phoenix.Vector2(10, 5))
})

game.run()