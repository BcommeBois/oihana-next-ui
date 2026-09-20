/**
 * Navbar component for DaisyUI.
 *
 * @module components/Navbar
 * @see https://daisyui.com/components/navbar
 */

'use client' ;


import cn from '../../themes/helpers/cn'

import LangDropDown     from '../../components/dropDowns/LangDropDown';
import Link             from '../../components/links/Link';
import FullscreenButton from '../../components/buttons/FullscreenButton';
import ThemeButton      from '../../components/buttons/ThemeButton';

import useConfig from '../../contexts/config/useConfig' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import getNavbarClassNames ,
{
    NAVBAR_START ,
    NAVBAR_CENTER ,
    NAVBAR_END ,
}
from '../../themes/components/navbar' ;

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as='nav'] - Root element type.
 * @param {import('../../themes/colors/backgroundColor').BackgroundColor} [props.backgroundColor] - Background color.
 * @param {React.ReactNode} [props.center] - Center section content.
 * @param {React.ReactNode} [props.children] - Children (replaces default layout).
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.configPath='navbar'] - Config context path.
 * @param {Object} [props.controls] - Visibility of the three end-section controls, keyed `fullscreen`, `lang` and `theme`. Each value is `true` (shown, the default), `false` (not rendered), or a class name applied to a wrapper — `'hidden lg:inline-flex'` keeps a control off a hand-held screen without this component knowing the application's breakpoint. Ignored when `children` replaces the layout.
 * @param {React.ReactNode} [props.left] - Extra content in the start section.
 * @param {import('../layout/position').PositionValue} [props.position] - CSS position.
 * @param {React.Ref} [props.ref] - Forwarded ref.
 * @param {React.ReactNode} [props.right] - Extra content in the end section.
 * @param {import('../../themes/filters/shadow').ShadowValue} [props.shadow] - Box shadow.
 * @param {string} [props.titleClassName] - The additional title class names.
 */
const Navbar =
({
     as : Component ,
     backgroundColor : backgroundColorProp,
     center ,
     children ,
     className : classNameProp ,
     configPath = 'ui.navbar' ,
     controls ,
     left ,
     position : positionProp ,
     ref ,
     right ,
     shadow  : shadowProp ,
     titleClassName : titleClassNameProp ,
     ...rest
 }) =>
{
    const {
        backgroundColor = backgroundColorProp ,
        className       = classNameProp ,
        position        = positionProp ,
        shadow          = shadowProp ,
        titleClassName  = titleClassNameProp ,
    }
    = useConfig( configPath ) ?? {} ;

    Component = Component ?? 'nav' ;

    /**
     * Renders one end-section control according to its `controls` entry :
     * absent or `true` renders it, `false` drops it, and a string wraps it so
     * the caller can hide it at a width of its own choosing.
     *
     * @param {string} key - `fullscreen`, `lang` or `theme`.
     * @param {React.ReactElement} control
     * @returns {?React.ReactElement}
     */
    const renderControl = ( key , control ) =>
    {
        const setting = controls?.[ key ] ?? true ;

        if ( setting === false ) { return null ; }

        return typeof setting === 'string'
            ? <span key={ key } className={ setting }>{ control }</span>
            : control ;
    } ;

    const { title } = useI18n() ;

    const classNames = getNavbarClassNames
    ({
        backgroundColor ,
        className ,
        position ,
        shadow ,
    }) ;

    if ( children )
    {
        return (
            <Component className={ classNames } ref={ ref } { ...rest }>
                { children }
            </Component>
        ) ;
    }

    // <LinkButton href="/">

    return (
        <Component className={ classNames } ref={ ref } { ...rest }>

            {/* `min-w-0` and `truncate` together : a flex item refuses to
                shrink below its content unless it is told it may, so without
                the first the long title pushes the controls off the bar
                instead of being cut. `truncate` sits on the ANCHOR, which the
                flex container blockifies : on the inline span inside, the
                ellipsis has no box to clip against and the text runs over the
                controls. */}
            <div className={ cn( NAVBAR_START , 'gap-2 mx-1 min-w-0' ) }>
                { left }
                <Link
                    className = "text-md font-heading min-w-0 truncate"
                    href      = "/"
                >
                    <span className={ titleClassName }>
                        { title }
                    </span>
                </Link>
            </div>

            { !!center && (
                <div className={ NAVBAR_CENTER }>
                    { center }
                </div>
            ) }

            <div className={ cn(  NAVBAR_END , 'gap-1 mx-2' ) }>

                { renderControl( 'fullscreen' , <FullscreenButton tooltipAlign="end" tooltipPosition="bottom" /> ) }

                { renderControl( 'lang' , <LangDropDown tooltipAlign="end" tooltipPosition="bottom" /> ) }

                { renderControl( 'theme' , <ThemeButton tooltipAlign="end" tooltipPosition="bottom" /> ) }

                { right }

            </div>

        </Component>
    ) ;
} ;

export default Navbar ;