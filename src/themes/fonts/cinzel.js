import { Cinzel } from 'next/font/google'

const cinzel = Cinzel
({
    subsets  : [ 'latin' ],
    weight   : [ '400', '500', '600', '700', '800', '900' ],
    variable : '--font-cinzel',
    display  : 'swap',
});

export default cinzel ;