'use client' ;

/**
 * FilterSettingsButton — the control that decides WHICH filter criteria a list
 * shows.
 *
 * A square, icon-only trigger at the head of the filter row, opening a modal
 * (full-screen below `md`) with one checkbox per criterion. Everything is
 * ticked by default ; the choice is remembered per page.
 *
 * The criteria are described entirely by props — each bar supplies its own
 * ids, labels and icons. The preference is a list of HIDDEN ids : store it with
 * `helpers/filters/hiddenFilters` (`serializeHiddenFilters`), read it back on
 * the server with `parseHiddenFilters` and `resolveVisibleFilters`, and show
 * this control only where `isFilterSettingsOffered`.
 *
 * **Unticking a criterion CLEARS it.** The alternative — hiding only when idle —
 * gives a checkbox that visibly does nothing when unticked on an applied
 * criterion : the button stays, the chip stays, the list does not move. A box
 * that does not answer is a broken box. Clearing gives one gesture one meaning,
 * and removes the « applied but hidden » state altogether. The modal states how
 * many active filters a validation will remove, BEFORE it happens — clearing is
 * right, clearing silently is not.
 *
 * The trigger carries an `aria-label` **and** a `<Tooltip>` : a tooltip
 * degrades on touch, an accessible name does not.
 *
 * Labels : the `settings` block of the i18n bundle at `path`
 * (`components.filter` by default), over the English last resort.
 *
 * @module components/filters/FilterSettingsButton
 */

import { useState } from 'react' ;

import { MdClose , MdTune } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Modal       from '../modals/Modal' ;
import ModalFooter from '../modals/ModalFooter' ;
import Tooltip     from '../Tooltip' ;
import useModal    from '../modals/hooks/useModal' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import { serializeHiddenFilters } from '../../helpers/filters/hiddenFilters' ;

import cn from '../../themes/helpers/cn' ;

import { FILTER_LABELS_PATH } from './useFilterLabels' ;

/**
 * The English last resort of the control's labels.
 * @type {Object<string, string>}
 */
export const FILTER_SETTINGS_LABELS =
{
    apply       : 'Apply' ,
    cancel      : 'Cancel' ,
    checkAll    : 'Tick all' ,
    clearedMany : '{0} active filters will be removed.' ,
    clearedOne  : '1 active filter will be removed.' ,
    close       : 'Close' ,
    help        : 'Untick a filter to remove it from this page.' ,
    title       : 'Filters shown' ,
    trigger     : 'Choose the filters to show' ,
    uncheckAll  : 'Untick all' ,
} ;

/**
 * @typedef  {Object} FilterSettingsOption
 * @property {string} id    - The criterion id (its kind).
 * @property {string} label - Display name, already localised by the bar.
 * @property {React.ElementType} [icon] - The criterion's own icon.
 */

/**
 * @param {Object}   props
 * @param {FilterSettingsOption[]} props.options - Every criterion the bar OFFERS, in row order.
 * @param {string[]} [props.hidden=[]]  - Currently hidden ids.
 * @param {string[]} [props.active=[]]  - Criterion ids currently applied — unticking one of these clears it.
 * @param {Function} props.onApply      - Called with `( hiddenIds , clearedIds )` on « Apply », both in the options' order.
 * @param {string}   [props.path='components.filter'] - i18n bundle whose `settings` block holds the labels.
 * @returns {React.ReactElement}
 */
const FilterSettingsButton =
({
    options ,
    hidden = [] ,
    active = [] ,
    onApply ,
    path   = FILTER_LABELS_PATH ,
}) =>
{
    const { settings } = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const labels = { ...FILTER_SETTINGS_LABELS , ...( settings ?? {} ) } ;

    const { modalRef , close : closeModal , open : openModal } = useModal() ;

    const [ draft , setDraft ] = useState( () => new Set( hidden ) ) ;

    // Seeded on the way IN rather than from an effect watching the open state :
    // there is one opener, and doing it here keeps the draft correct on the
    // very first paint of the panel.
    const openPanel = () =>
    {
        setDraft( new Set( hidden ) ) ;
        openModal() ;
    } ;

    const toggle = ( id ) => setDraft( prev =>
    {
        const next = new Set( prev ) ;

        if ( next.has( id ) ) { next.delete( id ) ; }
        else                  { next.add( id ) ; }

        return next ;
    } ) ;

    const checkAll   = () => setDraft( new Set() ) ;
    const uncheckAll = () => setDraft( new Set( options.map( option => option.id ) ) ) ;

    // The applied criteria this validation would take away — the whole point of
    // announcing it before, rather than letting the list shrink and the user
    // wonder.
    const cleared = active.filter( id => draft.has( id ) ) ;

    const dirty = serializeHiddenFilters( options.map( option => option.id ).filter( id => draft.has( id ) ) )
        !== serializeHiddenFilters( options.map( option => option.id ).filter( id => hidden.includes( id ) ) ) ;

    const apply = () =>
    {
        // Emit in the OPTIONS order, so two identical preferences always
        // serialise to the same cookie whatever the order they were ticked in.
        onApply?.( options.map( option => option.id ).filter( id => draft.has( id ) ) , cleared ) ;
        closeModal() ;
    } ;

    const warning = cleared.length === 1
        ? labels.clearedOne
        : format( labels.clearedMany , cleared.length ) ;

    return (
        <>
            <Tooltip position="bottom" tip={ labels.trigger }>
                <button
                    type       = "button"
                    className  = { cn( 'btn btn-sm btn-square' , hidden.length > 0 && 'btn-primary btn-soft' ) }
                    onClick    = { openPanel }
                    aria-label = { labels.trigger }
                >
                    <MdTune size={ 18 } aria-hidden="true" />
                </button>
            </Tooltip>

            <Modal
                ref                  = { modalRef }
                portal
                contentClassName     = "flex flex-col"
                fullScreenBreakpoint = "md"
                maxWidth             = "max-w-sm"
                showCloseButton      = { false }
                title                = { labels.title }
                headerOptions        = {
                    <button
                        type       = "button"
                        className  = "btn btn-md btn-circle btn-ghost"
                        onClick    = { closeModal }
                        aria-label = { labels.close }
                    >
                        <MdClose size={ 20 } aria-hidden="true" />
                    </button>
                }
                footerNode           = {
                    <ModalFooter
                        status        = { cleared.length > 0 ? warning : '' }
                        disagree      = { labels.cancel }
                        agree         = { labels.apply }
                        agreeDisabled = { !dirty }
                        onDisagree    = { closeModal }
                        onAgree       = { apply }
                    />
                }
            >
                <div className="flex flex-col gap-3 px-2">

                    <p className="text-xs text-base-content/60">{ labels.help }</p>

                    <div className="flex flex-wrap gap-1.5">
                        <button type="button" className="btn btn-xs btn-ghost border border-base-300" onClick={ checkAll }>
                            { labels.checkAll }
                        </button>
                        <button type="button" className="btn btn-xs btn-ghost border border-base-300" onClick={ uncheckAll }>
                            { labels.uncheckAll }
                        </button>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        { options.map( option =>
                        {
                            const Icon    = option.icon ;
                            const checked = !draft.has( option.id ) ;

                            return (
                                <label
                                    key       = { option.id }
                                    className = { cn(
                                        'flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 hover:bg-base-200/50' ,
                                        checked && 'bg-primary/5' ,
                                    ) }
                                >
                                    <input
                                        type      = "checkbox"
                                        className = "checkbox checkbox-sm checkbox-primary"
                                        checked   = { checked }
                                        onChange  = { () => toggle( option.id ) }
                                    />

                                    { Icon && <Icon aria-hidden="true" className="size-4 shrink-0 text-base-content/50" /> }

                                    <span className="min-w-0 flex-1 truncate text-sm">
                                        { option.label }
                                    </span>

                                    { active.includes( option.id ) && (
                                        <span className="size-2 shrink-0 rounded-full bg-primary" />
                                    ) }
                                </label>
                            ) ;
                        } ) }
                    </div>

                </div>
            </Modal>
        </>
    ) ;
} ;

FilterSettingsButton.displayName = 'FilterSettingsButton' ;

export default FilterSettingsButton ;
