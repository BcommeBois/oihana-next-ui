'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;

import FileInput from '@/components/inputs/FileInput' ;

import useI18n from '@/contexts/locale/useI18n' ;

const COLORS = [ 'primary' , 'secondary' , 'accent' , 'neutral' , 'info' , 'success' , 'warning' , 'error' ] ;

const SIZES = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

const kilobytes = new Intl.NumberFormat( undefined , { maximumFractionDigits : 1 , style : 'unit' , unit : 'kilobyte' } ) ;

/**
 * What a handler received : the name, type and weight of every file.
 *
 * @param {Object} props
 * @param {File[]} props.files
 * @param {string} props.empty - Shown when the list is empty.
 */
const FilesProbe = ({ empty , files }) => (
    <div className="flex flex-col gap-1 font-mono text-xs">
        <span className="opacity-60">files.length = { files.length }</span>
        { files.length === 0 ? (
            <span className="badge badge-sm badge-ghost">{ empty }</span>
        ) : (
            files.map( file => (
                <span key={ `${ file.name }-${ file.lastModified }` } className="badge badge-sm badge-primary h-auto py-0.5">
                    { file.name } · { file.type || '?' } · { kilobytes.format( file.size / 1024 ) }
                </span>
            ) )
        ) }
    </div>
) ;

/**
 * FileInput demo.
 *
 * Every handler prints what it received — the files, not the event — so the
 * contract is visible, not just the field.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.fileInput'] - Dot notation path to the demo locale.
 */
const FileInputDemo = ( { path = 'demo.inputs.fileInput' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ single  , setSingle  ] = useState( [] ) ;
    const [ images  , setImages  ] = useState( [] ) ;
    const [ camera  , setCamera  ] = useState( [] ) ;
    const [ invalid , setInvalid ] = useState( [] ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.single?.title }</h4>
                    <FileInput
                        accept   = ".pdf"
                        helper   = { t.single?.helper }
                        label    = { t.single?.label }
                        onChange = { setSingle }
                    />
                    <FilesProbe empty={ t.empty } files={ single } />
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.multiple?.title }</h4>
                    <FileInput
                        accept   = "image/*"
                        color    = "primary"
                        helper   = { t.multiple?.helper }
                        label    = { t.multiple?.label }
                        multiple
                        onChange = { setImages }
                    />
                    <FilesProbe empty={ t.empty } files={ images } />
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.camera?.title }</h4>
                    <p className="text-sm text-base-content/70">{ t.camera?.note }</p>
                    <FileInput
                        accept   = "image/*"
                        capture  = "environment"
                        label    = { t.camera?.label }
                        onChange = { setCamera }
                        size     = "lg"
                    />
                    <FilesProbe empty={ t.empty } files={ camera } />
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.states?.title }</h4>
                    <FileInput
                        error    = { invalid.length === 0 ? t.states?.error : undefined }
                        label    = { t.states?.required }
                        onChange = { setInvalid }
                        required
                    />
                    <FileInput
                        disabled
                        label = { t.states?.disabled }
                    />
                    <FileInput
                        legend      = { t.states?.legend }
                        helper      = { t.states?.fieldset }
                        useFieldset
                    />
                </div>

            </div>

            <div className="flex flex-col gap-3">
                <h4 className="font-semibold">{ t.colors }</h4>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                    { COLORS.map( color => (
                        <div key={ color } className="flex flex-col gap-1">
                            <span className="text-xs font-mono text-base-content/60">color="{ color }"</span>
                            <FileInput color={ color } size="sm" />
                        </div>
                    ) ) }
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-mono text-base-content/60">style="ghost"</span>
                        <FileInput size="sm" style="ghost" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <h4 className="font-semibold">{ t.sizes }</h4>
                { SIZES.map( size => (
                    <div key={ size } className="flex flex-col gap-1">
                        <span className="text-xs font-mono text-base-content/60">size="{ size }"</span>
                        <FileInput size={ size } />
                    </div>
                ) ) }
            </div>

        </Container>
    ) ;
} ;

export default FileInputDemo ;
