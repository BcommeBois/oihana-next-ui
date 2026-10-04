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

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;

/**
 * @param {Object} props
 * @param {string} [props.path='demo.modals.portalFullscreen'] - Dot notation path to the demo locale.
 */
const PortalFullscreenDemo = ( { path = 'demo.modals.portalFullscreen' } = {} ) =>
{
    const t = useI18n( path ) ;

    const { isFullscreen , toggleFullscreen } = useFullscreen() ;

    const fullscreenElement = useFullscreenElement() ;

    const anchor = useRef( null ) ;

    const [ isOpen , setOpen ] = useState( false ) ;

    const { modalRef , open } = useModal() ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <p className="text-sm text-base-content/70 max-w-2xl">{ t.description }</p>

            <div className="flex flex-wrap items-center gap-3">
                <Button color="primary" onClick={ toggleFullscreen } size="sm">
                    { isFullscreen ? t.leave : t.enter }
                </Button>
                <span className="text-sm text-base-content/60">
                    { t.target } <code>{ fullscreenElement ? t.onFull : t.onBody }</code>
                </span>
            </div>

            <Divider>{ t.popoverDivider }</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    className = "btn btn-sm"
                    onClick   = { () => setOpen( value => !value ) }
                    ref       = { anchor }
                    type      = "button"
                >
                    { t.popoverTrigger }
                </button>

                <Popover
                    anchorRef = { anchor }
                    ariaLabel = { t.popoverTrigger }
                    isOpen    = { isOpen }
                    onClose   = { () => setOpen( false ) }
                    placement = "start"
                >
                    <ul className="grid grid-cols-3 gap-2 w-64">
                        { t.months.map( month => (
                            <li key={ month }>
                                <button className="btn btn-ghost btn-sm w-full" onClick={ () => setOpen( false ) } type="button">
                                    { month }
                                </button>
                            </li>
                        ) ) }
                    </ul>
                </Popover>
            </div>

            <Divider>{ t.tipDivider }</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <FloatingTip tip={ t.tip }>
                    <span className="btn btn-sm btn-outline">{ t.tipTrigger }</span>
                </FloatingTip>
            </div>

            <Divider>{ t.modalDivider }</Divider>

            <p className="text-sm text-base-content/70 max-w-2xl">{ t.modalNote }</p>

            <div>
                <Button onClick={ open } size="sm">{ t.modalTrigger }</Button>

                <Modal ref={ modalRef } title={ t.modalTitle }>
                    <p className="text-sm">{ t.modalBody }</p>
                </Modal>
            </div>

            <Divider>{ t.fillerDivider }</Divider>

            <div className="rounded-box border border-base-300 bg-base-100 p-6 h-96">
                <p className="text-sm text-base-content/70">{ t.filler }</p>
            </div>

        </Container>
    ) ;
} ;

PortalFullscreenDemo.displayName = 'PortalFullscreenDemo' ;

export default PortalFullscreenDemo ;
