/**
 * The demonstration endpoints answer the lab's own pages : nothing in them is
 * worth a crawler's visit.
 */
export default function robots()
{
    return {
        rules :
        {
            userAgent : '*' ,
            allow     : '/' ,
            disallow  : '/api/' ,
        } ,
    } ;
}
