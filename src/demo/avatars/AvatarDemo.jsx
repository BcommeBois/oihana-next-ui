'use client' ;

import Avatar         from '@/components/avatars/Avatar' ;
import AvatarGroup    from '@/components/avatars/AvatarGroup' ;
import InitialsAvatar from '@/components/avatars/InitialsAvatar' ;
import Container      from '@/display/Container' ;
import Image          from 'next/image' ;

/**
 * Names with nothing in common but their letters — enough to show that a
 * colour comes from the name and never moves.
 * @type {string[]}
 */
const NAMES = [ 'Acme Studio' , 'Borealis Works' , 'Amber Group' , 'Juno' , 'Vega Partners' , 'Orion Labs' ] ;

/**
 * A palette of tints, to show that one can be handed over — literal classes,
 * never interpolated, or Tailwind emits none of them.
 * @type {string[]}
 */
const TINTS =
[
    'bg-primary/15 text-primary' ,
    'bg-secondary/15 text-secondary' ,
    'bg-accent/15 text-accent' ,
    'bg-info/15 text-info' ,
] ;

const AvatarDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-6xl">

            <h1 className="text-3xl font-bold self-start">Avatar Examples</h1>

            {/* Simple Avatar */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Simple Avatar</h3>

                <div className="flex items-center gap-4">
                    <Avatar innerClassName="w-24 rounded bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=1" alt="Avatar" width={96} height={96} />
                    </Avatar>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Initials, And A Colour It Always Gets</h3>

                <p className="text-sm opacity-70">
                    <code className="badge badge-sm">InitialsAvatar</code> takes a name and shows its
                    initials on a colour derived from that name — the same entity lands on the same
                    colour in a list, on its own page, and after a reload, with nothing stored.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    { NAMES.map( name => (
                        <div key={ name } className="flex items-center gap-2">
                            <InitialsAvatar name={ name } size="sm" />
                            <span className="text-sm opacity-70">{ name }</span>
                        </div>
                    ) ) }
                </div>

                <p className="text-sm opacity-70">
                    The five sizes, on one name — the colour does not move with the size.
                </p>

                <div className="flex flex-wrap items-end gap-4">
                    <InitialsAvatar name="Borealis Works" size="xs" />
                    <InitialsAvatar name="Borealis Works" size="sm" />
                    <InitialsAvatar name="Borealis Works" size="md" />
                    <InitialsAvatar name="Borealis Works" size="lg" />
                    <InitialsAvatar name="Borealis Works" size="xl" />
                </div>

                <p className="text-sm opacity-70">
                    With a <code className="badge badge-sm">src</code> the picture takes the place of the
                    initials — one code path, since it is <code className="badge badge-sm">Picture</code>
                    that answers « a source, or something in its place ». An
                    <code className="badge badge-sm">indicator</code> and a
                    <code className="badge badge-sm">palette</code> of one's own both still apply.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                    <InitialsAvatar name="Juno" size="lg" src="https://i.pravatar.cc/150?img=12" />
                    <InitialsAvatar name="Juno" size="lg" />
                    <InitialsAvatar name="Vega Partners" size="lg" indicator="online" />
                    <InitialsAvatar name="Orion Labs" size="lg" indicator="offline" />
                    { NAMES.slice( 0 , 4 ).map( name => (
                        <InitialsAvatar key={ name } name={ name } palette={ TINTS } size="lg" />
                    ) ) }
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;InitialsAvatar name={'{ thing.name }'} size="sm" /&gt;</code></pre>
                    <pre data-prefix="2"><code>&lt;InitialsAvatar name={'{ thing.name }'} src={'{ thing.logo }'} size="lg" /&gt;</code></pre>
                    <pre data-prefix="3"><code>&lt;InitialsAvatar name={'{ thing.name }'} palette={'{ OWN_TINTS }'} /&gt;</code></pre>
                </div>
            </div>

            {/* Custom Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Sizes</h3>

                <div className="flex items-center gap-4">
                    <Avatar innerClassName="w-32 rounded bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=2" alt="Avatar" width={128} height={128} />
                    </Avatar>
                    <Avatar innerClassName="w-24 rounded bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=2" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-16 rounded bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=2" alt="Avatar" width={64} height={64} />
                    </Avatar>
                    <Avatar innerClassName="w-12 rounded bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=2" alt="Avatar" width={48} height={48} />
                    </Avatar>
                    <Avatar innerClassName="w-8 rounded bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=2" alt="Avatar" width={32} height={32} />
                    </Avatar>
                </div>
            </div>

            {/* Rounded Avatars */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Rounded Avatars</h3>

                <div className="flex items-center gap-4">
                    <Avatar innerClassName="w-24 rounded bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=3" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-24 rounded-xl bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=4" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-24 rounded-full bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=5" alt="Avatar" width={96} height={96} />
                    </Avatar>
                </div>
            </div>

            {/* With Mask */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Avatar with Mask</h3>

                <div className="flex items-center gap-4">
                    <Avatar innerClassName="w-24 mask mask-squircle bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=6" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-24 mask mask-hexagon bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=7" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-24 mask mask-hexagon-2 bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=8" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-24 mask mask-decagon bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=9" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-24 mask mask-diamond bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=10" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-24 mask mask-heart bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=11" alt="Avatar" width={96} height={96} />
                    </Avatar>
                </div>
            </div>

            {/* Avatar Group */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Avatar Group</h3>

                <AvatarGroup className="-space-x-6">
                    <Avatar innerClassName="w-12 bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=12" alt="Avatar" width={48} height={48} />
                    </Avatar>
                    <Avatar innerClassName="w-12 bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=13" alt="Avatar" width={48} height={48} />
                    </Avatar>
                    <Avatar innerClassName="w-12 bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=14" alt="Avatar" width={48} height={48} />
                    </Avatar>
                    <Avatar innerClassName="w-12 bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=15" alt="Avatar" width={48} height={48} />
                    </Avatar>
                </AvatarGroup>
            </div>

            {/* Avatar Group with Counter */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Avatar Group with Counter</h3>

                <AvatarGroup className="-space-x-6">
                    <Avatar innerClassName="w-12 bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=16" alt="Avatar" width={48} height={48} />
                    </Avatar>
                    <Avatar innerClassName="w-12 bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=17" alt="Avatar" width={48} height={48} />
                    </Avatar>
                    <Avatar innerClassName="w-12 bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=18" alt="Avatar" width={48} height={48} />
                    </Avatar>
                    <Avatar placeholder innerClassName="w-12 bg-neutral text-neutral-content">
                        <span>+99</span>
                    </Avatar>
                </AvatarGroup>
            </div>

            {/* Avatar with Ring */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Avatar with Ring</h3>

                <div className="flex items-center gap-4">
                    <Avatar innerClassName="w-24 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                        <Image src="https://i.pravatar.cc/150?img=19" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar innerClassName="w-20 rounded-full ring-2 ring-secondary ring-offset-base-100 ring-offset-2">
                        <Image src="https://i.pravatar.cc/150?img=20" alt="Avatar" width={80} height={80} />
                    </Avatar>
                    <Avatar innerClassName="w-16 rounded-full ring-2 ring-accent ring-offset-base-100 ring-offset-2">
                        <Image src="https://i.pravatar.cc/150?img=21" alt="Avatar" width={64} height={64} />
                    </Avatar>
                </div>
            </div>

            {/* Presence Indicators */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Presence Indicators</h3>

                <div className="flex items-center gap-4">
                    <Avatar indicator="online" innerClassName="w-24 rounded-full bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=22" alt="Avatar" width={96} height={96} />
                    </Avatar>
                    <Avatar indicator="offline" innerClassName="w-24 rounded-full bg-base-300">
                        <Image src="https://i.pravatar.cc/150?img=23" alt="Avatar" width={96} height={96} />
                    </Avatar>
                </div>
            </div>

            {/* Placeholder Avatars */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Placeholder Avatars (Initials)</h3>

                <div className="flex items-center gap-4">
                    <Avatar placeholder innerClassName="bg-neutral text-neutral-content rounded-full w-24">
                        <span className="text-3xl">D</span>
                    </Avatar>
                    <Avatar indicator="online" placeholder innerClassName="bg-neutral text-neutral-content rounded-full w-16">
                        <span className="text-xl">AI</span>
                    </Avatar>
                    <Avatar placeholder innerClassName="bg-neutral text-neutral-content rounded-full w-12">
                        <span>SY</span>
                    </Avatar>
                    <Avatar placeholder innerClassName="bg-neutral text-neutral-content rounded-full w-8">
                        <span className="text-xs">UI</span>
                    </Avatar>
                </div>
            </div>

            {/* Colored Placeholders */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Colored Placeholders</h3>

                <div className="flex items-center gap-4">
                    <Avatar placeholder innerClassName="bg-primary text-primary-content rounded-full w-16">
                        <span className="text-xl">JD</span>
                    </Avatar>
                    <Avatar placeholder innerClassName="bg-secondary text-secondary-content rounded-full w-16">
                        <span className="text-xl">MK</span>
                    </Avatar>
                    <Avatar placeholder innerClassName="bg-accent text-accent-content rounded-full w-16">
                        <span className="text-xl">RL</span>
                    </Avatar>
                    <Avatar placeholder innerClassName="bg-info text-info-content rounded-full w-16">
                        <span className="text-xl">AB</span>
                    </Avatar>
                    <Avatar placeholder innerClassName="bg-success text-success-content rounded-full w-16">
                        <span className="text-xl">CD</span>
                    </Avatar>
                    <Avatar placeholder innerClassName="bg-warning text-warning-content rounded-full w-16">
                        <span className="text-xl">EF</span>
                    </Avatar>
                    <Avatar placeholder innerClassName="bg-error text-error-content rounded-full w-16">
                        <span className="text-xl">GH</span>
                    </Avatar>
                </div>
            </div>

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* User profile header */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">User Profile Header</h4>
                    <div className="flex items-center gap-4">
                        <Avatar indicator="online" innerClassName="w-20 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                            <Image src="https://i.pravatar.cc/150?img=24" alt="Avatar" width={80} height={80} />
                        </Avatar>
                        <div>
                            <h3 className="text-xl font-bold">Sarah Johnson</h3>
                            <p className="text-sm opacity-70">@sarahjohnson</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="badge badge-primary badge-sm">Premium</div>
                                <div className="badge badge-ghost badge-sm">Designer</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment section */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Comment Section</h4>
                    <div className="flex gap-3">
                        <Avatar innerClassName="size-12 rounded-full">
                            <Image src="https://i.pravatar.cc/150?img=25" alt="Avatar" width={40} height={40} />
                        </Avatar>
                        <div className="flex-1">
                            <div className="bg-base-200 rounded-lg p-3">
                                <p className="font-semibold text-sm">Alex Martinez</p>
                                <p className="text-sm mt-1">Great article! This really helped me understand the topic better.</p>
                            </div>
                            <p className="text-xs opacity-60 mt-1">2 hours ago</p>
                        </div>
                    </div>
                </div>

                {/* Team members */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Team Members</h4>
                    <AvatarGroup className="-space-x-6">
                        <Avatar innerClassName="w-12 rounded-full ring-2 ring-base-100">
                            <Image src="https://i.pravatar.cc/150?img=26" alt="Avatar" width={48} height={48} />
                        </Avatar>
                        <Avatar innerClassName="w-12 rounded-full ring-2 ring-base-100">
                            <Image src="https://i.pravatar.cc/150?img=27" alt="Avatar" width={48} height={48} />
                        </Avatar>
                        <Avatar innerClassName="w-12 rounded-full ring-2 ring-base-100">
                            <Image src="https://i.pravatar.cc/150?img=28" alt="Avatar" width={48} height={48} />
                        </Avatar>
                        <Avatar innerClassName="w-12 rounded-full ring-2 ring-base-100">
                            <Image src="https://i.pravatar.cc/150?img=29" alt="Avatar" width={48} height={48} />
                        </Avatar>
                        <Avatar placeholder innerClassName="w-12 bg-neutral text-neutral-content rounded-full ring-2 ring-base-100">
                            <span className="text-xs">+12</span>
                        </Avatar>
                    </AvatarGroup>
                </div>

                {/* Status list */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Status List</h4>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <Avatar indicator="online" innerClassName="w-12 rounded-full">
                                <Image src="https://i.pravatar.cc/150?img=30" alt="Avatar" width={48} height={48} />
                            </Avatar>
                            <div>
                                <p className="font-semibold">Emma Wilson</p>
                                <p className="text-sm opacity-70">Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Avatar indicator="offline" innerClassName="w-12 rounded-full">
                                <Image src="https://i.pravatar.cc/150?img=31" alt="Avatar" width={48} height={48} />
                            </Avatar>
                            <div>
                                <p className="font-semibold">Michael Brown</p>
                                <p className="text-sm opacity-70">Offline</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default AvatarDemo ;