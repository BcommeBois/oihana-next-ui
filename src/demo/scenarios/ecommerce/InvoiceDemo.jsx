'use client' ;

import { useEffect , useMemo , useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdCloudUpload , MdDns } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Toggle   from '@/components/checkboxes/Toggle' ;
import Input    from '@/components/inputs/Input' ;
import TextArea from '@/components/inputs/TextArea' ;

import PdfDownloadButton from '@/components/documents/PdfDownloadButton' ;
import PdfPanel          from '@/components/documents/PdfPanel' ;
import PdfPreview        from '@/components/documents/PdfPreview' ;

import useModal from '@/components/modals/hooks/useModal' ;

import useToast from '@/contexts/toasts/useToast' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import formatFileSize from '@/helpers/files/formatFileSize' ;
import uploadPdf      from '@/helpers/pdf/uploadPdf' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { DAY , Panel , UsedComponents , useToday } from '@/demo/scenarios/shared' ;

/** The order of the checkout scenario, invoiced here. */
const ITEMS =
[
    { key : 'armchair' , price : 189 , quantity : 1 } ,
    { key : 'lamp'     , price : 79  , quantity : 2 } ,
    { key : 'throw'    , price : 59  , quantity : 1 } ,
] ;

const NUMBER = 'FA-2026-0042' ;

const SELLER = { lines : [ '4 cours Mirabeau' , '13100 Aix-en-Provence' , 'contact@maison-exemple.fr' ] , name : 'Maison Exemple' } ;

const INVOICE_API = '/api/documents/invoice' ;
const UPLOAD_API  = '/api/documents/upload' ;

const USED =
[
    { href : '/modules/documentsCreate'     , name : 'PdfPreview' } ,
    { href : '/modules/documentsCreate'     , name : 'PdfDownloadButton' } ,
    { href : '/modules/documentsCreate'     , name : 'PdfPanel' } ,
    { href : '/modules/documentsCreate'     , name : 'PdfQRCode' } ,
    { href : '/modules/documentsCreate'     , name : 'PdfBarcode' } ,
    { href : '/components/inputs'           , name : 'Input' } ,
    { href : '/components/inputs'           , name : 'TextArea' } ,
    { href : '/components/checkboxes'       , name : 'Toggle' } ,
    { href : '/components/toasts'           , name : 'useToast' } ,
] ;

/** An ISO date, `days` from a day number. */
const isoDate = ( day , days ) => new Date( ( day + days ) * DAY ).toISOString().slice( 0 , 10 ) ;

/**
 * The invoice of an order : a form, a live preview, the document downloaded,
 * uploaded, and rendered again by the server.
 *
 * The template imports `@react-pdf/renderer` at its top, so it is imported
 * here on the client, after the page is up : nothing of the engine is
 * loaded before.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.ecommerce.invoice'] - Dot notation path to the demo locale.
 */
const InvoiceDemo = ( { path = 'demo.scenarios.ecommerce.invoice' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { locale } = useNumberFormat() ;

    const { toast } = useToast() ;

    const today = useToday() ;

    const [ Invoice , setInvoice ] = useState( null ) ;
    const [ missing , setMissing ] = useState( false ) ;

    useEffect( () =>
    {
        import( '@/demo/documents/pdf/InvoiceDocument' ).then( module => setInvoice( () => module.default ) , () => setMissing( true ) ) ;
    }
    , [] ) ;

    const [ customer , setCustomer ] = useState( null ) ;
    const [ address  , setAddress  ] = useState( null ) ;
    const [ due      , setDue      ] = useState( null ) ;
    const [ note     , setNote     ] = useState( null ) ;
    const [ vat      , setVat      ] = useState( true ) ;
    const [ long     , setLong     ] = useState( false ) ;

    const customerValue = customer ?? t.defaults?.customer ?? '' ;
    const addressValue  = address  ?? t.defaults?.address  ?? '' ;
    const noteValue     = note     ?? t.defaults?.note     ?? '' ;
    const dueValue      = due      ?? ( today ? isoDate( today , 30 ) : '' ) ;

    const invoice = useMemo( () =>
    {
        const lines = ITEMS.map( item => ( { label : t.items?.[ item.key ] ?? item.key , price : item.price , quantity : item.quantity } ) ) ;

        return {
            buyer      : { lines : addressValue.split( /\s*,\s*/ ).filter( Boolean ) , name : customerValue } ,
            currency   : 'EUR' ,
            date       : today ? isoDate( today , 0 ) : undefined ,
            due        : dueValue || undefined ,
            items      : long ? Array.from( { length : 12 } , () => lines ).flat() : lines ,
            note       : vat ? noteValue : [ t.defaults?.reverse , noteValue ].filter( Boolean ).join( '\n' ) ,
            number     : NUMBER ,
            paymentUrl : `https://oihana-next-ui.vercel.app/scenarios/ecommerce/checkout?order=${ NUMBER }` ,
            seller     : SELLER ,
            vatRate    : vat ? 0.2 : 0 ,
        } ;
    }
    , [ addressValue , customerValue , dueValue , long , noteValue , t.defaults , t.items , today , vat ] ) ;

    const element = useMemo( () =>
        Invoice ? <Invoice invoice={ invoice } labels={ t.document ?? {} } locale={ locale } /> : null
    , [ Invoice , invoice , locale , t.document ] ) ;

    const fileName = `facture-${ NUMBER }.pdf` ;

    // The last blob the preview generated : what « save to the server » sends.
    const generated = useRef( null ) ;

    const [ uploading , setUploading ] = useState( false ) ;
    const [ rendering , setRendering ] = useState( false ) ;
    const [ server    , setServer    ] = useState( null ) ;

    const { modalRef , open : openPanel , close : closePanel } = useModal() ;

    const upload = async () =>
    {
        if ( !generated.current )
        {
            return ;
        }

        setUploading( true ) ;

        try
        {
            const response = await uploadPdf( UPLOAD_API , generated.current , { fields : { number : NUMBER } , fileName } ) ;
            const received = await response.json() ;

            toast( format( t.actions?.uploaded ?? '{0} {1}' , received.fields?.number ?? NUMBER , formatFileSize( received.size ) ) , 'success' ) ;
        }
        catch ( error )
        {
            toast( format( t.actions?.failed ?? '{0}' , error.message ) , 'error' ) ;
        }
        finally
        {
            setUploading( false ) ;
        }
    } ;

    const renderOnServer = async () =>
    {
        setRendering( true ) ;

        const started = performance.now() ;

        try
        {
            const response = await fetch( INVOICE_API ,
            {
                body    : JSON.stringify( { invoice , labels : t.document ?? {} , locale } ) ,
                headers : { 'Content-Type' : 'application/json' } ,
                method  : 'POST' ,
            } ) ;

            if ( !response.ok )
            {
                throw new Error( String( response.status ) ) ;
            }

            setServer( await response.blob() ) ;
            openPanel() ;

            toast( format( t.actions?.rendered ?? '{0}' , Math.round( performance.now() - started ) ) , 'success' ) ;
        }
        catch ( error )
        {
            toast( format( t.actions?.failed ?? '{0}' , error.message ) , 'error' ) ;
        }
        finally
        {
            setRendering( false ) ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            { missing && <Badge color="warning" style="soft">@react-pdf/renderer</Badge> }

            <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">

                <div className="flex flex-col gap-6">
                    <Panel title={ t.form?.title }>
                        <Input label={ t.form?.customer } onChange={ setCustomer } value={ customerValue } />
                        <Input label={ t.form?.address } onChange={ setAddress } value={ addressValue } />
                        <Input label={ t.form?.due } onChange={ setDue } type="date" value={ dueValue } />
                        <TextArea label={ t.form?.note } onChange={ setNote } rows={ 3 } value={ noteValue } />
                        <Toggle checked={ vat } helper={ t.form?.vatHelp } label={ t.form?.vat } onChange={ event => setVat( event.target.checked ) } size="sm" />
                        <Toggle checked={ long } helper={ t.form?.longHelp } label={ t.form?.long } onChange={ event => setLong( event.target.checked ) } size="sm" />
                    </Panel>

                    <Panel title={ t.actions?.title }>
                        <div className="flex flex-wrap gap-2">
                            <PdfDownloadButton color="primary" document={ element } fileName={ fileName }>{ t.actions?.download }</PdfDownloadButton>
                            <Button icon={ MdCloudUpload } loading={ uploading } onClick={ upload }>{ t.actions?.upload }</Button>
                            <Button icon={ MdDns } loading={ rendering } onClick={ renderOnServer } style="outline">{ t.actions?.server }</Button>
                        </div>
                    </Panel>
                </div>

                <PdfPreview
                    className    = "h-[70vh] rounded-box border border-base-300 lg:h-auto lg:min-h-[70vh]"
                    document     = { element }
                    fileName     = { fileName }
                    onGenerated  = { ( { blob } ) => { generated.current = blob ; } }
                    toolbarProps = { { showRotate : false , showSearch : false } }
                />

            </div>

            <PdfPanel
                fileName   = { fileName }
                footerNode = {
                    <div className="flex justify-end gap-2 px-4 py-3">
                        <Button onClick={ closePanel } style="ghost">{ t.actions?.close }</Button>
                    </div>
                }
                ref    = { modalRef }
                source = { server }
                title  = { t.actions?.panel }
            />

            <UsedComponents items={ USED } note={ t.used?.note } title={ t.used?.title } />

        </Container>
    ) ;
} ;

export default InvoiceDemo ;
