'use client' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Megamenu  from '@/components/menus/Megamenu' ;

/**
 * Megamenu showcase.
 *
 * Several megamenus coexist on this page : basic ones anchor each popover to its
 * own trigger (DOM-order anchor resolution), and wide/full get a unique anchor
 * name per instance so they never collide.
 */
const MegamenuDemo = () =>
{
    const items =
    [
        {
            label : 'Services' ,
            links :
            [
                { label : 'Enterprise'   , href : '#' } ,
                { label : 'CRM software' , href : '#' } ,
                { label : 'Security'     , href : '#' } ,
                { label : 'Consulting'   , href : '#' } ,
            ] ,
        } ,
        {
            label : 'AI' ,
            links :
            [
                { label : 'AI infrastructure' , href : '#' } ,
                { label : 'Image generation'  , href : '#' } ,
                { label : 'MCP servers'       , href : '#' } ,
            ] ,
        } ,
        {
            label : 'Cloud Solutions' ,
            links :
            [
                { label : 'Cloud computing'   , href : '#' } ,
                { label : 'Storage solutions' , href : '#' } ,
                { label : 'Database services' , href : '#' } ,
                { label : 'CDN performance'   , href : '#' } ,
            ] ,
        } ,
    ] ;

    const plainItems =
    [
        { label : 'One'   , content : <div className="p-4">Content for the first item</div> } ,
        { label : 'Two'   , content : <div className="p-4">Content for the second item</div> } ,
        { label : 'Three' , content : <div className="p-4">Content for the third item</div> } ,
    ] ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Megamenu</h2>
            <p className="text-sm text-base-content/70">
                Built on the native popover API + CSS anchor positioning (recent browsers).
                Multiple megamenus coexist on this page.
            </p>

            {/* Responsive small menus */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Responsive small menus</h3>
                <Megamenu
                    responsive
                    items     = { items }
                    className = "w-full p-2 border border-base-300"
                />
            </div>

            <Divider />

            {/* Wide */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Wide popovers</h3>
                <Megamenu
                    responsive
                    width     = "wide"
                    items     = { items }
                    className = "w-full p-2 border border-base-300"
                />
            </div>

            <Divider />

            {/* Full width inside a navbar */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Full width inside a navbar</h3>
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="navbar-start">
                        <a className="btn btn-ghost text-xl">daisyUI</a>
                    </div>
                    <div className="navbar-center">
                        <Megamenu responsive width="full" items={ items } />
                    </div>
                    <div className="navbar-end">
                        <button className="btn">Login</button>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Sizes — five basic megamenus coexisting */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Sizes</h3>
                { [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ].map( ( size ) => (
                    <Megamenu
                        key={ size }
                        size={ size }
                        items={ plainItems }
                        className="w-full p-2 border border-base-300"
                    />
                ) ) }
            </div>

        </Container>
    ) ;
} ;

export default MegamenuDemo ;
