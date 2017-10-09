// import { Mouse } from '.'
namespace Phoenix {
  export enum ButtonState { None, Pressed, Released }

  export class Button {
    public readonly button: number
    public isDown: boolean = false
    public state: ButtonState = ButtonState.None;

    public constructor(button: number) {
      this.button = button
    }

    public static get None(): Button { return Mouse.instance.getItem(-1) }
    public static get Left(): Button { return Mouse.instance.getItem(0) }
    public static get Middle(): Button { return Mouse.instance.getItem(1) }
    public static get Right(): Button { return Mouse.instance.getItem(2) }
  }
}