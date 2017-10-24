import { ParticleSystem } from './prefabs/ParticleSystem.js'

const game = new Phoenix.Game('#container')

game.run(() => {

  // Phoenix.Collider.debug = true

  game.instantiate(ParticleSystem)
})