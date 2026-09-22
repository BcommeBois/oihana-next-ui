'use client' ;

import { useState } from 'react' ;

import { useSearchParams } from 'next/navigation' ;

import Layout, { FLEX, GRID, MASONRY } from '@/components/layouts/Layout' ;
import Container                       from '@/display/Container' ;
import DisplayDropDown                 from '@/components/dropDowns/DisplayDropDown' ;

import { BsList    as BsListIcon    } from 'react-icons/bs' ;
import { BsGrid    as BsGridIcon    } from 'react-icons/bs' ;
import { BsColumns as BsColumnsIcon } from 'react-icons/bs' ;

import { TbLayoutList        as TbListIcon    } from 'react-icons/tb' ;
import { TbLayoutGrid        as TbGridIcon    } from 'react-icons/tb' ;
import { RiLayoutMasonryLine as TbMasonryIcon } from "react-icons/ri";

// ─── Fake items ──────────────────────────────────────────────────────────────

const ITEMS =
[
    { id : 1 , title : 'Aurore boréale'      , tall : false } ,
    { id : 2 , title : 'Dune au crépuscule'  , tall : true  } ,
    { id : 3 , title : 'Ruelle sous la pluie', tall : false } ,
    { id : 4 , title : 'Pont de fer'         , tall : false } ,
    { id : 5 , title : 'Forêt de brume'      , tall : true  } ,
    { id : 6 , title : 'Phare au matin'      , tall : false } ,
] ;

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Fake gallery card.
 */
const DemoItem = ({ title , tall = false }) =>
(
    <div className={ `bg-base-300 border border-base-content/10 rounded-lg p-4 flex flex-col gap-1 ${ tall ? 'pb-12' : '' }` }>
        <div className="w-full aspect-video bg-accent/20 rounded mb-2" />
        <p className="font-semibold text-sm">{ title }</p>
        <p className="text-xs text-base-content/50">Galerie — 1920 × 1080</p>
    </div>
) ;

/**
 * Inline badge + dropdown.
 */
const Row = ({ value , onChange , ...props }) =>
(
    <div className="flex items-center gap-4">
        <DisplayDropDown value={ value } onChange={ onChange } { ...props } />
        <span className="badge badge-neutral font-mono text-xs">{ value }</span>
    </div>
) ;

/**
 * Framed cell that reserves space so the panel is always visible.
 */
const DemoCell = ({ label , direction = 'bottom' , placement = 'end' , value , onChange }) =>
{
    const paddingClass =
    {
        top    : 'pt-44 pb-2' ,
        bottom : 'pb-44 pt-2' ,
        left   : 'ps-52 pe-2 py-2' ,
        right  : 'pe-52 ps-2 py-2' ,
    }[ direction ] ?? 'pb-44 pt-2' ;

    const justifyClass =
    {
        start  : 'justify-start' ,
        center : 'justify-center' ,
        end    : 'justify-end' ,
    }[ placement ] ?? 'justify-end' ;

    const alignClass = ( direction === 'left' || direction === 'right' )
        ? 'items-center'
        : 'items-start' ;

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs text-base-content/50 font-mono">{ label }</p>
            <div className={ `relative bg-base-200 rounded-lg overflow-visible ${ paddingClass }` }>
                <div className={ `flex ${ justifyClass } ${ alignClass } px-3` }>
                    <DisplayDropDown
                        direction = { direction }
                        placement = { placement }
                        value     = { value }
                        onChange  = { onChange }
                    />
                </div>
            </div>
        </div>
    ) ;
} ;

/**
 * Labeled corner cell for autoPosition demo.
 * Positions the button in a specific corner of a fixed-size box
 * so the hook has to adapt to each situation.
 */
const AutoCell = ({ label , justify , align , value , onChange , computed }) =>
(
    <div className="flex flex-col gap-2">
        <p className="text-xs text-base-content/50 font-mono">{ label }</p>
        <div className={ `relative bg-base-200 rounded-lg h-32 flex ${ justify } ${ align } p-3` }>
            <div className="flex flex-col items-center gap-1">
                <DisplayDropDown
                    autoPosition
                    value    = { value }
                    onChange = { onChange }
                />
                { computed &&
                    <span className="text-[10px] text-base-content/40 font-mono whitespace-nowrap">
                        { computed }
                    </span>
                }
            </div>
        </div>
    </div>
) ;

/**
 * The self-driving dropdown : it writes `?display=` and remembers the mode.
 *
 * `value` is read back from the URL, which is what a server-rendered page does
 * with its own search parameters.
 */
const UrlCell = () =>
{
    const searchParams = useSearchParams() ;

    const value = searchParams.get( 'display' ) ?? 'flex' ;

    return (
        <div className="flex items-center gap-4">
            <DisplayDropDown autoPosition pageKey="lab-display" value={ value } />
            <span className="badge badge-neutral font-mono text-xs">{ `?display=${ searchParams.get( 'display' ) ?? '—' }` }</span>
        </div>
    ) ;
} ;

// ─── Demo ─────────────────────────────────────────────────────────────────────

const DisplayDropDownDemo = () =>
{
    const [ mAll  , setMAll  ] = useState( 'flex'    ) ;
    const [ mFM   , setMFM   ] = useState( 'masonry' ) ;
    const [ mFG   , setMFG   ] = useState( 'flex'    ) ;
    const [ dir   , setDir   ] = useState( 'flex'    ) ;
    const [ place , setPlace ] = useState( 'flex'    ) ;
    const [ combo , setCombo ] = useState( 'flex'    ) ;
    const [ auto  , setAuto  ] = useState( 'flex'    ) ;
    const [ live  , setLive  ] = useState( 'flex'    ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-5xl">

            <h3 className="text-2xl font-bold">DisplayDropDown Examples</h3>

            {/* ════════════════════════════════ Modes ══════════════════════════════ */}

            <section className="flex flex-col gap-6">

                <h4 className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                    Modes
                </h4>

                <div className="flex flex-col gap-3">

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-base-content/50 font-mono">
                            { 'modes={["flex","masonry","grid"]} (défaut)' }
                        </p>
                        <Row value={ mAll } onChange={ setMAll } />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-base-content/50 font-mono">
                            { 'modes={["flex","masonry"]}' }
                        </p>
                        <Row
                            modes    = { [ 'flex' , 'masonry' ] }
                            value    = { mFM }
                            onChange = { setMFM }
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-base-content/50 font-mono">
                            { 'modes={["flex","grid"]}' }
                        </p>
                        <Row
                            modes    = { [ 'flex' , 'grid' ] }
                            value    = { mFG }
                            onChange = { setMFG }
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-base-content/50 font-mono">
                            { 'modes={["flex"]} → null' }
                        </p>
                        <div className="flex items-center gap-4 h-8">
                            <DisplayDropDown
                                modes    = { [ 'flex' ] }
                                value    = "flex"
                                onChange = { () => {} }
                            />
                            <span className="text-xs text-base-content/30 italic">rien rendu</span>
                        </div>
                    </div>

                </div>

            </section>

            <div className="divider" />

            {/* ════════════════════════════════ Direction ══════════════════════════ */}

            <section className="flex flex-col gap-4">

                <h4 className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                    Direction
                </h4>

                <p className="text-xs text-base-content/40">
                    Chaque cellule réserve l'espace dans la direction d'ouverture.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

                    <DemoCell
                        label     = 'bottom (défaut)'
                        direction = "bottom"
                        placement = "end"
                        value     = { dir }
                        onChange  = { setDir }
                    />

                    <DemoCell
                        label     = 'top'
                        direction = "top"
                        placement = "end"
                        value     = { dir }
                        onChange  = { setDir }
                    />

                    <DemoCell
                        label     = 'left'
                        direction = "left"
                        placement = "end"
                        value     = { dir }
                        onChange  = { setDir }
                    />

                    <DemoCell
                        label     = 'right'
                        direction = "right"
                        placement = "start"
                        value     = { dir }
                        onChange  = { setDir }
                    />

                </div>

            </section>

            <div className="divider" />

            {/* ════════════════════════════════ Placement ══════════════════════════ */}

            <section className="flex flex-col gap-4">

                <h4 className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                    Placement
                </h4>

                <p className="text-xs text-base-content/40">
                    Le panel s'ancre relativement au bouton.
                </p>

                <div className="grid grid-cols-3 gap-4">

                    <DemoCell
                        label     = 'start'
                        direction = "bottom"
                        placement = "start"
                        value     = { place }
                        onChange  = { setPlace }
                    />

                    <DemoCell
                        label     = 'center'
                        direction = "bottom"
                        placement = "center"
                        value     = { place }
                        onChange  = { setPlace }
                    />

                    <DemoCell
                        label     = 'end (défaut)'
                        direction = "bottom"
                        placement = "end"
                        value     = { place }
                        onChange  = { setPlace }
                    />

                </div>

            </section>

            <div className="divider" />

            {/* ════════════════════════════════ Combinaisons ═══════════════════════ */}

            <section className="flex flex-col gap-4">

                <h4 className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                    Combinaisons
                </h4>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                    <DemoCell label="top + end"      direction="top"    placement="end"    value={ combo } onChange={ setCombo } />
                    <DemoCell label="top + start"    direction="top"    placement="start"  value={ combo } onChange={ setCombo } />
                    <DemoCell label="top + center"   direction="top"    placement="center" value={ combo } onChange={ setCombo } />
                    <DemoCell label="bottom + start" direction="bottom" placement="start"  value={ combo } onChange={ setCombo } />
                    <DemoCell label="right + end"    direction="right"  placement="end"    value={ combo } onChange={ setCombo } />
                    <DemoCell label="left + start"   direction="left"   placement="start"  value={ combo } onChange={ setCombo } />

                </div>

            </section>

            <div className="divider" />

            {/* ════════════════════════════════ Icons ══════════════════════════════ */}

            <section className="flex flex-col gap-4">

                <h4 className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                    Icons
                </h4>

                <p className="text-xs text-base-content/40">
                    La prop <span className="font-mono">icons</span> accepte un override partiel ou total — les clés absentes gardent l'icône par défaut.
                </p>

                <div className="flex flex-col gap-3">

                    {/* Default — for comparison */}

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-base-content/50 font-mono">
                            défaut (CiGrid31 / RiLayoutMasonryFill / IoMdGrid)
                        </p>
                        <Row value={ mAll } onChange={ setMAll } />
                    </div>

                    {/* Override total — bs icons */}

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-base-content/50 font-mono">
                            { "icons={ { flex: BsList , masonry: BsColumns , grid: BsGrid } }" }
                        </p>
                        <Row
                            icons    = { { flex : BsListIcon , masonry : BsColumnsIcon , grid : BsGridIcon } }
                            value    = { mAll }
                            onChange = { setMAll }
                        />
                    </div>

                    {/* Override total — tb icons */}

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-base-content/50 font-mono">
                            { "icons={ { flex: TbLayoutList , masonry: TbLayoutMasonry , grid: TbLayoutGrid } }" }
                        </p>
                        <Row
                            icons    = { { flex : TbListIcon , masonry : TbMasonryIcon , grid : TbGridIcon } }
                            value    = { mAll }
                            onChange = { setMAll }
                        />
                    </div>

                    {/* Override partiel — flex seulement */}

                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-base-content/50 font-mono">
                            { "icons={ { flex: BsList } } — masonry + grid restent par défaut" }
                        </p>
                        <Row
                            icons    = { { flex : BsListIcon } }
                            value    = { mAll }
                            onChange = { setMAll }
                        />
                    </div>

                </div>

            </section>

            <div className="divider" />

            {/* ════════════════════════════════ autoPosition ═══════════════════════ */}

            <section className="flex flex-col gap-4">

                <h4 className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                    autoPosition
                </h4>

                <p className="text-xs text-base-content/40">
                    Même prop <span className="font-mono">autoPosition</span> sur tous les boutons.
                    Le hook calcule direction + placement d'après la position réelle dans le viewport au moment du clic.
                </p>

                {/* 3×2 grid standing in for different corners and edges */}

                <div className="grid grid-cols-3 gap-3">

                    {/* Row 1 — top */}

                    <AutoCell
                        label   = "haut-gauche"
                        justify = "justify-start"
                        align   = "items-start"
                        value   = { auto }
                        onChange = { setAuto }
                    />

                    <AutoCell
                        label   = "haut-centre"
                        justify = "justify-center"
                        align   = "items-start"
                        value   = { auto }
                        onChange = { setAuto }
                    />

                    <AutoCell
                        label   = "haut-droite"
                        justify = "justify-end"
                        align   = "items-start"
                        value   = { auto }
                        onChange = { setAuto }
                    />

                    {/* Row 2 — bottom */}

                    <AutoCell
                        label   = "bas-gauche"
                        justify = "justify-start"
                        align   = "items-end"
                        value   = { auto }
                        onChange = { setAuto }
                    />

                    <AutoCell
                        label   = "bas-centre"
                        justify = "justify-center"
                        align   = "items-end"
                        value   = { auto }
                        onChange = { setAuto }
                    />

                    <AutoCell
                        label   = "bas-droite"
                        justify = "justify-end"
                        align   = "items-end"
                        value   = { auto }
                        onChange = { setAuto }
                    />

                </div>

                <p className="text-xs text-base-content/40 text-center">
                    Les panels haut ouvrent vers le bas, les panels bas ouvrent vers le haut.
                    Les panels gauche/droite s'adaptent selon l'espace horizontal.
                </p>

            </section>

            <div className="divider" />

            {/* ════════════════════════════════ pageKey ════════════════════════════ */}

            <section className="flex flex-col gap-4">

                <h4 className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                    pageKey — il se pilote tout seul
                </h4>

                <p className="text-xs text-base-content/40">
                    Avec <span className="font-mono">pageKey</span>, le mode choisi part dans l'URL
                    (<span className="font-mono">?display=</span>) et reste mémorisé pour cette page :
                    rechargez, le mode revient. Le <span className="font-mono">value</span> est lu de
                    l'URL ici, comme le ferait une page rendue côté serveur.
                </p>

                <UrlCell />

            </section>

            <div className="divider" />

            {/* ════════════════════════════════ Live preview ═══════════════════════ */}

            <section className="flex flex-col gap-4">

                <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-base-content/70 uppercase tracking-wide">
                        Live preview
                    </h4>
                    <div className="flex items-center gap-3">
                        <span className="badge badge-neutral font-mono text-xs">{ live }</span>
                        <DisplayDropDown
                            autoPosition
                            value    = { live }
                            onChange = { setLive }
                        />
                    </div>
                </div>

                <div className="bg-base-300 rounded-box p-4">
                    <Layout
                        columns = { { xs : 1 , sm : 2 , md : 3 } }
                        cols    = { { xs : 1 , sm : 2 , md : 3 } }
                        display = { live }
                        gap     = { 3 }
                    >
                        { ITEMS.map( item =>
                            <DemoItem
                                key   = { item.id }
                                title = { item.title }
                                tall  = { item.tall }
                            />
                        ) }
                    </Layout>
                </div>

                <p className="text-xs text-base-content/40 text-center">
                    En mode masonry les hauteurs naturelles sont préservées — remarque les items 2 et 5 plus hauts
                </p>

            </section>

        </Container>
    ) ;
} ;

export default DisplayDropDownDemo ;