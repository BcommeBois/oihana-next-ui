'use client' ;

import { useEffect , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert            from '@/components/Alert' ;
import Badge            from '@/components/Badge' ;
import Button           from '@/components/Button' ;
import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;
import Input            from '@/components/inputs/Input' ;
import SignaturePad     from '@/components/inputs/SignaturePad' ;
import FileDropzone     from '@/components/media/FileDropzone' ;

import PdfViewer from '@/components/documents/PdfViewer' ;

import { preloadEditor } from '@/components/documents/engine/editor' ;

import addPageNumbers from '@/helpers/pdf/edit/addPageNumbers' ;
import extractPages   from '@/helpers/pdf/edit/extractPages' ;
import fillForm       from '@/helpers/pdf/edit/fillForm' ;
import listFormFields from '@/helpers/pdf/edit/listFormFields' ;
import mergePdfs      from '@/helpers/pdf/edit/mergePdfs' ;
import rotatePages    from '@/helpers/pdf/edit/rotatePages' ;
import stampImage     from '@/helpers/pdf/edit/stampImage' ;
import stampSignature from '@/helpers/pdf/edit/stampSignature' ;
import toPdfFile      from '@/helpers/pdf/edit/toPdfFile' ;
import watermark      from '@/helpers/pdf/edit/watermark' ;

import useI18n from '@/contexts/locale/useI18n' ;

const SAMPLE = '/documents/sample.pdf' ;
const LONG   = '/documents/long.pdf' ;
const FORM   = '/documents/form.pdf' ;
const LOGO   = '/assets/icons/logo.png' ;

const MB = 1024 * 1024 ;

const ANGLES    = [ 90 , 180 , -90 ] ;
const POSITIONS = [ 'bottom-center' , 'bottom-right' , 'top-right' ] ;
const ANCHORS   = [ 'bottom-right' , 'bottom-left' , 'top-right' ] ;

/**
 * One edit : runs a task that gives bytes, keeps the file it makes, says
 * when it is busy and what went wrong.
 */
const useEdit = fileName =>
{
    const [ file  , setFile  ] = useState( null ) ;
    const [ busy  , setBusy  ] = useState( false ) ;
    const [ error , setError ] = useState( null ) ;
    const [ pages , setPages ] = useState( 0 ) ;

    const run = async task =>
    {
        setBusy( true ) ;
        setError( null ) ;

        try
        {
            setFile( toPdfFile( await task() , fileName ) ) ;
        }
        catch ( failure )
        {
            setError( failure ) ;
        }
        finally
        {
            setBusy( false ) ;
        }
    } ;

    return { busy , error , file , pages , run , setPages } ;
} ;

/** The result of an edit : the viewer, or the error. */
const Result = ( { edit , labels } ) => (
    <>
        { edit.error && <Alert align="start" level="error">{ edit.error.message }</Alert> }
        { edit.file && (
            <>
                <PdfViewer className="h-[55vh] rounded-box border border-base-300" fileName={ edit.file.name } onLoad={ ( { pages } ) => edit.setPages( pages ) } source={ edit.file } toolbarProps={ { showSearch : false } } />
                <p className="text-xs text-base-content/60">{ format( labels.result ?? '{0}' , edit.file.name , edit.pages ) }</p>
            </>
        ) }
    </>
) ;

/**
 * PDF editing demo : merge, extract, rotate, number, sign a received
 * document, watermark, fill a form — each a helper, each shown in the viewer.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.documents.edit'] - Dot notation path to the demo locale.
 */
const PdfEditDemo = ( { path = 'demo.documents.edit' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const engineLabels = t.engine ?? {} ;

    const [ ready   , setReady   ] = useState( false ) ;
    const [ missing , setMissing ] = useState( false ) ;

    useEffect( () =>
    {
        preloadEditor().then( ok => { if ( ok ) setReady( true ) ; else setMissing( true ) ; } ) ;
    }
    , [] ) ;

    // Merge
    const merge = useEdit( 'fusion.pdf' ) ;

    // Extract
    const extract = useEdit( 'extrait.pdf' ) ;
    const [ range , setRange ] = useState( '1-3,5' ) ;

    // Rotate
    const rotate = useEdit( 'tourne.pdf' ) ;
    const [ angle , setAngle ] = useState( 90 ) ;
    const [ which , setWhich ] = useState( '2' ) ;

    // Number
    const number = useEdit( 'numerote.pdf' ) ;
    const [ position , setPosition ] = useState( 'bottom-center' ) ;
    const [ pattern  , setPattern  ] = useState( '{0} / {1}' ) ;
    const [ skip     , setSkip     ] = useState( true ) ;

    // Sign
    const sign = useEdit( 'signe.pdf' ) ;
    const [ dropped   , setDropped   ] = useState( null ) ;
    const [ signature , setSignature ] = useState( null ) ;
    const [ anchor    , setAnchor    ] = useState( 'bottom-right' ) ;
    const [ last      , setLast      ] = useState( true ) ;
    const [ width     , setWidth     ] = useState( '50' ) ;
    const [ logo      , setLogo      ] = useState( true ) ;

    // Watermark
    const mark = useEdit( 'filigrane.pdf' ) ;
    const [ word    , setWord    ] = useState( 'COPIE' ) ;
    const [ slant   , setSlant   ] = useState( 45 ) ;

    // Form
    const fill = useEdit( 'bon-de-commande.pdf' ) ;
    const [ fields  , setFields  ] = useState( null ) ;
    const [ values  , setValues  ] = useState( {} ) ;
    const [ flatten , setFlatten ] = useState( true ) ;

    useEffect( () =>
    {
        if ( ready )
        {
            listFormFields( FORM ).then( list =>
            {
                setFields( list ) ;
                setValues( Object.fromEntries( list.map( field => [ field.name , t.form?.defaults?.[ field.name ] ?? ( field.type === 'checkbox' ? false : Array.isArray( field.value ) ? field.value[ 0 ] ?? '' : field.value ?? '' ) ] ) ) ) ;
            }
            , () => setFields( [] ) ) ;
        }
    }
    , [ ready , t.form?.defaults ] ) ;

    const source = dropped ?? SAMPLE ;

    const onSign = () => sign.run( async () =>
    {
        const page = last ? await countPages( source ) : 1 ;

        let bytes = await stampSignature( source , signature , { anchor , page , width : Number( width ) || 50 , x : 15 , y : 20 } ) ;

        if ( logo )
        {
            bytes = await stampImage( bytes , await ( await fetch( LOGO ) ).blob() , { anchor : 'top-right' , opacity : 0.9 , page : 1 , width : 18 , x : 12 , y : 12 } ) ;
        }

        return bytes ;
    } ) ;

    const field = item =>
    {
        const value = values[ item.name ] ;
        const label = t.form?.fields?.[ item.name ] ?? item.name ;
        const set   = next => setValues( current => ( { ...current , [ item.name ] : next } ) ) ;

        switch ( item.type )
        {
            case 'checkbox' : return <Toggle checked={ !!value } key={ item.name } label={ label } onChange={ event => set( event.target.checked ) } size="sm" /> ;
            case 'radio'    :
            case 'dropdown' : return (
                <div className="flex flex-wrap items-center gap-2" key={ item.name }>
                    <span className="text-sm">{ label }</span>
                    <SegmentedControl ariaLabel={ label } items={ item.options.map( option => ( { key : option , label : option } ) ) } onChange={ set } value={ value } />
                </div>
            ) ;
            default : return <Input key={ item.name } label={ label } onChange={ set } value={ value ?? '' } /> ;
        }
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold">{ t.title }</h2>
                { ready && <Badge color="success" style="soft">{ engineLabels.ready }</Badge> }
                { missing && <Badge color="warning" style="soft">{ engineLabels.missing }</Badge> }
                { !ready && !missing && <Badge style="ghost">{ engineLabels.waiting }</Badge> }
            </div>

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            {/* Merge */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.merge?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.merge?.text }</p>
                <div>
                    <Button color="primary" disabled={ !ready } loading={ merge.busy } onClick={ () => merge.run( () => mergePdfs( [ SAMPLE , LONG ] , { title : t.merge?.name } ) ) }>{ t.merge?.action }</Button>
                </div>
                <Result edit={ merge } labels={ t } />
            </section>

            <Divider />

            {/* Extract */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.extract?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.extract?.text }</p>
                <div className="flex flex-wrap items-end gap-3">
                    <Input className="w-48" label={ t.extract?.pages } onChange={ setRange } value={ range } />
                    <Button color="primary" disabled={ !ready } loading={ extract.busy } onClick={ () => extract.run( () => extractPages( LONG , range ) ) }>{ t.extract?.action }</Button>
                </div>
                <p className="text-xs text-base-content/60">{ t.extract?.helper }</p>
                <Result edit={ extract } labels={ t } />
            </section>

            <Divider />

            {/* Rotate */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.rotate?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.rotate?.text }</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ t.rotate?.page }</span>
                        <SegmentedControl ariaLabel={ t.rotate?.page } items={ [ { key : 'all' , label : t.rotate?.all } , { key : '1' , label : '1' } , { key : '2' , label : '2' } ] } onChange={ setWhich } value={ which } />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ t.rotate?.angle }</span>
                        <SegmentedControl ariaLabel={ t.rotate?.angle } items={ ANGLES.map( key => ( { key , label : `${ key }°` } ) ) } onChange={ setAngle } value={ angle } />
                    </div>
                    <Button color="primary" disabled={ !ready } loading={ rotate.busy } onClick={ () => rotate.run( () => rotatePages( SAMPLE , { angle , pages : which === 'all' ? undefined : which } ) ) }>{ t.rotate?.action }</Button>
                </div>
                <Result edit={ rotate } labels={ t } />
            </section>

            <Divider />

            {/* Number */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.number?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.number?.text }</p>
                <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ t.number?.position }</span>
                        <SegmentedControl ariaLabel={ t.number?.position } items={ POSITIONS.map( key => ( { key , label : t.number?.positions?.[ key ] ?? key } ) ) } onChange={ setPosition } value={ position } />
                    </div>
                    <Input className="w-40" label={ t.number?.format } onChange={ setPattern } value={ pattern } />
                    <Toggle checked={ skip } inline label={ t.number?.skip } onChange={ event => setSkip( event.target.checked ) } size="sm" />
                    <Button color="primary" disabled={ !ready } loading={ number.busy } onClick={ () => number.run( () => addPageNumbers( LONG , { format : pattern , pages : skip ? '2-' : undefined , position } ) ) }>{ t.number?.action }</Button>
                </div>
                <Result edit={ number } labels={ t } />
            </section>

            <Divider />

            {/* Sign a received document */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.sign?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.sign?.text }</p>

                <div className="grid gap-4 lg:grid-cols-2">
                    <FileDropzone
                        accept   = ".pdf,application/pdf"
                        helper   = { t.sign?.dropHelper }
                        label    = { t.sign?.drop }
                        maxFiles = { 1 }
                        maxSize  = { 20 * MB }
                        onChange = { files => setDropped( files[ 0 ]?.file ?? files[ 0 ] ?? null ) }
                    />
                    <SignaturePad expandable label={ t.sign?.pad } onChange={ setSignature } value={ signature } />
                </div>

                <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ t.sign?.anchor }</span>
                        <SegmentedControl ariaLabel={ t.sign?.anchor } items={ ANCHORS.map( key => ( { key , label : t.sign?.anchors?.[ key ] ?? key } ) ) } onChange={ setAnchor } value={ anchor } />
                    </div>
                    <Input className="w-28" label={ t.sign?.width } onChange={ setWidth } type="number" value={ width } />
                    <Toggle checked={ last } inline label={ t.sign?.last } onChange={ event => setLast( event.target.checked ) } size="sm" />
                    <Toggle checked={ logo } inline label={ t.sign?.logo } onChange={ event => setLogo( event.target.checked ) } size="sm" />
                    <Button color="primary" disabled={ !ready || !signature } loading={ sign.busy } onClick={ onSign }>{ t.sign?.action }</Button>
                </div>
                <Result edit={ sign } labels={ t } />
            </section>

            <Divider />

            {/* Watermark */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.watermark?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.watermark?.text }</p>
                <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
                    <Input className="w-48" label={ t.watermark?.word } onChange={ setWord } value={ word } />
                    <div className="flex items-center gap-2">
                        <span className="text-sm">{ t.watermark?.angle }</span>
                        <SegmentedControl ariaLabel={ t.watermark?.angle } items={ [ 0 , 45 , 90 ].map( key => ( { key , label : `${ key }°` } ) ) } onChange={ setSlant } value={ slant } />
                    </div>
                    <Button color="primary" disabled={ !ready || !word } loading={ mark.busy } onClick={ () => mark.run( () => watermark( SAMPLE , word , { angle : slant } ) ) }>{ t.watermark?.action }</Button>
                </div>
                <Result edit={ mark } labels={ t } />
            </section>

            <Divider />

            {/* Fill a form */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.form?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.form?.text }</p>

                { fields && fields.length > 0 && (
                    <div className="grid max-w-3xl gap-3 md:grid-cols-2">
                        { fields.map( field ) }
                    </div>
                ) }

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Toggle checked={ flatten } inline label={ t.form?.flatten } onChange={ event => setFlatten( event.target.checked ) } size="sm" />
                    <Button color="primary" disabled={ !ready || !fields?.length } loading={ fill.busy } onClick={ () => fill.run( () => fillForm( FORM , values , { flatten } ) ) }>{ t.form?.action }</Button>
                </div>
                <p className="text-xs text-base-content/60">{ t.form?.help }</p>
                <Result edit={ fill } labels={ t } />
            </section>

        </Container>
    ) ;
} ;

/** How many pages a document has, through the editing engine. */
const countPages = async source =>
{
    const { default : openPdf } = await import( '@/helpers/pdf/edit/openPdf' ) ;
    const { document } = await openPdf( source ) ;
    return document.getPageCount() ;
} ;

export default PdfEditDemo ;
