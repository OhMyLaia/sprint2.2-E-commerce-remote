import { sum } from "../main.js";
test("sum 1 + 2 must be 3", () => {
    expect(sum(1,2)).toBe(3);
});

import { validatePassword } from "../main.js";

test("validatePassword must be a function", () => {
    expect(typeof validatePassword).toBe("function");
});

test("validatePassword must have an argument", () => {
    expect(() => validatePassword()).toThrowError();
});

test("password must have 8 digits minimum", () => {
    expect(() => validatePassword("abc")).toThrowError();
});

test("password must have one capital letter minimum", () => {
    expect(() => validatePassword("abcdefghijk")). toThrowError();
});


