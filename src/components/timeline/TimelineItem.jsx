'use client' ;

/**
 * TimelineItem — one moment on a `Timeline` : an icon on the line, a time
 * on one side, a title and a description on the other.
 *
 * The line before the icon takes the entry's colour when the entry is
 * `done` or `current`, and stays grey for `todo` : an order's history reads
 * « shipped, out for delivery, delivered » from the colour alone — and from
 * the words, for a reader, through the bundle. `current` is announced as
 * `aria-current="step"`.
 *
 * @module components/timeline/TimelineItem
 *
 * @param {Object} props
 * @param {boolean} [props.box=true] - The text in a `timeline-box` card ; `false` for bare text.
 * @param {React.ReactNode} [props.children] - Replaces title and description.
 * @param {string} [props.className] - Classes on the `li`.
 * @param {import('../../themes/components/timeline').TimelineColor} [props.color='primary'] - The line's and icon's colour when done or current.
 * @param {React.ReactNode} [props.description]
 * @param {React.ReactNode} [props.end] - What goes after the line, replacing the title side when `side` puts the time there.
 * @param {boolean} [props.first=false] - No line before the icon. Set by `Timeline`.
 * @param {string} [props.href] - The title becomes a link.
 * @param {React.ElementType} [props.icon] - Defaults to a check when done, a dot otherwise.
 * @param {boolean} [props.last=false] - No line after the icon. Set by `Timeline`.
 * @param {Function} [props.onClick] - The title becomes a button.
 * @param {'start'|'end'} [props.side='end'] - The side the title and description go ; the time goes on the other.
 * @param {boolean} [props.stacked=false] - Compact layout : the time goes inside the entry, above the title, since both sides stack on one. Set by `Timeline`.
 * @param {React.ReactNode} [props.start] - What goes before the line, replacing the time.
 * @param {import('../../themes/components/timeline').TimelineStatus} [props.status='todo']
 * @param {React.ReactNode} [props.time] - Shown on the side opposite the title. A string or `Date` is formatted by `Timeline` beforehand.
 * @param {string} [props.timeValue] - The ISO value of the `<time>` element, when `time` is a formatted node.
 * @param {React.ReactNode} [props.title]
 * @param {Object} [props.labels] - The status words, from `Timeline`.
 */

import { MdCheckCircle , MdCircle } from 'react-icons/md' ;

import Button from '../Button' ;
import Link   from '../links/Link' ;

import { ICON_COLORS , LINE_COLORS , RING_COLORS , TIMELINE_BOX , TIMELINE_END , TIMELINE_MIDDLE , TIMELINE_START } from '../../themes/components/timeline' ;

import cn from '../../themes/helpers/cn' ;

const TimelineItem =
({
    box = true ,
    children ,
    className ,
    color = 'primary' ,
    description ,
    end ,
    first = false ,
    href ,
    icon ,
    labels = {} ,
    last = false ,
    onClick ,
    side = 'end' ,
    stacked = false ,
    start ,
    status = 'todo' ,
    time ,
    timeValue ,
    title ,
}) =>
{
    const active = status === 'done' || status === 'current' ;
    const Icon   = icon ?? ( status === 'done' ? MdCheckCircle : MdCircle ) ;

    const heading = href
        ? <Link className="link link-hover font-medium" href={ href }>{ title }</Link>
        : onClick
            ? <Button className="h-auto min-h-0 p-0 font-medium" onClick={ onClick } size="sm" style="link">{ title }</Button>
            : <span className="font-medium">{ title }</span> ;

    const text = children ?? (
        <>
            { title && <div>{ heading }</div> }
            { description && <div className="text-base-content/70">{ description }</div> }
        </>
    ) ;

    const clock = time !== undefined && time !== null
        ? <time className="block text-xs text-base-content/60" dateTime={ timeValue }>{ time }</time>
        : null ;

    // Stacked, the time sits inside the entry ; apart, it is a block of its own with the air a card has.
    const content = (
        <div className={ cn( box ? TIMELINE_BOX : 'px-2 py-1' ) }>
            { stacked && clock && <div className="mb-1">{ clock }</div> }
            { text }
        </div>
    ) ;

    const aside = clock ? <div className="px-2 py-1">{ clock }</div> : null ;

    const before = start ?? ( stacked ? null : side === 'end' ? aside : content ) ;
    const after  = end   ?? ( stacked ? content : side === 'end' ? content : aside ) ;

    return (
        <li aria-current={ status === 'current' ? 'step' : undefined } className={ className }>
            { !first && <hr className={ active ? LINE_COLORS[ color ] : undefined } /> }

            { before && <div className={ TIMELINE_START }>{ before }</div> }

            {/* The lines come after the icon in the DOM and would paint over its ring : the icon sits above them. */}
            <div className={ cn( TIMELINE_MIDDLE , 'relative z-10' ) }>
                <Icon
                    aria-hidden = "true"
                    className   = { cn( 'size-5 rounded-full' , active ? ICON_COLORS[ color ] : 'text-base-300' , status === 'current' && cn( 'ring-2 ring-offset-2 ring-offset-base-100' , RING_COLORS[ color ] ) ) }
                />
                { labels[ status ] && <span className="sr-only">{ labels[ status ] }</span> }
            </div>

            { after && <div className={ TIMELINE_END }>{ after }</div> }

            { !last && <hr className={ status === 'done' ? LINE_COLORS[ color ] : undefined } /> }
        </li>
    ) ;
} ;

TimelineItem.displayName = 'TimelineItem' ;

export default TimelineItem ;
