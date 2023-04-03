
export function pdfToCdf(pdf: number[]) {
  if (pdf.length == 0)
    return [];
  var cdf = [pdf[0]];
  for (let i = 1; i < pdf.length; i++) {
    cdf[i] = cdf[i - 1] + pdf[i];
  }
  return cdf;
}

export function draw(y: number[], offset = 0) {
  var x: number[] = [];
  for (let i = 0; i < y.length; i++)
    x.push(i + offset);
  return x;
}

export function roundSigfig(num: number, sigfigs: number = 4): string {
  if (Math.abs(num) <= 2 * Number.EPSILON) {
    return `0.00`;
  }
  const leadingDigits = Math.ceil(Math.log10(Math.abs(num)));
  const trailingDigits = leadingDigits > sigfigs ? 0 : sigfigs - leadingDigits;
  return `${num.toFixed(trailingDigits)}`;
}

export function clamp(num: number, min?: number, max?: number) {
  if (min !== undefined && max !== undefined) {
    return Math.min(Math.max(num, min), max);
  }
  if (min !== undefined) {
    return Math.max(num, min);
  }
  if (max !== undefined) {
    return Math.min(num, max);
  }
  return num;
}
