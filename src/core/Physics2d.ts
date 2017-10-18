namespace Phoenix {
  export class Physics2d {

    protected _game: Game
    protected _engine: Matter.Engine

    public get world(): Matter.World { return this._engine.world }

    public static create(game: Game) {
      /**
       * TODO:
       * - Disable the creation of two 2d physics engines in the same game
       * - Return the current engine if it already exists
       */
      return new Physics2d(game)
    }

    private constructor(game: Game) {
      Debug.log('Starting 2d physics engine')
      this._game = game
      this._engine = Matter.Engine.create(undefined, {
        positionIterations: 10,
        velocityIterations: 10
      })
      this.world.gravity.x = this._game.settings.physics.gravity.x
      this.world.gravity.y = this._game.settings.physics.gravity.y
      Matter.Engine.run(this._engine)

      Matter.Events.on(this._engine, 'collisionStart', e => {
        for (let item of e.source.pairs.list) {
          let bId: number = item.bodyB.id
          let bItem = this._game['_gameObjects'].find(go => {
            let colliders = go.getComponents(Collider)
            for (let c of colliders) {
              if (c.id == bId) {
                return true
              }
            }
            return false
          })
          if (bItem) {
            for (let go of this._game['_gameObjects']) {
              for (let comp of go.components) {
                if (typeof comp['onCollisionEnter'] == 'function') {
                  comp['onCollisionEnter'](bItem)
                }
              }
            }
          }
        }
      })
    }
  }
}