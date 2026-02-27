'use client' ;

/**
 * Paragraph component.
 *
 * @module components/typography/Paragraph
 */

import Typography from './Typography' ;

/**
 * Paragraph with text styling support.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as] - Override element type.
 * @param {*} props.rest - All Typography props.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Paragraph
 *     align="justify"
 *     color="base-content"
 *     size="sm"
 *     className="mb-4"
 * >
 *     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * </Paragraph>
 *
 * <Paragraph className="[&_a]:text-primary [&_a]:underline">
 *     Text with <a href="#">styled links</a>.
 * </Paragraph>
 * ```
 */
const Paragraph = props => <Typography as="p" { ...props } />

Paragraph.displayName = 'Paragraph' ;

export default Paragraph ;