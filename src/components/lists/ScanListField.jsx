'use client' ;

/**
 * ScanListField — a scan field and the list of what it read, together : the
 * inventory, the packing, the count — one camera, one field, the codes
 * piling up under it.
 *
 * `InputScan` with `clearOnScan`, and `ScanList` fed by its `onScan`. Every
 * prop of the list applies ; `inputProps` go to the field (`label`,
 * `placeholder`, `validate`, `formats`, `closeOnScan`…). `onScan` is still
 * called, after the list took the read, for the page to make its sound.
 *
 * @module components/lists/ScanListField
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {Object} [props.inputProps] - Props of the `InputScan`.
 * @param {Function} [props.onScan] - `( reading , status ) => void` after each read, `status` being `'added'`, `'counted'` or `'refused'`.
 * @param {React.Ref} [props.ref] - The list's handle : `add`, `clear`, `remove`.
 * @param {Object} [props.listProps] - Every other prop goes to {@link module:components/lists/ScanList}.
 *
 * @example
 * ```jsx
 * <ScanListField inputProps={ { label : 'Scan the parcels' } } onChange={ setLines } resolve={ code => names[ code ] } />
 * ```
 */

import { useImperativeHandle , useRef } from 'react' ;

import InputScan from '../inputs/InputScan' ;

import ScanList from './ScanList' ;

import cn from '../../themes/helpers/cn' ;

const ScanListField = ( { className , inputProps , onScan , ref , ...listProps } ) =>
{
    const list = useRef( null ) ;

    useImperativeHandle( ref , () => list.current , [] ) ;

    return (
        <div className={ cn( 'flex flex-col gap-3' , className ) }>
            <InputScan
                clearOnScan
                { ...inputProps }
                onScan = { reading =>
                {
                    const status = list.current?.add( reading ) ;
                    onScan?.( reading , status ) ;
                    inputProps?.onScan?.( reading ) ;
                } }
            />
            <ScanList ref={ list } { ...listProps } />
        </div>
    ) ;
} ;

ScanListField.displayName = 'ScanListField' ;

export default ScanListField ;
