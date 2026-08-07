'use client' ;

import cn from '@/themes/helpers/cn' ;

/**
 * Demo-only readout of what a field actually holds.
 *
 * A demo that merely *renders* an input proves nothing about typing: a field that throws
 * every keystroke away looks exactly like one that keeps them. Printing the value the
 * component hands back — and its type — is what makes the difference visible.
 *
 * @param {Object} props
 * @param {string} [props.label='value'] - Name of the state slot being probed.
 * @param {*} [props.value] - The value to display.
 *
 * @example
 * <InputCurrency value={ price } onChange={ setPrice } />
 * <ValueProbe label="price" value={ price } />
 */
const ValueProbe = ({ label = 'value' , value }) =>
{
    const isEmpty = value === null || value === undefined || value === '' ;

    return (
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="opacity-60">{ label } =</span>
            <span className={ cn( 'badge badge-sm' , isEmpty ? 'badge-ghost' : 'badge-primary' ) }>
                { isEmpty ? '∅ empty' : JSON.stringify( value ) }
            </span>
            <span className="opacity-60">({ typeof value })</span>
        </div>
    ) ;
} ;

ValueProbe.displayName = 'ValueProbe' ;

export default ValueProbe ;
