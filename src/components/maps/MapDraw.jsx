'use client' ;

/**
 * Drawing and editing areas on the map.
 *
 * @module components/maps/MapDraw
 */

import { useCallback , useEffect , useRef , useState } from 'react' ;

import { MdCircle , MdCropSquare , MdHighlightAlt , MdPentagon } from 'react-icons/md' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import { fromDrawFeature , toDrawFeature } from '../../helpers/geo/fromDrawing' ;
import toCirclePolygon from '../../helpers/geo/toCirclePolygon' ;

import Button from '../Button' ;

import { useMapInstance } from './context' ;
import MapControl from './MapControl' ;

/** Terra Draw marks a shape still being drawn ; those are not results yet. */
const DRAWING = 'currentlyDrawing' ;

/** The mode that edits rather than draws. */
export const SELECT = 'select' ;

/**
 * The modes exposed, and what each one is for.
 *
 * Terra Draw offers a dozen — freehand, sector, sensor, marker, line. Only
 * these three write something `GeoShape` can hold, and offering the others
 * would let someone spend ten minutes on a shape that saving would lose.
 */
export const DRAW_MODES =
[
    { icon : MdPentagon   , mode : 'polygon' } ,
    { icon : MdCropSquare , mode : 'rectangle' } ,
    { icon : MdCircle     , mode : 'circle' } ,
] ;

/**
 * Draws and edits areas, and hands them back as `GeoShape`.
 *
 * **What comes out is what the store keeps.** `onChange` receives `GeoShape`
 * objects, not GeoJSON : that is what the back office holds, and
 * `parseGeoShape` converts the other way whenever a caller needs to. The
 * reverse — emitting GeoJSON and asking every application to translate — would
 * put the axis inversion in a dozen places instead of one.
 *
 * **A drawn circle goes back as a circle.** Terra Draw records what drew each
 * shape, and its circle mode keeps the radius, so « a four-kilometre radius
 * around the warehouse » survives the round trip instead of becoming
 * sixty-four numbers nobody can edit.
 *
 * **`defaultValue` seeds, it does not control.** A drawing surface holds the
 * user's work in progress ; pushing a new value into it mid-gesture would take
 * the shape out from under the hand drawing it. So the initial set is read
 * once, and `onChange` is how the outside keeps up.
 *
 * @param {Object} props
 * @param {string} [props.color] - Reserved for the drawing style. Terra Draw paints its own for now.
 * @param {Array} [props.defaultValue] - `GeoShape` objects to start from. Read once.
 * @param {string[]} [props.modes] - Which of `polygon`, `rectangle`, `circle` to offer.
 * @param {Function} [props.onChange] - `( shapes ) => void`, the whole set after every completed change.
 * @param {string} [props.path='components.map.draw'] - i18n path the button labels are read from.
 * @param {import('../../themes/components/map').MapControlPosition} [props.position='top-left'] - Corner of the toolbar.
 * @param {boolean} [props.showToolbar=true] - Draw the toolbar. `false` leaves the surface under external control.
 *
 * @example
 * ```jsx
 * <Map { ...centre } mapStyle={ style }>
 *     <MapDraw defaultValue={ zones } onChange={ setZones } />
 * </Map>
 * ```
 */
const MapDraw =
({
    defaultValue ,
    modes ,
    onChange ,
    path = 'components.map.draw' ,
    position = 'top-left' ,
    showToolbar = true ,
}) =>
{
    const map = useMapInstance() ;

    // Icon buttons, so every one of them needs a name : without it a screen
    // reader announces « button » four times over.
    const labels = useI18n( path , NO_LOCALE , false ) ;

    const nameOf = ( key , fallback ) => labels?.[ key ] ?? fallback ;

    const draw    = useRef( null ) ;
    const emit    = useRef( onChange ) ;

    // Captured at the first render and never again : re-seeding would erase
    // whatever is being drawn, so this is read once rather than watched. A ref
    // rather than a dependency the linter has to be argued out of.
    const seeded  = useRef( defaultValue ) ;
    const [ mode , setMode ] = useState( SELECT ) ;
    const [ ready , setReady ] = useState( false ) ;

    // The handler is read at event time rather than closed over, so a parent
    // re-rendering does not mean tearing the drawing surface down.
    emit.current = onChange ;

    const offered = ( modes ? DRAW_MODES.filter( ( entry ) => modes.includes( entry.mode ) ) : DRAW_MODES ) ;

    useEffect( () =>
    {
        if ( !map )
        {
            return ;
        }

        let instance = null ;
        let cancelled = false ;

        // Imported here rather than at the top : both packages are optional
        // peers, and a page that never draws should not pay for them.
        const load = async () =>
        {
            const [ terra , adapterModule ] = await Promise.all
            ([
                import( 'terra-draw' ) ,
                import( 'terra-draw-maplibre-gl-adapter' ) ,
            ]) ;

            if ( cancelled )
            {
                return ;
            }

            const {
                TerraDraw ,
                TerraDrawCircleMode ,
                TerraDrawPolygonMode ,
                TerraDrawRectangleMode ,
                TerraDrawSelectMode ,
            } = terra ;

            const editable = { feature : { draggable : true , coordinates : { draggable : true , deletable : true } } } ;

            instance = new TerraDraw({
                adapter : new adapterModule.TerraDrawMapLibreGLAdapter( { map } ) ,
                modes   :
                [
                    new TerraDrawPolygonMode() ,
                    new TerraDrawRectangleMode() ,
                    new TerraDrawCircleMode() ,
                    new TerraDrawSelectMode({ flags : { circle : editable , polygon : editable , rectangle : editable } }) ,
                ] ,
            }) ;

            instance.start() ;
            instance.setMode( SELECT ) ;

            const seeds = ( seeded.current ?? [] )
                .map( ( shape ) => toDrawFeature( shape , { circleToPolygon : toCirclePolygon } ) )
                .filter( Boolean ) ;

            if ( seeds.length )
            {
                instance.addFeatures( seeds ) ;
            }

            const publish = () =>
            {
                const shapes = instance.getSnapshot()
                    // A shape still being drawn is not a result : emitting it
                    // would hand the parent a half-finished polygon per vertex.
                    .filter( ( feature ) => !feature?.properties?.[ DRAWING ] )
                    .map( fromDrawFeature )
                    .filter( Boolean ) ;

                emit.current?.( shapes ) ;
            } ;

            instance.on( 'finish' , publish ) ;
            instance.on( 'change' , ( _ , type ) => { if ( type !== 'styling' ) { publish() ; } } ) ;

            draw.current = instance ;
            setReady( true ) ;
        } ;

        void load() ;

        return () =>
        {
            cancelled = true ;
            setReady( false ) ;
            draw.current = null ;
            instance?.stop() ;
        } ;
    }
    , [ map ] ) ;

    const choose = useCallback( ( next ) =>
    {
        if ( !draw.current )
        {
            return ;
        }

        draw.current.setMode( next ) ;
        setMode( next ) ;
    }
    , [] ) ;

    if ( !showToolbar )
    {
        return null ;
    }

    return (
        <MapControl position={ position }>
            <Button
                className = "shadow-md"
                color     = { mode === SELECT ? 'primary' : undefined }
                disabled  = { !ready }
                icon      = { MdHighlightAlt }
                onClick   = { () => choose( SELECT ) }
                shape     = "square"
                size      = "sm"
                title     = { nameOf( SELECT , 'Select and edit' ) }
            />

            {
                offered.map( ( entry ) => (
                    <Button
                        className = "shadow-md"
                        color     = { mode === entry.mode ? 'primary' : undefined }
                        disabled  = { !ready }
                        icon      = { entry.icon }
                        key       = { entry.mode }
                        onClick   = { () => choose( entry.mode ) }
                        shape     = "square"
                        size      = "sm"
                        title     = { nameOf( entry.mode , entry.mode ) }
                    />
                ) )
            }
        </MapControl>
    ) ;
} ;

MapDraw.displayName = 'MapDraw' ;

export default MapDraw ;
