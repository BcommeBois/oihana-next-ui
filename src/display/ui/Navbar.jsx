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

            <div className={ cn( NAVBAR_START , 'gap-2 mx-1' ) }>
                { left }
                <Link
                    className = "text-md font-heading"
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

                <FullscreenButton />

                <LangDropDown/>

                <ThemeButton />

                { right }

            </div>

        </Component>
    ) ;
} ;

export default Navbar ;