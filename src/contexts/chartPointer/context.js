'use client' ;

import { createContext } from 'react' ;

/**
 * Where the pointer last was over a chart, so a tooltip can place itself.
 *
 * The value is a **ref**, not a position : following the pointer must not
 * re-render anything, and the only reader is a layout effect, which runs after
 * the render that carries it. A state here would re-render every chart on the
 * page at every mouse move, to tell a bubble something it can read for free.
 *
 * `null` outside a chart — a tooltip that finds nothing here stays where it was
 * rendered, which is what it did before this context existed.
 *
 * @module contexts/chartPointer/context
 *
 * @type {React.Context<React.RefObject<{ x : number , y : number }|null>|null>}
 */
const ChartPointerContext = createContext( null ) ;

ChartPointerContext.displayName = 'ChartPointerContext' ;

export default ChartPointerContext ;
