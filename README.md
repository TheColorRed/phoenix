# Module based game

## Setting up the HTML

These are the basic html script tags that can be placed in the header.

```html
<!-- Load the Phoenix library -->
<script src="../../dist/phoenix.js"></script>
<!-- Load the game logic -->
<script src="./js/game.js" type="module"></script>
```

These are optional styles. This will make the game fille the page.

```html
<style>
  body, html { margin: 0; }
  #container { width: 100vw; height: 100vh; }
  canvas { display: block; }
</style>
```

The last part of the html requires a place to load the canvas

```html
<div id="container"></div>
```

## Setting up the game Loader

Next the game needs to load assests and initialize starting assests such as menus, characters, enemies, audio, controllers, etc.

```js
// Import the player prefab
import { Player } from './Prefabs/Player.js'
// Import the enemy prefab
import { Enemy } from './Prefabs/Enemy.js'
// Import the platform
import { Platform } from './Prefabs/Platform.js'

// Create a new game within the container
let game = new Phoenix.Game('#container')

// Load nessessary assets such as images, sounds, music, etc.
// All starting assets should load here, other assets can be
// loaded at a later time.
game.preload(() => {
  game.loadImage('player',   'assets/player.png')
  game.loadImage('enemy',    'assets/enemy.png')
  game.loadImage('platform', 'assets/platform.png')
})

// Initialize the game with starting content
game.start(() => {
  // Create the starting player
  game.instantiate(Player, new Phoenix.Vector2(5, 5))

  // Create a few starting enemies
  game.instantiate(Player, new Phoenix.Vector2(1, 1))
  game.instantiate(Player, new Phoenix.Vector2(1, 3))
  game.instantiate(Player, new Phoenix.Vector2(1, 5))

  // Create a few staggered platforms for the caracters to stand on
  game.instantiate(Platform, new Phoenix.Vector2(1, 1))
  game.instantiate(Platform, new Phoenix.Vector2(5, 3))
  game.instantiate(Platform, new Phoenix.Vector2(1, 5))
})

// Start the execution of the game
game.run()
```

```js
import { PlayerControls } from '../components/Controls.js'

export class Player extends Phoenix.Prefab {

  init() {
    // Attach the player sprite to the gameObject
    let spr = this.addComponent(Phoenix.SpriteRenderer)
    spr.sprite = Phoenix.Sprite.create('player')

    // Attach a physics box collider to the gameObject
    this.addComponent(Phoenix.BoxCollider)

    // Add controls to the player for movement
    this.addComponent(PlayerControls)
  }

}
```

```js
export class Enemy extends Phoenix.Prefab {

  init() {
    let spr = this.addComponent(Phoenix.SpriteRenderer)
    spr.sprite = Phoenix.Sprite.create('enemy')
  }

}
```

```js
export class Platform extends Phoenix.Prefab {

  init() {
    let spr = this.addComponent(Phoenix.SpriteRenderer)
    spr.sprite = Phoenix.Sprite.create('platform')
    spr.sprite.anchor = new Vector2(0, 0)

    // Add a box collider to the box, and make it immovable
    let collider = this.addComponent(Phoenix.BoxCollider)
    collider.isStatic = true
  }

}
```