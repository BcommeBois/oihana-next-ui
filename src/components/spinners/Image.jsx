'use client' ;

import Spinner from './Spinner' ;

import './styles/image.css' ;

/**
 * Image landscape animation spinner.
 * Displays a simplified landscape (mountain and sun) with animated elements.
 *
 * @param {Object} props
 * @param {string} [props.backgroundColor] - Background color from theme (default: base-100)
 * @param {string} [props.color] - Landscape elements color from theme (default: base-content)
 * @param {string} [props.tag='spinner-image'] - CSS class name
 * @param {Object} [props.rest] - Additional props forwarded to Spinner
 *
 * @example
 * // Default image spinner
 * <Image />
 *
 * @example
 * // With custom colors
 * <Image backgroundColor="primary" color="primary-content" />
 *
 * @example
 * // Large with accent colors
 * <Image backgroundColor="accent" color="accent-content" size="lg" />
 */
const Image =
({
   backgroundColor = 'base-100',
   borderColor = 'primary',
   color = 'base-200',
   tag = 'spinner-image',
   ...rest
}) => (
    <Spinner
        backgroundColor = { backgroundColor }
        borderColor     = { borderColor }
        color           = { color }
        tag             = { tag }
        {...rest}
    />
);

Image.displayName = 'Image' ;

export default Image ;