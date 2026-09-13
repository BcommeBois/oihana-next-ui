'use client' ;

import { Children , cloneElement , isValidElement , useEffect , useState } from 'react' ;

import { useMedia } from 'react-use' ;

/**
 * Wrapper that staggers the entrance animation of its children.
 *
 * ### It adds no element of its own
 *
 * Each child is **cloned** and carries its own delay, rather than being wrapped
 * in a box that would carry it. The rendered DOM is the one that was written —
 * which is what lets this work inside a grid, a `subgrid`, a flex row or a
 * `<ul>`, where an intermediate `<div>` would become the grid item, break the
 * column inheritance, or simply be invalid markup.
 *
 * The price is that a child must be an **element able to take a `style`**. Text
 * and fragments are rendered untouched, with no animation : half of a compromise
 * is worse than none.
 *
 * `prefers-reduced-motion` is honoured by showing everything at once.
 *
 * @param {Object} props
 * @param {string} [props.as='div'] - HTML element tag name.
 * @param {React.ReactNode} props.children - Child components.
 * @param {string} [props.className] - CSS class name.
 * @param {number} [props.delay=0] - Milliseconds before the first child moves.
 * @param {number} [props.stagger=100] - Milliseconds between two children.
 * @param {number} [props.duration=400] - Milliseconds one child takes.
 * @param {number} [props.y=20] - Pixels a child rises from.
 *
 * @returns {React.ReactElement} Staggered container.
 *
 * @example
 * ```jsx
 * <StaggerList as="ul" className="flex flex-col gap-4">
 *     <li>Item 1</li>
 *     <li>Item 2</li>
 *     <li>Item 3</li>
 * </StaggerList>
 * ```
 *
 * @example
 * ```jsx
 * // Grid of cards — the cards are the grid items, nothing sits between
 * <StaggerList className="grid grid-cols-3 gap-6" stagger={ 150 }>
 *     { cards.map( card => <Card key={ card.id } { ...card } /> ) }
 * </StaggerList>
 * ```
 */
const StaggerList =
({
    as: Tag = 'div' ,
    children ,
    className ,
    delay    = 0 ,
    stagger  = 100 ,
    duration = 400 ,
    y        = 20 ,
    ...rest
}) =>
{
    const reduceMotion = useMedia( '(prefers-reduced-motion: reduce)' , false ) ;

    // Everything is in place but held back on the first render, then released —
    // which is what gives the transition something to transition from.
    const [ entered , setEntered ] = useState( false ) ;

    useEffect( () => { setEntered( true ) ; } , [] ) ;

    const animating = !reduceMotion ;

    return (
        <Tag className={ className } { ...rest }>
            {
                Children.map( children , ( child , index ) =>
                {
                    if ( !animating || !isValidElement( child ) )
                    {
                        return child ;
                    }

                    return cloneElement( child ,
                    {
                        style :
                        {
                            ...child.props.style ,
                            opacity         : entered ? 1 : 0 ,
                            transform       : entered ? 'none' : `translateY(${ y }px)` ,
                            transition      : `opacity ${ duration }ms ease-out, transform ${ duration }ms ease-out` ,
                            transitionDelay : `${ delay + index * stagger }ms` ,
                        } ,
                    } ) ;
                } )
            }
        </Tag>
    ) ;
} ;

export default StaggerList ;
