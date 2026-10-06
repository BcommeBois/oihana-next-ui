'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;
import InputDateRange , {
    DD_MM_YYYY ,
    MM_DD_YYYY ,
    YYYY_MM_DD ,
} from '@/components/inputs/InputDateRange' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * InputDateRange demo component.
 *
 * Two dates in one field : the three orders, a separator of your own, bounds on
 * the dates and on the duration, and the `{ start , end }` object handed back.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.dateRange'] - Dot notation path to the demo locale.
 */
const InputDateRangeDemo = ( { path = 'demo.inputs.dateRange' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ rangeFR , setRangeFR ] = useState( '' ) ;
    const [ rangeISO , setRangeISO ] = useState( '' ) ;
    const [ dateRange , setDateRange ] = useState( null ) ;

    const days = dateRange
        ? Math.ceil( ( dateRange.end - dateRange.start ) / ( 1000 * 60 * 60 * 24 ) )
        : 0 ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.french }</h3>

                <InputDateRange
                    label    = { t.booking?.label }
                    value    = { rangeFR }
                    onChange = { setRangeFR }
                    mode     = { DD_MM_YYYY }
                    helper   = { t.booking?.helper }
                />

                <InputDateRange
                    label          = { t.separator?.label }
                    mode           = { DD_MM_YYYY }
                    rangeSeparator = " to "
                    helper         = { t.separator?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.iso }</h3>

                <InputDateRange
                    label         = { t.iso?.label }
                    value         = { rangeISO }
                    onChange      = { setRangeISO }
                    mode          = { YYYY_MM_DD }
                    dateSeparator = "-"
                    helper        = { t.iso?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.us }</h3>

                <InputDateRange
                    label  = { t.us?.label }
                    mode   = { MM_DD_YYYY }
                    helper = { t.us?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.bounded }</h3>

                <InputDateRange
                    label  = { t.bounded?.label }
                    mode   = { DD_MM_YYYY }
                    min    = { new Date( '2024-01-01' ) }
                    max    = { new Date( '2024-12-31' ) }
                    helper = { t.bounded?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.length }</h3>

                <InputDateRange
                    label     = { t.shortStay?.label }
                    mode      = { DD_MM_YYYY }
                    minLength = {{ day : 1 }}
                    maxLength = {{ day : 7 }}
                    helper    = { t.shortStay?.helper }
                />

                <InputDateRange
                    label     = { t.monthly?.label }
                    mode      = { DD_MM_YYYY }
                    minLength = {{ month : 1 }}
                    maxLength = {{ month : 3 }}
                    helper    = { t.monthly?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.object }</h3>

                <InputDateRange
                    label       = { t.object?.label }
                    onDateRange = { setDateRange }
                    helper      = { dateRange
                        ? format( t.object?.typed ?? '' , dateRange.start.toLocaleDateString() , dateRange.end.toLocaleDateString() )
                        : t.object?.empty
                    }
                />

                { dateRange && (
                    <div className="text-sm bg-base-300 p-4 rounded-box">
                        <p><strong>{ t.object?.start }</strong> { dateRange.start.toISOString() }</p>
                        <p><strong>{ t.object?.end }</strong> { dateRange.end.toISOString() }</p>
                        <p><strong>{ t.object?.duration }</strong> { format( t.object?.days ?? '' , days ) }</p>
                    </div>
                ) }
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <InputDateRange
                    useFieldset
                    legend = { t.fieldset?.legend }
                    helper = { t.fieldset?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.error }</h3>

                <InputDateRange
                    label = { t.invalid?.label }
                    error = { t.invalid?.error }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.disabled }</h3>

                <InputDateRange
                    label        = { t.disabled?.label }
                    defaultValue = "01/01/2024 – 31/12/2024"
                    disabled
                />
            </div>

        </Container>
    ) ;
} ;

export default InputDateRangeDemo ;
