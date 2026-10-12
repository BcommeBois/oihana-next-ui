'use client' ;

import { useMemo , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert            from '@/components/Alert' ;
import Button           from '@/components/Button' ;
import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Input            from '@/components/inputs/Input' ;

import QRCode from '@/components/barcodes/QRCode' ;

import encodeQRCode , { ECC_LEVELS } from '@/helpers/barcodes/encodeQRCode' ;
import measureQRCode                 from '@/helpers/barcodes/measureQRCode' ;
import matrixToPng                   from '@/helpers/barcodes/matrixToPng' ;
import matrixToSvg                   from '@/helpers/barcodes/matrixToSvg' ;

import useI18n from '@/contexts/locale/useI18n' ;

const SIZES = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

const SCALES = [ 4 , 8 , 16 ] ;

const URL_SAMPLE  = 'https://oihana-next-ui.vercel.app' ;
const WIFI_SAMPLE = 'WIFI:T:WPA;S:Atelier;P:demo-password;;' ;
const TOO_LONG    = 'x'.repeat( 5000 ) ;

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
 * A captioned cell : the caption above, the code below.
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
 * QRCode demo.
 *
 * A playground first — type, see, scan, export — then one block per prop. The
 * export goes through the same helpers an application would call to send a
 * code to its API.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.barcodes.qrCode'] - Dot notation path to the demo locale.
 */
const QRCodeDemo = ( { path = 'demo.barcodes.qrCode' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ text  , setText  ] = useState( null ) ;
    const [ ecc   , setEcc   ] = useState( 'medium' ) ;
    const [ scale , setScale ] = useState( 8 ) ;
    const [ error , setError ] = useState( null ) ;

    const value = text ?? t.playground?.value ?? URL_SAMPLE ;

    const measure = measureQRCode( value , { ecc } ) ;

    const matrix = useMemo( () =>
    {
        try
        {
            return value ? encodeQRCode( value , { ecc } ) : null ;
        }
        catch
        {
            return null ;
        }
    }
    , [ ecc , value ] ) ;

    const svg = useMemo( () => matrixToSvg( matrix , { title : 'QR code' } ) , [ matrix ] ) ;

    const downloadSvg = () => download( new Blob( [ svg ] , { type : 'image/svg+xml' } ) , 'qrcode.svg' ) ;

    const downloadPng = async () => download( await matrixToPng( matrix , { scale } ) , `qrcode@${ scale }.png` ) ;

    const levels = ECC_LEVELS.map( level => ( { key : level , label : level } ) ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Playground and export */}
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr]">

                <div className="flex flex-col items-center gap-2">
                    <QRCode value={ value } ecc={ ecc } size="xl" />
                    { matrix && (
                        <span className="text-xs font-mono text-base-content/60">
                            { format( t.playground?.modules ?? '{0}' , matrix.length ) }
                        </span>
                    ) }
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold">{ t.playground?.title }</h3>
                    <p className="text-sm text-base-content/70">{ t.playground?.note }</p>

                    <Input
                        error    = { measure.fits ? undefined : format( t.playground?.overflow ?? '{0}' , measure.capacity , t.modes?.[ measure.mode ] ) }
                        helper   = { format( t.playground?.counter ?? '{0}' , measure.length , measure.capacity , t.modes?.[ measure.mode ] ) }
                        label    = { t.playground?.label }
                        onChange = { setText }
                        value    = { value }
                    />

                    <div className="flex flex-col gap-1">
                        <span className="label text-sm">{ t.playground?.ecc }</span>
                        <SegmentedControl
                            ariaLabel = { t.playground?.ecc }
                            items     = { levels }
                            onChange  = { setEcc }
                            value     = { ecc }
                        />
                    </div>

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
                        <Button color="primary" disabled={ !matrix } onClick={ downloadSvg } size="sm">
                            { t.export?.svg }
                        </Button>
                        <Button color="primary" disabled={ !matrix } onClick={ downloadPng } size="sm" style="outline">
                            { t.export?.png }
                        </Button>
                    </div>

                    { matrix && (
                        <div className="flex flex-col gap-1 font-mono text-xs text-base-content/60">
                            <span>{ format( t.export?.weight ?? '{0}' , svg.length ) }</span>
                            <span>{ format( t.export?.pixels ?? '{0}' , matrix.length * scale ) }</span>
                            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-all rounded-box bg-base-100 p-3">{ svg }</pre>
                        </div>
                    ) }
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
                            <QRCode value={ URL_SAMPLE } size={ size } />
                        </Cell>
                    ) ) }
                    <Cell caption="size={ 220 }">
                        <QRCode value={ URL_SAMPLE } size={ 220 } />
                    </Cell>
                    <Cell caption={ t.sizes?.full } className="w-48">
                        <QRCode value={ URL_SAMPLE } size="full" />
                    </Cell>
                </div>
            </section>

            <Divider />

            {/* Error correction */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.ecc?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.ecc?.note }</p>
                <div className="flex flex-wrap items-end gap-6">
                    { ECC_LEVELS.map( level => (
                        <Cell
                            key     = { level }
                            caption = { `ecc="${ level }" · ${ encodeQRCode( URL_SAMPLE , { ecc : level } ).length }²` }
                        >
                            <QRCode value={ URL_SAMPLE } ecc={ level } size="lg" />
                        </Cell>
                    ) ) }
                </div>
            </section>

            <Divider />

            {/* Colours and background */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.colors?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.colors?.note }</p>
                <div className="flex flex-wrap items-end gap-6">
                    <Cell caption={ t.colors?.plain }>
                        <QRCode value={ URL_SAMPLE } />
                    </Cell>
                    <Cell caption={ t.colors?.custom }>
                        <QRCode value={ URL_SAMPLE } foreground="#1e3a8a" background="#eff6ff" />
                    </Cell>
                    <Cell caption={ t.colors?.onDark }>
                        <div className="rounded-box bg-neutral p-4">
                            <QRCode value={ URL_SAMPLE } />
                        </div>
                    </Cell>
                    <Cell caption={ t.colors?.transparent }>
                        <div className="rounded-box bg-neutral p-4">
                            <QRCode value={ URL_SAMPLE } background={ null } foreground="#ffffff" />
                        </div>
                    </Cell>
                </div>
            </section>

            <Divider />

            {/* Quiet zone */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.quietZone?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.quietZone?.note }</p>
                <div className="flex flex-wrap items-end gap-6">
                    { [ 4 , 2 , 1 ].map( zone => (
                        <Cell key={ zone } caption={ `quietZone={ ${ zone } }` }>
                            <div className="outline outline-dashed outline-base-content/30">
                                <QRCode value={ URL_SAMPLE } quietZone={ zone } />
                            </div>
                        </Cell>
                    ) ) }
                </div>
            </section>

            <Divider />

            {/* Contents */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.contents?.title }</h3>
                <div className="flex flex-wrap items-end gap-6">
                    <Cell caption={ t.contents?.url }>
                        <QRCode value={ URL_SAMPLE } size="lg" />
                    </Cell>
                    <Cell caption={ t.contents?.text }>
                        <QRCode value={ t.contents?.sample } size="lg" />
                    </Cell>
                    <Cell caption={ t.contents?.wifi }>
                        <QRCode value={ WIFI_SAMPLE } size="lg" />
                    </Cell>
                </div>
            </section>

            <Divider />

            {/* Too long */}
            <section className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">{ t.tooLong?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.tooLong?.note }</p>
                <QRCode value={ TOO_LONG } onError={ setError } />
                <Alert level={ error ? 'warning' : 'info' }>
                    { error ? (
                        <div className="flex flex-col gap-1">
                            <span>{ format( t.tooLong?.error ?? '{0}' , error.message ) }</span>
                            <span className="font-mono text-xs">
                                mode="{ error.mode }" · length={ error.length } · capacity={ error.capacity } · ecc="{ error.ecc }"
                            </span>
                        </div>
                    ) : t.tooLong?.waiting }
                </Alert>
            </section>

        </Container>
    ) ;
} ;

export default QRCodeDemo ;
