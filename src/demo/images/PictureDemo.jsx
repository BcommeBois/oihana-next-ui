'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Button   from '@/components/Button' ;
import Divider  from '@/components/Divider' ;
import Masonry  from '@/components/layouts/Masonry';
import Picture  from '@/components/images/Picture' ;

import Container from '@/display/Container' ;

import {
    MdImageNotSupported ,
    MdPlayArrow ,
    MdEdit ,
    MdFavorite ,
    MdRefresh ,
    MdShare
} from 'react-icons/md' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import getInitials from '@/helpers/strings/getInitials' ;
import hashIndex   from '@/helpers/strings/hashIndex' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * A tint per index, as literal classes — never interpolated, or Tailwind emits
 * none of them.
 * @type {string[]}
 */
const PALETTE =
[
    'bg-primary/15 text-primary' ,
    'bg-secondary/15 text-secondary' ,
    'bg-accent/15 text-accent' ,
    'bg-info/15 text-info' ,
] ;

/**
 * The three named frames of the fallback section : a name to take initials and
 * a tint from, and the key its sentence is read by.
 * @type {Array<{ color : ?string , key : string , name : string }>}
 */
const FALLBACKS =
[
    { key : 'tint'    , name : 'Acme Studio' } ,
    { key : 'other'   , name : 'Borealis Works' } ,
    { color : '#F59E0B' , key : 'carried' , name : 'Amber Group' } ,
] ;

/**
 * The three round pictures, each waiting in its own way.
 * @type {Array<{ animation : string , color : ?string , img : number }>}
 */
const AVATARS =
[
    { animation : 'ring'    , img : 1 } ,
    { animation : 'spinner' , color : 'primary'   , img : 5 } ,
    { animation : 'dots'    , color : 'secondary' , img : 8 } ,
] ;

/** What the centre is for, in the order the list reads. */
const CENTER_USES = [ 'play' , 'hero' , 'premium' , 'icons' , 'status' , 'cta' ] ;

/** What two images per theme are worth, in the order the list reads. */
const DARK_BENEFITS = [ 'automatic' , 'compatible' , 'optional' , 'performance' , 'uses' ] ;

/**
 * The animations the loader can play, in the order the section shows them.
 * @type {string[]}
 */
const LOADING_ANIMATIONS = [ 'spinner' , 'ring' , 'dots' , 'bars' , 'ball' , 'infinity' ] ;

/**
 * The loader sizes, from the smallest.
 * @type {string[]}
 */
const LOADING_SIZES = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

/**
 * The loader colours the section shows, each with the literal badge class that
 * names it — never interpolated, or Tailwind emits none of them.
 * @type {Array<{ badge : string , value : string }>}
 */
const LOADING_COLORS =
[
    { badge : 'badge-primary'   , value : 'primary'   } ,
    { badge : 'badge-secondary' , value : 'secondary' } ,
    { badge : 'badge-accent'    , value : 'accent'    } ,
    { badge : 'badge-error'     , value : 'error'     } ,
] ;

/**
 * The twelve frames of the masonry gallery : a height, the seed of its image,
 * and the loader it plays — the point of the section being that the heights
 * differ, so the columns cannot align. Their alternative text is numbered
 * from the bundle : what each photograph shows is nobody's business here.
 * @type {Array<{ animation : string , color : string , height : number , seed : number }>}
 */
const MASONRY =
[
    { animation : 'ring'     , color : 'primary'   , height : 600 , seed : 301 } ,
    { animation : 'spinner'  , color : 'secondary' , height : 300 , seed : 302 } ,
    { animation : 'dots'     , color : 'accent'    , height : 500 , seed : 303 } ,
    { animation : 'bars'     , color : 'info'      , height : 400 , seed : 304 } ,
    { animation : 'ball'     , color : 'success'   , height : 550 , seed : 305 } ,
    { animation : 'infinity' , color : 'warning'   , height : 350 , seed : 306 } ,
    { animation : 'ring'     , color : 'error'     , height : 450 , seed : 205 } ,
    { animation : 'spinner'  , color : 'primary'   , height : 320 , seed : 308 } ,
    { animation : 'dots'     , color : 'secondary' , height : 580 , seed : 309 } ,
    { animation : 'bars'     , color : 'accent'    , height : 380 , seed : 310 } ,
    { animation : 'ball'     , color : 'info'      , height : 520 , seed : 311 } ,
    { animation : 'infinity' , color : 'success'   , height : 340 , seed : 312 } ,
] ;

/**
 * The four frames of the fill-mode section. The `aspect` class is LITERAL —
 * interpolated, Tailwind emits none of them — and `ratio` is what the badge
 * and the alternative text name it by.
 * @type {Array<{ animation : string , aspect : string , color : string , height : number , ratio : string , seed : number , width : number }>}
 */
const ASPECTS =
[
    { animation : 'ring'     , aspect : 'aspect-video'  , color : 'primary'   , height : 1080 , ratio : '16:9' , seed : 400 , width : 1920 } ,
    { animation : 'spinner'  , aspect : 'aspect-4/3'    , color : 'secondary' , height :  900 , ratio : '4:3'  , seed : 401 , width : 1200 } ,
    { animation : 'dots'     , aspect : 'aspect-square' , color : 'accent'    , height :  800 , ratio : '1:1'  , seed : 402 , width :  800 } ,
    { animation : 'bars'     , aspect : 'aspect-21/9'   , color : 'info'      , height :  900 , ratio : '21:9' , seed : 403 , width : 2100 } ,
] ;

/**
 * The four values of `objectFit`, in the order the section shows them. Their
 * images are the seeds 410 to 413, by position.
 * @type {string[]}
 */
const OBJECT_FITS = [ 'cover' , 'contain' , 'fill' , 'none' ] ;

/**
 * The three margins of the anticipation section : the value, the colour its
 * loader plays in, and the key its sentence is read by.
 * @type {Array<{ color : string , key : string , margin : string , seed : string }>}
 */
const LAZY_MARGINS =
[
    { color : 'error'   , key : 'edge'     , margin : '0px'   , seed : 'margin01' } ,
    { color : 'warning' , key : 'standard' , margin : '200px' , seed : 'margin02' } ,
    { color : 'success' , key : 'early'    , margin : '500px' , seed : 'margin03' } ,
] ;

/** What lazy mounting is worth it for, in the order the list reads. */
const WHEN_KEYS = [ 'galleries' , 'lists' , 'heavy' , 'mobile' ] ;

/** The three use cases, as the summary sums them up. */
const SUMMARY_KEYS = [ 'gallery' , 'hero' , 'dimensions' ] ;

/** The props a corner is passed through, and the two of the dimensions badge. */
const CORNER_POSITIONS = [ 'topLeft' , 'topRight' , 'bottomLeft' , 'bottomRight' , 'showDimensions' , 'dimensionsPosition' ] ;

/**
 * The same map, minus the ids given — what a « Reload all » button leaves
 * behind : the ✓ marks go, a new `key` remounts every picture, and they come
 * back one at a time.
 *
 * @param {Object}   state - Which ids have loaded.
 * @param {string[]} ids   - The ones to forget.
 *
 * @returns {Object} A copy without them.
 */
const forget = ( state , ids ) =>
{
    const next = { ...state } ;

    for ( const id of ids ) { delete next[ id ] ; }

    return next ;
} ;

/**
 * What the `Picture` component does, section by section : how it waits, how a
 * gallery lays it out, how it holds back until the frame comes near, how it
 * fills its parent, what sits in its corners and at its centre, and what it
 * shows with no source at all.
 *
 * 🔑 Blocks that differ only by an API value are LOOPED over that value and
 * labelled BY it — the loader animations, its sizes, its colours, the aspect
 * ratios, the object fits and the lazy margins. A value is not copy.
 *
 * @module demo/images/PictureDemo
 *
 * @param {Object} props
 * @param {string} [props.path='demo.images.picture'] - Dot notation path to the demo locale.
 */
const PictureDemo = ( { path = 'demo.images.picture' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const basic    = t.basic ?? {} ;
    const center   = t.center ?? {} ;
    const corners  = t.corners ?? {} ;
    const darkMode = t.darkMode ?? {} ;
    const dims     = t.dimensions ?? {} ;
    const fallback = t.fallback ?? {} ;
    const lazy     = t.lazy ?? {} ;
    const masonry  = t.masonry ?? {} ;
    const useCases = t.useCases ?? {} ;

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
        setLoadedImages( prev => forget( prev , [ 'basic' ] ) ) ;
    } ;

    const reloadAnimation = () =>
    {
        setAnimationKey( prev => prev + 1 ) ;
        setLoadedImages( prev => forget( prev , LOADING_ANIMATIONS.map( value => `animation-${ value }` ) ) ) ;
    } ;

    const reloadSize = () =>
    {
        setSizeKey( prev => prev + 1 ) ;
        setLoadedImages( prev => forget( prev , LOADING_SIZES.map( value => `size-${ value }` ) ) ) ;
    } ;

    const reloadColor = () =>
    {
        setColorKey( prev => prev + 1 ) ;
        setLoadedImages( prev => forget( prev , LOADING_COLORS.map( ( { value } ) => `color-${ value }` ) ) ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.sections?.basic }
                </h3>

                <div className="flex gap-2 items-center">
                    <Button size="sm" color="ghost" icon={ MdRefresh } onClick={ reloadBasic }>
                        { basic.reload }
                    </Button>

                    { loadedImages.basic && (
                        <Badge color="success">{ basic.loaded }</Badge>
                    )}
                </div>

                <div className="flex justify-center">
                    <Picture
                        key={ basicImageKey }
                        src={ `https://picsum.photos/640/480?random=${ basicImageKey }` }
                        alt={ basic.alt }
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

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    { t.sections?.masonry }
                </h3>

                <p className="text-sm opacity-70">
                    { masonry.description }
                </p>

                <Masonry
                    columns={{ xs: 2 , sm: 2 , md: 3 , lg: 4 }}
                    gap={ 4 }
                    className="w-full"
                >
                    { MASONRY.map( ( { animation , color , height , seed } , index ) => (
                        <Picture
                            key={ seed }
                            src={ `https://picsum.photos/400/${ height }?random=${ seed }` }
                            alt={ format( masonry.alt ?? '' , index + 1 ) }
                            width={ 400 }
                            height={ height }
                            className="rounded-box overflow-hidden shadow-md"
                            loadingAnimation={ animation }
                            loadingColor={ color }
                            loadingSize="md"
                            topRight={ <Badge color='success'>{ `#${ String( index + 1 ).padStart( 2 , '0' ) }` }</Badge> }
                        />
                    ))}
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
                        💡 <strong>{ masonry.tip?.label }</strong> { masonry.tip?.text }
                    </span>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    { t.sections?.lazy }
                </h3>

                <p className="text-sm opacity-70">
                    { lazy.description }
                </p>

                <div className="alert alert-info">
                    <span className="text-sm">
                        💡 <strong>lazyMount</strong> { lazy.note }
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">{ lazy.comparison?.title }</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <code className="badge badge-sm">{ lazy.comparison?.normal }</code>
                                <span className="text-xs opacity-70">{ lazy.comparison?.normalHint }</span>
                            </div>
                            <Picture
                                src="https://picsum.photos/600/400?random=lazy01"
                                alt={ lazy.comparison?.normalAlt }
                                width={ 600 }
                                height={ 400 }
                                className="rounded-box overflow-hidden shadow-md"
                                loadingAnimation="ring"
                                loadingColor="primary"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <code className="badge badge-sm">lazyMount</code>
                                <span className="text-xs opacity-70">{ lazy.comparison?.lazyHint }</span>
                            </div>
                            <Picture
                                src="https://picsum.photos/600/400?random=lazy02"
                                alt={ lazy.comparison?.lazyAlt }
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

                <div className="flex flex-col gap-2 mt-4">
                    <h4 className="font-semibold">{ lazy.grid?.title }</h4>
                    <p className="text-sm opacity-70">
                        { lazy.grid?.description }
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        { Array.from( { length : 12 } , ( _ , i ) => (
                            <div key={ i } className="flex flex-col gap-1">
                                <code className="badge badge-xs badge-ghost">
                                    #{ String( i + 1 ).padStart( 2 , '0' ) }
                                </code>
                                <Picture
                                    src={ `https://picsum.photos/400/300?random=lazyg${ i }` }
                                    alt={ format( lazy.grid?.alt ?? '' , i + 1 ) }
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

                <div className="flex flex-col gap-2 mt-4">
                    <h4 className="font-semibold">lazyRootMargin — { lazy.margin?.title }</h4>
                    <p className="text-sm opacity-70">
                        <code>lazyRootMargin</code> { lazy.margin?.description }
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        { LAZY_MARGINS.map( ( { color , key , margin , seed } ) => (
                            <div key={ key } className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <code className="badge badge-sm">{ `lazyRootMargin="${ margin }"` }</code>
                                    <span className="text-xs opacity-70">{ lazy.margin?.hints?.[ key ] }</span>
                                </div>
                                <Picture
                                    src={ `https://picsum.photos/400/250?random=${ seed }` }
                                    alt={ format( lazy.margin?.alt ?? '' , margin ) }
                                    width={ 400 }
                                    height={ 250 }
                                    className="rounded-box overflow-hidden shadow-md"
                                    loadingAnimation="ring"
                                    loadingColor={ color }
                                    loadingSize="sm"
                                    lazyMount
                                    lazyRootMargin={ margin }
                                />
                            </div>
                        ))}
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
                        <div className="font-semibold">✅ { lazy.when?.title }</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            { WHEN_KEYS.map( key => (
                                <li key={ key }>
                                    <strong>{ lazy.when?.items?.[ key ]?.label }</strong> — { lazy.when?.items?.[ key ]?.text }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.sections?.dimensions }
                </h3>

                <div className="alert alert-info">
                    <span className="text-sm">
                        💡 <strong>{ dims.note?.label }</strong> { dims.note?.text }
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    { ASPECTS.map( ( { animation , aspect , color , height , ratio , seed , width } ) => (
                        <div key={ aspect } className="flex flex-col gap-2">
                            <code className="badge badge-sm">{ `fill + ${ aspect } (${ ratio })` }</code>
                            <div className={ `relative ${ aspect } rounded-box overflow-hidden bg-base-300` }>
                                <Picture
                                    src={ `https://picsum.photos/${ width }/${ height }?random=${ seed }` }
                                    alt={ format( dims.fill?.alt ?? '' , ratio ) }
                                    fill
                                    objectFit="cover"
                                    loadingAnimation={ animation }
                                    loadingColor={ color }
                                    showDimensions={ true }
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <h4 className="font-semibold">{ dims.objectFit?.title }</h4>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        { OBJECT_FITS.map( ( objectFit , index ) => (
                            <div key={ objectFit } className="flex flex-col gap-2">
                                <code className="badge badge-sm">{ `objectFit="${ objectFit }"` }</code>
                                <div className="relative h-40 rounded-box overflow-hidden bg-base-300">
                                    <Picture
                                        src={ `https://picsum.photos/800/1200?random=${ 410 + index }` }
                                        alt={ format( dims.objectFit?.alt ?? '' , objectFit ) }
                                        fill
                                        objectFit={ objectFit }
                                        loadingSize="sm"
                                    />
                                </div>
                            </div>
                        ))}
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

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    { t.sections?.useCases }
                </h3>

                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">1. { useCases.gallery?.title }</h4>
                    <p className="text-sm opacity-70">
                        { useCases.gallery?.description }
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        { [ 501 , 502 , 503 , 504 , 505 , 506 , 507 , 508 ].map( ( id , index ) => (
                            <div key={ id } className="relative aspect-square rounded-box overflow-hidden bg-base-300 hover:scale-105 transition-transform cursor-pointer">
                                <Picture
                                    src={ `https://picsum.photos/600/600?random=${ id }` }
                                    alt={ format( useCases.gallery?.alt ?? '' , index + 1 ) }
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

                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">2. { useCases.hero?.title }</h4>
                    <p className="text-sm opacity-70">
                        { useCases.hero?.description }
                    </p>

                    <div className="relative aspect-21/9 w-full rounded-box overflow-hidden bg-base-300 shadow-xl">
                        <Picture
                            src="https://picsum.photos/2100/900?random=600"
                            alt={ useCases.hero?.alt }
                            fill
                            priority
                            objectFit="cover"
                            loadingAnimation="bars"
                            loadingColor="primary"
                            loadingSize="xl"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-r from-black/50 to-transparent">
                            <div className="text-center text-white">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">{ useCases.hero?.overlay?.title }</h1>
                                <p className="text-lg md:text-xl opacity-90">{ useCases.hero?.overlay?.subtitle }</p>
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

                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold">3. { useCases.dimensions?.title }</h4>
                    <p className="text-sm opacity-70">
                        { useCases.dimensions?.description }
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="flex-1">
                            <Picture
                                src="https://picsum.photos/1920/1080?random=700"
                                alt={ useCases.dimensions?.alt }
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
                                    <div className="font-semibold">{ useCases.dimensions?.console?.title }</div>
                                    <ul className="list-disc list-inside space-y-1 text-xs">
                                        <li><code>naturalWidth</code> & <code>naturalHeight</code> — { useCases.dimensions?.console?.natural }</li>
                                        <li><code>width</code> & <code>height</code> — { useCases.dimensions?.console?.displayed }</li>
                                        <li>{ useCases.dimensions?.console?.useful }</li>
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
                        <div className="font-semibold">💡 { useCases.summary?.title }</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            { SUMMARY_KEYS.map( key => (
                                <li key={ key }>
                                    <strong>{ useCases.summary?.items?.[ key ]?.label }</strong> — { useCases.summary?.items?.[ key ]?.text }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    { t.sections?.corners }
                </h3>

                <p className="text-sm opacity-70">
                    { corners.description }
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ corners.scenarios?.product }</code>
                        <Picture
                            src="https://picsum.photos/600/800?random=801"
                            alt={ corners.product?.alt }
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
                            bottomRight={ <Badge color="success">{ corners.product?.stock }</Badge> }
                            loadingAnimation="ring"
                            loadingSize="md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ corners.scenarios?.photo }</code>
                        <Picture
                            src="https://picsum.photos/600/800?random=802"
                            alt={ corners.photo?.alt }
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
                                    ⭐ 4.8 · { format( corners.photo?.likes ?? '' , 124 ) }
                                </div>
                            }
                            showDimensions
                            dimensionsPosition="bottom-right"
                            loadingAnimation="spinner"
                            loadingSize="md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ corners.scenarios?.estate }</code>
                        <Picture
                            src="https://picsum.photos/600/400?random=803"
                            alt={ corners.estate?.alt }
                            width={ 600 }
                            height={ 400 }
                            className="rounded-box overflow-hidden shadow-lg"
                            topLeft={ <Badge color="primary" size="lg">{ corners.estate?.featured }</Badge> }
                            topRight={
                                <div className="bg-success/90 text-success-content px-3 py-1 rounded-box font-bold">
                                    { corners.estate?.flag }
                                </div>
                            }
                            bottomLeft={
                                <div className="bg-base-100/95 backdrop-blur px-4 py-2 rounded-box">
                                    <div className="text-sm opacity-70">{ corners.estate?.from }</div>
                                    <div className="text-3xl font-bold text-primary">$1.2M</div>
                                </div>
                            }
                            bottomRight={
                                <div className="bg-base-100/95 backdrop-blur px-3 py-1 rounded-box text-sm">
                                    { format( corners.estate?.beds ?? '' , 3 , 2 ) }
                                </div>
                            }
                            loadingAnimation="dots"
                            loadingSize="md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ corners.scenarios?.video }</code>
                        <Picture
                            src="https://picsum.photos/600/400?random=804"
                            alt={ corners.video?.alt }
                            width={ 600 }
                            height={ 400 }
                            className="rounded-box overflow-hidden shadow-lg"
                            topRight={
                                <Badge color="error">
                                    <span className="inline-block w-2 h-2 bg-error-content rounded-full animate-pulse mr-1" />
                                    { corners.video?.live }
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
                        <div className="font-semibold">💡 { corners.positions?.title }</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            { CORNER_POSITIONS.map( name => (
                                <li key={ name }>
                                    <code>{ name }</code> — { corners.positions?.items?.[ name ] }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    { t.sections?.center }
                </h3>

                <p className="text-sm opacity-70">
                    { center.description }
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ center.scenarios?.video }</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=901"
                            alt={ center.video?.alt }
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
                                    { center.video?.live }
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

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ center.scenarios?.hero }</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=902"
                            alt={ center.hero?.alt }
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            center={
                                <div className="text-center text-white space-y-4">
                                    <h2 className="text-4xl font-bold drop-shadow-lg">
                                        { center.hero?.title }
                                    </h2>
                                    <p className="text-lg drop-shadow">
                                        { center.hero?.subtitle }
                                    </p>
                                    <Button color="primary" size="lg">
                                        { center.hero?.action }
                                    </Button>
                                </div>
                            }
                            loadingAnimation="spinner"
                            loadingSize="md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ center.scenarios?.premium }</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=903"
                            alt={ center.premium?.alt }
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            imageClassName="blur-sm"
                            center={
                                <div className="bg-base-100/95 backdrop-blur-xl rounded-box p-8 text-center space-y-4 max-w-sm">
                                    <div className="text-6xl">🔒</div>
                                    <h3 className="text-2xl font-bold">{ center.premium?.title }</h3>
                                    <p className="text-sm opacity-70">
                                        { center.premium?.text }
                                    </p>
                                    <Button color="primary" size="lg" className="w-full">
                                        { center.premium?.action }
                                    </Button>
                                </div>
                            }
                            loadingAnimation="dots"
                            loadingSize="md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ center.scenarios?.preview }</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=904"
                            alt={ center.preview?.alt }
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
                            topRight={ <Badge color="info">{ center.preview?.quality }</Badge> }
                            bottomRight={ <div className="badge badge-sm">{ center.preview?.zoom }</div> }
                            loadingAnimation="bars"
                            loadingSize="md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ center.scenarios?.soon }</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=905"
                            alt={ center.soon?.alt }
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            imageClassName="grayscale"
                            center={
                                <div className="bg-linear-to-r from-primary to-secondary text-primary-content rounded-box px-8 py-6 text-center transform -rotate-12 shadow-2xl">
                                    <div className="text-3xl font-bold">{ center.soon?.title }</div>
                                    <div className="text-sm mt-2">{ center.soon?.date }</div>
                                </div>
                            }
                            loadingAnimation="ball"
                            loadingSize="md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ center.scenarios?.cta }</code>
                        <Picture
                            src="https://picsum.photos/800/450?random=906"
                            alt={ center.cta?.alt }
                            width={ 800 }
                            height={ 450 }
                            className="rounded-box overflow-hidden shadow-lg"
                            center={
                                <div className="bg-linear-to-t from-black/80 via-black/40 to-transparent absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-white space-y-3 px-4">
                                        <div className="text-5xl">🖼️</div>
                                        <h3 className="text-2xl font-bold">{ center.cta?.title }</h3>
                                        <p className="text-sm max-w-md">
                                            { center.cta?.text }
                                        </p>
                                        <div className="flex gap-2 justify-center">
                                            <Button color="primary" size="sm">{ center.cta?.more }</Button>
                                            <Button color="ghost" size="sm" className="text-white">{ center.cta?.shop }</Button>
                                        </div>
                                    </div>
                                </div>
                            }
                            topLeft={ <Badge color="success">{ center.cta?.badge }</Badge> }
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
                        <div className="font-semibold">💡 { center.uses?.title }</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            { CENTER_USES.map( key => (
                                <li key={ key }>
                                    <strong>{ center.uses?.items?.[ key ]?.label }</strong> — { center.uses?.items?.[ key ]?.text }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    { t.sections?.darkMode }
                </h3>

                <p className="text-sm opacity-70">
                    { darkMode.description }
                </p>

                <div className="alert alert-info">
                    <span className="text-sm">
                        💡 { darkMode.tip }
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ darkMode.scenarios?.logo }</code>
                        <div className="flex items-center justify-center bg-base-100 rounded-box p-8">
                            <Picture
                                src="https://picsum.photos/400/100?random=1001"
                                dark="https://picsum.photos/400/100?random=1008"
                                alt={ darkMode.logo?.alt }
                                width={ 400 }
                                height={ 100 }
                                showLoading={ false }
                            />
                        </div>
                        <p className="text-xs opacity-70">
                            { darkMode.logo?.note }
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ darkMode.scenarios?.hero }</code>
                        <Picture
                            src="https://picsum.photos/600/300?random=1003"
                            dark="https://picsum.photos/600/300?random=1004"
                            alt={ darkMode.hero?.alt }
                            width={ 600 }
                            height={ 300 }
                            className="rounded-box overflow-hidden shadow-lg"
                            center={
                                <div className="text-center text-white">
                                    <h3 className="text-2xl font-bold drop-shadow-lg">
                                        { darkMode.hero?.title }
                                    </h3>
                                </div>
                            }
                            loadingAnimation="ring"
                            loadingSize="md"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ darkMode.scenarios?.product }</code>
                        <Picture
                            src="https://picsum.photos/500/500?random=1005"
                            dark="https://picsum.photos/500/500?random=1006"
                            alt={ darkMode.product?.alt }
                            width={ 500 }
                            height={ 500 }
                            className="rounded-box overflow-hidden shadow-lg"
                            topLeft={ <Badge color="error">-30%</Badge> }
                            bottomRight={
                                <Button color="primary" size="sm">
                                    { darkMode.product?.cart }
                                </Button>
                            }
                            loadingAnimation="dots"
                            loadingSize="sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <code className="badge badge-sm">{ darkMode.scenarios?.illustration }</code>
                        <div className="relative aspect-square rounded-box overflow-hidden bg-base-300 shadow-lg">
                            <Picture
                                src="https://picsum.photos/800/800?random=1007"
                                dark="https://picsum.photos/800/800?random=1008"
                                alt={ darkMode.illustration?.alt }
                                fill
                                objectFit="cover"
                                topRight={ <Badge color="info">{ darkMode.illustration?.badge }</Badge> }
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
                        <div className="font-semibold">✅ { darkMode.benefits?.title }</div>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            { DARK_BENEFITS.map( key => (
                                <li key={ key }>
                                    <strong>{ darkMode.benefits?.items?.[ key ]?.label }</strong> — { darkMode.benefits?.items?.[ key ]?.text }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    { t.sections?.animations }
                </h3>

                <div className="flex gap-2 items-center">
                    <Button size="sm" color="ghost" icon={ MdRefresh } onClick={ reloadAnimation }>
                        { t.reloadAll }
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    { LOADING_ANIMATIONS.map( ( animation , index ) =>
                    {
                        const id = `animation-${ animation }` ;

                        return (
                            <div key={ animation } className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <code className="badge badge-sm">{ animation }</code>
                                    { loadedImages[ id ] && <Badge color="success" size="xs">✓</Badge> }
                                </div>
                                <Picture
                                    key={ `${ animation }-${ animationKey }` }
                                    src={ `https://picsum.photos/400/300?random=${ animationKey + index + 1 }` }
                                    alt={ format( t.animations?.alt ?? '' , animation ) }
                                    width={ 400 }
                                    height={ 300 }
                                    className="rounded-box overflow-hidden"
                                    loadingAnimation={ animation }
                                    onLoad={ () => handleImageLoad( id ) }
                                />
                            </div>
                        ) ;
                    })}
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    loadingAnimation="spinner" <span className="text-info">// or ring, dots, bars, ball, infinity</span></code></pre>
                    <pre data-prefix="3"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    { t.sections?.sizes }
                </h3>

                <div className="flex gap-2 items-center">
                    <Button size="sm" color="ghost" icon={ MdRefresh } onClick={ reloadSize }>
                        { t.reloadAll }
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    { LOADING_SIZES.map( ( size , index ) =>
                    {
                        const id = `size-${ size }` ;

                        return (
                            <div key={ size } className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <code className="badge badge-sm">{ size }</code>
                                    { loadedImages[ id ] && <Badge color="success" size="xs">✓</Badge> }
                                </div>
                                <Picture
                                    key={ `${ size }-${ sizeKey }` }
                                    src={ `https://picsum.photos/200/150?random=${ sizeKey + index + 10 }` }
                                    alt={ format( t.sizes?.alt ?? '' , size ) }
                                    width={ 200 }
                                    height={ 150 }
                                    className="rounded-box overflow-hidden"
                                    loadingSize={ size }
                                    onLoad={ () => handleImageLoad( id ) }
                                />
                            </div>
                        ) ;
                    })}
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    loadingSize="xs" <span className="text-info">// or sm, md, lg, xl</span></code></pre>
                    <pre data-prefix="3"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    { t.sections?.colors }
                </h3>

                <div className="flex gap-2 items-center">
                    <Button size="sm" color="ghost" icon={ MdRefresh } onClick={ reloadColor }>
                        { t.reloadAll }
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    { LOADING_COLORS.map( ( { badge , value } , index ) =>
                    {
                        const id = `color-${ value }` ;

                        return (
                            <div key={ value } className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <code className={ `badge badge-sm ${ badge }` }>{ value }</code>
                                    { loadedImages[ id ] && <Badge color="success" size="xs">✓</Badge> }
                                </div>
                                <Picture
                                    key={ `${ value }-${ colorKey }` }
                                    src={ `https://picsum.photos/300/200?random=${ colorKey + index + 20 }` }
                                    alt={ format( t.colors?.alt ?? '' , value ) }
                                    width={ 300 }
                                    height={ 200 }
                                    className="rounded-box overflow-hidden"
                                    loadingAnimation="ring"
                                    loadingColor={ value }
                                    onLoad={ () => handleImageLoad( id ) }
                                />
                            </div>
                        ) ;
                    })}
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    loadingColor="primary" <span className="text-info">// Any TextColor</span></code></pre>
                    <pre data-prefix="3"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    { t.sections?.avatars }
                </h3>

                <div className="flex gap-4 flex-wrap justify-center">
                    { AVATARS.map( ( { animation , color , img } , index ) => (
                        <Picture
                            key={ img }
                            src={ `https://i.pravatar.cc/150?img=${ img }` }
                            alt={ format( t.avatars?.alt ?? '' , index + 1 ) }
                            width={ 150 }
                            height={ 150 }
                            className="rounded-full overflow-hidden shadow-lg"
                            imageClassName="object-cover"
                            loadingAnimation={ animation }
                            loadingColor={ color }
                            loadingSize="md"
                        />
                    ))}
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

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    { t.sections?.noSpinner }
                </h3>

                <div className="flex justify-center">
                    <Picture
                        src="https://picsum.photos/500/300?random=100"
                        alt={ t.noSpinner?.alt }
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

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    { t.sections?.priority }
                </h3>

                <div className="alert alert-info">
                    <span className="text-sm">
                        <code className="badge badge-sm">priority</code> { t.priority?.note }
                    </span>
                </div>

                <div className="flex justify-center">
                    <Picture
                        src="https://picsum.photos/1200/400?random=200"
                        alt={ t.priority?.alt }
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

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    { t.sections?.fallback }
                </h3>

                <div className="alert alert-info">
                    <span className="text-sm">
                        { fallback.note }
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    { FALLBACKS.map( ( { color , key , name } ) => (
                        <div className="flex flex-col gap-2" key={ name }>
                            <Picture
                                className         = "h-28 w-full rounded-box overflow-hidden"
                                fallback          = { <span className="text-3xl font-semibold tracking-wide select-none">{ getInitials( name ) }</span> }
                                fallbackClassName = { color ? undefined : PALETTE[ hashIndex( name , PALETTE.length ) ] }
                                fallbackColor     = { color }
                                fill
                                topRight          = { <Badge color="neutral" size="sm">{ getInitials( name ) }</Badge> }
                            />
                            <span className="text-xs opacity-70">{ fallback.frames?.[ key ] }</span>
                        </div>
                    ) ) }

                    <div className="flex flex-col gap-2">
                        <Picture
                            className     = "h-28 w-full rounded-box overflow-hidden"
                            fallback      = { <MdImageNotSupported className="size-10 opacity-40" /> }
                            fallbackColor = "#0EA5E9"
                            fill
                            bottomLeft    = { <Badge size="sm">{ fallback.corner }</Badge> }
                        />
                        <span className="text-xs opacity-70">{ fallback.icon }</span>
                    </div>

                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Picture</code></pre>
                    <pre data-prefix="2"><code>    fallback      = {'{ <span>{ getInitials( name ) }</span> }'}</code></pre>
                    <pre data-prefix="3"><code>    fallbackColor = {'{ entity.color }'} <span className="text-success">// a wash of it behind, the colour itself on the content</span></code></pre>
                    <pre data-prefix="4"><code>    fill</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default PictureDemo ;