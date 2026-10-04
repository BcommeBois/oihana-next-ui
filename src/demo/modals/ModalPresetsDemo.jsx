'use client' ;

import { useRef , useState } from 'react' ;

import { MdDataObject , MdDelete , MdKey , MdQuestionAnswer } from 'react-icons/md' ;

import Badge  from '@/components/Badge' ;
import Button from '@/components/Button' ;

import ConfirmTypedModal from '@/components/modals/ConfirmTypedModal' ;
import JsonViewerModal   from '@/components/modals/JsonViewerModal' ;
import PromptModal       from '@/components/modals/PromptModal' ;
import SecretRevealModal from '@/components/modals/SecretRevealModal' ;

import Container from '@/display/Container' ;

import useToast , { ERROR , SUCCESS } from '@/contexts/toasts/useToast' ;

/**
 * Two rows a single confirmation is re-aimed at, which is the whole point of
 * the card : the typed value must not survive the change of target.
 * @type {{ id : string , label : string }[]}
 */
const ROWS =
[
    { id : 'record-4817' , label : 'First record'  } ,
    { id : 'record-9052' , label : 'Second record' } ,
] ;

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
 * they let go — a typed confirmation, a secret shown once, a question, and a
 * payload.
 *
 * Each card is self-contained and destroys nothing : the « records » are two
 * entries in an array, and the secret is generated in the browser.
 *
 * @returns {React.JSX.Element}
 */
const ModalPresetsDemo = () =>
{
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

            <h2 className="text-3xl font-bold">Four presets that ask before they let go</h2>

            <p className="text-sm text-base-content/70">
                A confirmation typed back, a value shown once, a question asked in passing, and a payload
                read only. Nothing here is destroyed : the two rows are entries in an array.
            </p>

            <div className="grid gap-4 lg:grid-cols-2">

                <Case
                    icon     = { MdDelete }
                    title    = "ConfirmTypedModal"
                    subtitle = "One instance, re-aimed from row to row. Type an id then dismiss with Escape or a click beside the dialog, and reopen THE SAME row : the field is empty again, and the button is locked."
                >
                    <div className="flex flex-col gap-2">
                        { ROWS.map( ( row ) => (
                            <div className="flex items-center gap-2" key={ row.id }>
                                <code className="badge badge-sm badge-ghost">{ row.id }</code>
                                <span className="text-sm">{ row.label }</span>
                                { removed.includes( row.id )
                                    ? <Badge color="error" style="soft">removed</Badge>
                                    : (
                                        <Button color="error" size="sm" style="outline" onClick={ () => aimAt( row ) }>
                                            Delete
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
                    subtitle = "The value IS the trigger : there is no open flag. Nothing dismisses it while it is unsaved — try Escape. Copy it, then wait a couple of seconds : the icon goes back to the clipboard, and the button stays unlocked. The toast is the host reacting to a callback, not the library."
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Button color="primary" size="sm" onClick={ () => { setSaid( null ) ; setSecret( makeSecret() ) ; } }>
                            Reveal a value
                        </Button>
                        { said && <Badge color="success" style="soft">{ said }</Badge> }
                    </div>
                </Case>

                <Case
                    icon     = { MdQuestionAnswer }
                    title    = "PromptModal"
                    subtitle = "Mounting it is the request to open it. It hands back the trimmed text, and an empty string when nothing was typed. Its field grows with what is typed, through textAreaProps."
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Button color="primary" size="sm" onClick={ () => setAsking( true ) }>
                            Ask a question
                        </Button>
                        { answer !== null && (
                            <Badge color={ answer === '' ? 'warning' : 'success' } style="soft">
                                { answer === '' ? 'answered with nothing' : answer }
                            </Badge>
                        ) }
                    </div>
                </Case>

                <Case
                    icon     = { MdDataObject }
                    title    = "JsonViewerModal"
                    subtitle = "It takes the value, not a string : the payload is pretty-printed here, and the copy button sits in the header where a touch screen can reach it. It tells its host about the copy rather than toasting — and the host, here, toasts."
                >
                    <div className="flex flex-wrap items-center gap-2">
                        <Button color="neutral" size="sm" style="outline" onClick={ () => { setSaid( null ) ; jsonRef.current?.showModal() ; } }>
                            Show the payload
                        </Button>
                        { said && <Badge color="success" style="soft">{ said }</Badge> }
                    </div>
                </Case>

            </div>

            <ConfirmTypedModal
                agree       = "Delete"
                description = { target ? `This removes ${ target.label } from the list below.` : null }
                expected    = { target?.id }
                ref         = { confirmRef }
                title       = "Delete this record?"
                onAgree     = { remove }
                onCancel    = { () => setTarget( null ) }
            />

            <SecretRevealModal
                contentType = "application/json"
                fileName    = "example-key.json"
                secret            = { secret }
                onAgree           = { () => setSecret( null ) }
                onCopyError       = { () => toast( 'The value could not be copied.' , ERROR ) }
                onCopySuccess     = { () => { setSaid( 'onCopySuccess' ) ; toast( 'Value copied to the clipboard.' , SUCCESS ) ; } }
                onDownloadError   = { () => toast( 'The download could not be started.' , ERROR ) }
                onDownloadSuccess = { name => { setSaid( 'onDownloadSuccess' ) ; toast( `Saved as ${ name }.` , SUCCESS ) ; } }
            >
                <p className="text-sm">
                    <span className="text-base-content/60">Example : </span>
                    <span className="font-semibold">a value an API would return exactly once</span>
                </p>
            </SecretRevealModal>

            { asking && (
                <PromptModal
                    agree       = "Send"
                    body        = "The text is handed back trimmed, and nothing is required."
                    label       = "Anything you like"
                    placeholder = "A line of text"
                    textAreaProps = { { autosize : true , maxRows : 6 , minRows : 2 } }
                    title         = "What should be recorded?"
                    onAgree       = { ( value ) => { setAnswer( value ) ; setAsking( false ) ; } }
                    onCancel      = { () => setAsking( false ) }
                />
            ) }

            <JsonViewerModal
                ref           = { jsonRef }
                subtitle      = "The payload this card was rendered from."
                value         = { PAYLOAD }
                onCopyError   = { () => toast( 'The payload could not be copied.' , ERROR ) }
                onCopySuccess = { () => { setSaid( 'onCopySuccess' ) ; toast( 'Payload copied to the clipboard.' , SUCCESS ) ; } }
            />

        </Container>
    ) ;
} ;

ModalPresetsDemo.displayName = 'ModalPresetsDemo' ;

export default ModalPresetsDemo ;
