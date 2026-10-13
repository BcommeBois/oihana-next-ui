'use client' ;

import { useEffect , useState } from 'react' ;
import { useMeasure }           from 'react-use' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Alert      from '@/components/Alert' ;
import Badge      from '@/components/Badge' ;
import Divider    from '@/components/Divider' ;
import LinkButton from '@/components/links/LinkButton' ;
import Loading    from '@/components/Loading' ;
import RetryState from '@/components/RetryState' ;

import { PDFJS_PATH , loadEngine } from '@/components/documents/engine' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * The sample document, served by the lab.
 * @type {string}
 */
const SAMPLE = '/documents/sample.pdf' ;

/**
 * The widest the sample page is drawn, in CSS pixels : an A4 at its natural size.
 * @type {number}
 */
const MAX_WIDTH = 640 ;

/**
 * PDF engine demo : the engine loads, says where its files come from, and
 * draws the first page of a sample document.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.documents.engine'] - Dot notation path to the demo locale.
 */
const PdfEngineDemo = ( { path = 'demo.documents.engine' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ engine  , setEngine  ] = useState( null ) ;
    const [ missing , setMissing ] = useState( false ) ;
    const [ pages   , setPages   ] = useState( null ) ;
    const [ failed  , setFailed  ] = useState( false ) ;
    const [ attempt , setAttempt ] = useState( 0 ) ;

    const [ measureRef , { width } ] = useMeasure() ;

    useEffect( () =>
    {
        loadEngine().then( setEngine , () => setMissing( true ) ) ;
    }
    , [] ) ;

    const retry = () =>
    {
        setFailed( false ) ;
        setPages( null ) ;
        setAttempt( count => count + 1 ) ;
    } ;

    const pageWidth = Math.max( 0 , Math.min( width , MAX_WIDTH ) ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-6 rounded-box" maxWidth="max-w-4xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <div className="flex flex-wrap items-center gap-2">
                { missing
                    ? <Alert color="warning" showIcon>{ t.missing }</Alert>
                    : engine
                        ? <Badge color="success">{ format( t.ready ?? '' , engine.version , `${ PDFJS_PATH }/${ engine.version }/` ) }</Badge>
                        : <Badge style="ghost">{ t.waiting }</Badge> }
            </div>

            <Divider />

            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.sample }</h3>
                <p className="text-sm text-base-content/70">{ t.sampleHelp }</p>

                <div className="flex flex-wrap items-center gap-3">
                    <LinkButton color="primary" href={ SAMPLE } size="sm" style="outline" target="_blank">{ t.open }</LinkButton>
                    { pages !== null && <Badge style="ghost">{ format( t.pages ?? '' , pages ) }</Badge> }
                </div>

                <div className="w-full" ref={ measureRef }>
                    { engine && !failed && pageWidth > 0 && (
                        <engine.Document
                            key           = { attempt }
                            className     = "flex justify-center"
                            file          = { SAMPLE }
                            loading       = { <Loading animation="spinner" /> }
                            error         = { null }
                            onLoadError   = { () => setFailed( true ) }
                            onLoadSuccess = { document => setPages( document.numPages ) }
                            options       = { engine.options }
                        >
                            <engine.Page
                                className  = "shadow-md"
                                pageNumber = { 1 }
                                width      = { pageWidth }
                            />
                        </engine.Document>
                    ) }

                    { failed && <RetryState onRetry={ retry } /> }
                </div>
            </section>

        </Container>
    ) ;
} ;

export default PdfEngineDemo ;
