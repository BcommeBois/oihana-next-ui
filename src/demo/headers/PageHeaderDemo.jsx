'use client' ;

import { useState } from 'react' ;

import Badge     from '@/components/Badge' ;
import Button    from '@/components/Button' ;
import Divider   from '@/components/Divider' ;
import PageHeader from '@/components/headers/PageHeader' ;

import Container from '@/display/Container' ;

import SlideDown from '@/motions/SlideDown' ;

import {
    MdAdd ,
    MdEdit ,
    MdPeople ,
    MdRefresh ,
    MdSettings ,
    MdShoppingBag ,
    MdDashboard ,
    MdFolder ,
    MdNotifications ,
} from 'react-icons/md' ;

import { AiFillProduct } from 'react-icons/ai' ;

const PageHeaderDemo = () =>
{
    const [ count , setCount ] = useState( 0 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">PageHeader Examples</h2>

            {/* Title only */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Title Only
                </h3>

                <div className="bg-base-100 rounded-box p-4">
                    <PageHeader title="Products" />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;PageHeader title="Products" /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Title + description */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Title + Description
                </h3>

                <div className="bg-base-100 rounded-box p-4">
                    <PageHeader
                        title       = "Products"
                        description = "Browse and manage the full product catalog."
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;PageHeader</code></pre>
                    <pre data-prefix="2"><code>    title       = "Products"</code></pre>
                    <pre data-prefix="3"><code>    description = "Browse and manage the full product catalog."</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Title + subtitle + description */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Title + Subtitle + Description
                </h3>

                <div className="bg-base-100 rounded-box p-4">
                    <PageHeader
                        title       = "Products"
                        subtitle    = "48 results"
                        description = "Browse and manage the full product catalog."
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;PageHeader</code></pre>
                    <pre data-prefix="2"><code>    title       = "Products"</code></pre>
                    <pre data-prefix="3"><code>    subtitle    = "48 results"</code></pre>
                    <pre data-prefix="4"><code>    description = "Browse and manage the full product catalog."</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* With icon */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    With Icon
                </h3>

                <div className="flex flex-col gap-3">

                    <div className="bg-base-100 rounded-box p-4">
                        <PageHeader
                            icon        = { AiFillProduct }
                            title       = "Products"
                            description = "Browse and manage the full product catalog."
                        />
                    </div>

                    <div className="bg-base-100 rounded-box p-4">
                        <PageHeader
                            icon  = { MdPeople }
                            title = "Customers"
                        />
                    </div>

                    <div className="bg-base-100 rounded-box p-4">
                        <PageHeader
                            icon        = { MdDashboard }
                            title       = "Dashboard"
                            subtitle    = "Overview"
                            description = "Your activity summary for this week."
                        />
                    </div>

                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>import {'{ AiFillProduct }'} from 'react-icons/ai' ;</code></pre>
                    <pre data-prefix="2"><code></code></pre>
                    <pre data-prefix="3"><code>&lt;PageHeader</code></pre>
                    <pre data-prefix="4"><code>    icon        = {'{ AiFillProduct }'}</code></pre>
                    <pre data-prefix="5"><code>    title       = "Products"</code></pre>
                    <pre data-prefix="6"><code>    description = "Browse and manage the full product catalog."</code></pre>
                    <pre data-prefix="7"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* With right actions */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    With Right Actions
                </h3>

                <div className="flex flex-col gap-3">

                    {/* Refresh only */}
                    <div className="bg-base-100 rounded-box p-4">
                        <PageHeader
                            icon  = { AiFillProduct }
                            title = "Products"
                            right = {
                                <Button
                                    color = "ghost"
                                    icon  = { MdRefresh }
                                    size  = "sm"
                                    onClick = { () => setCount( c => c + 1 ) }
                                >
                                    Refresh
                                </Button>
                            }
                        />
                    </div>

                    {/* Refresh + Add */}
                    <div className="bg-base-100 rounded-box p-4">
                        <PageHeader
                            icon  = { MdShoppingBag }
                            title = "Orders"
                            right = {
                                <div className="flex items-center gap-2">
                                    <Button color="ghost"   icon={ MdRefresh } size="sm" shape="square" />
                                    <Button color="primary" icon={ MdAdd }     size="sm">New Order</Button>
                                </div>
                            }
                        />
                    </div>

                    {/* Badges + Edit */}
                    <div className="bg-base-100 rounded-box p-4">
                        <PageHeader
                            icon     = { MdFolder }
                            title    = "Documents"
                            subtitle = "12 files"
                            right    = {
                                <div className="flex items-center gap-2">
                                    <Badge color="success" style="soft">Synced</Badge>
                                    <Button color="ghost" icon={ MdEdit }    size="sm"  shape="square" />
                                    <Button color="ghost" icon={ MdSettings } size="sm" shape="square" />
                                </div>
                            }
                        />
                    </div>

                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;PageHeader</code></pre>
                    <pre data-prefix="2"><code>    icon  = {'{ AiFillProduct }'}</code></pre>
                    <pre data-prefix="3"><code>    title = "Products"</code></pre>
                    <pre data-prefix="4"><code>    right = {'{'}</code></pre>
                    <pre data-prefix="5"><code>        &lt;div className="flex items-center gap-2"&gt;</code></pre>
                    <pre data-prefix="6"><code>            &lt;Button icon={'{ MdRefresh }'} /&gt;</code></pre>
                    <pre data-prefix="7"><code>            &lt;Button color="primary" icon={'{ MdAdd }'}&gt;Add&lt;/Button&gt;</code></pre>
                    <pre data-prefix="8"><code>        &lt;/div&gt;</code></pre>
                    <pre data-prefix="9"><code>    {'}'}</code></pre>
                    <pre data-prefix="10"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* With divider */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    With Divider
                </h3>

                <div className="bg-base-100 rounded-box p-4">
                    <PageHeader
                        icon        = { AiFillProduct }
                        title       = "Products"
                        description = "Browse and manage the full product catalog."
                        right       = {
                            <Button color="primary" icon={ MdAdd } size="sm">
                                Add Product
                            </Button>
                        }
                        showDivider = { true }
                    />
                    <p className="text-sm text-base-content/60 mt-2">
                        Content below the divider...
                    </p>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;PageHeader</code></pre>
                    <pre data-prefix="2"><code>    showDivider = {'{ true }'}</code></pre>
                    <pre data-prefix="3"><code>    title       = "Products"</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* With animation */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    With Motion Animation
                </h3>

                <div className="bg-base-100 rounded-box p-4">
                    <PageHeader
                        animated        = { true }
                        icon            = { MdNotifications }
                        MotionComponent = { SlideDown }
                        motionOptions   = { { delay : 0 , start : -20 } }
                        title           = "Notifications"
                        subtitle        = "3 unread"
                        right           = {
                            <Badge color="error">3</Badge>
                        }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>import SlideDown from 'oihana-next-ui/motions/SlideDown' ;</code></pre>
                    <pre data-prefix="2"><code></code></pre>
                    <pre data-prefix="3"><code>&lt;PageHeader</code></pre>
                    <pre data-prefix="4"><code>    animated        = {'{ true }'}</code></pre>
                    <pre data-prefix="5"><code>    MotionComponent = {'{ SlideDown }'}</code></pre>
                    <pre data-prefix="6"><code>    motionOptions   = {'{ { delay: 0, start: -20 } }'}</code></pre>
                    <pre data-prefix="7"><code>    title           = "Notifications"</code></pre>
                    <pre data-prefix="8"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Custom avatar */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Custom Avatar Content
                </h3>

                <div className="flex flex-col gap-3">

                    {/* Initials */}
                    <div className="bg-base-100 rounded-box p-4">
                        <PageHeader
                            avatar               = { <span className="text-lg font-bold text-primary">BC</span> }
                            avatarClassName      = "bg-primary/10"
                            title                = "B Comme Bois"
                            subtitle             = "Wood & Timber"
                            description          = "Premium wood products and materials."
                        />
                    </div>

                    {/* Emoji */}
                    <div className="bg-base-100 rounded-box p-4">
                        <PageHeader
                            avatar  = { <span className="text-2xl">🪵</span> }
                            title   = "Wood Products"
                            subtitle = "Natural materials"
                        />
                    </div>

                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;PageHeader</code></pre>
                    <pre data-prefix="2"><code>    avatar  = {'{ <span className="font-bold">BC</span> }'}</code></pre>
                    <pre data-prefix="3"><code>    title   = "B Comme Bois"</code></pre>
                    <pre data-prefix="4"><code>    subtitle = "Wood & Timber"</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* No avatar */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Without Avatar
                </h3>

                <div className="bg-base-100 rounded-box p-4">
                    <PageHeader
                        showAvatar  = { false }
                        title       = "Settings"
                        description = "Manage your account and preferences."
                        right       = {
                            <Button color="ghost" icon={ MdSettings } size="sm" />
                        }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;PageHeader</code></pre>
                    <pre data-prefix="2"><code>    showAvatar  = {'{ false }'}</code></pre>
                    <pre data-prefix="3"><code>    title       = "Settings"</code></pre>
                    <pre data-prefix="4"><code>    description = "Manage your account and preferences."</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Real-world: ThingsPage header */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Real-world — ThingsPage Header
                </h3>

                <p className="text-sm text-base-content/60">
                    Usage via <code className="badge badge-xs">ThingsPage</code> — the header is rendered automatically from i18n + icon props.
                </p>

                <div className="bg-base-100 rounded-box p-4">
                    <PageHeader
                        icon        = { AiFillProduct }
                        title       = "Produits"
                        description = "Consultez la liste des produits disponibles."
                        right       = {
                            <div className="flex items-center gap-2">
                                <Button color="ghost"   icon={ MdRefresh } size="sm" />
                                <Button color="primary" icon={ MdAdd }     size="sm">Ajouter</Button>
                            </div>
                        }
                        showDivider = { true }
                    />
                    <p className="text-sm text-base-content/50 mt-2 italic">
                        ← Rendered by ThingsPage when showHeader=true
                    </p>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;ThingsPage</code></pre>
                    <pre data-prefix="2"><code>    icon            = {'{ AiFillProduct }'}</code></pre>
                    <pre data-prefix="3"><code>    path            = "app.products"</code></pre>
                    <pre data-prefix="4"><code>    showHeader      = {'{ true }'}</code></pre>
                    <pre data-prefix="5"><code>    showDescription = {'{ true }'}</code></pre>
                    <pre data-prefix="6"><code>    refreshable     = {'{ true }'}</code></pre>
                    <pre data-prefix="7"><code>    addable         = {'{ true }'}</code></pre>
                    <pre data-prefix="8"><code>    addPath         = "/products/add"</code></pre>
                    <pre data-prefix="9"><code>    url             = "products"</code></pre>
                    <pre data-prefix="10"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* icon as an element */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    icon — composant ou élément
                </h3>

                <p className="text-sm text-base-content/60">
                    Un Server Component ne peut pas passer un TYPE de composant à un Client Component.
                    Il rend donc l'icône lui-même et transmet le nœud : <code className="badge badge-xs">icon</code> accepte les deux.
                </p>

                <div className="bg-base-100 rounded-box p-4 flex flex-col gap-4">
                    <PageHeader
                        icon  = { MdFolder }
                        title = "Composant — icon={ MdFolder }"
                    />
                    <PageHeader
                        icon  = { <MdFolder className="size-5 text-primary" /> }
                        title = "Élément — icon={ <MdFolder className=… /> }"
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;PageHeader icon={'{ MdFolder }'} title="…" /&gt;</code></pre>
                    <pre data-prefix="2"><code>&lt;PageHeader icon={'{ <MdFolder className="size-5 text-primary" /> }'} title="…" /&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* stackBelow */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    stackBelow — la zone droite passe à la ligne
                </h3>

                <p className="text-sm text-base-content/60">
                    Sous le point de rupture, les actions prennent une ligne à elles. Sans cela, la colonne
                    du titre — qui peut se réduire à zéro — se plie en quatre lignes autour des boutons au
                    lieu de les pousser dessous.
                </p>

                <p className="text-sm text-base-content/60">
                    Le premier en-tête est réglé sur <code className="badge badge-xs">2xl</code> : il se plie
                    déjà sur cet écran. Le deuxième garde le défaut <code className="badge badge-xs">sm</code> —
                    rétrécissez la fenêtre sous 640 px pour le voir faire. Le troisième est à
                    <code className="badge badge-xs">false</code> : il ne se plie jamais.
                </p>

                <div className="bg-base-100 rounded-box p-4 flex flex-col gap-6">

                    <PageHeader
                        icon        = { MdNotifications }
                        title       = "stackBelow = 2xl"
                        description = "Un titre assez long pour disputer la place aux boutons de droite."
                        right       = {
                            <div className="flex items-center gap-2">
                                <Button color="ghost"   icon={ MdRefresh } size="sm" />
                                <Button color="primary" icon={ MdAdd }     size="sm">Ajouter</Button>
                            </div>
                        }
                        stackBelow  = "2xl"
                    />

                    <PageHeader
                        icon        = { MdNotifications }
                        title       = "stackBelow = sm (défaut)"
                        description = "Un titre assez long pour disputer la place aux boutons de droite."
                        right       = {
                            <div className="flex items-center gap-2">
                                <Button color="ghost"   icon={ MdRefresh } size="sm" />
                                <Button color="primary" icon={ MdAdd }     size="sm">Ajouter</Button>
                            </div>
                        }
                    />

                    <PageHeader
                        icon        = { MdNotifications }
                        title       = "stackBelow = false"
                        description = "Un titre assez long pour disputer la place aux boutons de droite."
                        right       = {
                            <div className="flex items-center gap-2">
                                <Button color="ghost"   icon={ MdRefresh } size="sm" />
                                <Button color="primary" icon={ MdAdd }     size="sm">Ajouter</Button>
                            </div>
                        }
                        stackBelow  = { false }
                    />

                </div>
            </div>

        </Container>
    ) ;
} ;

export default PageHeaderDemo ;