import { BREAKPOINTS } from '@/constants';
import { useMediaQuery as mediaQueryObserver } from '@vueuse/core';

export function useMediaQuery() {
  const getMediaQuery = (breakpoint: string) => ({
    min: mediaQueryObserver(`(min-width: ${breakpoint})`),
    max: mediaQueryObserver(`(max-width: ${breakpoint})`),
  });

  return {
    // Large smartphone
    largeSmartphoneDown: getMediaQuery(BREAKPOINTS.largeSmartphone).max,
    largeSmartphoneUp: getMediaQuery(BREAKPOINTS.largeSmartphone).min,

    // Tablet portrait
    tabletPortraitDown: getMediaQuery(BREAKPOINTS.tabletPortrait).max,
    tabletPortraitUp: getMediaQuery(BREAKPOINTS.tabletPortrait).min,

    // Large tablet portrait
    largeTabletPortraitDown: getMediaQuery(BREAKPOINTS.largeTabletPortrait).max,
    largeTabletPortraitUp: getMediaQuery(BREAKPOINTS.largeTabletPortrait).min,

    // Tablet landscape
    tabletLandscapeDown: getMediaQuery(BREAKPOINTS.tabletLandscape).max,
    tabletLandscapeUp: getMediaQuery(BREAKPOINTS.tabletLandscape).min,

    // Large tablet landscape
    largeTabletLandscapeDown: getMediaQuery(BREAKPOINTS.largeTabletLandscape).max,
    largeTabletLandscapeUp: getMediaQuery(BREAKPOINTS.largeTabletLandscape).min,

    // Desktop
    desktopDown: getMediaQuery(BREAKPOINTS.desktop).max,
    desktopUp: getMediaQuery(BREAKPOINTS.desktop).min,

    // Large desktop
    largeDesktopDown: getMediaQuery(BREAKPOINTS.largeDesktop).max,
    largeDesktopUp: getMediaQuery(BREAKPOINTS.largeDesktop).min,
  };
}
