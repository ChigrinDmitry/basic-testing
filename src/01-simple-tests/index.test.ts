// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 4, action: Action.Subtract })).toBe(4);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 7, b: 3, action: Action.Multiply })).toBe(21);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 5, action: Action.Divide })).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(8)
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: 'invalid' as any })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '2' as any, b: 3, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: 2, b: '3' as any, action: Action.Add })).toBeNull();
  });
});
