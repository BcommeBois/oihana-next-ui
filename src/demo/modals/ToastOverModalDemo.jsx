'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

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
const ToastOverModalInner = ( { i18n } ) =>
{
    const { modalRef , open } = useModal() ;
    const { toast }           = useToast() ;

    return (
        <>
            <Button onClick={ open }>
                { i18n.basic.trigger }
            </Button>

            <Modal
                ref          = { modalRef }
                title        = { i18n.basic.title }
                agree        = { i18n.close }
                showDisagree = { false }
            >
                <div className="flex flex-col gap-4 py-4">
                    <p>{ i18n.basic.body }</p>

                    <div className="flex flex-wrap gap-2">
                        <Button color="success" onClick={ () => toast( i18n.basic.saved , SUCCESS ) }>
                            { i18n.basic.success }
                        </Button>

                        <Button color="warning" onClick={ () => toast( i18n.basic.review , WARNING ) }>
                            { i18n.basic.warning }
                        </Button>

                        <Button color="error" onClick={ () => toast( i18n.basic.wrong , ERROR ) }>
                            { i18n.basic.error }
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
const ToastStressInner = ( { i18n } ) =>
{
    const { modalRef: l1Ref , open: openL1 } = useModal() ;
    const { modalRef: l2Ref , open: openL2 } = useModal() ;
    const { modalRef: l3Ref , open: openL3 } = useModal() ;

    const { toast } = useToast({ delay: 8000 }) ;

    const fireToastThenOpen = ( fn , delay = 250 ) => () =>
    {
        toast( i18n.stress.first , SUCCESS ) ;
        setTimeout( fn , delay ) ;
    } ;

    const fireToastThenStack = () =>
    {
        toast( i18n.stress.survive , WARNING ) ;
        setTimeout( openL1 , 200 ) ;
        setTimeout( openL2 , 500 ) ;
        setTimeout( openL3 , 800 ) ;
    } ;

    return (
        <div className="flex flex-col gap-3">

            <div className="flex flex-wrap gap-2">
                <Button color="primary" onClick={ fireToastThenOpen( openL1 ) }>
                    { i18n.stress.thenOpen }
                </Button>

                <Button color="secondary" onClick={ fireToastThenStack }>
                    { i18n.stress.thenStack }
                </Button>
            </div>

            <Modal
                ref          = { l1Ref }
                title        = { i18n.stress.level1 }
                maxWidth     = "max-w-2xl"
                agree        = { i18n.close }
                showDisagree = { false }
            >
                <div className="flex flex-col gap-3 py-4">
                    <p>{ i18n.stress.level1Body }</p>
                    <Button color="primary" onClick={ openL2 }>
                        { i18n.stress.openLevel2 }
                    </Button>
                    <Button color="error" onClick={ () => toast( i18n.stress.fromLevel1Ko , ERROR ) }>
                        { i18n.stress.fromLevel1 }
                    </Button>
                </div>
            </Modal>

            <Modal
                ref          = { l2Ref }
                title        = { i18n.stress.level2 }
                maxWidth     = "max-w-xl"
                agree        = { i18n.close }
                showDisagree = { false }
            >
                <div className="flex flex-col gap-3 py-4">
                    <p>{ i18n.stress.level2Body }</p>
                    <Button color="primary" onClick={ openL3 }>
                        { i18n.stress.openLevel3 }
                    </Button>
                </div>
            </Modal>

            <Modal
                ref          = { l3Ref }
                title        = { i18n.stress.level3 }
                maxWidth     = "max-w-md"
                agree        = { i18n.close }
                showDisagree = { false }
            >
                <div className="py-4">
                    <p>{ i18n.stress.level3Body }</p>
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
const ToastOverModalDemo = ( { path = 'demo.modals.toastOver' } = {} ) =>
{
    const t = useI18n( path ) ;

    const [ hAlign , setHAlign ] = useState( END ) ;
    const [ vAlign , setVAlign ] = useState( BOTTOM ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <p className="text-sm text-base-content/70">{ t.description }</p>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">

                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold w-24">{ t.vertical }</span>
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
                    <span className="text-sm font-semibold w-24">{ t.horizontal }</span>
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
                    <span className="text-sm font-semibold w-24">{ t.current }</span>
                    <Badge color="primary">vAlign = { vAlign }</Badge>
                    <Badge color="secondary">hAlign = { hAlign }</Badge>
                </div>

            </div>

            <ToastProvider hAlign={ hAlign } vAlign={ vAlign }>

                <ToastOverModalInner i18n={ t } />

                <div className="divider mt-4">{ t.stress.divider }</div>

                <div className="flex flex-col gap-3">
                    <p className="text-sm text-base-content/70">{ t.stress.note }</p>

                    <ToastStressInner i18n={ t } />
                </div>

            </ToastProvider>

            <div className="text-xs text-base-content/60 leading-relaxed">
                <p>{ format( t.note , verticalAlignments.length , horizontalAlignments.length ) }</p>
            </div>

        </Container>
    ) ;
} ;

ToastOverModalDemo.displayName = 'ToastOverModalDemo' ;

export default ToastOverModalDemo ;
