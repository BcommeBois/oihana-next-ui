'use client' ;

import { useState } from 'react' ;
import Alert        from '@/components/Alert' ;
import { ERROR, INFO, SUCCESS, WARNING } from '@/themes/colors' ;

/**
 * Alert showcase demo component.
 * Harmonized with ToastDemo UI.
 */
const AlertDemo = () =>
{
    const [ visibleAlerts, setVisibleAlerts ] = useState({
        error   : true ,
        info    : true ,
        success : true ,
        warning : true ,
    }) ;

    const resetAlerts = () => setVisibleAlerts({
        error   : true ,
        info    : true ,
        success : true ,
        warning : true ,
    }) ;

    return (
        <div className="flex flex-col gap-6">

            {/* Basic Levels */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Alertes de niveau (Standard)</h2>
                    <div className="flex flex-col gap-3">
                        { visibleAlerts.error && (
                            <Alert
                                level   = { ERROR }
                                onClose = { () => setVisibleAlerts( p => ({ ...p, error: false }) ) }
                            >
                                Une erreur critique est survenue lors de l'enregistrement.
                            </Alert>
                        )}
                        { visibleAlerts.info && (
                            <Alert
                                level   = { INFO }
                                onClose = { () => setVisibleAlerts( p => ({ ...p, info: false }) ) }
                            >
                                Votre session expirera dans 15 minutes.
                            </Alert>
                        )}
                        { visibleAlerts.success && (
                            <Alert
                                level   = { SUCCESS }
                                onClose = { () => setVisibleAlerts( p => ({ ...p, success: false }) ) }
                            >
                                Les modifications ont été appliquées avec succès.
                            </Alert>
                        )}
                        { visibleAlerts.warning && (
                            <Alert
                                level   = { WARNING }
                                onClose = { () => setVisibleAlerts( p => ({ ...p, warning: false }) ) }
                            >
                                Attention : l'espace de stockage est presque plein.
                            </Alert>
                        )}
                        <button className="btn btn-ghost btn-xs w-fit" onClick={ resetAlerts }>
                            Réinitialiser les alertes
                        </button>
                    </div>
                </div>
            </div>

            {/* Custom Configurations */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Options et Configurations</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <Alert
                            level           = { INFO }
                            showCloseButton = { false }
                        >
                            Alerte persistante (sans bouton de fermeture)
                        </Alert>
                        <Alert
                            level    = { SUCCESS }
                            showIcon = { false }
                        >
                            Alerte minimaliste sans icône
                        </Alert>
                        <Alert
                            html  = { true }
                            level = { WARNING }
                        >
                            { `Contenu <strong>HTML</strong> : Message <em>enrichi</em> avec un <a href="#" class="underline">lien</a>` }
                        </Alert>
                        <Alert
                            level  = { ERROR }
                            option = {
                                <button className="btn btn-error btn-sm" onClick={ () => alert( 'Retry clicked' ) }>
                                    Réessayer
                                </button>
                            }
                        >
                            Action personnalisée au lieu du bouton fermer
                        </Alert>
                    </div>
                </div>
            </div>

            {/* DaisyUI 5 Variants */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Variantes DaisyUI 5 (Classes custom)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Alert
                            className = "alert-soft"
                            level     = { INFO }
                        >
                            Style Soft (alert-soft)
                        </Alert>
                        <Alert
                            className = "alert-outline"
                            level     = { SUCCESS }
                        >
                            Style Outline (alert-outline)
                        </Alert>
                        <Alert
                            className = "alert-dash"
                            level     = { WARNING }
                        >
                            Style Dash (alert-dash)
                        </Alert>
                        <Alert
                            className = "alert-vertical md:alert-horizontal"
                            level     = { ERROR }
                        >
                            Alerte adaptative (Verticale/Horizontale)
                        </Alert>
                    </div>
                </div>
            </div>

            {/* Complex/Long Content */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Messages complexes</h2>
                    <div className="flex flex-col gap-4">
                        <Alert level={ INFO }>
                            Ceci est un message très long pour tester le retour à la ligne automatique et l'alignement des icônes latérales. Le texte doit rester lisible et bien espacé par rapport aux boutons d'action.
                        </Alert>
                        <Alert
                            html  = { true }
                            level = { SUCCESS }
                        >
                            { `<ul><li>Point de vérification 1</li><li>Point de vérification 2</li></ul>` }
                        </Alert>
                    </div>
                </div>
            </div>

        </div>
    ) ;
} ;

AlertDemo.displayName = 'AlertDemo' ;

export default AlertDemo ;