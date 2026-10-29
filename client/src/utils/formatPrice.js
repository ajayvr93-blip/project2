/**
 * Formats a number to Indian Rupee (INR) currency format
 * Example: 12999 -> "Rs 12,999" (or ₹12,999)
 * 
 * @param {number} amount - Numeric price value
 * @param {Object} [options] - Optional formatting options
 * @param {string} [options.prefix='Rs '] - Prefix symbol ('Rs ' or '₹')
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount, options = {}) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return 'Rs 0';
  }

  const { prefix = 'Rs ' } = options;

  // Indian number format: 1,00,000 style or standard en-IN
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(amount);

  return `${prefix}${formattedNumber}`;
};

export default formatPrice;
