'use client' ;

/**
 * MenuTitleDemo — a data-driven sidebar-style menu grouped into labelled
 * sections with the `menu-title` item type.
 *
 * Rendered through the recursive `Menu` renderer without a
 * `NavigationProvider`, to show that titles/dividers/links/collapses
 * compose in a plain structured menu.
 *
 * @module demo/menus/MenuTitleDemo
 */

import {
    MdDashboard   as DashboardIcon ,
    MdInsertChart as StatsIcon ,
    MdPerson      as ProfileIcon ,
    MdSettings    as SettingsIcon ,
    MdShield      as SecurityIcon ,
    MdLogout      as LogoutIcon ,
    MdInsertLink  as LinkIcon ,
} from 'react-icons/md' ;

import { COLLAPSE , DIVIDER , LINK , TITLE } from '@/contexts/navigation/types' ;

import Menu from '@/display/ui/navigation/Menu' ;

const items =
[
    { id : 'title-general' , type : TITLE , label : 'Général' } ,
    { id : 'dashboard' , type : LINK , label : 'Tableau de bord' , path : '/dashboard' , Icon : DashboardIcon } ,
    { id : 'stats' , type : LINK , label : 'Statistiques' , path : '/stats' , Icon : StatsIcon } ,

    { id : 'div-1' , type : DIVIDER } ,

    { id : 'title-account' , type : TITLE , label : 'Compte' , Icon : ProfileIcon } ,
    { id : 'profile' , type : LINK , label : 'Profil' , path : '/profile' , Icon : ProfileIcon } ,
    {
        id    : 'settings' ,
        type  : COLLAPSE ,
        label : 'Paramètres' ,
        Icon  : SettingsIcon ,
        items :
        [
            { id : 'settings-security' , type : LINK , label : 'Sécurité' , path : '/settings/security' , Icon : SecurityIcon } ,
            { id : 'settings-links' , type : LINK , label : 'Connexions' , path : '/settings/links' , Icon : LinkIcon } ,
        ] ,
    } ,

    { id : 'div-2' , type : DIVIDER } ,

    { id : 'title-session' , type : TITLE , label : 'Session' } ,
    { id : 'logout' , type : LINK , label : 'Déconnexion' , path : '/logout' , Icon : LogoutIcon } ,
] ;

export default function MenuTitleDemo()
{
    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-sm">menu-title — sections</h2>
                <Menu
                    className = "menu w-full max-w-xs bg-base-100 rounded-box gap-1 p-2 border border-base-300"
                    items     = { items }
                />
            </div>
        </div>
    ) ;
}
