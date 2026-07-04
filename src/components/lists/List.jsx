'use client' ;

import getListClasses from '../../themes/components/list' ;

/**
 * List component for DaisyUI 5.
 * A vertical flex layout to display rows of information.
 *
 * @module components/lists/List
 * @see https://daisyui.com/components/list
 *
 * @example
 * ```jsx
 * // Basic list
 * <List>
 *     <ListRow
 *         avatar={<Avatar><img src="/user.jpg" /></Avatar>}
 *         title="John Doe"
 *         subtitle="Software Engineer"
 *         actions={<Button size="sm">Edit</Button>}
 *     />
 * </List>
 *
 * // With selection
 * <List>
 *     <ListRow
 *         selectable
 *         selected={selected}
 *         onSelect={(checked) => setSelected(checked)}
 *         title="Item 1"
 *     />
 * </List>
 * ```
 */

/**
 * @param {Object} props
 * @param {React.ElementType} [props.as='ul'] - Root element type
 * @param {React.ReactNode} [props.children] - List rows
 * @param {string} [props.className] - Additional classes
 * @param {React.Ref} [props.ref] - Reference to the root element
 */
const List =
({
    as ,
    children ,
    className ,
    ref ,
    ...rest
}) =>
{
    const Component = as ?? 'ul' ;

    const listClasses = getListClasses({ className }) ;

    return (
        <Component className={ listClasses } ref={ ref } { ...rest }>
            { children }
        </Component>
    ) ;
} ;

List.displayName = 'List' ;

export default List ;