'use client' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Aura      from '@/components/Aura' ;

/**
 * Aura showcase — variants, sizes, custom colours, hover trigger and duration.
 */
const AuraDemo = () =>
{
    const variants = [ 'dual' , 'rainbow' , 'holo' , 'gold' , 'silver' , 'glow' ] ;
    const auraSizes = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Aura Examples</h2>

            {/* Default */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Default</h3>
                <div className="flex flex-wrap items-center gap-8">
                    <Aura>
                        <div className="card bg-base-100">
                            <div className="card-body"><p>This card has aura</p></div>
                        </div>
                    </Aura>
                    <Aura>
                        <button className="btn">button with aura</button>
                    </Aura>
                </div>
            </div>

            <Divider />

            {/* Variants */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Variants</h3>
                <div className="flex flex-wrap items-center gap-8">
                    { variants.map( ( variant ) => (
                        <Aura key={ variant } variant={ variant }>
                            <div className="card bg-base-100">
                                <div className="card-body"><p>{ variant }</p></div>
                            </div>
                        </Aura>
                    ) ) }
                </div>
            </div>

            <Divider />

            {/* Custom colour */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom colour & background</h3>
                <div className="flex flex-wrap items-center gap-8">
                    <Aura color="warning">
                        <div className="card bg-base-100 text-base-content">
                            <div className="card-body"><p>Custom colour</p></div>
                        </div>
                    </Aura>
                    <Aura color="primary" background="primary">
                        <div className="card bg-base-100 text-base-content">
                            <div className="card-body"><p>Colour + background</p></div>
                        </div>
                    </Aura>
                </div>
            </div>

            <Divider />

            {/* Hover trigger */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Trigger: hover</h3>
                <p className="text-sm text-base-content/70">The aura only lights up while hovering.</p>
                <div className="flex flex-wrap items-center gap-8">
                    <Aura trigger="hover" variant="rainbow">
                        <div className="card bg-base-100 text-base-content">
                            <div className="card-body"><p>Hover me (rainbow)</p></div>
                        </div>
                    </Aura>
                    <Aura trigger="hover" color="primary">
                        <button className="btn">Hover me</button>
                    </Aura>
                </div>
            </div>

            <Divider />

            {/* Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Sizes</h3>
                <div className="flex flex-wrap items-center gap-6">
                    { auraSizes.map( ( size ) => (
                        <Aura key={ size } size={ size }>
                            <button className="btn">{ size.toUpperCase() }</button>
                        </Aura>
                    ) ) }
                </div>
            </div>

            <Divider />

            {/* Custom duration */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom duration</h3>
                <div className="flex flex-wrap items-center gap-8">
                    <Aura variant="rainbow" duration={ 2000 }>
                        <div className="card bg-base-100">
                            <div className="card-body"><p>2000ms duration</p></div>
                        </div>
                    </Aura>
                    <Aura variant="rainbow" duration={ 10000 }>
                        <div className="card bg-base-100">
                            <div className="card-body"><p>10000ms duration</p></div>
                        </div>
                    </Aura>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default AuraDemo ;
