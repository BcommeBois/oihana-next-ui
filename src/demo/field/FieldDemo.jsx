'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import Badge  from '@/components/Badge' ;
import Button from '@/components/Button' ;
import Kbd    from '@/components/Kbd' ;
import Input  from '@/components/inputs/Input' ;

import WakeLockToggle   from '@/components/buttons/WakeLockToggle' ;
import ConnectionStatus from '@/display/ConnectionStatus' ;

import useHotkeys  from '@/hooks/useHotkeys' ;
import useOnline   from '@/hooks/useOnline' ;
import useWakeLock from '@/hooks/useWakeLock' ;

import useI18n from '@/contexts/locale/useI18n' ;

const KEYS = [ 'F1' , 'F2' , 'v' , 'ctrl+s' , 'Escape' ] ;

/**
 * The field : what a hand-held screen needs before any component — the
 * screen that stays on, the network that is really there, the keys that do
 * things.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.field'] - Dot notation path to the demo locale.
 */
const FieldDemo = ( { path = 'demo.field' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const { check , checking , online , since } = useOnline() ;

    const { supported } = useWakeLock( { enabled : false } ) ;

    const [ lock , setLock ] = useState( false ) ;
    const [ last , setLast ] = useState( null ) ;
    const [ text , setText ] = useState( '' ) ;

    useHotkeys( Object.fromEntries( KEYS.map( key => [ key , () => setLast( key ) ] ) ) ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <h2 className="text-2xl font-semibold">{ t.title }</h2>
            <p className="text-sm text-base-content/70">{ t.intro }</p>

            <ConnectionStatus />

            <div className="grid gap-6 md:grid-cols-3">

                {/* The network */}
                <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                    <h3 className="font-semibold">{ t.online?.title }</h3>
                    <p className="text-xs text-base-content/70">{ t.online?.text }</p>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge color={ online ? 'success' : 'warning' } style="soft">{ online ? t.online?.yes : t.online?.no }</Badge>
                        { since && <span className="text-xs text-base-content/60">{ format( t.online?.since ?? '{0}' , new Date( since ).toLocaleTimeString() ) }</span> }
                    </div>
                    <div>
                        <Button loading={ checking } onClick={ check } size="sm" style="outline">{ t.online?.check }</Button>
                    </div>
                </section>

                {/* The screen */}
                <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                    <h3 className="font-semibold">{ t.wake?.title }</h3>
                    <p className="text-xs text-base-content/70">{ t.wake?.text }</p>
                    <div className="flex flex-wrap items-center gap-2">
                        { supported
                            ? (
                                <>
                                    <WakeLockToggle onChange={ setLock } />
                                    <Badge color={ lock ? 'success' : undefined } style={ lock ? 'soft' : 'ghost' }>{ lock ? t.wake?.on : t.wake?.off }</Badge>
                                </>
                            )
                            : <Badge color="warning" style="soft">{ t.wake?.unsupported }</Badge> }
                    </div>
                </section>

                {/* The keys */}
                <section className="flex flex-col gap-3 rounded-box bg-base-100 p-4 shadow-sm">
                    <h3 className="font-semibold">{ t.keys?.title }</h3>
                    <p className="text-xs text-base-content/70">{ t.keys?.text }</p>
                    <ul className="flex flex-wrap gap-2">
                        { KEYS.map( key => (
                            <li key={ key }>
                                <Kbd className={ last === key ? 'kbd-primary' : undefined } size="sm">{ key }</Kbd>
                            </li>
                        ) ) }
                    </ul>
                    <p className="font-mono text-xs opacity-70">{ last ? format( t.keys?.last ?? '{0}' , last ) : t.keys?.none }</p>
                    <Input label={ t.keys?.field } onChange={ setText } placeholder={ t.keys?.fieldHelp } size="sm" value={ text } />
                </section>

            </div>

        </Container>
    ) ;
} ;

export default FieldDemo ;
