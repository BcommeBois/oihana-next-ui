'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Divider  from '@/components/Divider' ;
import Masonry  from '@/components/layouts/Masonry';
import Picture  from '@/components/images/Picture' ;

import Container from '@/display/Container' ;

import {
    MdPlayArrow ,
    MdEdit ,
    MdFavorite ,
    MdRefresh ,
    MdShare
} from 'react-icons/md' ;

const PictureDemo = () =>
{
    // --------- Loading states for different sections

    const [ basicImageKey , setBasicImageKey ] = useState( 0 ) ;
    const [ animationKey  , setAnimationKey  ] = useState( 0 ) ;
    const [ sizeKey       , setSizeKey       ] = useState( 0 ) ;
    const [ colorKey      , setColorKey      ] = useState( 0 ) ;

    const [ loadedImages , setLoadedImages ] = useState( {} ) ;

    const handleImageLoad = ( id ) =>
    {
        setLoadedImages( prev => ({ ...prev , [id] : true }) ) ;
        console.log( `Image ${ id } loaded` ) ;
    } ;

    // --------- Reset functions

    const reloadBasic = () =>
    {
        setBasicImageKey( prev => prev + 1 ) ;
        setLoadedImages( prev =>
        {
            const newState = { ...prev } ;
            delete newState.basic ;
            return newState ;
        }) ;
    } ;

    const reloadAnimation = () =>
    {
        setAnimationKey( prev => prev + 1 ) ;
        setLoadedImages( prev =>
        {
            const newState = { ...prev } ;
            delete newState['animation-spinner'] ;
            delete newState['animation-ring'] ;
            delete newState['animation-dots'] ;
            delete newState['animation-bars'] ;
            delete newState['animation-ball'] ;
            delete newState['animation-infinity'] ;
            return newState ;
        }) ;
    } ;

    const reloadSize = () =>
    {
        setSizeKey( prev => prev + 1 ) ;
        setLoadedImages( prev =>
        {
            const newState = { ...prev } ;
            delete newState['size-xs'] ;
            delete newState['size-sm'] ;
            delete newState['size-md'] ;
            delete newState['size-lg'] ;
            delete newState['size-xl'] ;
            return newState ;
        }) ;
    } ;

    const reloadColor = () =>
    {
        setColorKey( prev => prev + 1 ) ;
        setLoadedImages( prev =>
        {
            const newState = { ...prev } ;
            delete newState['color-primary'] ;
            delete newState['color-secondary'] ;
            delete newState['color-accent'] ;
            delete newState['color-error'] ;
            return newState ;
        }) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Picture Examples</h2>

            {/* Basic Picture */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Basic Picture with Loading Spinner
                </h3>

                <div className="flex gap-2 items-center">
                    <Button size="sm" color="ghost" icon={ MdRefresh } onClick={ reloadBasic }>
                        Reload Image
                    </Button>

                    { loadedImages.basic && (
                        <Badge color="success">Loaded</Badge>
                    )}
                </div>

                <div className="flex justify-center">
                    <Picture
                        key={ basicImageKey }
                        src={ `https://picsum.photos/640/480?random=${ basicImageKey }` }
                        alt="Random landscape"
                        width={ 640 }
                        height={ 480 }
                        className="rounded-box overflow-hidden shadow-lg max-w-2xl"
                        onLoad={ () => handleImageLoad( 'basic' ) }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    src="https://picsum.photos/640/480"</code></pre>
                    <pre data-prefix="3"><code>    alt="Random landscape"</code></pre>
                    <pre data-prefix="4"><code>    width={'{ 640 }'}</code></pre>
                    <pre data-prefix="5"><code>    height={'{ 480 }'}</code></pre>
                    <pre data-prefix="6"><code>    className="rounded-box overflow-hidden"</code></pre>
                    <pre data-prefix="7"><code>    onLoad={'{ () => console.log("Loaded!") }'}</code></pre>
                    <pre data-prefix="8"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Masonry Gallery */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Masonry Gallery Layout
                </h3>

                <p className="text-sm opacity-70">
                    Responsive masonry layout that distributes images across columns automatically.
                </p>

                <Masonry
                    columns={{ xs: 2 , sm: 2 , md: 3 , lg: 4 }}
                    gap={ 4 }
                    className="w-full"
                >
                    <Picture
                        src="https://picsum.photos/400/600?random=301"
                        alt="Portrait 1"
                        width={ 400 }
                        height={ 600 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="ring"
                        loadingColor="primary"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#01</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/300?random=302"
                        alt="Landscape 1"
                        width={ 400 }
                        height={ 300 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="spinner"
                        loadingColor="secondary"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#02</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/500?random=303"
                        alt="Square-ish"
                        width={ 400 }
                        height={ 500 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="dots"
                        loadingColor="accent"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#03</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/400?random=304"
                        alt="Square"
                        width={ 400 }
                        height={ 400 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="bars"
                        loadingColor="info"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#04</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/550?random=305"
                        alt="Portrait 2"
                        width={ 400 }
                        height={ 550 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="ball"
                        loadingColor="success"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#05</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/350?random=306"
                        alt="Landscape 2"
                        width={ 400 }
                        height={ 350 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="infinity"
                        loadingColor="warning"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#06</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/450?random=205"
                        alt="Tall-ish"
                        width={ 400 }
                        height={ 450 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="ring"
                        loadingColor="error"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#07</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/320?random=308"
                        alt="Wide"
                        width={ 400 }
                        height={ 320 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="spinner"
                        loadingColor="primary"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#08</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/580?random=309"
                        alt="Portrait 3"
                        width={ 400 }
                        height={ 580 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="dots"
                        loadingColor="secondary"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#09</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/380?random=310"
                        alt="Landscape 3"
                        width={ 400 }
                        height={ 380 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="bars"
                        loadingColor="accent"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#10</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/520?random=311"
                        alt="Portrait 4"
                        width={ 400 }
                        height={ 520 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="ball"
                        loadingColor="info"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#11</Badge> }
                    />

                    <Picture
                        src="https://picsum.photos/400/340?random=312"
                        alt="Landscape 4"
                        width={ 400 }
                        height={ 340 }
                        className="rounded-box overflow-hidden shadow-md"
                        loadingAnimation="infinity"
                        loadingColor="success"
                        loadingSize="md"
                        topRight={ <Badge color='success'>#12</Badge> }
                    />
                </Masonry>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Masonry</code></pre>
                    <pre data-prefix="2"><code>    columns={'{ { xs: 2, sm: 2, md: 3, lg: 4 } }'}</code></pre>
                    <pre data-prefix="3"><code>    gap={'{ 4 }'}</code></pre>
                    <pre data-prefix="4"><code>&gt;</code></pre>
                    <pre data-prefix="5"><code>    &lt;Picture</code></pre>
                    <pre data-prefix="6"><code>        src="https://picsum.photos/400/600"</code></pre>
                    <pre data-prefix="7"><code>        width={'{ 400 }'}</code></pre>
                    <pre data-prefix="8"><code>        height={'{ 600 }'}</code></pre>
                    <pre data-prefix="9"><code>        loadingAnimation="ring"</code></pre>
                    <pre data-prefix="10"><code>    /&gt;</code></pre>
                    <pre data-prefix="11"><code>    <span className="text-info">// More pictures with varying heights...</span></code></pre>
                    <pre data-prefix="12"><code>&lt;/Masonry&gt;</code></pre>
                </div>

                <div className="alert alert-info">
                    <span className="text-sm">
                        💡 <strong>Tip:</strong> Masonry layout automatically distributes images across columns.
                        Images with different heights create a natural, flowing layout without gaps.
                    </span>
                </div>
            </div>

            <Divider />

            {/* Lazy Mount */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Lazy Mount (Load on Scroll)
                </h3>

                <p className="text-sm opacity-70">
                    Images are only mounted in the DOM when they enter the viewport.
                    Scroll down to see images load progressively.
                </p>

                <div className="alert alert-info">
                    <span className="text-sm">
                        💡 <strong>lazyMount</strong> differs from native browser lazy loading:
                        the entire component is not rendered until visible — saves DOM nodes and network requests.
                    </span>
                </div>

                {/* Comparison: normal vs lazy */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">Normal vs Lazy Mount</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">Normal (loaded immediately)</code>
                            <Picture
                                src="https://picsum.photos/600/400?random=lazy01"
                                alt="Normal loading"
                                width={ 600 }
                                height={ 400 }
                                className="rounded-box overflow-hidden shadow-md"
                                loadingAnimation="ring"
                                loadingColor="primary"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">lazyMount (loaded on scroll)</code>
                            <Picture
                                src="https://picsum.photos/600/400?random=lazy02"
                                alt="Lazy mount"
                                width={ 600 }
                                height={ 400 }
                                className="rounded-box overflow-hidden shadow-md"
                                loadingAnimation="ring"
                                loadingColor="secondary"
                                lazyMount
                            />
                        </div>
                    </div>
                </div>

                {/* Large lazy grid */}
                <div className="flex flex-col gap-2 mt-4">
                    <h4 className="font-semibold">Grid of 12 lazy images</h4>
                    <p className="text-sm opacity-70">
                        Each image mounts only when it enters the viewport (200px margin).
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        { Array.from( { length : 12 } , ( _ , i ) => (
                            <div key={ i } className="flex flex-col gap-1">
                                <code className="badge badge-xs badge-ghost">
                                    #{ String( i + 1 ).padStart( 2 , '0' ) }
                                </code>
                                <Picture
                                    src={ `https://picsum.photos/400/300?random=lazyg${ i }` }
                                    alt={ `Lazy image ${ i + 1 }` }
                                    width={ 400 }
                                    height={ 300 }
                                    className="rounded-box overflow-hidden shadow-md"
                                    loadingAnimation="spinner"
                                    loadingSize="sm"
                                    lazyMount
                                    lazyRootMargin="200px"
                                />
                            </div>
                        ) ) }
                    </div>
                </div>

                {/* Custom margin */}
                <div className="flex flex-col gap-2 mt-4">
                    <h4 className="font-semibold">lazyRootMargin — Preload anticipation</h4>
                    <p className="text-sm opacity-70">
                        <code>lazyRootMargin</code> controls how many pixels before entering the viewport the image starts loading.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">lazyRootMargin="0px" (at the edge)</code>
                            <Picture
                                src="https://picsum.photos/400/250?random=margin01"
                                alt="Margin 0px"
                                width={ 400 }
                                height={ 250 }
                                className="rounded-box overflow-hidden shadow-md"
                                loadingAnimation="ring"
                                loadingColor="error"
                                loadingSize="sm"
                                lazyMount
                                lazyRootMargin="0px"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">lazyRootMargin="200px" (default)</code>
                            <Picture
                                src="https://picsum.photos/400/250?random=margin02"
                                alt="Margin 200px"
                                width={ 400 }
                                height={ 250 }
                                className="rounded-box overflow-hidden shadow-md"
                                loadingAnimation="ring"
                                loadingColor="warning"
                                loadingSize="sm"
                                lazyMount
                                lazyRootMargin="200px"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">lazyRootMargin="500px" (early load)</code>
                            <Picture
                                src="https://picsum.photos/400/250?random=margin03"
                                alt="Margin 500px"
                                width={ 400 }
                                height={ 250 }
                                className="rounded-box overflow-hidden shadow-md"
                                loadingAnimation="ring"
                                loadingColor="success"
                                loadingSize="sm"
                                lazyMount
                                lazyRootMargin="500px"
                            />
                        </div>
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    src="/photo.jpg"</code></pre>
                    <pre data-prefix="3"><code>    width={'{ 400 }'}</code></pre>
                    <pre data-prefix="4"><code>    height={'{ 300 }'}</code></pre>
                    <pre data-prefix="5"><code></code></pre>
                    <pre data-prefix="6"><code>    lazyMount <span className="text-success">// Only mount when visible</span></code></pre>
                    <pre data-prefix="7"><code>    lazyRootMargin="200px" <span className="text-info">// Start loading 200px before visible</span></code></pre>
                    <pre data-prefix="8"><code>    lazyThreshold={'{ 0.1 }'} <span className="text-info">// Trigger when 10% is visible</span></code></pre>
                    <pre data-prefix="9"><code>/&gt;</code></pre>
                </div>

                <div className="alert alert-success">
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="font-semibold">✅ When to use lazyMount?</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li><strong>Long galleries</strong> — grids of 20+ images</li>
                            <li><strong>Infinite lists</strong> — dynamically loaded content</li>
                            <li><strong>Heavy pages</strong> — reduce initial DOM size</li>
                            <li><strong>Mobile</strong> — save bandwidth and battery</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Auto Dimensions & Fill Mode */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Auto Dimensions & Fill Mode
                </h3>

                <div className="alert alert-info">
                    <span className="text-sm">
                        💡 <strong>Fill mode</strong> makes images responsive - they fill their parent container while maintaining aspect ratio.
                        Natural dimensions are displayed in development mode.
                    </span>
                </div>

                {/* Fill mode examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Aspect ratio 16:9 */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">fill + aspect-video (16:9)</code>
                        <div className="relative aspect-video rounded-box overflow-hidden bg-base-300">
                            <Picture
                                src="https://picsum.photos/1920/1080?random=400"
                                alt="Fill mode 16:9"
                                fill
                                objectFit="cover"
                                loadingAnimation="ring"
                                loadingColor="primary"
                                showDimensions={ true }
                                onLoad={ e =>
                                {
                                    console.log( 'Image loaded - Natural size:' , e.target.naturalWidth , 'x' , e.target.naturalWidth ) ;
                                }}
                            />
                        </div>
                    </div>

                    {/* Aspect ratio 4:3 */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">fill + aspect-4/3</code>
                        <div className="relative aspect-4/3 rounded-box overflow-hidden bg-base-300">
                            <Picture
                                src="https://picsum.photos/1200/900?random=401"
                                alt="Fill mode 4:3"
                                fill
                                objectFit="cover"
                                loadingAnimation="spinner"
                                loadingColor="secondary"
                                showDimensions={ true }
                            />
                        </div>
                    </div>

                    {/* Aspect ratio 1:1 (square) */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">fill + aspect-square</code>
                        <div className="relative aspect-square rounded-box overflow-hidden bg-base-300">
                            <Picture
                                src="https://picsum.photos/800/800?random=402"
                                alt="Fill mode square"
                                fill
                                objectFit="cover"
                                loadingAnimation="dots"
                                loadingColor="accent"
                                showDimensions={ true }
                            />
                        </div>
                    </div>

                    {/* Aspect ratio 21:9 (ultrawide) */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">fill + aspect-[21/9]</code>
                        <div className="relative aspect-21/9 rounded-box overflow-hidden bg-base-300">
                            <Picture
                                src="https://picsum.photos/2100/900?random=403"
                                alt="Fill mode ultrawide"
                                fill
                                objectFit="cover"
                                loadingAnimation="bars"
                                loadingColor="info"
                                showDimensions={ true }
                            />
                        </div>
                    </div>

                </div>

                {/* Object fit variations */}
                <div className="flex flex-col gap-2 mt-4">
                    <h4 className="font-semibold">Object Fit Variations</h4>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">objectFit="cover"</code>
                            <div className="relative h-40 rounded-box overflow-hidden bg-base-300">
                                <Picture
                                    src="https://picsum.photos/800/1200?random=410"
                                    alt="Object fit cover"
                                    fill
                                    objectFit="cover"
                                    loadingSize="sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">objectFit="contain"</code>
                            <div className="relative h-40 rounded-box overflow-hidden bg-base-300">
                                <Picture
                                    src="https://picsum.photos/800/1200?random=411"
                                    alt="Object fit contain"
                                    fill
                                    objectFit="contain"
                                    loadingSize="sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">objectFit="fill"</code>
                            <div className="relative h-40 rounded-box overflow-hidden bg-base-300">
                                <Picture
                                    src="https://picsum.photos/800/1200?random=412"
                                    alt="Object fit fill"
                                    fill
                                    objectFit="fill"
                                    loadingSize="sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <code className="badge badge-sm">objectFit="none"</code>
                            <div className="relative h-40 rounded-box overflow-hidden bg-base-300">
                                <Picture
                                    src="https://picsum.photos/800/1200?random=413"
                                    alt="Object fit none"
                                    fill
                                    objectFit="none"
                                    loadingSize="sm"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;div className="relative aspect-video"&gt;</code></pre>
                    <pre data-prefix="2"><code>    &lt;Picture</code></pre>
                    <pre data-prefix="3"><code>        src="/banner.jpg"</code></pre>
                    <pre data-prefix="4"><code>        alt="Responsive banner"</code></pre>
                    <pre data-prefix="5"><code>        fill <span className="text-success">// Responsive mode</span></code></pre>
                    <pre data-prefix="6"><code>        objectFit="cover" <span className="text-success">// or contain, fill, none</span></code></pre>
                    <pre data-prefix="7"><code>        onLoad={'{ (img) => {'}</code></pre>
                    <pre data-prefix="8"><code>            console.log(img.naturalWidth, img.naturalHeight);</code></pre>
                    <pre data-prefix="9"><code>        {'} }'}</code></pre>
                    <pre data-prefix="10"><code>    /&gt;</code></pre>
                    <pre data-prefix="11"><code>&lt;/div&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Practical Use Cases
                </h3>

                {/* Use Case 1: Responsive Gallery */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">1. Responsive Gallery Grid</h4>
                    <p className="text-sm opacity-70">
                        Grid with uniform aspect ratios - perfect for photo galleries
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        { [ 501 , 502 , 503 , 504 , 505 , 506 , 507 , 508 ].map( id => (
                            <div key={ id } className="relative aspect-square rounded-box overflow-hidden bg-base-300 hover:scale-105 transition-transform cursor-pointer">
                                <Picture
                                    src={ `https://picsum.photos/600/600?random=${ id }` }
                                    alt={ `Gallery image ${ id }` }
                                    fill
                                    objectFit="cover"
                                    loadingAnimation="ring"
                                    loadingColor="primary"
                                    loadingSize="sm"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"&gt;</code></pre>
                        <pre data-prefix="2"><code>    {'{ photos.map(photo => ('}</code></pre>
                        <pre data-prefix="3"><code>        &lt;div className="relative aspect-square rounded-box overflow-hidden"&gt;</code></pre>
                        <pre data-prefix="4"><code>            &lt;Picture</code></pre>
                        <pre data-prefix="5"><code>                src={'{ photo.url }'}</code></pre>
                        <pre data-prefix="6"><code>                alt={'{ photo.title }'}</code></pre>
                        <pre data-prefix="7"><code>                fill</code></pre>
                        <pre data-prefix="8"><code>                objectFit="cover"</code></pre>
                        <pre data-prefix="9"><code>            /&gt;</code></pre>
                        <pre data-prefix="10"><code>        &lt;/div&gt;</code></pre>
                        <pre data-prefix="11"><code>    {')) }'}</code></pre>
                        <pre data-prefix="12"><code>&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <Divider className="my-2" />

                {/* Use Case 2: Hero Banner */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">2. Adaptive Hero Banner</h4>
                    <p className="text-sm opacity-70">
                        Full-width banner with ultrawide aspect ratio - great for headers
                    </p>

                    <div className="relative aspect-21/9 w-full rounded-box overflow-hidden bg-base-300 shadow-xl">
                        <Picture
                            src="https://picsum.photos/2100/900?random=600"
                            alt="Hero banner"
                            fill
                            priority
                            objectFit="cover"
                            loadingAnimation="bars"
                            loadingColor="primary"
                            loadingSize="xl"
                        />

                        {/* Overlay content */}
                        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-r from-black/50 to-transparent">
                            <div className="text-center text-white">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Oihana Next UI</h1>
                                <p className="text-lg md:text-xl opacity-90">Next JS OpenSource UI Library</p>
                            </div>
                        </div>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;div className="relative aspect-21/9 w-full"&gt;</code></pre>
                        <pre data-prefix="2"><code>    &lt;Picture</code></pre>
                        <pre data-prefix="3"><code>        src="/hero.jpg"</code></pre>
                        <pre data-prefix="4"><code>        alt="Hero"</code></pre>
                        <pre data-prefix="5"><code>        fill</code></pre>
                        <pre data-prefix="6"><code>        priority <span className="text-warning">// Above the fold</span></code></pre>
                        <pre data-prefix="7"><code>        objectFit="cover"</code></pre>
                        <pre data-prefix="8"><code>    /&gt;</code></pre>
                        <pre data-prefix="9"><code>    &lt;div className="absolute inset-0 ..."&gt;</code></pre>
                        <pre data-prefix="10"><code>        <span className="text-info">{'{ /* Overlay content */ }'}</span></code></pre>
                        <pre data-prefix="11"><code>    &lt;/div&gt;</code></pre>
                        <pre data-prefix="12"><code>&lt;/div&gt;</code></pre>
                    </div>
                </div>

                <Divider className="my-2" />

                {/* Use Case 3: Dimension Detection */}
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">3. Auto Dimension Detection</h4>
                    <p className="text-sm opacity-70">
                        Retrieve natural image dimensions for processing or display
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1">
                            <Picture
                                src="https://picsum.photos/1920/1080?random=700"
                                alt="Dimension detection"
                                width={ 480 }
                                height={ 270 }
                                className="rounded-box overflow-hidden shadow-md"
                                loadingAnimation="spinner"
                                loadingColor="accent"
                                showDimensions={ true }
                                onLoad={ e =>
                                {
                                    console.log( '📸 Image loaded!' ) ;
                                    console.log( '   Natural dimensions:' , e.target.naturalWidth , 'x' , e.target.naturalHeight ) ;
                                    console.log( '   Displayed dimensions:' , e.target.width , 'x' , e.target.height ) ;
                                }}
                            />
                        </div>

                        <div className="flex-1">
                            <div className="alert alert-success">
                                <div className="flex flex-col gap-2 text-sm">
                                    <div className="font-semibold">Open your browser console to see:</div>
                                    <ul className="list-disc list-inside space-y-1 text-xs">
                                        <li><code>naturalWidth</code> & <code>naturalHeight</code> (original image size)</li>
                                        <li><code>width</code> & <code>height</code> (displayed size)</li>
                                        <li>Useful for image processing, validation, or analytics</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mockup-window bg-base-200 border mt-4">
                                <div className="bg-base-100 p-4 font-mono text-xs">
                                    <div className="text-success">📸 Image loaded!</div>
                                    <div className="text-base-content/70 ml-3">Natural dimensions: 1920 x 1080</div>
                                    <div className="text-base-content/70 ml-3">Displayed dimensions: 480 x 270</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mockup-code text-xs">
                        <pre data-prefix="1"><code>&lt;Picture</code></pre>
                        <pre data-prefix="2"><code>    src={'{ userUpload }'}</code></pre>
                        <pre data-prefix="3"><code>    width={'{ 800 }'}</code></pre>
                        <pre data-prefix="4"><code>    height={'{ 600 }'}</code></pre>
                        <pre data-prefix="5"><code>    onLoad={'{ (img) => {'}</code></pre>
                        <pre data-prefix="6"><code>        <span className="text-info">// Get natural dimensions</span></code></pre>
                        <pre data-prefix="7"><code>        const width = img.naturalWidth;</code></pre>
                        <pre data-prefix="8"><code>        const height = img.naturalHeight;</code></pre>
                        <pre data-prefix="9"><code></code></pre>
                        <pre data-prefix="10"><code>        <span className="text-info">// Save to database, validate, etc.</span></code></pre>
                        <pre data-prefix="11"><code>        saveDimensions(width, height);</code></pre>
                        <pre data-prefix="12"><code>    {'} }'}</code></pre>
                        <pre data-prefix="13"><code>/&gt;</code></pre>
                    </div>
                </div>

                <div className="alert alert-info mt-4">
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="font-semibold">💡 Use Cases Summary:</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li><strong>Gallery:</strong> Uniform grid with <code>aspect-square</code> + <code>fill</code></li>
                            <li><strong>Hero Banner:</strong> Wide format with <code>aspect-[21/9]</code> + <code>priority</code></li>
                            <li><strong>Dimensions:</strong> Use <code>onLoad</code> to get natural size</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Corner Content & Overlays */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Corner Content & Overlays
                </h3>

                <p className="text-sm opacity-70">
                    Add any content to the four corners of your images: badges, buttons, icons, text, etc.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Example 1: Product with badges */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">E-commerce Product</code>
                        <Picture
                            src="https://picsum.photos/600/800?random=801"
                            alt="Product"
                            width={ 600 }
                            height={ 800 }
                            className="rounded-box overflow-hidden shadow-lg"
                            topLeft={ <Badge color="error" size="lg">-30%</Badge> }
                            topRight={ <Button size="sm" shape="circle" color="ghost" icon={ MdFavorite } /> }
                            bottomLeft={
                                <div className="bg-base-100/90 backdrop-blur px-3 py-1 rounded-box">
                                    <div className="text-2xl font-bold text-primary">$349</div>
                                    <div className="text-sm line-through opacity-50">$499</div>
                                </div>
                            }
                            bottomRight={ <Badge color="success">In Stock</Badge> }
                            loadingAnimation="ring"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 2: Photo with metadata */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Photo Gallery</code>
                        <Picture
                            src="https://picsum.photos/600/800?random=802"
                            alt="Gallery photo"
                            width={ 600 }
                            height={ 800 }
                            className="rounded-box overflow-hidden shadow-lg"
                            topLeft={
                                <div className="bg-black/50 backdrop-blur text-white px-2 py-1 rounded-box text-xs">
                                    📸 Canon EOS R5
                                </div>
                            }
                            topRight={
                                <div className="flex gap-1">
                                    <Button size="xs" shape="circle" color="ghost" className="bg-black/30 text-white" icon={ MdShare } />
                                    <Button size="xs" shape="circle" color="ghost" className="bg-black/30 text-white" icon={ MdEdit } />
                                </div>
                            }
                            bottomLeft={
                                <div className="bg-black/50 backdrop-blur text-white px-2 py-1 rounded-box text-xs">
                                    ⭐ 4.8 (124 likes)
                                </div>
                            }
                            showDimensions
                            dimensionsPosition="bottom-right"
                            loadingAnimation="spinner"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 3: Real estate listing */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Real Estate</code>
                        <Picture
                            src="https://picsum.photos/600/400?random=803"
                            alt="Property"
                            width={ 600 }
                            height={ 400 }
                            className="rounded-box overflow-hidden shadow-lg"
                            topLeft={ <Badge color="primary" size="lg">Featured</Badge> }
                            topRight={
                                <div className="bg-success/90 text-success-content px-3 py-1 rounded-box font-bold">
                                    NEW
                                </div>
                            }
                            bottomLeft={
                                <div className="bg-base-100/95 backdrop-blur px-4 py-2 rounded-box">
                                    <div className="text-sm opacity-70">Starting at</div>
                                    <div className="text-3xl font-bold text-primary">$1.2M</div>
                                </div>
                            }
                            bottomRight={
                                <div className="bg-base-100/95 backdrop-blur px-3 py-1 rounded-box text-sm">
                                    🛏️ 3 beds · 🚿 2 baths
                                </div>
                            }
                            loadingAnimation="dots"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 4: Video thumbnail */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Video Thumbnail</code>
                        <Picture
                            src="https://picsum.photos/600/400?random=804"
                            alt="Video"
                            width={ 600 }
                            height={ 400 }
                            className="rounded-box overflow-hidden shadow-lg"
                            topRight={
                                <Badge color="error">
                                    <span className="inline-block w-2 h-2 bg-error-content rounded-full animate-pulse mr-1" />
                                    LIVE
                                </Badge>
                            }
                            bottomLeft={
                                <div className="bg-black/70 backdrop-blur text-white px-2 py-1 rounded-box text-xs">
                                    ⏱️ 12:45
                                </div>
                            }
                            bottomRight={
                                <Button size="lg" shape="circle" color="primary" className="opacity-90 hover:opacity-100">
                                    <MdPlayArrow size={ 32 } />
                                </Button>
                            }
                            loadingAnimation="bars"
                            loadingSize="md"
                        />
                    </div>

                </div>

                <div className="mockup-code text-xs mt-4">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    src="/product.jpg"</code></pre>
                    <pre data-prefix="3"><code>    width={'{ 600 }'}</code></pre>
                    <pre data-prefix="4"><code>    height={'{ 800 }'}</code></pre>
                    <pre data-prefix="5"><code></code></pre>
                    <pre data-prefix="6"><code>    <span className="text-success">// Corner content</span></code></pre>
                    <pre data-prefix="7"><code>    topLeft={'{ <Badge color="error">-30%</Badge> }'}</code></pre>
                    <pre data-prefix="8"><code>    topRight={'{ <Button icon={FavoriteIcon} /> }'}</code></pre>
                    <pre data-prefix="9"><code>    bottomLeft={'{ <div>$349</div> }'}</code></pre>
                    <pre data-prefix="10"><code>    bottomRight={'{ <Badge>In Stock</Badge> }'}</code></pre>
                    <pre data-prefix="11"><code></code></pre>
                    <pre data-prefix="12"><code>    <span className="text-success">// Optional dimensions</span></code></pre>
                    <pre data-prefix="13"><code>    showDimensions</code></pre>
                    <pre data-prefix="14"><code>    dimensionsPosition="bottom-right"</code></pre>
                    <pre data-prefix="15"><code>/&gt;</code></pre>
                </div>

                <div className="alert alert-info">
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="font-semibold">💡 Corner Positions Available:</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li><code>topLeft</code> - Top-left corner (e.g., badges, labels)</li>
                            <li><code>topRight</code> - Top-right corner (e.g., action buttons)</li>
                            <li><code>bottomLeft</code> - Bottom-left corner (e.g., price, metadata)</li>
                            <li><code>bottomRight</code> - Bottom-right corner (e.g., status, CTA)</li>
                            <li><code>showDimensions</code> - Display natural image dimensions</li>
                            <li><code>dimensionsPosition</code> - Where to place dimensions badge</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Center Content Examples */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Center Content Examples
                </h3>

                <p className="text-sm opacity-70">
                    Place content in the center of images - perfect for play buttons, overlay text, or call-to-actions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Example 1: Video play button */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Video Thumbnail</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=901"
                            alt="Video"
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            center={
                                <Button
                                    size="lg"
                                    shape="circle"
                                    color="primary"
                                    className="w-20 h-20 opacity-90 hover:opacity-100 hover:scale-110 transition-all"
                                >
                                    <MdPlayArrow size={ 48 } />
                                </Button>
                            }
                            topRight={
                                <Badge color="error">
                                    <span className="inline-block w-2 h-2 bg-error-content rounded-full animate-pulse mr-1" />
                                    LIVE
                                </Badge>
                            }
                            bottomLeft={
                                <div className="bg-black/70 backdrop-blur text-white px-2 py-1 rounded-box text-xs">
                                    ⏱️ 45:32
                                </div>
                            }
                            loadingAnimation="ring"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 2: Image with text overlay */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Hero Overlay</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=902"
                            alt="Hero"
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            center={
                                <div className="text-center text-white space-y-4">
                                    <h2 className="text-4xl font-bold drop-shadow-lg">
                                        Premium Wood Furniture
                                    </h2>
                                    <p className="text-lg drop-shadow">
                                        Handcrafted Excellence Since 1995
                                    </p>
                                    <Button color="primary" size="lg">
                                        Discover Collection
                                    </Button>
                                </div>
                            }
                            loadingAnimation="spinner"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 3: Locked content */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Premium Content</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=903"
                            alt="Premium"
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            imageClassName="blur-sm"
                            center={
                                <div className="bg-base-100/95 backdrop-blur-xl rounded-box p-8 text-center space-y-4 max-w-sm">
                                    <div className="text-6xl">🔒</div>
                                    <h3 className="text-2xl font-bold">Premium Content</h3>
                                    <p className="text-sm opacity-70">
                                        Subscribe to unlock exclusive photos and videos
                                    </p>
                                    <Button color="primary" size="lg" className="w-full">
                                        Unlock Now
                                    </Button>
                                </div>
                            }
                            loadingAnimation="dots"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 4: Zoom/Preview */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Image Preview</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=904"
                            alt="Preview"
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg group cursor-pointer"
                            center={
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm rounded-full p-4">
                                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            }
                            topRight={ <Badge color="info">HD Quality</Badge> }
                            bottomRight={ <div className="badge badge-sm">Click to zoom</div> }
                            loadingAnimation="bars"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 5: Coming Soon */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Coming Soon</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=905"
                            alt="Coming soon"
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            imageClassName="grayscale"
                            center={
                                <div className="bg-linear-to-r from-primary to-secondary text-primary-content rounded-box px-8 py-6 text-center transform -rotate-12 shadow-2xl">
                                    <div className="text-3xl font-bold">COMING SOON</div>
                                    <div className="text-sm mt-2">March 2026</div>
                                </div>
                            }
                            loadingAnimation="ball"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 6: Call to Action */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">CTA Overlay</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=906"
                            alt="CTA"
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            center={
                                <div className="bg-linear-to-t from-black/80 via-black/40 to-transparent absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-white space-y-3 px-4">
                                        <div className="text-5xl">🌲</div>
                                        <h3 className="text-2xl font-bold">Sustainable Wood</h3>
                                        <p className="text-sm max-w-md">
                                            100% eco-friendly materials sourced from certified forests
                                        </p>
                                        <div className="flex gap-2 justify-center">
                                            <Button color="primary" size="sm">Learn More</Button>
                                            <Button color="ghost" size="sm" className="text-white">Shop Now</Button>
                                        </div>
                                    </div>
                                </div>
                            }
                            topLeft={ <Badge color="success">Eco-Friendly</Badge> }
                            loadingAnimation="infinity"
                            loadingSize="md"
                        />
                    </div>

                </div>

                <div className="mockup-code text-xs mt-4">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    src="/video-thumbnail.jpg"</code></pre>
                    <pre data-prefix="3"><code>    width={'{ 800 }'}</code></pre>
                    <pre data-prefix="4"><code>    height={'{ 450 }'}</code></pre>
                    <pre data-prefix="5"><code></code></pre>
                    <pre data-prefix="6"><code>    <span className="text-success">// Center content</span></code></pre>
                    <pre data-prefix="7"><code>    center={'{'}</code></pre>
                    <pre data-prefix="8"><code>        &lt;Button size="lg" shape="circle"&gt;</code></pre>
                    <pre data-prefix="9"><code>            &lt;PlayIcon /&gt;</code></pre>
                    <pre data-prefix="10"><code>        &lt;/Button&gt;</code></pre>
                    <pre data-prefix="11"><code>    {'}'}</code></pre>
                    <pre data-prefix="12"><code></code></pre>
                    <pre data-prefix="13"><code>    <span className="text-success">// Can combine with corners</span></code></pre>
                    <pre data-prefix="14"><code>    topRight={'{ <Badge>LIVE</Badge> }'}</code></pre>
                    <pre data-prefix="15"><code>    bottomLeft={'{ <div>Duration</div> }'}</code></pre>
                    <pre data-prefix="16"><code>/&gt;</code></pre>
                </div>

                <div className="alert alert-info">
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="font-semibold">💡 Center Content Use Cases:</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li><strong>Play Buttons:</strong> Video/audio thumbnails with play controls</li>
                            <li><strong>Hero Text:</strong> Centered headlines and CTAs over images</li>
                            <li><strong>Premium Overlays:</strong> Locked content with unlock prompts</li>
                            <li><strong>Interactive Icons:</strong> Zoom, preview, or action buttons</li>
                            <li><strong>Status Messages:</strong> "Coming Soon", "Sold Out", etc.</li>
                            <li><strong>Call to Actions:</strong> Centered buttons and promotional content</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Dark Mode Support */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Dark Mode Support
                </h3>

                <p className="text-sm opacity-70">
                    Automatically switch between light and dark images based on the theme.
                </p>

                <div className="alert alert-info">
                    <span className="text-sm">
                        💡 Toggle your theme to see the images change automatically!
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Example 1: Logo */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Logo with Dark Mode</code>
                        <div className="flex items-center justify-center bg-base-100 rounded-box p-8">
                            <Picture
                                src="https://picsum.photos/400/100?random=1001"
                                dark="https://picsum.photos/400/100?random=1008"
                                alt="Logo"
                                width={ 400 }
                                height={ 100 }
                                showLoading={ false }
                            />
                        </div>
                        <p className="text-xs opacity-70">
                            Light theme shows first image, dark theme shows second image
                        </p>
                    </div>

                    {/* Example 2: Hero Banner */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Hero Banner with Dark Mode</code>
                        <Picture
                            src="https://picsum.photos/600/300?random=1003"
                            dark="https://picsum.photos/600/300?random=1004"
                            alt="Hero"
                            width={ 600 }
                            height={ 300 }
                            className="rounded-box overflow-hidden shadow-lg"
                            center={
                                <div className="text-center text-white">
                                    <h3 className="text-2xl font-bold drop-shadow-lg">
                                        Theme-Aware Hero
                                    </h3>
                                </div>
                            }
                            loadingAnimation="ring"
                            loadingSize="md"
                        />
                    </div>

                    {/* Example 3: Product Image */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Product with Dark Variant</code>
                        <Picture
                            src="https://picsum.photos/500/500?random=1005"
                            dark="https://picsum.photos/500/500?random=1006"
                            alt="Product"
                            width={ 500 }
                            height={ 500 }
                            className="rounded-box overflow-hidden shadow-lg"
                            topLeft={ <Badge color="error">-30%</Badge> }
                            bottomRight={
                                <Button color="primary" size="sm">
                                    Add to Cart
                                </Button>
                            }
                            loadingAnimation="dots"
                            loadingSize="sm"
                        />
                    </div>

                    {/* Example 4: Illustration */}
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">Illustration (Fill Mode)</code>
                        <div className="relative aspect-square rounded-box overflow-hidden bg-base-300 shadow-lg">
                            <Picture
                                src="https://picsum.photos/800/800?random=1007"
                                dark="https://picsum.photos/800/800?random=1008"
                                alt="Illustration"
                                fill
                                objectFit="cover"
                                topRight={ <Badge color="info">Premium</Badge> }
                                loadingAnimation="spinner"
                                loadingSize="md"
                            />
                        </div>
                    </div>

                </div>

                <div className="mockup-code text-xs mt-4">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    src="/logo-light.png" <span className="text-success">// Light mode image</span></code></pre>
                    <pre data-prefix="3"><code>    dark="/logo-dark.png" <span className="text-success">// Dark mode image</span></code></pre>
                    <pre data-prefix="4"><code>    alt="Logo"</code></pre>
                    <pre data-prefix="5"><code>    width={'{ 400 }'}</code></pre>
                    <pre data-prefix="6"><code>    height={'{ 100 }'}</code></pre>
                    <pre data-prefix="7"><code></code></pre>
                    <pre data-prefix="8"><code>    <span className="text-info">// Works with all Picture features</span></code></pre>
                    <pre data-prefix="9"><code>    topLeft={'{ <Badge>New</Badge> }'}</code></pre>
                    <pre data-prefix="10"><code>    center={'{ <Button>Click</Button> }'}</code></pre>
                    <pre data-prefix="11"><code>    showDimensions</code></pre>
                    <pre data-prefix="12"><code>/&gt;</code></pre>
                </div>

                <div className="alert alert-success">
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="font-semibold">✅ Dark Mode Benefits:</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li><strong>Automatic switching:</strong> Images change with theme (no JS required)</li>
                            <li><strong>Full compatibility:</strong> Works with all Picture features (corners, center, fill, etc.)</li>
                            <li><strong>Backward compatible:</strong> Optional - works like before if <code>dark</code> prop is omitted</li>
                            <li><strong>Performance:</strong> Only one image loaded at a time (CSS handles visibility)</li>
                            <li><strong>Use cases:</strong> Logos, illustrations, diagrams, hero banners, products</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Loading Animations */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Loading Animations
                </h3>

                <div className="flex gap-2 items-center">
                    <Button size="sm" color="ghost" icon={ MdRefresh } onClick={ reloadAnimation }>
                        Reload All
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">spinner</code>
                            { loadedImages['animation-spinner'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `spinner-${ animationKey }` }
                            src={ `https://picsum.photos/400/300?random=${ animationKey + 1 }` }
                            alt="Spinner animation"
                            width={ 400 }
                            height={ 300 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="spinner"
                            onLoad={ () => handleImageLoad( 'animation-spinner' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">ring</code>
                            { loadedImages['animation-ring'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `ring-${ animationKey }` }
                            src={ `https://picsum.photos/400/300?random=${ animationKey + 2 }` }
                            alt="Ring animation"
                            width={ 400 }
                            height={ 300 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="ring"
                            onLoad={ () => handleImageLoad( 'animation-ring' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">dots</code>
                            { loadedImages['animation-dots'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `dots-${ animationKey }` }
                            src={ `https://picsum.photos/400/300?random=${ animationKey + 3 }` }
                            alt="Dots animation"
                            width={ 400 }
                            height={ 300 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="dots"
                            onLoad={ () => handleImageLoad( 'animation-dots' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">bars</code>
                            { loadedImages['animation-bars'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `bars-${ animationKey }` }
                            src={ `https://picsum.photos/400/300?random=${ animationKey + 4 }` }
                            alt="Bars animation"
                            width={ 400 }
                            height={ 300 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="bars"
                            onLoad={ () => handleImageLoad( 'animation-bars' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">ball</code>
                            { loadedImages['animation-ball'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `ball-${ animationKey }` }
                            src={ `https://picsum.photos/400/300?random=${ animationKey + 5 }` }
                            alt="Ball animation"
                            width={ 400 }
                            height={ 300 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="ball"
                            onLoad={ () => handleImageLoad( 'animation-ball' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">infinity</code>
                            { loadedImages['animation-infinity'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `infinity-${ animationKey }` }
                            src={ `https://picsum.photos/400/300?random=${ animationKey + 6 }` }
                            alt="Infinity animation"
                            width={ 400 }
                            height={ 300 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="infinity"
                            onLoad={ () => handleImageLoad( 'animation-infinity' ) }
                        />
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    loadingAnimation="spinner" <span className="text-info">// or ring, dots, bars, ball, infinity</span></code></pre>
                    <pre data-prefix="3"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Loading Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    Loading Sizes
                </h3>

                <div className="flex gap-2 items-center">
                    <Button size="sm" color="ghost" icon={ MdRefresh } onClick={ reloadSize }>
                        Reload All
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">xs</code>
                            { loadedImages['size-xs'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `xs-${ sizeKey }` }
                            src={ `https://picsum.photos/200/150?random=${ sizeKey + 10 }` }
                            alt="XS size"
                            width={ 200 }
                            height={ 150 }
                            className="rounded-box overflow-hidden"
                            loadingSize="xs"
                            onLoad={ () => handleImageLoad( 'size-xs' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">sm</code>
                            { loadedImages['size-sm'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `sm-${ sizeKey }` }
                            src={ `https://picsum.photos/200/150?random=${ sizeKey + 11 }` }
                            alt="SM size"
                            width={ 200 }
                            height={ 150 }
                            className="rounded-box overflow-hidden"
                            loadingSize="sm"
                            onLoad={ () => handleImageLoad( 'size-sm' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">md</code>
                            { loadedImages['size-md'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `md-${ sizeKey }` }
                            src={ `https://picsum.photos/200/150?random=${ sizeKey + 12 }` }
                            alt="MD size"
                            width={ 200 }
                            height={ 150 }
                            className="rounded-box overflow-hidden"
                            loadingSize="md"
                            onLoad={ () => handleImageLoad( 'size-md' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">lg</code>
                            { loadedImages['size-lg'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `lg-${ sizeKey }` }
                            src={ `https://picsum.photos/200/150?random=${ sizeKey + 13 }` }
                            alt="LG size"
                            width={ 200 }
                            height={ 150 }
                            className="rounded-box overflow-hidden"
                            loadingSize="lg"
                            onLoad={ () => handleImageLoad( 'size-lg' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm">xl</code>
                            { loadedImages['size-xl'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `xl-${ sizeKey }` }
                            src={ `https://picsum.photos/200/150?random=${ sizeKey + 14 }` }
                            alt="XL size"
                            width={ 200 }
                            height={ 150 }
                            className="rounded-box overflow-hidden"
                            loadingSize="xl"
                            onLoad={ () => handleImageLoad( 'size-xl' ) }
                        />
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    loadingSize="xs" <span className="text-info">// or sm, md, lg, xl</span></code></pre>
                    <pre data-prefix="3"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Loading Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    Loading Colors
                </h3>

                <div className="flex gap-2 items-center">
                    <Button size="sm" color="ghost" icon={ MdRefresh } onClick={ reloadColor }>
                        Reload All
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm badge-primary">primary</code>
                            { loadedImages['color-primary'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `primary-${ colorKey }` }
                            src={ `https://picsum.photos/300/200?random=${ colorKey + 20 }` }
                            alt="Primary color"
                            width={ 300 }
                            height={ 200 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="ring"
                            loadingColor="primary"
                            onLoad={ () => handleImageLoad( 'color-primary' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm badge-secondary">secondary</code>
                            { loadedImages['color-secondary'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `secondary-${ colorKey }` }
                            src={ `https://picsum.photos/300/200?random=${ colorKey + 21 }` }
                            alt="Secondary color"
                            width={ 300 }
                            height={ 200 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="ring"
                            loadingColor="secondary"
                            onLoad={ () => handleImageLoad( 'color-secondary' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm badge-accent">accent</code>
                            { loadedImages['color-accent'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `accent-${ colorKey }` }
                            src={ `https://picsum.photos/300/200?random=${ colorKey + 22 }` }
                            alt="Accent color"
                            width={ 300 }
                            height={ 200 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="ring"
                            loadingColor="accent"
                            onLoad={ () => handleImageLoad( 'color-accent' ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <code className="badge badge-sm badge-error">error</code>
                            { loadedImages['color-error'] && <Badge color="success" size="xs">✓</Badge> }
                        </div>
                        <Picture
                            key={ `error-${ colorKey }` }
                            src={ `https://picsum.photos/300/200?random=${ colorKey + 23 }` }
                            alt="Error color"
                            width={ 300 }
                            height={ 200 }
                            className="rounded-box overflow-hidden"
                            loadingAnimation="ring"
                            loadingColor="error"
                            onLoad={ () => handleImageLoad( 'color-error' ) }
                        />
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    loadingColor="primary" <span className="text-info">// Any TextColor</span></code></pre>
                    <pre data-prefix="3"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Avatars / Round Pictures */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    Round Pictures (Avatars)
                </h3>

                <div className="flex gap-4 flex-wrap justify-center">
                    <Picture
                        src="https://i.pravatar.cc/150?img=1"
                        alt="Avatar 1"
                        width={ 150 }
                        height={ 150 }
                        className="rounded-full overflow-hidden shadow-lg"
                        imageClassName="object-cover"
                        loadingAnimation="ring"
                        loadingSize="md"
                    />

                    <Picture
                        src="https://i.pravatar.cc/150?img=5"
                        alt="Avatar 2"
                        width={ 150 }
                        height={ 150 }
                        className="rounded-full overflow-hidden shadow-lg"
                        imageClassName="object-cover"
                        loadingAnimation="spinner"
                        loadingColor="primary"
                        loadingSize="md"
                    />

                    <Picture
                        src="https://i.pravatar.cc/150?img=8"
                        alt="Avatar 3"
                        width={ 150 }
                        height={ 150 }
                        className="rounded-full overflow-hidden shadow-lg"
                        imageClassName="object-cover"
                        loadingAnimation="dots"
                        loadingColor="secondary"
                        loadingSize="md"
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    src="https://i.pravatar.cc/150?img=1"</code></pre>
                    <pre data-prefix="3"><code>    alt="Avatar"</code></pre>
                    <pre data-prefix="4"><code>    width={'{ 150 }'}</code></pre>
                    <pre data-prefix="5"><code>    height={'{ 150 }'}</code></pre>
                    <pre data-prefix="6"><code>    className="rounded-full overflow-hidden"</code></pre>
                    <pre data-prefix="7"><code>    imageClassName="object-cover"</code></pre>
                    <pre data-prefix="8"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Without Loading Spinner */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Without Loading Spinner
                </h3>

                <div className="flex justify-center">
                    <Picture
                        src="https://picsum.photos/500/300?random=100"
                        alt="No spinner"
                        width={ 500 }
                        height={ 300 }
                        className="rounded-box overflow-hidden shadow-lg"
                        showLoading={ false }
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    showLoading={'{ false }'} <span className="text-warning">// Disable loading spinner</span></code></pre>
                    <pre data-prefix="3"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Priority Loading */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    Priority Loading (Above-the-fold)
                </h3>

                <div className="alert alert-info">
                    <span className="text-sm">
                        Use <code className="badge badge-sm">priority</code> for images that are visible immediately when the page loads (hero banners, above-the-fold content).
                    </span>
                </div>

                <div className="flex justify-center">
                    <Picture
                        src="https://picsum.photos/1200/400?random=200"
                        alt="Hero banner"
                        width={ 1200 }
                        height={ 400 }
                        className="rounded-box overflow-hidden shadow-lg max-w-full"
                        priority
                        loadingAnimation="bars"
                        loadingColor="primary"
                    />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    priority <span className="text-error">// Preload this image (disables lazy loading)</span></code></pre>
                    <pre data-prefix="3"><code>    src="/hero-banner.jpg"</code></pre>
                    <pre data-prefix="4"><code>/&gt;</code></pre>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default PictureDemo ;