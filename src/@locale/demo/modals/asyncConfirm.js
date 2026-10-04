const asyncConfirm =
{
    fr :
    {
        title       : 'Confirmation asynchrone' ,
        description : "La modale reste ouverte pendant l'action : bouton « En cours… », Annuler et la croix désactivés, Échap et le fond sans effet. Elle se ferme quand l'action réussit, et reste ouverte avec une erreur quand elle échoue." ,

        succeed  : 'Archiver (réussite)' ,
        fail     : 'Archiver (échec)' ,
        idle     : 'Aucun archivage' ,
        archived : 'Archivé à {0}' ,

        agree    : 'Archiver' ,
        modal    : 'Archiver le document ?' ,
        body     : 'Le document ne sera plus proposé dans les listes.' ,
        failure  : "Le serveur a refusé l'archivage. Réessayez ou annulez." ,
    } ,
    en :
    {
        title       : 'Asynchronous confirmation' ,
        description : 'The dialog stays up while the action runs : a « Working… » button, cancel and the cross disabled, Escape and the backdrop without effect. It closes when the action succeeds, and stays open with an error when it fails.' ,

        succeed  : 'Archive (succeeds)' ,
        fail     : 'Archive (fails)' ,
        idle     : 'Nothing archived' ,
        archived : 'Archived at {0}' ,

        agree    : 'Archive' ,
        modal    : 'Archive the document?' ,
        body     : 'The document will no longer be offered in the lists.' ,
        failure  : 'The server refused the archiving. Try again or cancel.' ,
    } ,
} ;

export default asyncConfirm ;
