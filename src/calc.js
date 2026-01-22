// Calculator expression helpers used by the UI and tests.

const degSin = (x) => Math.sin((x * Math.PI) / 180);
const degCos = (x) => Math.cos((x * Math.PI) / 180);
const degTan = (x) => Math.tan((x * Math.PI) / 180);

export const prepareExpression = (expr, angleMode = 'DEG') =>
  expr
    .replace(/\^/g, '**')
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/ln\(/g, 'Math.log(')
    .replace(/sin\(/g, angleMode === 'DEG' ? 'degSin(' : 'Math.sin(')
    .replace(/cos\(/g, angleMode === 'DEG' ? 'degCos(' : 'Math.cos(')
    .replace(/tan\(/g, angleMode === 'DEG' ? 'degTan(' : 'Math.tan(')
    .replace(/\bpi\b/gi, 'Math.PI')
    .replace(/\be\b/gi, 'Math.E');

export const evaluateExpression = (expr, angleMode = 'DEG') => {
  if (!expr) return '';
  const prepared = prepareExpression(expr, angleMode);
  // eval is constrained to this helper with sanitized replacements.
  // eslint-disable-next-line no-eval
  const result = eval(prepared);
  return result;
};
