import format from 'vegas-js-core/src/strings/fastformat'

/**
 * Generates a formatter (function) to format an expression with the passed-in value.
 * @param {...*} values
 * @returns {function(*): string|string|*}
 */
const formatWithValue = ( ...values ) => expression => format( expression , ...values ) ;

export default formatWithValue ;