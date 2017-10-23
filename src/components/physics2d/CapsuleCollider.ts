namespace Phoenix {
  export class CapsuleCollider extends Collider {

    public width: number = 1
    public height: number = 1

    public awake() {
      if (Game.settings.physics.enabled) {
        this._body = Matter.Bodies.rectangle(
          this.transform.position.x * Game.settings.game.units,
          this.transform.position.y * Game.settings.game.units,
          this.width * Game.settings.game.units * this.transform.scale * this.scale.x,
          this.height * Game.settings.game.units * this.transform.scale * this.scale.y,
          (<any>window).deepmerge(this.bodySettings, {
            chamfer: {
              radius: this.height > this.width ?
                this.width * Game.settings.game.units / 6 :
                this.height * Game.settings.game.units / 6
            }
          })
        )

        Matter.World.add(Game.physicsEngine2d.world, this._body)
      }
    }

  }
}