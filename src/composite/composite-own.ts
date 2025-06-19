abstract class Component {
  abstract render(path: string): void;

  abstract add(component: Component): void;
  abstract remove(component: Component): void;
}

class Group extends Component {
  private _children: Component[] = [];
  private _name: string;

  constructor(name: string) {
    super();

    this._name = name;
  }

  get name() {
    return this._name;
  }

  override render(path: string = "") {
    const prefix = path === "" ? "" : `${path} -> `;

    this._children.forEach((child) => {
      child.render(`${prefix}Group(${this._name})`);
    });
  }

  override add(component: Component) {
    this._children.push(component);
  }

  override remove(component: Component): void {
    this._children = this._children.filter((child) => child !== component);
  }
}

class Button extends Component {
  private _content: string;

  constructor(content: string) {
    super();

    this._content = content;
  }

  get content() {
    return this._content;
  }

  override render(path: string = ""): void {
    console.log(`${path === "" ? "" : `${path} -> `}Button(${this._content})`);
  }

  override add(_: Component): void {}
  override remove(_: Component): void {}
}

// Usage Example
const dialogGroup = new Group("dialog");
const closeButton = new Button("X");

dialogGroup.add(closeButton);

const submitGroup = new Group("submit");
const submitButton = new Button("Submit");
const resetButton = new Button("Reset");

submitGroup.add(submitButton);
submitGroup.add(resetButton);
dialogGroup.add(submitGroup);

dialogGroup.render();
