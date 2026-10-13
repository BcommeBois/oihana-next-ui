'use client' ;

import { useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Button from '@/components/Button' ;

import ScanListField from '@/components/lists/ScanListField' ;

import useFeedbackSignal from '@/hooks/useFeedbackSignal' ;

import useI18n from '@/contexts/locale/useI18n' ;

/** A few codes the page knows, so a read shows a name ; any other code shows as it is. */
const KNOWN =
{
    '3017620422003' : 'pasta' ,
    '5000112637922' : 'cola' ,
    '9501101530003' : 'oak' ,
} ;

/**
 * The list of what was scanned : a field and, under it, the codes read with
 * their counts.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.barcodes.scanList'] - Dot notation path to the demo locale.
 */
const ScanListDemo = ( { path = 'demo.barcodes.scanList' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const list = useRef( null ) ;

    const [ lines , setLines ] = useState( [] ) ;
    const [ last  , setLast  ] = useState( null ) ;

    const { signal } = useFeedbackSignal( { sound : true , vibration : true } ) ;

    const onScan = ( reading , status ) =>
    {
        signal( status === 'refused' ? 'error' : 'success' ) ;
        setLast( format( t.status?.[ status ] ?? '{0}' , reading.code ?? reading.value ?? '' ) ) ;
    } ;

    return (
        <Container className="flex flex-col gap-4 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <h2 className="text-2xl font-semibold">{ t.title }</h2>
            <p className="text-sm text-base-content/70">{ t.text }</p>

            <div className="flex flex-wrap items-center gap-2">
                { Object.keys( KNOWN ).map( code => (
                    <Button key={ code } onClick={ () => list.current?.add( code ) } size="xs" style="outline">{ format( t.use ?? '{0}' , t.names?.[ KNOWN[ code ] ] ) }</Button>
                ) ) }
                <Button disabled={ lines.length === 0 } onClick={ () => list.current?.clear() } size="xs" style="ghost">{ t.clear }</Button>
            </div>

            <ScanListField
                className  = "max-w-2xl"
                inputProps = { { label : t.label , placeholder : t.placeholder } }
                max        = { 20 }
                onChange   = { setLines }
                onScan     = { onScan }
                ref        = { list }
                resolve    = { code => ( KNOWN[ code ] ? t.names?.[ KNOWN[ code ] ] : null ) }
            />

            { last && <p className="text-xs text-base-content/60">{ last }</p> }
            <p className="text-xs text-base-content/60">{ t.help }</p>

        </Container>
    ) ;
} ;

export default ScanListDemo ;
