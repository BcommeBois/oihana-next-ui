/**
 * Page content wrapper with responsive padding and width constraints.
 *
 * @module display/Page
 */

import cn from '@/themes/helpers/cn' ;

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content.
 * @param {string} [props.className] - Additional classes.
 * @param {string} [props.maxWidth='max-w-5xl'] - Max width constraint for large screens.
 * @param {boolean} [props.full=false] - If true, no max width constraint.
 */
const Page = ({ children , className , maxWidth = 'max-w-5xl' , full = false }) =>
{
    const classNames = cn
    (
        'flex flex-1 flex-col items-center w-full min-w-0 p-4 sm:p-8 gap-2' ,
        !full && [ maxWidth , 'mx-auto' ] ,
        className ,
    ) ;

    return (
        <div className={ classNames }>
            { children }
        </div>
    ) ;
} ;

export default Page ;