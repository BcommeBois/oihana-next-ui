'use client' ;

import Container from '@/display/Container' ;

import Badge from '@/components/Badge' ;

const BadgeDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Badge Examples</h2>

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Colors</h3>

                <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge color="neutral">Neutral</Badge>
                    <Badge color="primary">Primary</Badge>
                    <Badge color="secondary">Secondary</Badge>
                    <Badge color="accent">Accent</Badge>
                    <Badge color="info">Info</Badge>
                    <Badge color="success">Success</Badge>
                    <Badge color="warning">Warning</Badge>
                    <Badge color="error">Error</Badge>
                </div>
            </div>

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Sizes</h3>

                <div className="flex flex-wrap items-center gap-2">
                    <Badge color="primary" size="xs">XS</Badge>
                    <Badge color="primary" size="sm">SM</Badge>
                    <Badge color="primary" size="md">MD (default)</Badge>
                    <Badge color="primary" size="lg">LG</Badge>
                    <Badge color="primary" size="xl">XL</Badge>
                </div>
            </div>

            {/* Outline Style */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Outline Style</h3>

                <div className="flex flex-wrap gap-2">
                    <Badge color="neutral" style="outline">Neutral</Badge>
                    <Badge color="primary" style="outline">Primary</Badge>
                    <Badge color="secondary" style="outline">Secondary</Badge>
                    <Badge color="accent" style="outline">Accent</Badge>
                    <Badge color="info" style="outline">Info</Badge>
                    <Badge color="success" style="outline">Success</Badge>
                    <Badge color="warning" style="outline">Warning</Badge>
                    <Badge color="error" style="outline">Error</Badge>
                </div>
            </div>

            {/* Dash Style */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Dash Style</h3>

                <div className="flex flex-wrap gap-2">
                    <Badge color="neutral" style="dash">Neutral</Badge>
                    <Badge color="primary" style="dash">Primary</Badge>
                    <Badge color="secondary" style="dash">Secondary</Badge>
                    <Badge color="accent" style="dash">Accent</Badge>
                    <Badge color="info" style="dash">Info</Badge>
                    <Badge color="success" style="dash">Success</Badge>
                    <Badge color="warning" style="dash">Warning</Badge>
                    <Badge color="error" style="dash">Error</Badge>
                </div>
            </div>

            {/* Soft Style */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Soft Style</h3>

                <div className="flex flex-wrap gap-2">
                    <Badge color="neutral" style="soft">Neutral</Badge>
                    <Badge color="primary" style="soft">Primary</Badge>
                    <Badge color="secondary" style="soft">Secondary</Badge>
                    <Badge color="accent" style="soft">Accent</Badge>
                    <Badge color="info" style="soft">Info</Badge>
                    <Badge color="success" style="soft">Success</Badge>
                    <Badge color="warning" style="soft">Warning</Badge>
                    <Badge color="error" style="soft">Error</Badge>
                </div>
            </div>

            {/* Ghost Style */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Ghost Style</h3>

                <div className="flex flex-wrap gap-2">
                    <Badge style="ghost">Default</Badge>
                    <Badge color="neutral" style="ghost">Neutral</Badge>
                    <Badge color="primary" style="ghost">Primary</Badge>
                    <Badge color="secondary" style="ghost">Secondary</Badge>
                    <Badge color="accent" style="ghost">Accent</Badge>
                    <Badge color="info" style="ghost">Info</Badge>
                    <Badge color="success" style="ghost">Success</Badge>
                    <Badge color="warning" style="ghost">Warning</Badge>
                    <Badge color="error" style="ghost">Error</Badge>
                </div>
            </div>

            {/* Combined Styles */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Combined Styles</h3>

                <div className="flex flex-wrap gap-2">
                    <Badge color="error" style="soft" size="sm">3 errors</Badge>
                    <Badge color="warning" style="outline" size="md">2 warnings</Badge>
                    <Badge color="success" style="dash" size="lg">✓ Active</Badge>
                    <Badge color="info" style="ghost" size="xl">ℹ Info</Badge>
                </div>
            </div>

            {/* Dot Indicators (Empty Badges) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Dot Indicators (Empty)</h3>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Badge color="success" size="xs" />
                        <span>Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge color="warning" size="xs" />
                        <span>Away</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge color="error" size="xs" />
                        <span>Offline</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge color="neutral" size="xs" />
                        <span>Inactive</span>
                    </div>
                </div>
            </div>

            {/* Custom Element (as link) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Element (Link)</h3>

                <div className="flex flex-wrap gap-2">
                    <Badge as="a" href="#new" color="info" style="outline">What's new</Badge>
                    <Badge as="a" href="#docs" color="primary" style="soft">Documentation</Badge>
                    <Badge as="button" onClick={() => alert('Clicked!')} color="accent">
                        Click me
                    </Badge>
                </div>
            </div>

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Status badges */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Status Indicators</h4>
                    <div className="flex flex-wrap gap-2">
                        <Badge color="success">Published</Badge>
                        <Badge color="warning">Draft</Badge>
                        <Badge color="error">Rejected</Badge>
                        <Badge color="info">Under Review</Badge>
                        <Badge color="neutral">Archived</Badge>
                    </div>
                </div>

                {/* Notification badges */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Notifications</h4>
                    <div className="flex flex-wrap gap-2">
                        <div className="relative inline-block">
                            <button className="btn">
                                Messages
                                <Badge color="error" size="sm" className="absolute -top-2 -right-2">
                                    5
                                </Badge>
                            </button>
                        </div>
                        <div className="relative inline-block">
                            <button className="btn">
                                Inbox
                                <Badge color="primary" size="sm" className="absolute -top-2 -right-2">
                                    12
                                </Badge>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        <Badge color="primary" style="soft">React</Badge>
                        <Badge color="secondary" style="soft">Next.js</Badge>
                        <Badge color="accent" style="soft">TypeScript</Badge>
                        <Badge color="info" style="soft">TailwindCSS</Badge>
                        <Badge color="success" style="soft">DaisyUI</Badge>
                    </div>
                </div>

                {/* Version badges */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Versions</h4>
                    <div className="flex flex-wrap gap-2">
                        <Badge color="success" style="outline">v2.0.0</Badge>
                        <Badge color="warning" style="outline">beta</Badge>
                        <Badge color="info" style="outline">alpha</Badge>
                        <Badge color="error" style="outline">deprecated</Badge>
                    </div>
                </div>

                {/* Priority badges */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Priority Levels</h4>
                    <div className="flex flex-wrap gap-2">
                        <Badge color="error" size="sm">High</Badge>
                        <Badge color="warning" size="sm">Medium</Badge>
                        <Badge color="info" size="sm">Low</Badge>
                        <Badge color="neutral" size="sm">None</Badge>
                    </div>
                </div>
            </div>

            {/* In Context */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">In Context</h3>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <h2 className="card-title">
                                Project Alpha
                                <Badge color="success" size="sm">Active</Badge>
                            </h2>
                            <Badge color="primary" style="soft">Premium</Badge>
                        </div>
                        <p>
                            This is an example of badges used within a card component.
                        </p>
                        <div className="card-actions justify-end">
                            <Badge color="accent" style="outline" size="sm">React</Badge>
                            <Badge color="secondary" style="outline" size="sm">TypeScript</Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* With Icons */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Icons/Emojis</h3>

                <div className="flex flex-wrap gap-2">
                    <Badge color="success">✓ Completed</Badge>
                    <Badge color="error">✗ Failed</Badge>
                    <Badge color="warning">⚠ Warning</Badge>
                    <Badge color="info">ℹ Info</Badge>
                    <Badge color="primary">⭐ Featured</Badge>
                    <Badge color="accent">🔥 Hot</Badge>
                    <Badge color="secondary">🎉 New</Badge>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default BadgeDemo ;