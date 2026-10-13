'use client' ;

import { useRef , useState } from 'react' ;
import { MdAdd } from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Button       from '@/components/Button' ;
import RemoveButton from '@/components/buttons/RemoveButton' ;
import Input        from '@/components/inputs/Input' ;
import InputCounter from '@/components/inputs/InputCounter' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * Buttons inside a form : every one of them does its own job, and only the
 * `type="submit"` one sends the form — the send count proves it.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.buttons.form'] - Dot notation path to the demo locale.
 */
const ButtonFormDemo = ( { path = 'demo.buttons.form' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ lines , setLines ] = useState( [ 1 ] ) ;
    const [ count , setCount ] = useState( 0 ) ;
    const [ sent  , setSent  ] = useState( null ) ;

    const next = useRef( 2 ) ;

    const addLine = () =>
    {
        setLines( current => [ ...current , next.current++ ] ) ;
    } ;

    const removeLine = id => () =>
    {
        setLines( current => current.filter( line => line !== id ) ) ;
    } ;

    const onSubmit = event =>
    {
        event.preventDefault() ;
        const data = new FormData( event.currentTarget ) ;
        setCount( value => value + 1 ) ;
        setSent( { reference : data.get( 'reference' ) , quantity : data.get( 'quantity' ) , lines : data.getAll( 'line' ) } ) ;
    } ;

    return (
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body gap-3">
                <h2 className="card-title">{ t.title }</h2>
                <p className="text-sm text-base-content/70">{ t.note }</p>

                <form className="flex max-w-xl flex-col gap-4" onSubmit={ onSubmit }>
                    <div className="flex flex-wrap gap-4">
                        <Input defaultValue={ t.referenceValue } label={ t.reference } name="reference" />
                        <InputCounter defaultValue={ 1 } label={ t.quantity } max={ 99 } min={ 1 } name="quantity" />
                    </div>

                    { lines.map( ( id , index ) => (
                        <div className="flex items-end gap-2" key={ id }>
                            <Input className="flex-1" label={ format( t.line ?? '' , index + 1 ) } name="line" />
                            <RemoveButton
                                onClick = { removeLine( id ) }
                                size    = "sm"
                                title   = { format( t.remove ?? '' , index + 1 ) }
                            />
                        </div>
                    ) ) }

                    <div className="flex flex-wrap items-center gap-3">
                        <Button icon={ MdAdd } onClick={ addLine } style="outline">{ t.add }</Button>
                        <Button color="primary" type="submit">{ t.submit }</Button>
                        <span className="text-sm tabular-nums text-base-content/70">{ format( t.count ?? '' , count ) }</span>
                    </div>
                </form>

                { sent && (
                    <pre className="rounded-box bg-base-100 p-3 text-xs">
                        { t.sent } : { JSON.stringify( sent ) }
                    </pre>
                ) }
            </div>
        </div>
    ) ;
} ;

export default ButtonFormDemo ;
