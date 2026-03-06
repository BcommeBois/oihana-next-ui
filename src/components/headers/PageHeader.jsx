'use client' ;

/**
 * Generic header component with avatar/icon, title, subtitle and action slots.
 *
 * Replaces the old PageHeader + LabelElement pattern with direct
 * Typography + optional MotionComponent wrapping.
 * No useMemo needed — React Compiler handles memoization.
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

import Avatar     from '../avatars/Avatar' ;
import Divider    from '../Divider' ;
import Typography from '../typography/Typography' ;
import cn         from '../../themes/helpers/cn' ;

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
 * @param {React.ElementType} [props.icon]                      - Icon component (e.g. react-icons). Renders inside Avatar.
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
        ? <Icon className={ cn( 'size-5' , iconClassName ) } />
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
            className = { cn( 'text-primary leading-tight' , titleClassName ) }
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

    // -------- Guard — nothing to render

    if ( !avatarElement && !left && !titleElement && !subtitleElement && !descriptionElement && !right )
    {
        return null ;
    }

    // -------- Render

    return (
        <>
            <div className={ cn( 'navbar gap-3 px-0' , className ) }>

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
                    <div className={ cn( 'flex-none flex flex-row items-center gap-4' , rightClassName ) }>
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