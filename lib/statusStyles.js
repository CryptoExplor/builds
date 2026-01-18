/**
 * Centralized status badge styles
 * Used across ToolCard, ToolDetail, and other components
 */

export const STATUS_STYLES = {
  production: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
    full: 'bg-green-500/10 text-green-400 border-green-500/20'
  },
  beta: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    full: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  alpha: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    border: 'border-yellow-500/20',
    full: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  },
  paused: {
    bg: 'bg-gray-500/10',
    text: 'text-gray-400',
    border: 'border-gray-500/20',
    full: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  }
}

/**
 * Get full status badge class string
 * @param {string} status - One of: alpha, beta, production, paused
 * @returns {string} Tailwind classes for status badge
 */
export function getStatusClass(status) {
  return STATUS_STYLES[status]?.full || STATUS_STYLES.paused.full
}

/**
 * Get individual status style properties
 * @param {string} status - One of: alpha, beta, production, paused
 * @returns {Object} Object with bg, text, border properties
 */
export function getStatusStyles(status) {
  return STATUS_STYLES[status] || STATUS_STYLES.paused
}
