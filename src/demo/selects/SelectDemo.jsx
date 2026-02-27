'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;

import Select from '@/components/selects/Select' ;

const SelectDemo = () =>
{
    const [ controlledValue, setControlledValue ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Simple Select */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Simple Select</h3>

                <Select>
                    <option disabled value="">Pick a color</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </Select>
            </div>

            {/* With Label */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Label</h3>

                <Select label="Favorite Color">
                    <option disabled value="">Pick a color</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </Select>
            </div>

            {/* Ghost Style */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Ghost Style (No Background)</h3>

                <Select label="Font Family" style="ghost">
                    <option disabled value="">Pick a font</option>
                    <option>Inter</option>
                    <option>Poppins</option>
                    <option>Raleway</option>
                </Select>
            </div>

            {/* With Fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldset and Helper</h3>

                <Select useFieldset legend="Browser" helper="Choose your default browser">
                    <option disabled value="">Pick a browser</option>
                    <option>Chrome</option>
                    <option>Firefox</option>
                    <option>Safari</option>
                    <option>Edge</option>
                </Select>
            </div>

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Colors</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="Primary" color="primary">
                        <option disabled value="">Pick a text editor</option>
                        <option>VSCode</option>
                        <option>VSCode Fork</option>
                        <option>Another VSCode Fork</option>
                    </Select>

                    <Select label="Secondary" color="secondary">
                        <option disabled value="">Pick a language</option>
                        <option>Zig</option>
                        <option>Go</option>
                        <option>Rust</option>
                    </Select>

                    <Select label="Accent" color="accent">
                        <option disabled value="">Color scheme</option>
                        <option>Light mode</option>
                        <option>Dark mode</option>
                        <option>System</option>
                    </Select>

                    <Select label="Neutral" color="neutral">
                        <option disabled value="">Server location</option>
                        <option>North America</option>
                        <option>EU West</option>
                        <option>South East Asia</option>
                    </Select>

                    <Select label="Info" color="info">
                        <option disabled value="">Pick a Framework</option>
                        <option>React</option>
                        <option>Vue</option>
                        <option>Angular</option>
                    </Select>

                    <Select label="Success" color="success">
                        <option disabled value="">Pick a Runtime</option>
                        <option>npm</option>
                        <option>Bun</option>
                        <option>yarn</option>
                    </Select>

                    <Select label="Warning" color="warning">
                        <option disabled value="">Pick an OS</option>
                        <option>Windows</option>
                        <option>MacOS</option>
                        <option>Linux</option>
                    </Select>

                    <Select label="Error" color="error">
                        <option disabled value="">Pick an AI Model</option>
                        <option>GPT-4</option>
                        <option>Claude</option>
                        <option>Llama</option>
                    </Select>
                </div>
            </div>

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Sizes</h3>

                <div className="flex flex-col items-center gap-4">
                    <Select size="xs" label="Extra Small">
                        <option disabled value="">Xsmall</option>
                        <option>Xsmall Apple</option>
                        <option>Xsmall Orange</option>
                        <option>Xsmall Tomato</option>
                    </Select>

                    <Select size="sm" label="Small">
                        <option disabled value="">Small</option>
                        <option>Small Apple</option>
                        <option>Small Orange</option>
                        <option>Small Tomato</option>
                    </Select>

                    <Select size="md" label="Medium (Default)">
                        <option disabled value="">Medium</option>
                        <option>Medium Apple</option>
                        <option>Medium Orange</option>
                        <option>Medium Tomato</option>
                    </Select>

                    <Select size="lg" label="Large">
                        <option disabled value="">Large</option>
                        <option>Large Apple</option>
                        <option>Large Orange</option>
                        <option>Large Tomato</option>
                    </Select>

                    <Select size="xl" label="Extra Large">
                        <option disabled value="">Xlarge</option>
                        <option>Xlarge Apple</option>
                        <option>Xlarge Orange</option>
                        <option>Xlarge Tomato</option>
                    </Select>
                </div>
            </div>

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled</h3>

                <Select label="Disabled Select" disabled>
                    <option>You can't touch this</option>
                </Select>
            </div>

            {/* With Error */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Error</h3>

                <Select label="Country" error="Please select a country" required>
                    <option disabled value="">Select a country</option>
                    <option>France</option>
                    <option>USA</option>
                    <option>Japan</option>
                </Select>
            </div>

            {/* With Helper Text */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Helper Text</h3>

                <Select label="Theme" helper="This will affect your entire experience">
                    <option disabled value="">Select theme</option>
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                </Select>
            </div>

            {/* With Actions */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Action Button</h3>

                <Select
                    label="Filter"
                    actions={
                        <button
                            className="btn btn-square btn-input"
                            onClick={() => alert('Clear filter')}
                        >
                            ✕
                        </button>
                    }
                >
                    <option disabled value="">Select filter</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Completed</option>
                </Select>
            </div>

            {/* Controlled Component */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Controlled Component</h3>

                <Select
                    label="Programming Language"
                    value={ controlledValue }
                    onChange={ (e) => setControlledValue( e.target.value ) }
                    helper={ controlledValue ? `You selected: ${controlledValue}` : 'No selection yet' }
                >
                    <option value="">Select a language</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="rust">Rust</option>
                    <option value="go">Go</option>
                </Select>

                { controlledValue && (
                    <div className="alert alert-info">
                        <span>Current value: <strong>{ controlledValue }</strong></span>
                    </div>
                )}
            </div>

            {/* With Validator */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With HTML5 Validation</h3>

                <Select
                    label="Required Field"
                    useValidator
                    validatorHint="This field is required"
                    required
                >
                    <option value="">Please select an option</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </Select>
            </div>

            {/* Native Appearance */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Native OS Style (appearance-none)</h3>

                <Select label="Native Dropdown" className="[&_select]:appearance-none">
                    <option disabled value="">Pick a color</option>
                    <option>Crimson</option>
                    <option>Amber</option>
                    <option>Velvet</option>
                </Select>
            </div>

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Form with multiple selects */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h4 className="card-title">User Profile</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select label="Country" required>
                                <option value="">Select country</option>
                                <option>France</option>
                                <option>USA</option>
                                <option>Japan</option>
                                <option>Canada</option>
                            </Select>

                            <Select label="Language" color="primary">
                                <option value="">Select language</option>
                                <option>English</option>
                                <option>Français</option>
                                <option>日本語</option>
                            </Select>

                            <Select label="Timezone" color="secondary">
                                <option value="">Select timezone</option>
                                <option>UTC-8 (PST)</option>
                                <option>UTC+0 (GMT)</option>
                                <option>UTC+1 (CET)</option>
                                <option>UTC+9 (JST)</option>
                            </Select>

                            <Select label="Theme Preference" color="accent">
                                <option value="">Auto</option>
                                <option>Light</option>
                                <option>Dark</option>
                            </Select>
                        </div>

                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-primary">Save Profile</button>
                        </div>
                    </div>
                </div>

                {/* Inline with other inputs */}
                <div className="flex flex-wrap gap-4 items-end">
                    <Select label="Sort by" size="sm" className="w-48">
                        <option>Name</option>
                        <option>Date</option>
                        <option>Size</option>
                    </Select>

                    <Select label="Order" size="sm" className="w-32">
                        <option>Asc</option>
                        <option>Desc</option>
                    </Select>

                    <button className="btn btn-primary btn-sm">Apply</button>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default SelectDemo ;