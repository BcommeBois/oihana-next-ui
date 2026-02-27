/**
 * Markdown heading renderers (h1-h6).
 *
 * @module components/typography/markdown/renderers/headings
 */

export const h1 = props =>
(
    <h1 className="text-4xl font-bold mt-4! mb-2! first:mt-0! sm:mt-8 sm:mb-4">
        { props.children }
    </h1>
) ;

export const h2 = props =>
(
    <h2 className="text-3xl font-bold mt-3! mb-2! sm:mt-6 sm:mb-3">
        { props.children }
    </h2>
) ;

export const h3 = props =>
(
    <h3 className="text-2xl font-semibold mt-2! mb-1! sm:mt-4 sm:mb-2">
        { props.children }
    </h3>
) ;

export const h4 = props =>
(
    <h4 className="text-xl font-semibold mt-2! mb-1! sm:mt-3 sm:mb-2">
        { props.children }
    </h4>
) ;

export const h5 = props =>
(
    <h5 className="text-lg font-semibold mt-1! mb-1! sm:mt-2 sm:mb-1">
        { props.children }
    </h5>
) ;

export const h6 = props =>
(
    <h6 className="text-base font-semibold mt-1! mb-1! sm:mt-2 sm:mb-1">
        { props.children }
    </h6>
) ;