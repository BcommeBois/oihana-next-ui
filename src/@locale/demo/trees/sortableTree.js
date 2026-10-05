const sortableTree =
{
    fr :
    {
        basic :
        {
            title : 'Arbre réordonnable (glisser verticalement pour réordonner, horizontalement pour indenter)' ,
            note  : "Glissez une ligne vers le haut ou le bas pour la réordonner parmi ses voisines, vers la gauche ou la droite pour changer sa profondeur : la position horizontale du pointeur projette le parent visé. Glisser un dossier déplace tout son sous-arbre (replié pendant le glissement), de sorte qu'un nœud ne peut jamais être déposé dans ses propres enfants." ,
        } ,

        controlled :
        {
            title : 'Arbre piloté (structure en direct)' ,
        } ,

        async :
        {
            title    : 'Changement asynchrone avec appel d’API (retour en arrière optimiste en cas d’échec)' ,
            simulate : 'Simuler un échec de l’API' ,
            comment  : '// onChange peut rendre une promesse : un rejet restaure l’arbre précédent' ,
        } ,

        maxDepth :
        {
            title : 'Profondeur maximale (maxDepth = 2) et indicateur de dépôt' ,
            note  : "L'imbrication est plafonnée à 2 niveaux : glisser une ligne plus profond la ramène à la limite. Le trait bleu est l'indicateur de dépôt — il montre le point d'insertion exact et, par son indentation, la profondeur où le nœud atterrira. Un dossier compte son propre sous-arbre dans la limite." ,
        } ,

        flat :
        {
            title : 'Liste plate (maxDepth = 0 — un seul niveau racine, aucune imbrication)' ,
            note  : "Avec maxDepth à 0, chaque nœud reste à la profondeur 0 : glisser une ligne latéralement ne l'indente jamais, et l'arbre se comporte comme une simple liste réordonnable — seul l'ordre vertical change. collapsible à false va avec, puisqu'il ne reste aucun sous-arbre à replier." ,
        } ,

        canNest :
        {
            title : 'Règle d’imbrication (canNest — seuls les dossiers acceptent des enfants)' ,
            note  : "Les fichiers se réordonnent mais ne reçoivent jamais d'enfants : glisser un nœud sous un fichier fait remonter le dépôt au niveau de ce fichier (son dossier parent). L'indicateur de dépôt passe au rouge quand aucun parent valide n'existe à cette position." ,
        } ,

        fold :
        {
            title       : 'Tout déplier / tout replier (repli piloté)' ,
            note        : "L'état replié est piloté par collapsed et onCollapsedChange, donc le parent peut le commander — ici deux boutons le mettent à tous les identifiants de dossier (tout replier) ou à une liste vide (tout déplier)." ,
            expandAll   : 'Tout déplier' ,
            collapseAll : 'Tout replier' ,
        } ,

        frozen :
        {
            title : 'Arbre gelé (disabled et collapsible à false)' ,
            note  : 'disabled coupe tout glissement et collapsible à false retire les chevrons en gardant chaque nœud déplié — un arbre en lecture seule, entièrement statique.' ,
        } ,

        dynamic :
        {
            title     : 'Ajouter et retirer des nœuds (insertion dans un sous-dossier)' ,
            note      : "L'arbre est une valeur imbriquée pilotée, donc ajouter et retirer sont de simples mises à jour d'état. Chaque dossier porte un bouton « + » qui insère un enfant dans SES enfants (visé par son identifiant) — le dossier se déplie tout seul pour le montrer ; chaque nœud porte une « × » pour le supprimer avec son sous-arbre. Le réordonnancement au glisser continue de fonctionner à côté." ,
            addFile   : 'Ajouter un fichier à la racine' ,
            addFolder : 'Ajouter un dossier à la racine' ,
            insert    : '// insérer dans un sous-dossier (par identifiant) — ou null pour la racine' ,
            remove    : '// retirer un nœud et son sous-arbre' ,
        } ,

        reference :
        {
            title       : 'Référence des props' ,
            prop        : 'Prop' ,
            type        : 'Type' ,
            description : 'Description' ,
        } ,

        props :
        {
            canNest           : '(élément glissé, parent | null) => booléen — null = niveau racine ; un parent refusé fait remonter le dépôt jusqu’au plus proche ancêtre valide (indicateur rouge s’il n’y en a aucun)' ,
            collapsed         : 'Liste pilotée des identifiants de nœuds repliés ; à associer à onCollapsedChange' ,
            collapsible       : 'Autorise le dépliage et le repli (true par défaut) ; à false, les chevrons disparaissent et chaque nœud reste déplié' ,
            defaultCollapsed  : 'Identifiants des nœuds repliés au départ (repli non piloté)' ,
            defaultItems      : 'Arbre initial non piloté (le composant le possède et le met à jour)' ,
            disabled          : 'Coupe le glissement sur chaque nœud (false par défaut) ; l’arbre peut toujours être déplié et replié' ,
            getItemId         : '(élément) => chaîne | nombre — accès à l’identifiant unique (item.id par défaut)' ,
            handle            : 'Affiche une poignée de glissement sur chaque ligne (true par défaut) ; à false, toute la ligne devient glissable' ,
            indent            : 'Largeur d’indentation par niveau, en pixels (24 par défaut)' ,
            items             : 'Arbre imbriqué piloté ; à associer à onChange' ,
            maxDepth          : 'Profondeur maximale d’imbrication ; un dossier glissé compte la hauteur de son propre sous-arbre dedans' ,
            onChange          : '(arbre, changement) => void | Promesse — une promesse rejetée restaure l’arbre (non piloté)' ,
            onCollapsedChange : '(identifiants repliés) => void — appelé avec les nouveaux identifiants à chaque bascule' ,
            renderNode        : '(élément, état) => un élément SortableTreeItem (obligatoire)' ,
        } ,
    } ,
    en :
    {
        basic :
        {
            title : 'Sortable tree (drag vertically to reorder, horizontally to indent)' ,
            note  : 'Drag a row up or down to reorder it among its siblings, and left or right to change its depth : the horizontal position of the pointer projects the target parent. Dragging a folder moves its whole subtree (collapsed during the drag), so a node can never be dropped into its own children.' ,
        } ,

        controlled :
        {
            title : 'Controlled tree (live structure)' ,
        } ,

        async :
        {
            title    : 'Asynchronous change with an API call (optimistic revert on failure)' ,
            simulate : 'Simulate an API failure' ,
            comment  : '// onChange may return a promise : a rejection restores the previous tree' ,
        } ,

        maxDepth :
        {
            title : 'Maximum depth (maxDepth = 2) and the drop indicator' ,
            note  : 'Nesting is capped at 2 levels : dragging a row deeper snaps it back to the limit. The blue line is the drop indicator — it shows the exact insertion point and, by its indentation, the depth the node will land at. A folder counts its own subtree against the limit.' ,
        } ,

        flat :
        {
            title : 'Flat list (maxDepth = 0 — a single root level, no nesting)' ,
            note  : 'With maxDepth at 0, every node stays at depth 0 : dragging a row sideways never indents it, so the tree behaves as a plain sortable list — only the vertical order changes. collapsible at false goes with it, since there is no subtree left to fold.' ,
        } ,

        canNest :
        {
            title : 'Nesting rule (canNest — only folders accept children)' ,
            note  : "Files can be reordered but never receive children : dragging a node under a file walks the drop up to that file's own level (its parent folder). The drop indicator turns red when no valid parent exists at a position." ,
        } ,

        fold :
        {
            title       : 'Expand all / collapse all (controlled collapse)' ,
            note        : 'The collapsed state is driven by collapsed and onCollapsedChange, so the parent can command it — here two buttons set it to every folder id (collapse all) or to an empty list (expand all).' ,
            expandAll   : 'Expand all' ,
            collapseAll : 'Collapse all' ,
        } ,

        frozen :
        {
            title : 'Frozen tree (disabled and collapsible at false)' ,
            note  : 'disabled stops all dragging and collapsible at false removes the chevrons and keeps every node expanded — a read-only, fully static tree.' ,
        } ,

        dynamic :
        {
            title     : 'Adding and removing nodes (inserting into a subfolder)' ,
            note      : "The tree is a controlled nested value, so adding and removing are plain state updates. Each folder carries a « + » button that inserts a child into ITS children (targeted by its id) — the folder expands on its own to reveal it ; every node carries a « × » to delete it with its subtree. Reordering by drag keeps working alongside." ,
            addFile   : 'Add a file at the root' ,
            addFolder : 'Add a folder at the root' ,
            insert    : '// insert into a subfolder (by id) — or null for the root' ,
            remove    : '// remove a node and its subtree' ,
        } ,

        reference :
        {
            title       : 'Props reference' ,
            prop        : 'Prop' ,
            type        : 'Type' ,
            description : 'Description' ,
        } ,

        props :
        {
            canNest           : '(dragged item, parent | null) => boolean — null = top level ; a rejected parent makes the drop walk up to the nearest valid ancestor (red indicator if there is none)' ,
            collapsed         : 'Controlled list of collapsed node ids ; pair it with onCollapsedChange' ,
            collapsible       : 'Allows expanding and collapsing (true by default) ; at false the chevrons go and every node stays expanded' ,
            defaultCollapsed  : 'Ids of the nodes collapsed initially (uncontrolled collapse)' ,
            defaultItems      : 'Uncontrolled initial tree (the component owns it and updates it)' ,
            disabled          : 'Stops dragging on every node (false by default) ; the tree can still be expanded and collapsed' ,
            getItemId         : '(item) => string | number — unique id accessor (item.id by default)' ,
            handle            : 'Shows a drag handle on each row (true by default) ; at false the whole row becomes draggable' ,
            indent            : 'Indentation width per depth level, in pixels (24 by default)' ,
            items             : 'Controlled nested tree ; pair it with onChange' ,
            maxDepth          : 'Maximum nesting depth ; a dragged folder counts its own subtree height against it' ,
            onChange          : '(tree, change) => void | Promise — a rejected promise reverts the tree (uncontrolled)' ,
            onCollapsedChange : '(collapsed ids) => void — called with the new collapsed ids on each toggle' ,
            renderNode        : '(item, state) => a SortableTreeItem element (required)' ,
        } ,
    } ,
} ;

export default sortableTree ;
