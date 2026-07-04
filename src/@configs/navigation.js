'use client'

import { COLLAPSE , LINK /* , DIVIDER */ } from '../contexts/navigation/types'

import {
    MdOutlineSmartButton as ButtonIcon ,
    MdColorLens          as ColorIcon ,
    MdCalendarMonth      as DatesIcon ,
    MdDashboard          as DashboardIcon ,
    MdDisplaySettings    as DisplayIcon ,
    MdDynamicForm        as FormIcon ,
    MdFeedback           as FeedbackIcon ,
    MdScience            as LabIcon ,
    MdTexture            as PatternsIcon ,
    MdTextSnippet        as TypographyIcon ,
    MdAccessTime         as TimesIcon ,
} from 'react-icons/md' ;

import { LuSquareMousePointer   as ActionIcon         } from "react-icons/lu";
import { LuCirclePlus           as FabIcon            } from "react-icons/lu";
import { RxAvatar               as AvatarIcon         } from "react-icons/rx";
import { LuBadgeAlert           as BadgeIcon          } from "react-icons/lu";
import { RiCheckboxFill         as CheckBoxIcon       } from "react-icons/ri";
import { LuListCollapse         as CollapseIcon       } from "react-icons/lu";
import { LuRows3                as AccordionIcon      } from "react-icons/lu";
import { LuSparkles             as EffectIcon         } from "react-icons/lu";
import { CiGrid31               as FlexIcon           } from "react-icons/ci";
import { IoMdGrid               as GridIcon           } from "react-icons/io";
import { FaPager                as HeaderIcon         } from "react-icons/fa6";
import { SlPicture              as ImageIcon          } from "react-icons/sl";
import { RiInputField           as InputIcon          } from "react-icons/ri" ;
import { TbInfinity             as InfiniteScrollIcon } from "react-icons/tb";
import { LuLayoutDashboard      as LayoutIcon         } from "react-icons/lu";
import { TbLayoutKanban         as KanbanIcon         } from "react-icons/tb";
import { CiBoxList              as ListIcon           } from "react-icons/ci";
import { RiProgress7Line        as LoadingIcon        } from "react-icons/ri";
import { BsFillMarkdownFill     as MarkdownIcon       } from 'react-icons/bs' ;
import { GiDominoMask           as MaskIcon           } from "react-icons/gi";
import { RiLayoutMasonryFill    as MasonryIcon        } from "react-icons/ri";
import { TbSlashes             as BreadcrumbsIcon    } from "react-icons/tb";
import { TbLayoutBottombar     as DockIcon           } from "react-icons/tb";
import { TfiLayoutMenuSeparated as MenuIcon           } from "react-icons/tfi" ;
import { LuLayoutPanelTop       as MegamenuIcon       } from "react-icons/lu";
import { SiDialogflow           as ModalIcon          } from "react-icons/si";
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
import { LuRectangleHorizontal  as SkeletonIcon       } from "react-icons/lu";
import { FaSpinner              as SpinnerIcon        } from "react-icons/fa";
import { GrStatusPlaceholder    as StatusIcon         } from "react-icons/gr";
import { BsTextareaResize       as TextAreaIcon       } from "react-icons/bs" ;
import { TiMessages             as ToastIcon          } from "react-icons/ti" ;
import { LuMessageSquareText    as TooltipIcon        } from "react-icons/lu";
import { FaToggleOn             as ToggleIcon         } from "react-icons/fa";

const navigation =
[
    { id : 'home' , type  : LINK  , Icon  : DashboardIcon , path  : '/home' } ,
    {
        id        : 'lab' ,
        type      : COLLAPSE ,
        Icon      : LabIcon ,
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
                    { id : 'fab'     , type : LINK  , Icon : FabIcon    , path  : '/lab/fab'     } ,
                    { id : 'modals'  , type : LINK  , Icon : ModalIcon  , path  : '/lab/modals'  } ,
                ]
            } ,
            {
                id   : 'layouts'   ,
                type : COLLAPSE    ,
                Icon : LayoutIcon ,
                items :
                [
                    { id : 'flex'           , type : LINK  , Icon : FlexIcon           , path  : '/lab/flex'           } ,
                    { id : 'grid'           , type : LINK  , Icon : GridIcon           , path  : '/lab/grid'           } ,
                    { id : 'masonry'        , type : LINK  , Icon : MasonryIcon        , path  : '/lab/masonry'        } ,
                    { id : 'infiniteScroll' , type : LINK  , Icon : InfiniteScrollIcon , path  : '/lab/infiniteScroll' } ,
                    { id : 'layout'         , type : LINK  , Icon : LayoutIcon         , path  : '/lab/layout'         } ,
                    { id : 'collapse'       , type : LINK  , Icon : CollapseIcon       , path  : '/lab/collapse'       } ,
                    { id : 'accordion'      , type : LINK  , Icon : AccordionIcon      , path  : '/lab/accordion'      } ,
                    { id : 'patterns'       , type : LINK  , Icon : PatternsIcon       , path  : '/lab/patterns'       } ,
                ]
            } ,
            {
                id   : 'kanban'   ,
                type : COLLAPSE   ,
                Icon : KanbanIcon ,
                items :
                [
                    { id : 'kanbanBoard' , type : LINK  , Icon : KanbanIcon , path  : '/lab/kanban' } ,
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
                    { id : 'effects'    , type : LINK  , Icon : EffectIcon     , path  : '/lab/effects'    } ,
                    { id : 'images'     , type : LINK  , Icon : ImageIcon      , path  : '/lab/images'     } ,
                    { id : 'lists'      , type : LINK  , Icon : ListIcon       , path  : '/lab/lists'      } ,
                    { id : 'masks'      , type : LINK  , Icon : MaskIcon       , path  : '/lab/masks'      } ,
                    { id : 'markdown'   , type : LINK  , Icon : MarkdownIcon   , path  : '/lab/markdown'   } ,
                    { id : 'typography' , type : LINK  , Icon : TypographyIcon , path  : '/lab/typography' } ,
                    { id : 'motion'     , type : LINK  , Icon : MotionIcon     , path  : '/lab/motion'     } ,
                    { id : 'headers'    , type : LINK  , Icon : HeaderIcon     , path  : '/lab/headers'    } ,
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
                    { id : 'breadcrumbs' , type : LINK  , Icon : BreadcrumbsIcon , path  : '/lab/breadcrumbs' } ,
                    { id : 'dock'        , type : LINK  , Icon : DockIcon        , path  : '/lab/dock'        } ,
                    { id : 'pagination'  , type : LINK  , Icon : PaginationIcon  , path  : '/lab/pagination'  } ,
                    { id : 'menus'       , type : LINK  , Icon : MenuIcon        , path  : '/lab/menus'       } ,
                    { id : 'megamenu'    , type : LINK  , Icon : MegamenuIcon    , path  : '/lab/megamenu'    } ,
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
                    { id : 'skeleton'       , type : LINK  , Icon : SkeletonIcon       , path  : '/lab/skeleton'       } ,
                    { id : 'spinners'       , type : LINK  , Icon : SpinnerIcon        , path  : '/lab/spinners'       } ,
                    { id : 'toasts'         , type : LINK  , Icon : ToastIcon          , path  : '/lab/toasts'         } ,
                    { id : 'tooltips'       , type : LINK  , Icon : TooltipIcon        , path  : '/lab/tooltips'       } ,
                ]
            } ,
            {
                id   : 'form'   ,
                type : COLLAPSE    ,
                Icon : FormIcon ,
                items :
                [
                    { id : 'checkboxes' , type : LINK  , Icon : CheckBoxIcon  , path  : '/lab/checkboxes' } ,
                    { id : 'colors'     , type : LINK  , Icon : ColorIcon     , path  : '/lab/colors'     } ,
                    { id : 'dates'      , type : LINK  , Icon : DatesIcon     , path  : '/lab/dates'      } ,
                    { id : 'times'      , type : LINK  , Icon : TimesIcon     , path  : '/lab/times'      } ,
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