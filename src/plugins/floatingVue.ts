export default {
  themes: {
    'user-menu': {
      $extend: 'menu',
      $resetCss: true,
      arrowOverflow: false,
      placement: 'bottom-end',
      distance: 16,
    },
    'app-dropdown': {
      $extend: 'dropdown',
      $resetCss: true,
      arrowOverflow: false,
      placement: 'bottom-start',
      distance: 2,
    },
    'app-popup-large': {
      $extend: 'dropdown',
      $resetCss: true,
      arrowOverflow: false,
      placement: 'bottom-start',
      distance: 12,
      skidding: -12,
    },
    'context-menu': {
      $extend: 'dropdown',
      $resetCss: true,
      arrowOverflow: false,
      placement: 'right-start',
      distance: 8,
    },
    'popup-menu': {
      $extend: 'dropdown',
      $resetCss: true,
      arrowOverflow: false,
      placement: 'right-start',
      distance: 8,
      skidding: -102,
    },
    tooltip: {
      $resetCss: true,
      distance: 8,
    },
    'match-tooltip': {
      $extend: 'menu',
      $resetCss: true,
      arrowOverflow: false,
      distance: 8,
      placement: 'top-end',
      arrowPadding: 12,
      delay: {
        hide: 0,
      },
    },
  },
};
