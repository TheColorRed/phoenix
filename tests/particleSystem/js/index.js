import { ParticleSystem } from './prefabs/ParticleSystem.js'

const game = new Phoenix.Game('#container')

game.start(() => {

  // Phoenix.Collider.debug = true

  game.instantiate(ParticleSystem)
})

game.run()