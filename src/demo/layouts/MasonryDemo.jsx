'use client' ;

import Masonry from '@/components/layouts/Masonry' ;

const MasonryCard = ({ children, height = 'auto', className = '' }) => (
    <div
        className={ `bg-primary/20 border-2 border-primary rounded-lg p-4 text-center font-semibold ${className}` }
        style={{ minHeight: height === 'auto' ? 'auto' : `${height}px` }}
    >
        { children }
    </div>
) ;

const ImageCard = ({ src, alt, title }) => (
    <div className="card bg-base-300 shadow-md overflow-hidden">
        <figure className="aspect-auto">
            <img
                alt       = { alt }
                className = "w-full h-auto object-cover"
                src       = { src }
            />
        </figure>
        { title && (
            <div className="card-body p-3">
                <p className="text-sm font-semibold">{ title }</p>
            </div>
        )}
    </div>
) ;

const MasonryDemo = () =>
(
    <div className="flex flex-col gap-8">


        {/* Real-world Examples */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Real-world Examples</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Image Gallery */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Photo Gallery
                        </h3>
                        <Masonry
                            columns = {{ xs: 2, md: 3, lg: 4 }}
                            gap     = {4}
                        >
                            <ImageCard
                                alt   = "Placeholder 1"
                                src   = "https://picsum.photos/seed/1/400/300"
                                title = "Photo 1"
                            />
                            <ImageCard
                                alt   = "Placeholder 2"
                                src   = "https://picsum.photos/seed/2/400/500"
                                title = "Photo 2"
                            />
                            <ImageCard
                                alt   = "Placeholder 3"
                                src   = "https://picsum.photos/seed/3/400/400"
                                title = "Photo 3"
                            />
                            <ImageCard
                                alt   = "Placeholder 4"
                                src   = "https://picsum.photos/seed/4/400/350"
                                title = "Photo 4"
                            />
                            <ImageCard
                                alt   = "Placeholder 5"
                                src   = "https://picsum.photos/seed/5/400/450"
                                title = "Photo 5"
                            />
                            <ImageCard
                                alt   = "Placeholder 6"
                                src   = "https://picsum.photos/seed/6/400/300"
                                title = "Photo 6"
                            />
                            <ImageCard
                                alt   = "Placeholder 7"
                                src   = "https://picsum.photos/seed/7/400/400"
                                title = "Photo 7"
                            />
                            <ImageCard
                                alt   = "Placeholder 8"
                                src   = "https://picsum.photos/seed/8/400/350"
                                title = "Photo 8"
                            />
                        </Masonry>
                    </div>

                    {/* Card Wall */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Content Cards
                        </h3>
                        <Masonry
                            columns = {{ xs: 1, sm: 2, lg: 3 }}
                            gap     = {4}
                        >
                            <div className="card bg-base-300 shadow-md">
                                <div className="card-body">
                                    <h3 className="card-title">Card Title 1</h3>
                                    <p>Short description.</p>
                                </div>
                            </div>
                            <div className="card bg-base-300 shadow-md">
                                <div className="card-body">
                                    <h3 className="card-title">Card Title 2</h3>
                                    <p>This card has more content and will be taller than the others. Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                            <div className="card bg-base-300 shadow-md">
                                <div className="card-body">
                                    <h3 className="card-title">Card Title 3</h3>
                                    <p>Medium content here.</p>
                                </div>
                            </div>
                            <div className="card bg-base-300 shadow-md">
                                <div className="card-body">
                                    <h3 className="card-title">Card Title 4</h3>
                                    <p>Another card.</p>
                                </div>
                            </div>
                            <div className="card bg-base-300 shadow-md">
                                <div className="card-body">
                                    <h3 className="card-title">Card Title 5</h3>
                                    <p>This one has a bit more text to show the masonry effect working properly with different heights.</p>
                                </div>
                            </div>
                            <div className="card bg-base-300 shadow-md">
                                <div className="card-body">
                                    <h3 className="card-title">Card Title 6</h3>
                                    <p>Short text.</p>
                                </div>
                            </div>
                        </Masonry>
                    </div>
                </div>
            </div>
        </div>

        {/* Basic Masonry */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Basic Masonry Layout</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* 2 Columns */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            2 Columns
                        </h3>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {2}
                            gap       = {3}
                        >
                            <MasonryCard height={100}>1</MasonryCard>
                            <MasonryCard height={150}>2</MasonryCard>
                            <MasonryCard height={120}>3</MasonryCard>
                            <MasonryCard height={180}>4</MasonryCard>
                            <MasonryCard height={90}>5</MasonryCard>
                            <MasonryCard height={160}>6</MasonryCard>
                        </Masonry>
                    </div>

                    {/* 3 Columns */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            3 Columns
                        </h3>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {3}
                            gap       = {3}
                        >
                            <MasonryCard height={120}>1</MasonryCard>
                            <MasonryCard height={180}>2</MasonryCard>
                            <MasonryCard height={90}>3</MasonryCard>
                            <MasonryCard height={150}>4</MasonryCard>
                            <MasonryCard height={100}>5</MasonryCard>
                            <MasonryCard height={200}>6</MasonryCard>
                            <MasonryCard height={130}>7</MasonryCard>
                            <MasonryCard height={160}>8</MasonryCard>
                            <MasonryCard height={110}>9</MasonryCard>
                        </Masonry>
                    </div>

                    {/* 4 Columns */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            4 Columns
                        </h3>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {4}
                            gap       = {2}
                        >
                            <MasonryCard height={100}>1</MasonryCard>
                            <MasonryCard height={140}>2</MasonryCard>
                            <MasonryCard height={90}>3</MasonryCard>
                            <MasonryCard height={160}>4</MasonryCard>
                            <MasonryCard height={110}>5</MasonryCard>
                            <MasonryCard height={130}>6</MasonryCard>
                            <MasonryCard height={150}>7</MasonryCard>
                            <MasonryCard height={120}>8</MasonryCard>
                        </Masonry>
                    </div>
                </div>
            </div>
        </div>

        {/* Responsive Masonry */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Responsive Masonry</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Responsive Columns */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            1 → 2 → 3 → 4 Columns
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Try resizing your browser: 1 col on mobile, 2 on small, 3 on medium, 4 on xl screens
                        </p>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {{ xs: 1, sm: 2, md: 3, xl: 4 }}
                            gap       = {3}
                        >
                            <MasonryCard height={120}>Item 1</MasonryCard>
                            <MasonryCard height={180}>Item 2</MasonryCard>
                            <MasonryCard height={90}>Item 3</MasonryCard>
                            <MasonryCard height={150}>Item 4</MasonryCard>
                            <MasonryCard height={100}>Item 5</MasonryCard>
                            <MasonryCard height={200}>Item 6</MasonryCard>
                            <MasonryCard height={130}>Item 7</MasonryCard>
                            <MasonryCard height={160}>Item 8</MasonryCard>
                            <MasonryCard height={110}>Item 9</MasonryCard>
                            <MasonryCard height={140}>Item 10</MasonryCard>
                            <MasonryCard height={170}>Item 11</MasonryCard>
                            <MasonryCard height={95}>Item 12</MasonryCard>
                        </Masonry>
                    </div>

                    {/* 2 → 3 → 4 */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            2 → 3 → 4 Columns
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Starts at 2 columns on mobile
                        </p>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {{ xs: 2, md: 3, xxl: 4 }}
                            gap       = {{ xs: 2, md: 4 }}
                        >
                            <MasonryCard height={110}>01</MasonryCard>
                            <MasonryCard height={160}>02</MasonryCard>
                            <MasonryCard height={90}>03</MasonryCard>
                            <MasonryCard height={140}>04</MasonryCard>
                            <MasonryCard height={120}>05</MasonryCard>
                            <MasonryCard height={180}>06</MasonryCard>
                            <MasonryCard height={100}>07</MasonryCard>
                            <MasonryCard height={150}>08</MasonryCard>
                        </Masonry>
                    </div>
                </div>
            </div>
        </div>

        {/* Gap Variations */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Gap Variations</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Small Gap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Small Gap (gap=1)
                        </h3>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {3}
                            gap       = {1}
                        >
                            <MasonryCard height={100}>1</MasonryCard>
                            <MasonryCard height={130}>2</MasonryCard>
                            <MasonryCard height={90}>3</MasonryCard>
                            <MasonryCard height={120}>4</MasonryCard>
                            <MasonryCard height={110}>5</MasonryCard>
                            <MasonryCard height={140}>6</MasonryCard>
                        </Masonry>
                    </div>

                    {/* Large Gap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Large Gap (gap=6)
                        </h3>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {3}
                            gap       = {6}
                        >
                            <MasonryCard height={100}>1</MasonryCard>
                            <MasonryCard height={130}>2</MasonryCard>
                            <MasonryCard height={90}>3</MasonryCard>
                            <MasonryCard height={120}>4</MasonryCard>
                            <MasonryCard height={110}>5</MasonryCard>
                            <MasonryCard height={140}>6</MasonryCard>
                        </Masonry>
                    </div>

                    {/* Different X/Y Gap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Custom Gap (X=6, Y=2)
                        </h3>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {3}
                            gapX      = {6}
                            gapY      = {2}
                        >
                            <MasonryCard height={100}>1</MasonryCard>
                            <MasonryCard height={130}>2</MasonryCard>
                            <MasonryCard height={90}>3</MasonryCard>
                            <MasonryCard height={120}>4</MasonryCard>
                            <MasonryCard height={110}>5</MasonryCard>
                            <MasonryCard height={140}>6</MasonryCard>
                        </Masonry>
                    </div>

                    {/* Responsive Gap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Responsive Gap
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Gap increases with screen size
                        </p>
                        <Masonry
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = {{ xs: 2, md: 3 }}
                            gap       = {{ xs: 1, sm: 2, md: 4, lg: 6 }}
                        >
                            <MasonryCard height={100}>1</MasonryCard>
                            <MasonryCard height={130}>2</MasonryCard>
                            <MasonryCard height={90}>3</MasonryCard>
                            <MasonryCard height={120}>4</MasonryCard>
                            <MasonryCard height={110}>5</MasonryCard>
                            <MasonryCard height={140}>6</MasonryCard>
                        </Masonry>
                    </div>
                </div>
            </div>
        </div>

        {/* Custom Column Styling */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Custom Column Styling</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Styled Columns */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Columns with Background
                        </h3>
                        <Masonry
                            className       = "bg-base-300 rounded-lg p-4"
                            columnClassName = "bg-base-100 rounded-lg p-3 shadow-sm"
                            columns         = {3}
                            gap             = {4}
                        >
                            <MasonryCard height={100}>1</MasonryCard>
                            <MasonryCard height={140}>2</MasonryCard>
                            <MasonryCard height={90}>3</MasonryCard>
                            <MasonryCard height={130}>4</MasonryCard>
                            <MasonryCard height={110}>5</MasonryCard>
                            <MasonryCard height={150}>6</MasonryCard>
                        </Masonry>
                    </div>
                </div>
            </div>
        </div>

    </div>
) ;

export default MasonryDemo ;