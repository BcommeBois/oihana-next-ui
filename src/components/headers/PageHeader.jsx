'use client' ;

/**
 * Generic header component with avatar/icon, title, subtitle and action slots.
 *
 * Replaces the old PageHeader + LabelElement pattern with direct
 * Typography + optional MotionComponent wrapping.
 * No useMemo needed — React Compiler handles memoization.
 *
 * `icon` takes a component **or an already-rendered element**. The second form
 * is what a Server Component needs : a component type cannot cross the
 * server → client boundary, an element can — so the icon is rendered on the
 * server and handed over as a node.
 *
 * 🚨 **`stackBelow` puts the right zone on its own line on a narrow screen.**
 * One row of three zones does not fold by itself : the title column is
 * `min-w-0`, so its min-content width is zero and it keeps shrinking instead of
 * pushing the actions down — the title folds into four lines with a button
 * floating in the middle of it. The right zone is given a full line's width
 * below the breakpoint, which is what makes the row wrap.
 *
 * @module components/headers/PageHeader
 *
 * @example
 * ```jsx
 * import { AiFillProduct } from 'react-icons/ai' ;
 *
 * // With icon + title + options
 * <PageHeader
 *     icon        = { AiFillProduct }
 *     title       = "Produits"
 *     subtitle    = "48 résultats"
 *     right       = { <RefreshButton /> }
 *     showDivider = { true }
 * />
 *
 * // With custom avatar content
 * <PageHeader
 *     avatar      = { <Image src="/logo.png" alt="logo" fill /> }
 *     title       = "Dashboard"
 * />
 *
 * // Minimal — title only
 * <PageHeader title="Section" />
 * ```
 */

import { isValidElement } from 'react' ;

import Avatar     from '../avatars/Avatar' ;
import Divider    from '../Divider' ;
import Typography from '../typography/Typography' ;
import cn         from '../../themes/helpers/cn' ;

/**
 * What the row and its right zone are given below each breakpoint : the row is
 * allowed to wrap, and the actions are given a full line's width — which is
 * what pushes them onto a line of their own.
 *
 * ⚠️ **Below the breakpoint only.** Left to wrap at every width, the row would
 * send the actions down as soon as a description is long, on the widest screen
 * — a layout that moves for a reason the reader cannot see.
 *
 * ⚠️ Whole class names, never built at runtime — Tailwind reads the source.
 *
 * @type {Object.<string, { root : string , right : string }>}
 */
export const PAGE_HEADER_STACK_CLASSES =
{
    sm    : { root : 'max-sm:flex-wrap'    , right : 'max-sm:w-full max-sm:justify-end'   } ,
    md    : { root : 'max-md:flex-wrap'    , right : 'max-md:w-full max-md:justify-end'   } ,
    lg    : { root : 'max-lg:flex-wrap'    , right : 'max-lg:w-full max-lg:justify-end'   } ,
    xl    : { root : 'max-xl:flex-wrap'    , right : 'max-xl:w-full max-xl:justify-end'   } ,
    '2xl' : { root : 'max-2xl:flex-wrap'   , right : 'max-2xl:w-full max-2xl:justify-end' } ,
} ;

/**
 * @param {Object}            [props]
 * @param {boolean}           [props.animated=true]             - Wraps title/subtitle with MotionComponent if provided.
 * @param {React.ReactNode}   [props.avatar]                    - Custom avatar content (image, initials…).
 *                                                                 Ignored when icon is provided.
 * @param {string}            [props.avatarClassName]           - Class names for the Avatar wrapper.
 * @param {string}            [props.avatarInnerClassName]      - Class names for the Avatar inner div.
 * @param {boolean}           [props.avatarPlaceholder=true]    - Enables DaisyUI avatar-placeholder.
 * @param {string}            [props.className]                 - Additional class names for the navbar root.
 * @param {string}            [props.containerClassName]        - Class names for the title/subtitle column.
 * @param {string}            [props.description]               - Optional description below subtitle.
 * @param {string}            [props.descriptionClassName]      - Class names for the description.
 * @param {string}            [props.dividerClassName]          - Class names for the Divider.
 * @param {React.ElementType|React.ReactNode} [props.icon]       - Icon component (e.g. react-icons), or an already-rendered element — what a Server Component can pass. Renders inside Avatar.
 * @param {string}            [props.iconClassName]             - Class names for the icon element.
 * @param {React.ReactNode}   [props.left]                      - Extra content next to the avatar (left zone).
 * @param {string}            [props.leftClassName]             - Class names for the left zone.
 * @param {React.ElementType} [props.MotionComponent]           - Motion wrapper applied to title and subtitle.
 * @param {Object}            [props.motionOptions]             - Props forwarded to MotionComponent.
 * @param {React.ReactNode}   [props.right]                     - Right slot (buttons, badges…).
 * @param {string}            [props.rightClassName]            - Class names for the right zone.
 * @param {boolean}           [props.showAvatar=true]           - Shows the avatar/icon zone.
 * @param {boolean}           [props.showDivider=false]         - Shows a Divider below the header.
 * @param {boolean}           [props.showSubtitle=true]         - Shows the subtitle.
 * @param {boolean}           [props.showTitle=true]            - Shows the title.
 * @param {'sm'|'md'|'lg'|'xl'|'2xl'|false} [props.stackBelow='sm'] - Breakpoint below which the right zone takes its own line. `false` keeps everything on one row.
 * @param {string}            [props.subtitle]                  - Subtitle below the title.
 * @param {string}            [props.subtitleClassName]         - Class names for the subtitle.
 * @param {Object}            [props.subtitleMotionOptions]     - Motion options specific to subtitle.
 * @param {string}            [props.title]                     - Main heading text.
 * @param {string}            [props.titleClassName]            - Class names for the title.
 * @param {Object}            [props.titleMotionOptions]        - Motion options specific to title.
 *
 * @returns {React.ReactElement|null}
 */
const PageHeader =
({
    animated               = true ,
    avatar ,
    avatarClassName ,
    avatarInnerClassName ,
    avatarPlaceholder      = true ,
    className ,
    containerClassName ,
    description ,
    descriptionClassName ,
    dividerClassName ,
    icon : Icon ,
    iconClassName ,
    left ,
    leftClassName ,
    MotionComponent ,
    motionOptions ,
    right ,
    rightClassName ,
    showAvatar             = true ,
    showDivider            = false ,
    showSubtitle           = true ,
    showTitle              = true ,
    stackBelow             = 'sm' ,
    subtitle ,
    subtitleClassName ,
    subtitleMotionOptions ,
    title ,
    titleClassName ,
    titleMotionOptions ,
}) =>
{
    // -------- Avatar / icon

    const hasAvatar = showAvatar && ( Icon || avatar ) ;

    const avatarContent = Icon
        ? ( isValidElement( Icon ) ? Icon : <Icon className={ cn( 'size-5' , iconClassName ) } /> )
        : avatar ;

    const avatarElement = hasAvatar &&
    (
        <Avatar
            className      = { cn( 'size-12 shrink-0 bg-base-200 rounded' , avatarClassName ) }
            innerClassName = { cn( 'flex items-center justify-center w-full h-full' , avatarInnerClassName ) }
            placeholder    = { avatarPlaceholder }
        >
            { avatarContent }
        </Avatar>
    ) ;

    // -------- Title

    const titleContent = showTitle && title &&
    (
        <Typography
            as        = "h1"
            className = { cn( 'leading-tight' , titleClassName ) }
            size      = "xl"
            weight    = "semibold"
        >
            { title }
        </Typography>
    ) ;

    const titleElement = titleContent && animated && MotionComponent
        ? <MotionComponent { ...motionOptions } { ...titleMotionOptions }>{ titleContent }</MotionComponent>
        : titleContent ;

    // -------- Subtitle

    const subtitleContent = showSubtitle && subtitle &&
    (
        <Typography
            as        = "p"
            className = { cn( 'text-sm text-base-content/60' , subtitleClassName ) }
        >
            { subtitle }
        </Typography>
    ) ;

    const subtitleElement = subtitleContent && animated && MotionComponent
        ? <MotionComponent { ...motionOptions } { ...subtitleMotionOptions }>{ subtitleContent }</MotionComponent>
        : subtitleContent ;

    // -------- Description

    const descriptionElement = description &&
    (
        <Typography
            as        = "p"
            className = { cn( 'text-sm text-base-content/70' , descriptionClassName ) }
        >
            { description }
        </Typography>
    ) ;

    // -------- Stacking — the right zone on its own line, below the breakpoint

    const stack = PAGE_HEADER_STACK_CLASSES[ stackBelow ] ;

    // -------- Guard — nothing to render

    if ( !avatarElement && !left && !titleElement && !subtitleElement && !descriptionElement && !right )
    {
        return null ;
    }

    // -------- Render

    return (
        <>
            <div className={ cn( 'navbar gap-3 px-0' , stack?.root , className ) }>

                {/* Left zone — avatar + optional extra content */}
                { ( avatarElement || left ) &&
                    <div className={ cn( 'flex-none flex flex-row items-center gap-4' , leftClassName ) }>
                        { avatarElement }
                        { left }
                    </div>
                }

                {/* Center — title + subtitle + description */}
                { ( titleElement || subtitleElement || descriptionElement ) &&
                    <div className={ cn( 'flex flex-col grow items-start min-w-0' , containerClassName ) }>
                        { titleElement }
                        { subtitleElement }
                        { descriptionElement }
                    </div>
                }

                {/* Right — actions, buttons, badges */}
                { right &&
                    <div className={ cn( 'flex-none flex flex-row items-center gap-4' , stack?.right , rightClassName ) }>
                        { right }
                    </div>
                }

            </div>

            { showDivider &&
                <Divider className={ cn( 'my-0' , dividerClassName ) } />
            }
        </>
    ) ;
} ;

PageHeader.displayName = 'PageHeader' ;

export default PageHeader ;