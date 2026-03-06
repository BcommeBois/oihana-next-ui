import { Courier_Prime } from 'next/font/google'

const courierPrime = Courier_Prime
({
    subsets  : [ 'latin' ],
    weight   : [ '400', '700' ],
    variable : '--font-courier-prime',
    display  : 'swap',
    preload  : false
});
export default courierPrime ;
