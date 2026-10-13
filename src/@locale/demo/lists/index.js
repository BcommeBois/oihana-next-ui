/**
 * Labels of the list demos.
 */
const lists =
{
    gestures :
    {
        fr :
        {
            swipe :
            {
                title     : 'Balayer une ligne' ,
                text      : 'Vers la droite, la tâche est faite ; vers la gauche, elle est retirée — mais la ligne s’arrête sur un bouton, pour qu’un geste maladroit ne supprime rien. Les mêmes actions sont dans les boutons de la ligne : le geste est une commodité, jamais le seul chemin.' ,
                check     : 'Fait' ,
                undo      : 'À refaire' ,
                remove    : 'Retirer' ,
                reset     : 'Remettre les tâches' ,
                done      : '« {0} » faite.' ,
                removed   : '« {0} » retirée.' ,
                doneState : 'fait' ,
                todoState : 'à faire' ,
                help      : 'À la souris, glissez la ligne ; au doigt, balayez. Échap ou un tap ailleurs referme une ligne ouverte.' ,
                tasks     :
                {
                    oak     : 'Compter les planches de chêne' ,
                    batten  : 'Ranger les tasseaux' ,
                    panel   : 'Vérifier les panneaux' ,
                    screws  : 'Commander des vis' ,
                    glue    : 'Remplacer la colle' ,
                    varnish : 'Tester le vernis' ,
                } ,
            } ,

            pull :
            {
                title    : 'Tirer pour actualiser' ,
                text     : 'En haut de la liste, tirez vers le bas : la flèche se retourne au seuil, relâchez, la liste se recharge (1,5 s simulée). En bas, le défilement infini charge la suite : les deux gestes sur la même liste.' ,
                count    : '{0} lignes · {1} actualisation(s)' ,
                item     : 'Mission {0}' ,
                subtitle : 'actualisation {0}' ,
                end      : 'Fin de la liste' ,
                help     : 'Au doigt seulement — à la souris, le bouton. Sur Android, le tirer-pour-recharger natif de Chrome est neutralisé dans la zone (overscroll-behavior).' ,
            } ,
        } ,
        en :
        {
            swipe :
            {
                title     : 'Swipe a row' ,
                text      : 'To the right, the task is done; to the left, it is removed — but the row stops on a button, so a clumsy gesture deletes nothing. The same actions sit in the row’s buttons: the gesture is a convenience, never the only way.' ,
                check     : 'Done' ,
                undo      : 'Undo' ,
                remove    : 'Remove' ,
                reset     : 'Put the tasks back' ,
                done      : '« {0} » done.' ,
                removed   : '« {0} » removed.' ,
                doneState : 'done' ,
                todoState : 'to do' ,
                help      : 'With a mouse, drag the row; with a finger, swipe. Escape or a tap elsewhere closes an open row.' ,
                tasks     :
                {
                    oak     : 'Count the oak boards' ,
                    batten  : 'Put the battens away' ,
                    panel   : 'Check the panels' ,
                    screws  : 'Order screws' ,
                    glue    : 'Replace the glue' ,
                    varnish : 'Test the varnish' ,
                } ,
            } ,

            pull :
            {
                title    : 'Pull to refresh' ,
                text     : 'At the top of the list, pull down: the arrow turns at the threshold, let go, the list loads again (1.5 s simulated). At the bottom, infinite scrolling loads more: both gestures on one list.' ,
                count    : '{0} rows · {1} refresh(es)' ,
                item     : 'Mission {0}' ,
                subtitle : 'refresh {0}' ,
                end      : 'End of the list' ,
                help     : 'With a finger only — with a mouse, the button. On Android, Chrome’s native pull-to-refresh is turned off inside the box (overscroll-behavior).' ,
            } ,
        } ,
    } ,
} ;

export default lists ;
