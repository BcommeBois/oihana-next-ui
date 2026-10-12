'use client' ;

import { useCallback , useEffect , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert            from '@/components/Alert' ;
import Badge            from '@/components/Badge' ;
import Button           from '@/components/Button' ;
import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;

import BarcodeScanner from '@/components/barcodes/BarcodeScanner' ;

import { SCANNER_FORMATS , preloadScanner } from '@/components/barcodes/engine' ;

import useFeedbackSignal from '@/hooks/useFeedbackSignal' ;

import useI18n from '@/contexts/locale/useI18n' ;

const SETS =
{
    all       : SCANNER_FORMATS ,
    qr        : [ 'qr_code' ] ,
    products  : [ 'ean_13' , 'ean_8' , 'upc_a' ] ,
    logistics : [ 'code_128' , 'itf' ] ,
} ;

const ENGINES = [ 'auto' , 'native' , 'zxing' ] ;

// The last readings kept on screen.
const KEEP = 10 ;

/**
 * BarcodeScanner demo.
 *
 * The scanner with its settings — on or off, the engine, the formats, a beep
 * through useFeedbackSignal — and the codes it read, newest first.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.barcodes.scanner'] - Dot notation path to the demo locale.
 */
const BarcodeScannerDemo = ( { path = 'demo.barcodes.scanner' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ active  , setActive  ] = useState( true ) ;
    const [ beep    , setBeep    ] = useState( true ) ;
    const [ engine  , setEngine  ] = useState( 'auto' ) ;
    const [ set     , setSet     ] = useState( 'all' ) ;
    const [ running , setRunning ] = useState( null ) ;
    const [ codes   , setCodes   ] = useState( [] ) ;
    const [ failure , setFailure ] = useState( null ) ;
    const [ preload , setPreload ] = useState( null ) ;
    const [ native  , setNative  ] = useState( null ) ;

    // What the browser's own detector reads : why `auto` picks it, or falls back on ZXing.
    useEffect( () =>
    {
        const Detector = globalThis.BarcodeDetector ;

        if ( typeof Detector !== 'function' )
        {
            setNative( [] ) ;
            return ;
        }

        Detector.getSupportedFormats().then( setNative , () => setNative( [] ) ) ;
    } , [] ) ;

    const { signal } = useFeedbackSignal( { sound : beep , vibration : beep } ) ;

    const onDetect = useCallback( reading =>
    {
        signal( 'success' ) ;
        setCodes( list => [ { ...reading , at : new Date() , id : `${ Date.now() }-${ reading.value }` } , ...list ].slice( 0 , KEEP ) ) ;
    }
    , [ signal ] ) ;

    const onReady = useCallback( ( { engine : name } ) =>
    {
        setRunning( name ) ;
        setFailure( null ) ;
    } , [] ) ;

    const onError = useCallback( error =>
    {
        setFailure( error?.message ?? String( error ) ) ;
    } , [] ) ;

    const runPreload = async () =>
    {
        setPreload( 'loading' ) ;
        setPreload( await preloadScanner( { force : true } ) ? 'ready' : 'failed' ) ;
    } ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-6 sm:p-8 rounded-box" maxWidth="max-w-5xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">

                <div className="flex flex-col gap-3">
                    <BarcodeScanner
                        active   = { active }
                        engine   = { engine }
                        formats  = { SETS[ set ] }
                        onDetect = { onDetect }
                        onError  = { onError }
                        onReady  = { onReady }
                    />
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge color={ running ? 'success' : 'neutral' } style="soft">
                            { running ? format( t.running ?? '{0}' , running ) : t.waiting }
                        </Badge>
                        { SETS[ set ].map( kind => (
                            <Badge key={ kind } size="sm" style="outline">{ kind }</Badge>
                        ) ) }
                    </div>
                    { native && (
                        <span className="text-xs text-base-content/60">
                            { native.length > 0 ? format( t.native ?? '{0}' , native.join( ', ' ) ) : t.noNative }
                        </span>
                    ) }
                    { failure && (
                        <Alert level="error">{ format( t.error ?? '{0}' , failure ) }</Alert>
                    ) }
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">{ t.settings }</h3>

                    <Toggle checked={ active } color="primary" label={ t.active } onChange={ event => setActive( event.target.checked ) } />
                    <Toggle checked={ beep } color="primary" label={ t.sound } onChange={ event => setBeep( event.target.checked ) } />

                    <div className="flex flex-col gap-1">
                        <span className="label text-sm">{ t.engine }</span>
                        <SegmentedControl
                            ariaLabel = { t.engine }
                            items     = { ENGINES.map( key => ( { key , label : t.engines?.[ key ] ?? key } ) ) }
                            onChange  = { name => { setRunning( null ) ; setEngine( name ) ; } }
                            value     = { engine }
                        />
                        <span className="text-xs text-base-content/60">{ t.engineHelp }</span>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="label text-sm">{ t.formats }</span>
                        <SegmentedControl
                            ariaLabel = { t.formats }
                            items     = { Object.keys( SETS ).map( key => ( { key , label : t.sets?.[ key ] ?? key } ) ) }
                            onChange  = { setSet }
                            value     = { set }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div>
                            <Button busy={ preload === 'loading' } onClick={ runPreload } size="sm" style="outline">
                                { t.preload }
                            </Button>
                        </div>
                        <span className="text-xs text-base-content/60">{ t.preloadHelp }</span>
                        { preload === 'ready' && <span className="text-xs text-success">{ t.preloaded }</span> }
                        { preload === 'failed' && <span className="text-xs text-error">{ t.failed }</span> }
                    </div>
                </div>

            </div>

            <Divider className="my-0" />

            <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold">{ t.results }</h3>
                    { codes.length > 0 && (
                        <Button onClick={ () => setCodes( [] ) } size="xs" style="ghost">{ t.clear }</Button>
                    ) }
                </div>
                { codes.length === 0 ? (
                    <p className="text-sm text-base-content/60">{ t.empty }</p>
                ) : (
                    <ul className="flex flex-col gap-2">
                        { codes.map( ( { at , elements , format : kind , gs1 , id , rawValue , symbology , value } ) => (
                            <li key={ id } className="flex flex-col gap-2 rounded-box bg-base-100 px-3 py-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge color="primary" size="sm">{ kind }</Badge>
                                    { gs1 && <Badge color="secondary" size="sm">GS1</Badge> }
                                    { symbology && <Badge size="sm" style="outline">{ symbology }</Badge> }
                                    <span className="font-mono text-sm break-all">{ value.replaceAll( '\u001d' , '␝' ) }</span>
                                    <span className="ml-auto text-xs text-base-content/50">{ at.toLocaleTimeString() }</span>
                                </div>
                                { elements && (
                                    <div className="flex flex-wrap gap-2">
                                        { elements.map( ( { ai , data } ) => (
                                            <span key={ ai + data } className="rounded-box bg-base-200 px-2 py-0.5 font-mono text-xs">
                                                ({ ai }) { data }
                                            </span>
                                        ) ) }
                                    </div>
                                ) }
                                { rawValue !== value && (
                                    <span className="font-mono text-xs text-base-content/50 break-all">
                                        rawValue : { rawValue.replaceAll( '\u001d' , '␝' ) }
                                    </span>
                                ) }
                            </li>
                        ) ) }
                    </ul>
                ) }
            </section>

        </Container>
    ) ;
} ;

export default BarcodeScannerDemo ;
