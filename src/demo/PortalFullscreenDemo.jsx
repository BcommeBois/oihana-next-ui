'use client' ;

/**
 * The four floating surfaces, side by side, with a fullscreen switch — the
 * bench for what a portal has to aim at.
 *
 * An element put fullscreen is promoted to the browser's **top layer**, which
 * does not belong to the document's stacking order : nothing painted in
 * `document.body` can come above it, whatever its `z-index`. A `<dialog>`
 * opened with `showModal()` enters that same layer and is fine ; a panel that
 * is a plain positioned `<div>` is not, and `Portal` is what puts it in the
 * right place.
 *
 * Open each one, switch to fullscreen, open them again. All four must sit
 * ABOVE the page in both states.
 *
 * @module demo/PortalFullscreenDemo
 */

import { useRef , useState } from 'react' ;

import Button      from '@/components/Button' ;
import Divider     from '@/components/Divider' ;
import FloatingTip from '@/components/FloatingTip' ;
import Popover     from '@/components/Popover' ;

import Modal    from '@/components/modals/Modal' ;
import useModal from '@/components/modals/hooks/useModal' ;

import useFullscreen        from '@/contexts/fullscreen/useFullscreen' ;
import useFullscreenElement from '@/hooks/useFullscreenElement' ;

import Container from '@/display/Container' ;

/** Something to look at inside the popover, tall enough to overlap what follows. */
const PANEL_ITEMS = [ 'January' , 'February' , 'March' , 'April' , 'May' , 'June' ] ;

const PortalFullscreenDemo = () =>
{
    const { isFullscreen , toggleFullscreen } = useFullscreen() ;

    const fullscreenElement = useFullscreenElement() ;

    const anchor = useRef( null ) ;

    const [ isOpen , setOpen ] = useState( false ) ;

    const { modalRef , open } = useModal() ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Portal and the fullscreen top layer</h2>

            <p className="text-sm text-base-content/70 max-w-2xl">
                Open each surface below, then switch to fullscreen and open them again. All four have
                to sit above the page in both states — a panel that half-opens behind this card is a
                portal aiming at <code>document.body</code> while the top layer is somewhere else.
            </p>

            <div className="flex flex-wrap items-center gap-3">
                <Button color="primary" onClick={ toggleFullscreen } size="sm">
                    { isFullscreen ? 'Leave fullscreen' : 'Enter fullscreen' }
                </Button>
                <span className="text-sm text-base-content/60">
                    portal target : <code>{ fullscreenElement ? 'the fullscreen element' : 'document.body' }</code>
                </span>
            </div>

            <Divider>A popover on a trigger</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    className = "btn btn-sm"
                    onClick   = { () => setOpen( value => !value ) }
                    ref       = { anchor }
                    type      = "button"
                >
                    Choose a month
                </button>

                <Popover
                    anchorRef = { anchor }
                    ariaLabel = "Choose a month"
                    isOpen    = { isOpen }
                    onClose   = { () => setOpen( false ) }
                    placement = "start"
                >
                    <ul className="grid grid-cols-3 gap-2 w-64">
                        { PANEL_ITEMS.map( month => (
                            <li key={ month }>
                                <button className="btn btn-ghost btn-sm w-full" onClick={ () => setOpen( false ) } type="button">
                                    { month }
                                </button>
                            </li>
                        ) ) }
                    </ul>
                </Popover>
            </div>

            <Divider>A floating tooltip</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <FloatingTip tip="This bubble is portalled too — it has to clear the page in both states.">
                    <span className="btn btn-sm btn-outline">Hover me</span>
                </FloatingTip>
            </div>

            <Divider>A modal</Divider>

            <p className="text-sm text-base-content/70 max-w-2xl">
                This one was never affected : a <code>&lt;dialog&gt;</code> opened with
                <code> showModal() </code> enters the top layer by itself. It is here so a regression
                would show up beside the others rather than on another page.
            </p>

            <div>
                <Button onClick={ open } size="sm">Open the modal</Button>

                <Modal ref={ modalRef } title="Above everything">
                    <p className="text-sm">
                        A modal dialog joins the top layer after the fullscreen element, so it paints
                        above it. Close this, and try the popover again without leaving fullscreen.
                    </p>
                </Modal>
            </div>

            <Divider>What sits underneath</Divider>

            <div className="rounded-box border border-base-300 bg-base-100 p-6 h-96">
                <p className="text-sm text-base-content/70">
                    Filler, right under the trigger : an open panel has to cover this text, never
                    slide behind it. It is tall on purpose — leave the popover open and scroll : the
                    panel has to follow its trigger rather than stay where it opened.
                </p>
            </div>

        </Container>
    ) ;
} ;

PortalFullscreenDemo.displayName = 'PortalFullscreenDemo' ;

export default PortalFullscreenDemo ;
