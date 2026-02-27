import { Montserrat } from 'next/font/google'

const montserrat = Montserrat
({
    subsets  : ['latin'],
    weight   : ['300', '400', '500','600','700'],
    variable : '--font-montserrat',
    display  : 'swap',
});

export default montserrat ;
