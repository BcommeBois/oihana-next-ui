'use client' ;

/**
 * ToolbarDisclosure — what stays visible on a list's toolbar, and what folds
 * away behind a toggle.
 *
 * A row : the search field on the left, growing, and on the right a toggle
 * carrying a funnel, a label, the number of applied criteria and a turning
 * chevron. Underneath, the bar itself — the criteria — inside a fold.
 *
 * 🔑 **The fold is pure CSS** (`grid-template-rows: 0fr ↔ 1fr` over an
 * `overflow-hidden` child) : it animates both ways with no measuring, no
 * `ResizeObserver` and no height to keep in step with the content. It is not
 * built on `Collapse`, whose daisyUI modes (checkbox, focus, radio, `details`)
 * cannot carry a trigger made of several pieces.
 *
 * 🚨 **`defaultOpen` is the SERVER's answer**, not a preference read in the
 * browser : a bar that opens after hydration flashes, and the criteria the
 * reader applied would appear a frame late. The page computes it — applied
 * criteria first, then the stored preference
 * ({@link module:helpers/storage/filtersStorageKey}) — and this component only
 * remembers what the reader does next.
 *
 * ⚠️ **It writes its cookie directly**, and never touches the URL : which
 * criteria are SHOWN is not what the list is filtered on. Running it through
 * `useFilterParams` would drag a `Suspense` requirement in for a cookie write.
 *
 * @module components/panels/ToolbarDisclosure
 *
 * @example
 * ```jsx
 * <ToolbarDisclosure
 *     activeCount = { appliedCount }
 *     defaultOpen = { appliedCount > 0 || storedPreference === true }
 *     pageKey     = "articles"
 *     search      = { <UrlSearch defaultValue={ search } /> }
 * >
 *     <ArticleFilterBar />
 * </ToolbarDisclosure>
 * ```
 */

import { useState } from 'react' ;

import { MdExpandMore as DefaultChevronIcon , MdFilterList as DefaultToggleIcon } from 'react-icons/md' ;

import useI18n from '../../contexts/locale/useI18n' ;

import getFiltersStorageKey , { FILTERS_CLOSED , FILTERS_OPEN } from '../../helpers/storage/filtersStorageKey' ;
import setCookie            from '../../helpers/storage/setCookie' ;

import cn from '../../themes/helpers/cn' ;

/**
 * Where the toggle reads its label when none is given.
 * @type {string}
 */
export const TOOLBAR_I18N_PATH = 'components.filter' ;

/**
 * @param {Object}            props
 * @param {number}            [props.activeCount=0]  - Applied criteria, shown as a badge ; `0` shows none.
 * @param {React.ReactNode}   props.children         - The toolbar that folds away.
 * @param {React.ElementType} [props.ChevronIcon]    - The turning chevron.
 * @param {string}            [props.className]      - Additional class names for the root.
 * @param {boolean}           [props.defaultOpen=false] - Unfolded on arrival. Computed by the page, on the server.
 * @param {React.ReactNode}   [props.label]          - The toggle's label. Read from `path` when absent.
 * @param {string}            [props.pageKey]        - Persistence namespace of the page. Without it the choice is not remembered.
 * @param {string}            [props.path='components.filter'] - i18n path of the label.
 * @param {React.ReactNode}   [props.search]         - What stays visible on the row, growing to fill it.
 * @param {React.ElementType} [props.ToggleIcon]     - The icon of the toggle.
 * @param {string}            [props.toolbarClassName] - Additional class names for the folding zone.
 *
 * @returns {React.ReactElement}
 */
const ToolbarDisclosure =
({
    activeCount = 0 ,
    children ,
    ChevronIcon = DefaultChevronIcon ,
    className ,
    defaultOpen = false ,
    label ,
    pageKey ,
    path        = TOOLBAR_I18N_PATH ,
    search ,
    ToggleIcon  = DefaultToggleIcon ,
    toolbarClassName ,
}) =>
{
    const [ open , setOpen ] = useState( defaultOpen ) ;

    const { toolbar : toolbarLabel = 'Filters' } = useI18n( path ) ;

    const toggle = () =>
    {
        const next = !open ;

        setOpen( next ) ;

        if ( pageKey )
        {
            setCookie( getFiltersStorageKey( pageKey ) , next ? FILTERS_OPEN : FILTERS_CLOSED ) ;
        }
    } ;

    return (
        <div className={ cn( 'flex flex-col' , className ) }>

            {/* The row that never folds */}
            <div className="flex items-center gap-2">

                { search &&
                    <div className="min-w-0 flex-1">
                        { search }
                    </div>
                }

                <button
                    type          = "button"
                    aria-expanded = { open }
                    className     = { cn(
                        'btn btn-sm gap-2 shrink-0' ,
                        ( open || activeCount > 0 ) && 'btn-primary btn-soft' ,
                    ) }
                    onClick       = { toggle }
                >
                    <ToggleIcon aria-hidden="true" size={ 18 } />
                    <span className="hidden sm:inline">{ label ?? toolbarLabel }</span>
                    { activeCount > 0 &&
                        <span className="badge badge-xs badge-primary">{ activeCount }</span>
                    }
                    <ChevronIcon
                        aria-hidden = "true"
                        className   = { cn( 'transition-transform duration-300' , open && 'rotate-180' ) }
                        size        = { 18 }
                    />
                </button>

            </div>

            {/* The fold. The top gap lives INSIDE it, so it vanishes when closed. */}
            <div
                className = { cn(
                    'grid transition-[grid-template-rows] duration-300 ease-out' ,
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]' ,
                ) }
            >
                <div className="overflow-hidden">
                    <div className={ cn( 'pt-4 transition-opacity duration-200' , open ? 'opacity-100' : 'opacity-0' , toolbarClassName ) }>
                        { children }
                    </div>
                </div>
            </div>

        </div>
    ) ;
} ;

ToolbarDisclosure.displayName = 'ToolbarDisclosure' ;

export default ToolbarDisclosure ;
