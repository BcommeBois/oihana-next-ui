/**
 * Markdown demo component.
 *
 * @module demo/MarkdownDemo
 */

import Markdown from '@/components/typography/Markdown' ;

const simpleMarkdown = `
# Titre principal

Ceci est un paragraphe avec du texte **en gras** et en *italique*.

## Sous-titre

Voici une liste à puces :
- Premier élément
- Deuxième élément
- Troisième élément

Et une liste numérotée :
1. Première étape
2. Deuxième étape
3. Troisième étape
` ;

const codeMarkdown = `
# Exemples de code

## JavaScript
\`\`\`javascript
const greeting = 'Hello World' ;
console.log( greeting ) ;

function add( a , b )
{
    return a + b ;
}
\`\`\`

## Python
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## HTML
\`\`\`html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
\`\`\`

Code inline : \`const x = 42 ;\`
` ;

const linksMarkdown = `
# Liens et images

## Liens externes
[Documentation React](https://react.dev)
[Documentation Next.js](https://nextjs.org)

## Liens internes
[Accueil](/)
[À propos](/about)

## Images
![Logo](https://picsum.photos/200/300)
` ;

const tableMarkdown = `
# Tableaux

| Nom | Âge | Ville |
|-----|-----|-------|
| Alice | 25 | Paris |
| Bob | 30 | Lyon |
| Charlie | 35 | Marseille |

| Produit | Prix | Stock |
|---------|------|-------|
| Bois de chêne | 45€ | ✓ |
| Bois de pin | 25€ | ✓ |
| Bois d'érable | 55€ | ✗ |
` ;

const blockquoteMarkdown = `
# Citations

> Ceci est une citation simple.

> **Citation avec mise en forme**
>
> Plusieurs lignes sont possibles.
> Et même des *styles* différents.

---

> ⚠️ **Avertissement**
>
> Ceci est un message d'avertissement important.
` ;

const complexMarkdown = `
# Document complet

## Introduction

Bienvenue dans notre documentation **Oihana Next UI**. Cette section présente les différentes fonctionnalités de notre bibliothèque opensource.

### Caractéristiques principales

1. **Gestion des stocks** : Suivi en temps réel
2. **Facturation automatique** : Génération de devis
3. **Catalogue produits** : Plus de 100 références

## Code d'exemple

Voici comment utiliser notre API :

\`\`\`javascript
import { OihanaAPI } from '@/api' ;

async function getProducts()
{
    const api = new OihanaAPI() ;
    const products = await api.fetchProducts() ;
    return products ;
}
\`\`\`

## Tableau des prix

| Catégorie | Prix/m³ | Délai |
|-----------|---------|-------|
| Chêne massif | 850€ | 2-3 jours |
| Pin traité | 450€ | 1-2 jours |
| Érable | 920€ | 3-5 jours |

> 💡 **Astuce** : Les prix peuvent varier selon les quantités commandées.

## Liens utiles

- [Documentation complète](https://docs.example.com)
- [Support technique](https://support.example.com)
- [Blog](https://blog.example.com)

---

Pour plus d'informations, contactez-nous à l'adresse : \`contact@domain.tdl\`
` ;

export default function MarkdownDemo()
{
    return (
        <>

            {/* Simple Markdown */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Simple</h2>
                    <Markdown>{ simpleMarkdown }</Markdown>
                </div>
            </div>

            {/* Code Highlighting */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Code avec coloration</h2>
                    <Markdown showCopyButton showLineNumbers>
                        { codeMarkdown }
                    </Markdown>
                </div>
            </div>

            {/* Links */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Liens et images</h2>
                    <Markdown linkColor="secondary">{ linksMarkdown }</Markdown>
                </div>
            </div>

            {/* Tables */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Tableaux</h2>
                    <Markdown>{ tableMarkdown }</Markdown>
                </div>
            </div>

            {/* Blockquotes */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Citations</h2>
                    <Markdown
                        blockquoteShowIcon
                        blockquoteClassName="border-l-primary"
                    >
                        { blockquoteMarkdown }
                    </Markdown>
                </div>
            </div>

            {/* Complex Document */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Document complet</h2>
                    <Markdown
                        showCopyButton
                        showLineNumbers
                        blockquoteShowIcon
                        linkColor="secondary"
                    >
                        { complexMarkdown }
                    </Markdown>
                </div>
            </div>

            {/* Without Copy Button */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Sans bouton copier</h2>
                    <Markdown showCopyButton={ false }>
                        { codeMarkdown }
                    </Markdown>
                </div>
            </div>

            {/* With Toast on Copy */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Avec toast au copier</h2>
                    <Markdown showToast toastDelay={ 3000 }>
                        { codeMarkdown }
                    </Markdown>
                </div>
            </div>

            {/* Custom Theme */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">Markdown - Thème personnalisé</h2>
                    <Markdown
                        codeClassName="bg-base-100"
                        className="prose-sm"
                    >
                        { codeMarkdown }
                    </Markdown>
                </div>
            </div>

        </>
    ) ;
}