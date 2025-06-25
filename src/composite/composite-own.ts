export abstract class Component {
  abstract render(path: string): string;

  abstract add(component: Component): void;
  abstract remove(component: Component): void;
}

export class Group extends Component {
  private _children: Component[] = [];
  private _name: string;

  constructor(name: string) {
    super();

    this._name = name;
  }

  get name() {
    return this._name;
  }

  override render(path: string = ""): string {
    const prefix = path === "" ? "" : `${path} -> `;

    return this._children
      .map((child) => child.render(`${prefix}Group(${this._name})`))
      .join("\n");
  }

  override add(component: Component): void {
    this._children.push(component);
  }

  override remove(component: Component): void {
    this._children = this._children.filter((child) => child !== component);
  }
}

export class Button extends Component {
  private _content: string;

  constructor(content: string) {
    super();

    this._content = content;
  }

  get content() {
    return this._content;
  }

  override render(path: string = ""): string {
    return `${path === "" ? "" : `${path} -> `}Button(${this._content})`;
  }

  override add(): void {}
  override remove(): void {}
}
