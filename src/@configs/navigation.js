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
    MdExtension          as ModulesIcon ,
    MdWidgets            as ComponentsIcon ,
    MdTexture            as PatternsIcon ,
    MdTextSnippet        as TypographyIcon ,
    MdAccessTime         as TimesIcon ,
} from 'react-icons/md' ;

import { LuSquareMousePointer   as ActionIcon         } from "react-icons/lu";
import { LuListChecks          as AssignmentIcon     } from "react-icons/lu";
import { TbAlertSquareRounded   as AlertIcon          } from "react-icons/tb";
import { TbMap2                 as MapIcon            } from "react-icons/tb";
import { TbQrcode               as BarcodeIcon        } from "react-icons/tb";
import { TbScan                 as ScannerIcon        } from "react-icons/tb";
import { TbForms                as ScanFieldIcon      } from "react-icons/tb";
import { TbMapPin               as MapMarkerIcon      } from "react-icons/tb";
import { TbMapPinCog            as PickerIcon         } from "react-icons/tb";
import { TbRoute                as RouteIcon          } from "react-icons/tb";
import { TbPolygon              as ZoneIcon           } from "react-icons/tb";
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
import { MdPermMedia            as MediaIcon          } from "react-icons/md" ;
import { MdAttachFile           as FileInputIcon      } from "react-icons/md" ;
import { MdCloudUpload          as DropzoneIcon       } from "react-icons/md" ;
import { MdAddAPhoto            as PhotoIcon          } from "react-icons/md" ;
import { TbInfinity             as InfiniteScrollIcon } from "react-icons/tb";
import { LuLayoutDashboard      as LayoutIcon         } from "react-icons/lu";
import { TbLayoutKanban         as KanbanIcon         } from "react-icons/tb";
import { TbCalendarEvent        as SchedulerIcon      } from "react-icons/tb";
import { TbListDetails          as AgendaIcon         } from "react-icons/tb";
import { TbBraces               as SchemaIcon         } from "react-icons/tb";
import { TbCalendarWeek         as WeekIcon           } from "react-icons/tb";
import { TbChartGridDots        as TimelineIcon       } from "react-icons/tb";
import { TbCalendarPlus         as SlotsIcon          } from "react-icons/tb";
import { TbChartHistogram       as ChartIcon          } from "react-icons/tb";
import { TbChartDonut           as ChartCircularIcon  } from "react-icons/tb";
import { TbChartGridDots        as ChartGridIcon      } from "react-icons/tb";
import { TbGauge                as MetricsIcon        } from "react-icons/tb";
import { CiBoxList              as ListIcon           } from "react-icons/ci";
import { LuListTree             as TreeIcon           } from "react-icons/lu";
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
import { TbLayoutSidebarRightExpand as PanelIcon      } from "react-icons/tb";
import { TbLayoutNavbar             as TabsIcon       } from "react-icons/tb";
import { TbBadgeFilled              as IndicatorIcon  } from "react-icons/tb";
import { TbCards                    as CardIcon       } from "react-icons/tb";
import { TbPackageOff               as EmptyStateIcon } from "react-icons/tb";
import { TbChartBar                 as StatIcon       } from "react-icons/tb";
import { TbListNumbers              as StepsIcon      } from "react-icons/tb";
import { FaBarsProgress         as ProgressIcon       } from "react-icons/fa6";
import { RiProgress5Line        as RadialProgressIcon } from "react-icons/ri";
import { IoMdRadioButtonOn      as RadioIcon          } from "react-icons/io";
import { TbHandFinger           as ChoosePickerIcon   } from "react-icons/tb";
import { TbFilter               as FilterCriterionIcon } from "react-icons/tb";
import { LuSlidersHorizontal    as RangeIcon          } from "react-icons/lu";
import { MdOutlineStarRate      as RatingIcon         } from "react-icons/md";
import { VscListSelection       as SelectIcon         } from "react-icons/vsc" ;
import { LuRectangleHorizontal  as SkeletonIcon       } from "react-icons/lu";
import { FaSpinner              as SpinnerIcon        } from "react-icons/fa";
import { GrStatusPlaceholder    as StatusIcon         } from "react-icons/gr";
import { LuTable                as TableIcon          } from "react-icons/lu";
import { BsTextareaResize       as TextAreaIcon       } from "react-icons/bs" ;
import { TiMessages             as ToastIcon          } from "react-icons/ti" ;
import { TbWaveSine             as SignalIcon         } from "react-icons/tb" ;
import { LuMessageSquareText    as TooltipIcon        } from "react-icons/lu";
import { FaToggleOn             as ToggleIcon         } from "react-icons/fa";

const navigation =
[
    { id : 'home' , type  : LINK  , Icon  : DashboardIcon , path  : '/home' } ,
    {
        id        : 'components' ,
        type      : COLLAPSE ,
        Icon      : ComponentsIcon ,
        className : 'gap-1' ,
        items     :
        [
            {
                id   : 'actions'   ,
                type : COLLAPSE    ,
                Icon : ActionIcon ,
                items :
                [
                    { id : 'buttons'     , type : LINK  , Icon : ButtonIcon     , path  : '/components/buttons'     } ,
                    { id : 'fab'         , type : LINK  , Icon : FabIcon        , path  : '/components/fab'         } ,
                    { id : 'modals'      , type : LINK  , Icon : ModalIcon      , path  : '/components/modals'      } ,
                    { id : 'panels'      , type : LINK  , Icon : PanelIcon      , path  : '/components/panels'      } ,
                    { id : 'assignments' , type : LINK  , Icon : AssignmentIcon , path  : '/components/assignments' } ,
                ]
            } ,
            {
                id   : 'layouts'   ,
                type : COLLAPSE    ,
                Icon : LayoutIcon ,
                items :
                [
                    { id : 'flex'           , type : LINK  , Icon : FlexIcon           , path  : '/components/flex'           } ,
                    { id : 'grid'           , type : LINK  , Icon : GridIcon           , path  : '/components/grid'           } ,
                    { id : 'masonry'        , type : LINK  , Icon : MasonryIcon        , path  : '/components/masonry'        } ,
                    { id : 'infiniteScroll' , type : LINK  , Icon : InfiniteScrollIcon , path  : '/components/infiniteScroll' } ,
                    { id : 'layout'         , type : LINK  , Icon : LayoutIcon         , path  : '/components/layout'         } ,
                    { id : 'collapse'       , type : LINK  , Icon : CollapseIcon       , path  : '/components/collapse'       } ,
                    { id : 'accordion'      , type : LINK  , Icon : AccordionIcon      , path  : '/components/accordion'      } ,
                    { id : 'table'          , type : LINK  , Icon : TableIcon          , path  : '/components/table'          } ,
                    { id : 'tree'           , type : LINK  , Icon : TreeIcon           , path  : '/components/tree'           } ,
                    { id : 'patterns'       , type : LINK  , Icon : PatternsIcon       , path  : '/components/patterns'       } ,
                ]
            } ,
            {
                id   : 'display'   ,
                type : COLLAPSE    ,
                Icon : DisplayIcon ,
                items :
                [
                    { id : 'avatars'    , type : LINK  , Icon : AvatarIcon     , path  : '/components/avatars'    } ,
                    { id : 'badges'     , type : LINK  , Icon : BadgeIcon      , path  : '/components/badges'     , badge : { label : '3' , color : 'primary' , size : 'sm' } } ,
                    { id : 'card'       , type : LINK  , Icon : CardIcon       , path  : '/components/card'       } ,
                    { id : 'effects'    , type : LINK  , Icon : EffectIcon     , path  : '/components/effects'    } ,
                    { id : 'emptyState' , type : LINK  , Icon : EmptyStateIcon , path  : '/components/emptyState' } ,
                    { id : 'images'     , type : LINK  , Icon : ImageIcon      , path  : '/components/images'     } ,
                    { id : 'indicator'  , type : LINK  , Icon : IndicatorIcon  , path  : '/components/indicator'  } ,
                    { id : 'lists'      , type : LINK  , Icon : ListIcon       , path  : '/components/lists'      } ,
                    { id : 'masks'      , type : LINK  , Icon : MaskIcon       , path  : '/components/masks'      } ,
                    { id : 'markdown'   , type : LINK  , Icon : MarkdownIcon   , path  : '/components/markdown'   } ,
                    { id : 'typography' , type : LINK  , Icon : TypographyIcon , path  : '/components/typography' } ,
                    { id : 'motion'     , type : LINK  , Icon : MotionIcon     , path  : '/components/motion'     } ,
                    { id : 'headers'    , type : LINK  , Icon : HeaderIcon     , path  : '/components/headers'    } ,
                    { id : 'network'    , type : LINK  , Icon : NetworkIcon    , path  : '/components/network'    } ,
                    { id : 'stat'       , type : LINK  , Icon : StatIcon       , path  : '/components/stat'       } ,
                    { id : 'steps'      , type : LINK  , Icon : StepsIcon      , path  : '/components/steps'      } ,
                    { id : 'status'     , type : LINK  , Icon : StatusIcon     , path  : '/components/status'     } ,
                ]
            } ,
            {
                id   : 'navigation'   ,
                type : COLLAPSE       ,
                Icon : NavigationIcon ,
                items :
                [
                    { id : 'breadcrumbs' , type : LINK  , Icon : BreadcrumbsIcon , path  : '/components/breadcrumbs' } ,
                    { id : 'dock'        , type : LINK  , Icon : DockIcon        , path  : '/components/dock'        } ,
                    { id : 'pagination'  , type : LINK  , Icon : PaginationIcon  , path  : '/components/pagination'  } ,
                    { id : 'menus'       , type : LINK  , Icon : MenuIcon        , path  : '/components/menus'       } ,
                    { id : 'megamenu'    , type : LINK  , Icon : MegamenuIcon    , path  : '/components/megamenu'    } ,
                    { id : 'tabs'        , type : LINK  , Icon : TabsIcon        , path  : '/components/tabs'        } ,
                ]
            } ,
            {
                id   : 'feedback'   ,
                type : COLLAPSE    ,
                Icon : FeedbackIcon ,
                items :
                [
                    { id : 'alerts'         , type : LINK  , Icon : AlertIcon          , path  : '/components/alerts'         } ,
                    { id : 'loading'        , type : LINK  , Icon : LoadingIcon        , path  : '/components/loading'        } ,
                    { id : 'progress'       , type : LINK  , Icon : ProgressIcon       , path  : '/components/progress'       } ,
                    { id : 'radialProgress' , type : LINK  , Icon : RadialProgressIcon , path  : '/components/radialProgress' } ,
                    { id : 'skeleton'       , type : LINK  , Icon : SkeletonIcon       , path  : '/components/skeleton'       } ,
                    { id : 'spinners'       , type : LINK  , Icon : SpinnerIcon        , path  : '/components/spinners'       } ,
                    { id : 'toasts'         , type : LINK  , Icon : ToastIcon          , path  : '/components/toasts'         } ,
                    { id : 'tooltips'       , type : LINK  , Icon : TooltipIcon        , path  : '/components/tooltips'       } ,
                    { id : 'signals'        , type : LINK  , Icon : SignalIcon         , path  : '/components/signals'        } ,
                ]
            } ,
            {
                id   : 'form'   ,
                type : COLLAPSE    ,
                Icon : FormIcon ,
                items :
                [
                    { id : 'checkboxes' , type : LINK  , Icon : CheckBoxIcon  , path  : '/components/checkboxes' } ,
                    { id : 'colors'     , type : LINK  , Icon : ColorIcon     , path  : '/components/colors'     } ,
                    { id : 'dates'      , type : LINK  , Icon : DatesIcon     , path  : '/components/dates'      } ,
                    { id : 'filters'    , type : LINK  , Icon : FilterCriterionIcon , path  : '/components/filters' } ,
                    { id : 'times'      , type : LINK  , Icon : TimesIcon     , path  : '/components/times'      } ,
                    { id : 'inputs'     , type : LINK  , Icon : InputIcon     , path  : '/components/inputs'     } ,
                    { id : 'pickers'    , type : LINK  , Icon : ChoosePickerIcon , path  : '/components/pickers'    } ,
                    { id : 'radios'     , type : LINK  , Icon : RadioIcon     , path  : '/components/radios'     } ,
                    { id : 'ranges'     , type : LINK  , Icon : RangeIcon     , path  : '/components/ranges'     } ,
                    { id : 'rating'     , type : LINK  , Icon : RatingIcon    , path  : '/components/rating'     } ,
                    { id : 'selects'    , type : LINK  , Icon : SelectIcon    , path  : '/components/selects'    } ,
                    { id : 'textareas'  , type : LINK  , Icon : TextAreaIcon  , path  : '/components/textareas'  } ,
                    { id : 'toggles'    , type : LINK  , Icon : ToggleIcon    , path  : '/components/toggles'    } ,
                ]
            } ,
            {
                id   : 'media'   ,
                type : COLLAPSE  ,
                Icon : MediaIcon ,
                items :
                [
                    { id : 'fileInput' , type : LINK  , Icon : FileInputIcon , path  : '/components/fileInput' } ,
                    { id : 'dropzone'  , type : LINK  , Icon : DropzoneIcon  , path  : '/components/dropzone'  } ,
                    { id : 'photo'     , type : LINK  , Icon : PhotoIcon     , path  : '/components/photo'     } ,
                ]
            } ,
        ]
    } ,
    {
        id        : 'modules' ,
        type      : COLLAPSE ,
        Icon      : ModulesIcon ,
        className : 'gap-1' ,
        items     :
        [
            {
                id   : 'codes'     ,
                type : COLLAPSE    ,
                Icon : BarcodeIcon ,
                items :
                [
                    { id : 'barcodes'  , type : LINK  , Icon : BarcodeIcon   , path  : '/modules/barcodes'  } ,
                    { id : 'scanner'   , type : LINK  , Icon : ScannerIcon   , path  : '/modules/scanner'   } ,
                    { id : 'scanField' , type : LINK  , Icon : ScanFieldIcon , path  : '/modules/scanField' } ,
                ]
            } ,
            {
                id   : 'maps'   ,
                type : COLLAPSE ,
                Icon : MapIcon  ,
                items :
                [
                    { id : 'mapsView'    , type : LINK  , Icon : MapIcon        , path  : '/modules/maps'        } ,
                    { id : 'mapsMarkers' , type : LINK  , Icon : MapMarkerIcon  , path  : '/modules/mapsMarkers' } ,
                    { id : 'mapsPicker'  , type : LINK  , Icon : PickerIcon     , path  : '/modules/mapsPicker'  } ,
                    { id : 'mapsRoutes'  , type : LINK  , Icon : RouteIcon      , path  : '/modules/mapsRoutes'  } ,
                    { id : 'mapsZones'   , type : LINK  , Icon : ZoneIcon       , path  : '/modules/mapsZones'   } ,
                    { id : 'mapsModel'   , type : LINK  , Icon : SchemaIcon     , path  : '/modules/mapsModel'   } ,
                ]
            } ,
            {
                id   : 'kanban'   ,
                type : COLLAPSE   ,
                Icon : KanbanIcon ,
                items :
                [
                    { id : 'kanbanBoard' , type : LINK  , Icon : KanbanIcon , path  : '/modules/kanban' } ,
                ]
            } ,
            {
                id   : 'scheduler'   ,
                type : COLLAPSE      ,
                Icon : SchedulerIcon ,
                items :
                [
                    { id : 'schedulerAgenda' , type : LINK  , Icon : AgendaIcon , path  : '/modules/scheduler'      } ,
                    { id : 'schedulerWeek'   , type : LINK  , Icon : WeekIcon      , path  : '/modules/schedulerWeek'  } ,
                    { id : 'schedulerMonth'  , type : LINK  , Icon : SchedulerIcon , path  : '/modules/schedulerMonth' } ,
                    { id : 'schedulerTimeline' , type : LINK , Icon : TimelineIcon  , path  : '/modules/schedulerTimeline' } ,
                    { id : 'schedulerSlots'  , type : LINK  , Icon : SlotsIcon     , path  : '/modules/schedulerSlots' } ,
                    { id : 'schedulerModel'  , type : LINK  , Icon : SchemaIcon    , path  : '/modules/schedulerModel' } ,
                ]
            } ,
            {
                id   : 'charts'  ,
                type : COLLAPSE  ,
                Icon : ChartIcon ,
                items :
                [
                    { id : 'chartsCartesian' , type : LINK  , Icon : ChartIcon         , path  : '/modules/charts'    } ,
                    { id : 'chartsCirculars' , type : LINK  , Icon : ChartCircularIcon , path  : '/modules/circulars' } ,
                    { id : 'chartsGrids'     , type : LINK  , Icon : ChartGridIcon     , path  : '/modules/grids'     } ,
                    { id : 'chartsMetrics'   , type : LINK  , Icon : MetricsIcon       , path  : '/modules/metrics'   } ,
                ]
            } ,
        ]
    } ,
]

export default navigation ;