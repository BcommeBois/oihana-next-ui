import 'flag-icons/css/flag-icons.min.css'

import cn from '../../themes/helpers/cn'

/**
 * Affiche un drapeau de pays via flag icons
 * @param {object} props
 * @param {string} props.lang - Code langue ISO 639-1 ('fr', 'en', 'de')
 * @param {boolean} [props.squared=false] - Affichage carré (1:1) au lieu de 4:3
 */
const Flag = ({ lang, squared = false }) =>
{
    const code      = lang === 'en' ? 'gb' : lang ;
    const className = cn('fi' , `fi-${code}` , { fis: squared } ) ;
    return <span className={className} role="img" aria-label={lang} /> ;
}

export default Flag