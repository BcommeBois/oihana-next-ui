'use client' ;

/**
 * LinkCard — the card of one item in a list, which is a link when there is
 * somewhere to go.
 *
 * Two shapes, chosen by `display`, so one collection can be read three ways
 * without its items being written twice :
 *
 *  - **`flex`** — a row : a rectangular thumbnail on the left, full row height,
 *    the title and its trimmings on the right, actions at the far end ;
 *  - **`grid`, `masonry`, or nothing** — a card : the cover image on top, the
 *    body underneath, actions in `card-actions`.
 *
 * 🔑 **It takes an `href`, already resolved.** Turning a record into an address
 * is the application's business — its API, its routes, its identifiers — and a
 * card that went looking for one would drag all of it into the library. No
 * `href` means no link : the very same card is rendered as a `<div>`.
 *
 * ⚠️ **`navigable={ false }` is how a forbidden destination is said**, rather
 * than a callback returning nothing. A reader without the right to open a
 * record still sees it, without the pointer, the hover and the underlined
 * promise — and a caller that has to know whether the card links reads a
 * boolean instead of comparing a function to a sentinel.
 *
 * Slots, from the outside in : `top` (over the body, replacing the cover),
 * `left` (replacing the thumbnail), `before` and `after` around the title,
 * `right` for the actions, `cornerTopRight` pinned to the card's own corner —
 * scoped to the card, so it never floats over the page's own furniture.
 *
 * @module components/links/LinkCard
 *
 * @example
 * ```jsx
 * <LinkCard
 *     display  = "flex"
 *     href     = "/articles/42"
 *     imageUrl = { article.image }
 *     title    = { article.title }
 *     after    = { <span className="text-xs opacity-60">{ article.date }</span> }
 * />
 *
 * // Visible, but not to be opened
 * <LinkCard navigable={ false } title="Restricted" />
 * ```
 */

import Link from 'next/link' ;

import Picture from '../images/Picture' ;

import { FLEX } from '../layouts/Layout' ;

import SlideDown from '../../motions/SlideDown' ;

import cn from '../../themes/helpers/cn' ;

/**
 * @typedef {import('../layouts/Layout').LayoutDisplay} LayoutDisplay
 */

/**
 * What the browser is told to fetch for a row's thumbnail.
 * @type {string}
 */
export const FLEX_IMAGE_SIZES = '(max-width: 768px) 80px, (max-width: 1280px) 100px, 120px' ;

/**
 * What the browser is told to fetch for a card's cover.
 * @type {string}
 */
export const GRID_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw' ;

/**
 * @param {Object}            [props]
 * @param {string}            [props.accentColor]           - A thin band in an arbitrary colour : under the cover, or between the thumbnail and the body. Applied as an inline style — never a class built at runtime.
 * @param {React.ReactNode}   [props.after]                 - Inside the body, after the title.
 * @param {boolean}           [props.animated=true]         - Wraps the card in `MotionComponent`.
 * @param {React.ReactNode}   [props.before]                - Inside the body, before the title.
 * @param {string}            [props.bodyClassName]         - Class names for the card body.
 * @param {string}            [props.className]             - Class names for the card root.
 * @param {React.ReactNode}   [props.cornerTopRight]        - Pinned to the card's top-right corner, scoped to the card.
 * @param {string}            [props.coverClassName]        - Class names for the cover figure.
 * @param {boolean}           [props.coverGradient=false]   - Fades the bottom of the cover, for depth.
 * @param {string}            [props.defaultImageUrl]       - Used when `imageUrl` is empty.
 * @param {boolean}           [props.disabled]              - Greyed out and inert.
 * @param {string}            [props.disabledClassName='opacity-60'] - Class applied when disabled.
 * @param {LayoutDisplay}     [props.display]               - `flex` for a row, anything else for a card.
 * @param {string}            [props.href]                  - Where the card goes. Absent : no link.
 * @param {string}            [props.imageAlt]              - Alternative text ; the title by default.
 * @param {React.ReactNode}   [props.imageBottomLeft]       - Overlaid in the image's bottom-left corner.
 * @param {React.ReactNode}   [props.imageBottomRight]      - Overlaid in the image's bottom-right corner.
 * @param {string}            [props.imageSizes]            - `sizes` of the image ; a default per shape.
 * @param {React.ReactNode}   [props.imageTopLeft]          - Overlaid in the image's top-left corner.
 * @param {React.ReactNode}   [props.imageTopRight]         - Overlaid in the image's top-right corner.
 * @param {string}            [props.imageUrl]              - The thumbnail (`flex`) or the cover.
 * @param {boolean}           [props.lazyMount]             - Mounts the image only once it is near the viewport. Ignored with `priority`.
 * @param {React.ReactNode}   [props.left]                  - Replaces the automatic thumbnail.
 * @param {string}            [props.leftClassName]         - Class names for the thumbnail's container.
 * @param {React.ElementType} [props.MotionComponent]       - The motion wrapper ; `SlideDown` by default.
 * @param {Object}            [props.motionOptions]         - Props forwarded to the motion wrapper.
 * @param {boolean}           [props.navigable=true]        - `false` renders the card without its link, `href` or not.
 * @param {boolean}           [props.priority]              - Loads the image eagerly, for the largest paint.
 * @param {React.ReactNode}   [props.right]                 - The actions.
 * @param {string}            [props.rightClassName]        - Class names for the actions' container.
 * @param {React.ReactNode}   [props.title]                 - The title. A title, not a record to read one from.
 * @param {string}            [props.titleClassName]        - REPLACES the title's default `truncate`.
 * @param {string}            [props.titleExtraClassName]   - Appended to the title's classes, whatever `titleClassName` does.
 * @param {React.ReactNode}   [props.top]                   - Replaces the automatic cover.
 *
 * @returns {React.ReactElement}
 */
const LinkCard =
({
    accentColor ,
    after ,
    animated          = true ,
    before ,
    bodyClassName ,
    className ,
    cornerTopRight ,
    coverClassName ,
    coverGradient     = false ,
    defaultImageUrl ,
    disabled ,
    disabledClassName = 'opacity-60' ,
    display ,
    href ,
    imageAlt ,
    imageBottomLeft ,
    imageBottomRight ,
    imageSizes ,
    imageTopLeft ,
    imageTopRight ,
    imageUrl ,
    lazyMount ,
    left ,
    leftClassName ,
    MotionComponent   = SlideDown ,
    motionOptions ,
    navigable         = true ,
    priority ,
    right ,
    rightClassName ,
    title ,
    titleClassName ,
    titleExtraClassName ,
    top ,
} = {}) =>
{
    const uri = navigable && href ? href : null ;

    // -------- Image — a priority image is never deferred

    const resolvedLazyMount = priority ? false : lazyMount ;
    const resolvedLoading   = priority ? 'eager' : 'lazy' ;
    const hasImage          = !!( imageUrl || defaultImageUrl ) ;
    const resolvedImageAlt  = imageAlt ?? ( typeof title === 'string' ? title : '' ) ;

    // -------- Disabled

    const disabledClassNames = disabled && cn( disabledClassName , 'pointer-events-none' ) ;

    // -------- Title — `titleClassName` REPLACES the default truncation

    const titleClassNames = cn
    (
        'text-base font-medium transition-colors duration-200' ,
        titleClassName ?? 'truncate' ,
        uri && 'group-hover:text-primary' ,
        titleExtraClassName ,
    ) ;

    // -------- The row — a thumbnail on the left, the body on the right

    if ( display === FLEX )
    {
        // Rectangular and stretched to the row's height, narrow on a phone so
        // the body keeps room for the title, wider on a desktop. Skipped when
        // the caller fills the `left` slot itself.
        const thumbnail = !left && hasImage &&
        (
            <div className="relative h-full w-16 shrink-0 overflow-hidden sm:w-24">
                <Picture
                    alt            = { resolvedImageAlt }
                    bottomLeft     = { imageBottomLeft }
                    bottomRight    = { imageBottomRight }
                    fill           = { true }
                    imageClassName = "object-cover"
                    lazyMount      = { resolvedLazyMount }
                    loading        = { resolvedLoading }
                    priority       = { priority }
                    sizes          = { imageSizes ?? FLEX_IMAGE_SIZES }
                    src            = { imageUrl ?? defaultImageUrl }
                    topLeft        = { imageTopLeft }
                    topRight       = { imageTopRight }
                />
            </div>
        ) ;

        const cardClassNames = cn
        (
            'group card card-side relative bg-base-200 shadow-sm overflow-hidden' ,
            uri && 'cursor-pointer transition-[transform,box-shadow] duration-300 ease-out hover:bg-base-300 hover:shadow-md' ,
            disabledClassNames ,
            className ,
        ) ;

        const cardContent =
        (
            <>
                {/* Stretched, so the image fills the row's height without a gap */}
                { ( left || thumbnail ) &&
                    <div className={ cn( 'flex-none self-stretch' , leftClassName ) }>
                        { left ?? thumbnail }
                    </div>
                }

                { accentColor && ( left || thumbnail ) &&
                    <div
                        aria-hidden = "true"
                        className   = "w-1 shrink-0 self-stretch"
                        style       = { { backgroundColor : accentColor } }
                    />
                }

                <div className={ cn( 'card-body min-w-0 gap-0.5 p-3!' , bodyClassName ) }>

                    { before }

                    <span className={ titleClassNames }>{ title }</span>

                    { after }

                </div>

                { right &&
                    <div className={ cn( 'flex shrink-0 items-center pr-3' , rightClassName ) }>
                        { right }
                    </div>
                }

                { cornerTopRight &&
                    <div className="absolute right-2 top-2 flex">{ cornerTopRight }</div>
                }
            </>
        ) ;

        const element = uri
            ? <Link className={ cardClassNames } href={ uri }>{ cardContent }</Link>
            : <div className={ cardClassNames }>{ cardContent }</div> ;

        return animated && MotionComponent
            ? <MotionComponent { ...motionOptions }>{ element }</MotionComponent>
            : element ;
    }

    // -------- The card — a cover on top, the body underneath

    const coverImage = !top && hasImage &&
    (
        <figure className={ cn( 'relative h-40 w-full overflow-hidden' , coverClassName ) }>
            <Picture
                alt            = { resolvedImageAlt }
                bottomLeft     = { imageBottomLeft }
                bottomRight    = { imageBottomRight }
                fill           = { true }
                imageClassName = "object-cover"
                lazyMount      = { resolvedLazyMount }
                loading        = { resolvedLoading }
                priority       = { priority }
                sizes          = { imageSizes ?? GRID_IMAGE_SIZES }
                src            = { imageUrl ?? defaultImageUrl }
                topLeft        = { imageTopLeft }
                topRight       = { imageTopRight }
            />

            { coverGradient &&
                <span
                    aria-hidden = "true"
                    className   = "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/15 to-transparent"
                />
            }

            { accentColor &&
                <span
                    aria-hidden = "true"
                    className   = "pointer-events-none absolute inset-x-0 bottom-0 h-1"
                    style       = { { backgroundColor : accentColor } }
                />
            }
        </figure>
    ) ;

    const cardClassNames = cn
    (
        'group card relative bg-base-200 shadow-sm' ,
        left && 'card-side' ,
        uri && 'cursor-pointer transition-[transform,box-shadow] duration-500 ease-out hover:shadow-lg hover:-translate-y-0.5' ,
        ( hasImage || top ) && 'overflow-hidden' ,
        disabledClassNames ,
        className ,
    ) ;

    const cardContent =
    (
        <>
            { top ?? coverImage }

            {/* A figure on the left is what turns the card sideways */}
            { left &&
                <figure className={ cn( 'flex-none' , leftClassName ) }>
                    { left }
                </figure>
            }

            <div className={ cn( 'card-body gap-1' , bodyClassName ) }>

                { before }

                <span className={ titleClassNames }>{ title }</span>

                { after }

                { right &&
                    <div className={ cn( 'card-actions justify-end' , rightClassName ) }>
                        { right }
                    </div>
                }

            </div>

            { cornerTopRight &&
                <div className="absolute right-2 top-2 flex">{ cornerTopRight }</div>
            }
        </>
    ) ;

    const element = uri
        ? <Link className={ cardClassNames } href={ uri }>{ cardContent }</Link>
        : <div className={ cardClassNames }>{ cardContent }</div> ;

    return animated && MotionComponent
        ? <MotionComponent { ...motionOptions }>{ element }</MotionComponent>
        : element ;
} ;

LinkCard.displayName = 'LinkCard' ;

export default LinkCard ;
