/**
 * The page that stands in for a page : not found, not allowed, not working.
 *
 * A number, a line saying what happened, and one way out. The illustration is
 * optional — the shape reads without it, and an application with no artwork of
 * its own should not be forced to find some.
 *
 * ### 🔑 Every word is a PROP
 *
 * There is no bundle behind this one. A 404 says « page introuvable » in one
 * product and « this page has moved » in another, and the way out is `/` for
 * some and `/home` for others — none of which a library can choose. What it
 * owns is the arrangement : where the number sits, how it arrives, and that
 * the way out is a link rather than a button that does nothing on a dead page.
 *
 * ⚠️ **`title` must be a real string, not a node** : it is read as the
 * illustration's alternative text as well as shown under the number.
 *
 * ### 🔑 Where the way out sits
 *
 * Under the message by default — a reader learns what happened, then acts. A
 * screen whose illustration already fills the upper half may want it the other
 * way, between the picture and the words, which is `actionPosition="top"`.
 * Both orders exist in the wild ; neither is wrong, so neither is hardcoded.
 *
 * ⚠️ **Server-safe on purpose** — no `'use client'` here. The three motions it
 * composes opt into client rendering themselves, so this renders inside a
 * route group or as a bare catch-all alike.
 *
 * @module components/ErrorScreen
 *
 * @param {Object} props
 * @param {'top'|'bottom'} [props.actionPosition='bottom'] - The way out above the message, or under it.
 * @param {string} props.code - The big headline : « 404 », « 403 », « 500 ».
 * @param {string} props.href - Where the way out leads.
 * @param {string} props.hrefLabel - What the way out says.
 * @param {string|import('next/image').StaticImageData} [props.image] - The illustration. Without it, the number leads.
 * @param {number} [props.imageSize=384] - Its side, in pixels : the intrinsic size handed to `next/image` and the rendered box.
 * @param {import('../themes/effects/backgroundPattern').BackgroundPattern} [props.pattern='topography'] - The backdrop, or `null` for none.
 * @param {string} [props.subtitle] - A second line : which page, what to try.
 * @param {string} props.title - The line under the number, and the illustration's alternative text.
 *
 * @example
 * ```jsx
 * <ErrorScreen
 *     code      = "404"
 *     title     = "This page cannot be found"
 *     href      = "/"
 *     hrefLabel = "Back to the home page"
 * />
 * ```
 *
 * @example
 * ```jsx
 * <ErrorScreen
 *     code      = "403"
 *     image     = "/illustrations/forbidden.svg"
 *     title     = { t.title }
 *     subtitle  = { t.pageName }
 *     href      = "/home"
 *     hrefLabel = { t.back }
 * />
 * ```
 */

import Image from 'next/image' ;

import LinkButton from './links/LinkButton' ;

import Jump         from '../motions/Jump' ;
import LetterReveal from '../motions/LetterReveal' ;
import SlideUp      from '../motions/SlideUp' ;

import { getPatternClass } from '../themes/effects/backgroundPattern' ;

import cn from '../themes/helpers/cn' ;

/** The side of the illustration, in pixels, when the caller says nothing. @type {number} */
export const ERROR_SCREEN_IMAGE_SIZE = 384 ;

/** The backdrop this screen takes when the caller says nothing. @type {string} */
export const ERROR_SCREEN_PATTERN = 'topography' ;

/** The way out sits under the message. @type {string} */
export const ACTION_BOTTOM = 'bottom' ;

/** The way out sits above the message. @type {string} */
export const ACTION_TOP = 'top' ;

const ErrorScreen =
({
    actionPosition = ACTION_BOTTOM ,
    code ,
    href ,
    hrefLabel ,
    image ,
    imageSize = ERROR_SCREEN_IMAGE_SIZE ,
    pattern = ERROR_SCREEN_PATTERN ,
    subtitle ,
    title ,
}) =>
{
    const action =
    (
        <LinkButton color="primary" href={ href }>
            { hrefLabel }
        </LinkButton>
    ) ;

    return (
        <div
            className =
            {
                cn
                (
                    'flex grow flex-col items-center justify-center gap-8 p-8 text-base-300/20' ,
                    getPatternClass( pattern ) ,
                )
            }
        >

            { image && (
                <SlideUp delay={ 0.5 } start={ -200 }>
                    <Image
                        alt    = { title }
                        height = { imageSize }
                        src    = { image }
                        style  = { { width : imageSize , height : imageSize } }
                        width  = { imageSize }
                        priority
                    />
                </SlideUp>
            ) }

            { actionPosition === ACTION_TOP && action }

            <hgroup className="text-center text-base-content">

                <Jump delay={ 0.5 } bounce={ 0.5 }>
                    <h1 className="text-6xl font-bold text-secondary">{ code }</h1>
                </Jump>

                <LetterReveal as="div" className="text-lg" delay={ 0.8 } text={ title } />

                { subtitle && (
                    <p className="mt-2 text-sm text-base-content/60">
                        { subtitle }
                    </p>
                ) }

            </hgroup>

            { actionPosition !== ACTION_TOP && action }

        </div>
    ) ;
} ;

ErrorScreen.displayName = 'ErrorScreen' ;

export default ErrorScreen ;
