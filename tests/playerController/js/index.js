import { Player } from './prefabs/Player.js'
import { Floor } from './prefabs/Floor.js'
const game = new Phoenix.Game('#container')

game.setSettings({ physics: { gravity: Phoenix.Vector2.zero } })

game.preload(loader => {
    loader.loadImage('player', 'assets/player.png')
})

game.start(() => {

    Phoenix.SpriteRenderer.debug = true
    Phoenix.Collider.debug = true


    game.instantiate(Player, new Phoenix.Vector2(1, 1))
    game.instantiate(Floor, new Phoenix.Vector2(1, 5))
})

game.run()