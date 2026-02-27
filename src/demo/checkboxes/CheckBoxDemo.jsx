'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Badge     from '@/components/Badge' ;
import Checkbox  from '@/components/checkboxes/Checkbox' ;
import Divider   from '@/components/Divider' ;

const CheckboxDemo = () =>
{
    const [ checked, setChecked ] = useState( true ) ;
    const [ terms, setTerms ] = useState( false ) ;
    const [ features, setFeatures ] = useState({
        notifications: true,
        updates: false,
        marketing: false,
    }) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Checkbox Examples</h2>

            {/* Simple Checkbox */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Simple Checkbox</h3>

                <Checkbox label="Remember me" defaultChecked />
                <Checkbox label="Accept terms and conditions" />
            </div>

            <Divider />

            {/* Label Position */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Label Position</h3>

                <div className="flex flex-col gap-3">
                    <Checkbox label="Label on right (default)" labelPosition="right" defaultChecked />
                    <Checkbox label="Label on left" labelPosition="left" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Sizes</h3>

                <div className="flex flex-col gap-3">
                    <Checkbox label="Extra Small" size="xs" defaultChecked />
                    <Checkbox label="Small" size="sm" defaultChecked />
                    <Checkbox label="Medium (Default)" size="md" defaultChecked />
                    <Checkbox label="Large" size="lg" defaultChecked />
                    <Checkbox label="Extra Large" size="xl" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Colors</h3>

                <div className="flex flex-col gap-3">
                    <Checkbox label="Primary" color="primary" defaultChecked />
                    <Checkbox label="Secondary" color="secondary" defaultChecked />
                    <Checkbox label="Accent" color="accent" defaultChecked />
                    <Checkbox label="Neutral" color="neutral" defaultChecked />
                    <Checkbox label="Info" color="info" defaultChecked />
                    <Checkbox label="Success" color="success" defaultChecked />
                    <Checkbox label="Warning" color="warning" defaultChecked />
                    <Checkbox label="Error" color="error" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* With Helper Text */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Helper Text</h3>

                <Checkbox
                    label="Subscribe to newsletter"
                    helper="You can unsubscribe at any time"
                />

                <Checkbox
                    label="Enable notifications"
                    helper="Receive alerts about important updates"
                    color="info"
                />
            </div>

            <Divider />

            {/* With Error */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Error</h3>

                <Checkbox
                    label="I accept the terms and conditions"
                    error="You must accept the terms to continue"
                />

                <Checkbox
                    label="Subscribe"
                    error="This field is required"
                />
            </div>

            <Divider />

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled</h3>

                <div className="flex flex-col gap-3">
                    <Checkbox label="Disabled unchecked" disabled />
                    <Checkbox label="Disabled checked" disabled defaultChecked />
                </div>
            </div>

            <Divider />

            {/* Indeterminate */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Indeterminate State</h3>

                <Checkbox
                    label="Select all"
                    indeterminate
                    color="primary"
                />

                <p className="text-sm text-base-content/70">
                    Indeterminate state is useful for "select all" checkboxes
                </p>
            </div>

            <Divider />

            {/* Controlled Checkbox */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Controlled Checkbox</h3>

                <Checkbox
                    label="Toggle me"
                    checked={ checked }
                    onChange={ (e) => setChecked( e.target.checked ) }
                    color="primary"
                />

                <div className="flex items-center gap-2">
                    <span>Current state:</span>
                    <Badge color={ checked ? 'success' : 'neutral' }>
                        { checked ? 'Checked' : 'Unchecked' }
                    </Badge>
                </div>

                <div className="flex gap-2">
                    <button className="btn btn-sm" onClick={() => setChecked( true )}>
                        Check
                    </button>
                    <button className="btn btn-sm" onClick={() => setChecked( false )}>
                        Uncheck
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={() => setChecked( !checked )}>
                        Toggle
                    </button>
                </div>
            </div>

            <Divider />

            {/* Multiple Checkboxes - Vertical */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Multiple Checkboxes (Vertical)</h3>

                <fieldset className="fieldset bg-base-100 p-4 rounded-box border border-base-300">
                    <legend className="fieldset-legend">Notification Preferences</legend>

                    <div className="flex flex-col gap-2">
                        <Checkbox
                            label="Email notifications"
                            checked={ features.notifications }
                            onChange={ (e) => setFeatures({ ...features, notifications: e.target.checked }) }
                        />
                        <Checkbox
                            label="Product updates"
                            checked={ features.updates }
                            onChange={ (e) => setFeatures({ ...features, updates: e.target.checked }) }
                        />
                        <Checkbox
                            label="Marketing emails"
                            checked={ features.marketing }
                            onChange={ (e) => setFeatures({ ...features, marketing: e.target.checked }) }
                        />
                    </div>
                </fieldset>
            </div>

            <Divider />

            {/* Multiple Checkboxes - Horizontal (Grid) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Multiple Checkboxes (Grid)</h3>

                <fieldset className="fieldset bg-base-100 p-4 rounded-box border border-base-300">
                    <legend className="fieldset-legend">Select Features</legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <Checkbox label="Dark Mode" defaultChecked color="primary" />
                        <Checkbox label="Analytics" color="primary" />
                        <Checkbox label="Auto-save" defaultChecked color="primary" />
                        <Checkbox label="2FA" color="primary" />
                        <Checkbox label="API Access" color="primary" />
                        <Checkbox label="Export Data" defaultChecked color="primary" />
                    </div>
                </fieldset>
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Login form */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Login</h2>

                        <div className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-primary"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-primary"
                            />

                            <Checkbox label="Remember me" size="sm" />

                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">Login</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms acceptance */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Sign Up</h2>

                        <div className="flex flex-col gap-4">
                            <Checkbox
                                label="I accept the terms and conditions"
                                checked={ terms }
                                onChange={ (e) => setTerms( e.target.checked ) }
                                error={ !terms ? 'You must accept to continue' : '' }
                                color="primary"
                            />

                            <button
                                className="btn btn-primary"
                                disabled={ !terms }
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter sidebar */}
                <div className="card bg-base-100 shadow-xl max-w-sm">
                    <div className="card-body">
                        <h2 className="card-title">Filters</h2>

                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="font-semibold mb-2">Category</p>
                                <div className="flex flex-col gap-2">
                                    <Checkbox label="Electronics" size="sm" defaultChecked />
                                    <Checkbox label="Furniture" size="sm" />
                                    <Checkbox label="Clothing" size="sm" defaultChecked />
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold mb-2">Price Range</p>
                                <div className="flex flex-col gap-2">
                                    <Checkbox label="Under $50" size="sm" />
                                    <Checkbox label="$50 - $100" size="sm" defaultChecked />
                                    <Checkbox label="Over $100" size="sm" />
                                </div>
                            </div>

                            <button className="btn btn-primary btn-sm">Apply Filters</button>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default CheckboxDemo ;