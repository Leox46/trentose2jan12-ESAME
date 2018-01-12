const area = require('./area');

/******** VALID INPUT ********/

test('getArea [3, 4] to equal 12', () => {
  expect(area([3, 4])).toBe(12);
});

/******* BOUNDARY VALUES ********/

test('getArea [0, 4] to equal 0', () => {
  expect(area([0, 4])).toBe(0);
});

test('getArea [4, 0] to equal 0', () => {
  expect(area([4, 0])).toBe(0);
});

test('getArea [0, 0] to equal 0', () => {
  expect(area([0, 0])).toBe(0);
});

test('getArea [1, "a"] to equal -1', () => {
  expect(area([1, "a"])).toBe(-1);
});

test('getArea ["a", 1] to equal -1', () => {
  expect(area(["a", 1])).toBe(-1);
});

/******** INVALID INPUT *********/

test('getArea [3] to equal -1', () => {
  expect(area([3])).toBe(-1);
});

test('getArea ["a"] to equal -1', () => {
  expect(area(["a"])).toBe(-1);
});

test('getArea ["a", "b"] to equal -1', () => {
  expect(area(["a", "b"])).toBe(-1);
});

test('getArea [2.8, 3.0] to equal -1', () => {
  expect(area([2.5, 3.0])).toBe(-1);
});
