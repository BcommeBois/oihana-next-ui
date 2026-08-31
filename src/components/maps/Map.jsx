'use client' ;

/**
 * Map component built on MapLibre GL.
 *
 * @module components/maps/Map
 */

import { useCallback , useState } from 'react' ;

import MapInstanceContext from './context' ;

import { MapGL } from './engine' ;

import MapControls from './MapControls' ;
import MapFrame    from './MapFrame' ;

const DEFAULT_ZOOM = 13 ;

/** Collapses the engine's credit into a single button that expands on click. */
export const COMPACT = 'compact' ;

/**
 * Decides who prints the source credit — the engine, this component, or nobody.
 *
 * MapLibre's own control is the one that gets it right : it reads the
 * attribution from the style's sources *and* from the TileJSON those sources
 * point to, which is where a provider usually declares it. OpenFreeMap does
 * exactly that, and its style file alone shows nothing — which is why the frame
 * must not print a credit of its own unless it is asked to, or the same data
 * ends up credited twice.
 *
 * `false` silences both. It is allowed because a page may carry the credit
 * elsewhere ; ODbL still requires it somewhere.
 *
 * @param {*} attribution
 * @returns {{ control : *, label : * }}
 */
export const resolveAttribution = ( attribution ) =>
{
    if ( attribution == null )
    {
        return { control : undefined , label : null } ;
    }

    if ( attribution === false )
    {
        return { control : false , label : null } ;
    }

    if ( attribution === true )
    {
        return { control : { compact : false } , label : null } ;
    }

    if ( attribution === COMPACT )
    {
        return { control : { compact : true } , label : null } ;
    }

    return { control : false , label : attribution } ;
} ;

/**
 * Reads the `mapStyle` prop.
 *
 * It accepts a plain URL today, and `{ light , dark }` is already allowed
 * through so the shape does not have to change the day the map follows the
 * theme. Until that lot lands the light half is what gets used — the object
 * form is a promise about the API, not a working feature yet.
 *
 * @param {string|Object} mapStyle
 * @returns {string|Object|undefined}
 */
export const resolveMapStyle = ( mapStyle ) =>
{
    if ( mapStyle && typeof mapStyle === 'object' && ( mapStyle.light || mapStyle.dark ) )
    {
        return mapStyle.light ?? mapStyle.dark ;
    }

    return mapStyle ;
} ;

/**
 * Converts a named box into the engine's corner pair.
 *
 * Four named edges rather than two arrays : `[[ 2.2 , 48.8 ] , [ 2.4 , 48.9 ]]`
 * is four numbers in an order nothing on the page states, and getting it wrong
 * draws a valid map of the wrong place.
 *
 * @param {{ north : number , south : number , east : number , west : number }} bounds
 * @returns {number[][]|null}
 */
const toCorners = ( bounds ) =>
{
    if ( !bounds )
    {
        return null ;
    }

    const { east , north , south , west } = bounds ;

    return [ east , north , south , west ].every( Number.isFinite )
        ? [ [ west , south ] , [ east , north ] ]
        : null ;
} ;

/**
 * A map.
 *
 * **Position is flat — `latitude` and `longitude`** — which is what
 * `fromSchema` returns and what the engine's own components take, so a point
 * spreads straight in : `<Map { ...fromSchema( place ) } />`. Nothing between
 * the payload and the screen has to name an axis twice, and nothing anywhere
 * near this component handles a bare coordinate array, which is where the
 * classic latitude/longitude swap comes from.
 *
 * **The viewport is uncontrolled.** The centre and zoom given here are the
 * ones the map opens on ; changing them afterwards does not move it. That is
 * the right contract for showing a place, and the wrong one for editing it —
 * so a picker moves the map through the ref instead (`ref.current.flyTo( … )`),
 * and a controlled viewport arrives with the lot that needs one.
 *
 * **Anything not exposed goes through `mapProps`**, spread last onto the
 * engine's `Map` — the same escape hatch the charts keep with `nivoProps`.
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Text alternative for the frame.
 * @param {string|number} [props.aspect] - CSS aspect ratio. Takes precedence over `height`.
 * @param {React.ReactNode|boolean|'compact'} [props.attribution] - Source credit. Omitted, the engine prints its own ; `'compact'` collapses it to a button, `true` forces it open, `false` removes it, and a node replaces it.
 * @param {{ north : number , south : number , east : number , west : number }} [props.bounds] - Opening box. Takes precedence over the centre.
 * @param {React.ReactNode} [props.children] - Markers, popups, layers.
 * @param {string} [props.className] - Additional classes on the frame.
 * @param {boolean|Object} [props.controls=true] - `true` for zoom and compass, `false` for none, or `{ fullscreen , navigation , scale }`.
 * @param {boolean} [props.empty] - Force the empty state.
 * @param {string} [props.emptyLabel] - Title of the empty state.
 * @param {React.ReactNode} [props.emptyState] - Replaces the empty state entirely.
 * @param {number|string} [props.height=400] - Height in px or any CSS length.
 * @param {boolean} [props.interactive=true] - Allow pan, zoom and rotation.
 * @param {number} [props.latitude] - Opening latitude.
 * @param {number} [props.longitude] - Opening longitude.
 * @param {boolean} [props.loading=false] - Show a skeleton instead of the map.
 * @param {Object} [props.mapProps] - Spread last onto the engine's `Map`.
 * @param {Function} [props.onLoad] - Called once the map has loaded, with the engine's event.
 * @param {string|{ light : string , dark : string }} props.mapStyle - Style URL. Required — a map without one has nothing to draw.
 * @param {number|string} [props.maxHeight] - Ceiling on the frame's height.
 * @param {Object} [props.ref] - Ref on the map instance (`flyTo`, `fitBounds`, …), not on the frame.
 * @param {number} [props.zoom=13] - Opening zoom.
 *
 * @example
 * ```jsx
 * <Map { ...fromSchema( place ) } mapStyle={ style } ariaLabel="Where the warehouse is">
 *     <MapMarker { ...fromSchema( place ) } title={ place.name } />
 * </Map>
 * ```
 *
 * @example
 * ```jsx
 * // A quiet map : no controls, no interaction — a picture that happens to be a map.
 * <Map { ...point } mapStyle={ style } controls={ false } interactive={ false } height={ 220 } />
 * ```
 */
// biome-ignore lint/suspicious/noShadowRestrictedNames: every map library names this component `Map`, and the module never uses the built-in.
const Map =
({
    ariaDescribedBy ,
    ariaLabel ,
    ariaLabelledBy ,
    aspect ,
    attribution ,
    bounds ,
    children ,
    className ,
    controls = true ,
    empty ,
    emptyLabel ,
    emptyProps ,
    emptyState ,
    height ,
    interactive = true ,
    latitude ,
    longitude ,
    loading = false ,
    mapProps ,
    mapStyle ,
    maxHeight ,
    onLoad ,
    ref ,
    zoom = DEFAULT_ZOOM ,
    ...rest
}) =>
{
    const [ instance , setInstance ] = useState( null ) ;

    const style   = resolveMapStyle( mapStyle ) ;
    const corners = toCorners( bounds ) ;
    const credit  = resolveAttribution( attribution ) ;

    // The instance is published on load rather than on mount : `getBounds` and
    // the rest answer earlier, but a child that moves the map before the style
    // has arrived moves nothing.
    const handleLoad = useCallback( ( event ) =>
    {
        setInstance( event.target ) ;
        onLoad?.( event ) ;
    }
    , [ onLoad ] ) ;
    const located = Number.isFinite( latitude ) && Number.isFinite( longitude ) ;

    // Two ways of having nothing to draw, and they send whoever reads the frame
    // looking in two different places — a missing style is a configuration
    // problem, a missing point is a data one.
    const missingStyle = !style ;
    const isEmpty      = empty ?? ( missingStyle || ( !located && !corners ) ) ;

    const initialViewState = corners
        ? { bounds : corners }
        : { latitude , longitude , zoom } ;

    return (
        <MapFrame
            ariaDescribedBy = { ariaDescribedBy }
            ariaLabel       = { ariaLabel }
            ariaLabelledBy  = { ariaLabelledBy }
            aspect          = { aspect }
            attribution     = { credit.label }
            className       = { className }
            empty           = { isEmpty }
            emptyLabel      = { emptyLabel ?? ( missingStyle ? 'No map style' : 'No location' ) }
            emptyProps      = { emptyProps }
            emptyState      = { emptyState }
            height          = { height }
            loading         = { loading }
            maxHeight       = { maxHeight }
            { ...rest }
        >
            {
                !isEmpty && !loading && (
                    <MapGL
                        attributionControl = { credit.control }
                        initialViewState   = { initialViewState }
                        interactive        = { interactive }
                        mapStyle           = { style }
                        onLoad             = { handleLoad }
                        ref                = { ref }
                        { ...mapProps }
                    >
                        <MapInstanceContext value={ instance }>
                            <MapControls controls={ controls } />
                            { children }
                        </MapInstanceContext>
                    </MapGL>
                )
            }
        </MapFrame>
    ) ;
} ;

Map.displayName = 'Map' ;

export default Map ;
