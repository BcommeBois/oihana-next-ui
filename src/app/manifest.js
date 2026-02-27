export default function manifest()
{
    return {
        name             : "Oihana Next UI" ,
        short_name       : "Oihana Next UI" ,
        description      : "Oihana Next.js UI component library — reusable components, hooks and utilities built with React 19, Next.js, Tailwind CSS and DaisyUI" ,
        background_color : "#ffffff"    ,
        theme_color      : "#0E172A"    ,
        display          : "standalone" ,
        orientation      : "natural"    ,
        scope            : "/"          ,
        start_url        : "/"          ,
        icons :
        [
            { src : "/assets/icons/android/android-launchericon-48-48.png"   , sizes : "48x48"   , type : "image/png" } ,
            { src : "/assets/icons/android/android-launchericon-72-72.png"   , sizes : "72x72"   , type : "image/png" } ,
            { src : "/assets/icons/android/android-launchericon-96-96.png"   , sizes : "96x96"   , type : "image/png" } ,
            { src : "/assets/icons/android/android-launchericon-144-144.png" , sizes : "144x144" , type : "image/png" } ,
            { src : "/assets/icons/android/android-launchericon-192-192.png" , sizes : "192x192" , type : "image/png" } ,
            { src : "/assets/icons/android/android-launchericon-512-512.png" , sizes : "512x512" , type : "image/png" } ,
        ] ,
    } ;
}