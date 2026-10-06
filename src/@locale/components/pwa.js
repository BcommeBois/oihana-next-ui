/**
 * Default copy of {@link module:components/pwa/UpdateModal} : what the
 * application says when a newer build is waiting to take over.
 *
 * Deliberately says nothing about WHAT changed — a release note is the
 * application's business, and this dialog appears without one. A product
 * wanting its own words passes its own `path`.
 *
 * `versions` is read ALOUD, not shown : the two version strings are on screen
 * with an arrow between them, which a screen reader would otherwise announce
 * as two numbers and nothing else.
 */
const pwa =
{
    fr :
    {
        update :
        {
            description : 'Une nouvelle version de l’application est prête. Rechargez la page pour en profiter.' ,
            later       : 'Plus tard' ,
            reload      : 'Recharger' ,
            title       : 'Mise à jour disponible' ,
            versions    : 'De la version {0} à la version {1}' ,
        } ,
    } ,

    en :
    {
        update :
        {
            description : 'A new version of the application is ready. Reload the page to get it.' ,
            later       : 'Later' ,
            reload      : 'Reload' ,
            title       : 'Update available' ,
            versions    : 'From version {0} to version {1}' ,
        } ,
    } ,
} ;

export default pwa ;
