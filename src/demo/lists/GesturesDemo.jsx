'use client' ;

import { useCallback , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdCheck , MdDelete , MdUndo } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Badge   from '@/components/Badge' ;
import Button  from '@/components/Button' ;
import Divider from '@/components/Divider' ;

import List              from '@/components/lists/List' ;
import ListRow           from '@/components/lists/ListRow' ;
import PullToRefresh     from '@/components/lists/PullToRefresh' ;
import SwipeableListItem from '@/components/lists/SwipeableListItem' ;

import RefreshButton from '@/components/buttons/RefreshButton' ;

import useInfiniteScroll from '@/hooks/useInfiniteScroll' ;

import useI18n from '@/contexts/locale/useI18n' ;

const TASKS = [ 'oak' , 'batten' , 'panel' , 'screws' , 'glue' , 'varnish' ] ;

const PAGE = 12 ;

/**
 * The gestures of a list : a row swiped to act on, a list pulled to load again.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.lists.gestures'] - Dot notation path to the demo locale.
 */
const GesturesDemo = ( { path = 'demo.lists.gestures' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    // Swipe : tasks done or removed
    const [ tasks , setTasks ] = useState( () => TASKS.map( key => ( { done : false , key } ) ) ) ;
    const [ last  , setLast  ] = useState( null ) ;

    const done   = key => { setTasks( list => list.map( task => ( task.key === key ? { ...task , done : !task.done } : task ) ) ) ; setLast( format( t.swipe?.done ?? '{0}' , t.swipe?.tasks?.[ key ] ) ) ; } ;
    const remove = key => { setTasks( list => list.filter( task => task.key !== key ) ) ; setLast( format( t.swipe?.removed ?? '{0}' , t.swipe?.tasks?.[ key ] ) ) ; } ;
    const reset  = () => { setTasks( TASKS.map( key => ( { done : false , key } ) ) ) ; setLast( null ) ; } ;

    // Pull : a feed loaded again, and more at the bottom
    const [ items     , setItems     ] = useState( () => Array.from( { length : PAGE } , ( _ , index ) => index + 1 ) ) ;
    const [ refreshes , setRefreshes ] = useState( 0 ) ;
    const [ loading   , setLoading   ] = useState( false ) ;

    const refresh = useCallback( async () =>
    {
        await new Promise( resolve => setTimeout( resolve , 1500 ) ) ;
        setItems( Array.from( { length : PAGE } , ( _ , index ) => index + 1 ) ) ;
        setRefreshes( count => count + 1 ) ;
    }
    , [] ) ;

    const more = useCallback( () =>
    {
        setLoading( true ) ;
        setTimeout( () =>
        {
            setItems( list => [ ...list , ...Array.from( { length : PAGE } , ( _ , index ) => list.length + index + 1 ) ] ) ;
            setLoading( false ) ;
        } , 600 ) ;
    }
    , [] ) ;

    const { sentinelRef } = useInfiniteScroll( { hasMore : items.length < 60 , loading , onLoadMore : more } ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            {/* Swipe */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.swipe?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.swipe?.text }</p>

                <List className="max-w-xl divide-y divide-base-300 overflow-hidden rounded-box border border-base-300 bg-base-100">
                    { tasks.map( task => (
                        <SwipeableListItem
                            key      = { task.key }
                            leading  = { { color : 'success' , icon : MdCheck , label : task.done ? t.swipe?.undo : t.swipe?.check , onAction : () => done( task.key ) } }
                            trailing = { { color : 'error' , icon : MdDelete , label : t.swipe?.remove , onAction : () => remove( task.key ) } }
                        >
                            <ListRow
                                actions = {
                                    <>
                                        <Button icon={ task.done ? MdUndo : MdCheck } onClick={ () => done( task.key ) } shape="square" size="xs" style="ghost" title={ task.done ? t.swipe?.undo : t.swipe?.check } tooltip={ task.done ? t.swipe?.undo : t.swipe?.check } tooltipFloat />
                                        <Button icon={ MdDelete } onClick={ () => remove( task.key ) } shape="square" size="xs" style="ghost" title={ t.swipe?.remove } tooltip={ t.swipe?.remove } tooltipFloat />
                                    </>
                                }
                                as        = "div"
                                className = "rounded-none"
                                subtitle  = { task.done ? t.swipe?.doneState : t.swipe?.todoState }
                                title    = { t.swipe?.tasks?.[ task.key ] }
                                titleClassName = { task.done ? 'line-through opacity-60' : undefined }
                            />
                        </SwipeableListItem>
                    ) ) }
                </List>

                <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={ reset } size="sm" style="outline">{ t.swipe?.reset }</Button>
                    { last && <span className="text-xs text-base-content/60">{ last }</span> }
                </div>
                <p className="text-xs text-base-content/60">{ t.swipe?.help }</p>
            </section>

            <Divider />

            {/* Pull */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.pull?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.pull?.text }</p>

                <div className="flex flex-wrap items-center gap-3">
                    <RefreshButton onClick={ refresh } size="sm" />
                    <Badge style="ghost">{ format( t.pull?.count ?? '{0} / {1}' , items.length , refreshes ) }</Badge>
                </div>

                <PullToRefresh className="max-w-xl rounded-box border border-base-300 bg-base-100" onRefresh={ refresh }>
                    <div className="h-[50vh] overflow-y-auto">
                        <List className="divide-y divide-base-300">
                            { items.map( number => (
                                <ListRow as="div" key={ number } subtitle={ format( t.pull?.subtitle ?? '{0}' , refreshes ) } title={ format( t.pull?.item ?? '{0}' , number ) } />
                            ) ) }
                        </List>
                        <div className="flex justify-center p-3 text-xs text-base-content/60" ref={ sentinelRef }>
                            { loading ? <span className="loading loading-dots loading-sm" /> : items.length >= 60 ? t.pull?.end : null }
                        </div>
                    </div>
                </PullToRefresh>
                <p className="text-xs text-base-content/60">{ t.pull?.help }</p>
            </section>

        </Container>
    ) ;
} ;

export default GesturesDemo ;
