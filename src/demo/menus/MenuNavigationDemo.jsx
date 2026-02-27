/**
 * MenuNavigation demo component.
 *
 * @module demo/MenuNavigationDemo
 */

import MenuNavigation from '@/components/menus/MenuNavigation' ;

import {
    MdHome as HomeIcon ,
    MdInfo as AboutIcon ,
    MdContactMail as ContactIcon ,
    MdWork as ServicesIcon ,
    MdSettings as SettingsIcon ,
}
from 'react-icons/md' ;

const menuItems =
[
    { id: 'home' , label: 'Accueil' , icon: <HomeIcon /> , path: '/' } ,
    { id: 'about' , label: 'À propos' , icon: <AboutIcon /> , path: '/about' } ,
    { id: 'services' , label: 'Services' , icon: <ServicesIcon /> , path: '/services' } ,
    { id: 'contact' , label: 'Contact' , icon: <ContactIcon /> , path: '/contact' } ,
] ;

const menuItemsWithSettings =
[
    ...menuItems ,
    { id: 'settings' , label: 'Paramètres' , icon: <SettingsIcon /> , path: '/settings' } ,
] ;

export default function MenuNavigationDemo()
{
    return (
        <>

            {/* Horizontal */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">MenuNavigation - Horizontal</h2>
                    <MenuNavigation
                        items={ menuItems }
                        orientation="horizontal"
                        size="md"
                        showIcon
                        showLabel
                    />
                </div>
            </div>

            {/* Vertical */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">MenuNavigation - Vertical</h2>
                    <MenuNavigation
                        items={ menuItemsWithSettings }
                        orientation="vertical"
                        size="md"
                        showIcon
                        showLabel
                    />
                </div>
            </div>

            {/* Without Icons */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">MenuNavigation - Sans icônes</h2>
                    <MenuNavigation
                        items={ menuItems }
                        orientation="horizontal"
                        size="md"
                        showIcon={ false }
                        showLabel
                    />
                </div>
            </div>

            {/* Icons Only */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">MenuNavigation - Icônes seules</h2>
                    <MenuNavigation
                        items={ menuItems }
                        orientation="horizontal"
                        size="md"
                        showIcon
                        showLabel={ false }
                        showTooltip
                    />
                </div>
            </div>

            {/* Small Size */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">MenuNavigation - Taille SM</h2>
                    <MenuNavigation
                        items={ menuItems }
                        orientation="horizontal"
                        size="sm"
                        showIcon
                        showLabel
                    />
                </div>
            </div>

            {/* Large Size */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">MenuNavigation - Taille LG</h2>
                    <MenuNavigation
                        items={ menuItems }
                        orientation="horizontal"
                        size="lg"
                        showIcon
                        showLabel
                    />
                </div>
            </div>

            {/* With Tooltips */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">MenuNavigation - Avec tooltips</h2>
                    <MenuNavigation
                        items={ menuItems }
                        orientation="horizontal"
                        size="md"
                        showIcon
                        showLabel
                        showTooltip
                        tooltipPosition="bottom"
                    />
                </div>
            </div>

            {/* Disabled */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">MenuNavigation - Désactivé</h2>
                    <MenuNavigation
                        items={ menuItems }
                        orientation="horizontal"
                        size="md"
                        showIcon
                        showLabel
                        disabled
                    />
                </div>
            </div>

        </>
    ) ;
}