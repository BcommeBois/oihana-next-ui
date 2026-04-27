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
