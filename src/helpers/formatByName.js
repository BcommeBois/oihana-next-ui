/**
 * Format a value with a formatter defined with a specific property in a formatter definition.
 * @example
 *
 * const formatWithValue = value => expression => format( expression , value ) ;
 *
 * const formatters =
 * {
 *     title : formatWithValue( 'world' ) ;
 * }
 *
 * const format = formatByName( formatters ) ;
 *
 * console.log( format( 'title' , 'hello {0}' ) ; // hello world
 *
 * @param formatters
 * @returns {function(*, *): *}
 */
const formatByName = formatters => ( name , value , ...options ) => formatters?.[name]?.apply?.( null , [ value , ...options ] ) ?? value ;

export default formatByName ;