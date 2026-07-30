'use client' ;

import
{
    getEmptyStateActionsClasses ,
    getEmptyStateClasses ,
    getEmptyStateDescriptionClasses ,
    getEmptyStateIconClasses ,
    getEmptyStateTitleClasses ,
}
from '../themes/components/emptyState' ;

/**
 * The placeholder shown where content would be : an empty list, a search with no result,
 * a panel before its first item.
 *
 * A house component — DaisyUI has no empty-state primitive — but it follows the wording
 * the chart family already established (`emptyLabel`, `emptyState`), so the vocabulary
 * stays the same across the library.
 *
 * ### Announcing it, or not
 *
 * An empty state that appears **in response to an action** — a search returning nothing,
 * a filter narrowed too far — is a status message : without `role="status"` a screen
 * reader says nothing at all, and the user types and gets no feedback. But on the first
 * render of a list that simply has no items yet, announcing it is noise.
 *
 * `announce` therefore defaults to **off**. Turn it on when the empty state is a
 * consequence rather than a starting point :
 *
 * ```jsx
 * <EmptyState announce title="Aucun résultat" description={ `Rien ne correspond à « ${ query } ».` } />
 * ```
 *
 * ### Heading level
 *
 * `title` renders as a `<p>`, not a heading : an empty state is a status message, not a
 * section of the document, and defaulting to `h2` would pollute the outline of every page
 * holding a list. Pass `titleAs` when the empty state genuinely owns a region.
 *
 * @module components/EmptyState
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.actions] - The way out : an add button, a filter reset. Rendered in a centred row.
 * @param {string} [props.actionsClassName] - Additional class name on the actions row.
 * @param {boolean} [props.announce=false] - Expose the block as a live status message (`role="status"`). See above.
 * @param {React.ElementType} [props.as='div'] - Root element type.
 * @param {React.ReactNode} [props.children] - Free content, between the description and the actions.
 * @param {string} [props.className] - Additional class name on the container.
 * @param {React.ReactNode} [props.description] - The explanation under the title.
 * @param {string} [props.descriptionClassName] - Additional class name on the description.
 * @param {React.ReactNode} [props.icon] - Decorative icon, hidden from assistive technology. Sized through the `size` scale, so a `react-icons` node needs no `size` of its own.
 * @param {string} [props.iconClassName] - Additional class name on the icon wrapper.
 * @param {React.Ref} [props.ref] - Forwarded to the root.
 * @param {import('../themes/components/emptyState').EmptyStateSize} [props.size='md'] - Breathing room and icon scale.
 * @param {React.ReactNode} [props.title] - The main message.
 * @param {React.ElementType} [props.titleAs='p'] - Element used for the title.
 * @param {string} [props.titleClassName] - Additional class name on the title.
 *
 * @example Empty list, with a way out
 * ```jsx
 * <EmptyState
 *     icon        = { <InboxIcon /> }
 *     title       = "Aucune facture"
 *     description = "Les factures que tu émets apparaîtront ici."
 *     actions     = { <Button color="primary">Créer une facture</Button> }
 * />
 * ```
 *
 * @example Compact, inside a panel
 * ```jsx
 * <EmptyState size="sm" title="Panier vide" />
 * ```
 */
const EmptyState =
({
    actions ,
    actionsClassName ,
    announce = false ,
    as : Root = 'div' ,
    children ,
    className ,
    description ,
    descriptionClassName ,
    icon ,
    iconClassName ,
    ref ,
    size ,
    title ,
    titleAs : Title = 'p' ,
    titleClassName ,
    ...rest
}) =>
{
    return (
        <Root
            className = { getEmptyStateClasses({ className , size }) }
            ref       = { ref }
            role      = { announce ? 'status' : undefined }
            { ...rest }
        >

            { icon ? (
                // Decorative : it restates the title, so announcing it would just repeat.
                <span aria-hidden="true" className={ getEmptyStateIconClasses({ className : iconClassName , size }) }>
                    { icon }
                </span>
            ) : null }

            { title ? (
                <Title className={ getEmptyStateTitleClasses({ className : titleClassName , size }) }>
                    { title }
                </Title>
            ) : null }

            { description ? (
                <p className={ getEmptyStateDescriptionClasses({ className : descriptionClassName }) }>
                    { description }
                </p>
            ) : null }

            { children }

            { actions ? (
                <div className={ getEmptyStateActionsClasses({ className : actionsClassName }) }>
                    { actions }
                </div>
            ) : null }

        </Root>
    ) ;
} ;

EmptyState.displayName = 'EmptyState' ;

export default EmptyState ;
