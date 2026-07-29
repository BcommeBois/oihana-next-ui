'use client' ;

/**
 * Titled section wrapping a single chart in the charts demos.
 */
const Section = ( { children , description , title } ) => (
    <div className="flex flex-col gap-2">
        <div>
            <h3 className="text-lg font-semibold">{ title }</h3>
            { description && <p className="text-sm text-base-content/60">{ description }</p> }
        </div>
        { children }
    </div>
) ;

export default Section ;
