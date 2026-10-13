'use client' ;

import { useEffect , useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdDownload } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Button       from '@/components/Button' ;
import Divider      from '@/components/Divider' ;
import SignaturePad from '@/components/inputs/SignaturePad' ;

import forceDownload  from '@/helpers/net/forceDownload' ;
import signatureToSvg from '@/helpers/signature/signatureToSvg' ;

import useI18n from '@/contexts/locale/useI18n' ;

/** A signature drawn once, for the read-only pad : a 300 × 120 pad, three strokes. */
const SAMPLE =
{
    height  : 120 ,
    strokes :
    [
        [ [ 30 , 85 , 0.4 ] , [ 45 , 40 , 0.6 ] , [ 60 , 30 , 0.7 ] , [ 70 , 55 , 0.6 ] , [ 65 , 90 , 0.5 ] , [ 80 , 70 , 0.5 ] , [ 100 , 60 , 0.6 ] , [ 120 , 75 , 0.5 ] , [ 150 , 50 , 0.7 ] , [ 175 , 65 , 0.5 ] , [ 200 , 45 , 0.6 ] , [ 230 , 70 , 0.5 ] , [ 260 , 55 , 0.4 ] ] ,
        [ [ 90 , 95 , 0.3 ] , [ 150 , 92 , 0.4 ] , [ 220 , 96 , 0.3 ] ] ,
        [ [ 245 , 35 , 0.6 ] , [ 250 , 38 , 0.6 ] ] ,
    ] ,
    width   : 300 ,
} ;

/**
 * SignaturePad demo : the pad and its exports, a read-only one, a form.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.signature'] - Dot notation path to the demo locale.
 */
const SignaturePadDemo = ( { path = 'demo.inputs.signature' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const pad = useRef( null ) ;

    const [ value , setValue ] = useState( null ) ;
    const [ png   , setPng   ] = useState( null ) ;
    const [ sent  , setSent  ] = useState( null ) ;

    const strokes = value?.strokes.length ?? 0 ;
    const points  = value?.strokes.reduce( ( sum , stroke ) => sum + stroke.length , 0 ) ?? 0 ;

    // The PNG beside the pad, redrawn after each stroke ; its url released when replaced.
    useEffect( () =>
    {
        let stale = false ;
        let url   = null ;

        if ( !value )
        {
            setPng( null ) ;
            return undefined ;
        }

        pad.current?.toPng( { scale : 2 } ).then( blob =>
        {
            if ( stale || !blob )
            {
                return ;
            }

            url = URL.createObjectURL( blob ) ;
            setPng( url ) ;
        } ) ;

        return () =>
        {
            stale = true ;
            if ( url ) URL.revokeObjectURL( url ) ;
        } ;
    }
    , [ value ] ) ;

    const download = async () =>
    {
        const blob = await pad.current?.toPng( { background : '#ffffff' , scale : 4 } ) ;

        if ( blob )
        {
            forceDownload( 'signature.png' , URL.createObjectURL( blob ) , true ) ;
        }
    } ;

    const onSubmit = event =>
    {
        event.preventDefault() ;
        setSent( new FormData( event.currentTarget ).get( 'signature' ) ?? '' ) ;
    } ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            {/* The pad and what comes out of it */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.pad?.title }</h3>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-3">
                        <SignaturePad helper={ t.pad?.helper } label={ t.pad?.label } onChange={ setValue } ref={ pad } />
                        <span className="font-mono text-xs opacity-60">{ value ? format( t.pad?.strokes ?? '{0} / {1}' , strokes , points ) : t.pad?.empty }</span>
                        <div>
                            <Button disabled={ !value } icon={ MdDownload } onClick={ download } size="sm">{ t.pad?.download }</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium">{ t.pad?.png }</span>
                            <div className="flex h-32 items-center justify-center rounded-box border border-dashed border-base-300 bg-white">
                                {/* biome-ignore lint/performance/noImgElement: a local object URL, nothing for next/image to optimise. */}
                                { png && <img alt="" className="max-h-full max-w-full" src={ png } /> }
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium">{ t.pad?.svg }</span>
                            <div
                                className = "flex h-32 items-center justify-center rounded-box border border-dashed border-base-300 bg-white [&>svg]:max-h-full [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:w-auto"
                                // biome-ignore lint/security/noDangerouslySetInnerHtml: the SVG is the library's own serialization of the strokes, nothing from a user.
                                dangerouslySetInnerHTML = { { __html : value ? signatureToSvg( value , { color : '#1f2937' , width : 240 } ) : '' } }
                            />
                        </div>
                        <div className="col-span-2 flex flex-col gap-1">
                            <span className="text-xs font-medium">{ t.pad?.json }</span>
                            <pre className="max-h-40 overflow-auto rounded-box bg-base-200 p-3 text-xs">{ value ? JSON.stringify( { ...value , strokes : value.strokes.map( stroke => `[${ stroke.length } points]` ) } , null , 2 ) : 'null' }</pre>
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            {/* Read-only */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.readOnly?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.readOnly?.text }</p>
                <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
                    <SignaturePad label={ t.readOnly?.label } readOnly value={ SAMPLE } />
                    <SignaturePad padClassName="h-24" readOnly value={ SAMPLE } />
                </div>
            </section>

            <Divider />

            {/* In a form */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.form?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.form?.text }</p>
                <form className="flex max-w-xl flex-col gap-3" onSubmit={ onSubmit }>
                    <SignaturePad label={ t.form?.label } name="signature" />
                    <div>
                        <Button color="primary" type="submit">{ t.form?.submit }</Button>
                    </div>
                </form>
                { sent !== null && (
                    <p className="font-mono text-xs opacity-70">
                        { sent ? format( t.form?.sent ?? '{0} {1} {2}' , 'signature' , sent.length , `${ sent.slice( 0 , 30 ) }…` ) : t.form?.none }
                    </p>
                ) }
            </section>

            <Divider />

            <section className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{ t.proof?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.proof?.text }</p>
            </section>

        </Container>
    ) ;
} ;

export default SignaturePadDemo ;
