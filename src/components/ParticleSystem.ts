namespace Phoenix {
  export class ParticleSystem extends Component {

    public duration: number = 5
    public maxParticles: number = 200
    public rateOverTime: number = 10

    public time: number = 0

    public start() {
      // setInterval(() => {
      // let p = this.instantiate(Particle, this.transform.position)
      //   //   this.destroy(p, 1000)
      // }, 500)
    }

    public update() {
      // if (this.game.time % 0.5 == 0) {
      // console.log(this.game.time)
      let p = this.instantiate(Particle, this.transform.position)
      if (p) {
        p.transform.parent = this.transform
      }
      // }
    }
  }
}