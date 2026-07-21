/**
 * Navigation item components registry.
 *
 * Maps navigation types to their corresponding components.
 *
 * @module display/ui/navigation/items
 */

import { COLLAPSE , DIVIDER , LINK , TITLE } from '../../../contexts/navigation/types' ;

import Collapse from './Collapse' ;
import Divider  from './Divider' ;
import Link     from './Link' ;
import Title    from './Title' ;

/**
 * @type {Record<string, React.ComponentType>}
 */
const items =
{
    [ COLLAPSE ] : Collapse ,
    [ DIVIDER  ] : Divider ,
    [ LINK     ] : Link ,
    [ TITLE    ] : Title ,
} ;

export default items ;