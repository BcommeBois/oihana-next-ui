'use client' ;

/**
 * H5 heading component.
 *
 * @module component/typography/H5
 */

import Typography from './Typography' ;

/**
 * H5 heading with text styling support.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Override element type.
 * @param {*} props.rest - All Typography props.
 * @returns {React.JSX.Element}
 */
const H5 = props => <Typography as="h5" { ...props } />

H5.displayName = 'H5' ;

export default H5 ;