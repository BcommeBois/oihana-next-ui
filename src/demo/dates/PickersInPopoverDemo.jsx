'use client' ;

import { useState } from 'react' ;

import { MdDateRange as PeriodIcon } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import PopoverButton from '@/components/PopoverButton' ;

import InputDatePicker from '@/components/inputs/InputDatePicker' ;

/**
 * Two date pickers inside a Popover.
 *
 * A picker's calendar is itself a Popover, portalled to `document.body` : in
 * the DOM it sits beside the outer panel, not inside it. The outer Popover
 * still treats a click in it as a click from inside — the event comes up the
 * React tree through the portal — so picking a day keeps the panel open.
 *
 * Checklist :
 * 1. Open « Période », open a calendar, pick a day → the panel stays open,
 *    the field is filled.
 * 2. Click anywhere else in the page → the panel closes.
 */
const PickersInPopoverDemo = () =>
{
    const [ from , setFrom ] = useState( '' ) ;
    const [ to   , setTo   ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-4 sm:p-8 rounded-box" maxWidth="max-w-5xl">

            <h2 className="text-3xl font-bold">Pickers inside a Popover</h2>
            <p className="text-sm opacity-70 -mt-2">
                Le calendrier d'un sélecteur est rendu à part, dans la page, et pourtant un clic sur un jour ne ferme pas
                le panneau qui le contient : pour le Popover, ce clic vient de l'intérieur.
            </p>

            <div className="flex flex-wrap items-center gap-4">
                <PopoverButton
                    ariaLabel = "Période"
                    display   = "dropdown"
                    icon      = { PeriodIcon }
                    panel     = { () => (
                        <div className="flex w-72 flex-col gap-3">
                            <InputDatePicker label="Du" value={ from } onChange={ setFrom } />
                            <InputDatePicker label="Au" value={ to }   onChange={ setTo } />
                        </div>
                    ) }
                >
                    Période
                </PopoverButton>

                <p className="text-sm opacity-70">
                    Du <span className="font-mono">{ from || '—' }</span> au <span className="font-mono">{ to || '—' }</span>
                </p>
            </div>

        </Container>
    ) ;
} ;

export default PickersInPopoverDemo ;
