'use client' ;

import { useState } from 'react' ;

import Badge        from '@/components/Badge' ;
import Button       from '@/components/Button' ;
import Modal        from '@/components/modals/Modal' ;
import useModal     from '@/components/modals/hooks/useModal' ;
import Container    from '@/display/Container' ;
import ToastProvider from '@/contexts/toasts/provider' ;
import useToast , { ERROR , SUCCESS , WARNING } from '@/contexts/toasts/useToast' ;

import
{
    BOTTOM ,
    END ,
    horizontalAlignments ,
    verticalAlignments ,
}
from '@/themes/components/toast' ;

/**
 * Inner content of the demo, sitting under a local ToastProvider so that
 * `useToast()` resolves to the demo provider (with its switchable alignment).
 */
const ToastOverModalInner = () =>
{
    const { modalRef , open } = useModal() ;
    const { toast }           = useToast() ;

    return (
        <>
            <Button onClick={ open }>
                Open modal with toast trigger
            </Button>

            <Modal
                ref          = { modalRef }
                title        = "Toast over Modal"
                agree        = "Close"
                showDisagree = { false }
            >
                <div className="flex flex-col gap-4 py-4">
                    <p>
                        Click any of the buttons below. Each toast must appear <strong>above</strong> the modal backdrop, fully clickable (the close ✕ should work).
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <Button color="success" onClick={ () => toast( 'Saved successfully!' , SUCCESS ) }>
                            Trigger success toast
                        </Button>

                        <Button color="warning" onClick={ () => toast( 'Heads up — please review your input.' , WARNING ) }>
                            Trigger warning toast
                        </Button>

                        <Button color="error" onClick={ () => toast( 'Something went wrong.' , ERROR ) }>
                            Trigger error toast
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    ) ;
} ;

ToastOverModalInner.displayName = 'ToastOverModalInner' ;

/**
 * Stress-test inner: validates the MutationObserver re-promotion when a
 * <dialog> is opened *after* a toast is already visible (the case the
 * basic re-promote-on-new-toast effect cannot cover).
 */
const ToastStressInner = () =>
{
    const { modalRef: l1Ref , open: openL1 } = useModal() ;
    const { modalRef: l2Ref , open: openL2 } = useModal() ;
    const { modalRef: l3Ref , open: openL3 } = useModal() ;

    const { toast } = useToast({ delay: 8000 }) ;

    const fireToastThenOpen = ( fn , delay = 250 ) => () =>
    {
        toast( 'Toast fired before opening modal — should stay on top!' , SUCCESS ) ;
        setTimeout( fn , delay ) ;
    } ;

    const fireToastThenStack = () =>
    {
        toast( 'Watch me survive 3 stacked modals.' , WARNING ) ;
        setTimeout( openL1 , 200 ) ;
        setTimeout( openL2 , 500 ) ;
        setTimeout( openL3 , 800 ) ;
    } ;

    return (
        <div className="flex flex-col gap-3">

            <div className="flex flex-wrap gap-2">
                <Button color="primary" onClick={ fireToastThenOpen( openL1 ) }>
                    Toast → then open Level 1
                </Button>

                <Button color="secondary" onClick={ fireToastThenStack }>
                    Toast → then auto-stack 3 modals
                </Button>
            </div>

            <Modal
                ref          = { l1Ref }
                title        = "Level 1 (opened after toast)"
                maxWidth     = "max-w-2xl"
                agree        = "Close"
                showDisagree = { false }
            >
                <div className="flex flex-col gap-3 py-4">
                    <p>
                        This modal was opened <strong>after</strong> the toast was already visible.
                        The <code className="badge badge-sm">MutationObserver</code> in the provider should have
                        re-promoted the toast popover to the top of the top-layer stack.
                    </p>
                    <Button color="primary" onClick={ openL2 }>
                        Open Level 2
                    </Button>
                    <Button color="error" onClick={ () => toast( 'Toast fired from Level 1!' , ERROR ) }>
                        Trigger error toast from here
                    </Button>
                </div>
            </Modal>

            <Modal
                ref          = { l2Ref }
                title        = "Level 2"
                maxWidth     = "max-w-xl"
                agree        = "Close"
                showDisagree = { false }
            >
                <div className="flex flex-col gap-3 py-4">
                    <p>Level 2 is open. The toast should still be visible above the backdrop.</p>
                    <Button color="primary" onClick={ openL3 }>
                        Open Level 3
                    </Button>
                </div>
            </Modal>

            <Modal
                ref          = { l3Ref }
                title        = "Level 3"
                maxWidth     = "max-w-md"
                agree        = "Close"
                showDisagree = { false }
            >
                <div className="py-4">
                    <p>Level 3 — deepest stack. Toast should still be on top.</p>
                </div>
            </Modal>

        </div>
    ) ;
} ;

ToastStressInner.displayName = 'ToastStressInner' ;

/**
 * Demo: prove that toasts can stack above a native &lt;dialog&gt; modal,
 * and let the user switch the toast alignment to verify positioning.
 *
 * @returns {React.JSX.Element}
 */
const ToastOverModalDemo = () =>
{
    const [ hAlign , setHAlign ] = useState( END ) ;
    const [ vAlign , setVAlign ] = useState( BOTTOM ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Toast over Modal</h2>

            <p className="text-sm text-base-content/70">
                Click to verify that toasts appear above the modal backdrop. Test case:
                native <code className="badge badge-sm">&lt;dialog&gt;</code> top layer vs <code className="badge badge-sm">ToastProvider</code> popover.
            </p>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">Vertical</span>
                    { verticalAlignments.map( v =>
                    (
                        <Button
                            key     = { v }
                            size    = "sm"
                            color   = { vAlign === v ? 'primary' : 'neutral' }
                            style   = { vAlign === v ? undefined : 'outline' }
                            onClick = { () => setVAlign( v ) }
                        >
                            { v }
                        </Button>
                    ) ) }
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">Horizontal</span>
                    { horizontalAlignments.map( h =>
                    (
                        <Button
                            key     = { h }
                            size    = "sm"
                            color   = { hAlign === h ? 'primary' : 'neutral' }
                            style   = { hAlign === h ? undefined : 'outline' }
                            onClick = { () => setHAlign( h ) }
                        >
                            { h }
                        </Button>
                    ) ) }
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">Current</span>
                    <Badge color="primary">vAlign = { vAlign }</Badge>
                    <Badge color="secondary">hAlign = { hAlign }</Badge>
                </div>

            </div>

            <ToastProvider hAlign={ hAlign } vAlign={ vAlign }>

                <ToastOverModalInner />

                <div className="divider mt-4">Stress test : toast under stacked modals</div>

                <div className="flex flex-col gap-3">
                    <p className="text-sm text-base-content/70">
                        These buttons fire a toast <strong>first</strong>, then open a modal a few hundred
                        milliseconds later. Without the <code className="badge badge-sm">MutationObserver</code> in
                        the provider, the modal would steal the top of the top-layer stack and hide the toast.
                        With it, the toast popover is re-promoted as soon as the new <code className="badge badge-sm">&lt;dialog&gt;</code> opens.
                    </p>

                    <ToastStressInner />
                </div>

            </ToastProvider>

            <div className="text-xs text-base-content/60 leading-relaxed">
                <p>
                    Try every combination ({ verticalAlignments.length } × { horizontalAlignments.length } = 9 positions):
                    top / middle / bottom × start / center / end. Each toast should anchor at the chosen
                    corner, edge or center — independently of where the modal sits.
                </p>
            </div>

        </Container>
    ) ;
} ;

ToastOverModalDemo.displayName = 'ToastOverModalDemo' ;

export default ToastOverModalDemo ;
