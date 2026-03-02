/**
 * Divider component for DaisyUI.
 *
 * @module components/Divider
 * @see https://daisyui.com/components/divider
 *
 * @example
 * ```jsx
 * // Simple divider
 * <Divider />
 *
 * // With text
 * <Divider>OR</Divider>
 *
 * // Colored
 * <Divider color="primary">Section</Divider>
 * <Divider color="error" />
 *
 * // Vertical
 * <Divider orientation="vertical" />
 *
 * // Alignment
 * <Divider alignment="start">Start</Divider>
 * <Divider alignment="end">End</Divider>
 *
 * // Disabled (reduced opacity)
 * <Divider color="primary" disabled>Disabled</Divider>
 * ```
 */

import getDividerClassNames from '../themes/components/divider' ;

/**
 * @param {Object} props
 * @param {import('../themes/components/divider').DividerAlignment} [props.alignment] - Content alignment.
 * @param {React.ReactNode} [props.children] - Divider content (text, icon, etc.).
 * @param {string} [props.className] - Additional class name.
 * @param {import('../themes/components/divider').DividerColorValue} [props.color] - Divider color.
 * @param {boolean} [props.disabled] - Reduced opacity.
 * @param {import('../themes/components/divider').DividerOrientation} [props.orientation] - Layout orientation.
 */
const Divider =
({
    alignment ,
    children ,
    className ,
    color ,
    disabled ,
    orientation ,
}) =>
(
    <div
        className=
        {
            getDividerClassNames
            ({
                before : disabled ? { 'opacity-30' : true } : null ,
                className ,
                alignment ,
                color ,
                orientation ,
            })
        }
    >
        { children }
    </div>
) ;

export default Divider ;