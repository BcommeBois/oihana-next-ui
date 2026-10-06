'use client' ;

/**
 * The round avatar of a named thing : its picture, or its initials on a colour
 * it always gets.
 *
 * ### 🔑 Why the colour is derived and not stored
 *
 * The fill comes from the NAME, through `hashIndex`, so the same entity lands
 * on the same colour in a list, on its own page, and after a reload — a reader
 * recognises it before reading it. An array position would change with the
 * sort order, and `Math.random()` with every render.
 *
 * ### 🔑 One code path, not two
 *
 * `Picture` already answers « a source, or something in its place » : it is
 * given the initials as its `fallback`, so a missing picture is not a branch
 * here. Gathered from an application whose own version switched on the picture
 * BEFORE rendering, because `next/image` cannot render without a `src` — and
 * whose image branch then went unused by all seven of its call sites.
 *
 * ⚠️ **A missing picture is not a broken one.** A `src` that 404s is the
 * browser's business and shows as a broken image ; only a source-less avatar
 * falls back to initials.
 *
 * ⚠️ **No spinner.** A wait announced in a forty-pixel disc is noise, and the
 * initials already stand where the picture will be.
 *
 * ⚠️ **The box is set by `size`, not by a `className`.** A picture is handed
 * the pixel size of its box, because `Picture` sets no `sizes` attribute and
 * `fill` would warn without one — so a class that changes the box would leave
 * the picture at its old size, centred. The initials, which fill their box,
 * follow a class override either way.
 *
 * @module components/avatars/InitialsAvatar
 *
 * @param {Object} props
 * @param {string} [props.alt] - Alternative text for the picture. Defaults to the name.
 * @param {string} [props.className] - Classes for the avatar wrapper.
 * @param {import('../../themes/components/avatar').AvatarIndicator} [props.indicator] - Online/offline mark.
 * @param {string} [props.initialsClassName] - Classes for the initials themselves.
 * @param {number} [props.max=2] - How many initials at most.
 * @param {string} [props.name] - The name : its initials, and the colour it always gets.
 * @param {string[]} [props.palette] - The fills to pick from. Defaults to the seven pairs daisyUI guarantees.
 * @param {boolean} [props.priority=false] - Forwarded to the picture : load it ahead of the rest.
 * @param {import('../../themes/components/avatar').AvatarSize} [props.size='md'] - Avatar size.
 * @param {string} [props.src] - The picture. Without it, the initials show instead.
 *
 * @example
 * ```jsx
 * <InitialsAvatar name="Jean Dupont" size="sm" />
 * <InitialsAvatar name="Acme Corp" src={ company.logo } size="lg" />
 * <InitialsAvatar name="Acme Corp" palette={ OWN_TINTS } indicator="online" />
 * ```
 */

import cn from '../../themes/helpers/cn' ;

import { getInitialsScale , INITIALS_PALETTE } from '../../themes/components/avatar' ;

import getInitials from '../../helpers/strings/getInitials' ;
import hashIndex   from '../../helpers/strings/hashIndex' ;

import Avatar  from './Avatar' ;
import Picture from '../images/Picture' ;

const InitialsAvatar =
({
    alt ,
    className ,
    indicator ,
    initialsClassName ,
    max = 2 ,
    name = '' ,
    palette = INITIALS_PALETTE ,
    priority = false ,
    size ,
    src ,

    ...rest
}) =>
{
    const { box , px } = getInitialsScale( size ) ;

    const fill = palette?.length ? palette[ hashIndex( name , palette.length ) ] : undefined ;

    return (
        <Avatar
            className      = { cn( 'shrink-0' , className ) }
            indicator      = { indicator }
            innerClassName = { cn( 'rounded-full' , box ) }
            placeholder    = { !src }
            { ...rest }
        >
            <Picture
                alt               = { alt ?? name }
                className         = "w-full h-full bg-transparent"
                fallback          = { <span className={ cn( 'font-semibold select-none' , initialsClassName ) }>{ getInitials( name , { max } ) }</span> }
                fallbackClassName = { fill }
                height            = { src ? px : undefined }
                priority          = { priority }
                showLoading       = { false }
                src               = { src }
                width             = { src ? px : undefined }
            />
        </Avatar>
    ) ;
} ;

InitialsAvatar.displayName = 'InitialsAvatar' ;

export default InitialsAvatar ;
