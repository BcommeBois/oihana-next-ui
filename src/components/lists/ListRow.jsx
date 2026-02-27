'use client' ;

import { useId } from 'react' ;

import cn from '@/themes/helpers/cn' ;

import { getListRowClasses , getListColGrowClasses , getListColWrapClasses } from '@/themes/components/list' ;

import Checkbox from '@/components/checkboxes/Checkbox' ;

/**
 * ListRow component for DaisyUI 5.
 * Represents a single row in a List with optional avatar/checkbox, content, and actions.
 *
 * @module components/lists/ListRow
 *
 * @example
 * ```jsx
 * // With avatar
 * <ListRow
 *     avatar={<Avatar><img src="/photo.jpg" /></Avatar>}
 *     title="John Doe"
 *     subtitle="Developer"
 *     actions={<Button size="sm">Edit</Button>}
 * />
 *
 * // With checkbox selection
 * <ListRow
 *     selectable
 *     selected={isSelected}
 *     onSelect={(checked) => setIsSelected(checked)}
 *     title="Select this item"
 *     subtitle="Click checkbox to select"
 * />
 *
 * // With custom content
 * <ListRow
 *     leading={<div className="text-4xl">01</div>}
 *     grow={
 *         <div>
 *             <h3>Custom Content</h3>
 *             <p className="text-xs">With grow column</p>
 *         </div>
 *     }
 *     actions={[
 *         <Button key="play" size="sm" icon={PlayIcon} />,
 *         <Button key="like" size="sm" icon={HeartIcon} />
 *     ]}
 * />
 *
 * // With wrapped content
 * <ListRow
 *     avatar={<Avatar><img src="/photo.jpg" /></Avatar>}
 *     title="Song Title"
 *     subtitle="Artist Name"
 *     wrap={<p className="text-xs">Long description that wraps to next row...</p>}
 *     actions={<Button size="sm">Play</Button>}
 * />
 * ```
 */

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.actions] - Action buttons on the right
 * @param {string} [props.actionsClassName] - Additional classes for actions container
 * @param {React.ElementType} [props.as='li'] - Root element type
 * @param {React.ReactNode} [props.avatar] - Avatar element (replaced by checkbox when selectable)
 * @param {string} [props.avatarClassName] - Additional classes for avatar/checkbox container
 * @param {string} [props.checkboxColor] - Checkbox color when selectable
 * @param {string} [props.className] - Additional classes for row
 * @param {boolean} [props.clickable] - Add hover/cursor styles
 * @param {React.ReactNode} [props.content] - Main content (custom, overrides title/subtitle)
 * @param {string} [props.contentClassName] - Additional classes for content container
 * @param {boolean} [props.disabled] - Disabled state
 * @param {React.ReactNode} [props.grow] - Custom content for grow column
 * @param {number} [props.growColumn=2] - Which column grows (1-based index)
 * @param {string} [props.growClassName] - Additional classes for grow container
 * @param {React.ReactNode} [props.leading] - Leading element (before avatar/checkbox)
 * @param {string} [props.leadingClassName] - Additional classes for leading container
 * @param {Function} [props.onClick] - Row click handler
 * @param {Function} [props.onSelect] - Selection change handler: (checked) => void
 * @param {boolean} [props.selectable] - Show checkbox for selection
 * @param {boolean} [props.selected] - Selected state
 * @param {string} [props.subtitle] - Subtitle text
 * @param {string} [props.subtitleClassName] - Additional classes for subtitle
 * @param {string} [props.title] - Title text
 * @param {string} [props.titleClassName] - Additional classes for title
 * @param {React.ReactNode} [props.wrap] - Content that wraps to next row
 * @param {string} [props.wrapClassName] - Additional classes for wrap container
 */
const ListRow =
({
    actions ,
    actionsClassName ,
    as ,
    avatar ,
    avatarClassName ,
    checkboxColor = 'primary' ,
    className ,
    clickable ,
    content ,
    contentClassName ,
    disabled = false ,
    grow ,
    growColumn = 2 ,
    growClassName ,
    leading ,
    leadingClassName ,
    onClick ,
    onSelect ,
    selectable = false ,
    selected = false ,
    subtitle ,
    subtitleClassName ,
    title ,
    titleClassName ,
    wrap ,
    wrapClassName ,
}) =>
{
    const Component = as ?? 'li' ;
    const checkboxId = useId() ;

    const handleCheckboxChange = ( e ) =>
    {
        if ( onSelect && ! disabled )
        {
            onSelect( e.target.checked ) ;
        }
    } ;

    const handleRowClick = () =>
    {
        if ( onClick && ! disabled )
        {
            onClick() ;
        }
    } ;

    const rowClasses = getListRowClasses({
        clickable : clickable || !! onClick ,
        selected ,
        className ,
    }) ;

    // Leading element
    const leadingElement = leading && (
        <div className={ cn( leadingClassName ) }>
            { leading }
        </div>
    ) ;

    // Avatar or Checkbox
    const avatarOrCheckbox = ( avatar || selectable ) && (
        <div className={ cn( avatarClassName ) }>
            { selectable ? (
                <Checkbox
                    checked   = { selected }
                    color     = { checkboxColor }
                    disabled  = { disabled }
                    id        = { checkboxId }
                    onChange  = { handleCheckboxChange }
                />
            ) : (
                avatar
            )}
        </div>
    ) ;

    // Main content (title/subtitle or custom)
    const mainContent = content ?? (
        ( title || subtitle ) ? (
            <div className={ cn( contentClassName ) }>
                { title && (
                    <div className={ cn( titleClassName ) }>
                        { title }
                    </div>
                )}
                { subtitle && (
                    <div className={ cn( 'text-xs uppercase font-semibold opacity-60' , subtitleClassName ) }>
                        { subtitle }
                    </div>
                )}
            </div>
        ) : null
    ) ;

    // Grow column (custom or main content with grow class)
    const growContent = grow ?? ( growColumn === 2 ? mainContent : null ) ;

    const growElement = growContent && (
        <div className={ getListColGrowClasses({ className: growClassName }) }>
            { growContent }
        </div>
    ) ;

    // Regular content (when not in grow column)
    const regularContent = ! grow && growColumn !== 2 && mainContent ;

    // Wrap content
    const wrapElement = wrap && (
        <div className={ getListColWrapClasses({ className: wrapClassName }) }>
            { wrap }
        </div>
    ) ;

    // Actions
    const actionsElement = actions && (
        <div className={ cn( 'flex gap-2 items-center' , actionsClassName ) }>
            { Array.isArray( actions ) ? actions.map( ( action , index ) => (
                <div key={ index }>{ action }</div>
            )) : actions }
        </div>
    ) ;

    return (
        <Component
            className = { rowClasses }
            onClick   = { handleRowClick }
        >
            { leadingElement }
            { avatarOrCheckbox }
            { growElement || regularContent }
            { wrapElement }
            { actionsElement }
        </Component>
    ) ;
} ;

ListRow.displayName = 'ListRow' ;

export default ListRow ;