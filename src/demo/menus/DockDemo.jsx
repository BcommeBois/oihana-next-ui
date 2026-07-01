'use client' ;

/**
 * Dock demo component.
 *
 * The dock is rendered with `position="relative"` inside a mobile-like frame so
 * it stays contained in the lab page instead of sticking to the viewport.
 *
 * @module demo/menus/DockDemo
 */

import Alert    from '@/components/Alert' ;
import Dock     from '@/components/menus/Dock' ;
import DockItem from '@/components/menus/DockItem' ;

import {
    MdHome as HomeIcon ,
    MdInbox as InboxIcon ,
    MdSettings as SettingsIcon ,
}
from 'react-icons/md' ;

const ICON = 'size-[1.2em]' ;

const items =
[
    { id: 'home'     , label: 'Home'     , href: '/'          , icon: <HomeIcon className={ ICON } /> } ,
    { id: 'inbox'    , label: 'Inbox'    , active: true       , icon: <InboxIcon className={ ICON } /> } ,
    { id: 'settings' , label: 'Settings' , icon: <SettingsIcon className={ ICON } /> } ,
] ;

/**
 * Mobile-like frame that contains the (relative) dock.
 */
const Frame = ({ children }) => (
    <div className="bg-base-300 rounded-box w-full max-w-sm pt-32 overflow-hidden">
        { children }
    </div>
) ;

export default function DockDemo()
{
    return (
        <>

            {/* iOS note (for library consumers) */}
            <Alert level="info" showCloseButton={ false } className="md:col-span-2 lg:col-span-3">
                Sur iOS, ajoutez <code className="font-mono">&lt;meta name=&quot;viewport&quot; content=&quot;viewport-fit=cover&quot;&gt;</code> au layout racine pour la réactivité du dock, et pensez à réserver un padding en bas de page pour ne pas masquer le contenu sous le dock fixé.
            </Alert>

            {/* Default (md) */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Dock — items (md)</h2>
                    <Frame>
                        <Dock items={ items } position="relative" className="border border-base-300" />
                    </Frame>
                </div>
            </div>

            {/* Icons only (xs) */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Dock — xs (sans labels)</h2>
                    <Frame>
                        <Dock items={ items } size="xs" showLabel={ false } position="relative" className="border border-base-300" />
                    </Frame>
                </div>
            </div>

            {/* Large */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Dock — lg</h2>
                    <Frame>
                        <Dock items={ items } size="lg" position="relative" className="border border-base-300" />
                    </Frame>
                </div>
            </div>

            {/* Custom colors */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Dock — couleurs custom</h2>
                    <Frame>
                        <Dock items={ items } position="relative" className="bg-neutral text-neutral-content" />
                    </Frame>
                </div>
            </div>

            {/* Composable + action item (button) */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Dock — composable + action</h2>
                    <Frame>
                        <Dock position="relative" className="border border-base-300">
                            <DockItem href="/" icon={ <HomeIcon className={ ICON } /> }>Home</DockItem>
                            <DockItem active icon={ <InboxIcon className={ ICON } /> }>Inbox</DockItem>
                            <DockItem
                                icon={ <SettingsIcon className={ ICON } /> }
                                onClick={ () => alert( 'Settings' ) }
                            >
                                Settings
                            </DockItem>
                        </Dock>
                    </Frame>
                </div>
            </div>

        </>
    ) ;
}
