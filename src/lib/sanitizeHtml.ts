import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML to prevent XSS vulnerabilities.
 * Uses DOMPurify to remove any malicious content.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}
