'use client' ;

/**
 * PagedMenuDemo — a multi-level drill-down menu using `PagedMenu`
 * (DaisyUI `menu-paged`). Click a group to descend one level; the open
 * group's header becomes a Back button.
 *
 * @module demo/menus/PagedMenuDemo
 */

import {
    MdHome        as HomeIcon ,
    MdStorefront  as ShopIcon ,
    MdDevices     as ElectronicsIcon ,
    MdCheckroom   as ClothingIcon ,
    MdPhoneIphone as PhoneIcon ,
    MdLaptop      as LaptopIcon ,
    MdInfo        as AboutIcon ,
    MdSupportAgent as SupportIcon ,
} from 'react-icons/md' ;

import { COLLAPSE , DIVIDER , LINK , TITLE } from '@/contexts/navigation/types' ;

import PagedMenu from '@/components/menus/PagedMenu' ;

const items =
[
    { id : 'title-shop' , type : TITLE , label : 'Boutique' } ,
    { id : 'home' , type : LINK , label : 'Accueil' , path : '/' , Icon : HomeIcon } ,
    {
        id    : 'products' ,
        type  : COLLAPSE ,
        label : 'Produits' ,
        Icon  : ShopIcon ,
        items :
        [
            { id : 'all-products' , type : LINK , label : 'Tous les produits' , path : '/products' , Icon : ShopIcon } ,
            {
                id    : 'electronics' ,
                type  : COLLAPSE ,
                label : 'Électronique' ,
                Icon  : ElectronicsIcon ,
                items :
                [
                    { id : 'phones' , type : LINK , label : 'Téléphones' , path : '/products/phones' , Icon : PhoneIcon } ,
                    { id : 'laptops' , type : LINK , label : 'Ordinateurs' , path : '/products/laptops' , Icon : LaptopIcon } ,
                ] ,
            } ,
            { id : 'clothing' , type : LINK , label : 'Vêtements' , path : '/products/clothing' , Icon : ClothingIcon } ,
        ] ,
    } ,

    { id : 'div-1' , type : DIVIDER } ,

    { id : 'about' , type : LINK , label : 'À propos' , path : '/about' , Icon : AboutIcon } ,
    { id : 'support' , type : LINK , label : 'Support' , path : '/support' , Icon : SupportIcon } ,
] ;

export default function PagedMenuDemo()
{
    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-sm">PagedMenu — drill-down (menu-paged)</h2>
                <p className="text-xs opacity-70">
                    Cliquez un groupe pour descendre d'un niveau ; l'en-tête ouvert devient un bouton « Back ». 3 niveaux : Produits → Électronique → Téléphones/Ordinateurs.
                </p>
                <PagedMenu
                    items     = { items }
                    size      = "md"
                    className = "w-64 bg-base-100 rounded-box border border-base-300"
                />
            </div>
        </div>
    ) ;
}
