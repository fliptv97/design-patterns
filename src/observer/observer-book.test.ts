import { ClockTimer, DigitalClock } from "./observer-book";

afterEach(() => {
  jest.restoreAllMocks();
});

test("DigitalClock should update internal state on ClockTimer state update", () => {
  const timer = new ClockTimer();
  const clock = new DigitalClock(timer);

  const drawSpy = jest.spyOn(clock, "draw");

  expect(drawSpy).toHaveBeenCalledTimes(0);
  timer.tick();
  expect(drawSpy).toHaveBeenCalledTimes(1);
});
