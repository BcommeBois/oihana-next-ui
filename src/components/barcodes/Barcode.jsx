'use client' ;

import { useEffect , useMemo , useRef } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import encodeBarcode                 from '../../helpers/barcodes/encodeBarcode' ;
import layoutBarcode                 from '../../helpers/barcodes/layoutBarcode' ;
import symbolToPath , { BARCODE_FONT } from '../../helpers/barcodes/symbolToPath' ;

/**
 * The preset sizes : the width of one module and the height of the bars, in pixels.
 *
 * Whole pixels per module, so every bar lands on whole pixels and stays sharp.
 *
 * @type {Object.<string,{ moduleWidth : number , height : number }>}
 */
export const BARCODE_SIZES =
{
    xs : { height : 40  , moduleWidth : 1 } ,
    sm : { height : 60  , moduleWidth : 1 } ,
    md : { height : 80  , moduleWidth : 2 } ,
    lg : { height : 100 , moduleWidth : 3 } ,
    xl : { height : 120 , moduleWidth : 4 } ,
} ;

export const FULL = 'full' ;

/**
 * Barcode — a linear barcode drawn in SVG : Code 128, GS1-128, EAN-13, EAN-8,
 * UPC-A, ITF-14.
 *
 * The bars come from {@link module:helpers/barcodes/encodeBarcode}, laid out
 * by {@link module:helpers/barcodes/layoutBarcode} and drawn with the path of
 * {@link module:helpers/barcodes/symbolToPath} — the same symbol
 * {@link module:helpers/barcodes/barcodeToSvg} and
 * {@link module:helpers/barcodes/barcodeToPng} export, so what is shown is
 * what is stored or sent.
 *
 * 🔑 **The light plate belongs to the code**, as for {@link module:components/barcodes/QRCode} :
 * a scanner measures dark bars on a light ground, whatever the theme.
 *
 * 🔑 **The quiet zone is the standard's** — ten modules each side for Code 128,
 * eleven and seven for an EAN-13 — and the first digit of an EAN-13 lives in it.
 *
 * Two text layouts : `retail` for EAN and UPC (longer guards, digits in groups,
 * the default for those formats) and `simple` (one centred line, the only one
 * for Code 128).
 *
 * The text is set through props, never through CSS — `fontFamily`, `fontWeight`,
 * `textColor`, `textScale` — because the exports draw the same symbol and a
 * class on the component would not reach them. In the retail layout
 * `textScale` is held between 0.5 and 1.2 : beyond, the digits run into each
 * other and out of the margin.
 *
 * ⚠️ **A family name, not a CSS variable.** `var(--font-x)` would draw on screen
 * and nowhere else : neither a canvas nor an exported SVG knows the variables
 * of the page. With `next/font`, pass `font.style.fontFamily`.
 *
 * Renders nothing for an empty value. A content the format refuses — a letter
 * in an EAN, a wrong check digit, an accent in Code 128 — renders nothing and
 * calls `onError` with a {@link module:helpers/barcodes/BarcodeContentError}
 * whose `reason` says why.
 *
 * @module components/barcodes/Barcode
 *
 * @example
 * ```jsx
 * <Barcode value="ABC-1234" />
 *
 * // An EAN-13 : 12 digits, the check digit is computed
 * <Barcode value="400638133393" format="ean_13" size="lg" />
 *
 * // A GS1-128 : the application identifiers in parentheses
 * <Barcode value="(01)09501101530003(17)261231(10)LOT-42" format="gs1_128" />
 *
 * // An ITF-14, with the top and bottom bearer bars only
 * <Barcode value="1540014128876" format="itf_14" bearer="bars" />
 *
 * // The bars alone, as wide as the container
 * <Barcode value={ reference } size="full" showText={ false } className="max-w-sm" />
 *
 * // A width and a height of its own
 * <Barcode value={ reference } moduleWidth={ 3 } height={ 50 } />
 *
 * // The text in a face, a weight and a colour of its own
 * <Barcode value={ reference } fontFamily="Georgia, serif" fontWeight={ 600 } textColor="#475569" textScale={ 1.2 } />
 *
 * // A next/font face : its real family name, never its CSS variable
 * <Barcode value={ reference } fontFamily={ ocrb.style.fontFamily } />
 * ```
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - The accessible name. Defaults to the i18n `label` key read at `path`, then `'Barcode'`.
 * @param {'frame'|'bars'|'none'} [props.bearer='frame'] - ITF-14 only : a frame around the code and its quiet zone, the top and
 *        bottom bars alone, or none.
 * @param {?string} [props.background='#ffffff'] - The light colour, any CSS colour ; `null` leaves it transparent.
 * @param {string} [props.className] - Additional classes on the `<svg>`.
 * @param {string} [props.fontFamily] - The face of the text, a CSS font list. Defaults to a system monospace face.
 * @param {string|number} [props.fontWeight] - The weight of the text.
 * @param {string} [props.foreground='#000000'] - The colour of the bars, and of the text unless `textColor` says otherwise.
 * @param {'code_128'|'gs1_128'|'ean_13'|'ean_8'|'upc_a'|'itf_14'} [props.format='code_128'] - The format, named as the Barcode
 *        Detection API names it — which reports a GS1-128 as `code_128` and an ITF-14 as `itf`.
 * @param {'spaced'|'compact'} [props.gs1Text='spaced'] - GS1-128 only : `(01) 09501101530003 (10) LOT-42`, or as typed.
 * @param {number} [props.height] - The height of the bars, in pixels. Overrides the preset.
 * @param {number} [props.moduleWidth] - The width of one module, in pixels. Overrides the preset ; keep it whole.
 * @param {Function} [props.onError] - `( error ) => void`, called when the content cannot be encoded.
 * @param {string} [props.path='components.barcode.barcode'] - i18n path the default label is read from.
 * @param {number|{left:number,right:number}} [props.quietZone] - The side margins, in modules. Defaults to the format's own.
 * @param {boolean} [props.showText=true] - Draw the human-readable text.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'full'} [props.size='md'] - A preset, or `'full'` for the width of the container.
 * @param {string} [props.textColor] - The colour of the text. Defaults to `foreground`.
 * @param {'retail'|'simple'} [props.textLayout] - Defaults to `retail` for EAN and UPC, `simple` otherwise.
 * @param {number} [props.textScale=1] - A multiplier of the text size : 0.5 to 1.2 in the retail layout, 0.5 to 2 in the simple one.
 * @param {string} props.value - The content.
 * @param {number|{top:number,bottom:number}} [props.verticalMargin=6] - The margin above and below the code, in modules.
 */
const Barcode =
({
    ariaLabel ,
    background = '#ffffff' ,
    bearer     = 'frame' ,
    className ,
    fontFamily = BARCODE_FONT ,
    fontWeight ,
    foreground = '#000000' ,
    format     = 'code_128' ,
    gs1Text    = 'spaced' ,
    height ,
    moduleWidth ,
    onError ,
    path       = 'components.barcode.barcode' ,
    quietZone ,
    showText   = true ,
    size       = 'md' ,
    textColor ,
    textLayout ,
    textScale  = 1 ,
    value ,
    verticalMargin ,

    ...rest
}) =>
{
    const { label = 'Barcode' } = useI18n( path , NO_LOCALE , false ) ;

    const empty  = value === null || value === undefined || value === '' ;
    const full   = size === FULL ;
    const preset = BARCODE_SIZES[ size ] ?? BARCODE_SIZES.md ;

    const module    = moduleWidth ?? preset.moduleWidth ;
    const barHeight = ( height ?? preset.height ) / module ;

    const { error , symbol } = useMemo( () =>
    {
        if ( empty )
        {
            return {} ;
        }

        try
        {
            return { symbol : layoutBarcode( encodeBarcode( value , { format , gs1Text } ) , { barHeight , bearer , quietZone , showText , textLayout , textScale , verticalMargin } ) } ;
        }
        catch ( exception )
        {
            return { error : exception } ;
        }
    }
    , [ barHeight , bearer , empty , format , gs1Text , quietZone , showText , textLayout , textScale , value , verticalMargin ] ) ;

    const d = useMemo( () => symbolToPath( symbol?.rects ) , [ symbol ] ) ;

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

    if ( !symbol )
    {
        return null ;
    }

    return (
        <svg
            aria-label = { ariaLabel ?? label }
            className  = { cn( 'block' , full && 'h-auto w-full' , className ) }
            height     = { full ? undefined : Math.ceil( symbol.height * module ) }
            role       = "img"
            viewBox    = { `0 0 ${ symbol.width } ${ symbol.height }` }
            width      = { full ? undefined : symbol.width * module }
            xmlns      = "http://www.w3.org/2000/svg"
            { ...rest }
        >
            { background && <rect fill={ background } height="100%" width="100%" /> }
            <path d={ d } fill={ foreground } shapeRendering="crispEdges" />
            { symbol.texts.length > 0 && (
                <g fill={ textColor ?? foreground } fontFamily={ fontFamily } fontWeight={ fontWeight }>
                    { symbol.texts.map( ( { size : fontSize , value : text , x , y } ) => (
                        <text key={ `${ x }-${ text }` } fontSize={ fontSize } textAnchor="middle" x={ x } y={ y }>
                            { text }
                        </text>
                    ) ) }
                </g>
            ) }
        </svg>
    ) ;
} ;

Barcode.displayName = 'Barcode' ;

export default Barcode ;
