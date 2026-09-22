'use client' ;

/**
 * LinkTabs — a row of tabs that NAVIGATE : each tab is a link, and the active
 * one is read from the URL. Not `Tabs`, which switches panels on one page.
 *
 * Two ways to read the URL :
 *
 *  - **by path** (default) — each tab has an `href`, and is active on that page
 *    **and below it**, the match stopping at a path segment
 *    (`helpers/routes/isPathActive`). `exact : true` on a tab keeps it to its
 *    own page — the « root » tab of a group, which every sibling path would
 *    otherwise also light. The default is the reverse of `Link`'s, on purpose :
 *    a record's tab stays lit on the record's sub-pages ;
 *  - **by query parameter** — with `paramName`, each tab has a `value` and
 *    links to the same page with `?paramName=value`, keeping the other
 *    parameters ; `value : null` removes the parameter (« All »), `resetParams`
 *    drops others on every switch (`[ 'offset' ]` : back to page 1). The page
 *    does not scroll.
 *
 * `isActive( tab , { pathname , value } )` replaces either reading, for a case
 * neither covers.
 *
 * **Groups** : a tab with `children` is a menu styled as a tab, opened on a
 * controlled `Dropdown`. It is lit — with the underline — whenever any of its
 * destinations is, at any depth, so the active rubric reads without opening
 * it ; the menu folds back on a route change. A child that has children of its
 * own is a `section` of the menu : its heading and its rows together, not a
 * second menu to open — a submenu opens on hover, which is nothing on a touch
 * screen.
 *
 * The active tab carries a sliding underline (`motion`, a shared `layoutId`) :
 * it travels from the previous tab to the new one, groups included. Two bars on
 * one page need two `indicatorId` ; the default is unique per bar.
 *
 * A tab's `count` is a small badge after its label, `0` shown, formatted
 * through `hooks/useNumberFormat`.
 *
 * @module components/tabs/LinkTabs
 *
 * @example
 * ```jsx
 * // By path
 * <LinkTabs
 *     tabs = {[
 *         { id : 'overview' , href : '/project/42' , label : 'Overview' , exact : true , Icon : MdDashboard } ,
 *         { id : 'reports' , label : 'Reports' , Icon : MdAssessment , children : [
 *             { id : 'daily'  , href : '/project/42/daily'  , label : 'Daily' , count : 3 } ,
 *             { id : 'exports' , label : 'Exports' , children : [
 *                 { id : 'csv' , href : '/project/42/csv' , label : 'CSV' } ,
 *             ] } ,
 *         ] } ,
 *     ]}
 * />
 *
 * // By query parameter
 * <LinkTabs
 *     paramName   = "status"
 *     resetParams = { [ 'offset' ] }
 *     tabs        = {[
 *         { id : 'open'   , value : 'open'   , label : 'Open'   , count : 12 } ,
 *         { id : 'closed' , value : 'closed' , label : 'Closed' } ,
 *         { id : 'all'    , value : null     , label : 'All' } ,
 *     ]}
 * />
 * ```
 */

import { useEffect , useId , useState } from 'react' ;

import { motion } from 'motion/react' ;

import Link from 'next/link' ;
import { usePathname , useSearchParams } from 'next/navigation' ;

import { MdKeyboardArrowDown } from 'react-icons/md' ;

import Dropdown from '../dropDowns/Dropdown' ;

import useNumberFormat from '../../hooks/useNumberFormat' ;

import isPathActive from '../../helpers/routes/isPathActive' ;

import cn from '../../themes/helpers/cn' ;

/**
 * The menu panel of a group.
 * @type {string}
 */
export const LINK_TABS_MENU_CLASS = 'z-50 w-56 bg-base-100 p-2 shadow border border-base-300/60' ;

/**
 * @typedef {Object} LinkTab
 * @property {string}            id          - React key.
 * @property {React.ReactNode}   label       - Display text.
 * @property {string}            [href]      - By path : the link target. Omitted on groups.
 * @property {?string}           [value]     - By query parameter : the parameter's value ; `null` removes it.
 * @property {boolean}           [exact=false] - By path : active on its own page only, not below it.
 * @property {React.ElementType} [Icon]      - An icon component, drawn before the label.
 * @property {number}            [count]     - A badge after the label ; `0` is shown.
 * @property {LinkTab[]}         [children]  - A group : a menu of these ; a child with children is a section.
 */

/**
 * Whether a tab carries children.
 *
 * @param {LinkTab} tab
 * @returns {boolean}
 */
const isGroup = tab => Array.isArray( tab?.children ) && tab.children.length > 0 ;

/**
 * The small count badge.
 *
 * @param {Object} props
 * @param {number} [props.count]
 */
const TabCount = ( { count } ) =>
{
    const { formatNumber } = useNumberFormat() ;

    return typeof count === 'number'
        ? <span className="badge badge-ghost badge-soft badge-xs tabular-nums">{ formatNumber( count , { maximumFractionDigits : 0 } ) }</span>
        : null ;
} ;

/**
 * The sliding underline, shared through `layoutId`.
 *
 * @param {Object} props
 * @param {string} props.indicatorId
 */
const Indicator = ( { indicatorId } ) =>
(
    <motion.span
        layoutId   = { indicatorId }
        className  = "absolute bottom-0 left-[10%] right-[10%] z-10 h-0.75 rounded-full bg-primary"
        transition = { { type : 'spring' , bounce : 0.2 , duration : 0.35 } }
    />
) ;

/**
 * A group : a tab-styled trigger over a menu of its destinations.
 *
 * The trigger is NOT a daisyUI `.tab` : that class only applies to a DIRECT
 * child of `.tabs`, and this one sits inside `.dropdown` — the md-tab metrics
 * are written out instead, so the group looks like its siblings.
 *
 * @param {Object}   props
 * @param {LinkTab}  props.tab
 * @param {Function} props.activeOf    - `( tab ) => boolean`, recursive.
 * @param {Function} props.hrefOf      - `( tab ) => string`.
 * @param {string}   props.indicatorId
 * @param {string}   props.routeKey    - Changes with the route : the menu folds back.
 */
const TabGroup = ( { tab , activeOf , hrefOf , indicatorId , routeKey } ) =>
{
    const [ open , setOpen ] = useState( false ) ;

    // A navigation from the menu — or anywhere — folds it back.
    // biome-ignore lint/correctness/useExhaustiveDependencies: runs on a route change only.
    useEffect( () => { setOpen( false ) ; } , [ routeKey ] ) ;

    const active = activeOf( tab ) ;

    const toItem = child => isGroup( child )
        ? { id : child.id , type : 'section' , label : child.label , items : child.children.map( toItem ) }
        : {
            id        : child.id ,
            label     : child.label ,
            href      : hrefOf( child ) ,
            icon      : child.Icon ? <child.Icon className="size-4" aria-hidden="true" /> : undefined ,
            count     : child.count ,
            active    : activeOf( child ) ,
            className : activeOf( child ) ? 'font-medium' : undefined ,
        } ;

    return (
        <Dropdown
            items         = { tab.children.map( toItem ) }
            menuClassName = { LINK_TABS_MENU_CLASS }
            open          = { open }
            placement     = "start"
            onOpenChange  = { setOpen }
            trigger       = { ( { open : isOpen , toggle } ) => (
                <button
                    type          = "button"
                    role          = "tab"
                    className     = { cn(
                        'relative inline-flex h-10 cursor-pointer items-center justify-center gap-2 px-3 text-sm transition-colors' ,
                        active ? 'text-base-content' : 'text-base-content/50 hover:text-base-content' ,
                    ) }
                    aria-expanded = { isOpen ? 'true' : 'false' }
                    aria-haspopup = "menu"
                    aria-selected = { active ? 'true' : 'false' }
                    onClick       = { toggle }
                >
                    { tab.Icon && <tab.Icon className="size-4" aria-hidden="true" /> }
                    { tab.label }
                    <MdKeyboardArrowDown className={ cn( 'size-4 opacity-60 transition-transform' , isOpen && 'rotate-180' ) } aria-hidden="true" />
                    { active && <Indicator indicatorId={ indicatorId } /> }
                </button>
            ) }
        />
    ) ;
} ;

/**
 * The row, once each tab knows whether it is active and where it links.
 *
 * @param {Object}    props
 * @param {Function}  props.activeOf
 * @param {string}    [props.className]
 * @param {Function}  props.hrefOf
 * @param {string}    props.indicatorId
 * @param {string}    props.routeKey
 * @param {boolean}   [props.scroll]      - `false` : the link keeps the scroll position.
 * @param {LinkTab[]} props.tabs
 */
const TabRow = ( { activeOf , className , hrefOf , indicatorId , routeKey , scroll , tabs } ) =>
(
    <div role="tablist" className={ cn( 'tabs tabs-border' , className ) }>
        { tabs.map( tab =>
        {
            if ( isGroup( tab ) )
            {
                return (
                    <TabGroup
                        key         = { tab.id }
                        activeOf    = { activeOf }
                        hrefOf      = { hrefOf }
                        indicatorId = { indicatorId }
                        routeKey    = { routeKey }
                        tab         = { tab }
                    />
                ) ;
            }

            const active = activeOf( tab ) ;

            return (
                <Link
                    key           = { tab.id }
                    aria-selected = { active ? 'true' : 'false' }
                    className     = { cn( 'tab gap-2' , active && 'tab-active' ) }
                    href          = { hrefOf( tab ) }
                    role          = "tab"
                    scroll        = { scroll }
                >
                    { tab.Icon && <tab.Icon className="size-4" aria-hidden="true" /> }
                    { tab.label }
                    <TabCount count={ tab.count } />
                    { active && <Indicator indicatorId={ indicatorId } /> }
                </Link>
            ) ;
        } ) }
    </div>
) ;

/**
 * By path : `usePathname` only, no search parameters read.
 *
 * @param {Object} props - See `LinkTabs`.
 */
const PathTabs = ( { className , indicatorId , isActive , tabs } ) =>
{
    const pathname = usePathname() ;

    const activeOf = tab => isGroup( tab )
        ? tab.children.some( activeOf )
        : isActive
            ? !!isActive( tab , { pathname } )
            : isPathActive( pathname , tab.href , { exact : tab.exact === true } ) ;

    return (
        <TabRow
            activeOf    = { activeOf }
            className   = { className }
            hrefOf      = { tab => tab.href }
            indicatorId = { indicatorId }
            routeKey    = { pathname ?? '' }
            tabs        = { tabs }
        />
    ) ;
} ;

/**
 * By query parameter : kept apart so a bar read by path never calls
 * `useSearchParams`, which asks for a `Suspense` boundary above it.
 *
 * @param {Object} props - See `LinkTabs`.
 */
const QueryTabs = ( { className , indicatorId , isActive , paramName , resetParams , tabs } ) =>
{
    const pathname     = usePathname() ;
    const searchParams = useSearchParams() ;

    const current = searchParams.get( paramName ) ;

    const hrefOf = tab =>
    {
        const next = new URLSearchParams( searchParams.toString() ) ;

        if ( tab.value === null || tab.value === undefined ) { next.delete( paramName ) ; }
        else                                                 { next.set( paramName , tab.value ) ; }

        for ( const key of resetParams ?? [] ) { next.delete( key ) ; }

        const query = next.toString() ;
        return query ? `${ pathname }?${ query }` : pathname ;
    } ;

    const activeOf = tab => isGroup( tab )
        ? tab.children.some( activeOf )
        : isActive
            ? !!isActive( tab , { pathname , value : current } )
            : ( tab.value === null || tab.value === undefined ) ? current === null : current === tab.value ;

    return (
        <TabRow
            activeOf    = { activeOf }
            className   = { className }
            hrefOf      = { hrefOf }
            indicatorId = { indicatorId }
            routeKey    = { `${ pathname }?${ searchParams.toString() }` }
            scroll      = { false }
            tabs        = { tabs }
        />
    ) ;
} ;

/**
 * @param {Object}    props
 * @param {string}    [props.className]   - Additional class names for the row.
 * @param {string}    [props.indicatorId] - The underline's `layoutId` ; unique per bar by default.
 * @param {Function}  [props.isActive]    - `( tab , { pathname , value } ) => boolean`, replacing the reading ; `value` is the parameter's, by query.
 * @param {string}    [props.paramName]   - Reads by this query parameter instead of by path.
 * @param {string[]}  [props.resetParams] - By query parameter : dropped from the URL on every switch.
 * @param {LinkTab[]} props.tabs          - The tabs, in display order.
 * @returns {React.ReactElement}
 */
const LinkTabs = ( { className , indicatorId , isActive , paramName , resetParams , tabs = [] } ) =>
{
    const generatedId = useId() ;
    const layoutId    = indicatorId ?? `link-tabs-${ generatedId }` ;

    return paramName
        ? <QueryTabs className={ className } indicatorId={ layoutId } isActive={ isActive } paramName={ paramName } resetParams={ resetParams } tabs={ tabs } />
        : <PathTabs className={ className } indicatorId={ layoutId } isActive={ isActive } tabs={ tabs } /> ;
} ;

LinkTabs.displayName = 'LinkTabs' ;

export default LinkTabs ;
