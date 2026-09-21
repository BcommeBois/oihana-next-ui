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

    const [ controlledOpen , setControlledOpen ] = useState( false ) ;

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

    // `native` : a full page load and no prefetch — the reload is what shows it
    // here, the lab going through its splash screen again.
    const nativeItems =
    [
        { id : 'next'   , label : 'Lien next/link (navigation client)' , href : '/lab/buttons' } ,
        { id : 'native' , label : 'Lien native (rechargement complet)' , href : '/lab/buttons' , native : true , icon : <LogoutIcon /> } ,
    ] ;

    return (
        <>

            {/* Controlled : the open state lives outside */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-3">
                    <h2 className="card-title text-sm">Dropdown — piloté (open + onOpenChange)</h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            className = "btn btn-sm btn-outline"
                            onClick   = { () => setControlledOpen( value => !value ) }
                            type      = "button"
                        >
                            { controlledOpen ? 'Fermer de l’extérieur' : 'Ouvrir de l’extérieur' }
                        </button>
                        <Dropdown
                            items        = { actionItems }
                            label        = "Menu piloté"
                            onOpenChange = { setControlledOpen }
                            open         = { controlledOpen }
                            placement    = "start"
                        />
                    </div>
                    <p className="text-xs opacity-70">État tenu par la page : <span className="font-mono">{ String( controlledOpen ) }</span></p>
                </div>
            </div>

            {/* Free content that closes the menu */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-3">
                    <h2 className="card-title text-sm">Dropdown — contenu libre ( children( {'{ close }'} ) )</h2>
                    <Dropdown label="Contenu libre" placement="start">
                        { ( { close } ) => (
                            <>
                                <li className="menu-title">Contenu libre</li>
                                <li>
                                    <button
                                        onClick = { () => { setLast( 'Contenu libre' ) ; close() ; } }
                                        type    = "button"
                                    >
                                        Agir puis refermer
                                    </button>
                                </li>
                            </>
                        ) }
                    </Dropdown>
                    <p className="text-xs opacity-70">Dernière action : <span className="font-mono">{ last }</span></p>
                </div>
            </div>

            {/* native : a real <a> */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-3">
                    <h2 className="card-title text-sm">Dropdown — entrée native (&lt;a&gt;, sans préchargement)</h2>
                    <Dropdown label="Liens" items={ nativeItems } placement="start" />
                    <p className="text-xs opacity-70">
                        La seconde entrée recharge toute la page : c&apos;est ce qu&apos;il faut à une route qui agit,
                        comme une déconnexion, qu&apos;un préchargement déclencherait toute seule.
                    </p>
                </div>
            </div>

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
