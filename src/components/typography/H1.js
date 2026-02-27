'use client' ;

/**
 * H1 heading component.
 *
 * @module component/typography/H1
 */

import Typography from './Typography' ;

/**
 * H1 heading with text styling support.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Override element type.
 * @param {*} props.rest - All Typography props.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <H1
 *     align="center"
 *     color="primary"
 *     size="4xl"
 *     weight="bold"
 * >
 *     Main Title
 * </H1>
 *
 * <H1 as="div" className="mb-4">Simple Title</H1>
 * ```
 */
const H1 = props => <Typography as="h1" { ...props } />

H1.displayName = 'H1' ;

export default H1 ;