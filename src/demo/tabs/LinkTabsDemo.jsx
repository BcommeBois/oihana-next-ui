'use client' ;

/**
 * LinkTabsDemo — `LinkTabs`, the tabs that navigate.
 *
 *  - **By path** : the tabs link to pages of this lab. « Onglets » is lit here,
 *    `exact`. « Formulaire » is a group : its menu lists two pages, then a
 *    section « Dates » with two more — heading and rows together. The group
 *    lights up when one of its pages is the current one : open « Champs »
 *    from it, the bar is not on that page, come back.
 *  - **By query parameter** : `?statut=` on this very page, counts included,
 *    « Tous » removing the parameter and `page` dropped on every switch. The
 *    underline slides from one tab to the next, and the page does not scroll.
 *
 * @module demo/tabs/LinkTabsDemo
 */

import { MdCalendarMonth , MdEditNote , MdMenu , MdTab , MdTimer , MdTune } from 'react-icons/md' ;

import { useSearchParams } from 'next/navigation' ;

import LinkTabs from '@/components/tabs/LinkTabs' ;

/**
 * The bar read by path : pages of the lab.
 * @type {Object[]}
 */
const PATH_TABS =
[
    { id : 'tabs'  , href : '/lab/tabs'  , label : 'Onglets' , exact : true , Icon : MdTab } ,
    { id : 'menus' , href : '/lab/menus' , label : 'Menus'   , Icon : MdMenu } ,
    {
        id       : 'form' ,
        label    : 'Formulaire' ,
        Icon     : MdEditNote ,
        children :
        [
            { id : 'inputs'  , href : '/lab/inputs'  , label : 'Champs'     , Icon : MdEditNote , count : 14 } ,
            { id : 'selects' , href : '/lab/selects' , label : 'Sélecteurs' , Icon : MdTune     , count : 6 } ,
            {
                id       : 'datesSection' ,
                label    : 'Dates' ,
                children :
                [
                    { id : 'dates' , href : '/lab/dates' , label : 'Calendrier' , Icon : MdCalendarMonth } ,
                    { id : 'times' , href : '/lab/times' , label : 'Heure'      , Icon : MdTimer , count : 0 } ,
                ] ,
            } ,
        ] ,
    } ,
] ;

/**
 * The bar read by query parameter.
 * @type {Object[]}
 */
const QUERY_TABS =
[
    { id : 'open'    , value : 'ouvert'  , label : 'Ouverts'  , count : 1284 } ,
    { id : 'pending' , value : 'attente' , label : 'En attente' , count : 37 } ,
    { id : 'closed'  , value : 'ferme'   , label : 'Fermés'   , count : 0 } ,
    { id : 'all'     , value : null      , label : 'Tous' } ,
] ;

const LinkTabsDemo = () =>
{
    const searchParams = useSearchParams() ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">

                <h2 className="card-title">LinkTabs</h2>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-base-content/70">Par chemin</p>
                    <LinkTabs tabs={ PATH_TABS } />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm text-base-content/70">Par paramètre d’URL</p>
                    <LinkTabs paramName="statut" resetParams={ [ 'page' ] } tabs={ QUERY_TABS } />
                    <code className="rounded-box bg-base-100 p-2 text-xs">
                        { `?${ searchParams.toString() }` }
                    </code>
                </div>

            </div>
        </div>
    ) ;
} ;

LinkTabsDemo.displayName = 'LinkTabsDemo' ;

export default LinkTabsDemo ;
