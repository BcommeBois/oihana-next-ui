import { Nunito } from 'next/font/google'

const nunito = Nunito
({
    subsets  : [ 'latin' ],
    weight   : [ '200' , '300' , '400' , '500' ,'600' ,'700' ,'800' ,'900' ],
    variable : '--font-nunito',
    display  : 'swap',
});

export default nunito ;
