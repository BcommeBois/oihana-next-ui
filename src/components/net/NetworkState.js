'use client';

import cn from '@/themes/helpers/cn';

import { useEffect, useState } from 'react';

import { useNetworkState } from 'react-use';

import {
    MdBluetooth,
    MdFiberManualRecord,
    MdPodcasts,
    MdSettingsEthernet,
    MdSignalCellularAlt,
    MdWifi,
    MdWifiTethering
} from 'react-icons/md';

import useI18n from '@/contexts/locale/useI18n';

import { BASE, LG, MD, SM, XL, XS } from '@/themes/sizing/sizes';

// Re-export sizes for convenience
export { BASE, LG, MD, SM, XL, XS };

/**
 * Size configuration for NetworkState component.
 * Maps size variants to icon dimensions and padding.
 * @private
 */
const SIZE_CONFIG =
{
    [ XS   ] : { led: 10, type: 10, padding: 'p-1'  , size: 'size-6'  } ,
    [ SM   ] : { led: 12, type: 14, padding: 'p-1'  , size: 'size-7'  } ,
    [ BASE ] : { led: 14, type: 14, padding: 'p-1.5', size: 'size-8'  } ,
    [ MD   ] : { led: 14, type: 14, padding: 'p-1.5', size: 'size-8'  } ,
    [ LG   ] : { led: 16, type: 16, padding: 'p-2'  , size: 'size-10' } ,
    [ XL   ] : { led: 18, type: 18, padding: 'p-2.5', size: 'size-12' } ,
};

/**
 * Network State Indicator Component
 *
 * Displays the current network connection status with a visual LED indicator
 * and optional network type icon.
 *
 * @component
 * @example
 * // Basic usage
 * <NetworkState />
 *
 * @example
 * // With size variant
 * <NetworkState size="lg" />
 *
 * @example
 * // With network type icon
 * <NetworkState size="md" showType />
 *
 * @example
 * // With i18n
 * <NetworkState path="network.status" />
 *
 * @example
 * // With custom texts
 * <NetworkState onlineText="Connected" offlineText="Disconnected" />
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @param {string} [props.offlineLabel] - Accessible label when offline (overrides i18n)
 * @param {string} [props.offlineText] - Text/title when offline (overrides i18n)
 * @param {string} [props.onlineLabel] - Accessible label when online (overrides i18n)
 * @param {string} [props.onlineText] - Text/title when online (overrides i18n)
 * @param {string} [props.path] - i18n path for online/offline labels
 * @param {boolean} [props.showType=false] - Show network type icon
 * @param {'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl'} [props.size='md'] - Size variant
 * @returns {JSX.Element} Network status indicator
 */
const NetworkState =
({
    className ,
    offlineLabel ,
    offlineText ,
    onlineLabel ,
    onlineText ,
    path ,
    showType = false ,
    size = MD
}) =>
{
    const [mounted, setMounted] = useState(false);
    const { online, type } = useNetworkState();

    useEffect(() =>
    {
        setMounted(true);
    }, []);

    // i18n support (expects structure: { online: { label, title }, offline: { label, title } })
    const i18nOnline  = useI18n( path ? `${path}.online`  : null , {} , false ) ;
    const i18nOffline = useI18n( path ? `${path}.offline` : null , {} , false ) ;

    const networkIcons =
    {
        bluetooth : MdBluetooth,
        cellular  : MdSignalCellularAlt,
        ethernet  : MdSettingsEthernet,
        wifi      : MdWifi,
        wimax     : MdWifiTethering,
        other     : MdPodcasts,
        unknown   : MdPodcasts,
        none      : MdWifi
    };

    const NetworkIcon = networkIcons[type] || MdPodcasts;

    // Default state before hydration: assume online
    const isOnline = mounted ? online : true;

    // Get size configuration
    const config = SIZE_CONFIG[ size ] || SIZE_CONFIG[ MD ] ;

    // Resolve texts and labels with fallbacks
    const resolvedOnlineText  = onlineText  ?? i18nOnline?.label  ?? i18nOnline?.title  ?? 'Online' ;
    const resolvedOfflineText = offlineText ?? i18nOffline?.label ?? i18nOffline?.title ?? 'Offline' ;
    const resolvedOnlineLabel  = onlineLabel  ?? i18nOnline?.label  ?? 'Network online' ;
    const resolvedOfflineLabel = offlineLabel ?? i18nOffline?.label ?? 'Network offline' ;

    const currentText  = isOnline ? resolvedOnlineText  : resolvedOfflineText ;
    const currentLabel = isOnline ? resolvedOnlineLabel : resolvedOfflineLabel ;

    const classNames = cn
    (
        'inline-flex items-center justify-center rounded-full shrink-0',
        config.padding,
        !showType && config.size,
        showType && 'gap-1 w-auto h-auto',
        {
            'bg-success/10' : isOnline  ,
            'bg-error/10'   : !isOnline
        },
        className
    );

    return (
        <div
            aria-label = { currentLabel }
            className  = { classNames }
            role       = "status"
            title      = { currentText }
        >
            <MdFiberManualRecord
                size      = { config.led }
                className = { cn( 'shrink-0' , isOnline ? 'text-success' : 'text-error') }
            />
            {
                showType && mounted &&
                (
                    <NetworkIcon
                        size      = { config.type }
                        className = "shrink-0 text-base-content opacity-60"
                    />
                )
            }
        </div>
    );
};

export default NetworkState;