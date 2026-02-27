const html =
{
    sanitizeAll :
    {
        allowedTags       : [],
        allowedAttributes : {}
    },
    sanitizeOptions :
    {
        allowedTags :
        [
            //'del', 'ins' ,
            'h1' , 'h2' , 'h3', 'h4', 'h5', 'h6', 'p' , 'blockquote' ,
            'strong', 'i', 'em',  'a' , 'u' , 's' , 'sup' , 'sub' , 'li', 'ul' , 'ol' ,
            'code' , 'pre' ,
        ],
        allowedAttributes :
        {
            '*'   : [ 'style' ] ,
            'a'   : [ 'name' , 'href' , 'target' ] ,
            'img' : [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ] ,
        },
        allowedSchemes : [ 'http' , 'https' , 'mailto' , 'tel' ] ,
        allowedStyles :
        {
            '*' :
            {
                'color'       : [ /^#(0x)?[0-9a-f]+$/i , /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/ ],
                'text-align'  : [  /^left$/, /^right$/, /^center$/ , /^justify$/ , /^end/ , /^start$/ ],
                'font-size'   : [ /^\d+(?:px|em|%)$/ ] ,
                'text-indent' : [ /^\d+(?:px|em|%)$/ ] ,
            }
        },
        nonTextTags : [ 'style', 'script', 'textarea', 'noscript' ] ,
        parser :
        {
            lowerCaseTags: true
        }
    }
}

export default html ;