import { evaluateExpression, prepareExpression } from '../src/calc';

describe('calculator helpers', () => {
  test('basic arithmetic and precedence', () => {
    expect(evaluateExpression('2+3*4')).toBe(14);
    expect(evaluateExpression('2^3')).toBe(8);
  });

  test('square root and logs', () => {
    expect(evaluateExpression('sqrt(9)')).toBe(3);
    expect(evaluateExpression('log(100)')).toBe(2);
    expect(evaluateExpression('ln(e)')).toBeCloseTo(1);
  });

  test('parentheses and negative numbers', () => {
    expect(evaluateExpression('-(3-5)')).toBe(2);
    expect(evaluateExpression('(2+3)*(4-1)')).toBe(15);
  });

  test('trig degree vs radian', () => {
    expect(evaluateExpression('sin(30)', 'DEG')).toBeCloseTo(0.5);
    expect(evaluateExpression('cos(60)', 'DEG')).toBeCloseTo(0.5);
    expect(evaluateExpression('sin(pi/2)', 'RAD')).toBeCloseTo(1);
    expect(evaluateExpression('tan(pi/4)', 'RAD')).toBeCloseTo(1);
  });

  test('constants substitution', () => {
    expect(evaluateExpression('pi')).toBeCloseTo(Math.PI);
    expect(evaluateExpression('e')).toBeCloseTo(Math.E);
  });

  test('prepareExpression swaps functions and constants', () => {
    const prepared = prepareExpression('sin(30)+sqrt(4)+pi', 'DEG');
    expect(prepared).toContain('degSin(');
    expect(prepared).toContain('Math.sqrt(');
    expect(prepared).toContain('Math.PI');
  });

  test('invalid expressions throw', () => {
    expect(() => evaluateExpression('2++')).toThrow();
    expect(() => evaluateExpression('sin(')).toThrow();
  });

  test('empty expression returns empty string', () => {
    expect(evaluateExpression('')).toBe('');
  });
});
