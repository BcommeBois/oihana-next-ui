'use client' ;

/**
 * ConnectionStatus — a word when the server cannot be reached, and a word
 * when it can again ; nothing the rest of the time.
 *
 * On `useOnline`. Offline, a discreet band says so — the sends will wait
 * for the network — ; back online, a green one says it for a few seconds,
 * then goes. It is a status, announced politely to a reader, never a
 * toast : the page keeps its own feedback. `onChange` hands the state to
 * what needs it — an outbox, a button that waits.
 *
 * @module display/ConnectionStatus
 *
 * @param {Object} props
 * @param {string} [props.className] - Classes on the band.
 * @param {number} [props.interval=30000] - Milliseconds between two checks while offline.
 * @param {Function} [props.onChange] - `( online ) => void`.
 * @param {string} [props.path='components.connection'] - i18n path the words are read from.
 * @param {'top'|'bottom'} [props.position='top'] - Which edge the band hangs from.
 * @param {number} [props.restoredFor=3000] - Milliseconds the « back online » band stays.
 * @param {string} [props.url='/version.json'] - What to ask the server for.
 *
 * @example
 * ```jsx
 * <ConnectionStatus onChange={ online => outbox.setOnline( online ) } url="/api/health" />
 * ```
 */

import { useEffect , useState } from 'react' ;

import { MdCloudOff , MdCloudDone } from 'react-icons/md' ;

import Portal from '../components/Portal' ;

import useOnline from '../hooks/useOnline' ;

import NO_LOCALE from '../contexts/locale/noLocale' ;
import useI18n   from '../contexts/locale/useI18n' ;

import cn from '../themes/helpers/cn' ;

const ConnectionStatus =
({
    className ,
    interval = 30000 ,
    onChange ,
    path = 'components.connection' ,
    position = 'top' ,
    restoredFor = 3000 ,
    url = '/version.json' ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const { online , since } = useOnline( { interval , onChange , url } ) ;

    const [ restored , setRestored ] = useState( false ) ;

    // Back online after an outage : say it, briefly.
    useEffect( () =>
    {
        if ( online && since !== null )
        {
            setRestored( true ) ;

            const timer = setTimeout( () => setRestored( false ) , restoredFor ) ;

            return () => clearTimeout( timer ) ;
        }

        setRestored( false ) ;

        return undefined ;
    }
    , [ online , restoredFor , since ] ) ;

    const shown = !online || restored ;

    return (
        <Portal>
            <div
                aria-live = "polite"
                className = { cn(
                    'pointer-events-none fixed inset-x-0 z-[70] flex justify-center px-4 transition-opacity duration-300' ,
                    position === 'top' ? 'top-[max(0.5rem,env(safe-area-inset-top))]' : 'bottom-[max(0.5rem,env(safe-area-inset-bottom))]' ,
                    shown ? 'opacity-100' : 'opacity-0' ,
                ) }
                role      = "status"
            >
                { shown && (
                    <div className={ cn( 'flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-lg' , online ? 'bg-success text-success-content' : 'bg-neutral text-neutral-content' , className ) }>
                        { online ? <MdCloudDone aria-hidden="true" className="size-4" /> : <MdCloudOff aria-hidden="true" className="size-4" /> }
                        <span>{ online ? labels.restored : labels.offline }</span>
                    </div>
                ) }
            </div>
        </Portal>
    ) ;
} ;

ConnectionStatus.displayName = 'ConnectionStatus' ;

export default ConnectionStatus ;
