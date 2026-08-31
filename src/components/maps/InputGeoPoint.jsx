'use client' ;

/**
 * Two coordinates and a map, editing the same point.
 *
 * @module components/maps/InputGeoPoint
 */

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import useValue from '../../hooks/useValue' ;

import cn from '../../themes/helpers/cn' ;

import InputCoordinate , { LATITUDE , LONGITUDE } from '../inputs/InputCoordinate' ;

import MapPicker from './MapPicker' ;

/**
 * A position, edited from either end.
 *
 * **Two ways in, one value.** Type into a field or drag the marker : both write
 * the same `{ latitude , longitude }`, and each follows the other. The field
 * only lets go of what it holds when it loses focus — `48.8` is not yet a
 * latitude, and a marker jumping at every keystroke would be unusable.
 *
 * **A half-filled point draws nothing.** Fill one field and the map stays where
 * it was, with no marker : a point at `48.85 , 0` is a real place off the coast
 * of Ghana, and showing it would be an invention.
 *
 * **It lives with the maps rather than with the inputs**, although it is a form
 * control, because it carries the map engine with it. `components/inputs` has
 * no dependency and must keep none — `InputCoordinate`, which is the same field
 * without the map, is over there.
 *
 * @param {Object} props
 * @param {string} [props.className] - Classes on the container.
 * @param {{ latitude : number , longitude : number }} [props.defaultValue] - Initial point, uncontrolled.
 * @param {number} [props.digits=6] - Decimals shown in the fields.
 * @param {boolean} [props.disabled] - Disable both fields.
 * @param {string|number} [props.height=320] - Map height.
 * @param {string} [props.latitudeLabel] - Defaults to the i18n `latitude` key read at `path`.
 * @param {string} [props.longitudeLabel] - Defaults to the i18n `longitude` key read at `path`.
 * @param {Object} [props.mapProps] - Spread onto the `MapPicker` — `latitude` and `longitude` say where it opens before a point exists.
 * @param {string} props.mapStyle - Style URL, required by the map.
 * @param {Function} [props.onChange] - `( { latitude , longitude } ) => void`.
 * @param {string} [props.path='components.input.geoPoint'] - i18n path the labels are read from.
 * @param {boolean} [props.showMap=true] - Draw the map. `false` leaves the two fields alone.
 * @param {{ latitude : number , longitude : number }} [props.value] - Controlled point.
 *
 * @example
 * ```jsx
 * <InputGeoPoint mapStyle={ style } value={ point } onChange={ setPoint } />
 * ```
 */
const InputGeoPoint =
({
    className ,
    defaultValue ,
    digits ,
    disabled ,
    height = 320 ,
    latitudeLabel ,
    longitudeLabel ,
    mapProps ,
    mapStyle ,
    onChange ,
    path = 'components.input.geoPoint' ,
    showMap = true ,
    value : valueFromProps ,
    ...rest
}) =>
{
    const {
        latitude  : latitudeFromI18n  = 'Latitude' ,
        longitude : longitudeFromI18n = 'Longitude' ,
    }
    = useI18n( path , NO_LOCALE , false ) ;

    const [ point , setPoint ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const set = ( axis ) => ( number ) => setPoint({ ...point , [ axis ] : number }) ;

    return (
        <div className={ cn( 'flex flex-col gap-3' , className ) } { ...rest }>

            <div className="grid gap-3 sm:grid-cols-2">
                <InputCoordinate
                    axis     = { LATITUDE }
                    digits   = { digits }
                    disabled = { disabled }
                    label    = { latitudeLabel ?? latitudeFromI18n }
                    onChange = { set( LATITUDE ) }
                    value    = { point?.latitude ?? null }
                />
                <InputCoordinate
                    axis     = { LONGITUDE }
                    digits   = { digits }
                    disabled = { disabled }
                    label    = { longitudeLabel ?? longitudeFromI18n }
                    onChange = { set( LONGITUDE ) }
                    value    = { point?.longitude ?? null }
                />
            </div>

            {
                showMap && (
                    <MapPicker
                        height    = { height }
                        mapStyle  = { mapStyle }
                        onChange  = { setPoint }
                        value     = { point ?? null }
                        { ...mapProps }
                    />
                )
            }

        </div>
    ) ;
} ;

InputGeoPoint.displayName = 'InputGeoPoint' ;

export default InputGeoPoint ;
