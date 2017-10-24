namespace Phoenix {
  export class Physics2d {

    protected _engine: Matter.Engine

    public get world(): Matter.World { return this._engine.world }

    public static create() {
      /**
       * TODO:
       * - Disable the creation of two 2d physics engines in the same game
       * - Return the current engine if it already exists
       */
      return new Physics2d()
    }

    private constructor() {
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
      this._engine = Matter.Engine.create(undefined, {
        positionIterations: 10,
        velocityIterations: 10
      })
      this.world.gravity.x = Game.settings.physics.gravity.x
      this.world.gravity.y = Game.settings.physics.gravity.y
      Matter.Engine.run(this._engine)

      Matter.Events.on(this._engine, 'collisionStart', e => {
        for (let item of e.source.pairs.list) {
          let aId: number = (<Matter.Body>item.bodyA).id
          let bId: number = (<Matter.Body>item.bodyB).id
          if (aId == bId) continue
          let go = Game.gameObjects.find(go => {
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
              if (typeof (<any>comp)['onCollisionEnter'] == 'function') {
                (<any>comp)['onCollisionEnter'](go)
              }
            }
          }
        }
      })
    }

    public static raycastAll(origin: Vector2, end: Vector2, excludeSelf: boolean = true): GameObject[] {
      let gameObjects: GameObject[] = []
      let bodies = Matter.Query.ray(Matter.Composite.allBodies(
        Game.physicsEngine2d.world),
        origin.times(Game.settings.game.units),
        end.times(Game.settings.game.units)
      )
      return this._gamesObjectFromBodies(bodies)
    }

    public static raycast(origin: Vector2, direction: Vector2, excludeSelf: boolean = true): GameObject | null {
      let objs = this.raycastAll(origin, direction, excludeSelf)
      return objs.length > 0 ? objs[0] : null
    }

    /**
     * A rectangular area to check for existing bodies
     *
     * @static
     * @param {Vector2} pointA Top left corner
     * @param {Vector2} pointB Bottom right corner
     * @memberof Physics2d
     */
    public static overlapAreaAll(pointA: Vector2, pointB: Vector2): GameObject[] {
      pointA = pointA.times(Game.settings.game.units)
      pointB = pointB.times(Game.settings.game.units)
      let bodies = Matter.Query.region(
        Matter.Composite.allBodies(Game.physicsEngine2d.world),
        Matter.Bounds.create([
          { x: pointA.x, y: pointA.y },
          { x: pointA.x + pointB.x, y: pointA.y },
          { x: pointA.x + pointB.x, y: pointA.y + pointB.y },
          { x: pointA.x, y: pointA.y + pointB.y }
        ])
      )
      return this._gamesObjectFromBodies(bodies)
    }

    public static overlapArea(pointA: Vector2, pointB: Vector2): GameObject | null {
      let objs = this.overlapAreaAll(pointA, pointB)
      return objs.length > 0 ? objs[0] : null
    }

    private static _gamesObjectFromBodies(bodies: any): GameObject[] {
      let gameObjects: GameObject[] = []
      bodies.forEach((b: any) => {
        let body: Matter.Body = b.body || b
        let foundgameObjects = Game.gameObjects.filter(go => {
          let colliders = go.getComponents(Collider)
          for (let collider of colliders) {
            if (collider.id == body.id) return true
          }
          return false
        })
        gameObjects.push(...foundgameObjects)
      })
      return gameObjects
    }
  }
}