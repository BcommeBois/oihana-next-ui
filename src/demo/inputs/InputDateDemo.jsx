'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;
import InputDate from '@/components/inputs/InputDate' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * InputDate demo component.
 *
 * Every spelling of a typed date : the three field orders, the short formats,
 * bounds that rewrite a year onto them, and the `Date` object handed back.
 *
 * ⚠️ The `mode` and `separator` values are the component's API, not copy : what
 * is translated is the format SHOWN to a reader, which is spelled with the
 * letters of their own language.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.date'] - Dot notation path to the demo locale.
 */
const InputDateDemo = ( { path = 'demo.inputs.date' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ dateFR , setDateFR ] = useState( '' ) ;
    const [ dateUS , setDateUS ] = useState( '' ) ;
    const [ dateObject , setDateObject ] = useState( null ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.iso }</h3>

                <InputDate
                    iconClassName = "text-secondary"
                    label         = { t.iso?.label }
                    mode          = "yyyy/mm/dd"
                    separator     = "/"
                    min           = { new Date( 2020 , 0 , 1 ) }
                    max           = { new Date( 2030 , 11 , 31 ) }
                    helper        = { t.iso?.helper }
                />

                <InputDate
                    label     = { t.isoDash?.label }
                    mode      = "yyyy/mm/dd"
                    separator = "-"
                    helper    = { t.isoDash?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.french }</h3>

                <InputDate
                    label     = { t.birth?.label }
                    value     = { dateFR }
                    onChange  = { setDateFR }
                    mode      = "dd/mm/yyyy"
                    separator = "/"
                    helper    = { t.birth?.helper }
                />

                <InputDate
                    label     = { t.dot?.label }
                    mode      = "dd/mm/yyyy"
                    separator = "."
                    helper    = { t.dot?.helper }
                />

                <InputDate
                    label     = { t.dash?.label }
                    mode      = "dd/mm/yyyy"
                    separator = "-"
                    helper    = { t.dash?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.us }</h3>

                <InputDate
                    label     = { t.us?.label }
                    value     = { dateUS }
                    onChange  = { setDateUS }
                    mode      = "mm/dd/yyyy"
                    separator = "/"
                    helper    = { t.us?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.short }</h3>

                <InputDate
                    label     = { t.dayMonth?.label }
                    mode      = "dd/mm"
                    separator = "/"
                    helper    = { t.dayMonth?.helper }
                />

                <InputDate
                    label     = { t.monthYear?.label }
                    mode      = "mm/yyyy"
                    separator = "/"
                    helper    = { t.monthYear?.helper }
                />

                <InputDate
                    label     = { t.monthYear2?.label }
                    mode      = "mm/yy"
                    separator = "/"
                    helper    = { t.monthYear2?.helper }
                />

                <InputDate
                    label     = { t.yearMonth?.label }
                    mode      = "yyyy/mm"
                    separator = "-"
                    helper    = { t.yearMonth?.helper }
                />

                <InputDate
                    label  = { t.yearOnly?.label }
                    mode   = "yyyy"
                    helper = { t.yearOnly?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.bounded }</h3>

                <InputDate
                    label  = { t.bounded?.label }
                    mode   = "dd/mm/yyyy"
                    min    = { new Date( '2020-01-01' ) }
                    max    = { new Date( '2030-12-31' ) }
                    helper = { t.bounded?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.object }</h3>

                <InputDate
                    label  = { t.object?.label }
                    onDate = { setDateObject }
                    helper = { dateObject
                        ? format( t.object?.typed ?? '' , dateObject.toLocaleDateString() )
                        : t.object?.empty }
                />

                { dateObject && (
                    <div className="text-sm bg-base-300 p-4 rounded-box">
                        <p><strong>{ t.object?.iso }</strong> { dateObject.toISOString() }</p>
                        <p><strong>{ t.object?.locale }</strong> { dateObject.toLocaleDateString( 'fr-FR' ) }</p>
                        <p><strong>{ t.object?.us }</strong> { dateObject.toLocaleDateString( 'en-US' ) }</p>
                    </div>
                ) }
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <InputDate
                    useFieldset
                    legend = { t.fieldset?.legend }
                    helper = { t.fieldset?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.noIcon }</h3>

                <InputDate
                    label    = { t.plain?.label }
                    showIcon = { false }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.error }</h3>

                <InputDate
                    label = { t.invalid?.label }
                    error = { t.invalid?.error }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.disabled }</h3>

                <InputDate
                    label        = { t.plain?.label }
                    defaultValue = "25/12/2024"
                    disabled
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.readOnly }</h3>

                <InputDate
                    label        = { t.plain?.label }
                    defaultValue = "25/12/2024"
                    readOnly
                />
            </div>

        </Container>
    ) ;
} ;

export default InputDateDemo ;
