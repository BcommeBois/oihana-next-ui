/**
 * Language flag menu component.
 *
 * @module components/menus/FlagMenu
 */

import cn from '../../themes/helpers/cn' ;

import useLang  from '../../contexts/lang' ;
import useValue from '../../hooks/useValue' ;

import FlagItem from './FlagItem' ;

import getMenuClasses from '../../themes/navigation/menu' ;

import { XS }         from '../../themes/sizing/sizes' ;
import { HORIZONTAL } from '../../themes/enums/orientations' ;

/**
 * @param {Object} props
 * @param {string} [props.defaultLang] - Default language.
 * @param {string} [props.className] - Menu container classes.
 * @param {boolean} [props.disabled=false] - Disabled state.
 * @param {Object} [props.indicators] - Indicator states per language.
 * @param {string} [props.labelClassName] - Label classes.
 * @param {string} [props.lang] - Controlled language value.
 * @param {string} [props.menuClassName] - Items container classes.
 * @param {Function} [props.onChange] - Language change handler.
 * @param {string} [props.orientation] - Menu orientation.
 * @param {boolean} [props.showIndicator=true] - Show indicators.
 * @param {boolean} [props.showLabel=true] - Show language label.
 * @param {boolean} [props.showTooltip=true] - Show tooltips.
 * @param {string} [props.tooltipClassName] - Tooltip classes.
 * @param {string} [props.tooltipPosition] - Tooltip position.
 * @param {string} [props.size] - Menu size.
 * @returns {React.JSX.Element}
 */
const FlagMenu =
({
    defaultLang ,
    className ,
    disabled = false ,
    indicators ,
    labelClassName ,
    lang: langFromProps ,
    menuClassName ,
    onChange: onChangeFromProps ,
    orientation = HORIZONTAL ,
    showIndicator = true ,
    showLabel = true ,
    showTooltip = true ,
    tooltipClassName ,
    tooltipPosition ,
    size = XS ,
}) =>
{
    const { languages } = useLang() ;

    const [ lang , setLang ] = useValue( defaultLang , langFromProps , onChangeFromProps ) ;

    const menuClasses = getMenuClasses({
        beforeClassName: 'flex flex-row items-center justify-between bg-base-200/40 rounded space-x-1' ,
        className ,
        orientation ,
        size ,
    }) ;

    const labelClasses = cn(
        'flex px-2 text-xs uppercase' ,
        disabled && 'opacity-30' ,
        labelClassName ,
    ) ;

    const itemsClasses = cn( 'flex items-start space-x-1' , menuClassName ) ;

    if ( !languages || languages.length === 0 )
    {
        return null ;
    }

    return (
        <ul className={ menuClasses }>
            <div className={ itemsClasses }>
                {
                    languages.map( ( current , index ) =>
                    {
                        const hasIndicator = showIndicator && indicators?.[ current ] ;

                        return (
                            <FlagItem
                                key={ `item-${ index }` }
                                active={ current === lang }
                                disabled={ disabled }
                                lang={ current }
                                showIndicator={ hasIndicator }
                                showTooltip={ showTooltip }
                                tooltipClassName={ tooltipClassName }
                                tooltipPosition={ tooltipPosition }
                                onClick={ event =>
                                {
                                    event?.preventDefault() ;
                                    setLang( current ) ;
                                } }
                            />
                        ) ;
                    } )
                }
            </div>

            { showLabel && lang && (
                <div className={ labelClasses }>
                    { lang }
                </div>
            ) }
        </ul>
    ) ;
} ;

FlagMenu.displayName = 'FlagMenu' ;

export default FlagMenu ;