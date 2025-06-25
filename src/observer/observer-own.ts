class Subject {
  protected _observers = new Set<WeakRef<Observer<Subject>>>();

  attach(observer: Observer<Subject>): void {
    for (const observerRef of this._observers) {
      if (observerRef.deref() === observer) return;
    }

    this._observers.add(new WeakRef(observer));
  }

  detach(observer: Observer<Subject>): void {
    for (const observerRef of this._observers) {
      if (observerRef.deref() === observer) {
        this._observers.delete(observerRef);
        return;
      }
    }
  }

  notify(): void {
    for (const observerRef of this._observers) {
      const observer = observerRef.deref();

      if (!observer) {
        this._observers.delete(observerRef);
        continue;
      }

      observer.update();
    }
  }
}

export class ConcreteSubject extends Subject {
  private _state = 0;

  public get state() {
    return this._state;
  }

  public set state(newState: number) {
    this._state = newState;
    this.notify();
  }
}

abstract class Observer<T extends Subject> {
  protected _subject: T;

  constructor(subject: T) {
    this._subject = subject;
    this._subject.attach(this);
  }

  abstract update(): void;
}

export class ConcreteObserver extends Observer<ConcreteSubject> {
  private _state = 0;

  constructor(subject: ConcreteSubject) {
    super(subject);
  }

  get state() {
    return this._state;
  }

  update(): void {
    this._state = this._subject.state;
    this.log();
  }

  log(): void {
    console.log("ConcreteObserver.log:", this._state);
  }
}
