'use client' ;

import { useCallback , useRef , useState } from 'react' ;
import { MdCheck, MdClose, MdLock, MdLockOpen, MdSave, MdVisibility, MdVisibilityOff } from 'react-icons/md' ;

import Button from '@/components/Button' ;

import AddButton        from '@/components/buttons/AddButton' ;
import ClearButton      from '@/components/buttons/ClearButton' ;
import CopyButton       from '@/components/buttons/CopyButton' ;
import DownloadButton   from '@/components/buttons/DownloadButton' ;
import InputClearButton from '@/components/buttons/InputClearButton' ;
import LessButton       from '@/components/buttons/LessButton' ;
import MoreButton       from '@/components/buttons/MoreButton' ;
import RefreshButton    from '@/components/buttons/RefreshButton' ;
import RemoveButton     from '@/components/buttons/RemoveButton' ;
import RevokeButton     from '@/components/buttons/RevokeButton' ;
import SaveButton       from '@/components/buttons/SaveButton' ;
import SwapButton       from '@/components/buttons/SwapButton' ;

const SIZES  = [ 'xl', 'lg', 'md', 'sm', 'xs' ] ;

// How long the busy button stays disabled, as an action in flight would.
const BUSY_DELAY = 1500 ;
const COLORS = [ 'primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error' ] ;

const ButtonDemo = () =>
{
    const [ isVisible, setIsVisible ] = useState( false ) ;
    const [ isLocked, setIsLocked ]   = useState( true ) ;

    const [ busy         , setBusy         ] = useState( false ) ;
    const [ disabledBusy , setDisabledBusy ] = useState( false ) ;
    const [ mounts  , setMounts  ] = useState( 0 ) ;
    const lastNode = useRef( null ) ;

    // A stable ref callback runs once per DOM node : a new node means the button
    // was destroyed and recreated. The first mount is not a recreation.
    const countMounts = useCallback( ( node ) =>
    {
        if ( node && node !== lastNode.current )
        {
            lastNode.current = node ;
            setMounts( count => count + 1 ) ;
        }
    } , [] ) ;

    const runBusy = () =>
    {
        setBusy( true ) ;
        setTimeout( () => setBusy( false ) , BUSY_DELAY ) ;
    } ;

    const runDisabled = () =>
    {
        setDisabledBusy( true ) ;
        setTimeout( () => setDisabledBusy( false ) , BUSY_DELAY ) ;
    } ;

    return (
        <div className="flex flex-col gap-8">
            {/* Motion Buttons - Sizes */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4">Action Buttons (Motion)</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="flex flex-wrap items-center gap-3 justify-center">
                            { SIZES.map( s => <AddButton key={ s } size={ s } /> ) }
                            { SIZES.map( s => <SaveButton key={ s } size={ s } /> ) }
                            { SIZES.map( s => <CopyButton key={ s } size={ s } /> ) }
                        </div>
                        <div className="flex flex-wrap items-center gap-3 justify-center">
                            { COLORS.map( c => <RemoveButton key={ c } color={ c } /> ) }
                            { COLORS.map( c => <DownloadButton key={ c } color={ c } style="outline" /> ) }
                        </div>
                        <div className="flex flex-wrap items-center gap-3 justify-center">
                            { COLORS.map( c => <RevokeButton key={ c } color={ c } /> ) }
                        </div>
                    </div>
                </div>
            </div>

            {/* Busy button : unavailable while its action runs */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-3">
                    <h2 className="card-title">Bouton occupé : busy ou disabled</h2>
                    <p className="text-sm text-base-content/70">
                        Deux boutons avec infobulle, indisponibles 1,5 s le temps de leur action. Activez-les au
                        clavier (Tab puis Entrée). Avec <code>busy</code>, le bouton garde le focus pendant et après
                        l'action : Entrée le relance aussitôt. Avec <code>disabled</code>, le navigateur retire le
                        focus d'un bouton qui devient désactivé. Dans les deux cas, le bouton n'est jamais recréé.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <Button
                            busy     = { busy }
                            color    = "primary"
                            icon     = { MdSave }
                            onClick  = { runBusy }
                            ref      = { countMounts }
                            tooltip  = "Enregistrer"
                        >
                            { busy ? 'Enregistrement…' : 'busy' }
                        </Button>
                        <Button
                            color    = "neutral"
                            disabled = { disabledBusy }
                            icon     = { MdSave }
                            onClick  = { runDisabled }
                            tooltip  = "Enregistrer"
                        >
                            { disabledBusy ? 'Enregistrement…' : 'disabled' }
                        </Button>
                        <span className="text-sm tabular-nums text-base-content/70">
                            Bouton « busy » recréé : { Math.max( mounts - 1 , 0 ) } fois
                        </span>
                    </div>
                </div>
            </div>

            {/* Input & Join Groups */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4">Input & Join Groups</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <div className="join shadow-sm">
                            <LessButton className="join-item" color="neutral" />
                            <MoreButton className="join-item" color="neutral" />
                            <InputClearButton className="join-item" color="error" style="soft" />
                        </div>
                        <div className="join">
                            <RefreshButton className="join-item" color="info" />
                            <ClearButton className="join-item" color="warning" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Swap Buttons */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4">Swap Components</h2>
                    <div className="flex flex-wrap gap-8 justify-center">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs opacity-50 uppercase font-bold">Visibility</span>
                            <SwapButton
                                checked  = { isVisible }
                                off      = { <MdVisibilityOff /> }
                                on       = { <MdVisibility /> }
                                onChange = { () => setIsVisible( !isVisible ) }
                                size     = "lg"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs opacity-50 uppercase font-bold">Lock State</span>
                            <SwapButton
                                checked  = { isLocked }
                                color    = "warning"
                                off      = { <MdLockOpen /> }
                                on       = { <MdLock /> }
                                onChange = { () => setIsLocked( !isLocked ) }
                                size     = "lg"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs opacity-50 uppercase font-bold">Disabled Swap</span>
                            <SwapButton
                                disabled
                                off      = { <MdClose /> }
                                on       = { <MdCheck /> }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) ;
} ;

export default ButtonDemo ;