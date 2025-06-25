// Abstract classes
abstract class Subject {
  attach(observer: Observer): void {
    this._observers.push(observer);
  }

  detach(observer: Observer): void {
    this._observers = this._observers.filter((o) => o !== observer);
  }

  notify(): void {
    this._observers.forEach((observer) => {
      observer.update(this);
    });
  }

  private _observers: Observer[] = [];
}

abstract class Observer {
  public abstract [Symbol.dispose](): void;
  public abstract update(subject: Subject): void;

  protected constructor() {}
}

// Concrete subject
export class ClockTimer extends Subject {
  getHour(): number {
    return 0;
  }

  getMinute(): number {
    return 0;
  }

  getSecond(): number {
    return 0;
  }

  tick(): void {
    this.notify();
  }
}

// Concrete observer
export class DigitalClock extends Observer {
  private _subject: ClockTimer;

  constructor(subject: ClockTimer) {
    super();

    this._subject = subject;
    this._subject.attach(this);
  }

  public override [Symbol.dispose]() {
    this._subject.detach(this);
  }

  public override update(changedSubject: Subject): void {
    if (changedSubject === this._subject) {
      this.draw();
    }
  }

  public draw(): void {
    // draw clock using updated subject
  }
}
