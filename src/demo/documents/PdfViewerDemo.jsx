'use client' ;

import { useCallback , useEffect , useMemo , useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert            from '@/components/Alert' ;
import Badge            from '@/components/Badge' ;
import Button           from '@/components/Button' ;
import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;
import FileDropzone     from '@/components/media/FileDropzone' ;

import PdfPanel  from '@/components/documents/PdfPanel' ;
import PdfViewer from '@/components/documents/PdfViewer' ;

import useModal from '@/components/modals/hooks/useModal' ;

import { loadEngine } from '@/components/documents/engine' ;

import useI18n from '@/contexts/locale/useI18n' ;

const SAMPLE = '/documents/sample.pdf' ;
const LONG   = '/documents/long.pdf' ;
const SECRET = '/documents/secret.pdf' ;
const API    = '/api/documents/sample' ;

const MB = 1024 * 1024 ;

const FITS     = [ 'width' , 'page' , 'none' ] ;
const TOOLBARS = [ 'top' , 'bottom' , 'both' , 'none' ] ;

/**
 * PDF viewer demo : the viewer and its settings, a dropped file, a long
 * document, a protected one.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.documents.viewer'] - Dot notation path to the demo locale.
 */
const PdfViewerDemo = ( { path = 'demo.documents.viewer' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const engineLabels = t.engine  ?? {} ;
    const viewer       = t.viewer  ?? {} ;
    const dropped      = t.dropped ?? {} ;
    const long         = t.long    ?? {} ;
    const secret       = t.secret  ?? {} ;
    const panel        = t.panel   ?? {} ;
    const api          = t.api     ?? {} ;

    const [ version , setVersion ] = useState( null ) ;
    const [ missing , setMissing ] = useState( false ) ;

    useEffect( () =>
    {
        loadEngine().then( engine => setVersion( engine.version ) , () => setMissing( true ) ) ;
    }
    , [] ) ;

    const [ fit     , setFit     ] = useState( 'width' ) ;
    const [ toolbar , setToolbar ] = useState( 'top' ) ;
    const [ text    , setText    ] = useState( true ) ;
    const [ page    , setPage    ] = useState( 1 ) ;
    const [ pages   , setPages   ] = useState( 0 ) ;
    const [ zoom    , setZoom    ] = useState( 1 ) ;

    const [ file , setFile ] = useState( null ) ;

    const onDrop = useCallback( files => setFile( files[ 0 ]?.file ?? files[ 0 ] ?? null ) , [] ) ;

    const [ locked , setLocked ] = useState( false ) ;

    const { modalRef , open : openPanel , close : closePanel } = useModal() ;
    const panelViewer = useRef( null ) ;

    const [ withHeader , setWithHeader ] = useState( true ) ;
    const guarded = useMemo( () => ( withHeader ? { url : API , headers : { Authorization : 'Bearer lab' } } : { url : API } ) , [ withHeader ] ) ;

    const [ drawn , setDrawn ] = useState( 0 ) ;
    const [ total , setTotal ] = useState( 0 ) ;

    const onLongLoad = useCallback( ( { pages : count } ) => setTotal( count ) , [] ) ;
    const onLoad     = useCallback( ( { pages : count } ) => setPages( count ) , [] ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-6 rounded-box" maxWidth="max-w-5xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="flex flex-wrap items-center gap-2">
                { missing
                    ? <Alert color="warning">{ engineLabels.missing }</Alert>
                    : version
                        ? <Badge color="success">{ format( engineLabels.ready ?? '' , version ) }</Badge>
                        : <Badge style="ghost">{ engineLabels.waiting }</Badge> }
            </div>

            <Divider />

            {/* The viewer and its settings */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ viewer.title }</h3>
                <p className="text-sm text-base-content/70">{ viewer.text }</p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ viewer.fit }</span>
                        <SegmentedControl
                            ariaLabel = { viewer.fit }
                            items     = { FITS.map( key => ( { key , label : viewer.fits?.[ key ] ?? key } ) ) }
                            onChange  = { setFit }
                            value     = { fit }
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ viewer.toolbar }</span>
                        <SegmentedControl
                            ariaLabel = { viewer.toolbar }
                            items     = { TOOLBARS.map( key => ( { key , label : viewer.toolbars?.[ key ] ?? key } ) ) }
                            onChange  = { setToolbar }
                            value     = { toolbar }
                        />
                    </div>
                    <Toggle checked={ text } inline label={ viewer.textLayer } onChange={ event => setText( event.target.checked ) } size="sm" />
                </div>

                <PdfViewer
                    className       = "h-[70vh] rounded-box border border-base-300"
                    fit             = { fit }
                    onLoad          = { onLoad }
                    onPageChange    = { setPage }
                    onZoomChange    = { setZoom }
                    renderTextLayer = { text }
                    source          = { SAMPLE }
                    toolbar         = { toolbar === 'none' ? false : toolbar }
                />

                <div className="flex flex-wrap gap-2 text-sm text-base-content/70">
                    <Badge style="ghost">{ format( viewer.page ?? '' , page , pages ) }</Badge>
                    <Badge style="ghost">{ format( viewer.zoom ?? '' , Math.round( zoom * 100 ) ) }</Badge>
                </div>
                <p className="text-xs text-base-content/60">{ viewer.textHelp }</p>
            </section>

            <Divider />

            {/* In a panel */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ panel.title }</h3>
                <p className="text-sm text-base-content/70">{ panel.text }</p>

                <div>
                    <Button color="primary" onClick={ openPanel }>{ panel.open }</Button>
                </div>

                <PdfPanel
                    footerNode = {
                        <div className="flex justify-end gap-2">
                            <Button onClick={ closePanel } style="ghost">{ panel.close }</Button>
                            <Button color="primary" onClick={ () => panelViewer.current?.download() }>{ panel.download }</Button>
                        </div>
                    }
                    ref       = { modalRef }
                    source    = { SAMPLE }
                    viewerRef = { panelViewer }
                />
            </section>

            <Divider />

            {/* A dropped file */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ dropped.title }</h3>
                <p className="text-sm text-base-content/70">{ dropped.text }</p>

                <FileDropzone
                    accept   = ".pdf,application/pdf"
                    helper   = { dropped.helper }
                    label    = { dropped.label }
                    maxFiles = { 1 }
                    maxSize  = { 20 * MB }
                    onChange = { onDrop }
                />

                { file
                    ? <PdfViewer className="h-[60vh] rounded-box border border-base-300" source={ file } />
                    : <p className="text-sm text-base-content/60">{ dropped.empty }</p> }
            </section>

            <Divider />

            {/* Forty pages */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ long.title }</h3>
                <p className="text-sm text-base-content/70">{ long.text }</p>

                <Badge color={ drawn > 0 ? 'info' : undefined } style={ drawn > 0 ? undefined : 'ghost' }>
                    { format( long.rendered ?? '' , drawn , total ) }
                </Badge>

                <PdfViewer
                    className        = "h-[60vh] rounded-box border border-base-300"
                    onLoad           = { onLongLoad }
                    onRenderedChange = { setDrawn }
                    source           = { LONG }
                />
            </section>

            <Divider />

            {/* Behind an API */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ api.title }</h3>
                <p className="text-sm text-base-content/70">{ api.text }</p>

                <Toggle checked={ withHeader } inline label={ api.header } onChange={ event => setWithHeader( event.target.checked ) } size="sm" />

                <PdfViewer className="h-[50vh] rounded-box border border-base-300" fileName="sample-api.pdf" source={ guarded } />
            </section>

            <Divider />

            {/* A protected document */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ secret.title }</h3>
                <p className="text-sm text-base-content/70">{ secret.text }</p>

                { locked
                    ? <PdfViewer className="h-[50vh] rounded-box border border-base-300" source={ SECRET } />
                    : <div><Button color="primary" onClick={ () => setLocked( true ) } style="outline">{ secret.open }</Button></div> }
            </section>

        </Container>
    ) ;
} ;

export default PdfViewerDemo ;
