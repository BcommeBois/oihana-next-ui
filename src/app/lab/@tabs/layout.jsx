'use client'

import useApplication from '@/contexts/application'

const Layout = ( { children } ) =>
{
    const { rootClassName , rootStyle } = useApplication() ;
    return (
        <div className={ rootClassName } style={ rootStyle }>
            { children }
        </div>
    );
}

export default Layout;