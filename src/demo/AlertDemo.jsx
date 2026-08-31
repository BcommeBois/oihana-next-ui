'use client' ;

import { useState } from 'react' ;

import Alert from '@/components/Alert' ;

import { ACCENT, ERROR, INFO, NEUTRAL, PRIMARY, SECONDARY, SUCCESS, WARNING } from '@/themes/colors' ;
import { DASH, OUTLINE, SOFT } from '@/themes/components/alert' ;

/**
 * Alert showcase demo component.
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
                    <p className="text-base-content/60 text-sm">
                        { `Le niveau porte la sémantique : il choisit l'icône et, sauf mention contraire, la couleur.` }
                    </p>
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
                        <button className="btn btn-ghost btn-xs w-fit" onClick={ resetAlerts } type="button">
                            Réinitialiser les alertes
                        </button>
                    </div>
                </div>
            </div>

            {/* Colors */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Couleurs</h2>
                    <p className="text-base-content/60 text-sm">
                        { `« color » découple la couleur de la sémantique : les quatre niveaux de DaisyUI, plus les quatre couleurs de la maison.` }
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Alert color={ INFO }>Info</Alert>
                        <Alert color={ SUCCESS }>Success</Alert>
                        <Alert color={ WARNING }>Warning</Alert>
                        <Alert color={ ERROR }>Error</Alert>
                        <Alert color={ PRIMARY }>Primary</Alert>
                        <Alert color={ SECONDARY }>Secondary</Alert>
                        <Alert color={ ACCENT }>Accent</Alert>
                        <Alert color={ NEUTRAL }>Neutral</Alert>
                    </div>
                    <div className="mt-2">
                        <Alert
                            color = { PRIMARY }
                            level = { INFO }
                        >
                            { `Niveau « info » — donc l'icône d'information — repeint en « primary ».` }
                        </Alert>
                    </div>
                </div>
            </div>

            {/* Style variants */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Variantes de style</h2>
                    <p className="text-base-content/60 text-sm">
                        { `Soft, outline et dash dérivent de la même couleur, y compris pour les couleurs de la maison.` }
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Alert level={ INFO }    style={ SOFT    }>Info · soft</Alert>
                        <Alert level={ INFO }    style={ OUTLINE }>Info · outline</Alert>
                        <Alert level={ INFO }    style={ DASH    }>Info · dash</Alert>

                        <Alert level={ SUCCESS } style={ SOFT    }>Success · soft</Alert>
                        <Alert level={ WARNING } style={ OUTLINE }>Warning · outline</Alert>
                        <Alert level={ ERROR }   style={ DASH    }>Error · dash</Alert>

                        <Alert color={ PRIMARY   } style={ SOFT    }>Primary · soft</Alert>
                        <Alert color={ SECONDARY } style={ OUTLINE }>Secondary · outline</Alert>
                        <Alert color={ ACCENT    } style={ DASH    }>Accent · dash</Alert>
                    </div>
                    <div className="mt-2">
                        <Alert
                            level   = { WARNING }
                            onClose = { () => {} }
                            style   = { SOFT }
                        >
                            { `La croix suit la couleur du texte, sur fond plein comme sur fond pâle.` }
                        </Alert>
                    </div>
                </div>
            </div>

            {/* Direction */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Direction</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Alert
                            direction = "vertical"
                            level     = { INFO }
                            option    = { <button className="btn btn-info btn-sm" type="button">Voir</button> }
                        >
                            Verticale : le contenu passe sous l'icône.
                        </Alert>
                        <Alert
                            direction = "horizontal"
                            level     = { SUCCESS }
                            option    = { <button className="btn btn-success btn-sm" type="button">Voir</button> }
                        >
                            Horizontale, quelle que soit la largeur.
                        </Alert>
                    </div>
                </div>
            </div>

            {/* Arbitrary colors */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Couleur arbitraire</h2>
                    <p className="text-base-content/60 text-sm">
                        { `Le composant tient sur une seule variable CSS : « containerStyle » ouvre la porte à n'importe quelle couleur.` }
                    </p>
                    <div className="flex flex-col gap-4">
                        <Alert
                            containerStyle = {{ '--alert-color' : '#7c3aed' , color : 'white' }}
                            level          = { INFO }
                        >
                            { `Violet plein — la teinte du texte est à votre charge dès que la couleur sort du thème.` }
                        </Alert>
                        <Alert
                            containerStyle = {{ '--alert-color' : '#7c3aed' }}
                            level          = { INFO }
                            style          = { SOFT }
                        >
                            { `Le même violet en « soft » : DaisyUI en tire le fond, la bordure et le texte tout seul.` }
                        </Alert>
                        <Alert
                            containerStyle = {{ '--alert-color' : 'oklch(70% 0.18 150)' }}
                            level          = { SUCCESS }
                            style          = { OUTLINE }
                        >
                            { `Une couleur oklch en « outline ».` }
                        </Alert>
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
                                <button className="btn btn-error btn-sm" type="button">
                                    Réessayer
                                </button>
                            }
                        >
                            Action personnalisée au lieu du bouton fermer
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
