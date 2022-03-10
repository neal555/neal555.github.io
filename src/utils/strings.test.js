import { resizeString } from "./strings";

test("run resizeStrings", () => {
  const resizedString = resizeString("My long string", 5);
  const resizedString2 = resizeString("hello", 5);
  const resizedString3 = resizeString();
  expect(resizedString).toHaveLength(6);
  expect(resizedString2).toBe("hello");
  expect(resizedString3).toBe("NO_STRING");
});
