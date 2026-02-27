'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Badge     from '@/components/Badge' ;
import Divider   from '@/components/Divider' ;
import Range     from '@/components/ranges/Range' ;

const RangeDemo = () =>
{
    const [ volume, setVolume ] = useState( 50 ) ;
    const [ price, setPrice ] = useState( 500 ) ;
    const [ rating, setRating ] = useState( 3 ) ;
    const [ temperature, setTemperature ] = useState( 20 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Range Slider Examples</h2>

            {/* Simple Range */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Simple Range</h3>
                <Range defaultValue={40} />
            </div>

            <Divider />

            {/* With Label */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Label</h3>

                <Range label="Volume" defaultValue={50} />
            </div>

            <Divider />

            {/* Show Value - Different Positions */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Show Value (Positions)</h3>

                <Range
                    label="Volume (top)"
                    value={ volume }
                    onChange={ setVolume }
                    showValue
                    valuePosition="top"
                    color="primary"
                />

                <Range
                    label="Volume (inline)"
                    value={ volume }
                    onChange={ setVolume }
                    showValue
                    valuePosition="inline"
                    color="secondary"
                />

                <Range
                    label="Volume (bottom)"
                    value={ volume }
                    onChange={ setVolume }
                    showValue
                    valuePosition="bottom"
                    color="accent"
                />
            </div>

            <Divider />

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Sizes</h3>

                <div className="flex flex-col gap-4">
                    <Range label="Extra Small" size="xs" defaultValue={30} />
                    <Range label="Small" size="sm" defaultValue={40} />
                    <Range label="Medium (Default)" size="md" defaultValue={50} />
                    <Range label="Large" size="lg" defaultValue={60} />
                    <Range label="Extra Large" size="xl" defaultValue={70} />
                </div>
            </div>

            <Divider />

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Colors</h3>

                <div className="flex flex-col gap-3">
                    <Range label="Primary" color="primary" defaultValue={40} />
                    <Range label="Secondary" color="secondary" defaultValue={40} />
                    <Range label="Accent" color="accent" defaultValue={40} />
                    <Range label="Neutral" color="neutral" defaultValue={40} />
                    <Range label="Info" color="info" defaultValue={40} />
                    <Range label="Success" color="success" defaultValue={40} />
                    <Range label="Warning" color="warning" defaultValue={40} />
                    <Range label="Error" color="error" defaultValue={40} />
                </div>
            </div>

            <Divider />

            {/* With Steps and Markers */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Steps and Markers</h3>

                <Range
                    label="Rating (1-5)"
                    min={ 0 }
                    max={ 5 }
                    step={ 1 }
                    value={ rating }
                    onChange={ setRating }
                    showValue
                    showMarkers
                    markerLabels={[ '0', '1', '2', '3', '4', '5' ]}
                    color="warning"
                />

                <Range
                    label="Quarters"
                    min={ 0 }
                    max={ 100 }
                    step={ 25 }
                    defaultValue={ 25 }
                    showMarkers
                    markerLabels={[ '0', '25', '50', '75', '100' ]}
                    color="primary"
                />
            </div>

            <Divider />

            {/* Custom Format */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Format</h3>

                <Range
                    label="Price"
                    min={ 0 }
                    max={ 1000 }
                    step={ 50 }
                    value={ price }
                    onChange={ setPrice }
                    showValue
                    formatValue={ (v) => `$${v}` }
                    color="success"
                />

                <Range
                    label="Temperature"
                    min={ -10 }
                    max={ 40 }
                    step={ 1 }
                    value={ temperature }
                    onChange={ setTemperature }
                    showValue
                    formatValue={ (v) => `${v}°C` }
                    color="error"
                />

                <Range
                    label="Percentage"
                    min={ 0 }
                    max={ 100 }
                    step={ 5 }
                    defaultValue={ 75 }
                    showValue
                    formatValue={ (v) => `${v}%` }
                    color="info"
                />
            </div>

            <Divider />

            {/* With Helper Text */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Helper Text</h3>

                <Range
                    label="Brightness"
                    helper="Adjust screen brightness"
                    defaultValue={ 80 }
                    showValue
                    color="primary"
                />

                <Range
                    label="Volume"
                    helper="Volume level from 0 to 100"
                    defaultValue={ 50 }
                    showValue
                    valuePosition="inline"
                    color="secondary"
                />
            </div>

            <Divider />

            {/* With Error */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Error</h3>

                <Range
                    label="Budget"
                    error="Value must be at least $500"
                    defaultValue={ 200 }
                    min={ 0 }
                    max={ 1000 }
                    showValue
                    formatValue={ (v) => `$${v}` }
                />
            </div>

            <Divider />

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled</h3>

                <Range label="Disabled Range" defaultValue={ 50 } disabled />
            </div>

            <Divider />

            {/* Controlled Range */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Controlled Range</h3>

                <Range
                    label="Volume Control"
                    value={ volume }
                    onChange={ setVolume }
                    showValue
                    valuePosition="inline"
                    color="primary"
                />

                <div className="flex items-center gap-2">
                    <span>Current value:</span>
                    <Badge color="primary">{ volume }</Badge>
                </div>

                <div className="flex gap-2">
                    <button className="btn btn-sm" onClick={() => setVolume( Math.max( 0, volume - 10 ))}>
                        - 10
                    </button>
                    <button className="btn btn-sm" onClick={() => setVolume( Math.min( 100, volume + 10 ))}>
                        + 10
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => setVolume( 0 )}>
                        Mute
                    </button>
                    <button className="btn btn-sm btn-success" onClick={() => setVolume( 100 )}>
                        Max
                    </button>
                </div>
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Settings panel */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Audio Settings</h2>

                        <div className="flex flex-col gap-4">
                            <Range
                                label="🔊 Volume"
                                min={ 0 }
                                max={ 100 }
                                defaultValue={ 70 }
                                showValue
                                valuePosition="inline"
                                formatValue={ (v) => `${v}%` }
                                color="primary"
                            />

                            <Range
                                label="🎵 Bass"
                                min={ -10 }
                                max={ 10 }
                                defaultValue={ 0 }
                                showValue
                                valuePosition="inline"
                                formatValue={ (v) => v > 0 ? `+${v}` : `${v}` }
                                color="success"
                            />

                            <Range
                                label="🎼 Treble"
                                min={ -10 }
                                max={ 10 }
                                defaultValue={ 0 }
                                showValue
                                valuePosition="inline"
                                formatValue={ (v) => v > 0 ? `+${v}` : `${v}` }
                                color="info"
                            />

                            <Range
                                label="⚖️ Balance"
                                min={ -10 }
                                max={ 10 }
                                defaultValue={ 0 }
                                showValue
                                valuePosition="inline"
                                formatValue={ (v) =>
                                    v === 0 ? 'Center' :
                                    v < 0 ? `L ${Math.abs(v)}` :
                                    `R ${v}`
                                }
                                color="secondary"
                            />
                        </div>
                    </div>
                </div>

                {/* Product filter */}
                <div className="card bg-base-100 shadow-xl max-w-sm">
                    <div className="card-body">
                        <h2 className="card-title">Filter Products</h2>

                        <div className="flex flex-col gap-4">
                            <Range
                                label="Price Range"
                                min={ 0 }
                                max={ 5000 }
                                step={ 100 }
                                defaultValue={ 2500 }
                                showValue
                                formatValue={ (v) => `€${v}` }
                                helper="Maximum price"
                                color="success"
                            />

                            <Range
                                label="Rating"
                                min={ 0 }
                                max={ 5 }
                                step={ 1 }
                                defaultValue={ 3 }
                                showValue
                                showMarkers
                                markerLabels={[ '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐', '' ]}
                                formatValue={ (v) => `${v}+ stars` }
                                color="warning"
                            />

                            <button className="btn btn-primary">Apply Filters</button>
                        </div>
                    </div>
                </div>

                {/* Survey */}
                <div className="card bg-base-100 shadow-xl max-w-lg">
                    <div className="card-body">
                        <h2 className="card-title">Customer Satisfaction Survey</h2>

                        <div className="flex flex-col gap-4">
                            <Range
                                label="How satisfied are you with our service?"
                                min={ 0 }
                                max={ 10 }
                                step={ 1 }
                                defaultValue={ 7 }
                                showValue
                                showMarkers
                                markerLabels={[ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]}
                                color="primary"
                            />

                            <Range
                                label="How likely are you to recommend us?"
                                min={ 0 }
                                max={ 10 }
                                step={ 1 }
                                defaultValue={ 8 }
                                showValue
                                showMarkers
                                helper="0 = Not at all likely, 10 = Extremely likely"
                                color="success"
                            />

                            <button className="btn btn-primary">Submit Survey</button>
                        </div>
                    </div>
                </div>

                {/* Image editor */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Image Adjustments</h2>

                        <div className="flex flex-col gap-4">
                            <Range
                                label="Brightness"
                                min={ -100 }
                                max={ 100 }
                                defaultValue={ 0 }
                                showValue
                                valuePosition="inline"
                                color="warning"
                            />

                            <Range
                                label="Contrast"
                                min={ -100 }
                                max={ 100 }
                                defaultValue={ 0 }
                                showValue
                                valuePosition="inline"
                                color="info"
                            />

                            <Range
                                label="Saturation"
                                min={ 0 }
                                max={ 200 }
                                defaultValue={ 100 }
                                showValue
                                valuePosition="inline"
                                formatValue={ (v) => `${v}%` }
                                color="secondary"
                            />

                            <Range
                                label="Blur"
                                min={ 0 }
                                max={ 20 }
                                step={ 1 }
                                defaultValue={ 0 }
                                showValue
                                valuePosition="inline"
                                formatValue={ (v) => `${v}px` }
                                color="accent"
                            />

                            <div className="flex gap-2">
                                <button className="btn btn-sm btn-primary flex-1">Apply</button>
                                <button className="btn btn-sm btn-info">Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default RangeDemo ;