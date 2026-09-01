'use client' ;

/**
 * A bubble anchored to a place on the map.
 *
 * @module components/maps/MapPopup
 */

import { MdClose } from 'react-icons/md' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import { withoutPointFields } from '../../helpers/geo/pointFields' ;

import cn from '../../themes/helpers/cn' ;

import { getMapPopupClassNames } from '../../themes/components/map' ;
import getButtonClassNames from '../../themes/components/button' ;

import { Popup } from './engine' ;

/** MapLibre caps a popup at 240px, which is narrow for anything but a sentence. */
const DEFAULT_MAX_WIDTH = '320px' ;

/**
 * A bubble that belongs to the map rather than to the page.
 *
 * **It is anchored to coordinates, not to an element.** That is the whole
 * difference with `Popover`, which follows a DOM node : during a pan the marker
 * moves continuously, and only the engine can keep a bubble glued to its
 * ground. `Modal` answers a different question again — this one says « what is
 * this point », a modal says « let us work on it ».
 *
 * **Anything goes inside.** A `Card`, a `Button`, an image, a sentence. The
 * engine's own padding is removed so the content decides its own, which is what
 * lets a `Card` sit in it without a frame inside a frame.
 *
 * **The close button is ours**, not the engine's : same cross, same accessible
 * name and same behaviour as `Modal` and `Popover`, rather than a third one
 * that looks almost like them.
 *
 * @param {Object} props
 * @param {string} [props.anchor] - Which side hangs from the point — `top`, `bottom`, `left`, `right`, and the corners. Chosen by the engine when omitted.
 * @param {React.ReactNode} props.children - What the bubble holds.
 * @param {string} [props.className] - Classes on the bubble.
 * @param {boolean} [props.closeOnClick=true] - Close when the map is clicked elsewhere.
 * @param {boolean} [props.closeOnMove=false] - Close as soon as the map moves.
 * @param {string} [props.closeLabel] - Name of the cross. Defaults to the i18n `close` key read at `path`.
 * @param {string} [props.contentClassName] - Classes on the inner box.
 * @param {number} props.latitude - Latitude in WGS 84.
 * @param {number} props.longitude - Longitude in WGS 84.
 * @param {string|number} [props.maxWidth='320px'] - Ceiling on the bubble's width.
 * @param {number[]} [props.offset] - Pixels between the point and the bubble, so a marker is not covered.
 * @param {Function} [props.onClose] - Called when the bubble closes, however it closed.
 * @param {string} [props.path='components.alert'] - i18n path the close label is read from.
 * @param {boolean} [props.showCloseButton=true] - Draw the cross.
 *
 * @example
 * ```jsx
 * <Map { ...centre } mapStyle={ style }>
 *     <MapMarker { ...point } onClick={ () => setOpen( site ) } />
 *
 *     { open && (
 *         <MapPopup { ...fromSchema( open ) } onClose={ () => setOpen( null ) }>
 *             <Card>…</Card>
 *         </MapPopup>
 *     ) }
 * </Map>
 * ```
 */
const MapPopup =
({
    anchor ,
    children ,
    className ,
    closeLabel ,
    closeOnClick = true ,
    closeOnMove = false ,
    contentClassName ,
    latitude ,
    longitude ,
    maxWidth = DEFAULT_MAX_WIDTH ,
    offset ,
    onClose ,
    path = 'components.alert' ,
    showCloseButton = true ,
    ...rest
}) =>
{
    // The same key `Alert` reads : one cross, one name, one translation.
    const { close : closeFromI18n = 'Close' } = useI18n( path , NO_LOCALE , false ) ;

    const closeText = closeLabel ?? closeFromI18n ;

    if ( !Number.isFinite( latitude ) || !Number.isFinite( longitude ) )
    {
        return null ;
    }

    return (
        <Popup
            anchor       = { anchor }
            className    = { getMapPopupClassNames({ className }) }
            closeButton  = { false }
            closeOnClick = { closeOnClick }
            closeOnMove  = { closeOnMove }
            latitude     = { latitude }
            longitude    = { longitude }
            maxWidth     = { typeof maxWidth === 'number' ? `${ maxWidth }px` : maxWidth }
            offset       = { offset }
            onClose      = { onClose }
            { ...withoutPointFields( rest ) }
        >
            <div className={ cn( 'relative' , contentClassName ) }>
                {
                    showCloseButton && onClose && (
                        <button
                            aria-label = { closeText }
                            className  = { getButtonClassNames({
                                beforeClassName : 'absolute end-1 top-1 z-10 shrink-0 text-current hover:bg-current/10' ,
                                shape           : 'circle' ,
                                size            : 'xs' ,
                                style           : 'ghost' ,
                            })}
                            onClick    = { onClose }
                            title      = { closeText }
                            type       = "button"
                        >
                            <MdClose aria-hidden="true" className="size-4" />
                        </button>
                    )
                }

                { children }
            </div>
        </Popup>
    ) ;
} ;

MapPopup.displayName = 'MapPopup' ;

export default MapPopup ;
