const scan =
{
    fr :
    {
        sound    : 'Bip et vibration' ,
        intro    : 'Un code arrive par la caméra (le bouton collé au champ) ou au clavier (tapez, puis Entrée). Les deux sources rendent la même lecture. La caméra demande HTTPS : sur téléphone, passez par le lab déployé.' ,
        simple   :
        {
            title       : 'Un champ de scan' ,
            label       : 'Code' ,
            placeholder : 'Scannez ou tapez un code' ,
            helper      : 'Essayez aussi un GS1 tapé : (01)09501101530003(10)LOT-42' ,
        } ,
        validated :
        {
            title       : 'Avec validate : des EAN-13 seulement, en série' ,
            label       : 'Article' ,
            placeholder : 'EAN-13' ,
            helper      : 'closeOnScan={ false } garde la caméra ouverte, clearOnScan vide le champ après chaque code accepté.' ,
            expected    : 'Un EAN-13 était attendu (13 chiffres).' ,
        } ,
        last     : 'Dernier onScan' ,
        rejected : 'Dernier onReject' ,
        none     : 'rien pour l’instant' ,
        lines    : 'Articles scannés : {0}' ,
    } ,

    en :
    {
        sound    : 'Beep and vibration' ,
        intro    : 'A code comes from the camera (the button stuck to the field) or from the keyboard (type, then Enter). Both sources give the same reading. The camera needs HTTPS : on a phone, go through the deployed lab.' ,
        simple   :
        {
            title       : 'A scan field' ,
            label       : 'Code' ,
            placeholder : 'Scan or type a code' ,
            helper      : 'Try a typed GS1 too : (01)09501101530003(10)LOT-42' ,
        } ,
        validated :
        {
            title       : 'With validate : EAN-13 only, one after another' ,
            label       : 'Product' ,
            placeholder : 'EAN-13' ,
            helper      : 'closeOnScan={ false } keeps the camera open, clearOnScan empties the field after each code accepted.' ,
            expected    : 'An EAN-13 was expected (13 digits).' ,
        } ,
        last     : 'Last onScan' ,
        rejected : 'Last onReject' ,
        none     : 'nothing yet' ,
        lines    : 'Products scanned : {0}' ,
    } ,
} ;

export default scan ;
