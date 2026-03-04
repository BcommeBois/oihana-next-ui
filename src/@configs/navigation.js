'use client'

import { COLLAPSE , LINK /* , DIVIDER */ } from '@/contexts/navigation/types'

import {
    MdOutlineSmartButton as ButtonIcon ,
    MdDashboard          as DashboardIcon ,
    MdDisplaySettings    as DisplayIcon ,
    MdDynamicForm        as FormIcon ,
    MdFeedback           as FeedbackIcon ,
    MdScience            as BetaIcon ,
    MdTexture            as PatternsIcon ,
    MdTextSnippet        as TypographyIcon ,
} from 'react-icons/md' ;

import { LuSquareMousePointer   as ActionIcon         } from "react-icons/lu";
import { RxAvatar               as AvatarIcon         } from "react-icons/rx";
import { LuBadgeAlert           as BadgeIcon          } from "react-icons/lu";
import { RiCheckboxFill         as CheckBoxIcon       } from "react-icons/ri";
import { LuListCollapse         as CollapseIcon       } from "react-icons/lu";
import { CiGrid31               as FlexIcon           } from "react-icons/ci";
import { IoMdGrid               as GridIcon           } from "react-icons/io";
import { SiDialogflow           as ModalIcon          } from "react-icons/si";
import { SlPicture              as ImageIcon          } from "react-icons/sl";
import { RiInputField           as InputIcon          } from "react-icons/ri" ;
import { LuLayoutDashboard      as LayoutIcon         } from "react-icons/lu";
import { CiBoxList              as ListIcon           } from "react-icons/ci";
import { RiProgress7Line        as LoadingIcon        } from "react-icons/ri";
import { BsFillMarkdownFill     as MarkdownIcon       } from 'react-icons/bs' ;
import { GiDominoMask           as MaskIcon           } from "react-icons/gi";
import { RiLayoutMasonryFill    as MasonryIcon        } from "react-icons/ri";
import { TfiLayoutMenuSeparated as MenuIcon           } from "react-icons/tfi" ;
import { MdAnimation            as MotionIcon         } from "react-icons/md";
import { BiFoodMenu             as NavigationIcon     } from "react-icons/bi";
import { MdOutlineNetworkWifi   as NetworkIcon        } from "react-icons/md";
import { TfiLayoutMenu          as PaginationIcon     } from "react-icons/tfi";
import { FaBarsProgress         as ProgressIcon       } from "react-icons/fa6";
import { RiProgress5Line        as RadialProgressIcon } from "react-icons/ri";
import { IoMdRadioButtonOn      as RadioIcon          } from "react-icons/io";
import { LuSlidersHorizontal    as RangeIcon          } from "react-icons/lu";
import { MdOutlineStarRate      as RatingIcon         } from "react-icons/md";
import { VscListSelection       as SelectIcon         } from "react-icons/vsc" ;
import { FaSpinner              as SpinnerIcon        } from "react-icons/fa";
import { GrStatusPlaceholder    as StatusIcon         } from "react-icons/gr";
import { BsTextareaResize       as TextAreaIcon       } from "react-icons/bs" ;
import { TiMessages             as ToastIcon          } from "react-icons/ti" ;
import { FaToggleOn             as ToggleIcon         } from "react-icons/fa";


const navigation =
[
    { id : 'home' , type  : LINK  , Icon  : DashboardIcon , path  : '/home' } ,
    {
        id        : 'lab' ,
        type      : COLLAPSE ,
        Icon      : BetaIcon ,
        className : 'gap-1' ,
        items     :
        [
            {
                id   : 'actions'   ,
                type : COLLAPSE    ,
                Icon : ActionIcon ,
                items :
                [
                    { id : 'buttons' , type : LINK  , Icon : ButtonIcon , path  : '/lab/buttons' } ,
                    { id : 'modals'  , type : LINK  , Icon : ModalIcon  , path  : '/lab/modals'  } ,
                ]
            } ,
            {
                id   : 'layouts'   ,
                type : COLLAPSE    ,
                Icon : LayoutIcon ,
                items :
                [
                    { id : 'flex'     , type : LINK  , Icon : FlexIcon     , path  : '/lab/flex'     } ,
                    { id : 'grid'     , type : LINK  , Icon : GridIcon     , path  : '/lab/grid'     } ,
                    { id : 'masonry'  , type : LINK  , Icon : MasonryIcon  , path  : '/lab/masonry'  } ,
                    { id : 'layout'   , type : LINK  , Icon : LayoutIcon   , path  : '/lab/layout'   } ,
                    { id : 'collapse' , type : LINK  , Icon : CollapseIcon , path  : '/lab/collapse' } ,
                    { id : 'patterns' , type : LINK  , Icon : PatternsIcon , path  : '/lab/patterns' } ,
                ]
            } ,
            {
                id   : 'display'   ,
                type : COLLAPSE    ,
                Icon : DisplayIcon ,
                items :
                [
                    { id : 'avatars'    , type : LINK  , Icon : AvatarIcon     , path  : '/lab/avatars'    } ,
                    { id : 'badges'     , type : LINK  , Icon : BadgeIcon      , path  : '/lab/badges'     } ,
                    { id : 'images'     , type : LINK  , Icon : ImageIcon      , path  : '/lab/images'     } ,
                    { id : 'lists'      , type : LINK  , Icon : ListIcon       , path  : '/lab/lists'      } ,
                    { id : 'masks'      , type : LINK  , Icon : MaskIcon       , path  : '/lab/masks'      } ,
                    { id : 'markdown'   , type : LINK  , Icon : MarkdownIcon   , path  : '/lab/markdown'   } ,
                    { id : 'typography' , type : LINK  , Icon : TypographyIcon , path  : '/lab/typography' } ,
                    { id : 'motion'     , type : LINK  , Icon : MotionIcon     , path  : '/lab/motion'     } ,
                    { id : 'network'    , type : LINK  , Icon : NetworkIcon    , path  : '/lab/network'    } ,
                    { id : 'status'     , type : LINK  , Icon : StatusIcon     , path  : '/lab/status'     } ,
                ]
            } ,
            {
                id   : 'navigation'   ,
                type : COLLAPSE       ,
                Icon : NavigationIcon ,
                items :
                [
                    { id : 'pagination' , type : LINK  , Icon : PaginationIcon , path  : '/lab/pagination' } ,
                    { id : 'menus'      , type : LINK  , Icon : MenuIcon       , path  : '/lab/menus'      } ,
                ]
            } ,
            {
                id   : 'feedback'   ,
                type : COLLAPSE    ,
                Icon : FeedbackIcon ,
                items :
                [
                    { id : 'loading'        , type : LINK  , Icon : LoadingIcon        , path  : '/lab/loading'        } ,
                    { id : 'progress'       , type : LINK  , Icon : ProgressIcon       , path  : '/lab/progress'       } ,
                    { id : 'radialProgress' , type : LINK  , Icon : RadialProgressIcon , path  : '/lab/radialProgress' } ,
                    { id : 'spinners'       , type : LINK  , Icon : SpinnerIcon        , path  : '/lab/spinners'       } ,
                    { id : 'toasts'         , type : LINK  , Icon : ToastIcon          , path  : '/lab/toasts'         } ,
                ]
            } ,
            {
                id   : 'form'   ,
                type : COLLAPSE    ,
                Icon : FormIcon ,
                items :
                [
                    { id : 'checkboxes' , type : LINK  , Icon : CheckBoxIcon  , path  : '/lab/checkboxes' } ,
                    { id : 'inputs'     , type : LINK  , Icon : InputIcon     , path  : '/lab/inputs'     } ,
                    { id : 'radios'     , type : LINK  , Icon : RadioIcon     , path  : '/lab/radios'     } ,
                    { id : 'ranges'     , type : LINK  , Icon : RangeIcon     , path  : '/lab/ranges'     } ,
                    { id : 'rating'     , type : LINK  , Icon : RatingIcon    , path  : '/lab/rating'     } ,
                    { id : 'selects'    , type : LINK  , Icon : SelectIcon    , path  : '/lab/selects'    } ,
                    { id : 'textareas'  , type : LINK  , Icon : TextAreaIcon  , path  : '/lab/textareas'  } ,
                    { id : 'toggles'    , type : LINK  , Icon : ToggleIcon    , path  : '/lab/toggles'    } ,
                ]
            } ,
        ]
    },
]

export default navigation ;