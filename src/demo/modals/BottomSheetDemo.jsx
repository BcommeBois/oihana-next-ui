'use client' ;

/**
 * The bottom sheet, and the one behaviour a screenshot cannot show : the
 * difference between a sheet that was ASKED for and one that merely appeared.
 *
 * The toggle drives `animate`, which is the prop a product sets to `false` when
 * the sheet showed up because the viewport crossed a breakpoint rather than
 * because a thumb asked. The rows are a generic menu on purpose — what a sheet
 * carries belongs to the product, and this one must not suggest otherwise.
 *
 * @module demo/modals/BottomSheetDemo
 *
 * @param {Object} [props]
 * @param {string} [props.path='demo.modals.bottomSheet'] - Dot notation path to the demo locale.
 */

import { useState } from 'react' ;

import { MdClose } from 'react-icons/md' ;

import Button     from '@/components/Button' ;
import BottomSheet from '@/components/modals/BottomSheet' ;
import Toggle     from '@/components/checkboxes/Toggle' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;

/** Shared row geometry — a touch target, not a menu line. */
const ROW = 'flex w-full items-center gap-3 rounded-box px-3 py-3 text-left text-sm transition-colors hover:bg-base-300/60' ;

const BottomSheetDemo = ( { path = 'demo.modals.bottomSheet' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ isOpen  , setOpen    ] = useState( false ) ;
    const [ animate , setAnimate ] = useState( true ) ;

    const rows = Array.isArray( t.rows ) ? t.rows : [] ;

    return (
        <Container maxWidth="max-w-4xl">
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body gap-4">

                    <h2 className="card-title">{ t.title }</h2>

                    <p className="text-sm text-base-content/70">{ t.description }</p>

                    <label className="flex items-center gap-3 text-sm">
                        <Toggle
                            checked  = { animate }
                            onChange = { () => setAnimate( value => !value ) }
                        />
                        { t.animate }
                    </label>

                    <p className="text-xs text-base-content/60">
                        { animate ? t.animateOn : t.animateOff }
                    </p>

                    <div>
                        <Button color="primary" onClick={ () => setOpen( true ) }>
                            { t.open }
                        </Button>
                    </div>

                    <p className="text-xs text-base-content/60 italic">{ t.hint }</p>

                </div>
            </div>

            { isOpen && (
                <BottomSheet
                    animate   = { animate }
                    ariaLabel = { t.sheetLabel }
                    onClose   = { () => setOpen( false ) }
                >

                    <div className="flex items-center gap-3 px-1 pb-2">
                        <span className="min-w-0 flex-1 truncate font-semibold">
                            { t.heading }
                        </span>
                        <button
                            aria-label = { t.close }
                            className  = "btn btn-ghost btn-sm btn-circle shrink-0"
                            onClick    = { () => setOpen( false ) }
                            type       = "button"
                        >
                            <MdClose className="size-5" />
                        </button>
                    </div>

                    { rows.map( row => (
                        <button className={ ROW } key={ row } type="button">
                            { row }
                        </button>
                    ) ) }

                </BottomSheet>
            ) }
        </Container>
    ) ;
} ;

BottomSheetDemo.displayName = 'BottomSheetDemo' ;

export default BottomSheetDemo ;
