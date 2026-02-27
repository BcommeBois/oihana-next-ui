import { Lato } from 'next/font/google'

const lato = Lato
({
    subsets  : [ 'latin' ],
    weight   : [ '100', '300', '400', '700', '900' ],
    variable : '--font-lato',
    display  : 'swap',
});

export default lato ;