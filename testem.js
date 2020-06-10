/* eslint-env node */

'use strict';

module.exports = {
  framework: 'qunit',
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  parallel: -1,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_args: {
    Chrome: {
      ci: [
        process.env.TRAVIS ? '--no-sandbox' : null, // --no-sandbox is needed when running Chrome inside a container
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
        '--enable-logging',
        '--v=1',
        '--enable-crash-reporting',
        '--crash-dumps-dir=build/outputs/chrome_crash_dumps',
        // Chrome 66+ introduces a policy that requires user interaction before autoplay is allowed
        // this flag disables that policy and allows autoplay regardless of user interaction
        '--autoplay-policy=no-user-gesture-required',
      ].filter(Boolean),
    }
  }
};
