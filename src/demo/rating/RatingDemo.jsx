'use client' ;

import { useState } from 'react' ;

import Avatar       from '@/components/avatars/Avatar' ;
import Badge        from '@/components/Badge' ;
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

const RatingDemo = () =>
{
    // Rating states
    const [ controlledRating, setControlledRating ] = useState( 3 ) ;
    const [ halfRating, setHalfRating ] = useState( 3.5 ) ;
    const [ productRating, setProductRating ] = useState( 0 ) ;

    // NumberRating states
    const [ numberRating, setNumberRating ] = useState( 3 ) ;
    const [ circleRating, setCircleRating ] = useState( 4 ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* ========== RATING (Stars/Masks) ========== */}

            <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-bold border-b-2 border-primary pb-2">
                    ⭐ Rating (Stars & Masks)
                </h2>

                {/* Simple Rating */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Simple Rating</h3>
                    <Rating name="rating-simple" defaultValue={3} />
                </div>

                <Divider />

                {/* With Gap Helper */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">With Gap</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">No gap</span>
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
                            <span className="text-sm w-32">Responsive</span>
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
                    <h3 className="text-xl font-semibold">All Sizes</h3>

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
                    <h3 className="text-xl font-semibold">Different Colors</h3>

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
                    <h3 className="text-xl font-semibold">Different Shapes</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-24">Star</span>
                            <Rating name="rating-star" shape="star" color="warning" defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-24">Star-2</span>
                            <Rating name="rating-star-2" shape="star-2" color="warning" defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-24">Heart</span>
                            <Rating name="rating-heart" shape="heart" color="error" defaultValue={4} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-24">Circle</span>
                            <Rating name="rating-circle" shape="circle" color="primary" defaultValue={3} gap={1} />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* Half Stars */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Half Stars</h3>

                    <Rating
                        name     = "rating-half"
                        half     = { true }
                        size     = "lg"
                        color    = "success"
                        value    = { halfRating }
                        onChange = { setHalfRating }
                    />

                    <div className="flex flex-row gap-2">
                        <span>Current: <Badge>{halfRating}</Badge></span>
                    </div>
                </div>

                <Divider />

                {/* Controlled Rating */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Controlled Rating</h3>

                    <Rating
                        name="rating-controlled"
                        size="lg"
                        color="warning"
                        value={controlledRating}
                        onChange={setControlledRating}
                    />

                    <div className="flex gap-2">
                        <button className="btn btn-sm" onClick={() => setControlledRating(Math.max(0, controlledRating - 1))}>
                            - 1
                        </button>
                        <button className="btn btn-sm" onClick={() => setControlledRating(Math.min(5, controlledRating + 1))}>
                            + 1
                        </button>
                        <button className="btn btn-sm btn-error" onClick={() => setControlledRating(0)}>
                            Clear
                        </button>
                    </div>

                    <div className="flex flex-row gap-2">
                        <span>Value: <Badge>{controlledRating}</Badge></span>
                    </div>
                </div>

                <Divider />

                {/* Read-Only & Disabled */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Read-Only & Disabled</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Read-only</span>
                            <Rating name="rating-readonly" value={4} readOnly color="warning" />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Disabled</span>
                            <Rating name="rating-disabled" defaultValue={3} disabled />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">No clear</span>
                            <Rating name="rating-no-clear" allowClear={false} defaultValue={3} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== NUMBER RATING (Buttons) ========== */}

            <div className="flex flex-col gap-6 mt-8">
                <h2 className="text-2xl font-bold border-b-2 border-secondary pb-2">
                    🔢 Number Rating (Buttons)
                </h2>

                {/* Simple Number Rating */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Simple Number Rating</h3>
                    <NumberRating name="number-simple" defaultValue={3} />
                </div>

                <Divider />

                {/* Square vs Circle */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Square vs Circle</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Square</span>
                            <NumberRating name="number-square" shape="square" defaultValue={3} />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Circle</span>
                            <NumberRating
                                name="number-circle"
                                shape="circle"
                                value={circleRating}
                                onChange={setCircleRating}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <span>Circle value: <Badge>{circleRating}</Badge></span>
                    </div>
                </div>

                <Divider />

                {/* All Sizes */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">All Sizes</h3>

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
                    <h3 className="text-xl font-semibold">Color Combinations</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Ghost/Primary</span>
                            <NumberRating
                                name="number-color-1"
                                color="ghost"
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
                    <h3 className="text-xl font-semibold">Custom Count</h3>

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
                    <h3 className="text-xl font-semibold">With Gap</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">No gap</span>
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
                    <h3 className="text-xl font-semibold">Custom Content</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Emoji</span>
                            <NumberRating
                                name="number-emoji"
                                count={5}
                                itemContent={(index, isActive) => isActive ? '😊' : '😐'}
                                defaultValue={3}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Letters</span>
                            <NumberRating
                                name="number-letters"
                                count={5}
                                itemContent={(index) => ['A', 'B', 'C', 'D', 'E'][index - 1]}
                                defaultValue={3}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Stars in buttons</span>
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
                    <h3 className="text-xl font-semibold">Controlled Number Rating</h3>

                    <NumberRating
                        name="number-controlled"
                        size="lg"
                        value={numberRating}
                        onChange={setNumberRating}
                        color="neutral"
                        activeColor="primary"
                    />

                    <div className="flex gap-2">
                        <button className="btn btn-sm" onClick={() => setNumberRating(Math.max(0, numberRating - 1))}>
                            - 1
                        </button>
                        <button className="btn btn-sm" onClick={() => setNumberRating(Math.min(5, numberRating + 1))}>
                            + 1
                        </button>
                        <button className="btn btn-sm btn-error" onClick={() => setNumberRating(0)}>
                            Clear
                        </button>
                    </div>

                    <div className="flex flex-row gap-2">
                        <span>Value: <Badge>{numberRating}</Badge></span>
                    </div>
                </div>

                <Divider />

                {/* Read-Only & Disabled */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Read-Only & Disabled</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Read-only</span>
                            <NumberRating name="number-readonly" value={4} readOnly />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Disabled</span>
                            <NumberRating name="number-disabled" defaultValue={3} disabled />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">No clear</span>
                            <NumberRating name="number-no-clear" allowClear={false} defaultValue={3} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== PRACTICAL USE CASES ========== */}

            <div className="flex flex-col gap-6 mt-8">
                <h2 className="text-2xl font-bold border-b-2 border-accent pb-2">
                    💼 Practical Use Cases
                </h2>

                {/* Product card */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <figure className="bg-base-300 h-48 grid place-items-center">
                        <span className="text-6xl">📱</span>
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Smartphone X</h2>
                        <p>Latest flagship with amazing features</p>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm font-semibold">Rate:</span>
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
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>

                {/* Review list */}
                <div>
                    <h4 className="text-lg font-medium mb-3">Customer Reviews</h4>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                            <Avatar placeholder className="bg-success text-success-content rounded-full size-8">
                                <span className="text-xs">JD</span>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">John Doe</span>
                                    <Rating name="review-1" value={5} readOnly size="xs" color="warning" />
                                </div>
                                <p className="text-sm mt-1">Excellent product! Highly recommended.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Avatar placeholder className="bg-secondary text-secondary-content rounded-full size-8">
                                <span className="text-xs">AS</span>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">Alice Smith</span>
                                    <Rating name="review-2" value={4} readOnly size="xs" color="warning" />
                                </div>
                                <p className="text-sm mt-1">Good value for money.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Satisfaction survey */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h3 className="card-title">Satisfaction Survey</h3>

                        <div className="flex flex-col gap-4 mt-2">
                            <div>
                                <p className="text-sm font-semibold mb-2">Rate our service (1-10):</p>
                                <NumberRating
                                    name="survey-service"
                                    count={10}
                                    size="xs"
                                    defaultValue={8}
                                />
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">Overall experience:</p>
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
                    ⭐ Icon Rating (Custom Icons)
                </h2>

                {/* Simple Icon Rating */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Star Icons</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Default</span>
                            <IconRating
                                name="icon-stars-1"
                                icon={MdStarBorder}
                                activeIcon={MdStar}
                                defaultValue={3}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">With gap</span>
                            <IconRating
                                name="icon-stars-2"
                                icon={MdStarBorder}
                                activeIcon={MdStar}
                                gap={1}
                                defaultValue={4}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Circle shape</span>
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
                    <h3 className="text-xl font-semibold">Different Icons</h3>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Hearts</span>
                            <IconRating
                                name            = "icon-hearts"
                                activeIcon      = { MdFavorite }
                                icon            = { MdFavoriteBorder }
                                color           = "secondary-content"
                                activeColor     = "primary-content"
                                iconColor       = "secondary"
                                activeIconColor = "primary"
                                defaultValue    = { 4 }
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm w-32">Thumbs</span>
                            <IconRating
                                name         = "icon-thumbs"
                                activeColor  = "success"
                                activeIcon   = { MdThumbUp }
                                color        = "ghost"
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
                    <h3 className="text-xl font-semibold">Custom Colors</h3>

                    <div className="flex flex-col gap-3">
                        <IconRating
                            name            = "icon-color-1"
                            icon            = { MdStarBorder }
                            activeIcon      = { MdStar }
                            activeColor     = "error"
                            activeIconColor = "error-content"
                            color           = "primary-content"
                            iconColor       = "primary"
                            defaultValue    ={3}
                        />

                        <IconRating
                            name="icon-color-2"
                            activeColor     = "success"
                            activeIconColor = "success-content"
                            activeIcon      = { MdStar }
                            color           = "ghost"
                            icon            = { MdStarBorder }
                            iconColor       = "success"
                            defaultValue    = { 4 }
                        />
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default RatingDemo ;