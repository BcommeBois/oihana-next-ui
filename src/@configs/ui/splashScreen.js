import version from '@/version';

const splashScreen =
{
    className       : 'pattern-lines-diagonal-right text-base-content/20! *:text-base-content!' ,
    footer          : process.env.NEXT_PUBLIC_APP_AUTHOR ,
    footerClassName : 'font-mono text-sm font-medium',
    header          : process.env.NEXT_PUBLIC_APP_SHORT_TITLE + ' - ' + version ,
    headerClassName : 'font-mono text-sm font-medium',
    loaderClassName : 'loading-ring loading-lg' ,
    logo            : process.env.NEXT_PUBLIC_LOGO_SPLASH_SCREEN ,
    showFooter      : true ,
    showHeader      : true ,
    showLoader      : true ,
    showLogo        : true ,
}

export default splashScreen ;