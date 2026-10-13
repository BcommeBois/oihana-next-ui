/**
 * Labels of the PDF editing demo.
 */
const edit =
{
    fr :
    {
        title  : 'Retoucher un PDF' ,
        intro  : 'Le troisième moteur, pdf-lib, lit et réécrit la structure d’un PDF reçu sans le redessiner : fusionner, extraire, tourner, numéroter, tamponner, filigraner, remplir un formulaire. Des fonctions, pas des composants : chacune prend ce que la visionneuse prend et rend des octets, que la visionneuse montre et que sa barre télécharge. 600 Ko, chargés au premier usage ; les mêmes fonctions tournent dans une route serveur.' ,
        result : '{0} — {1} page(s)' ,

        engine :
        {
            ready   : 'pdf-lib prêt' ,
            missing : '@cantoo/pdf-lib n’est pas installé.' ,
            waiting : 'moteur non chargé' ,
        } ,

        merge :
        {
            title  : 'Fusionner' ,
            text   : 'Les deux exemples du lab bout à bout : 2 + 40 pages, les propriétés du premier, ou un titre donné.' ,
            action : 'Fusionner les deux exemples' ,
            name   : 'Dossier' ,
        } ,

        extract :
        {
            title  : 'Extraire des pages' ,
            text   : 'Les pages nommées, dans l’ordre nommé : extraire, réordonner — ou retirer une page en nommant les autres.' ,
            pages  : 'Pages' ,
            helper : 'Comme une boîte d’impression : 1-3,5 · 8- · -2' ,
            action : 'Extraire des quarante pages' ,
        } ,

        rotate :
        {
            title  : 'Tourner' ,
            text   : 'Un quart de tour, une page ou toutes, écrit dans le fichier : tout lecteur l’ouvre tourné. La rotation s’ajoute à celle que la page a déjà.' ,
            page   : 'Page' ,
            all    : 'toutes' ,
            angle  : 'Angle' ,
            action : 'Tourner' ,
        } ,

        number :
        {
            title     : 'Numéroter' ,
            text      : '« n / N » en Helvetica, où va un pied de page. Sauter la couverture : le compte est celui des pages numérotées.' ,
            position  : 'Position' ,
            positions : { 'bottom-center' : 'bas, centré' , 'bottom-right' : 'bas, à droite' , 'top-right' : 'haut, à droite' } ,
            format    : 'Format' ,
            skip      : 'Sauter la première page' ,
            action    : 'Numéroter les quarante pages' ,
        } ,

        sign :
        {
            title      : 'Signer un PDF reçu' ,
            text       : 'Le vrai cas : un devis renvoyé signé. Déposez un PDF (ou gardez l’exemple), signez, choisissez la page et le coin : le tracé est posé en vectoriel, net à toute échelle — et un logo PNG en haut à droite si vous voulez.' ,
            drop       : 'Déposez le PDF à signer' ,
            dropHelper : 'Sans dépôt, l’exemple de deux pages.' ,
            pad        : 'Signature' ,
            anchor     : 'Coin' ,
            anchors    : { 'bottom-right' : 'bas droite' , 'bottom-left' : 'bas gauche' , 'top-right' : 'haut droite' } ,
            width      : 'Largeur (mm)' ,
            last       : 'Dernière page' ,
            logo       : 'Ajouter le logo' ,
            action     : 'Apposer la signature' ,
        } ,

        watermark :
        {
            title  : 'Filigrane' ,
            text   : 'Un mot en travers de chaque page, grand, léger, incliné.' ,
            word   : 'Texte' ,
            angle  : 'Angle' ,
            action : 'Filigraner' ,
        } ,

        form :
        {
            title    : 'Remplir un formulaire' ,
            text     : 'Un bon de commande avec des champs (public/documents/form.pdf) : listFormFields dit ce qu’il contient, fillForm le remplit par nom, et flatten fige les valeurs dans la page — plus un champ que l’on puisse modifier.' ,
            fields   : { name : 'Nom du client' , address : 'Adresse' , date : 'Date' , delivery : 'Livraison' , payment : 'Paiement' , agreed : 'Bon pour accord' } ,
            defaults : { name : 'Camille Martin' , address : '12 rue des Lilas, 75011 Paris' , date : '13/10/2026' , delivery : 'relais' , payment : 'carte' , agreed : true } ,
            flatten  : 'Figer (flatten)' ,
            action   : 'Remplir le bon de commande' ,
            help     : 'Sans figer, les champs restent modifiables dans la visionneuse comme dans tout lecteur.' ,
        } ,
    } ,
    en :
    {
        title  : 'Editing a PDF' ,
        intro  : 'The third engine, pdf-lib, reads and rewrites the structure of a received PDF without redrawing it: merge, extract, rotate, number, stamp, watermark, fill a form. Functions, not components: each takes what the viewer takes and returns bytes, which the viewer shows and its toolbar downloads. 600 KB, loaded on first use; the same functions run in a server route.' ,
        result : '{0} — {1} page(s)' ,

        engine :
        {
            ready   : 'pdf-lib ready' ,
            missing : '@cantoo/pdf-lib is not installed.' ,
            waiting : 'engine not loaded' ,
        } ,

        merge :
        {
            title  : 'Merge' ,
            text   : 'The lab’s two samples end to end: 2 + 40 pages, the first one’s properties, or a given title.' ,
            action : 'Merge the two samples' ,
            name   : 'Dossier' ,
        } ,

        extract :
        {
            title  : 'Extract pages' ,
            text   : 'The pages named, in the order named: extract, reorder — or remove a page by naming the others.' ,
            pages  : 'Pages' ,
            helper : 'As a print dialog reads them: 1-3,5 · 8- · -2' ,
            action : 'Extract from the forty pages' ,
        } ,

        rotate :
        {
            title  : 'Rotate' ,
            text   : 'A quarter turn, one page or all, written in the file: every reader opens it turned. The rotation adds to the page’s own.' ,
            page   : 'Page' ,
            all    : 'all' ,
            angle  : 'Angle' ,
            action : 'Rotate' ,
        } ,

        number :
        {
            title     : 'Number' ,
            text      : '« n / N » in Helvetica, where a footer goes. Skip the cover: the count is that of the numbered pages.' ,
            position  : 'Position' ,
            positions : { 'bottom-center' : 'bottom, centred' , 'bottom-right' : 'bottom, right' , 'top-right' : 'top, right' } ,
            format    : 'Format' ,
            skip      : 'Skip the first page' ,
            action    : 'Number the forty pages' ,
        } ,

        sign :
        {
            title      : 'Sign a received PDF' ,
            text       : 'The real case: a quote sent back signed. Drop a PDF (or keep the sample), sign, choose the page and the corner: the strokes are placed as vectors, sharp at any scale — and a PNG logo at the top right if you like.' ,
            drop       : 'Drop the PDF to sign' ,
            dropHelper : 'Without a drop, the two-page sample.' ,
            pad        : 'Signature' ,
            anchor     : 'Corner' ,
            anchors    : { 'bottom-right' : 'bottom right' , 'bottom-left' : 'bottom left' , 'top-right' : 'top right' } ,
            width      : 'Width (mm)' ,
            last       : 'Last page' ,
            logo       : 'Add the logo' ,
            action     : 'Place the signature' ,
        } ,

        watermark :
        {
            title  : 'Watermark' ,
            text   : 'A word across every page, large, light, slanted.' ,
            word   : 'Text' ,
            angle  : 'Angle' ,
            action : 'Watermark' ,
        } ,

        form :
        {
            title    : 'Fill a form' ,
            text     : 'An order form with fields (public/documents/form.pdf): listFormFields says what it holds, fillForm fills it by name, and flatten makes the values part of the page — no field left to edit.' ,
            fields   : { name : 'Customer name' , address : 'Address' , date : 'Date' , delivery : 'Delivery' , payment : 'Payment' , agreed : 'Approved' } ,
            defaults : { name : 'Camille Martin' , address : '12 rue des Lilas, 75011 Paris' , date : '2026-10-13' , delivery : 'relais' , payment : 'carte' , agreed : true } ,
            flatten  : 'Flatten' ,
            action   : 'Fill the order form' ,
            help     : 'Not flattened, the fields stay editable in the viewer as in any reader.' ,
        } ,
    } ,
} ;

export default edit ;
