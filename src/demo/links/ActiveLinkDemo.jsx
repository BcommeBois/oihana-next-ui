'use client' ;

/**
 * ActiveLinkDemo — when a link reads as active, and when its click is blocked.
 *
 * Judged against this very page, so nothing has to be simulated : the link to
 * the page itself is current (lit, `aria-current="page"`, its click does
 * nothing), a section link to one of its parents is lit from below with
 * `exact={ false }` (`aria-current="true"`, and it still navigates), the same
 * link without it stays off, and the root never lights up from below.
 *
 * @module demo/links/ActiveLinkDemo
 */

import { usePathname } from 'next/navigation' ;

import Link from '@/components/links/Link' ;

const LINK = 'link link-hover' ;
const LIT  = 'text-primary font-bold' ;

/**
 * One demonstrated link and what it is expected to do.
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children - The link.
 * @param {string}          props.expected - What should happen.
 * @returns {React.ReactElement}
 */
const Row = ( { children , expected } ) => (
    <li className="flex flex-wrap items-baseline justify-between gap-2 border-b border-base-300/60 py-2">
        { children }
        <span className="text-xs text-base-content/60">{ expected }</span>
    </li>
) ;

const ActiveLinkDemo = () =>
{
    const pathname = usePathname() ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-4">

                <h2 className="card-title text-2xl">Liens actifs : exact ou section</h2>

                <p className="text-sm text-base-content/70">
                    Chemin courant : <code>{ pathname }</code>. Un lien vers la page même est allumé et son clic ne fait
                    rien ; un lien de section (<code>exact={ '{ false }' }</code>) s&apos;allume depuis une sous-page et
                    reste cliquable ; la racine ne s&apos;allume jamais par en dessous.
                </p>

                <ul>
                    <Row expected="allumé, aria-current=&quot;page&quot;, clic sans effet">
                        <Link activeClassName={ LIT } className={ LINK } href={ pathname }>Cette page (exact)</Link>
                    </Row>
                    <Row expected="allumé, aria-current=&quot;true&quot;, le clic navigue">
                        <Link activeClassName={ LIT } className={ LINK } exact={ false } href="/lab">/lab (section)</Link>
                    </Row>
                    <Row expected="éteint">
                        <Link activeClassName={ LIT } className={ LINK } href="/lab">/lab (exact)</Link>
                    </Row>
                    <Row expected="éteint : la racine est jugée strictement">
                        <Link activeClassName={ LIT } className={ LINK } exact={ false } href="/">/ (section)</Link>
                    </Row>
                </ul>

            </div>
        </div>
    ) ;
} ;

ActiveLinkDemo.displayName = 'ActiveLinkDemo' ;

export default ActiveLinkDemo ;
