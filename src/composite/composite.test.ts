import { Group, Button } from "./composite-own";

test("should properly render", () => {
  const dialogGroup = new Group("dialog");
  const closeButton = new Button("X");

  dialogGroup.add(closeButton);

  const submitGroup = new Group("submit");
  const submitButton = new Button("Submit");
  const resetButton = new Button("Reset");

  submitGroup.add(submitButton);
  submitGroup.add(resetButton);
  dialogGroup.add(submitGroup);

  const expected = `Group(dialog) -> Button(X)
Group(dialog) -> Group(submit) -> Button(Submit)
Group(dialog) -> Group(submit) -> Button(Reset)`;

  expect(dialogGroup.render()).toBe(expected);
});
