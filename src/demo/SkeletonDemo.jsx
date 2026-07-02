'use client' ;

import Container from '@/display/Container' ;

import Skeleton from '@/components/Skeleton' ;
import Divider  from '@/components/Divider' ;

const SkeletonDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Skeleton Examples</h2>

            {/* Basic */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">Basic</h3>

                <Skeleton className="h-32 w-32" />
            </div>

            <Divider />

            {/* Circle with content */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">Circle with content</h3>

                <div className="flex w-52 flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </div>
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>

            <Divider />

            {/* Rectangle with content */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">Rectangle with content</h3>

                <div className="flex w-52 flex-col gap-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>

            <Divider />

            {/* Animated gradient text */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">Animated gradient text</h3>

                <Skeleton as="span" text>AI is thinking harder...</Skeleton>
            </div>

            <Divider />

            {/* Custom element */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">Custom Element</h3>

                <ul className="flex flex-col gap-2 w-52">
                    <Skeleton as="li" className="h-4 w-full" />
                    <Skeleton as="li" className="h-4 w-3/4" />
                    <Skeleton as="li" className="h-4 w-1/2" />
                </ul>
            </div>

        </Container>
    ) ;
} ;

export default SkeletonDemo ;
