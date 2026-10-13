/**
 * Toast notification demo component.
 *
 * @module demo/ToastDemo
 */

import Button from '@/components/Button' ;

import useToast , { ERROR , INFO , SUCCESS , WARNING } from '@/contexts/toasts/useToast' ;

export default function ToastDemo()
{
    const { toast , alert } = useToast() ;

    return (
        <>

            {/* Basic Toasts */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Toast basiques</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <Button
                            color="error"
                            onClick={ () => toast( 'Une erreur est survenue !' , ERROR ) }
                        >
                            Error
                        </Button>
                        <Button
                            color="info"
                            onClick={ () => toast( 'Information importante' , INFO ) }
                        >
                            Info
                        </Button>
                        <Button
                            color="success"
                            onClick={ () => toast( 'Opération réussie !' , SUCCESS ) }
                        >
                            Success
                        </Button>
                        <Button
                            color="warning"
                            onClick={ () => toast( 'Attention, vérifiez vos données' , WARNING ) }
                        >
                            Warning
                        </Button>
                    </div>
                </div>
            </div>

            {/* Custom Options */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Options personnalisées</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Button
                            style="outline"
                            onClick={ () => toast( 'Toast sans icône' , INFO , { showIcon: false } ) }
                        >
                            Sans icône
                        </Button>
                        <Button
                            style="outline"
                            onClick={ () => toast( 'Toast sans bouton fermer' , SUCCESS , { showCloseButton: false } ) }
                        >
                            Sans bouton fermer
                        </Button>
                        <Button
                            style="outline"
                            onClick={ () => toast( '<strong>HTML:</strong> Message <em>enrichi</em>' , WARNING , { html: true } ) }
                        >
                            Avec HTML
                        </Button>
                        <Button
                            style="outline"
                            onClick={ () => alert( 'message avec auto-capitalize' , SUCCESS ) }
                        >
                            Alert (ucFirst)
                        </Button>
                        <Button
                            style="outline"
                            onClick={ () => toast( 'Toast avec classes custom' , INFO , { className: 'shadow-2xl' } ) }
                        >
                            Classes custom
                        </Button>
                        <Button
                            style="outline"
                            onClick={ () => toast( 'Contenu avec style' , ERROR , { contentClassName: 'text-lg font-bold' } ) }
                        >
                            Contenu stylisé
                        </Button>
                    </div>
                </div>
            </div>

            {/* Multiple Toasts */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Toasts multiples</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button
                            color="primary"
                            onClick={ () =>
                            {
                                toast( 'Premier toast' , INFO ) ;
                                setTimeout( () => toast( 'Deuxième toast' , SUCCESS ) , 500 ) ;
                                setTimeout( () => toast( 'Troisième toast' , WARNING ) , 1000 ) ;
                            } }
                        >
                            3 Toasts successifs
                        </Button>
                        <Button
                            color="primary"
                            onClick={ () =>
                            {
                                toast( 'Info 1' , INFO ) ;
                                toast( 'Info 2' , INFO ) ;
                                toast( 'Info 3' , INFO ) ;
                            } }
                        >
                            3 Toasts simultanés
                        </Button>
                        <Button
                            color="primary"
                            onClick={ () =>
                            {
                                toast( 'Erreur' , ERROR ) ;
                                toast( 'Avertissement' , WARNING ) ;
                                toast( 'Info' , INFO ) ;
                                toast( 'Succès' , SUCCESS ) ;
                            } }
                        >
                            Mix de toasts
                        </Button>
                    </div>
                </div>
            </div>

            {/* Long Messages */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Messages longs</h2>
                    <div className="flex flex-wrap gap-2">
                        <Button
                            style="outline"
                            onClick={ () => toast(
                                'Ceci est un message très long qui devrait être affiché correctement dans le toast. Le composant Alert gère automatiquement les longues lignes de texte.' ,
                                INFO
                            ) }
                        >
                            Message long
                        </Button>
                        <Button
                            style="outline"
                            onClick={ () => toast(
                                '<p>Message HTML avec <strong>mise en forme</strong>.</p><p>Plusieurs paragraphes sont possibles.</p><ul><li>Point 1</li><li>Point 2</li></ul>' ,
                                SUCCESS ,
                                { html: true }
                            ) }
                        >
                            HTML complexe
                        </Button>
                    </div>
                </div>
            </div>

        </>
    ) ;
}