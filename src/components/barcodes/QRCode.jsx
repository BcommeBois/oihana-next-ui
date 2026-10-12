'use client' ;

import { useEffect , useMemo , useRef } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import encodeQRCode , { QUIET_ZONE } from '../../helpers/barcodes/encodeQRCode' ;
import matrixToPath                  from '../../helpers/barcodes/matrixToPath' ;

/**
 * The preset sizes, in pixels.
 *
 * @type {Object.<string,number>}
 */
export const QR_CODE_SIZES =
{
    xs : 64 ,
    sm : 96 ,
    md : 128 ,
    lg : 192 ,
    xl : 256 ,
} ;

export const FULL = 'full' ;

/**
 * QRCode — a text drawn as a QR code, in SVG.
 *
 * The grid comes from {@link module:helpers/barcodes/encodeQRCode} and is drawn
 * by {@link module:helpers/barcodes/matrixToPath} — the same path the SVG
 * export writes, so what is shown is exactly what
 * {@link module:helpers/barcodes/matrixToSvg} and
 * {@link module:helpers/barcodes/matrixToPng} produce.
 *
 * 🔑 **The light plate belongs to the code, not to the theme.** The background
 * is a rectangle inside the SVG, dark on light by default : drawn in the theme's
 * colours, the code would read light-on-dark in a dark theme, and many scanners
 * refuse an inverted code.
 *
 * 🔑 **The quiet zone is not a margin to trim.** Four modules by default, as the
 * standard asks : without it a code reads at a desk and fails in a warehouse.
 *
 * 🚨 **The accessible name never defaults to the content.** A code may carry a
 * secret — a two-factor enrolment — that must not be read aloud. It says « QR
 * code » unless `ariaLabel` says more.
 *
 * Renders nothing for an empty value. A value too long for a QR code renders
 * nothing either and calls `onError` : a page does not fall over for one image.
 * To warn before that, {@link module:helpers/barcodes/measureQRCode} measures a
 * text against the capacity without encoding it.
 *
 * @module components/barcodes/QRCode
 *
 * @example
 * ```jsx
 * <QRCode value="https://example.com" />
 *
 * // Larger, denser, with its own name
 * <QRCode value={ url } size="lg" ecc="high" ariaLabel="Link to the order" />
 *
 * // As wide as its container
 * <QRCode value={ url } size="full" className="max-w-xs" />
 *
 * // A size in pixels, and colours of its own
 * <QRCode value={ url } size={ 220 } foreground="#1e3a8a" background="#eff6ff" />
 * ```
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - The accessible name. Defaults to the i18n `label` key read at `path`, then `'QR code'`.
 * @param {?string} [props.background='#ffffff'] - The light colour, any CSS colour ; `null` leaves it transparent.
 * @param {string} [props.className] - Additional classes on the `<svg>`.
 * @param {'low'|'medium'|'quartile'|'high'} [props.ecc='medium'] - The error correction level : 7, 15, 25 or 30 % of the modules restored.
 * @param {string} [props.foreground='#000000'] - The dark colour, any CSS colour.
 * @param {Function} [props.onError] - `( error ) => void`, called when the value cannot be encoded. Past the capacity of a QR code, `error`
 *        is a {@link module:helpers/barcodes/QRCodeCapacityError} carrying `mode`, `length`, `capacity` and `ecc`.
 * @param {string} [props.path='components.barcode.qrCode'] - i18n path the default label is read from.
 * @param {number} [props.quietZone=4] - The margin around the code, in modules (at least 1).
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'full'|number} [props.size='md'] - A preset (64 to 256 px), a number of pixels, or `'full'` for the width of the container.
 * @param {string} props.value - The text to encode : UTF-8, accents and emoji kept.
 */
const QRCode =
({
    ariaLabel ,
    background = '#ffffff' ,
    className ,
    ecc        = 'medium' ,
    foreground = '#000000' ,
    onError ,
    path       = 'components.barcode.qrCode' ,
    quietZone  = QUIET_ZONE ,
    size       = 'md' ,
    value ,

    ...rest
}) =>
{
    const { label = 'QR code' } = useI18n( path , NO_LOCALE , false ) ;

    const empty = value === null || value === undefined || value === '' ;

    const { error , matrix } = useMemo( () =>
    {
        if ( empty )
        {
            return {} ;
        }

        try
        {
            return { matrix : encodeQRCode( value , { ecc , quietZone } ) } ;
        }
        catch ( exception )
        {
            return { error : exception } ;
        }
    }
    , [ ecc , empty , quietZone , value ] ) ;

    const d = useMemo( () => matrixToPath( matrix ) , [ matrix ] ) ;

    const onErrorRef = useRef( onError ) ;

    useEffect( () =>
    {
        onErrorRef.current = onError ;
    }
    , [ onError ] ) ;

    useEffect( () =>
    {
        if ( error )
        {
            onErrorRef.current?.( error ) ;
        }
    }
    , [ error ] ) ;

    if ( !matrix )
    {
        return null ;
    }

    const modules = matrix.length ;

    const full   = size === FULL ;
    const pixels = typeof size === 'number' ? size : ( QR_CODE_SIZES[ size ] ?? QR_CODE_SIZES.md ) ;

    return (
        <svg
            aria-label     = { ariaLabel ?? label }
            className      = { cn( 'block' , full && 'h-auto w-full' , className ) }
            height         = { full ? undefined : pixels }
            role           = "img"
            shapeRendering = "crispEdges"
            viewBox        = { `0 0 ${ modules } ${ modules }` }
            width          = { full ? undefined : pixels }
            xmlns          = "http://www.w3.org/2000/svg"
            { ...rest }
        >
            { background && <rect fill={ background } height="100%" width="100%" /> }
            <path d={ d } fill={ foreground } />
        </svg>
    ) ;
} ;

QRCode.displayName = 'QRCode' ;

export default QRCode ;
