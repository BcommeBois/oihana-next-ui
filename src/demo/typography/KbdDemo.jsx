'use client' ;

import { MdAdd } from 'react-icons/md' ;

import Kbd from '@/components/Kbd' ;

const SIZES = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

const ICON_PLUS =
(
    <>
        <MdAdd aria-hidden="true" />
        <span className="sr-only">plus</span>
    </>
) ;

/**
 * Kbd demo : one key, the sizes, combinations, and keys inside a sentence.
 */
const KbdDemo = () => (
    <section className="card bg-base-200 shadow-xl">
        <div className="card-body gap-6">
            <h3 className="card-title">Kbd</h3>
            <p className="text-sm text-base-content/70">
                Une touche du clavier, ou un code court à taper à la main. Le rendu est l'élément HTML <code>&lt;kbd&gt;</code>.
            </p>

            <div className="flex flex-col gap-2">
                <span className="font-mono text-sm">Une touche</span>
                <div className="flex flex-wrap items-center gap-2">
                    <Kbd>Esc</Kbd>
                    <Kbd>Tab</Kbd>
                    <Kbd>Entrée</Kbd>
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
                <span className="font-mono text-sm">keys — une combinaison</span>
                <p className="text-sm text-base-content/70">
                    Chaque touche a son propre <code>&lt;kbd&gt;</code>, l'ensemble est enveloppé dans un <code>&lt;kbd&gt;</code> :
                    c'est la manière HTML de dire « ensemble ». Le séparateur est du texte, lu par un lecteur d'écran.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                    <Kbd keys={ [ '⌘' , 'K' ] } />
                    <Kbd keys={ [ 'Ctrl' , 'Shift' , 'P' ] } />
                    <Kbd keys={ [ 'Alt' , 'F4' ] } size="lg" />
                    <Kbd keys={ [ 'G' , 'G' ] } separator="puis" size="sm" separatorClassName="text-xs text-base-content/60" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-mono text-sm">separator — une icône</span>
                <p className="text-sm text-base-content/70">
                    Un lecteur d'écran lit un séparateur texte, mais rien pour une icône : il faut lui adjoindre un texte
                    masqué (<code>sr-only</code>). Un emoji, lui, est lu par son nom Unicode.
                </p>
                <div className="flex flex-wrap items-center gap-6">
                    <Kbd
                        keys               = { [ 'Alt' , 'Tab' ] }
                        separator          = { ICON_PLUS }
                        separatorClassName = "inline-flex items-center text-base-content/60"
                    />
                    <Kbd
                        keys               = { [ 'Ctrl' , 'Shift' , 'Esc' ] }
                        separator          = { ICON_PLUS }
                        separatorClassName = "inline-flex items-center text-primary"
                        size               = "lg"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <span className="font-mono text-sm">Dans une phrase</span>
                <p>
                    Appuyez sur <Kbd keys={ [ '⌘' , 'K' ] } size="sm" /> pour ouvrir la recherche,
                    puis sur <Kbd size="sm">Esc</Kbd> pour la fermer.
                </p>
                <p>
                    Si l'étiquette est illisible, tapez le code de contrôle <Kbd size="sm">7K</Kbd> affiché dessous.
                </p>
            </div>
        </div>
    </section>
) ;

export default KbdDemo ;
