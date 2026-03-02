'use client' ;

/**
 * H4 heading component.
 *
 * @module component/typography/H4
 */

import Typography from './Typography' ;

/**
 * H4 heading with text styling support.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Override element type.
 * @param {*} props.rest - All Typography props.
 * @returns {React.JSX.Element}
 */
const H4 = props => <Typography as="h4" { ...props } />

H4.displayName = 'H4' ;

export default H4 ;