import { GameObject } from './index'
import { Transform } from '../components/index'

export interface ComponentType<T extends Component> {
  new(gameObject: GameObject): T;
}

export class Component {
  protected gameObject: GameObject
  protected transform: Transform

  public constructor(gameObject: GameObject) {
    this.gameObject = gameObject
    this.transform = gameObject.transform
  }
}