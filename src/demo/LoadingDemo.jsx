'use client' ;

import Badge    from '@/components/Badge' ;
import Divider  from '@/components/Divider' ;
import Loading  from '@/components/Loading' ;

import Container from '@/display/Container' ;

const LoadingDemo = () =>
{
    const animations = [ 'spinner' , 'dots' , 'ring' , 'ball' , 'bars' , 'infinity' ] ;
    const sizes = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;
    const colors = [ 'primary' , 'secondary' , 'accent' , 'neutral' , 'info' , 'success' , 'warning' , 'error' ] ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Loading Examples</h2>

            {/* All Animations */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    All Animations
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    { animations.map( animation => (
                        <div key={ animation } className="flex flex-col items-center gap-3 p-4 bg-base-100 rounded-box shadow-sm">
                            <Loading animation={ animation } />
                            <code className="badge badge-sm capitalize">{ animation }</code>
                        </div>
                    ))}
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Loading animation="spinner" /&gt;</code></pre>
                    <pre data-prefix="2"><code>&lt;Loading animation="dots" /&gt;</code></pre>
                    <pre data-prefix="3"><code>&lt;Loading animation="ring" /&gt;</code></pre>
                    <pre data-prefix="4"><code>&lt;Loading animation="ball" /&gt;</code></pre>
                    <pre data-prefix="5"><code>&lt;Loading animation="bars" /&gt;</code></pre>
                    <pre data-prefix="6"><code>&lt;Loading animation="infinity" /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    All Sizes
                </h3>

                { animations.map( animation => (
                    <div key={ animation } className="flex flex-col gap-3">
                        <h4 className="font-semibold capitalize">{ animation }</h4>
                        <div className="flex items-center gap-6 flex-wrap">
                            { sizes.map( size => (
                                <div key={ size } className="flex flex-col items-center gap-2">
                                    <Loading animation={ animation } size={ size } />
                                    <code className="badge badge-xs uppercase">{ size }</code>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Loading animation="spinner" size="xs" /&gt;</code></pre>
                    <pre data-prefix="2"><code>&lt;Loading animation="spinner" size="sm" /&gt;</code></pre>
                    <pre data-prefix="3"><code>&lt;Loading animation="spinner" size="md" /&gt;</code></pre>
                    <pre data-prefix="4"><code>&lt;Loading animation="spinner" size="lg" /&gt;</code></pre>
                    <pre data-prefix="5"><code>&lt;Loading animation="spinner" size="xl" /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    All Colors
                </h3>

                { animations.map( animation => (
                    <div key={ animation } className="flex flex-col gap-3">
                        <h4 className="font-semibold capitalize">{ animation }</h4>
                        <div className="flex flex-wrap gap-4">
                            { colors.map( color => (
                                <div key={ color } className="flex flex-col items-center gap-2">
                                    <Loading animation={ animation } color={ color } />
                                    <code className="badge badge-xs capitalize">{ color }</code>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Loading animation="spinner" color="primary" /&gt;</code></pre>
                    <pre data-prefix="2"><code>&lt;Loading animation="spinner" color="secondary" /&gt;</code></pre>
                    <pre data-prefix="3"><code>&lt;Loading animation="spinner" color="success" /&gt;</code></pre>
                    <pre data-prefix="4"><code>&lt;Loading animation="spinner" color="error" /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Combinations */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Combinations
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="flex flex-col items-center gap-2 p-3 bg-base-100 rounded-box">
                        <Loading animation="spinner" size="xs" color="primary" />
                        <code className="text-xs">xs + primary</code>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-base-100 rounded-box">
                        <Loading animation="dots" size="sm" color="secondary" />
                        <code className="text-xs">sm + secondary</code>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-base-100 rounded-box">
                        <Loading animation="ring" size="md" color="accent" />
                        <code className="text-xs">md + accent</code>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-base-100 rounded-box">
                        <Loading animation="ball" size="lg" color="info" />
                        <code className="text-xs">lg + info</code>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-base-100 rounded-box">
                        <Loading animation="bars" size="xl" color="success" />
                        <code className="text-xs">xl + success</code>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-3 bg-base-100 rounded-box">
                        <Loading animation="infinity" size="lg" color="warning" />
                        <code className="text-xs">lg + warning</code>
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Loading animation="spinner" size="xs" color="primary" /&gt;</code></pre>
                    <pre data-prefix="2"><code>&lt;Loading animation="dots" size="lg" color="success" /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    Real-World Use Cases
                </h3>

                {/* In Buttons */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">1. In Buttons</h4>
                    <div className="flex flex-wrap gap-3">
                        <button className="btn btn-primary">
                            <Loading animation="spinner" size="sm" color="primary-content" />
                            Loading...
                        </button>
                        <button className="btn btn-secondary">
                            <Loading animation="dots" size="sm" color="secondary-content" />
                            Processing
                        </button>
                        <button className="btn btn-accent btn-square">
                            <Loading animation="ring" size="md" color="accent-content" />
                        </button>
                        <button className="btn btn-ghost" disabled>
                            <Loading animation="bars" size="sm" />
                            Disabled
                        </button>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;button className="btn btn-primary"&gt;</code></pre>
                        <pre data-prefix="2"><code>    &lt;Loading animation="spinner" size="sm" color="primary-content" /&gt;</code></pre>
                        <pre data-prefix="3"><code>    Loading...</code></pre>
                        <pre data-prefix="4"><code>&lt;/button&gt;</code></pre>
                    </div>
                </div>

                <Divider className="my-2" />

                {/* Centered in Card */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">2. Centered in Card</h4>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex flex-col items-center gap-4 py-8">
                                <Loading animation="spinner" size="xl" color="primary" />
                                <p className="text-center font-medium">Loading content...</p>
                                <p className="text-sm opacity-70">Please wait a moment</p>
                            </div>
                        </div>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;div className="card-body"&gt;</code></pre>
                        <pre data-prefix="2"><code>    &lt;div className="flex flex-col items-center gap-4"&gt;</code></pre>
                        <pre data-prefix="3"><code>        &lt;Loading animation="spinner" size="xl" color="primary" /&gt;</code></pre>
                        <pre data-prefix="4"><code>        &lt;p&gt;Loading content...&lt;/p&gt;</code></pre>
                        <pre data-prefix="5"><code>    &lt;/div&gt;</code></pre>
                        <pre data-prefix="6"><code>&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <Divider className="my-2" />

                {/* Inline with Text */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">3. Inline with Text</h4>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Loading animation="spinner" size="sm" color="info" />
                            <span>Fetching data from server...</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Loading animation="dots" size="sm" color="success" />
                            <span>Upload in progress...</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Loading animation="ring" size="sm" color="warning" />
                            <span>Processing payment...</span>
                        </div>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;div className="flex items-center gap-2"&gt;</code></pre>
                        <pre data-prefix="2"><code>    &lt;Loading animation="spinner" size="sm" color="info" /&gt;</code></pre>
                        <pre data-prefix="3"><code>    &lt;span&gt;Fetching data...&lt;/span&gt;</code></pre>
                        <pre data-prefix="4"><code>&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <Divider className="my-2" />

                {/* Full Page Overlay */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">4. Full Page Overlay</h4>
                    <div className="relative bg-base-300 rounded-lg h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-base-100/90 backdrop-blur-sm flex items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-4">
                                <Loading animation="infinity" size="xl" color="primary" />
                                <p className="text-lg font-semibold">Loading application...</p>
                                <p className="text-sm opacity-70">This won't take long</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg">Page Content</h3>
                            <p className="opacity-30">Lorem ipsum dolor sit amet...</p>
                        </div>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;div className="relative"&gt;</code></pre>
                        <pre data-prefix="2"><code>    &lt;div className="absolute inset-0 bg-base-100/90 backdrop-blur-sm"&gt;</code></pre>
                        <pre data-prefix="3"><code>        &lt;Loading animation="infinity" size="xl" color="primary" /&gt;</code></pre>
                        <pre data-prefix="4"><code>        &lt;p&gt;Loading application...&lt;/p&gt;</code></pre>
                        <pre data-prefix="5"><code>    &lt;/div&gt;</code></pre>
                        <pre data-prefix="6"><code>&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <Divider className="my-2" />

                {/* In Alerts */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">5. In Alerts</h4>
                    <div className="flex flex-col gap-2">
                        <div className="alert alert-info">
                            <Loading animation="spinner" color="info-content" size="sm" />
                            <span>Syncing your data...</span>
                        </div>

                        <div className="alert alert-warning">
                            <Loading animation="dots" color="warning-content" size="sm" />
                            <span>Processing your request...</span>
                        </div>

                        <div className="alert alert-success">
                            <Loading animation="ring" color="success-content" size="sm" />
                            <span>Upload in progress...</span>
                        </div>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;div className="alert alert-info"&gt;</code></pre>
                        <pre data-prefix="2"><code>    &lt;Loading animation="spinner" color="info-content" size="sm" /&gt;</code></pre>
                        <pre data-prefix="3"><code>    &lt;span&gt;Syncing your data...&lt;/span&gt;</code></pre>
                        <pre data-prefix="4"><code>&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <Divider className="my-2" />

                {/* Table Loading */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">6. Table Loading</h4>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <Loading animation="bars" size="lg" color="primary" />
                                            <span className="font-medium">Loading data...</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;tbody&gt;</code></pre>
                        <pre data-prefix="2"><code>    &lt;tr&gt;</code></pre>
                        <pre data-prefix="3"><code>        &lt;td colSpan="3" className="text-center"&gt;</code></pre>
                        <pre data-prefix="4"><code>            &lt;Loading animation="bars" size="lg" color="primary" /&gt;</code></pre>
                        <pre data-prefix="5"><code>            &lt;span&gt;Loading data...&lt;/span&gt;</code></pre>
                        <pre data-prefix="6"><code>        &lt;/td&gt;</code></pre>
                        <pre data-prefix="7"><code>    &lt;/tr&gt;</code></pre>
                        <pre data-prefix="8"><code>&lt;/tbody&gt;</code></pre>
                    </div>
                </div>

                <Divider className="my-2" />

                {/* With Badge */}
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold">7. With Badge</h4>
                    <div className="flex gap-3 flex-wrap">
                        <Badge color="primary" className="gap-2 px-4 py-3">
                            <Loading animation="spinner" size="xs" color="primary-content" />
                            <span>Processing</span>
                        </Badge>

                        <Badge color="info" className="gap-2 px-4 py-3">
                            <Loading animation="dots" size="xs" color="info-content" />
                            <span>Syncing</span>
                        </Badge>

                        <Badge color="success" className="gap-2 px-4 py-3">
                            <Loading animation="ring" size="xs" color="success-content" />
                            <span>Uploading</span>
                        </Badge>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;Badge color="primary" className="gap-2"&gt;</code></pre>
                        <pre data-prefix="2"><code>    &lt;Loading animation="spinner" size="xs" color="primary-content" /&gt;</code></pre>
                        <pre data-prefix="3"><code>    &lt;span&gt;Processing&lt;/span&gt;</code></pre>
                        <pre data-prefix="4"><code>&lt;/Badge&gt;</code></pre>
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
                                <td><code className="text-xs">animation</code></td>
                                <td>string</td>
                                <td>'spinner'</td>
                                <td>Animation type: spinner, dots, ring, ball, bars, infinity</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">size</code></td>
                                <td>string</td>
                                <td>'md'</td>
                                <td>Size: xs, sm, md, lg, xl</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">color</code></td>
                                <td>string</td>
                                <td>'base-content'</td>
                                <td>Any TextColor (primary, success, error, etc.)</td>
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

            {/* Best Practices */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    Best Practices
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="font-bold">✅ Do</h4>
                            <ul className="text-xs list-disc list-inside space-y-1">
                                <li>Use appropriate sizes for context</li>
                                <li>Match colors to theme (e.g., primary-content in buttons)</li>
                                <li>Add descriptive text for clarity</li>
                                <li>Use backdrop blur for overlays</li>
                            </ul>
                        </div>
                    </div>

                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h4 className="font-bold">❌ Don't</h4>
                            <ul className="text-xs list-disc list-inside space-y-1">
                                <li>Use XL size in small buttons</li>
                                <li>Forget aria-label for accessibility</li>
                                <li>Use conflicting colors (e.g., primary on primary bg)</li>
                                <li>Show multiple loaders for same action</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default LoadingDemo ;