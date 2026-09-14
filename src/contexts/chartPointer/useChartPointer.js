'use client' ;

import { useContext } from 'react' ;

import ChartPointerContext from './context' ;

/**
 * The ref holding the last pointer position over the surrounding chart.
 *
 * There is no `provider.js` beside this hook, and deliberately : the provider
 * is `ChartFrame` itself. Only the element that wraps the chart can watch the
 * pointer travel over it, so the tracking and the provision are the same act.
 *
 * @module contexts/chartPointer/useChartPointer
 *
 * @returns {React.RefObject<{ x : number , y : number }|null>|null} The ref, or `null` outside a chart.
 *
 * @example
 * ```js
 * const pointer = useChartPointer() ;
 *
 * // In a layout effect only — never during a render.
 * const at = pointer?.current ;
 * ```
 */
const useChartPointer = () => useContext( ChartPointerContext ) ;

export default useChartPointer ;
