'use client' ;

import getTextClassNames from '@/themes/typography/getTextClassNames' ;

import parseHtml from '@/helpers/parseHtml' ;
import notEmpty  from 'vegas-js-core/src/strings/notEmpty' ;

/**
 * Typography component with comprehensive text styling support.
 *
 * @module component/typography/Typography
 *
 * @see {@link getTextClassNames} for all available text styling props.
 */

/**
 * @typedef {Object} TypographyProps
 *
 * @prop {React.ElementType} [as='div'] - The HTML element to render.
 * @prop {React.ReactNode} [children] - Content to display.
 * @prop {string} [defaultClassName] - Default className prepended to generated classes.
 * @prop {boolean} [html=false] - Parse children as HTML string.
 *
 * @prop {import('@/themes/typography/getTextClassNames').TextClassNameProps} textProps - All text styling props.
 */

/**
 * Typography component with text styling utilities.
 *
 * @param {TypographyProps} props
 * @returns {JSX.Element}
 *
 * @example
 * ```jsx
 * <Typography
 *     as="h1"
 *     size="2xl"
 *     weight="bold"
 *     color="primary"
 *     align="center"
 * >
 *     Hello World
 * </Typography>
 *
 * <Typography
 *     as="p"
 *     size={ { xs: 'sm' , md: 'lg' } }
 *     lineClamp={ 3 }
 *     className="bg-base-200 p-4"
 * >
 *     Long text content...
 * </Typography>
 *
 * <Typography html>
 *     <p>HTML <strong>content</strong></p>
 * </Typography>
 * ```
 */
const Typography =
({
     align ,
     as ,
     children ,
     className ,
     color ,
     decoration ,
     defaultClassName ,
     fontStyle ,
     html = false ,
     letterSpacing ,
     lineClamp ,
     lineHeight ,
     margin ,
     marginBottom ,
     marginEnd ,
     marginLeft ,
     marginRight ,
     marginStart ,
     marginTop ,
     marginX ,
     marginY ,
     overflow ,
     padding ,
     paddingBottom ,
     paddingEnd ,
     paddingLeft ,
     paddingRight ,
     paddingStart ,
     paddingTop ,
     paddingX ,
     paddingY ,
     size ,
     transform ,
     weight ,
     whitespace ,
     wordBreak ,
     wrap ,
     ...rest
 }) =>
{
    const Component = as ?? 'div' ;

    const classNames = getTextClassNames({
        align ,
        beforeClassName : defaultClassName ,
        className ,
        color ,
        decoration ,
        fontStyle ,
        letterSpacing ,
        lineClamp ,
        lineHeight ,
        margin ,
        marginBottom ,
        marginEnd ,
        marginLeft ,
        marginRight ,
        marginStart ,
        marginTop ,
        marginX ,
        marginY ,
        overflow ,
        padding ,
        paddingBottom ,
        paddingEnd ,
        paddingLeft ,
        paddingRight ,
        paddingStart ,
        paddingTop ,
        paddingX ,
        paddingY ,
        size ,
        transform ,
        weight ,
        whitespace ,
        wordBreak ,
        wrap ,
    }) ;

    const content = notEmpty( children ) && html ? parseHtml( children ) : children ;

    return (
        <Component className={ classNames } { ...rest }>
            { content }
        </Component>
    ) ;
} ;

Typography.displayName = 'Typography' ;

export default Typography ;