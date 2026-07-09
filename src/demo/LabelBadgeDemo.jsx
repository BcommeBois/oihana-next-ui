'use client' ;

import { FaGithub , FaNpm } from 'react-icons/fa' ;
import { MdStar } from 'react-icons/md' ;
import { SiVercel } from 'react-icons/si' ;

import Container  from '@/display/Container' ;
import LabelBadge from '@/components/LabelBadge' ;

const LabelBadgeDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">LabelBadge Examples</h2>

            {/* Shields.io style */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Shields.io Style</h3>

                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge
                        as="a"
                        href="https://github.com/BcommeBois/oihana-next-ui"
                        label={ <><FaGithub aria-hidden /> GitHub</> }
                        value="BcommeBois/oihana-next-ui"
                    />
                    <LabelBadge
                        as="a"
                        href="https://oihana-next-ui.vercel.app"
                        label={ <><SiVercel aria-hidden /> Demo</> }
                        value="oihana-next-ui.vercel.app"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge label={ <><FaNpm aria-hidden /> npm</> } value="v0.6.1" color="#cb3837" />
                    <LabelBadge label="downloads" value="9.6k" color="success" />
                    <LabelBadge label="license" value="MPL-2.0" color="warning" />
                </div>
            </div>

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Sizes</h3>

                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge label="size" value="xs" color="info" size="xs" />
                    <LabelBadge label="size" value="sm" color="info" size="sm" />
                    <LabelBadge label="size" value="md" color="info" size="md" />
                    <LabelBadge label="size" value="lg" color="info" size="lg" />
                    <LabelBadge label="size" value="xl" color="info" size="xl" />
                </div>
            </div>

            {/* DaisyUI Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">DaisyUI Colors (right side)</h3>

                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge label="color" value="neutral"   color="neutral" />
                    <LabelBadge label="color" value="primary"   color="primary" />
                    <LabelBadge label="color" value="secondary" color="secondary" />
                    <LabelBadge label="color" value="accent"    color="accent" />
                    <LabelBadge label="color" value="info"      color="info" />
                    <LabelBadge label="color" value="success"   color="success" />
                    <LabelBadge label="color" value="warning"   color="warning" />
                    <LabelBadge label="color" value="error"     color="error" />
                </div>
            </div>

            {/* Custom CSS Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom CSS Colors</h3>

                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge label="build" value="passing" color="#16a34a" />
                    <LabelBadge label="coverage" value="98%" color="#7c3aed" />
                    <LabelBadge label={ <><MdStar aria-hidden /> stars</> } value="1.2k" color="#0ea5e9" />
                    <LabelBadge label="hot" value="oklch(0.7 0.2 30)" color="oklch(0.7 0.2 30)" />
                </div>
            </div>

            {/* Style Variants */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Style Variants</h3>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <LabelBadge label="style" value="solid"   color="primary" style="solid" />
                        <LabelBadge label="style" value="soft"    color="primary" style="soft" />
                        <LabelBadge label="style" value="outline" color="primary" style="outline" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <LabelBadge label="style" value="solid"   color="success" style="solid" />
                        <LabelBadge label="style" value="soft"    color="success" style="soft" />
                        <LabelBadge label="style" value="outline" color="success" style="outline" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <LabelBadge label="style" value="solid"   color="#7c3aed" style="solid" />
                        <LabelBadge label="style" value="soft"    color="#7c3aed" style="soft" />
                        <LabelBadge label="style" value="outline" color="#7c3aed" style="outline" />
                    </div>
                </div>
            </div>

            {/* Custom Label Color */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Label Color</h3>

                {/* DaisyUI token vs custom CSS color on the left */}
                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge label="status" value="online" labelColor="primary" color="success" />
                    <LabelBadge label="env" value="prod" labelColor="#111827" color="#dc2626" />
                    <LabelBadge label="tier" value="pro" labelColor="secondary" color="accent" />
                </div>

                {/* Forced label text color (labelTextColor) */}
                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge label="warn" value="check" labelColor="#fde047" labelTextColor="#713f12" color="warning" />
                    <LabelBadge label="light" value="on" labelColor="#e5e7eb" labelTextColor="#111827" color="#16a34a" />
                    <LabelBadge label="dark" value="off" labelColor="#0f172a" labelTextColor="#e2e8f0" color="neutral" />
                </div>

                {/* Combined with soft / outline variants */}
                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge label="branch" value="main" labelColor="secondary" color="primary" style="soft" />
                    <LabelBadge label="branch" value="dev" labelColor="accent" color="info" style="outline" />
                    <LabelBadge label="ci" value="queued" labelColor="#7c3aed" color="#f59e0b" style="soft" />
                </div>
            </div>

            {/* Truncation & single-sided */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Truncation & Single-sided</h3>

                {/* Long value truncated (hover for the full text) */}
                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge label="repo" value="BcommeBois/oihana-next-ui/tree/main/src/components" color="primary" maxValueWidth={ 180 } />
                    <LabelBadge label="branch" value="feature/label-badge-accessibility-and-truncation" color="info" style="soft" maxValueWidth={ 160 } />
                </div>

                {/* Only one side provided → degrades to a single pill (no empty nub) */}
                <div className="flex flex-wrap items-center gap-2">
                    <LabelBadge value="value only" color="success" />
                    <LabelBadge label="label only" labelColor="secondary" />
                    <LabelBadge value="outline single" color="accent" style="outline" />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default LabelBadgeDemo ;
