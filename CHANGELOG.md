# Changelog

## 3.0.0
- Applied `ember init -b @ember/octane-addon-blueprint` for general upgrade goodness
- Moved templates to co-location
- Bumped `highcharts@^9.0.1`
- Bumped `ember-copy@^2.0.1`
- Bumped `devDeps` across the board
- Implement Glimmer version of highcharts
- Update tests; now with Angle Bracket Goodness™
- Clean up `ember-try` config
- Various lint fixes
- Use `render-modifiers` bridge with `{{did-insert}}` and `{{did-update}}`
- Export the build-options getter; move component test to util unit test
- Drop node 10
- Bring ember support to [LTS](https://emberjs.com/releases/lts/) with travis

## 2.2.0
- Use `ember-auto-import` instead of `ember-cli-node-assets`
- Use peerDependencies and validate them

## 2.1.0

- Bump `ember-cli-babel` to v7

## 2.0.0

- Bump _all_ dependencies to latest
- Updated integration tests to async/await framework
- Drop support for Node <=8
- Add testing for ember early 3.*
- Update eslint things, add a few disables
- Add `await settled();` to 1 test to fix it
- Migrate `getWithDefault` in prep for ember 3.20
- Remove support for Ember <3.*

## 1.2.0

- Use the "app" argument if available
- Bump bootstrap version to fix security vulnerability

## 1.1.1

- Component should not throw an exception on a "falsy" mode attribute

## 1.1.0

- Use ember-copy instead of Ember's deprecated internal copy
- Drop support for Node 4.x

## 1.0.1

- Fix issue where `theme` and `chartOptions` were not being deep merged properly (#142)

## 1.0.0

- Remove Ember 1.3, 2.4, and 2.8 support

## 0.7.0

- Remove jQuery from high-charts component
- Move boostrap to NPM and out of bower
- Removed single quotes in the chart-solid-guage 'format'.
- update ember-getowner-polyfill dependency

## 0.6.0

- Ember 3.0 update
- Updated blueprint to match current settings
- Switching nested addon detection to findHost.
- Upgrade to Highcharts 5.0.12, fix breaking tests

## 0.5.4

- Replace _lookupFactory() with factoryFor()
- Upgrade to ember-cli 2.12

## 0.5.3

- Upgrade to ember-cli 2.11
- Fix deprecated warning ember-getowner-polyfill
- Switch to ESLint and fixing style

## 0.5.2

- Made the high-charts component “engine friendly” for engine based Ember apps
- Prefer overriding didInsertElement and willDestroyElement

## 0.5.1

- Update to ember-cli 2.7.0
- Don't add fake series when highcharts 'no-data-to-display' module is imported
- Yield chart instance when used in block form

## 0.5.0

- Improve logic for series updates

## 0.4.4

- Add test for 'noData' use case and remove unused code
- Add highmaps demo
- Cleanup documentation
- Add chart drilldown demo
- Add solid gauge demo
- Add sales funnel demo
- Add heat map demo
- Add waterfall demo
- Standardize components in dummp app
- Update to ember-cli 2.5.1
- Fix import boost module before hightchart-3d
- Add scatter chart demo

## 0.4.3

- Clean up tests
- Upgrade to ember-cli 2.4.2
- Add ember observer and code climate badges
- Changed merge -> assign to silent deprecation warning in Ember 2.5
- Update highstock component to be interactive
- Refactor logic for handling chart updates

## 0.4.2

- Redesign dummy app
- Add support for updating chart when series data is removed
- Add integration tests for manipulating series data

## 0.4.1

- Fix path issue for highcharts-more & highcharts-3d

## 0.4.0

- Moving bower dependencies to npm
- Upgrade to ember-cli 1.13.15
- Updating option detection to work with a composed addon
- Use "getOwner" helper to lookup highcharts config

## 0.3.0

- Import Highcharts source from bower

## 0.2.1

- Add support for Ember 2.x
- Fix incorrect import path in chart blueprint

## 0.2.0

- Check that chart exists before calling destroy
- Update Ember CLI to 1.13.8
- Import Highcharts source from NPM instead of vendor files
- Add support for Highcharts 3D
- Add support for Highcharts modules
- [BREAKING] Remove observer in favor of didReceiveAttrs

## 0.1.3

- [DOC] How to override chart redrawing
- Added Highcharts-more

## 0.1.2

- Added chart blueprint
- Added contributing guidelines
- Added Highchart initializer to accept secondary argument

## 0.1.1

- Fix ENOENT error on bower_components
- Include Highcharts source to addon

## 0.1.0

- Update Ember CLI to 0.2.0
- es6ified component
- Remove default chart styles
- Add option to import chart theme
- Make installation process more simple
- Update project description

## 0.0.8

- Fixed broken npm package.

## 0.0.7

- Updated Ember CLI to `0.1.15`.

## 0.0.6

- Updated tests.
- Added Highstock demo to the dummy app.

## 0.0.5

- Added an ability to use Highstock and Highmaps.
- The addon no longer automatically imports the Highcharts Bower package, letting user import desired package manually.
