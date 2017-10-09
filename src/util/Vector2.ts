namespace Phoenix {
  export class Vector2 {
    public readonly x: number = 0
    public readonly y: number = 0

    public constructor(x: number, y: number) {
      this.x = x
      this.y = y
    }

    public add(...args: number[]) {
      if (isNaN(args[1])) {
        return new Vector2(this.x + args[0], this.y + args[0])
      } else if (args.length > 1) {
        return new Vector2(this.x + args[0], this.y + args[1])
      }
      return Vector2.zero
    }

    public minus(...args: number[]) {
      if (isNaN(args[1])) {
        return new Vector2(this.x - args[0], this.y - args[0])
      } else if (args.length > 1) {
        return new Vector2(this.x - args[0], this.y - args[1])
      }
      return Vector2.zero
    }

    public times(...args: number[]) {
      if (isNaN(args[1])) {
        return new Vector2(this.x * args[0], this.y * args[0])
      } else if (args.length > 1) {
        return new Vector2(this.x * args[0], this.y * args[1])
      }
      return Vector2.zero
    }

    public divide(...args: number[]) {
      if (isNaN(args[1])) {
        return new Vector2(this.x / args[0], this.y / args[0])
      } else if (args.length > 1) {
        return new Vector2(this.x / args[0], this.y / args[1])
      }
      return Vector2.zero
    }

    public static get zero(): Vector2 {
      return new Vector2(0, 0)
    }
    public static get one(): Vector2 {
      return new Vector2(1, 1)
    }
    public static get up(): Vector2 {
      return new Vector2(0, -1)
    }
    public static get down(): Vector2 {
      return new Vector2(0, 1)
    }
    public static get left(): Vector2 {
      return new Vector2(-1, 0)
    }
    public static get right(): Vector2 {
      return new Vector2(1, 0)
    }
  }
}