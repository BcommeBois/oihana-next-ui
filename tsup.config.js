import { defineConfig } from 'tsup' ;

export default defineConfig( {

    entry :
    [
        'src/components/**/*.{js,jsx,css}' ,
        'src/contexts/**/*.{js,jsx}' ,
        'src/helpers/**/*.{js,jsx}' ,
        'src/hooks/**/*.{js,jsx}' ,
        'src/motions/**/*.{js,jsx}' ,
        'src/themes/**/*.{js,jsx,css,mjs}'
    ] ,

    clean        : true  ,
    dts          : false ,
    format       : [ 'esm' ] ,
    jsx          : 'react-jsx' ,
    outExtension : () => ({ js: '.js' }) ,
    splitting    : false ,
    sourcemap    : true  ,

    esbuildOptions( options )
    {
        // Résout @/ → src/ au moment de la compilation
        options.alias =
        {
            '@' : new URL( './src' , import.meta.url ).pathname ,
        } ;

        options.loader =
        {
            '.js'  : 'jsx' ,
            '.jsx' : 'jsx' ,
            '.mjs' : 'js' ,
        } ;

        options.jsx = 'automatic' ;
    } ,

    external :
    [
        'react' ,
        'react-dom' ,
        'next' ,
        'next/image' ,
        'next/link' ,
        'next/navigation' ,
    ] ,

}) ;