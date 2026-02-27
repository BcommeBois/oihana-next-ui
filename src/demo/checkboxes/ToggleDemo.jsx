'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Badge     from '@/components/Badge' ;
import Divider   from '@/components/Divider' ;
import Toggle    from '@/components/checkboxes/Toggle' ;

const ToggleDemo = () =>
{
    const [ darkMode, setDarkMode ] = useState( false ) ;
    const [ notifications, setNotifications ] = useState( true ) ;
    const [ settings, setSettings ] = useState({
        autosave: true,
        analytics: false,
        marketing: false,
    }) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Simple Toggle */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Simple Toggle</h3>

                <Toggle label="Dark mode" defaultChecked />
                <Toggle label="Enable notifications" />
            </div>

            <Divider />

            {/* Label Position */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Label Position</h3>

                <div className="flex flex-col gap-3">
                    <Toggle label="Label on left (default)" labelPosition="left" defaultChecked />
                    <Toggle label="Label on right" labelPosition="right" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Sizes</h3>

                <div className="flex flex-col gap-3">
                    <Toggle label="Extra Small" size="xs" defaultChecked />
                    <Toggle label="Small" size="sm" defaultChecked />
                    <Toggle label="Medium (Default)" size="md" defaultChecked />
                    <Toggle label="Large" size="lg" defaultChecked />
                    <Toggle label="Extra Large" size="xl" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Colors</h3>

                <div className="flex flex-col gap-3">
                    <Toggle label="Primary" color="primary" defaultChecked />
                    <Toggle label="Secondary" color="secondary" defaultChecked />
                    <Toggle label="Accent" color="accent" defaultChecked />
                    <Toggle label="Neutral" color="neutral" defaultChecked />
                    <Toggle label="Info" color="info" defaultChecked />
                    <Toggle label="Success" color="success" defaultChecked />
                    <Toggle label="Warning" color="warning" defaultChecked />
                    <Toggle label="Error" color="error" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* With Helper Text */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Helper Text</h3>

                <Toggle
                    label="Auto-save"
                    helper="Automatically save your work every 5 minutes"
                />

                <Toggle
                    label="Two-factor authentication"
                    helper="Add an extra layer of security to your account"
                    color="success"
                />
            </div>

            <Divider />

            {/* With Error */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Error</h3>

                <Toggle
                    label="Accept cookies"
                    error="You must accept cookies to continue"
                />

                <Toggle
                    label="Enable location"
                    error="Location access is required for this feature"
                />
            </div>

            <Divider />

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled</h3>

                <div className="flex flex-col gap-3">
                    <Toggle label="Disabled off" disabled />
                    <Toggle label="Disabled on" disabled defaultChecked />
                </div>
            </div>

            <Divider />

            {/* Indeterminate */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Indeterminate State</h3>

                <Toggle
                    label="Partial sync"
                    indeterminate
                    color="primary"
                />

                <p className="text-sm text-base-content/70">
                    Indeterminate state can represent partial or loading states
                </p>
            </div>

            <Divider />

            {/* Controlled Toggle */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Controlled Toggle</h3>

                <Toggle
                    label="Dark Mode"
                    checked={ darkMode }
                    onChange={ (e) => setDarkMode( e.target.checked ) }
                    color="primary"
                />

                <div className="flex items-center gap-2">
                    <span>Current state:</span>
                    <Badge color={ darkMode ? 'success' : 'neutral' }>
                        { darkMode ? 'ON' : 'OFF' }
                    </Badge>
                </div>

                <div className="flex gap-2">
                    <button className="btn btn-sm" onClick={() => setDarkMode( true )}>
                        Turn ON
                    </button>
                    <button className="btn btn-sm" onClick={() => setDarkMode( false )}>
                        Turn OFF
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={() => setDarkMode( !darkMode )}>
                        Toggle
                    </button>
                </div>
            </div>

            <Divider />

            {/* Multiple Toggles - Vertical */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Multiple Toggles (Vertical)</h3>

                <fieldset className="fieldset bg-base-100 p-4 rounded-box border border-base-300">
                    <legend className="fieldset-legend">Privacy Settings</legend>

                    <div className="flex flex-col gap-2">
                        <Toggle
                            label="Auto-save"
                            checked={ settings.autosave }
                            onChange={ (e) => setSettings({ ...settings, autosave: e.target.checked }) }
                            color="primary"
                        />
                        <Toggle
                            label="Analytics"
                            checked={ settings.analytics }
                            onChange={ (e) => setSettings({ ...settings, analytics: e.target.checked }) }
                            color="primary"
                        />
                        <Toggle
                            label="Marketing emails"
                            checked={ settings.marketing }
                            onChange={ (e) => setSettings({ ...settings, marketing: e.target.checked }) }
                            color="primary"
                        />
                    </div>
                </fieldset>
            </div>

            <Divider />

            {/* Multiple Toggles - Grid */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Multiple Toggles (Grid)</h3>

                <fieldset className="fieldset bg-base-100 p-4 rounded-box border border-base-300">
                    <legend className="fieldset-legend">Feature Flags</legend>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Toggle label="Dark Theme" defaultChecked color="primary" />
                        <Toggle label="Compact Mode" color="primary" />
                        <Toggle label="Animations" defaultChecked color="primary" />
                        <Toggle label="Sound Effects" color="primary" />
                        <Toggle label="Beta Features" color="warning" />
                        <Toggle label="Developer Mode" color="error" />
                    </div>
                </fieldset>
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Settings panel */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Account Settings</h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">Email notifications</p>
                                    <p className="text-sm text-base-content/70">Receive updates via email</p>
                                </div>
                                <Toggle
                                    checked={ notifications }
                                    onChange={ (e) => setNotifications( e.target.checked ) }
                                    color="primary"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">Dark mode</p>
                                    <p className="text-sm text-base-content/70">Use dark theme</p>
                                </div>
                                <Toggle defaultChecked color="primary" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold">Auto-play videos</p>
                                    <p className="text-sm text-base-content/70">Videos play automatically</p>
                                </div>
                                <Toggle color="primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature comparison */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Quick Settings</h2>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="card bg-base-200">
                                <div className="card-body items-center text-center p-4">
                                    <span className="text-2xl">🌙</span>
                                    <p className="text-sm font-semibold">Dark Mode</p>
                                    <Toggle size="sm" defaultChecked color="primary" />
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body items-center text-center p-4">
                                    <span className="text-2xl">🔔</span>
                                    <p className="text-sm font-semibold">Notifications</p>
                                    <Toggle size="sm" defaultChecked color="success" />
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body items-center text-center p-4">
                                    <span className="text-2xl">🔊</span>
                                    <p className="text-sm font-semibold">Sound</p>
                                    <Toggle size="sm" color="accent" />
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body items-center text-center p-4">
                                    <span className="text-2xl">✈️</span>
                                    <p className="text-sm font-semibold">Airplane</p>
                                    <Toggle size="sm" color="warning" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile-style settings */}
                <div className="card bg-base-100 shadow-xl max-w-sm">
                    <div className="card-body p-0">
                        <h2 className="card-title px-6 pt-6">Privacy</h2>

                        <div className="menu">
                            <li>
                                <div className="flex items-center justify-between">
                                    <span>Location Services</span>
                                    <Toggle size="sm" defaultChecked color="primary" />
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center justify-between">
                                    <span>Camera Access</span>
                                    <Toggle size="sm" defaultChecked color="primary" />
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center justify-between">
                                    <span>Microphone</span>
                                    <Toggle size="sm" color="primary" />
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center justify-between">
                                    <span>Contacts</span>
                                    <Toggle size="sm" color="primary" />
                                </div>
                            </li>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default ToggleDemo ;