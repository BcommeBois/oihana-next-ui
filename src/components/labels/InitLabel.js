import cn from '@/themes/helpers/cn' ;

import getParsedElement from '@/themes/components/helpers/getParsedElement' ;

/**
 * Generic label component with HTML support.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names.
 * @param {React.ElementType} [props.as='div'] - Component to render.
 * @param {string} [props.defaultClassName] - Default class names.
 * @param {React.ReactNode} [props.children] - Label content.
 * @param {boolean} [props.html=false] - Parse children as HTML.
 *
 * @returns {React.ReactElement | null}
 *
 * @example
 * ```jsx
 * // Plain text
 * <InitLabel>Hello world</InitLabel>
 *
 * // Parse as HTML
 * <InitLabel html={true}>{'<b>Hello</b> world'}</InitLabel>
 * ```
 */
const InitLabel =
({
     className,
     as ,
     defaultClassName,
     children,
     html,
}) =>
{
    const Component  = as ?? 'div' ;
    const classNames = cn( defaultClassName , className ) ;
    const element    = getParsedElement( children , html ) ;

    return element ? <Component className={classNames}>{element}</Component> : null ;
} ;

export default InitLabel ;