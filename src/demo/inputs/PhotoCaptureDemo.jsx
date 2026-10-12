'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;

import Button           from '@/components/Button' ;
import FileInput        from '@/components/inputs/FileInput' ;
import PhotoCapture     from '@/components/inputs/PhotoCapture' ;
import SegmentedControl from '@/components/SegmentedControl' ;
import Toggle           from '@/components/checkboxes/Toggle' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import resizeImage from '@/helpers/images/resizeImage' ;
import { EXIF_READ_LENGTH , hasExif , readGpsLocation } from '@/helpers/images/exif' ;

import useI18n from '@/contexts/locale/useI18n' ;

const MAX_SIZES = [ 800 , 1200 , 1600 , 2400 ] ;
const QUALITIES = [ 0.6 , 0.8 , 0.95 ] ;
const TYPES     = [ 'image/jpeg' , 'image/webp' ] ;

/**
 * What a photo shows in the probe : its file named, not dumped.
 */
const describe = ( { file , url : _url , ...photo } ) => ( { ...photo , file : { name : file.name , size : file.size , type : file.type } } ) ;

/**
 * Reads the start of a file : what `hasExif` and `readGpsLocation` need.
 */
const head = file => file.slice( 0 , EXIF_READ_LENGTH ).arrayBuffer() ;

/**
 * PhotoCapture demo.
 *
 * The resize settings shared by two fields — one photo, then up to three in a
 * form — what `onChange` and the form receive, and `resizeImage` alone : the
 * original and the result side by side, the EXIF present then gone.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.photo'] - Dot notation path to the demo locale.
 */
const PhotoCaptureDemo = ( { path = 'demo.inputs.photo' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { formatNumber } = useNumberFormat() ;

    const [ maxSize      , setMaxSize      ] = useState( 1600 ) ;
    const [ quality      , setQuality      ] = useState( 0.8 ) ;
    const [ type         , setType         ] = useState( 'image/jpeg' ) ;
    const [ readLocation , setReadLocation ] = useState( false ) ;
    const [ allowGallery , setAllowGallery ] = useState( false ) ;

    const [ received   , setReceived   ] = useState( null ) ;
    const [ sent       , setSent       ] = useState( null ) ;
    const [ comparison , setComparison ] = useState( null ) ;
    const [ working    , setWorking    ] = useState( false ) ;

    const resize = { maxSize , quality , type } ;

    const kilobytes = bytes => formatNumber( bytes / 1024 , { maximumFractionDigits : 0 , style : 'unit' , unit : 'kilobyte' } ) ;

    const onSubmit = event =>
    {
        event.preventDefault() ;
        setSent( new FormData( event.currentTarget ).getAll( 'photos' ).map( file => ( { name : file.name , size : file.size , type : file.type } ) ) ) ;
    } ;

    const compare = async ( [ file ] ) =>
    {
        if ( !file )
        {
            return ;
        }

        setWorking( true ) ;
        setComparison( null ) ;

        try
        {
            const original = await head( file ) ;
            const result   = await resizeImage( file , resize ) ;

            setComparison(
            {
                after :
                {
                    exif   : hasExif( await head( result.file ) ) ,
                    format : result.file.type ,
                    size   : `${ result.width } × ${ result.height }` ,
                    weight : kilobytes( result.file.size ) ,
                } ,
                before :
                {
                    exif   : hasExif( original ) ,
                    format : file.type || '?' ,
                    size   : `${ result.originalWidth } × ${ result.originalHeight }` ,
                    weight : kilobytes( file.size ) ,
                } ,
                gps : readGpsLocation( original ) ,
            } ) ;
        }
        catch ( error )
        {
            setComparison( { error : error.message } ) ;
        }
        finally
        {
            setWorking( false ) ;
        }
    } ;

    const rows = comparison && !comparison.error ?
    [
        [ t.compare?.size   , comparison.before.size   , comparison.after.size ] ,
        [ t.compare?.weight , comparison.before.weight , comparison.after.weight ] ,
        [ t.compare?.format , comparison.before.format , comparison.after.format ] ,
        [ t.compare?.exif   , comparison.before.exif ? t.compare?.present : t.compare?.absent , comparison.after.exif ? t.compare?.present : t.compare?.absent ] ,
    ] : [] ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            {/* Settings */}
            <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4">
                <h4 className="font-semibold">{ t.settings?.title }</h4>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{ t.settings?.maxSize }</span>
                        <SegmentedControl ariaLabel={ t.settings?.maxSize } items={ MAX_SIZES.map( key => ( { key , label : `${ key }` } ) ) } onChange={ setMaxSize } value={ maxSize } />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{ t.settings?.quality }</span>
                        <SegmentedControl ariaLabel={ t.settings?.quality } items={ QUALITIES.map( key => ( { key , label : `${ key }` } ) ) } onChange={ setQuality } value={ quality } />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">{ t.settings?.type }</span>
                        <SegmentedControl ariaLabel={ t.settings?.type } items={ TYPES.map( key => ( { key , label : key.replace( 'image/' , '' ) } ) ) } onChange={ setType } value={ type } />
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <Toggle checked={ readLocation } color="primary" inline label={ t.settings?.readLocation } onChange={ event => setReadLocation( event.target.checked ) } />
                    <Toggle checked={ allowGallery } color="primary" inline label={ t.settings?.allowGallery } onChange={ event => setAllowGallery( event.target.checked ) } />
                </div>
            </section>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.single?.title }</h4>
                    <PhotoCapture
                        allowGallery = { allowGallery }
                        helper       = { t.single?.helper }
                        label        = { t.single?.label }
                        onChange     = { photos => setReceived( photos.map( describe ) ) }
                        readLocation = { readLocation }
                        resize       = { resize }
                    />
                </div>

                <form className="flex flex-col gap-3" onSubmit={ onSubmit }>
                    <h4 className="font-semibold">{ t.several?.title }</h4>
                    <PhotoCapture
                        allowGallery = { allowGallery }
                        helper       = { t.several?.helper }
                        label        = { t.several?.label }
                        max          = { 3 }
                        name         = "photos"
                        onChange     = { photos => setReceived( photos.map( describe ) ) }
                        readLocation = { readLocation }
                        resize       = { resize }
                    />
                    <div>
                        <Button color="primary" style="outline" type="submit">{ t.several?.submit }</Button>
                    </div>
                    { sent && (
                        <pre className="overflow-x-auto rounded-box bg-base-100 p-3 text-xs">{ t.several?.sent } : { JSON.stringify( sent , null , 2 ) }</pre>
                    ) }
                </form>

            </div>

            <div className="flex flex-col gap-1">
                <span className="font-mono text-sm">{ t.received }</span>
                <pre className="overflow-x-auto rounded-box bg-base-100 p-3 text-xs">
                    { received?.length ? JSON.stringify( received , null , 2 ) : t.empty }
                </pre>
            </div>

            {/* Before / after */}
            <section className="flex flex-col gap-3">
                <h4 className="font-semibold">{ t.compare?.title }</h4>
                <p className="text-sm text-base-content/70">{ t.compare?.note }</p>
                <FileInput accept="image/*" className="max-w-md" label={ t.compare?.pick } onChange={ compare } />

                { working && <span className="text-sm">{ t.compare?.working }</span> }

                { comparison?.error && <p className="text-sm text-error">{ comparison.error }</p> }

                { rows.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table table-sm max-w-xl bg-base-100">
                            <thead>
                                <tr>
                                    <th />
                                    <th>{ t.compare?.before }</th>
                                    <th>{ t.compare?.after }</th>
                                </tr>
                            </thead>
                            <tbody>
                                { rows.map( ( [ name , before , after ] ) => (
                                    <tr key={ name }>
                                        <th>{ name }</th>
                                        <td className="tabular-nums">{ before }</td>
                                        <td className="tabular-nums">{ after }</td>
                                    </tr>
                                ) ) }
                                <tr>
                                    <th>{ t.compare?.gps }</th>
                                    <td className="tabular-nums" colSpan={ 2 }>
                                        { comparison.gps ? JSON.stringify( comparison.gps ) : t.compare?.none }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) }
            </section>

        </Container>
    ) ;
} ;

export default PhotoCaptureDemo ;
