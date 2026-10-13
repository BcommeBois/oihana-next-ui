'use client' ;

import { useEffect , useMemo , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Badge            from '@/components/Badge' ;
import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Input            from '@/components/inputs/Input' ;
import TextArea         from '@/components/inputs/TextArea' ;
import TextAreaMarkdown from '@/components/inputs/TextAreaMarkdown' ;

import PdfDownloadButton from '@/components/documents/PdfDownloadButton' ;
import PdfPreview        from '@/components/documents/PdfPreview' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import useI18n from '@/contexts/locale/useI18n' ;

/** The products of the sheet, a reference and a price each ; the names come from the locale. */
const PRODUCTS =
[
    { key : 'armchair' , price : 189 , sku : 'FAU-LIN-001' } ,
    { key : 'lamp'     , price : 79  , sku : 'LAM-LAI-002' } ,
    { key : 'throw'    , price : 59  , sku : 'PLA-LAI-003' } ,
    { key : 'table'    , price : 249 , sku : 'TAB-CHE-004' } ,
    { key : 'vase'     , price : 39  , sku : 'VAS-GRE-005' } ,
    { key : 'mirror'   , price : 99  , sku : 'MIR-RON-006' } ,
    { key : 'shelf'    , price : 69  , sku : 'ETA-MUR-007' } ,
] ;

const COUNTS = [ 7 , 14 , 28 ] ;

/**
 * PDF creation demo : a note generated as it is typed, and a sheet of labels.
 *
 * The templates import `@react-pdf/renderer` at their top, so they are
 * imported here on the client, after the page is up : the engine and the
 * templates arrive together, and only then.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.documents.create'] - Dot notation path to the demo locale.
 */
const PdfCreateDemo = ( { path = 'demo.documents.create' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const engineLabels = t.engine ?? {} ;
    const live         = t.live   ?? {} ;
    const sheet        = t.sheet  ?? {} ;
    const markdown     = t.markdown ?? {} ;

    const { locale } = useNumberFormat() ;

    const [ templates , setTemplates ] = useState( null ) ;
    const [ version   , setVersion   ] = useState( null ) ;
    const [ missing   , setMissing   ] = useState( false ) ;

    useEffect( () =>
    {
        Promise.all(
        [
            import( '@/components/documents/engine/renderer' ).then( module => module.loadRenderer() ) ,
            import( '@/demo/documents/pdf/NoteDocument' ) ,
            import( '@/demo/documents/pdf/LabelSheetDocument' ) ,
            import( '@/components/documents/pdf/MarkdownDocument' ) ,
        ] )
        .then( ( [ renderer , note , labels , md ] ) =>
        {
            setVersion( renderer.version ) ;
            setTemplates( { Markdown : md.default , Note : note.default , Sheet : labels.default } ) ;
        }
        , () => setMissing( true ) ) ;
    }
    , [] ) ;

    const [ heading , setHeading ] = useState( null ) ;
    const [ body    , setBody    ] = useState( null ) ;
    const [ count   , setCount   ] = useState( 14 ) ;
    const [ source  , setSource  ] = useState( null ) ;

    const headingValue = heading ?? live.defaults?.heading ?? '' ;
    const bodyValue    = body    ?? live.defaults?.body    ?? '' ;

    const note = useMemo( () =>
        templates ? <templates.Note body={ bodyValue } locale={ locale } title={ headingValue } url="https://oihana-next-ui.vercel.app/modules/documentsCreate" /> : null
    , [ bodyValue , headingValue , locale , templates ] ) ;

    const items = useMemo( () =>
        Array.from( { length : count } , ( _ , index ) =>
        {
            const product = PRODUCTS[ index % PRODUCTS.length ] ;
            return { name : sheet.products?.[ product.key ] ?? product.key , price : product.price , sku : product.sku } ;
        } )
    , [ count , sheet.products ] ) ;

    const sourceValue = source ?? markdown.sample ?? '' ;

    const fromMarkdown = useMemo( () =>
        templates ? <templates.Markdown pageLabel={ markdown.page } source={ sourceValue } title={ markdown.title } /> : null
    , [ markdown.page , markdown.title , sourceValue , templates ] ) ;

    const labels = useMemo( () =>
        templates ? <templates.Sheet items={ items } locale={ locale } title={ sheet.title } /> : null
    , [ items , locale , sheet.title , templates ] ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold">{ t.title }</h2>
                { version && <Badge color="success" style="soft">{ format( engineLabels.ready ?? '{0}' , version ) }</Badge> }
                { missing && <Badge color="warning" style="soft">{ engineLabels.missing }</Badge> }
                { !version && !missing && <Badge style="ghost">{ engineLabels.waiting }</Badge> }
            </div>

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            {/* A note, generated as it is typed */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ live.title }</h3>
                <p className="text-sm text-base-content/70">{ live.text }</p>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                    <div className="flex flex-col gap-3">
                        <Input label={ live.heading } onChange={ setHeading } value={ headingValue } />
                        <TextArea helper={ live.bodyHelp } label={ live.body } onChange={ setBody } rows={ 8 } value={ bodyValue } />
                        <div>
                            <PdfDownloadButton color="primary" document={ note } fileName={ live.fileName } />
                        </div>
                    </div>
                    <PdfPreview
                        className    = "h-[60vh] rounded-box border border-base-300"
                        document     = { note }
                        fileName     = { live.fileName }
                        toolbarProps = { { showFit : false , showRotate : false , showSearch : false , showThumbnails : false } }
                    />
                </div>
            </section>

            <Divider />

            {/* A sheet of labels */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ sheet.title }</h3>
                <p className="text-sm text-base-content/70">{ sheet.text }</p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ sheet.count }</span>
                        <SegmentedControl
                            ariaLabel = { sheet.count }
                            items     = { COUNTS.map( key => ( { key , label : String( key ) } ) ) }
                            onChange  = { setCount }
                            value     = { count }
                        />
                    </div>
                    <PdfDownloadButton document={ labels } fileName={ sheet.fileName } />
                </div>

                <PdfPreview
                    className    = "h-[70vh] rounded-box border border-base-300"
                    document     = { labels }
                    fileName     = { sheet.fileName }
                    fit          = "page"
                    toolbarProps = { { showRotate : false , showSearch : false } }
                />
            </section>

            <Divider />

            {/* From Markdown */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ markdown.title }</h3>
                <p className="text-sm text-base-content/70">{ markdown.text }</p>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                    <div className="flex flex-col gap-3">
                        <TextAreaMarkdown label={ markdown.field } onChange={ setSource } previewPosition="tab" rows={ 22 } value={ sourceValue } />
                        <div>
                            <PdfDownloadButton color="primary" document={ fromMarkdown } fileName={ markdown.fileName } />
                        </div>
                    </div>
                    <PdfPreview
                        className    = "h-[70vh] rounded-box border border-base-300"
                        document     = { fromMarkdown }
                        fileName     = { markdown.fileName }
                        toolbarProps = { { showRotate : false , showThumbnails : false } }
                    />
                </div>
                <p className="text-xs text-base-content/60">{ markdown.help }</p>
            </section>

        </Container>
    ) ;
} ;

export default PdfCreateDemo ;
