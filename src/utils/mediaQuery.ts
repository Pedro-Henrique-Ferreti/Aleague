import { breakpoints } from '@/constants/breakpoints';
import { useMediaQuery as mediaQueryObserver } from '@vueuse/core';

export function useMediaQuery() {
  const getMediaQuery = (breakpoint: string) => ({
    min: mediaQueryObserver(`(min-width: ${breakpoint})`),
    max: mediaQueryObserver(`(max-width: ${breakpoint})`),
  });

  return {
    // Large smartphone
    largeSmartphoneDown: getMediaQuery(breakpoints.LARGE_SMARTPHONE).max,
    largeSmartphoneUp: getMediaQuery(breakpoints.LARGE_SMARTPHONE).min,

    // Tablet portrait
    tabletPortraitDown: getMediaQuery(breakpoints.TABLET_PORTRAIT).max,
    tabletPortraitUp: getMediaQuery(breakpoints.TABLET_PORTRAIT).min,

    // Large tablet portrait
    largeTabletPortraitDown: getMediaQuery(breakpoints.LARGE_TABLET_PORTRAIT).max,
    largeTabletPortraitUp: getMediaQuery(breakpoints.LARGE_TABLET_PORTRAIT).min,

    // Tablet landscape
    tabletLandscapeDown: getMediaQuery(breakpoints.TABLET_LANDSCAPE).max,
    tabletLandscapeUp: getMediaQuery(breakpoints.TABLET_LANDSCAPE).min,

    // Large tablet landscape
    largeTabletLandscapeDown: getMediaQuery(breakpoints.LARGE_TABLET_LANDSCAPE).max,
    largeTabletLandscapeUp: getMediaQuery(breakpoints.LARGE_TABLET_LANDSCAPE).min,

    // Desktop
    desktopDown: getMediaQuery(breakpoints.DESKTOP).max,
    desktopUp: getMediaQuery(breakpoints.DESKTOP).min,

    // Large desktop
    largeDesktopDown: getMediaQuery(breakpoints.LARGE_DESKTOP).max,
    largeDesktopUp: getMediaQuery(breakpoints.LARGE_DESKTOP).min,
  };
}
