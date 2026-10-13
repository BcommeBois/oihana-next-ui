'use client' ;

import { useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Avatar       from '@/components/avatars/Avatar' ;
import Badge        from '@/components/Badge' ;
import Button       from '@/components/Button' ;
import Container    from '@/display/Container' ;
import Divider      from '@/components/Divider' ;
import IconRating   from '@/components/rating/IconRating';
import NumberRating from '@/components/rating/NumberRating' ;
import Rating       from '@/components/rating/Rating' ;

import {
    MdThumbUpOffAlt ,
    MdStar,
    MdStarBorder,
    MdFavorite,
    MdFavoriteBorder ,
    MdThumbUp ,
}
from 'react-icons/md' ;

/**
 * The avatar colours of the reviews, in turn.
 * @type {string[]}
 */
const REVIEW_AVATARS = [ 'bg-success text-success-content' , 'bg-secondary text-secondary-content' ] ;

/**
 * Rating demo : `Rating`, `NumberRating`, `IconRating`, their names and their
 * place in a form.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.rating'] - Dot notation path to the demo locale.
 */
const RatingDemo = ( { path = 'demo.rating' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const states   = t.states ?? {} ;
    const number   = t.number ?? {} ;
    const useCases = t.useCases ?? {} ;
    const icons    = t.icons ?? {} ;
    const names    = t.names ?? {} ;
    const form     = t.form ?? {} ;

    // Rating states
    const [ controlledRating, setControlledRating ] = useState( 3 ) ;
    const [ halfRating, setHalfRating ] = useState( 3.5 ) ;
    const [ productRating, setProductRating ] = useState( 0 ) ;

    // NumberRating states
    const [ numberRating, setNumberRating ] = useState( 3 ) ;
    const [ circleRating, setCircleRating ] = useState( 4 ) ;

    // What the form below sent last
    const [ sent, setSent ] = useState( null ) ;

    const onSubmit = event =>
    {
        event.preventDefault() ;
        setSent( Object.fromEntries( new FormData( event.currentTarget ) ) ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* ========== RATING (Stars/Masks) ========== */}

            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold border-b-2 border-primary pb-2">
                    { t.rating?.title }
                </h2>

                {/* Simple Rating */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.simple }</h3>
                    <Rating name="rating-simple" defaultValue={3} />
                </div>

                <Divider />

                {/* With Gap Helper */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.gap }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ t.rating?.noGap }</span>
                            <Rating name="rating-gap-0" defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">gap={1}</span>
                            <Rating name="rating-gap-1" defaultValue={3} gap={1} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">gap={2}</span>
                            <Rating name="rating-gap-2" defaultValue={3} gap={2} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ t.rating?.responsive }</span>
                            <Rating
                                name="rating-gap-responsive"
                                defaultValue={3}
                                gap={{ xs: 0.5, sm: 1, md: 2 }}
                            />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* All Sizes */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.sizes }</h3>

                    <div className="flex flex-col items-center gap-4">
                        <Rating name="rating-xs" size="xs" defaultValue={3} />
                        <Rating name="rating-sm" size="sm" defaultValue={3} />
                        <Rating name="rating-md" size="md" defaultValue={3} />
                        <Rating name="rating-lg" size="lg" defaultValue={3} />
                        <Rating name="rating-xl" size="xl" defaultValue={3} />
                    </div>
                </div>

                <Divider />

                {/* Different Colors */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.colors }</h3>

                    <div className="flex flex-col gap-3">
                        <Rating name="rating-primary" color="primary" defaultValue={4} />
                        <Rating name="rating-secondary" color="secondary" defaultValue={4} />
                        <Rating name="rating-accent" color="accent" defaultValue={4} />
                        <Rating name="rating-warning" color="warning" defaultValue={4} />
                        <Rating name="rating-success" color="success" defaultValue={4} />
                        <Rating name="rating-error" color="error" defaultValue={4} />
                    </div>
                </div>

                <Divider />

                {/* Different Shapes */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.shapes }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-24">star</span>
                            <Rating name="rating-star" shape="star" color="warning" defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-24">star-2</span>
                            <Rating name="rating-star-2" shape="star-2" color="warning" defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-24">heart</span>
                            <Rating name="rating-heart" shape="heart" color="error" defaultValue={4} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-24">circle</span>
                            <Rating name="rating-circle" shape="circle" color="primary" defaultValue={3} gap={1} />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* Half Stars */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.half }</h3>

                    <Rating
                        name     = "rating-half"
                        half     = { true }
                        size     = "lg"
                        color    = "success"
                        value    = { halfRating }
                        onChange = { setHalfRating }
                    />

                    <div className="flex flex-row gap-2">
                        <span>{ t.value } <Badge>{halfRating}</Badge></span>
                    </div>
                </div>

                <Divider />

                {/* Controlled Rating */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.controlled }</h3>

                    <Rating
                        name="rating-controlled"
                        size="lg"
                        color="warning"
                        value={controlledRating}
                        onChange={setControlledRating}
                    />

                    <div className="flex gap-2">
                        <Button size="sm" onClick={() => setControlledRating(Math.max(0, controlledRating - 1))}>
                            - 1
                        </Button>
                        <Button size="sm" onClick={() => setControlledRating(Math.min(5, controlledRating + 1))}>
                            + 1
                        </Button>
                        <Button color="error" size="sm" onClick={() => setControlledRating(0)}>
                            { t.clear }
                        </Button>
                    </div>

                    <div className="flex flex-row gap-2">
                        <span>{ t.value } <Badge>{controlledRating}</Badge></span>
                    </div>
                </div>

                <Divider />

                {/* Read-Only & Disabled */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ states.title }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ states.readOnly }</span>
                            <Rating name="rating-readonly" value={4} readOnly color="warning" />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ states.disabled }</span>
                            <Rating name="rating-disabled" defaultValue={3} disabled />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ states.noClear }</span>
                            <Rating name="rating-no-clear" allowClear={false} defaultValue={3} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== NUMBER RATING (Buttons) ========== */}

            <div className="flex flex-col gap-6 mt-8">
                <h2 className="text-2xl font-bold border-b-2 border-secondary pb-2">
                    { number.title }
                </h2>

                {/* Simple Number Rating */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ number.simple }</h3>
                    <NumberRating name="number-simple" defaultValue={3} />
                </div>

                <Divider />

                {/* Square vs Circle */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ number.shapes }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">square</span>
                            <NumberRating name="number-square" shape="square" defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">circle</span>
                            <NumberRating
                                name="number-circle"
                                shape="circle"
                                value={circleRating}
                                onChange={setCircleRating}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <span>{ number.circleValue } <Badge>{circleRating}</Badge></span>
                    </div>
                </div>

                <Divider />

                {/* All Sizes */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.sizes }</h3>

                    <div className="flex flex-col items-center gap-4">
                        <NumberRating name="number-xs" size="xs" defaultValue={3} />
                        <NumberRating name="number-sm" size="sm" defaultValue={3} />
                        <NumberRating name="number-md" size="md" defaultValue={3} />
                        <NumberRating name="number-lg" size="lg" defaultValue={3} />
                        <NumberRating name="number-xl" size="xl" defaultValue={3} />
                    </div>
                </div>

                <Divider />

                {/* Different Colors */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ number.colors }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Ghost/Primary</span>
                            <NumberRating
                                name="number-color-1"
                                activeColor="primary"
                                defaultValue={3}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Neutral/Success</span>
                            <NumberRating
                                name="number-color-2"
                                color="neutral"
                                activeColor="success"
                                defaultValue={4}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Outline/Error</span>
                            <NumberRating
                                name="number-color-3"
                                style="outline"
                                color="neutral"
                                activeColor="error"
                                defaultValue={2}
                            />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* Custom Count */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ number.count }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">1-10</span>
                            <NumberRating name="number-10" count={10} size="xs" defaultValue={7} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">1-7</span>
                            <NumberRating name="number-7" count={7} defaultValue={5} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">1-3</span>
                            <NumberRating name="number-3" count={3} size="lg" defaultValue={2} />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* With Gap */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ t.rating?.gap }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ t.rating?.noGap }</span>
                            <NumberRating name="number-gap-0" defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">gap={1}</span>
                            <NumberRating name="number-gap-1" gap={1} defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">gap={2}</span>
                            <NumberRating name="number-gap-2" gap={2} defaultValue={3} />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* Custom Content */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ number.content }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ number.emoji }</span>
                            <NumberRating
                                name="number-emoji"
                                count={5}
                                itemContent={(index, isActive) => isActive ? '😊' : '😐'}
                                defaultValue={3}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ number.letters }</span>
                            <NumberRating
                                name="number-letters"
                                count={5}
                                itemContent={(index) => ['A', 'B', 'C', 'D', 'E'][index - 1]}
                                defaultValue={3}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ number.stars }</span>
                            <NumberRating
                                name="number-stars"
                                shape="circle"
                                count={5}
                                itemContent={(index, isActive) => isActive ? '★' : '☆'}
                                size="lg"
                                defaultValue={4}
                            />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* Controlled */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ number.controlled }</h3>

                    <NumberRating
                        name="number-controlled"
                        size="lg"
                        value={numberRating}
                        onChange={setNumberRating}
                        color="neutral"
                        activeColor="primary"
                    />

                    <div className="flex gap-2">
                        <Button size="sm" onClick={() => setNumberRating(Math.max(0, numberRating - 1))}>
                            - 1
                        </Button>
                        <Button size="sm" onClick={() => setNumberRating(Math.min(5, numberRating + 1))}>
                            + 1
                        </Button>
                        <Button color="error" size="sm" onClick={() => setNumberRating(0)}>
                            { t.clear }
                        </Button>
                    </div>

                    <div className="flex flex-row gap-2">
                        <span>{ t.value } <Badge>{numberRating}</Badge></span>
                    </div>
                </div>

                <Divider />

                {/* Read-Only & Disabled */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ states.title }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ states.readOnly }</span>
                            <NumberRating name="number-readonly" value={4} readOnly />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ states.disabled }</span>
                            <NumberRating name="number-disabled" defaultValue={3} disabled />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ states.noClear }</span>
                            <NumberRating name="number-no-clear" allowClear={false} defaultValue={3} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== PRACTICAL USE CASES ========== */}

            <div className="flex flex-col gap-6 mt-8">
                <h2 className="text-2xl font-bold border-b-2 border-accent pb-2">
                    { useCases.title }
                </h2>

                {/* Product card */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <figure className="bg-base-300 h-48 grid place-items-center">
                        <span className="text-6xl">📱</span>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{ useCases.product?.name }</h2>
                        <p>{ useCases.product?.description }</p>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-semibold">{ useCases.product?.rate }</span>
                            <Rating
                                name="product-rating"
                                size="sm"
                                color="warning"
                                value={productRating}
                                onChange={setProductRating}
                            />
                            {productRating > 0 && (
                                <span className="text-sm text-base-content/70">({productRating}/5)</span>
                            )}
                        </div>

                        <div className="card-actions justify-end mt-4">
                            <Button color="primary">{ useCases.product?.buy }</Button>
                        </div>
                    </div>
                </div>

                {/* Review list */}
                <div>
                    <h4 className="text-lg font-medium mb-3">{ useCases.reviews?.title }</h4>

                    <div className="flex flex-col gap-3">
                        { ( useCases.reviews?.items ?? [] ).map( ( review , index ) => (
                            <div className="flex items-start gap-3" key={ review.name }>
                                <Avatar placeholder className={ `${ REVIEW_AVATARS[ index % REVIEW_AVATARS.length ] } rounded-full size-8` }>
                                    <span className="text-xs">{ review.initials }</span>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{ review.name }</span>
                                        <Rating name={ `review-${ index + 1 }` } value={ review.value } readOnly size="xs" color="warning" />
                                    </div>
                                    <p className="text-sm mt-1">{ review.text }</p>
                                </div>
                            </div>
                        ) ) }
                    </div>
                </div>

                {/* Satisfaction survey */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h3 className="card-title">{ useCases.survey?.title }</h3>

                        <div className="flex flex-col gap-4 mt-2">
                            <div>
                                <p className="text-sm font-semibold mb-2">{ useCases.survey?.service }</p>
                                <NumberRating
                                    name="survey-service"
                                    count={10}
                                    size="xs"
                                    defaultValue={8}
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">{ useCases.survey?.overall }</p>
                                <NumberRating
                                    name="survey-overall"
                                    count={5}
                                    shape="circle"
                                    itemContent={(index, isActive) => ['😠', '😞', '😐', '😊', '😍'][index - 1]}
                                    size="lg"
                                    defaultValue={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Icon Rating */}
            <div className="flex flex-col gap-6 mt-8">
                <h2 className="text-2xl font-bold border-b-2 border-success pb-2">
                    { icons.title }
                </h2>

                {/* Simple Icon Rating */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ icons.stars }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ icons.default }</span>
                            <IconRating
                                name="icon-stars-1"
                                icon={MdStarBorder}
                                activeIcon={MdStar}
                                defaultValue={3}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ icons.gap }</span>
                            <IconRating
                                name="icon-stars-2"
                                icon={MdStarBorder}
                                activeIcon={MdStar}
                                gap={1}
                                defaultValue={4}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ icons.circle }</span>
                            <IconRating
                                name="icon-stars-3"
                                icon={MdStarBorder}
                                activeIcon={MdStar}
                                shape="circle"
                                gap={1}
                                defaultValue={5}
                            />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* Different Icons */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ icons.others }</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ icons.hearts }</span>
                            <IconRating
                                name            = "icon-hearts"
                                activeIcon      = { MdFavorite }
                                icon            = { MdFavoriteBorder }
                                activeStyle     = "ghost"
                                iconColor       = "secondary"
                                activeIconColor = "primary"
                                defaultValue    = { 4 }
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">{ icons.thumbs }</span>
                            <IconRating
                                name         = "icon-thumbs"
                                activeColor  = "success"
                                activeIcon   = { MdThumbUp }
                                icon         = { MdThumbUpOffAlt }
                                count        = { 5 }
                                defaultValue = { 3 }
                            />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* With Colors */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">{ icons.colors }</h3>

                    <div className="flex flex-col gap-3">
                        <IconRating
                            name            = "icon-color-1"
                            icon            = { MdStarBorder }
                            activeIcon      = { MdStar }
                            activeColor     = "error"
                            activeIconColor = "error-content"
                            iconColor       = "primary"
                            defaultValue    ={3}
                        />

                        <IconRating
                            name="icon-color-2"
                            activeColor     = "success"
                            activeIconColor = "success-content"
                            activeIcon      = { MdStar }
                            icon            = { MdStarBorder }
                            iconColor       = "success"
                            defaultValue    = { 4 }
                        />
                    </div>
                </div>
            </div>

            <Divider />

            {/* Responsive size (daisyUI 5.6) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.responsive?.title }</h3>
                <p className="text-sm text-base-content/70">
                    { t.responsive?.before }<code>sm → md → lg → xl</code>{ t.responsive?.after }
                </p>
                <Rating
                    name="rating-responsive"
                    defaultValue={ 3 }
                    color="warning"
                    size={ { xs: 'sm', md: 'md', lg: 'lg', xl: 'xl' } }
                />
            </div>

            <Divider />

            {/* Accessible names */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ names.title }</h3>
                <p className="text-sm text-base-content/70">
                    { names.text }
                </p>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">{ names.named }</span>
                        <Rating ariaLabel={ names.quality } defaultValue={ 3 } name="rating-named" />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">{ names.readOnly }</span>
                        <Rating ariaLabel={ names.average } half name="rating-named-readonly" readOnly value={ 3.5 } />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">{ names.hearts }</span>
                        <IconRating
                            activeColor  = "error"
                            activeIcon   = { MdFavorite }
                            ariaLabel    = { names.liked }
                            defaultValue = { 4 }
                            icon         = { MdFavoriteBorder }
                            name         = "icon-named"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">{ names.itemLabel }</span>
                        <NumberRating
                            ariaLabel    = { names.service }
                            defaultValue = { 2 }
                            itemLabel    = { value => names.levels?.[ value - 1 ] }
                            name         = "number-item-label"
                        />
                    </div>
                </div>
            </div>

            <Divider />

            {/* In a form */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ form.title }</h3>
                <p className="text-sm text-base-content/70">
                    { form.text }
                </p>

                <form className="flex flex-col gap-3" onSubmit={ onSubmit }>
                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">Rating</span>
                        <Rating ariaLabel={ names.quality } defaultValue={ 4 } name="quality" />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">NumberRating</span>
                        <NumberRating ariaLabel={ names.service } defaultValue={ 3 } name="service" />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">IconRating</span>
                        <IconRating
                            activeColor  = "error"
                            activeIcon   = { MdFavorite }
                            ariaLabel    = { names.liked }
                            icon         = { MdFavoriteBorder }
                            name         = "liked"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">{ form.readOnly }</span>
                        <Rating ariaLabel={ names.average } half name="average" readOnly value={ 4.5 } />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm w-40">{ form.disabled }</span>
                        <NumberRating defaultValue={ 2 } disabled name="locked" />
                    </div>

                    <div>
                        <Button color="primary" type="submit">{ form.send }</Button>
                    </div>
                </form>

                { sent && (
                    <pre className="rounded-box bg-base-100 p-3 text-xs">
                        { form.sent } { JSON.stringify( sent ) }
                    </pre>
                ) }
            </div>

        </Container>
    ) ;
} ;

export default RatingDemo ;