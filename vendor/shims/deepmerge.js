(function() {
  function vendorModule() {
    'use strict';

    return {
    /* eslint-disable-next-line dot-notation */
      'default': self['deepmerge'],
      __esModule: true
    };
  }

  define('deepmerge', [], vendorModule);
})();
