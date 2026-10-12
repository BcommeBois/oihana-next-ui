'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;

import Button       from '@/components/Button' ;
import FileDropzone from '@/components/media/FileDropzone' ;

import useI18n from '@/contexts/locale/useI18n' ;

const MB = 1024 * 1024 ;

/**
 * What a file shows in the probe : named, not dumped.
 */
const describe = ( { file , url : _url , ...item } ) => ( { ...item , file : { name : file.name , size : file.size , type : file.type } } ) ;

/**
 * FileDropzone demo.
 *
 * Documents under a type, weight and count ; images under minimum dimensions,
 * shrunk ; and a zone in a form with a rule of its own. What `onChange` and
 * `onReject` last received is printed.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.media.dropzone'] - Dot notation path to the demo locale.
 */
const FileDropzoneDemo = ( { path = 'demo.media.dropzone' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ changed  , setChanged  ] = useState( null ) ;
    const [ rejected , setRejected ] = useState( null ) ;
    const [ sent     , setSent     ] = useState( null ) ;

    const onChange = files => setChanged( files.map( describe ) ) ;
    const onReject = rejections => setRejected( rejections.map( ( { file , message , reason } ) => ( { file : file.name , message , reason } ) ) ) ;

    const onSubmit = event =>
    {
        event.preventDefault() ;
        setSent( new FormData( event.currentTarget ).getAll( 'attachments' ).map( file => ( { name : file.name , size : file.size , type : file.type } ) ) ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.documents?.title }</h4>
                    <FileDropzone
                        accept   = ".pdf,application/pdf"
                        helper   = { t.documents?.helper }
                        label    = { t.documents?.label }
                        maxFiles = { 3 }
                        maxSize  = { 5 * MB }
                        onChange = { onChange }
                        onReject = { onReject }
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.images?.title }</h4>
                    <FileDropzone
                        accept    = "image/*"
                        helper    = { t.images?.helper }
                        label     = { t.images?.label }
                        minHeight = { 600 }
                        minWidth  = { 800 }
                        onChange  = { onChange }
                        onReject  = { onReject }
                        resize    = { { maxSize : 1600 } }
                    />
                </div>

            </div>

            <form className="flex max-w-2xl flex-col gap-3" onSubmit={ onSubmit }>
                <h4 className="font-semibold">{ t.form?.title }</h4>
                <p className="text-sm text-base-content/70">{ t.form?.note }</p>
                <FileDropzone
                    helper   = { t.form?.helper }
                    label    = { t.form?.label }
                    maxSize  = { 10 * MB }
                    name     = "attachments"
                    onChange = { onChange }
                    onReject = { onReject }
                    validate = { file => !/\.(exe|msi|bat|cmd|sh)$/i.test( file.name ) || t.form?.noExe }
                />
                <div>
                    <Button color="primary" style="outline" type="submit">{ t.form?.submit }</Button>
                </div>
                { sent && (
                    <pre className="overflow-x-auto rounded-box bg-base-100 p-3 text-xs">{ t.form?.sent } : { JSON.stringify( sent , null , 2 ) }</pre>
                ) }
            </form>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm">{ t.change }</span>
                    <pre className="overflow-x-auto rounded-box bg-base-100 p-3 text-xs">{ changed ? JSON.stringify( changed , null , 2 ) : t.empty }</pre>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm">{ t.reject }</span>
                    <pre className="overflow-x-auto rounded-box bg-base-100 p-3 text-xs">{ rejected ? JSON.stringify( rejected , null , 2 ) : t.empty }</pre>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default FileDropzoneDemo ;
