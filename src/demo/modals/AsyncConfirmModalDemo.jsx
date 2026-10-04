'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Button       from '@/components/Button' ;
import ConfirmModal from '@/components/modals/ConfirmModal' ;
import useModal     from '@/components/modals/hooks/useModal' ;

import Container from '@/display/Container' ;

// How long the simulated call takes.
const CALL_DELAY = 1500 ;

/**
 * An agree action that takes time.
 *
 * `closeOnAgree={ false }` keeps the modal up when the agree button is pressed ;
 * `busy` locks it while the simulated call runs — spinner and `agreeBusyLabel`
 * on the agree button, disagree and close disabled, `Escape` and backdrop
 * without effect. The caller closes it on success, and keeps it open with an
 * error on failure.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.modals.asyncConfirm'] - Dot notation path to the demo locale.
 */
const AsyncConfirmModalDemo = ( { path = 'demo.modals.asyncConfirm' } = {} ) =>
{
    const t = useI18n( path ) ;

    const { modalRef , open , close } = useModal() ;

    const [ fails  , setFails  ] = useState( false ) ;
    const [ busy   , setBusy   ] = useState( false ) ;
    const [ error  , setError  ] = useState( null ) ;
    const [ result , setResult ] = useState( null ) ;

    const openWith = ( failing ) =>
    {
        setFails( failing ) ;
        setError( null ) ;
        open() ;
    } ;

    const archive = async () =>
    {
        setBusy( true ) ;
        setError( null ) ;

        await new Promise( resolve => setTimeout( resolve , CALL_DELAY ) ) ;

        setBusy( false ) ;

        if ( fails )
        {
            setError( t.failure ) ;
            return ;
        }

        setResult( format( t.archived , new Date().toLocaleTimeString() ) ) ;
        close() ;
    } ;

    return (
        <Container className="flex flex-col gap-4 bg-base-200/60 p-4 sm:p-8 rounded-box" maxWidth="max-w-5xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>
            <p className="text-sm opacity-70">{ t.description }</p>

            <div className="flex flex-wrap items-center gap-3">
                <Button color="primary" onClick={ () => openWith( false ) }>{ t.succeed }</Button>
                <Button color="warning" onClick={ () => openWith( true ) }>{ t.fail }</Button>
                <span className="text-sm opacity-70">{ result ?? t.idle }</span>
            </div>

            <ConfirmModal
                ref          = { modalRef }
                agree        = { t.agree }
                busy         = { busy }
                closeOnAgree = { false }
                onAgree      = { archive }
                title        = { t.modal }
            >
                <div className="flex flex-col gap-3 p-2">
                    <p>{ t.body }</p>
                    { error && <p className="text-sm text-error">{ error }</p> }
                </div>
            </ConfirmModal>

        </Container>
    ) ;
} ;

export default AsyncConfirmModalDemo ;
