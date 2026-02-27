import { Bitter } from 'next/font/google'

const bitter = Bitter
({
    subsets  : [ 'latin' ],
    weight   : [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ],
    variable : '--font-bitter',
    display  : 'swap',
});

export default bitter ;