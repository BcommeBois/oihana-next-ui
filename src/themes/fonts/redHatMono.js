import { Red_Hat_Mono } from 'next/font/google'

const redHatMono = Red_Hat_Mono
({
    subsets  : [ 'latin' ],
    weight   : [ '300', '400', '500','600','700' ],
    variable : '--font-red-hat-mono',
    display  : 'swap',
    preload  : false ,

});
export default redHatMono ;
