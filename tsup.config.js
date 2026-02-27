import { defineConfig } from 'tsup' ;

export default defineConfig( {

    entry :
    [
        'src/components/**/*.{js,jsx}' ,
        'src/hooks/**/*.{js,jsx}' ,
        'src/utils/**/*.{js,jsx}' ,
        'src/themes/**/*.{js,jsx}' ,
        'src/contexts/**/*.{js,jsx}' ,
    ] ,

    format      : [ 'esm' ] ,
    jsx         : 'react-jsx' ,
    splitting   : false ,
    sourcemap   : true  ,
    clean       : true  ,
    dts         : false ,

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
        } ;
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