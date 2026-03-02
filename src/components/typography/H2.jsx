'use client' ;

/**
 * H2 heading component.
 *
 * @module component/typography/H2
 */

import Typography from './Typography' ;

/**
 * H2 heading with text styling support.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Override element type.
 * @param {*} props.rest - All Typography props.
 * @returns {React.JSX.Element}
 */
const H2 = props => <Typography as="h2" { ...props } />

H2.displayName = 'H2' ;

export default H2 ;