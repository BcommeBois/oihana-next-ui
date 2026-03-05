import { defineConfig } from 'tsup';

export default defineConfig
({

    entry :
    [
        'src/components/**/*.{js,jsx}',
        'src/contexts/**/*.{js,jsx}',
        'src/display/**/*.{js,jsx}',
        'src/helpers/**/*.{js,jsx}',
        'src/hooks/**/*.{js,jsx}',
        'src/motions/**/*.{js,jsx}',
        'src/themes/**/*.{js,jsx,mjs}',
    ] ,

    clean        : true  ,
    dts          : false ,
    format       : ['esm'] ,
    jsx          : 'automatic' ,
    outDir       : 'dist' ,
    outExtension : () => ({ js: '.js' }),
    splitting    : false,
    sourcemap    : true ,
    target       : 'esnext',
    external:
    [
        'react',
        'react-dom',
        'next',
        'next/*',
        '@maskito/react',
        'react-icons',
  ],
  esbuildOptions(options) {
    options.loader = {
      '.js': 'jsx',
      '.jsx': 'jsx',
      '.mjs': 'js',
    };
  },
});
