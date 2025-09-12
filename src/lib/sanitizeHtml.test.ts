import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from './sanitizeHtml';

describe('sanitizeHtml', () => {
  it('removes script tags and event handlers', () => {
    const dirty = '<img src=x onerror="alert(1)"><script>alert(2)</script>';
    const clean = sanitizeHtml(dirty);
    expect(clean).not.toContain('<script');
    expect(clean).not.toContain('onerror');
  });
});
