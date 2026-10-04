'use client' ;

import { useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdDataObject , MdDelete , MdKey , MdQuestionAnswer } from 'react-icons/md' ;

import Badge  from '@/components/Badge' ;
import Button from '@/components/Button' ;

import ConfirmTypedModal from '@/components/modals/ConfirmTypedModal' ;
import JsonViewerModal   from '@/components/modals/JsonViewerModal' ;
import PromptModal       from '@/components/modals/PromptModal' ;
import SecretRevealModal from '@/components/modals/SecretRevealModal' ;

import Container from '@/display/Container' ;

import useI18n from '@/contexts/locale/useI18n' ;
import useToast , { ERROR , SUCCESS } from '@/contexts/toasts/useToast' ;

/**
 * The ids a single confirmation is re-aimed at, which is the whole point of the
 * card : the typed value must not survive the change of target. Their labels
 * come from the bundle, in the same order.
 * @type {string[]}
 */
const ROW_IDS = [ 'record-4817' , 'record-9052' ] ;

/**
 * A payload with enough shapes in it to be worth looking at : nesting, a list,
 * a null, a number.
 * @type {Object}
 */
const PAYLOAD =
{
    id        : 'record-4817' ,
    label     : 'First record' ,
    archived  : false ,
    revision  : 12 ,
    retiredAt : null ,
    tags      : [ 'alpha' , 'beta' ] ,
    owner     : { id : 'user-77' , name : 'A. Reader' } ,
} ;

/**
 * Builds something secret-shaped to reveal.
 *
 * It is generated in a handler rather than during a render : a value drawn from
 * `Math.random()` while rendering is a different value on the server and in the
 * browser, which React reports as a hydration mismatch.
 *
 * @returns {string}
 */
const makeSecret = () =>
{
    const body = Array.from( { length : 4 } , () => Math.random().toString( 36 ).slice( 2 , 14 ) ).join( '' ) ;

    return JSON.stringify( { type : 'example' , id : `key-${ Date.now() }` , value : body } , null , 2 ) ;
} ;

/**
 * One card : a title, a sentence, and whatever the card is demonstrating.
 */
const Case = ({ children , icon : Icon , subtitle , title }) =>
(
    <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">

        <h3 className="flex items-center gap-2 font-semibold">
            <Icon className="size-5 text-base-content/60" />
            { title }
        </h3>

        <p className="text-sm text-base-content/70">{ subtitle }</p>

        { children }

    </div>
) ;

Case.displayName = 'Case' ;

/**
 * Demo : the four presets of the modal family that ask for something before
 * they let go.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.modals.presets'] - Dot notation path to the demo locale. — a typed confirmation, a secret shown once, a question, and a
 * payload.
 *
 * Each card is self-contained and destroys nothing : the « records » are two
 * entries in an array, and the secret is generated in the browser.
 *
 * @returns {React.JSX.Element}
 */
const ModalPresetsDemo = ( { path = 'demo.modals.presets' } = {} ) =>
{
    const t = useI18n( path ) ;

    const rows = ROW_IDS.map( ( id , index ) => ( { id , label : t.rows?.[ index ] ?? id } ) ) ;

    const [ target  , setTarget  ] = useState( null ) ;
    const [ removed , setRemoved ] = useState( [] ) ;

    const [ secret , setSecret ] = useState( null ) ;

    const [ asking , setAsking ] = useState( false ) ;
    const [ answer , setAnswer ] = useState( null ) ;

    const [ said , setSaid ] = useState( null ) ;

    const { toast } = useToast() ;

    const confirmRef = useRef( null ) ;
    const jsonRef    = useRef( null ) ;

    const aimAt = ( row ) =>
    {
        setTarget( row ) ;
        confirmRef.current?.showModal() ;
    } ;

    const remove = () =>
    {
        setRemoved( ( list ) => [ ...list , target.id ] ) ;
        confirmRef.current?.close() ;
        setTarget( null ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <p className="text-sm text-base-content/70">{ t.description }</p>

            <div className="grid gap-4 lg:grid-cols-2">

                <Case
                    icon     = { MdDelete }
                    title    = "ConfirmTypedModal"
                    subtitle = { t.typed?.subtitle }
                >
                    <div className="flex flex-col gap-2">
                        { rows.map( ( row ) => (
                            <div className="flex items-center gap-2" key={ row.id }>
                                <code className="badge badge-sm badge-ghost">{ row.id }</code>
                                <span className="text-sm">{ row.label }</span>
                                { removed.includes( row.id )
                                    ? <Badge color="error" style="soft">{ t.typed?.removed }</Badge>
                                    : (
                                        <Button color="error" size="sm" style="outline" onClick={ () => aimAt( row ) }>
                                            { t.typed?.delete }
                                        </Button>
                                    )
                                }
                            </div>
                        ) ) }
                    </div>
                </Case>

                <Case
                    icon     = { MdKey }
                    title    = "SecretRevealModal"
                    subtitle = { t.secret?.subtitle }
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Button color="primary" size="sm" onClick={ () => { setSaid( null ) ; setSecret( makeSecret() ) ; } }>
                            { t.secret?.reveal }
                        </Button>
                        { said && <Badge color="success" style="soft">{ said }</Badge> }
                    </div>
                </Case>

                <Case
                    icon     = { MdQuestionAnswer }
                    title    = "PromptModal"
                    subtitle = { t.prompt?.subtitle }
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Button color="primary" size="sm" onClick={ () => setAsking( true ) }>
                            { t.prompt?.ask }
                        </Button>
                        { answer !== null && (
                            <Badge color={ answer === '' ? 'warning' : 'success' } style="soft">
                                { answer === '' ? t.prompt?.empty : answer }
                            </Badge>
                        ) }
                    </div>
                </Case>

                <Case
                    icon     = { MdDataObject }
                    title    = "JsonViewerModal"
                    subtitle = { t.json?.subtitle }
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Button color="neutral" size="sm" style="outline" onClick={ () => { setSaid( null ) ; jsonRef.current?.showModal() ; } }>
                            { t.json?.show }
                        </Button>
                        { said && <Badge color="success" style="soft">{ said }</Badge> }
                    </div>
                </Case>

            </div>

            <ConfirmTypedModal
                agree       = { t.typed?.delete }
                description = { target ? format( t.typed?.description , target.label ) : null }
                expected    = { target?.id }
                ref         = { confirmRef }
                title       = { t.typed?.modalTitle }
                onAgree     = { remove }
                onCancel    = { () => setTarget( null ) }
            />

            <SecretRevealModal
                contentType = "application/json"
                fileName    = "example-key.json"
                secret            = { secret }
                onAgree           = { () => setSecret( null ) }
                onCopyError       = { () => toast( t.secret?.copyFailed , ERROR ) }
                onCopySuccess     = { () => { setSaid( 'onCopySuccess' ) ; toast( t.secret?.copied , SUCCESS ) ; } }
                onDownloadError   = { () => toast( t.secret?.downloadKo , ERROR ) }
                onDownloadSuccess = { name => { setSaid( 'onDownloadSuccess' ) ; toast( format( t.secret?.downloaded , name ) , SUCCESS ) ; } }
            >
                <p className="text-sm">
                    <span className="text-base-content/60">{ t.secret?.exampleLead }</span>
                    <span className="font-semibold">{ t.secret?.example }</span>
                </p>
            </SecretRevealModal>

            { asking && (
                <PromptModal
                    agree         = { t.prompt?.agree }
                    body          = { t.prompt?.body }
                    label         = { t.prompt?.label }
                    placeholder   = { t.prompt?.placeholder }
                    textAreaProps = { { autosize : true , maxRows : 6 , minRows : 2 } }
                    title         = { t.prompt?.modalTitle }
                    onAgree       = { ( value ) => { setAnswer( value ) ; setAsking( false ) ; } }
                    onCancel      = { () => setAsking( false ) }
                />
            ) }

            <JsonViewerModal
                ref           = { jsonRef }
                subtitle      = { t.json?.modalSub }
                value         = { PAYLOAD }
                onCopyError   = { () => toast( t.json?.copyFailed , ERROR ) }
                onCopySuccess = { () => { setSaid( 'onCopySuccess' ) ; toast( t.json?.copied , SUCCESS ) ; } }
            />

        </Container>
    ) ;
} ;

ModalPresetsDemo.displayName = 'ModalPresetsDemo' ;

export default ModalPresetsDemo ;
