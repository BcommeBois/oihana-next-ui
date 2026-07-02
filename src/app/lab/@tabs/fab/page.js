'use client' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;
import FabDemo   from '@/demo/menus/FabDemo';

/**
 * FAB / Speed Dial lab page.
 *
 * Displays the FAB component with its variations.
 *
 * @param {Object} props
 */
const FabShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>


            <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                        FAB / Speed Dial
                    </h1>
                </div>
                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    A Floating Action Button that stays in a corner of the screen ; focusing or hovering it reveals additional Speed Dial buttons, vertically or in a quarter-circle arrangement.
                </p>
            </Container>

            <FabDemo />

        </Page>
    ) ;
} ;

export default FabShowcase ;
