import { describe, it, expect } from 'vitest';
import { formatPrice } from './format-price';

describe('formatPrice', () => {
  it('formats number as USD', () => {
    expect(formatPrice(1234.5)).toBe('$1,234.50');
  });
});
