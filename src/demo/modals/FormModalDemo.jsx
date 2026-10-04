'use client' ;

/**
 * FormModalDemo — a form in a dialog, and the footer it is built on.
 *
 * The form opens on mount, asks before losing a change, locks itself while it
 * saves, and closes only when the save returns truthy — « the server refuses »
 * shows the other case. `onClose` is counted : it must go up by one per
 * closing, whichever way the dialog was closed.
 *
 * The second dialog is read-only : a `ModalFooter` given `onAgree` alone is a
 * single « Close ».
 *
 * @module demo/modals/FormModalDemo
 */

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Badge       from '@/components/Badge' ;
import Button      from '@/components/Button' ;
import FormModal   from '@/components/modals/FormModal' ;
import Modal       from '@/components/modals/Modal' ;
import ModalFooter from '@/components/modals/ModalFooter' ;
import useModal    from '@/components/modals/hooks/useModal' ;

import Container from '@/display/Container' ;

/**
 * How long the fake save takes, in milliseconds.
 * @type {number}
 */
const SAVE_DELAY = 1200 ;

/**
 * @param {Object}   props
 * @param {string}   props.initial  - The saved name.
 * @param {Object}   props.i18n     - The demo's bundle.
 * @param {Function} props.onClose  - Unmounts the form.
 * @param {Function} props.onSaved  - Receives the new name.
 * @param {boolean}  props.refuse   - Whether the fake server refuses the save.
 */
const NameForm = ( { i18n , initial , onClose , onSaved , refuse } ) =>
{
    const [ name   , setName   ] = useState( initial ) ;
    const [ saving , setSaving ] = useState( false ) ;
    const [ error  , setError  ] = useState( null ) ;

    const dirty = name !== initial ;
    const valid = name.trim() !== '' ;

    const save = async () =>
    {
        setSaving( true ) ;
        setError( null ) ;
        await new Promise( resolve => setTimeout( resolve , SAVE_DELAY ) ) ;
        setSaving( false ) ;

        if ( refuse )
        {
            setError( i18n.refused ) ;
            return false ;
        }

        onSaved( name ) ;
        return true ;
    } ;

    const status = error ?? ( !valid ? i18n.required : dirty ? i18n.dirty : null ) ;

    return (
        <FormModal
            dirty        = { dirty }
            onClose      = { onClose }
            onSave       = { save }
            saveDisabled = { !valid || !dirty }
            saving       = { saving }
            statusText   = { status }
            title        = { i18n.formTitle }
        >
            <label className="floating-label">
                <span>{ i18n.nameLabel }</span>
                <input
                    className = "input w-full"
                    onChange  = { event => setName( event.target.value ) }
                    value     = { name }
                />
            </label>
        </FormModal>
    ) ;
} ;

NameForm.displayName = 'NameForm' ;

/**
 * @param {Object} props
 * @param {string} [props.path='demo.modals.form'] - Dot notation path to the demo locale.
 */
const FormModalDemo = ( { path = 'demo.modals.form' } = {} ) =>
{
    const t = useI18n( path ) ;

    const [ open    , setOpen    ] = useState( false ) ;
    const [ name    , setName    ] = useState( t.initial ) ;
    const [ refuse  , setRefuse  ] = useState( false ) ;
    const [ closes  , setCloses  ] = useState( 0 ) ;

    const { modalRef , open : openInfo , close : closeInfo } = useModal() ;

    const handleClose = () =>
    {
        setOpen( false ) ;
        setCloses( count => count + 1 ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <p className="text-sm text-base-content/70">{ t.description }</p>

            <div className="flex flex-wrap items-center gap-4">
                <Button color="primary" onClick={ () => setOpen( true ) } type="button">{ t.openForm }</Button>
                <Button onClick={ openInfo } style="soft" type="button">{ t.openInfo }</Button>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        checked   = { refuse }
                        className = "toggle toggle-sm"
                        onChange  = { event => setRefuse( event.target.checked ) }
                        type      = "checkbox"
                    />
                    { t.refuse }
                </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Badge color="primary">{ format( t.nameBadge , name ) }</Badge>
                <Badge color="neutral">{ format( t.closeBadge , closes ) }</Badge>
            </div>

            { open ? (
                <NameForm
                    i18n    = { t }
                    initial = { name }
                    onClose = { handleClose }
                    onSaved = { setName }
                    refuse  = { refuse }
                />
            ) : null }

            <Modal
                ref        = { modalRef }
                title      = { t.infoTitle }
                footerNode = {
                    <ModalFooter
                        agree      = { t.infoClose }
                        agreeColor = "neutral"
                        onAgree    = { closeInfo }
                        status     = { t.infoStatus }
                    />
                }
            >
                <p className="py-4">{ t.infoBody }</p>
            </Modal>

        </Container>
    ) ;
} ;

FormModalDemo.displayName = 'FormModalDemo' ;

export default FormModalDemo ;
