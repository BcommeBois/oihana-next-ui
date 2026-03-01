import config from '@/@configs';

const { dark , light } = config ;

// TODO use a function
const script = ` 
(function() 
{
    const storageKey = 'theme';
    const light      = '${light}';
    const dark       = '${dark}';
    
    const stored = localStorage.getItem( storageKey ) ;
    let isDark ;
    
    if (stored !== null) 
    {
        isDark = JSON.parse(stored) ;
    }
    else
    {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches ;
    }
    
    document.documentElement.setAttribute('data-theme', isDark ? dark : light) ;
    document.documentElement.setAttribute('data-dark', isDark ? 'true' : 'false') ;
})();
`;

export default script ;