/**
 * Breadcrumbs demo component.
 *
 * @module demo/menus/BreadcrumbsDemo
 */

import Breadcrumbs    from '@/components/menus/Breadcrumbs' ;
import BreadcrumbItem from '@/components/menus/BreadcrumbItem' ;

import {
    MdHome as HomeIcon ,
    MdFolder as FolderIcon ,
    MdNoteAdd as AddIcon ,
}
from 'react-icons/md' ;

const items =
[
    { id: 'home' , label: 'Accueil'      , href: '/' } ,
    { id: 'docs' , label: 'Documents'    , href: '/documents' } ,
    { id: 'add'  , label: 'Add Document' } ,
] ;

const itemsWithIcons =
[
    { id: 'home' , label: 'Accueil'      , href: '/'          , icon: <HomeIcon className="w-4 h-4" /> } ,
    { id: 'docs' , label: 'Documents'    , href: '/documents' , icon: <FolderIcon className="w-4 h-4" /> } ,
    { id: 'add'  , label: 'Add Document' , icon: <AddIcon className="w-4 h-4" /> } ,
] ;

const longItems =
[
    { id: '1' , label: 'Long text 1' , href: '/1' } ,
    { id: '2' , label: 'Long text 2' , href: '/2' } ,
    { id: '3' , label: 'Long text 3' , href: '/3' } ,
    { id: '4' , label: 'Long text 4' , href: '/4' } ,
    { id: '5' , label: 'Long text 5' } ,
] ;

export default function BreadcrumbsDemo()
{
    return (
        <>

            {/* Data-driven */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Breadcrumbs — items</h2>
                    <Breadcrumbs items={ items } />
                </div>
            </div>

            {/* With icons */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Breadcrumbs — avec icônes</h2>
                    <Breadcrumbs items={ itemsWithIcons } />
                </div>
            </div>

            {/* Composable */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Breadcrumbs — composable</h2>
                    <Breadcrumbs>
                        <BreadcrumbItem href="/">Accueil</BreadcrumbItem>
                        <BreadcrumbItem href="/documents">Documents</BreadcrumbItem>
                        <BreadcrumbItem>Add Document</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
            </div>

            {/* Sizes */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-2">
                    <h2 className="card-title text-sm">Breadcrumbs — tailles</h2>
                    <Breadcrumbs items={ items } size="xs" />
                    <Breadcrumbs items={ items } size="sm" />
                    <Breadcrumbs items={ items } size="md" />
                    <Breadcrumbs items={ items } size="lg" />
                </div>
            </div>

            {/* Max-width (scroll) */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Breadcrumbs — max-width (scroll)</h2>
                    <Breadcrumbs items={ longItems } maxWidth="max-w-xs" />
                </div>
            </div>

        </>
    ) ;
}
