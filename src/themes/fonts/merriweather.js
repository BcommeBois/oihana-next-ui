import { Merriweather } from 'next/font/google'

const merriweather = Merriweather
({
    subsets  : [ 'latin' ],
    weight   : [ '300', '400', '700', '900' ],
    variable : '--font-merriweather',
    display  : 'swap',
    preload  : false
});

export default merriweather ;