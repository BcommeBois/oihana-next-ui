const crud =
{
    fr :
    {
        title       : 'Les trois hooks CRUD' ,
        description : 'useAddModal, useEditModal, useRemoveModal' ,

        add    : 'Ajouter' ,
        edit   : 'Modifier' ,
        remove : 'Supprimer' ,
        empty  : 'Aucune fiche pour l’instant. Cliquez sur « Ajouter » pour commencer.' ,

        stats :
        {
            total      : 'Fiches' ,
            developers : 'Développeurs' ,
            designers  : 'Designers' ,
        } ,

        columns :
        {
            name    : 'Nom' ,
            email   : 'Courriel' ,
            phone   : 'Téléphone' ,
            role    : 'Rôle' ,
            actions : 'Actions' ,
        } ,

        fields :
        {
            name            : 'Nom' ,
            namePlaceholder : 'Saisissez le nom complet' ,
            nameRequired    : 'Le nom est obligatoire' ,
            email           : 'Courriel' ,
            emailRequired   : 'Le courriel est obligatoire' ,
            phone           : 'Téléphone' ,
            role            : 'Rôle' ,
        } ,

        addModal :
        {
            title : 'Ajouter une fiche' ,
            agree : 'Ajouter' ,
        } ,

        editModal :
        {
            title : 'Modifier la fiche' ,
            agree : 'Enregistrer' ,
            dirty : 'Vous avez des modifications non enregistrées' ,
        } ,

        removeModal :
        {
            title    : 'Supprimer la fiche' ,
            agree    : 'Supprimer' ,
            question : 'Voulez-vous vraiment supprimer {0} ?' ,
            warning  : 'Cette action est irréversible.' ,
        } ,
    } ,
    en :
    {
        title       : 'The three CRUD hooks' ,
        description : 'useAddModal, useEditModal, useRemoveModal' ,

        add    : 'Add' ,
        edit   : 'Edit' ,
        remove : 'Delete' ,
        empty  : 'No record yet. Click « Add » to get started.' ,

        stats :
        {
            total      : 'Records' ,
            developers : 'Developers' ,
            designers  : 'Designers' ,
        } ,

        columns :
        {
            name    : 'Name' ,
            email   : 'Email' ,
            phone   : 'Phone' ,
            role    : 'Role' ,
            actions : 'Actions' ,
        } ,

        fields :
        {
            name            : 'Name' ,
            namePlaceholder : 'Enter the full name' ,
            nameRequired    : 'The name is required' ,
            email           : 'Email' ,
            emailRequired   : 'The email is required' ,
            phone           : 'Phone' ,
            role            : 'Role' ,
        } ,

        addModal :
        {
            title : 'Add a record' ,
            agree : 'Add' ,
        } ,

        editModal :
        {
            title : 'Edit the record' ,
            agree : 'Save changes' ,
            dirty : 'You have unsaved changes' ,
        } ,

        removeModal :
        {
            title    : 'Delete the record' ,
            agree    : 'Delete' ,
            question : 'Are you sure you want to delete {0}?' ,
            warning  : 'This action cannot be undone.' ,
        } ,
    } ,
} ;

export default crud ;
