namespace Phoenix {
  export class Debug {
    public static log(message: any) {
      // TODO: Disable logging in production builds
      console.log(message)
    }
  }
}