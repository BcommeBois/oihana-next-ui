'use client' ;

/**
 * H6 heading component.
 *
 * @module component/typography/H6
 */

import Typography from './Typography' ;

/**
 * H6 heading with text styling support.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Override element type.
 * @param {*} props.rest - All Typography props.
 * @returns {React.JSX.Element}
 */
const H6 = props => <Typography as="h6" { ...props } />

H6.displayName = 'H6' ;

export default H6 ;