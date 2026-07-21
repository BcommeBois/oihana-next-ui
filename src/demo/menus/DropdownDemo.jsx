'use client' ;

/**
 * DropdownDemo — variants of the generic `Dropdown` (menu-in-a-dropdown).
 *
 * @module demo/menus/DropdownDemo
 */

import { useState } from 'react' ;

import {
    MdFolderOpen  as OpenIcon ,
    MdEdit        as EditIcon ,
    MdContentCopy as CopyIcon ,
    MdDelete      as DeleteIcon ,
    MdPerson      as ProfileIcon ,
    MdSettings    as SettingsIcon ,
    MdLogout      as LogoutIcon ,
    MdExpandMore  as ChevronIcon ,
} from 'react-icons/md' ;

import Dropdown from '@/components/dropDowns/Dropdown' ;

export default function DropdownDemo()
{
    const [ last , setLast ] = useState( '—' ) ;

    const actionItems =
    [
        { id : 'file' , type : 'title' , label : 'Fichier' } ,
        { id : 'open' , label : 'Ouvrir' , icon : <OpenIcon />  , onClick : () => setLast( 'Ouvrir' ) } ,
        { id : 'edit' , label : 'Éditer' , icon : <EditIcon />  , onClick : () => setLast( 'Éditer' ) } ,
        { id : 'copy' , label : 'Dupliquer' , icon : <CopyIcon /> , onClick : () => setLast( 'Dupliquer' ) } ,
        { id : 'sep'  , type : 'divider' } ,
        { id : 'del'  , label : 'Supprimer' , icon : <DeleteIcon /> , onClick : () => setLast( 'Supprimer' ) , disabled : true } ,
    ] ;

    const accountItems =
    [
        { id : 'profile' , label : 'Profil' , icon : <ProfileIcon /> , href : '/profile' , active : true } ,
        { id : 'settings' , label : 'Paramètres' , icon : <SettingsIcon /> , href : '/settings' } ,
        { id : 'sep' , type : 'divider' } ,
        { id : 'logout' , label : 'Déconnexion' , icon : <LogoutIcon /> , onClick : () => setLast( 'Déconnexion' ) } ,
    ] ;

    return (
        <>

            {/* Basic actions (title + divider + disabled) */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-3">
                    <h2 className="card-title text-sm">Dropdown — actions</h2>
                    <Dropdown
                        label       = "Actions"
                        triggerIcon = { <ChevronIcon className="size-4" /> }
                        triggerClassName = "btn btn-primary"
                        items       = { actionItems }
                        placement   = "start"
                    />
                    <p className="text-xs opacity-70">Dernière action : <span className="font-mono">{ last }</span></p>
                </div>
            </div>

            {/* Links + active row */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-3">
                    <h2 className="card-title text-sm">Dropdown — liens + actif (menu-active)</h2>
                    <Dropdown
                        label     = "Compte"
                        items     = { accountItems }
                        placement = "start"
                    />
                    <p className="text-xs opacity-70">« Profil » est marqué actif.</p>
                </div>
            </div>

            {/* Custom trigger + autoPosition */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-3">
                    <h2 className="card-title text-sm">Dropdown — trigger custom + autoPosition</h2>
                    <Dropdown
                        autoPosition
                        items   = { accountItems }
                        trigger = {
                            <div className="btn btn-circle btn-ghost">
                                <div className="avatar avatar-placeholder">
                                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                        <span className="text-xs">MA</span>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                    <p className="text-xs opacity-70">La position s'ajuste au viewport.</p>
                </div>
            </div>

        </>
    ) ;
}
