import getServerI18n from '@/helpers/i18n/getServerI18n' ;

export async function generateMetadata()
{
    const i18n = await getServerI18n() ;

    const { description , title } = i18n( 'app.lab.buttons' ) ;

    return { title , description } ;
}

const Layout = ( { children } ) => children ;

export default Layout ;