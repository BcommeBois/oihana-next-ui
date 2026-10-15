'use client' ;

import { useSearchParams } from 'next/navigation' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;

import OutboxBanner from '@/display/OutboxBanner' ;
import OutboxList   from '@/display/OutboxList' ;

import Badge  from '@/components/Badge' ;
import Button from '@/components/Button' ;
import Link   from '@/components/links/Link' ;

import useI18n   from '@/contexts/locale/useI18n' ;
import useOutbox from '@/contexts/outbox/useOutbox' ;

/**
 * A path of this application only : `?from=` comes from the address bar, and a
 * page must never send its reader elsewhere from it.
 *
 * @param {?string} from
 * @returns {?string}
 */
const ownPath = from => from?.startsWith( '/' ) && !from.startsWith( '//' ) ? from : null ;

/**
 * The page the service worker keeps at install and sends a failed navigation
 * to : the page asked for and a way back to it, what waits to be sent, and
 * what can still be read.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.offline.shell'] - Dot notation path to the demo locale.
 */
const OfflineShellDemo = ( { path = 'demo.offline.shell' } = {} ) =>
{
    const t     = useI18n( path ) ?? {} ;
    const kinds = useI18n( 'demo.offline.outbox.kinds' ) ?? {} ;

    const outbox = useOutbox() ;
    const online = outbox?.online ?? false ;

    const from = ownPath( useSearchParams().get( 'from' ) ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-3xl">

            <section className="flex flex-col gap-3 rounded-box bg-base-100 p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge color={ online ? 'success' : 'warning' } style="soft">{ online ? t.online : t.away }</Badge>
                </div>
                <p>{ from ? format( t.asked ?? '{0}' , from ) : t.none }</p>
                { from && (
                    <div>
                        <Button color="primary" onClick={ () => window.location.assign( from ) } size="sm">{ t.retry }</Button>
                    </div>
                ) }
                <p className="text-xs text-base-content/60">{ t.how }</p>
            </section>

            <section className="flex flex-col gap-3 rounded-box bg-base-100 p-6 shadow-sm">
                <h2 className="font-semibold">{ t.outbox }</h2>
                <OutboxBanner showIdle />
                <OutboxList labels={ kinds } />
            </section>

            <section className="flex flex-col gap-2 rounded-box bg-base-100 p-6 shadow-sm">
                <h2 className="font-semibold">{ t.read }</h2>
                <p className="text-sm text-base-content/70">{ t.readText }</p>
                <div className="flex flex-wrap gap-3 text-sm">
                    <Link href="/modules/offlineStore">{ t.reserve }</Link>
                    <Link href="/modules/outbox">{ t.bench }</Link>
                </div>
            </section>

        </Container>
    ) ;
} ;

export default OfflineShellDemo ;
