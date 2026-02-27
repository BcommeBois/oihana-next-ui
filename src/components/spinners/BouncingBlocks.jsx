'use client' ;

import Spinner from './Spinner' ;

import './styles/bouncing-blocks.css' ;

/**
 * BouncingBlocks animation spinner.
 * Displays two blocks that fall, bounce, squash and rotate.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color='base-100'] - Large block color from theme
 * @param {string} [props.secondaryColor='error'] - Small block color from theme
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-bouncing-blocks'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 *
 * @example
 * // Default bouncing blocks spinner
 * <BouncingBlocks />
 *
 * @example
 * // With custom colors
 * <BouncingBlocks color="primary" secondaryColor="accent" />
 *
 * @example
 * // White and blue blocks
 * <BouncingBlocks color="base-100" secondaryColor="info" />
 */
const BouncingBlocks =
({
    as,
    className,
    color = 'base-100', // Utilisé comme primary-color
    secondaryColor = 'error', // Sera passé via borderColor pour la résolution
    style,
    tag = 'spinner-bouncing-blocks',
    ref,
    ...rest
}) =>
{
    return (
        <Spinner
            as={as}
            className={className}
            color={color}
            borderColor={secondaryColor}
            ref={ref}
            style={style}
            tag={tag}
            {...rest}
        />
    );
};

BouncingBlocks.displayName = 'BouncingBlocks' ;

export default BouncingBlocks ;