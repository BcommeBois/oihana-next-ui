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
 * @param {Function} props.onClose  - Unmounts the form.
 * @param {Function} props.onSaved  - Receives the new name.
 * @param {boolean}  props.refuse   - Whether the fake server refuses the save.
 */
const NameForm = ( { initial , onClose , onSaved , refuse } ) =>
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
            setError( 'Refusé par le serveur — la modale reste ouverte.' ) ;
            return false ;
        }

        onSaved( name ) ;
        return true ;
    } ;

    const status = error ?? ( !valid ? 'Le nom est obligatoire.' : dirty ? 'Modifications non enregistrées' : null ) ;

    return (
        <FormModal
            dirty        = { dirty }
            onClose      = { onClose }
            onSave       = { save }
            saveDisabled = { !valid || !dirty }
            saving       = { saving }
            statusText   = { status }
            title        = "Renommer l'essence"
        >
            <label className="floating-label">
                <span>Nom</span>
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

const FormModalDemo = () =>
{
    const [ open    , setOpen    ] = useState( false ) ;
    const [ name    , setName    ] = useState( 'Chêne' ) ;
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

            <h2 className="text-3xl font-bold">FormModal &amp; ModalFooter</h2>

            <p className="text-sm text-base-content/70">
                Modifiez le nom puis fermez : la question est posée. Enregistrez : le bouton attend,
                tout est verrouillé, puis la modale se ferme — sauf si le serveur refuse.
            </p>

            <div className="flex flex-wrap items-center gap-4">
                <Button color="primary" onClick={ () => setOpen( true ) } type="button">Ouvrir le formulaire</Button>
                <Button onClick={ openInfo } style="soft" type="button">Ouvrir une fiche en lecture</Button>
                <label className="flex items-center gap-2 text-sm">
                    <input
                        checked   = { refuse }
                        className = "toggle toggle-sm"
                        onChange  = { event => setRefuse( event.target.checked ) }
                        type      = "checkbox"
                    />
                    Le serveur refuse
                </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Badge color="primary">nom = { name }</Badge>
                <Badge color="neutral">onClose × { closes }</Badge>
            </div>

            { open ? (
                <NameForm
                    initial = { name }
                    onClose = { handleClose }
                    onSaved = { setName }
                    refuse  = { refuse }
                />
            ) : null }

            <Modal
                ref        = { modalRef }
                title      = "Fiche en lecture"
                footerNode = {
                    <ModalFooter
                        agree      = "Fermer"
                        agreeColor = "neutral"
                        onAgree    = { closeInfo }
                        status     = "Aucune décision à prendre ici."
                    />
                }
            >
                <p className="py-4">Un pied donné <code className="badge badge-sm">onAgree</code> seul n'a qu'un bouton.</p>
            </Modal>

        </Container>
    ) ;
} ;

FormModalDemo.displayName = 'FormModalDemo' ;

export default FormModalDemo ;
