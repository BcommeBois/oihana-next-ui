'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import FadeIn       from '../../motions/FadeIn' ;
import Jump         from '../../motions/Jump' ;
import LetterReveal from '../../motions/LetterReveal' ;
import Motion       from '../../motions/Motion' ;
import ScrollReveal from '../../motions/ScrollReveal' ;
import SlideDown    from '../../motions/SlideDown' ;
import SlideLeft    from '../../motions/SlideLeft' ;
import SlideRight   from '../../motions/SlideRight' ;
import SlideUp      from '../../motions/SlideUp' ;
import StaggerList  from '../../motions/StaggerList' ;
import Tilt         from '../../motions/Tilt' ;
import WordReveal   from '../../motions/WordReveal' ;

/**
 * Animation components demo.
 *
 * Demonstrates all motion/react animation wrappers.
 */
const AnimationDemo = () =>
{
    const [ fadeKey    , setFadeKey    ] = useState( 0 ) ;
    const [ jumpKey    , setJumpKey    ] = useState( 0 ) ;
    const [ slideKey   , setSlideKey   ] = useState( 0 ) ;
    const [ staggerKey , setStaggerKey ] = useState( 0 ) ;
    const [ textKey    , setTextKey    ] = useState( 0 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Animation Examples</h2>

            {/* FadeIn */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">FadeIn</h3>

                <div className="flex flex-wrap items-end gap-6">
                    <FadeIn key={ `fade-default-${ fadeKey }` }>
                        <div className="card bg-base-100 shadow w-40 p-4 text-center">
                            Default
                        </div>
                    </FadeIn>

                    <FadeIn key={ `fade-slow-${ fadeKey }` } delay={ 0.3 } duration={ 2 }>
                        <div className="card bg-primary text-primary-content shadow w-40 p-4 text-center">
                            Slow (2s)
                        </div>
                    </FadeIn>

                    <FadeIn key={ `fade-tween-${ fadeKey }` } type="tween" delay={ 0.6 } duration={ 1.5 }>
                        <div className="card bg-secondary text-secondary-content shadow w-40 p-4 text-center">
                            Tween
                        </div>
                    </FadeIn>

                    <button
                        className = "btn btn-outline btn-sm"
                        onClick   = { () => setFadeKey( k => k + 1 ) }
                    >
                        Replay
                    </button>
                </div>
            </div>

            <Divider />

            {/* Jump */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">Jump</h3>

                <div className="flex flex-wrap items-end gap-6">
                    <Jump key={ `jump-default-${ jumpKey }` }>
                        <div className="card bg-base-100 shadow w-40 p-4 text-center">
                            Default
                        </div>
                    </Jump>

                    <Jump key={ `jump-bounce-${ jumpKey }` } bounce={ 0.8 } delay={ 0.2 }>
                        <div className="card bg-accent text-accent-content shadow w-40 p-4 text-center">
                            More bounce
                        </div>
                    </Jump>

                    <Jump
                        key    = { `jump-scale-${ jumpKey }` }
                        delay  = { 0.4 }
                        start  = { { opacity: 0 , scale: 0 } }
                        finish = { { opacity: 1 , scale: 1 } }
                    >
                        <div className="card bg-success text-success-content shadow w-40 p-4 text-center">
                            Scale 0→1
                        </div>
                    </Jump>

                    <button
                        className = "btn btn-outline btn-sm"
                        onClick   = { () => setJumpKey( k => k + 1 ) }
                    >
                        Replay
                    </button>
                </div>
            </div>

            <Divider />

            {/* Slides */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">Slide</h3>

                <div className="flex flex-wrap items-end gap-6">
                    <SlideDown key={ `slide-down-${ slideKey }` } delay={ 0 }>
                        <div className="card bg-base-100 shadow w-40 p-4 text-center">
                            SlideDown
                        </div>
                    </SlideDown>

                    <SlideUp key={ `slide-up-${ slideKey }` } delay={ 0.1 }>
                        <div className="card bg-primary text-primary-content shadow w-40 p-4 text-center">
                            SlideUp
                        </div>
                    </SlideUp>

                    <SlideLeft key={ `slide-left-${ slideKey }` } delay={ 0.2 }>
                        <div className="card bg-secondary text-secondary-content shadow w-40 p-4 text-center">
                            SlideLeft
                        </div>
                    </SlideLeft>

                    <SlideRight key={ `slide-right-${ slideKey }` } delay={ 0.3 }>
                        <div className="card bg-accent text-accent-content shadow w-40 p-4 text-center">
                            SlideRight
                        </div>
                    </SlideRight>

                    <button
                        className = "btn btn-outline btn-sm"
                        onClick   = { () => setSlideKey( k => k + 1 ) }
                    >
                        Replay
                    </button>
                </div>
            </div>

            <Divider />

            {/* Motion */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">Motion (generic)</h3>

                <div className="flex flex-wrap items-center gap-6">
                    <Motion
                        whileHover = { { scale: 1.05 } }
                        whileTap   = { { scale: 0.95 } }
                    >
                        <div className="card bg-base-100 shadow w-40 p-4 text-center cursor-pointer">
                            Hover me
                        </div>
                    </Motion>

                    <Motion
                        initial    = { { rotate: 0 } }
                        whileHover = { { rotate: 10 } }
                        whileTap   = { { rotate: -10 } }
                    >
                        <div className="card bg-warning text-warning-content shadow w-40 p-4 text-center cursor-pointer">
                            Rotate hover
                        </div>
                    </Motion>

                    <Motion
                        whileHover = { { y: -8 } }
                        transition = { { type: 'spring' , stiffness: 300 } }
                    >
                        <div className="card bg-success text-success-content shadow w-40 p-4 text-center cursor-pointer">
                            Float hover
                        </div>
                    </Motion>
                </div>
            </div>

            <Divider />

            {/* Tilt */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">Tilt</h3>

                <div className="flex flex-wrap items-center gap-6">
                    <Tilt>
                        <div className="card bg-base-100 shadow w-40 p-4 text-center cursor-pointer">
                            Default (15°)
                        </div>
                    </Tilt>

                    <Tilt intensity={ 8 } scale={ 1.02 }>
                        <div className="card bg-primary text-primary-content shadow w-40 p-4 text-center cursor-pointer">
                            Subtle (8°)
                        </div>
                    </Tilt>

                    <Tilt intensity={ 25 } scale={ 1.08 } perspective={ 600 }>
                        <div className="card bg-error text-error-content shadow w-40 p-4 text-center cursor-pointer">
                            Intense (25°)
                        </div>
                    </Tilt>
                </div>
            </div>

            <Divider />

            {/* StaggerList */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">StaggerList</h3>

                <div className="flex flex-wrap gap-8">

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium opacity-70">List</p>
                        <StaggerList key={ `stagger-list-${ staggerKey }` } as="ul" className="flex flex-col gap-2">
                            { [ 'Item 1' , 'Item 2' , 'Item 3' , 'Item 4' ].map( item => (
                                <li key={ item } className="px-4 py-2 bg-base-100 rounded-box shadow">
                                    { item }
                                </li>
                            ) ) }
                        </StaggerList>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium opacity-70">Grid</p>
                        <StaggerList key={ `stagger-grid-${ staggerKey }` } className="grid grid-cols-2 gap-2" stagger={ 0.15 }>
                            { [ 'primary' , 'secondary' , 'accent' , 'neutral' ].map( color => (
                                <div
                                    key       = { color }
                                    className = { `badge badge-${ color } badge-lg p-4` }
                                >
                                    { color }
                                </div>
                            ) ) }
                        </StaggerList>
                    </div>

                    <button
                        className = "btn btn-outline btn-sm self-end"
                        onClick   = { () => setStaggerKey( k => k + 1 ) }
                    >
                        Replay
                    </button>
                </div>
            </div>

            <Divider />

            {/* Text animations */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">Text Animations</h3>

                <div className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium opacity-70">LetterReveal</p>
                        <LetterReveal
                            key       = { `letter-reveal-${ textKey }` }
                            as        = "h4"
                            text      = "Bienvenue sur Oihana Next UI"
                            className = "text-2xl font-bold text-primary"
                            delay     = { 0.1 }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium opacity-70">WordReveal</p>
                        <WordReveal
                            key       = { `word-reveal-${ textKey }` }
                            as        = "p"
                            text      = "Une bibliothèque de composants moderne pour le secteur du bois"
                            className = "text-xl text-secondary"
                            delay     = { 0.2 }
                            stagger   = { 0.1 }
                        />
                    </div>

                    <button
                        className = "btn btn-outline btn-sm self-start"
                        onClick   = { () => setTextKey( k => k + 1 ) }
                    >
                        Replay
                    </button>
                </div>
            </div>

            <Divider />

            {/* ScrollReveal */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-neutral pb-2">ScrollReveal</h3>

                <p className="text-sm opacity-70">Faites défiler vers le bas pour déclencher les animations.</p>

                <div className="flex flex-col gap-4 mt-4">
                    <ScrollReveal>
                        <div className="card bg-base-100 shadow p-4">
                            Fade up (default)
                        </div>
                    </ScrollReveal>

                    <ScrollReveal y={ 0 } x={ -60 } delay={ 0.1 }>
                        <div className="card bg-primary text-primary-content shadow p-4">
                            Slide from left
                        </div>
                    </ScrollReveal>

                    <ScrollReveal y={ 0 } x={ 60 } delay={ 0.2 }>
                        <div className="card bg-secondary text-secondary-content shadow p-4">
                            Slide from right
                        </div>
                    </ScrollReveal>

                    <ScrollReveal once={ false } amount={ 0.5 } delay={ 0.1 }>
                        <div className="card bg-accent text-accent-content shadow p-4">
                            Replay on scroll (once=false)
                        </div>
                    </ScrollReveal>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default AnimationDemo ;