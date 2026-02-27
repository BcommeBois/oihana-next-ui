'use client' ;

import { MdHome, MdInventory, MdSearch } from 'react-icons/md' ;

import BackLink   from '@/components/links/BackLink'
import Link       from '@/components/links/Link'
import LinkButton from '@/components/links/LinkButton'

const LinkDemo = () =>
(
    <div className="card bg-base-200 shadow-xl">
        <div className="card-body gap-6">
            <h2 className="card-title text-2xl">Navigation Links</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Standard Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold opacity-70">Text Links</h3>
                    <div className="flex flex-wrap items-center gap-6">
                        <BackLink label="Back to Dashboard" />
                        <Link activeClassName="text-primary font-bold" href="/public">
                            Standard Link
                        </Link>
                    </div>
                </div>

                {/* Link Buttons */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold opacity-70">Link Buttons</h3>
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
                            Products
                        </LinkButton>
                        <LinkButton
                            color    = "secondary"
                            href     = "/search"
                            icon     = { MdSearch }
                            shape    = "circle"
                            size     = "sm"
                            tooltip  = "Search content"
                        />
                        <LinkButton
                            href   = "https://google.com"
                            style  = "outline"
                            target = "_blank"
                        >
                            External
                        </LinkButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
) ;

export default LinkDemo ;