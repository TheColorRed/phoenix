namespace Phoenix {
  export class Debug {
    public static log(message: any, ...params: any[]) {
      // TODO: Disable logging in production builds
      console.log(message, ...params)
    }
    public static error(message: any, ...params: any[]) {
      // TODO: Disable logging in production builds
      console.error(message, ...params)
    }
    public static warning(message: any, ...params: any[]) {
      // TODO: Disable logging in production builds
      console.warn(message, ...params)
    }
  }
}