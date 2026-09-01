'use client' ;

/**
 * A marker drawn in the DOM, styled from the theme.
 *
 * @module components/maps/MapMarker
 */

import { MdPlace } from 'react-icons/md' ;

import useNativeClick from '../../hooks/useNativeClick' ;

import readableOn from '../../helpers/colors/readableOn' ;

import { withoutPointFields } from '../../helpers/geo/pointFields' ;

import cn from '../../themes/helpers/cn' ;

import { getMapMarkerClassNames } from '../../themes/components/map' ;

import { Marker } from './engine' ;

/**
 * A marker at a point.
 *
 * **It is DOM, not a vector layer.** A layer would hold tens of thousands of
 * points, but its look would be written in the engine's style spec — out of
 * reach of Tailwind and of the theme tokens, and impossible to keep in step
 * with the rest of the library. In the DOM a marker is an ordinary element :
 * it takes `color` and `size` like a `Badge`, follows the theme into dark
 * mode, and can be replaced outright by `children`. The trade is the count —
 * a few hundred, not a few thousand.
 *
 * The props are `latitude` and `longitude`, flat, which is exactly what
 * `fromSchema` returns : `<MapMarker { ...fromSchema( place ) } />`.
 *
 * **A clickable marker is a real button.** Not a div with a handler : it has
 * to be reachable by keyboard and announced as actionable, and `title` is what
 * names it — a marker whose only label is its colour says nothing to a screen
 * reader.
 *
 * **🚨 Its click is handled on the button and goes no further.** A marker is a
 * DOM element *inside* the map's own container, so a click on it reaches the
 * map too — and the map reads that as « the user clicked elsewhere », closing
 * the very popup the marker just opened. React's `onClick` cannot prevent it :
 * delegated to the root, it runs after every native listener on the way up. So
 * the handler is native, on the element, where stopping actually stops.
 *
 * **A `background` overrides `color`**, for a colour that comes from the data
 * rather than from the theme — a route or a category carrying its own hex. The
 * text is then computed against it by contrast, a hex having no `-content` pair
 * to lean on, exactly as a cluster bubble does.
 *
 * @param {Object} props
 * @param {string} [props.background] - Fill as a colour value. Wins over `color`.
 * @param {React.ReactNode} [props.children] - Replaces the default pin entirely. Position and events still apply.
 * @param {string} [props.className] - Additional classes on the pin.
 * @param {import('../../themes/components/map').MapMarkerColor} [props.color='primary'] - Pin color.
 * @param {React.ElementType} [props.Icon=MdPlace] - Icon drawn inside the pin.
 * @param {string} [props.iconClassName] - Additional classes on the icon.
 * @param {number} props.latitude - Latitude in WGS 84.
 * @param {number} props.longitude - Longitude in WGS 84.
 * @param {Function} [props.onClick] - Makes the marker a button.
 * @param {boolean} [props.showIcon=true] - Show/hide the icon inside the pin.
 * @param {import('../../themes/components/map').MapMarkerSize} [props.size='md'] - Pin size.
 * @param {string} [props.title] - Accessible name, and the pointer tooltip.
 *
 * @example
 * ```jsx
 * <MapMarker { ...fromSchema( place ) } color="error" title={ place.name } />
 * ```
 */
const MapMarker =
({
    background ,
    children ,
    className ,
    color ,
    Icon = MdPlace ,
    iconClassName ,
    latitude ,
    longitude ,
    onClick ,
    showIcon = true ,
    size ,
    title ,
    ...rest
}) =>
{
    const clickRef = useNativeClick( onClick ) ;

    if ( !Number.isFinite( latitude ) || !Number.isFinite( longitude ) )
    {
        return null ;
    }

    // Same as `Map` : a spread point brings its elevation, its accuracy and its
    // source along, and none of them is a marker option.
    const domProps = withoutPointFields( rest ) ;

    const painted = !!background ;

    const pinClassName = getMapMarkerClassNames({ className , color : painted ? null : color , interactive : !!onClick , size }) ;

    const pinStyle = painted ? { background , color : readableOn( background ) } : undefined ;

    const inner = children ?? ( showIcon && Icon && (
        <Icon aria-hidden="true" className={ cn( 'size-2/3' , iconClassName ) } />
    ) ) ;

    const pin = onClick
        ? (
            <button
                aria-label = { title }
                className  = { pinClassName }
                ref        = { clickRef }
                style      = { pinStyle }
                title      = { title }
                type       = "button"
            >
                { inner }
            </button>
        )
        : title
            ? (
                <div aria-label={ title } className={ pinClassName } role="img" style={ pinStyle } title={ title }>
                    { inner }
                </div>
            )
            : (
                <div className={ pinClassName } style={ pinStyle }>
                    { inner }
                </div>
            ) ;

    return (
        <Marker
            latitude  = { latitude }
            longitude = { longitude }
            { ...domProps }
        >
            { pin }
        </Marker>
    ) ;
} ;

MapMarker.displayName = 'MapMarker' ;

export default MapMarker ;
