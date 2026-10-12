'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import InputScan from '@/components/inputs/InputScan' ;

import useFeedbackSignal from '@/hooks/useFeedbackSignal' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * Prints a reading as JSON, the GS1 separator made visible.
 *
 * @param {Object} props
 * @param {?Object} props.value
 * @param {string} props.empty
 */
const Probe = ( { empty , value } ) => (
    <pre className="overflow-x-auto rounded-box bg-base-100 p-3 text-xs">
        { value ? JSON.stringify( value , null , 2 ).replaceAll( '\\u001d' , '␝' ) : empty }
    </pre>
) ;

/**
 * InputScan demo.
 *
 * A plain scan field, then one that accepts EAN-13 only and takes a series ;
 * every outcome is printed as received, and heard through useFeedbackSignal.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.scan'] - Dot notation path to the demo locale.
 */
const InputScanDemo = ( { path = 'demo.inputs.scan' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { signal } = useFeedbackSignal() ;

    const [ last     , setLast     ] = useState( null ) ;
    const [ rejected , setRejected ] = useState( null ) ;
    const [ lines    , setLines    ] = useState( [] ) ;

    const onScan = reading =>
    {
        signal( 'success' ) ;
        setLast( reading ) ;
    } ;

    const onReject = ( reading , message ) =>
    {
        signal( 'error' ) ;
        setRejected( { message , reading } ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.simple?.title }</h4>
                    <InputScan
                        helper      = { t.simple?.helper }
                        label       = { t.simple?.label }
                        onReject    = { onReject }
                        onScan      = { onScan }
                        placeholder = { t.simple?.placeholder }
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">{ t.validated?.title }</h4>
                    <InputScan
                        clearOnScan
                        closeOnScan = { false }
                        formats     = { [ 'ean_13' ] }
                        helper      = { t.validated?.helper }
                        inputMode   = "numeric"
                        label       = { t.validated?.label }
                        onReject    = { onReject }
                        onScan      = { reading =>
                        {
                            onScan( reading ) ;
                            setLines( list => [ reading.value , ...list ] ) ;
                        } }
                        placeholder = { t.validated?.placeholder }
                        validate    = { ( { value } ) => /^\d{13}$/.test( value ) || t.validated?.expected }
                    />
                    <span className="text-sm">{ format( t.lines ?? '{0}' , lines.length ) }</span>
                    { lines.length > 0 && (
                        <span className="font-mono text-xs text-base-content/60 break-all">{ lines.join( ' · ' ) }</span>
                    ) }
                </div>

            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm">{ t.last }</span>
                    <Probe empty={ t.none } value={ last } />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-sm">{ t.rejected }</span>
                    <Probe empty={ t.none } value={ rejected } />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default InputScanDemo ;
