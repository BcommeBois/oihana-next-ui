'use client' ;

/**
 * Demo : attaching and detaching, and the difference that travels.
 *
 * The catalogue is a list of modules a workspace can switch on. One of them is
 * locked — the reader can see it attached and cannot change it — which is what
 * makes the guard of `useSelectionDiff` observable : the footer never counts
 * it, whatever is done to it.
 *
 * The fake server can be told to refuse, because a save that fails has to keep
 * the dialog open with its changes, and that is only visible by trying.
 *
 * @module demo/assignments/AssignmentDemo
 */

import { useMemo , useState } from 'react' ;

import { MdExtension , MdLock } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;

import AssignmentEditorModal from '@/components/assignments/AssignmentEditorModal' ;
import AssignmentList        from '@/components/assignments/AssignmentList' ;

import useI18n from '@/contexts/locale/useI18n' ;
import useToast , { ERROR , SUCCESS } from '@/contexts/toasts/useToast' ;

import Container from '@/display/Container' ;

/**
 * What a workspace can switch on. Nothing here is attached by itself : the
 * catalogue is what EXISTS, the selection is what is attached.
 *
 * @type {{ key : string , name : string }[]}
 */
const CATALOGUE =
[
    { key : 'analytics'     , name : 'analytics' } ,
    { key : 'audit'         , name : 'audit' } ,
    { key : 'backups'       , name : 'backups' } ,
    { key : 'exports'       , name : 'exports' } ,
    { key : 'imports'       , name : 'imports' } ,
    { key : 'notifications' , name : 'notifications' } ,
    { key : 'scheduler'     , name : 'scheduler' } ,
    { key : 'search'        , name : 'search' } ,
    { key : 'storage'       , name : 'storage' } ,
    { key : 'webhooks'      , name : 'webhooks' } ,
] ;

/**
 * What the workspace starts attached to.
 * @type {string[]}
 */
const INITIAL = [ 'audit' , 'backups' , 'exports' , 'search' ] ;

/**
 * The one the reader may see but not change.
 * @type {string}
 */
const LOCKED = 'audit' ;

/**
 * How long the fake save takes, in milliseconds.
 * @type {number}
 */
const SAVE_DELAY = 700 ;

/**
 * @param {Object} props
 * @param {string} [props.path='demo.assignments.assignment'] - Dot notation path to the demo locale.
 * @returns {React.JSX.Element}
 */
const AssignmentDemo = ( { path = 'demo.assignments.assignment' } = {} ) =>
{
    const t = useI18n( path ) ;

    const { toast } = useToast() ;

    const [ attached , setAttached ] = useState( INITIAL ) ;
    const [ refuses  , setRefuses  ] = useState( false ) ;

    const locked = useMemo( () => new Set( [ LOCKED ] ) , [] ) ;

    const items = useMemo
    (
        () => CATALOGUE.filter( ( module ) => attached.includes( module.key ) ) ,
        [ attached ] ,
    ) ;

    const save = async ( toAdd , toRemove ) =>
    {
        await new Promise( ( resolve ) => setTimeout( resolve , SAVE_DELAY ) ) ;

        if ( refuses )
        {
            toast( t.toasts.refused , ERROR ) ;
            return false ;
        }

        setAttached( ( previous ) =>
            [ ...previous.filter( ( key ) => !toRemove.includes( key ) ) , ...toAdd ].sort() ) ;

        toast( format( t.toasts.saved , toAdd.length , toRemove.length ) , SUCCESS ) ;

        return true ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <p className="text-sm text-base-content/70">{ t.description }</p>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">

                <h3 className="font-semibold">{ t.controls.title }</h3>

                <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox
                            checked  = { refuses }
                            color    = "error"
                            onChange = { ( event ) => setRefuses( event.target.checked ) }
                        />
                        { t.controls.fail }
                    </label>

                    <Button size="sm" style="outline" onClick={ () => setAttached( INITIAL ) }>
                        { t.controls.reset }
                    </Button>

                    <Badge color="primary" style="soft">
                        { format( t.controls.attached , attached.length ) }
                    </Badge>
                </div>

            </div>

            <div className="p-4 rounded-box bg-base-100">
                <AssignmentList
                    canEdit
                    empty        = { t.empty }
                    getKey       = { ( module ) => module.key }
                    emptyIcon    = { <MdExtension /> }
                    items        = { items }
                    manageLabel  = { t.manage }
                    title        = { t.listTitle }
                    renderRow    = { ( module ) => (
                        <span className="flex items-center gap-2 font-mono text-sm">
                            <MdExtension className="size-4 text-base-content/50" />
                            { module.name }
                            { locked.has( module.key ) && (
                                <MdLock className="size-3 text-base-content/40" />
                            ) }
                        </span>
                    ) }
                    renderEditor = { ( { close } ) => (
                        <AssignmentEditorModal
                            attached = { attached }
                            icon     = { <MdExtension size={ 20 } /> }
                            locked   = { locked }
                            title    = { t.editorTitle }
                            onClose  = { close }
                            onSave   = { save }
                        >
                            { ( { selected , toggle } ) => (
                                <ul className="flex flex-col gap-1 px-2">
                                    { CATALOGUE.map( ( module ) => (
                                        <li className="flex items-center gap-2 py-1" key={ module.key }>
                                            <Checkbox
                                                checkboxClassName = "checkbox-sm"
                                                checked           = { selected.has( module.key ) }
                                                disabled          = { locked.has( module.key ) }
                                                onChange          = { ( event ) => toggle( module.key , event.target.checked ) }
                                            />
                                            <span className="font-mono text-sm">{ module.name }</span>
                                            { locked.has( module.key ) && (
                                                <span className="inline-flex items-center gap-1 text-xs text-base-content/50">
                                                    <MdLock className="size-3" />
                                                    { t.lockedHint }
                                                </span>
                                            ) }
                                        </li>
                                    ) ) }
                                </ul>
                            ) }
                        </AssignmentEditorModal>
                    ) }
                />
            </div>

            <div className="flex flex-col gap-2 text-xs text-base-content/60 leading-relaxed">
                <p className="font-semibold text-base-content/80">{ t.notes.title }</p>
                <p>{ t.notes.diff }</p>
                <p>{ t.notes.locked }</p>
                <p>{ t.notes.exit }</p>
            </div>

        </Container>
    ) ;
} ;

AssignmentDemo.displayName = 'AssignmentDemo' ;

export default AssignmentDemo ;
