'use client' ;

/**
 * H3 heading component.
 *
 * @module component/typography/H3
 */

import Typography from './Typography' ;

/**
 * H3 heading with text styling support.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Override element type.
 * @param {*} props.rest - All Typography props.
 * @returns {React.JSX.Element}
 */
const H3 = props => <Typography as="h3" { ...props } />

H3.displayName = 'H3' ;

export default H3 ;