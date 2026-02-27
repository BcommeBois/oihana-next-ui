'use client' ;

import Badge        from '@/components/Badge' ;
import Button       from '@/components/Button' ;
import Divider      from '@/components/Divider' ;
import NetworkState , { XS , SM , MD , LG , XL } from '@/components/net/NetworkState' ;

import Container from '@/display/Container' ;

const NetworkStateDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Network State Examples</h2>

            {/* Basic Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Basic Sizes
                </h3>

                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ XS } />
                        <code className="badge badge-sm">xs</code>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ SM } />
                        <code className="badge badge-sm">sm</code>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ MD } />
                        <code className="badge badge-sm">md</code>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ LG } />
                        <code className="badge badge-sm">lg</code>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ XL } />
                        <code className="badge badge-sm">xl</code>
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;NetworkState size="xs" /&gt;</code></pre>
                    <pre data-prefix="2"><code>&lt;NetworkState size="sm" /&gt;</code></pre>
                    <pre data-prefix="3"><code>&lt;NetworkState size="md" /&gt;</code></pre>
                    <pre data-prefix="4"><code>&lt;NetworkState size="lg" /&gt;</code></pre>
                    <pre data-prefix="5"><code>&lt;NetworkState size="xl" /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* With Network Type Icon */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    With Network Type Icon
                </h3>

                <p className="text-sm opacity-70">
                    Shows the connection type (WiFi, Cellular, Ethernet, Bluetooth, etc.)
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ XS } showType />
                        <code className="badge badge-sm">xs</code>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ SM } showType />
                        <code className="badge badge-sm">sm</code>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ MD } showType />
                        <code className="badge badge-sm">md</code>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ LG } showType />
                        <code className="badge badge-sm">lg</code>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <NetworkState size={ XL } showType />
                        <code className="badge badge-sm">xl</code>
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;NetworkState size="md" showType /&gt;</code></pre>
                </div>

                <div className="alert alert-info">
                    <span className="text-sm">
                        💡 The network type icon automatically detects your connection: WiFi 📶, Cellular 📱, Ethernet 🔌, Bluetooth 🔵, etc.
                    </span>
                </div>
            </div>

            <Divider />

            {/* Custom Text Labels */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Custom Text Labels
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Default texts</code>
                        <div className="flex items-center gap-2">
                            <NetworkState size={ LG } />
                            <span className="text-sm">Hover to see tooltip</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Custom texts</code>
                        <div className="flex items-center gap-2">
                            <NetworkState
                                size={ LG }
                                onlineText="Connected"
                                offlineText="Disconnected"
                            />
                            <span className="text-sm">Hover to see tooltip</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">French texts</code>
                        <div className="flex items-center gap-2">
                            <NetworkState
                                size={ LG }
                                onlineText="Connecté"
                                offlineText="Déconnecté"
                                onlineLabel="Réseau en ligne"
                                offlineLabel="Réseau hors ligne"
                            />
                            <span className="text-sm">Survoler pour voir l'info-bulle</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Status text</code>
                        <div className="flex items-center gap-2">
                            <NetworkState
                                size={ LG }
                                showType
                                onlineText="System Online"
                                offlineText="System Offline"
                            />
                            <span className="text-sm">Hover to see tooltip</span>
                        </div>
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;NetworkState</code></pre>
                    <pre data-prefix="2"><code>    onlineText="Connected"</code></pre>
                    <pre data-prefix="3"><code>    offlineText="Disconnected"</code></pre>
                    <pre data-prefix="4"><code>    onlineLabel="Network online"</code></pre>
                    <pre data-prefix="5"><code>    offlineLabel="Network offline"</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Real-World Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Real-World Use Cases
                </h3>

                {/* Navbar */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">1. Navigation Bar</h4>
                    <div className="navbar bg-base-100 rounded-box shadow-md">
                        <div className="flex-1">
                            <a className="btn btn-ghost text-xl">Oihana</a>
                        </div>
                        <div className="flex-none gap-2">
                            <Button size="sm" color="ghost">
                                Dashboard
                            </Button>
                            <Button size="sm" color="ghost">
                                Settings
                            </Button>
                            <NetworkState size={ SM } showType />
                        </div>
                    </div>
                </div>

                {/* Status Card */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">2. System Status Card</h4>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title">System Status</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Network</span>
                                    <NetworkState
                                        size={ SM }
                                        showType
                                        onlineText="Connected"
                                        offlineText="Disconnected"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">API Server</span>
                                    <Badge color="success">Operational</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Database</span>
                                    <Badge color="success">Operational</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">3. Footer with Connection Status</h4>
                    <footer className="footer footer-center bg-base-100 text-base-content rounded-box p-4 shadow-md">
                        <aside className="flex items-center gap-2">
                            <NetworkState size={ XS } />
                            <p className="text-sm">© 2026 Oihana - All rights reserved</p>
                        </aside>
                    </footer>
                </div>

                {/* Alert/Banner */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">4. Connection Alert Banner</h4>
                    <div className="alert alert-warning">
                        <NetworkState size={ SM } />
                        <div>
                            <h3 className="font-bold">Limited Connectivity</h3>
                            <div className="text-xs">Some features may be unavailable offline</div>
                        </div>
                    </div>
                </div>

                {/* Badge Integration */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">5. Badge with Network Status</h4>
                    <div className="flex gap-2 flex-wrap">
                        <Badge color="primary" className="gap-2">
                            <NetworkState size={ XS } />
                            <span>Live</span>
                        </Badge>

                        <Badge color="neutral" className="gap-2">
                            <NetworkState size={ XS } showType />
                            <span>Connected</span>
                        </Badge>

                        <Badge color="ghost" className="gap-2">
                            <NetworkState size={ XS } />
                            <span>WiFi</span>
                        </Badge>
                    </div>
                </div>

                {/* User Menu */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">6. User Menu Dropdown</h4>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={ 0 } role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src="https://i.pravatar.cc/150?img=1"
                                    alt="User avatar"
                                />
                            </div>
                        </div>
                        <ul tabIndex={ 0 } className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <Badge size="sm">New</Badge>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li className="border-t border-base-300 mt-2 pt-2">
                                <div className="flex items-center justify-between cursor-default">
                                    <span>Connection</span>
                                    <NetworkState size={ XS } showType />
                                </div>
                            </li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code><span className="text-success">// Navbar</span></code></pre>
                    <pre data-prefix="2"><code>&lt;NetworkState size="sm" showType /&gt;</code></pre>
                    <pre data-prefix="3"><code></code></pre>
                    <pre data-prefix="4"><code><span className="text-success">// Footer</span></code></pre>
                    <pre data-prefix="5"><code>&lt;NetworkState size="xs" /&gt;</code></pre>
                    <pre data-prefix="6"><code></code></pre>
                    <pre data-prefix="7"><code><span className="text-success">// Badge</span></code></pre>
                    <pre data-prefix="8"><code>&lt;Badge className="gap-2"&gt;</code></pre>
                    <pre data-prefix="9"><code>    &lt;NetworkState size="xs" /&gt;</code></pre>
                    <pre data-prefix="10"><code>    &lt;span&gt;Live&lt;/span&gt;</code></pre>
                    <pre data-prefix="11"><code>&lt;/Badge&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Interactive Demo */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    Interactive Demo
                </h3>

                <div className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <h3 className="font-bold">Test Connection Status</h3>
                        <div className="text-xs">Try toggling your network connection on/off to see the indicator change in real-time!</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center">
                            <NetworkState size={ XL } showType />
                            <h3 className="card-title text-lg">Current Status</h3>
                            <p className="text-sm opacity-70">The indicator reflects your actual network state</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h3 className="card-title text-base">Network Details</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="opacity-70">Status:</span>
                                    <NetworkState size={ SM } />
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-70">Type:</span>
                                    <NetworkState size={ SM } showType />
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-70">Detection:</span>
                                    <Badge size="sm" color="success">Real-time</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Props Reference */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Props Reference
                </h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Prop</th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code className="text-xs">size</code></td>
                                <td>string</td>
                                <td>'md'</td>
                                <td>Size variant: xs, sm, md, lg, xl</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">showType</code></td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Show network type icon (WiFi, Cellular, etc.)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onlineText</code></td>
                                <td>string</td>
                                <td>'Online'</td>
                                <td>Tooltip text when online</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">offlineText</code></td>
                                <td>string</td>
                                <td>'Offline'</td>
                                <td>Tooltip text when offline</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onlineLabel</code></td>
                                <td>string</td>
                                <td>'Network online'</td>
                                <td>Aria-label when online (accessibility)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">offlineLabel</code></td>
                                <td>string</td>
                                <td>'Network offline'</td>
                                <td>Aria-label when offline (accessibility)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">path</code></td>
                                <td>string</td>
                                <td>-</td>
                                <td>i18n path for labels (e.g., "network.status")</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">className</code></td>
                                <td>string</td>
                                <td>-</td>
                                <td>Additional CSS classes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <Divider />

            {/* Features */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <h4 className="font-bold">Real-time Detection</h4>
                            <p className="text-xs">Automatically detects online/offline state using browser APIs</p>
                        </div>
                    </div>

                    <div className="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-success shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                            <h4 className="font-bold">SSR Safe</h4>
                            <p className="text-xs">No hydration mismatch - defaults to online until mounted</p>
                        </div>
                    </div>

                    <div className="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-warning shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <div>
                            <h4 className="font-bold">Network Type</h4>
                            <p className="text-xs">Detects WiFi, Cellular, Ethernet, Bluetooth, and more</p>
                        </div>
                    </div>

                    <div className="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                        </svg>
                        <div>
                            <h4 className="font-bold">i18n Support</h4>
                            <p className="text-xs">Full internationalization with custom path support</p>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default NetworkStateDemo ;