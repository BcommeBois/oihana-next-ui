const counter =
{
    fr :
    {
        title : 'Compter' ,

        age : { placeholder : 'Âge' } ,

        yourAge :
        {
            legend : 'Votre âge' ,
            helper : 'Vous devez avoir 18 ans ou plus.' ,
        } ,

        quantity : { legend : 'Quantité' } ,

        repeat :
        {
            legend : 'Quantité, en gardant − ou + appuyé' ,
            helper : 'repeat : appui maintenu, un pas toutes les 100 ms après 400 ms ; s’arrête à 0 et à 500.' ,
        } ,

        price :
        {
            legend : 'Prix' ,
            error  : 'Le prix doit être supérieur à 0.' ,
        } ,

        readOnly : { placeholder : 'Compteur en lecture seule' } ,
        disabled : { placeholder : 'Compteur désactivé' } ,
    } ,

    en :
    {
        title : 'Counting' ,

        age : { placeholder : 'Age' } ,

        yourAge :
        {
            legend : 'Your age' ,
            helper : 'You must be 18 or older.' ,
        } ,

        quantity : { legend : 'Quantity' } ,

        repeat :
        {
            legend : 'Quantity, holding − or + down' ,
            helper : 'repeat : held down, one step every 100 ms after 400 ms ; stops at 0 and at 500.' ,
        } ,

        price :
        {
            legend : 'Price' ,
            error  : 'The price must be greater than 0.' ,
        } ,

        readOnly : { placeholder : 'Read-only counter' } ,
        disabled : { placeholder : 'Disabled counter' } ,
    } ,
} ;

export default counter ;
