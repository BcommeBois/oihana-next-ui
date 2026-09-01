'use client' ;

/**
 * Searching from inside the map.
 *
 * @module components/maps/MapSearch
 */

import { useCallback , useState } from 'react' ;

import { MdSearch } from 'react-icons/md' ;

import fromSchema from '../../helpers/geo/fromSchema' ;

import Button from '../Button' ;

import InputAddressSearch from '../inputs/InputAddressSearch' ;

import Modal    from '../modals/Modal' ;
import useModal from '../modals/hooks/useModal' ;

import { useMapInstance } from './context' ;
import MapControl from './MapControl' ;

export const INLINE = 'inline' ;
export const MODAL  = 'modal' ;

/** Close enough to read a street name off the result. */
const DEFAULT_ZOOM = 15 ;

/**
 * A search field the map carries itself.
 *
 * It is `InputAddressSearch` in a `MapControl`, and nothing more — which is
 * the point : the geocoder is still injected, so the same field searches
 * addresses at the BAN or **your own customers in your own data**, depending on
 * the function it is given. Both answer `Place` objects, and neither is the
 * library's business.
 *
 * **Two shapes, and the reason is not taste.** The map frame clips its
 * contents, so on a short map the suggestion list is cut off at the bottom
 * edge — five suggestions do not fit under 320 pixels of height. `inline` is
 * what a wide map wants ; `modal` is what a short one, or a phone, needs. The
 * dialog opens in the browser's top layer, which no `overflow` can clip.
 *
 * @param {Object} props
 * @param {boolean} [props.fly=true] - Bring the map to the chosen place.
 * @param {Function} props.geocode - `( query , { signal } ) => Promise<Place[]>`.
 * @param {string} [props.label] - Accessible name of the button that opens the field.
 * @param {Function} [props.onSelect] - `( place , point ) => void`.
 * @param {import('../../themes/components/map').MapControlPosition} [props.position='top-left'] - Corner the control sits in.
 * @param {Object} [props.searchProps] - Spread onto the `InputAddressSearch`.
 * @param {string} [props.title] - Title of the dialog, in `modal` shape.
 * @param {'inline'|'modal'} [props.variant='inline'] - Field in the corner, or behind a button.
 * @param {number} [props.zoom=15] - Zoom used when flying to a result.
 *
 * @example
 * ```jsx
 * <Map { ...centre } mapStyle={ style }>
 *     <MapSearch geocode={ ban } onSelect={ setPlace } />
 * </Map>
 * ```
 *
 * @example
 * ```jsx
 * // The same field, over your own records rather than an address service.
 * <MapSearch geocode={ searchCustomers } variant="modal" />
 * ```
 */
const MapSearch =
({
    fly = true ,
    geocode ,
    label = 'Rechercher' ,
    onSelect ,
    position = 'top-left' ,
    searchProps ,
    title ,
    variant = INLINE ,
    zoom = DEFAULT_ZOOM ,
}) =>
{
    const map = useMapInstance() ;

    const { close , modalRef , open } = useModal() ;

    const [ expanded , setExpanded ] = useState( false ) ;

    const choose = useCallback( ( place ) =>
    {
        const point = fromSchema( place ) ;

        if ( fly && map && point )
        {
            map.flyTo( { center : [ point.longitude , point.latitude ] , zoom } ) ;
        }

        onSelect?.( place , point ) ;

        // The answer has been given : leave the map visible rather than keeping
        // a field open over the very thing it was asked about.
        setExpanded( false ) ;
        close() ;
    }
    , [ close , fly , map , onSelect , zoom ] ) ;

    const field = (
        <InputAddressSearch
            geocode  = { geocode }
            onSelect = { choose }
            { ...searchProps }
        />
    ) ;

    if ( variant === MODAL )
    {
        return (
            <>
                <MapControl position={ position }>
                    <Button
                        className = "shadow-md"
                        icon      = { MdSearch }
                        onClick   = { open }
                        shape     = "square"
                        size      = "sm"
                        title     = { label }
                    />
                </MapControl>

                <Modal maxWidth="max-w-xl" ref={ modalRef } showFooter={ false } title={ title ?? label }>
                    <div className="py-4">{ field }</div>
                </Modal>
            </>
        ) ;
    }

    return (
        <MapControl className="w-auto" position={ position }>
            {
                expanded
                    ? <div className="w-72 max-w-[70vw]">{ field }</div>
                    : (
                        <Button
                            className = "shadow-md"
                            icon      = { MdSearch }
                            onClick   = { () => setExpanded( true ) }
                            shape     = "square"
                            size      = "sm"
                            title     = { label }
                        />
                    )
            }
        </MapControl>
    ) ;
} ;

MapSearch.displayName = 'MapSearch' ;

export default MapSearch ;
