// const isArmDev = process.platform === 'win32' && process.arch === 'arm64';

/** @type {import('next').NextConfig} */
const nextConfig =
{
    allowedDevOrigins : [ '192.168.*.*' ] ,
    devIndicators     :
    {
        appIsrStatus  : false ,
        buildActivity : false ,
        position      : 'bottom-left' ,  // ou 'bottom-left', 'top-right', 'top-left'
    },
    reactCompiler : true ,
    images        :
    {
        // unoptimized    : isArmDev, // 👈 Next ne touche plus aux URLs distantes
        formats        : [ 'image/avif', 'image/webp' ],
        remotePatterns :
        [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol : 'https',
                hostname : 'i.pravatar.cc',
                port     : '',
                pathname : '**',
            },
        ],
    },
    // Generate a build ID based on the current time
    generateBuildId : async () => new Date().getTime().toString() ,

    // Redirections
    redirects : async  () =>
    [
        { source: '/' , destination : '/home' , permanent : true } ,
    ],

    // Customize Turbopack
    turbopack:
    {
        rules:
        {
            '*.md':
            {
                loaders : [ 'raw-loader' ] ,
                as      : '*.js' ,
            }
        },
    },
};

export default nextConfig;