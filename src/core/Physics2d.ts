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
      const args = [
        `\n %c %c %c matter.js ${(<any>window).Matter['version']} %c  %c  http://brm.io/matter-js/  %c \n\n`,
        'background: #76f09b; padding:5px 0;',
        'background: #76f09b; padding:5px 0;',
        'color: #76f09b; background: #030307; padding:5px 0;',
        'background: #76f09b; padding:5px 0;',
        'background: #bfefce; padding:5px 0;',
        'background: #76f09b; padding:5px 0;',
      ];
      window.console.log.apply(console, args);
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
          let aId: number = (<Matter.Body>item.bodyA).id
          let bId: number = (<Matter.Body>item.bodyB).id
          if (aId == bId) continue
          let go = this._game['_gameObjects'].find(go => {
            let colliders = go.getComponents(Collider)
            for (let c of colliders) {
              if (c.id == bId && aId != c.id) {
                return true
              }
            }
            return false
          })
          if (go) {
            for (let comp of go.components) {
              if (typeof comp['onCollisionEnter'] == 'function') {
                comp['onCollisionEnter'](go)
              }
            }
          }
        }
      })
    }
  }
}