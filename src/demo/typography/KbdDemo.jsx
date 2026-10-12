'use client' ;

import { MdAdd } from 'react-icons/md' ;

import Kbd from '@/components/Kbd' ;

import useI18n from '@/contexts/locale/useI18n' ;

const SIZES = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

/**
 * An icon separator, with the hidden word a screen reader needs.
 *
 * @param {string} label - The word read out in place of the icon.
 */
const iconPlus = label => (
    <>
        <MdAdd aria-hidden="true" />
        <span className="sr-only">{ label }</span>
    </>
) ;

/**
 * Kbd demo : one key, the sizes, combinations, and keys inside a sentence.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.typography.kbd'] - Dot notation path to the demo locale.
 */
const KbdDemo = ( { path = 'demo.typography.kbd' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    return (
        <section className="card bg-base-200 shadow-xl">
            <div className="card-body gap-6">
                <h3 className="card-title">Kbd</h3>
                <p className="text-sm text-base-content/70">
                    { t.intro } <code>&lt;kbd&gt;</code>.
                </p>

                <div className="flex flex-col gap-2">
                    <span className="font-mono text-sm">{ t.single }</span>
                    <div className="flex flex-wrap items-center gap-2">
                        <Kbd>Esc</Kbd>
                        <Kbd>Tab</Kbd>
                        <Kbd>{ t.enter }</Kbd>
                        <Kbd>⌫</Kbd>
                        <Kbd>▲</Kbd>
                        <Kbd>A</Kbd>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-mono text-sm">size</span>
                    <div className="flex flex-wrap items-end gap-4">
                        { SIZES.map( size => (
                            <div key={ size } className="flex flex-col items-center gap-1">
                                <Kbd size={ size }>Shift</Kbd>
                                <span className="text-xs font-mono text-base-content/60">{ size }</span>
                            </div>
                        ) ) }
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-mono text-sm">{ t.combination }</span>
                    <p className="text-sm text-base-content/70">
                        { t.nesting?.[ 0 ] } <code>&lt;kbd&gt;</code>{ t.nesting?.[ 1 ] } <code>&lt;kbd&gt;</code>{ t.nesting?.[ 2 ] }
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                        <Kbd keys={ [ '⌘' , 'K' ] } />
                        <Kbd keys={ [ 'Ctrl' , 'Shift' , 'P' ] } />
                        <Kbd keys={ [ 'Alt' , 'F4' ] } size="lg" />
                        <Kbd keys={ [ 'G' , 'G' ] } separator={ t.sequence } size="sm" separatorClassName="text-xs text-base-content/60" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-mono text-sm">{ t.icon }</span>
                    <p className="text-sm text-base-content/70">
                        { t.iconNote }<code>sr-only</code>{ t.iconNoteEnd }
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                        <Kbd
                            keys               = { [ 'Alt' , 'Tab' ] }
                            separator          = { iconPlus( t.plus ) }
                            separatorClassName = "inline-flex items-center text-base-content/60"
                        />
                        <Kbd
                            keys               = { [ 'Ctrl' , 'Shift' , 'Esc' ] }
                            separator          = { iconPlus( t.plus ) }
                            separatorClassName = "inline-flex items-center text-primary"
                            size               = "lg"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-mono text-sm">{ t.sentence }</span>
                    <p>
                        { t.search?.[ 0 ] } <Kbd keys={ [ '⌘' , 'K' ] } size="sm" /> { t.search?.[ 1 ] } <Kbd size="sm">Esc</Kbd> { t.search?.[ 2 ] }
                    </p>
                    <p>
                        { t.checkCode?.[ 0 ] } <Kbd size="sm">7K</Kbd> { t.checkCode?.[ 1 ] }
                    </p>
                </div>
            </div>
        </section>
    ) ;
} ;

export default KbdDemo ;
