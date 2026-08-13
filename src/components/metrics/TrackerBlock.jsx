'use client' ;

import { getTrackerBlock } from '../../themes/components/tracker' ;

import Tooltip from '../Tooltip' ;

/**
 * One cell of a {@link module:components/metrics/Tracker} : a coloured block standing for
 * a single observation — one day of uptime, one build, one run.
 *
 * The tooltip is the DaisyUI one, which is pure CSS : an attribute on the block, no state
 * and no portal. That is what lets a track carry ninety of them without ninety React
 * components watching their own hover.
 *
 * @module components/metrics/TrackerBlock
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional classes on the block.
 * @param {boolean} [props.hoverEffect=false] - Fade the block on hover.
 * @param {string} [props.label] - Text alternative. Defaults to the tooltip.
 * @param {string} [props.status] - Block colour : a DaisyUI token, or any CSS colour.
 * @param {string} [props.tooltip] - Text shown on hover.
 */
const TrackerBlock =
({
    className ,
    hoverEffect = false ,
    label ,
    status ,
    tooltip ,
    ...rest
}) =>
{
    const { className : blockClassName , style } = getTrackerBlock({ className , hoverEffect , status }) ;

    // `Tooltip` renders its children and nothing else when disabled, and a block has no
    // children — so the two cases are separate elements rather than one `show` prop.
    if ( tooltip )
    {
        return (
            <Tooltip
                aria-label = { label ?? tooltip }
                as         = "li"
                className  = { blockClassName }
                style      = { style }
                tip        = { tooltip }
                { ...rest }
            />
        ) ;
    }

    return <li aria-label={ label } className={ blockClassName } style={ style } { ...rest } /> ;
} ;

TrackerBlock.displayName = 'TrackerBlock' ;

export default TrackerBlock ;
