import cn from '../themes/helpers/cn' ;

import
{
    getCardActionsClasses ,
    getCardBodyClasses ,
    getCardClassNames ,
    getCardTitleClasses ,
}
from '../themes/components/card' ;

import { BOTTOM , TOP } from '../themes/enums/positions' ;

/**
 * The icon of the title : one size and one ink for every card. `card-title`
 * is already a flex row with a gap ; the icon never shrinks, a long title
 * wraps beside it.
 * @type {string}
 */
const ICON = 'size-4.5 opacity-60 shrink-0' ;

/**
 * The actions row pinned to the bottom of the card, above a separator.
 * @type {string}
 */
const PINNED_ACTIONS = 'mt-auto pt-3 border-t border-base-300/60 items-center' ;

/**
 * The title and its end content, wrapping rather than squeezing the title.
 * @type {string}
 */
const TITLE_ROW = 'flex flex-wrap items-center justify-between gap-2' ;

/**
 * Groups content into the DaisyUI `card` shell — a figure, a body, and inside the body a
 * title and an actions row.
 *
 * Prop-driven like the rest of the library (`Modal` with `title` / `footerNode`,
 * `SidePanel` with `panel`) : the parts are slots rather than sub-components, and every
 * one of them is dropped entirely when its prop is falsy.
 *
 * ### Heading level
 *
 * DaisyUI writes its title as a hard-coded `<h2>`. A card lives inside a list, in the
 * middle of a document outline, so `titleAs` is exposed : leaving every card at `h2`
 * breaks the outline as soon as one is nested under an existing `h2`. Set it to match
 * the surrounding hierarchy.
 *
 * ### Icon, title end, pinned actions
 *
 * - `icon` takes a **component**, not an element : the card sizes and inks it
 *   (`size-4.5 opacity-60`), so a page of cards cannot drift into as many sizes
 *   as it has call sites. It is decorative and sits in the title — without a
 *   `title` it is not drawn, an icon alone names nothing.
 * - `titleEnd` puts the title in a row with something at its far end — a count,
 *   a button. The row wraps rather than squeezes the title. Without it, the
 *   title is rendered as before, alone.
 * - `pinActions` pushes the actions row to the bottom of the card, above a
 *   separator. Cards side by side in a grid row stretch to the same height ;
 *   their buttons then line up whatever the length of each body.
 *   ⚠️ daisyUI gives every `<p>` directly inside `card-body` a `flex-grow: 1` :
 *   such a paragraph stretches to fill the card and pushes the actions down
 *   on its own, pinned or not. Wrap the paragraphs to keep them at their size.
 *
 * ### Server Components
 *
 * The card holds no state and no hook, and carries no `'use client'` : a
 * Server Component can render it and hand it an `icon` component — which
 * could not cross into a client component, a function not being serialisable.
 * Passed from a Server Component, `rest` can only hold serialisable attributes.
 *
 * ### Side layout
 *
 * `side` takes `true` for a permanently horizontal card, or a breakpoint — `side="lg"`
 * gives the vertical-on-mobile, horizontal-on-desktop layout. DaisyUI ships no `2xl`
 * variant, so the accepted values stop at `xl`.
 *
 * ### Selectable cards
 *
 * DaisyUI turns a card into a selection control through `:has()` — a checked
 * `<input type="checkbox">` or `<input type="radio">` lights the card outline, and the
 * input itself is hidden with `appearance: none`. The rule matches **direct children of
 * the card**, so the input cannot travel through `children` (which lands inside
 * `card-body`) : pass it as `input`, and render the root as a `<label>` so clicking
 * anywhere in the card toggles it.
 *
 * ```jsx
 * <Card as="label" input={ <input type="radio" name="size" value="lg" /> } title="Size LG">
 *     <p>Short supply</p>
 * </Card>
 * ```
 *
 * The selection outline is drawn in **`currentColor`**, 2px outside the card. A card whose
 * text is light therefore gets a light outline, invisible on a light page. Drive it with a
 * text color on the root and restore the body color separately :
 *
 * ```jsx
 * <Card as="label" className="text-accent" bodyClassName="text-base-content" … />
 * ```
 *
 * @module components/Card
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.actions] - Content of the `card-actions` row. Defaults to `justify-end`, overridable through `actionsClassName`.
 * @param {string} [props.actionsClassName] - Additional class name on the actions row.
 * @param {React.ElementType} [props.as='div'] - Root element type. Use `label` for a selectable card.
 * @param {string} [props.bodyClassName] - Additional class name on `card-body`.
 * @param {React.ReactNode} [props.children] - Body content, between the title and the actions.
 * @param {string} [props.className] - Additional class name on the root.
 * @param {string} [props.figureClassName] - Additional class name on the `<figure>`.
 * @param {React.ElementType} [props.icon] - Decorative icon component, drawn left of the title. Ignored without a `title`.
 * @param {string} [props.iconClassName] - Additional class name on the icon, merged over `size-4.5 opacity-60 shrink-0`.
 * @param {React.ReactNode} [props.image] - Figure content — a node, not a source, so a `next/image` can be passed as is.
 * @param {boolean} [props.imageFull=false] - Turns the figure into a full background (`image-full`).
 * @param {'top'|'bottom'} [props.imagePosition='top'] - Whether the figure sits before or after the body.
 * @param {React.ReactNode} [props.input] - A checkbox or radio rendered as a direct child of the card, for the selectable form above.
 * @param {boolean} [props.pinActions=false] - Pins the actions row to the bottom of the card, above a separator.
 * @param {React.Ref} [props.ref] - Forwarded to the root.
 * @param {import('../themes/components/card').CardSide} [props.side] - Horizontal layout : `true`, or the breakpoint it starts at.
 * @param {import('../themes/components/card').CardSize} [props.size] - Card size.
 * @param {import('../themes/components/card').CardStyle} [props.style] - `border` | `dash`.
 * @param {React.ReactNode} [props.title] - Title content, rendered in `card-title`.
 * @param {React.ElementType} [props.titleAs='h2'] - Heading level of the title.
 * @param {string} [props.titleClassName] - Additional class name on the title.
 * @param {React.ReactNode} [props.titleEnd] - Content at the far end of the title row — a count, a button.
 *
 * @see https://daisyui.com/components/card
 *
 * @example
 * ```jsx
 * <Card
 *     className = "w-96 bg-base-100 shadow-sm"
 *     image     = { <img src="/shoes.webp" alt="Chaussures" /> }
 *     title     = "Chaussures"
 *     actions   = { <Button color="primary">Acheter</Button> }
 * >
 *     <p>Une carte a une figure, un corps, et dans le corps un titre et des actions.</p>
 * </Card>
 * ```
 *
 * @example Vertical on mobile, horizontal from `lg`
 * ```jsx
 * <Card side="lg" image={ <img src="/album.webp" alt="Album" /> } title="Nouvel album" />
 * ```
 */
const Card =
({
    actions ,
    actionsClassName ,
    as : Root = 'div' ,
    bodyClassName ,
    children ,
    className ,
    figureClassName ,
    icon : Icon ,
    iconClassName ,
    image ,
    imageFull = false ,
    imagePosition = TOP ,
    input ,
    pinActions = false ,
    ref ,
    side ,
    size ,
    style ,
    title ,
    titleAs : Title = 'h2' ,
    titleClassName ,
    titleEnd ,
    ...rest
}) =>
{
    const figure = image
        ? <figure className={ figureClassName }>{ image }</figure>
        : null ;

    const heading = title ? (
        <Title className={ getCardTitleClasses({ className : titleClassName }) }>
            { Icon ? <Icon aria-hidden className={ cn( ICON , iconClassName ) } /> : null }
            { title }
        </Title>
    ) : null ;

    return (
        <Root
            className = { getCardClassNames({ className , imageFull , side , size , style }) }
            ref       = { ref }
            { ...rest }
        >
            { input }

            { imagePosition === TOP && figure }

            <div className={ getCardBodyClasses({ className : bodyClassName }) }>

                { titleEnd ? (
                    <div className={ TITLE_ROW }>
                        { heading }
                        { titleEnd }
                    </div>
                ) : heading }

                { children }

                { actions ? (
                    <div className={ getCardActionsClasses({ className : cn( 'justify-end' , pinActions && PINNED_ACTIONS , actionsClassName ) }) }>
                        { actions }
                    </div>
                ) : null }

            </div>

            { imagePosition === BOTTOM && figure }

        </Root>
    ) ;
} ;

Card.displayName = 'Card' ;

export default Card ;
