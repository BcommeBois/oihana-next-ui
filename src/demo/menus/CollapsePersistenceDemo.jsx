'use client' ;

/**
 * CollapsePersistenceDemo — three side-by-side `NavigationProvider`
 * instances showcasing the `defaultMode` and `storageKey` props.
 *
 * Each card mounts its own provider with a tiny three-item tree and
 * mirrors its `localStorage` payload, so the persistence and
 * follow-the-route behaviours can be exercised without leaving the
 * page. The cards intentionally use distinct storage keys to avoid
 * cross-talk.
 *
 * @module demo/menus/CollapsePersistenceDemo
 */

import { useEffect , useState } from 'react' ;

import {
    MdFolder      as GroupIcon  ,
    MdInsertLink  as LinkIcon   ,
    MdSubdirectoryArrowRight as ChildIcon ,
} from 'react-icons/md' ;

import NavigationProvider from '@/contexts/navigation/provider' ;
import useNavigation      from '@/contexts/navigation/useNavigation' ;
import { COLLAPSE , LINK } from '@/contexts/navigation/types' ;

import Menu from '@/display/ui/navigation/Menu' ;

const STORAGE_KEY_CLOSED = 'oihana-next-ui:demo:collapses:closed' ;
const STORAGE_KEY_AUTO   = 'oihana-next-ui:demo:collapses:auto'   ;

const demoItems =
[
    {
        id    : 'group-a' ,
        type  : COLLAPSE  ,
        label : 'Group A' ,
        Icon  : GroupIcon ,
        items :
        [
            { id : 'a-menus' , type : LINK , label : 'Menus page' , path : '/lab/menus' , Icon : LinkIcon } ,
            { id : 'a-other' , type : LINK , label : 'Fictive page' , path : '/demo/a/other' , Icon : LinkIcon } ,
        ] ,
    } ,
    {
        id          : 'group-b' ,
        type        : COLLAPSE  ,
        label       : 'Group B (defaultOpen=false)' ,
        Icon        : GroupIcon ,
        defaultOpen : false     ,
        items       :
        [
            { id : 'b-one' , type : LINK , label : 'B1' , path : '/demo/b/one' , Icon : ChildIcon } ,
            { id : 'b-two' , type : LINK , label : 'B2' , path : '/demo/b/two' , Icon : ChildIcon } ,
        ] ,
    } ,
] ;

/**
 * Reads `useNavigation()` and forwards its tree to the standard `Menu`,
 * so each card renders a proper sidebar-style menu without depending
 * on the global `<Sidebar>` chrome.
 */
const DemoMenu = () =>
{
    const { navigation } = useNavigation() ;

    return (
        <Menu
            className = "menu w-full bg-base-100 rounded-box gap-2 p-2 border border-base-300"
            items     = { navigation }
        />
    ) ;
} ;

/**
 * Live inspector that mirrors the JSON payload at the given storage key.
 * Refreshes on a low-frequency interval — accurate enough for a demo,
 * cheap enough to ignore.
 */
const StorageInspector = ( { storageKey } ) =>
{
    const [ value , setValue ] = useState( null ) ;

    useEffect( () =>
    {
        if ( !storageKey )
        {
            return undefined ;
        }

        const refresh = () =>
        {
            try
            {
                setValue( window.localStorage.getItem( storageKey ) ) ;
            }
            catch
            {
                setValue( null ) ;
            }
        } ;

        refresh() ;

        const id = window.setInterval( refresh , 500 ) ;

        return () => window.clearInterval( id ) ;
    }
    , [ storageKey ] ) ;

    return (
        <pre className="text-xs font-mono whitespace-pre-wrap break-all bg-base-200 rounded p-2 min-h-12">
            { value || <span className="opacity-60">(empty)</span> }
        </pre>
    ) ;
} ;

const DemoCard = ( { title , description , defaultMode , storageKey } ) =>
{
    const handleClear = () =>
    {
        if ( storageKey )
        {
            try
            {
                window.localStorage.removeItem( storageKey ) ;
            }
            catch
            {
                /* ignore */
            }
        }

        window.location.reload() ;
    } ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-3">
                <div>
                    <h3 className="card-title text-sm">{ title }</h3>
                    <p className="text-xs opacity-70">{ description }</p>
                </div>

                <NavigationProvider
                    defaultNavigation = { demoItems }
                    defaultMode       = { defaultMode }
                    storageKey        = { storageKey }
                    i18nPath          = "demo.collapsePersistence"
                >
                    <DemoMenu />
                </NavigationProvider>

                { storageKey
                    ? (
                        <>
                            <div className="text-xs opacity-70">
                                <code className="font-mono">{ storageKey }</code>
                            </div>
                            <StorageInspector storageKey={ storageKey } />
                            <button
                                type      = "button"
                                className = "btn btn-xs btn-outline self-start"
                                onClick   = { handleClear }
                            >
                                Clear &amp; reload
                            </button>
                        </>
                    )
                    : (
                        <div className="text-xs italic opacity-60">
                            No storageKey — collapse state lives only in memory.
                        </div>
                    )
                }
            </div>
        </div>
    ) ;
} ;

const CollapsePersistenceDemo = () =>
(
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        <DemoCard
            title       = "defaultMode = 'open'"
            description = "Legacy behaviour — every collapse starts open. No storageKey, no persistence."
            defaultMode = "open"
        />

        <DemoCard
            title       = "defaultMode = 'closed' + storageKey"
            description = "All collapses start closed. Toggles persist across reloads. Group B's defaultOpen=false has no visible effect (already closed)."
            defaultMode = "closed"
            storageKey  = { STORAGE_KEY_CLOSED }
        />

        <DemoCard
            title       = "defaultMode = 'auto' + storageKey"
            description = "Group A opens automatically on /lab/menus (its 'Menus page' link matches the current pathname). Group B starts closed via per-item defaultOpen=false override."
            defaultMode = "auto"
            storageKey  = { STORAGE_KEY_AUTO }
        />

    </div>
) ;

export default CollapsePersistenceDemo ;
