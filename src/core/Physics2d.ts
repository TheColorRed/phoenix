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
      this._game = game
      this._engine = Matter.Engine.create(undefined, {
        positionIterations: 10,
        velocityIterations: 10
      })
      Matter.Engine.run(this._engine)

      Matter.Events.on(this.world, 'collisionStart', e => {
        for (let item of e.source.pairs.list) {
          for (let i = 0; i < this._game['_gameObjects'].length; i++) {
            let obj = this._game['_gameObjects'][i]
            let comps = obj.getComponents(Collider)
            for (let comp of comps) {
              if (item.bodyB == comp.body) {
                // Run Collision code here
              }
            }
          }
        }
      })
    }
  }
}