'use client' ;

import { useMemo , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert            from '@/components/Alert' ;
import Button           from '@/components/Button' ;
import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Input            from '@/components/inputs/Input' ;

import Barcode from '@/components/barcodes/Barcode' ;

import barcodeToPng                     from '@/helpers/barcodes/barcodeToPng' ;
import barcodeToSvg                     from '@/helpers/barcodes/barcodeToSvg' ;
import encodeBarcode , { RETAIL_FORMATS } from '@/helpers/barcodes/encodeBarcode' ;
import layoutBarcode                    from '@/helpers/barcodes/layoutBarcode' ;

import useI18n from '@/contexts/locale/useI18n' ;

const FORMATS =
[
    { key : 'code_128' , label : 'Code 128' } ,
    { key : 'ean_13'   , label : 'EAN-13' } ,
    { key : 'ean_8'    , label : 'EAN-8' } ,
    { key : 'upc_a'    , label : 'UPC-A' } ,
] ;

const SAMPLES =
{
    code_128 : 'ABC-1234' ,
    ean_13   : '4006381333931' ,
    ean_8    : '96385074' ,
    upc_a    : '036000291452' ,
} ;

const SIZES = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

const SCALES = [ 2 , 4 , 8 ] ;

const CODE128_RUNS = [ 'ABCDEFGH' , '12345678' , 'AB12345678CD' ] ;

const FONTS =
{
    mono  : undefined ,
    sans  : 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' ,
    serif : 'Georgia, "Times New Roman", serif' ,
} ;

const TEXT_SCALES = [ 0.8 , 1 , 1.2 ] ;

// The bar height of the playground, in modules : 80 px at 2 px per module.
const BAR_HEIGHT = 40 ;

/**
 * Saves a blob under a file name, through a temporary link.
 *
 * @param {Blob} blob
 * @param {string} name
 */
const download = ( blob , name ) =>
{
    const url  = URL.createObjectURL( blob ) ;
    const link = document.createElement( 'a' ) ;
    link.href     = url ;
    link.download = name ;
    link.click() ;
    // Revoked a moment later : some browsers start the download after the click returns.
    setTimeout( () => URL.revokeObjectURL( url ) , 1000 ) ;
} ;

/**
 * Words a BarcodeContentError in the demo's language, from its `reason`.
 *
 * @param {Object} reasons - The localized sentences, by reason.
 * @param {Object} error
 * @returns {string}
 */
const describe = ( reasons , error ) =>
{
    const sentence = reasons?.[ error?.reason ] ?? error?.message ?? '' ;
    const { data = {} } = error ?? {} ;

    switch ( error?.reason )
    {
        case 'length'     : return format( sentence , ...( data.expected ?? [] ) , data.length ) ;
        case 'checkDigit' : return format( sentence , data.expected , data.given ) ;
        default           : return sentence ;
    }
} ;

/**
 * A captioned cell : the code above, the caption below.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.caption
 * @param {string} [props.className]
 */
const Cell = ({ caption , children , className }) => (
    <div className={ `flex flex-col items-center gap-2 ${ className ?? '' }` }>
        { children }
        <span className="text-center text-xs font-mono text-base-content/60">{ caption }</span>
    </div>
) ;

/**
 * Barcode demo.
 *
 * A playground first — pick a format, type, scan, export — then one block per
 * prop. Every code here is meant to be scanned : a home-made encoder is only
 * proved by a reader.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.barcodes.barcode'] - Dot notation path to the demo locale.
 */
const BarcodeDemo = ( { path = 'demo.barcodes.barcode' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ kind  , setKind  ] = useState( 'code_128' ) ;
    const [ value , setValue ] = useState( SAMPLES.code_128 ) ;
    const [ text  , setText  ] = useState( 'retail' ) ;
    const [ scale , setScale ] = useState( 4 ) ;
    const [ error , setError ] = useState( null ) ;
    const [ font  , setFont  ] = useState( 'mono' ) ;
    const [ bold  , setBold  ] = useState( 'normal' ) ;
    const [ grow  , setGrow  ] = useState( 1 ) ;

    const retail = RETAIL_FORMATS.includes( kind ) ;

    const textModes = ( retail ? [ 'retail' , 'simple' , 'none' ] : [ 'simple' , 'none' ] )
        .map( mode => ( { key : mode , label : t.textModes?.[ mode ] ?? mode } ) ) ;

    const textMode = !retail && text === 'retail' ? 'simple' : text ;

    const showText   = textMode !== 'none' ;
    const textLayout = showText ? textMode : undefined ;

    const { problem , symbol } = useMemo( () =>
    {
        try
        {
            return { symbol : layoutBarcode( encodeBarcode( value , { format : kind } ) , { barHeight : BAR_HEIGHT , showText , textLayout , textScale : grow } ) } ;
        }
        catch ( exception )
        {
            return { problem : exception } ;
        }
    }
    , [ grow , kind , showText , textLayout , value ] ) ;

    const changeFormat = next =>
    {
        setKind( next ) ;
        setValue( SAMPLES[ next ] ) ;
    } ;

    const typeface = { fontFamily : FONTS[ font ] , fontWeight : bold } ;

    const downloadSvg = () => download( new Blob( [ barcodeToSvg( symbol , { ...typeface , scale , title : value } ) ] , { type : 'image/svg+xml' } ) , `${ kind }.svg` ) ;

    const downloadPng = async () => download( await barcodeToPng( symbol , { ...typeface , scale } ) , `${ kind }@${ scale }.png` ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Playground and export */}
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">

                <div className="flex flex-col items-center justify-center gap-2 overflow-x-auto">
                    <Barcode value={ value } format={ kind } showText={ showText } size="md" textLayout={ textLayout } textScale={ grow } { ...typeface } />
                    { symbol && (
                        <span className="text-xs font-mono text-base-content/60">
                            { format( t.playground?.width ?? '{0}' , symbol.width ) }
                        </span>
                    ) }
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold">{ t.playground?.title }</h3>
                    <p className="text-sm text-base-content/70">{ t.playground?.note }</p>

                    <div className="flex flex-col gap-1">
                        <span className="label text-sm">{ t.playground?.format }</span>
                        <SegmentedControl ariaLabel={ t.playground?.format } items={ FORMATS } onChange={ changeFormat } value={ kind } />
                    </div>

                    <Input
                        error    = { problem ? describe( t.reasons , problem ) : undefined }
                        label    = { t.playground?.label }
                        onChange = { setValue }
                        value    = { value }
                    />

                    <div className="flex flex-col gap-1">
                        <span className="label text-sm">{ t.playground?.text }</span>
                        <SegmentedControl ariaLabel={ t.playground?.text } items={ textModes } onChange={ setText } value={ textMode } />
                    </div>

                    { showText && (
                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="label text-sm">{ t.typeface?.font }</span>
                                <SegmentedControl
                                    ariaLabel = { t.typeface?.font }
                                    items     = { Object.keys( FONTS ).map( key => ( { key , label : t.typeface?.fonts?.[ key ] ?? key } ) ) }
                                    onChange  = { setFont }
                                    value     = { font }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="label text-sm">{ t.typeface?.weight }</span>
                                <SegmentedControl
                                    ariaLabel = { t.typeface?.weight }
                                    items     = { [ { key : 'normal' , label : t.typeface?.normal } , { key : 'bold' , label : t.typeface?.bold } ] }
                                    onChange  = { setBold }
                                    value     = { bold }
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="label text-sm">textScale</span>
                                <SegmentedControl
                                    ariaLabel = "textScale"
                                    items     = { TEXT_SCALES.map( item => ( { key : item , label : `×${ item }` } ) ) }
                                    onChange  = { setGrow }
                                    value     = { grow }
                                />
                            </div>
                        </div>
                    ) }

                    <Divider className="my-1" />

                    <h4 className="text-lg font-semibold">{ t.export?.title }</h4>
                    <p className="text-sm text-base-content/70">{ t.export?.note }</p>

                    <div className="flex flex-col gap-1">
                        <span className="label text-sm">{ t.export?.scale }</span>
                        <SegmentedControl
                            ariaLabel = { t.export?.scale }
                            items     = { SCALES.map( item => ( { key : item , label : `×${ item }` } ) ) }
                            onChange  = { setScale }
                            value     = { scale }
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button color="primary" disabled={ !symbol } onClick={ downloadSvg } size="sm">
                            { t.export?.svg }
                        </Button>
                        <Button color="primary" disabled={ !symbol } onClick={ downloadPng } size="sm" style="outline">
                            { t.export?.png }
                        </Button>
                    </div>
                </div>

            </section>

            <Divider />

            {/* Sizes */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.sizes?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.sizes?.note }</p>
                <div className="flex flex-wrap items-end gap-6">
                    { SIZES.map( size => (
                        <Cell key={ size } caption={ `size="${ size }"` }>
                            <Barcode value="ABC-1234" size={ size } />
                        </Cell>
                    ) ) }
                    <Cell caption={ t.sizes?.full } className="w-64">
                        <Barcode value="ABC-1234" size="full" />
                    </Cell>
                </div>
            </section>

            <Divider />

            {/* Vertical margin */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.margins?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.margins?.note }</p>
                <div className="flex flex-wrap items-end gap-6">
                    { [ 0 , 6 , 12 ].map( margin => (
                        <Cell key={ margin } caption={ `verticalMargin={ ${ margin } }` }>
                            <div className="rounded-box bg-neutral p-3">
                                <Barcode value="ABC-1234" verticalMargin={ margin } />
                            </div>
                        </Cell>
                    ) ) }
                    <Cell caption="verticalMargin={ { top : 12 , bottom : 4 } }">
                        <div className="rounded-box bg-neutral p-3">
                            <Barcode value="ABC-1234" verticalMargin={ { bottom : 4 , top : 12 } } />
                        </div>
                    </Cell>
                </div>
            </section>

            <Divider />

            {/* Formats */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.formats?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.formats?.note }</p>
                <div className="flex flex-wrap items-end gap-8">
                    { FORMATS.map( ( { key , label } ) => (
                        <Cell key={ key } caption={ `${ label } · format="${ key }"` }>
                            <Barcode value={ SAMPLES[ key ] } format={ key } />
                        </Cell>
                    ) ) }
                </div>
            </section>

            <Divider />

            {/* Text layouts */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.layouts?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.layouts?.note }</p>
                <div className="flex flex-wrap items-end gap-8">
                    { [ 'ean_13' , 'upc_a' ].flatMap( key => [ 'retail' , 'simple' ].map( layout => (
                        <Cell key={ `${ key }-${ layout }` } caption={ `${ key } · textLayout="${ layout }"` }>
                            <Barcode value={ SAMPLES[ key ] } format={ key } textLayout={ layout } />
                        </Cell>
                    ) ) ) }
                    <Cell caption="ean_8 · showText={ false }">
                        <Barcode value={ SAMPLES.ean_8 } format="ean_8" showText={ false } />
                    </Cell>
                </div>
            </section>

            <Divider />

            {/* Typeface */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.typeface?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.typeface?.note }</p>
                <div className="flex flex-wrap items-end gap-8">
                    { [ 0.5 , 1 , 1.2 ].map( scale => (
                        <Cell key={ scale } caption={ `ean_13 · textScale={ ${ scale } }` }>
                            <Barcode value={ SAMPLES.ean_13 } format="ean_13" textScale={ scale } />
                        </Cell>
                    ) ) }
                    <Cell caption={ `code_128 · textScale={ 1.6 } · fontWeight="bold"` }>
                        <Barcode value="ABC-1234" textScale={ 1.6 } fontWeight="bold" />
                    </Cell>
                    <Cell caption={ `fontFamily="${ FONTS.serif.split( ',' )[ 0 ] }…"` }>
                        <Barcode value={ SAMPLES.ean_13 } format="ean_13" fontFamily={ FONTS.serif } />
                    </Cell>
                    <Cell caption={ `fontFamily="system-ui…" · textColor="#64748b"` }>
                        <Barcode value="LOT-2026-001234" fontFamily={ FONTS.sans } textColor="#64748b" />
                    </Cell>
                </div>
            </section>

            <Divider />

            {/* Code 128 set C */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.code128?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.code128?.note }</p>
                <div className="flex flex-wrap items-end gap-8">
                    { CODE128_RUNS.map( run => (
                        <Cell key={ run } caption={ `${ run } · ${ format( t.code128?.width ?? '{0}' , layoutBarcode( encodeBarcode( run ) ).width ) }` }>
                            <Barcode value={ run } />
                        </Cell>
                    ) ) }
                </div>
            </section>

            <Divider />

            {/* Check digit */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.checkDigit?.title }</h3>
                <div className="flex flex-wrap items-end gap-8">
                    <Cell caption={ `400638133393 · ${ t.checkDigit?.completed }` }>
                        <Barcode value="400638133393" format="ean_13" />
                    </Cell>
                    <div className="flex flex-col gap-2">
                        <Barcode value="4006381333930" format="ean_13" onError={ setError } />
                        <span className="text-xs font-mono text-base-content/60">{ t.checkDigit?.refused }</span>
                    </div>
                </div>
                <Alert level={ error ? 'warning' : 'info' }>
                    { error ? (
                        <div className="flex flex-col gap-1">
                            <span>{ format( t.checkDigit?.error ?? '{0}' , describe( t.reasons , error ) ) }</span>
                            <span className="font-mono text-xs">
                                { error.name } · reason="{ error.reason }" · format="{ error.format }" · { error.message }
                            </span>
                        </div>
                    ) : t.checkDigit?.waiting }
                </Alert>
            </section>

            <Divider />

            {/* Dark surface */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.colors?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.colors?.note }</p>
                <div className="flex flex-wrap items-end gap-8">
                    <div className="rounded-box bg-neutral p-4">
                        <Barcode value={ SAMPLES.ean_13 } format="ean_13" />
                    </div>
                    <div className="rounded-box bg-neutral p-4">
                        <Barcode value="ABC-1234" foreground="#1e3a8a" background="#eff6ff" />
                    </div>
                </div>
            </section>

        </Container>
    ) ;
} ;

export default BarcodeDemo ;
