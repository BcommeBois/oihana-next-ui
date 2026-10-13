'use client' ;

/**
 * ScanList — what was scanned : the codes read, newest first, a code read
 * again counting one more on its line rather than adding one.
 *
 * Each line shows the code, the name `resolve` gives it (the article behind
 * a GTIN — the application's business, not the list's), its count, and the
 * ways to take one off or the line out : a swipe to the left, and the
 * buttons. A line just read is lit for a moment. The value is the lines,
 * `[ { code , count , at , reading } ]` ; `add( reading )` on the `ref` is
 * what a scan field calls, `ScanListField` being that field and this list
 * together.
 *
 * Generic on purpose : no article, no lot, no quantity ; `max` lines, and
 * `allowDuplicates` for a run where every read is a line of its own. The
 * list makes no sound : the page's `useFeedbackSignal` does, as it does
 * for a scan.
 *
 * @module components/lists/ScanList
 *
 * @param {Object} props
 * @param {boolean} [props.allowDuplicates=false] - A known code makes a new line rather than a count.
 * @param {string} [props.className]
 * @param {import('../../helpers/scan/addScan').ScanLine[]} [props.defaultValue=[]]
 * @param {React.ReactNode} [props.empty] - Shown with no line. Defaults to the bundle's words.
 * @param {number} [props.max] - Lines the list may hold ; a read past it is refused.
 * @param {string} [props.name] - Sends the lines as JSON with a form.
 * @param {Function} [props.onAdd] - `( line , status ) => void` after a read : `'added'` or `'counted'`.
 * @param {Function} [props.onChange] - `( lines ) => void`.
 * @param {Function} [props.onReject] - `( code ) => void` for a read refused.
 * @param {string} [props.path='components.scanList'] - i18n path the words are read from.
 * @param {React.Ref} [props.ref] - A handle : `add( codeOrReading )`, `clear()`, `remove( code )`.
 * @param {Function} [props.resolve] - `( code , reading ) => { label , subtitle } | string | null` : what a code is.
 * @param {import('../../helpers/scan/addScan').ScanLine[]} [props.value]
 *
 * @example
 * ```jsx
 * const list = useRef( null ) ;
 *
 * <InputScan clearOnScan onScan={ reading => list.current.add( reading ) } />
 * <ScanList ref={ list } resolve={ code => products[ code ]?.name } />
 * ```
 */

import { useCallback , useEffect , useImperativeHandle , useRef , useState } from 'react' ;

import { MdDelete , MdRemove } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Button from '../Button' ;

import List              from './List' ;
import ListRow           from './ListRow' ;
import SwipeableListItem from './SwipeableListItem' ;

import useValue from '../../hooks/useValue' ;

import addScan , { decrementScan , removeScan } from '../../helpers/scan/addScan' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import cn from '../../themes/helpers/cn' ;

const ScanList =
({
    allowDuplicates = false ,
    className ,
    defaultValue = [] ,
    empty ,
    max ,
    name ,
    onAdd ,
    onChange ,
    onReject ,
    path = 'components.scanList' ,
    ref ,
    resolve ,
    value : valueFromProps ,
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const [ lines , setLines ] = useValue( defaultValue , valueFromProps , onChange ) ;

    const [ lit , setLit ] = useState( null ) ;

    const latest = useRef( lines ) ;

    useEffect( () => { latest.current = lines ; } ) ;

    // The line just read stays lit for a moment.
    useEffect( () =>
    {
        if ( lit === null )
        {
            return undefined ;
        }

        const timer = setTimeout( () => setLit( null ) , 900 ) ;

        return () => clearTimeout( timer ) ;
    }
    , [ lit ] ) ;

    const add = useCallback( input =>
    {
        const reading = typeof input === 'object' && input !== null ? input : undefined ;
        const code    = reading ? ( reading.code ?? reading.value ?? reading.rawValue ?? '' ) : input ;

        const { line , list , status } = addScan( latest.current ?? [] , code , { allowDuplicates , max , reading } ) ;

        if ( status === 'refused' )
        {
            onReject?.( String( code ?? '' ) ) ;
            return status ;
        }

        setLines( list ) ;
        setLit( `${ line.code }:${ line.at }` ) ;
        onAdd?.( line , status ) ;

        return status ;
    }
    , [ allowDuplicates , max , onAdd , onReject , setLines ] ) ;

    const remove    = useCallback( code => setLines( removeScan( latest.current , code ) ) , [ setLines ] ) ;
    const decrement = useCallback( code => setLines( decrementScan( latest.current , code ) ) , [ setLines ] ) ;
    const clear     = useCallback( () => setLines( [] ) , [ setLines ] ) ;

    useImperativeHandle( ref , () => ( { add , clear , remove } ) , [ add , clear , remove ] ) ;

    const describe = line =>
    {
        const found = resolve?.( line.code , line.reading ) ;

        if ( !found ) return { label : null , subtitle : null } ;
        if ( typeof found === 'string' ) return { label : found , subtitle : null } ;
        return { label : found.label ?? null , subtitle : found.subtitle ?? null } ;
    } ;

    const total = ( lines ?? [] ).reduce( ( sum , line ) => sum + line.count , 0 ) ;

    return (
        <div className={ cn( 'flex flex-col gap-2' , className ) }>
            { lines?.length > 0 && (
                <p className="text-xs text-base-content/60">{ format( labels.total ?? '{0} / {1}' , lines.length , total ) }</p>
            ) }

            { lines?.length > 0
                ? (
                    <List className="divide-y divide-base-300 overflow-hidden rounded-box border border-base-300 bg-base-100">
                        { lines.map( line =>
                        {
                            const { label , subtitle } = describe( line ) ;
                            const key  = allowDuplicates ? `${ line.code }:${ line.at }` : line.code ;
                            const glow = lit === `${ line.code }:${ line.at }` ;

                            return (
                                <SwipeableListItem
                                    key      = { key }
                                    trailing = { { color : 'error' , icon : MdDelete , label : labels.remove , onAction : () => remove( line.code ) } }
                                >
                                    <ListRow
                                        actions = {
                                            <>
                                                <span className={ cn( 'badge tabular-nums' , line.count > 1 ? 'badge-primary' : 'badge-ghost' ) }>{ line.count }</span>
                                                <Button icon={ MdRemove } onClick={ () => decrement( line.code ) } shape="square" size="xs" style="ghost" title={ labels.decrement } tooltip={ labels.decrement } tooltipFloat />
                                                <Button icon={ MdDelete } onClick={ () => remove( line.code ) } shape="square" size="xs" style="ghost" title={ labels.remove } tooltip={ labels.remove } tooltipFloat />
                                            </>
                                        }
                                        as        = "div"
                                        className = { cn( 'rounded-none transition-colors duration-500' , glow && 'bg-primary/10' ) }
                                        subtitle  = { subtitle ?? ( label ? line.code : undefined ) }
                                        title     = { label ?? line.code }
                                        titleClassName = { label ? undefined : 'font-mono' }
                                    />
                                </SwipeableListItem>
                            ) ;
                        } ) }
                    </List>
                )
                : <p className="text-sm text-base-content/60">{ empty ?? labels.empty }</p> }

            { name && <input name={ name } type="hidden" value={ JSON.stringify( lines ?? [] ) } /> }
        </div>
    ) ;
} ;

ScanList.displayName = 'ScanList' ;

export default ScanList ;
