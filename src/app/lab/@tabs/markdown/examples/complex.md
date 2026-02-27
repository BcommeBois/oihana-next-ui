# Oihana Next UI - Documentation

## Introduction

Bienvenue dans notre documentation **Oihana Newt UI**.

### Caractéristiques principales

1. **Gestion des stocks** : Suivi en temps réel
2. **Facturation automatique** : Génération de devis
3. **Catalogue produits** : Plus de 100 références

## Code d'exemple

Voici comment utiliser notre API :

```javascript
import { OihanaAPI } from '@/api' ;

async function getProducts()
{
    const api = new OihanaAPI() ;
    const products = await api.fetchProducts() ;
    return products ;
}
```

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

---

Pour plus d'informations : \`contact@ooop.fr\`