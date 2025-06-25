import { ConcreteSubject, ConcreteObserver } from "./observer-own";

test("Observer should update state on Subject state update", () => {
  const subject = new ConcreteSubject();
  const observer = new ConcreteObserver(subject);

  expect(observer.state).toBe(0);
  subject.state = 69;
  expect(observer.state).toBe(69);
});
