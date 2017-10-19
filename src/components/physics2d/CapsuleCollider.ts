namespace Phoenix {
  export class CapsuleCollider extends Collider {

    public width: number = 1
    public height: number = 1

    public awake() {
      if (this.settings.physics.enabled) {
        this._body = Matter.Bodies.rectangle(
          this.transform.position.x * this.settings.game.units,
          this.transform.position.y * this.settings.game.units,
          this.width * this.settings.game.units * this.transform.scale * this.scale.x,
          this.height * this.settings.game.units * this.transform.scale * this.scale.y,
          (<any>window).deepmerge(this.bodySettings, {
            chamfer: {
              radius: this.height > this.width ?
                this.width * this.settings.game.units / 6 :
                this.height * this.settings.game.units / 6
            }
          })
        )

        Matter.World.add(this.game.physicsEngine2d.world, this._body)
      }
    }

  }
}