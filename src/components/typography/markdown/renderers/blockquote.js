/**
 * Markdown blockquote renderer.
 *
 * @module components/typography/markdown/renderers/blockquote
 */

import cn from '../../../../themes/helpers/cn' ;

import Blockquote from '../../Blockquote' ;

const blockquote =
(
    blockquoteClassName ,
    blockquoteHtml      ,
    blockquoteShowIcon  ,
    blockquoteSpacing = 'my-4'
) => props =>
(
    <div className={ cn( blockquoteSpacing , 'first:mt-0' ) }>
        <Blockquote
            className = { blockquoteClassName }
            html      = { blockquoteHtml      }
            showIcon  = { blockquoteShowIcon  }
        >
            { props.children }
        </Blockquote>
    </div>
) ;

export default blockquote ;