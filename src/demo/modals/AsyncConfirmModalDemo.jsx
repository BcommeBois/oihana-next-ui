'use client' ;

import { useState } from 'react' ;

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
 */
const AsyncConfirmModalDemo = () =>
{
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
            setError( 'Le serveur a refusé l’archivage. Réessayez ou annulez.' ) ;
            return ;
        }

        setResult( `Archivé à ${ new Date().toLocaleTimeString() }` ) ;
        close() ;
    } ;

    return (
        <Container className="flex flex-col gap-4 bg-base-200/60 p-4 sm:p-8 rounded-box" maxWidth="max-w-5xl">

            <h2 className="text-3xl font-bold">Confirmation asynchrone</h2>
            <p className="text-sm opacity-70">
                La modale reste ouverte pendant l’action : bouton « En cours… », Annuler et la croix désactivés,
                Échap et le fond sans effet. Elle se ferme quand l’action réussit, et reste ouverte avec une erreur
                quand elle échoue.
            </p>

            <div className="flex flex-wrap items-center gap-3">
                <Button color="primary" onClick={ () => openWith( false ) }>Archiver (réussite)</Button>
                <Button color="warning" onClick={ () => openWith( true ) }>Archiver (échec)</Button>
                <span className="text-sm opacity-70">{ result ?? 'Aucun archivage' }</span>
            </div>

            <ConfirmModal
                ref          = { modalRef }
                agree        = "Archiver"
                busy         = { busy }
                closeOnAgree = { false }
                onAgree      = { archive }
                title        = "Archiver le document ?"
            >
                <div className="flex flex-col gap-3 p-2">
                    <p>Le document ne sera plus proposé dans les listes.</p>
                    { error && <p className="text-sm text-error">{ error }</p> }
                </div>
            </ConfirmModal>

        </Container>
    ) ;
} ;

export default AsyncConfirmModalDemo ;
