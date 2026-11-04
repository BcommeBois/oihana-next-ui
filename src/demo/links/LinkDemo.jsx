'use client' ;

/**
 * Demonstrates the navigation links — `BackLink`, `Link` and `LinkButton`.
 *
 * @module demo/links/LinkDemo
 */

import { MdHome , MdInventory , MdSearch } from 'react-icons/md' ;

import BackLink   from '@/components/links/BackLink' ;
import Link       from '@/components/links/Link' ;
import LinkButton from '@/components/links/LinkButton' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * @param {Object} [props]
 * @param {string} [props.path='demo.links.navigation'] - Dot notation path to the demo locale.
 * @returns {React.ReactElement}
 */
const LinkDemo = ( { path = 'demo.links.navigation' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">
                <h2 className="card-title text-2xl">{ t.title }</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Standard Links */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold opacity-70">{ t.textLinks }</h3>
                        <div className="flex flex-wrap items-center gap-6">
                            <BackLink label={ t.back } />
                            <Link activeClassName="text-primary font-bold" href="/public">
                                { t.standard }
                            </Link>
                        </div>
                    </div>

                    {/* Link Buttons */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold opacity-70">{ t.linkButtons }</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            <LinkButton
                                color = "primary"
                                href  = "/home"
                                icon  = { MdHome }
                                path  = "navigation.home"
                            />
                            <LinkButton
                                color = "success"
                                href  = "/products"
                                icon  = { MdInventory }
                            >
                                { t.products }
                            </LinkButton>
                            <LinkButton
                                color    = "secondary"
                                href     = "/search"
                                icon     = { MdSearch }
                                shape    = "circle"
                                size     = "sm"
                                tooltip  = { t.search }
                            />
                            <LinkButton
                                href   = "https://google.com"
                                style  = "outline"
                                target = "_blank"
                            >
                                { t.external }
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) ;
} ;

export default LinkDemo ;
