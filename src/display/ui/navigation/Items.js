/**
 * Navigation item components registry.
 *
 * Maps navigation types to their corresponding components.
 *
 * @module display/ui/navigation/items
 */

import { COLLAPSE , DIVIDER , LINK } from '@/contexts/navigation/types' ;

import Collapse from './Collapse' ;
import Divider  from './Divider' ;
import Link     from './Link' ;

/**
 * @type {Record<string, React.ComponentType>}
 */
const items =
{
    [ COLLAPSE ] : Collapse ,
    [ DIVIDER  ] : Divider ,
    [ LINK     ] : Link ,
} ;

export default items ;