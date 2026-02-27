'use client' ;

/**
 * Loading component for DaisyUI.
 *
 * @module components/Loading
 * @see https://daisyui.com/components/loading
 *
 * @example
 * ```jsx
 * import Loading from '@/components/Loading';
 *
 * // Default (ring, primary, lg)
 * <Loading />
 *
 * // Custom animation
 * <Loading animation="spinner" />
 * <Loading animation="dots" />
 * <Loading animation="bars" />
 *
 * // Colors
 * <Loading color="error" />
 * <Loading color="success" animation="dots" />
 *
 * // Sizes
 * <Loading size="xs" />
 * <Loading size="xl" animation="ball" color="info" />
 * ```
 */

import getLoadingClassNames , { RING } from '@/themes/components/loading' ;

/**
 * @param {Object} props
 * @param {import('@/themes/components/loading').LoadingAnimation} [props.animation='ring'] - Animation style.
 * @param {string} [props.className] - Additional class name.
 * @param {import('../colors/textColor').TextColor} [props.color='primary'] - Loading color.
 * @param {import('@/themes/components/loading').LoadingSize} [props.size='lg'] - Loading size.
 */
const Loading =
({
    animation = RING ,
    className ,
    color = 'base-content' ,
    size = 'lg' ,
}) =>
(
    <span
        className = { getLoadingClassNames({
            animation ,
            className ,
            color     ,
            size
        }) }
    />
) ;

export default Loading ;