# Changelog

## Release (2025-05-06)

ember-highcharts 7.0.0 (major)

#### :boom: Breaking Change
* `ember-highcharts`, `test-app`
  * [#493](https://github.com/ahmadsoe/ember-highcharts/pull/493) Require Highcharts >= 10 ([@MichalBryxi](https://github.com/MichalBryxi))

#### :house: Internal
* `ember-highcharts`, `test-app`
  * [#495](https://github.com/ahmadsoe/ember-highcharts/pull/495) Run tests for highcharts 10 and 11 ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 2
- Michal Bryxí ([@MichalBryxi](https://github.com/MichalBryxi))
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

## Release (2024-10-07)

ember-highcharts 6.2.0 (minor)

#### :rocket: Enhancement
* `ember-highcharts`, `test-app`
  * [#481](https://github.com/ahmadsoe/ember-highcharts/pull/481) Add support for polar charts ([@MichalBryxi](https://github.com/MichalBryxi))
  * [#472](https://github.com/ahmadsoe/ember-highcharts/pull/472) Support treegraph and treemap modules ([@charlesfries](https://github.com/charlesfries))

#### :memo: Documentation
* [#484](https://github.com/ahmadsoe/ember-highcharts/pull/484) docs: Remove reference to blueprints ([@MichalBryxi](https://github.com/MichalBryxi))
* [#487](https://github.com/ahmadsoe/ember-highcharts/pull/487) docs: Remove global config reference ([@MichalBryxi](https://github.com/MichalBryxi))
* [#476](https://github.com/ahmadsoe/ember-highcharts/pull/476) v2 test app path in README ([@MichalBryxi](https://github.com/MichalBryxi))

#### :house: Internal
* Other
  * [#489](https://github.com/ahmadsoe/ember-highcharts/pull/489) Setup release-plan ([@RobbieTheWagner](https://github.com/RobbieTheWagner))
* `test-app`
  * [#488](https://github.com/ahmadsoe/ember-highcharts/pull/488) Fix test app component class names ([@charlesfries](https://github.com/charlesfries))

#### Committers: 3
- Charles Fries ([@charlesfries](https://github.com/charlesfries))
- Michal Bryxí ([@MichalBryxi](https://github.com/MichalBryxi))
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))





## v6.1.2 (2024-08-09)

#### :bug: Bug Fix
* [#474](https://github.com/ahmadsoe/ember-highcharts/pull/474) Use @ember/test-waiters to ensure we wait for imports ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

## v6.1.1 (2024-08-07)

#### :bug: Bug Fix
* [#473](https://github.com/ahmadsoe/ember-highcharts/pull/473) Make content's type more generic ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

## v6.1.0 (2024-07-26)

#### :rocket: Enhancement
* [#471](https://github.com/ahmadsoe/ember-highcharts/pull/471) Enable accessibility module ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### :house: Internal
* [#469](https://github.com/ahmadsoe/ember-highcharts/pull/469) pnpm update ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

## v6.0.1 (2024-07-16)

## v6.0.0 (2024-07-16)

#### :boom: Breaking Change
* [#467](https://github.com/ahmadsoe/ember-highcharts/pull/467) Convert to v2 addon ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### :house: Internal
* [#466](https://github.com/ahmadsoe/ember-highcharts/pull/466) ember-cli-update to ember 5.10 ([@RobbieTheWagner](https://github.com/RobbieTheWagner))
* [#465](https://github.com/ahmadsoe/ember-highcharts/pull/465) Switch to pnpm ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))


## v5.0.1 (2024-07-16)

#### :house: Internal
* [#464](https://github.com/ahmadsoe/ember-highcharts/pull/464) Remove lodash ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))


## v5.0.0 (2024-07-15)

#### :boom: Breaking Change
* [#460](https://github.com/ahmadsoe/ember-highcharts/pull/460) Remove config and use dynamic imports for modules ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 1
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))


## v4.0.0 (2024-07-12)

#### :boom: Breaking Change
* [#444](https://github.com/ahmadsoe/ember-highcharts/pull/444) Drop support for Ember < 4.12 ([@RobbieTheWagner](https://github.com/RobbieTheWagner))
* [#437](https://github.com/ahmadsoe/ember-highcharts/pull/437) Drop support for node < 18 and Ember < 4.4 ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### :rocket: Enhancement
* [#451](https://github.com/ahmadsoe/ember-highcharts/pull/451) Add back tests for older Ember versions ([@RobbieTheWagner](https://github.com/RobbieTheWagner))
* [#387](https://github.com/ahmadsoe/ember-highcharts/pull/387) remove ember-copy dependency ([@Gaurav0](https://github.com/Gaurav0))
* [#442](https://github.com/ahmadsoe/ember-highcharts/pull/442) Remove validate-peer-dependencies ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### :house: Internal
* [#443](https://github.com/ahmadsoe/ember-highcharts/pull/443) Update release-it setup ([@RobbieTheWagner](https://github.com/RobbieTheWagner))
* [#438](https://github.com/ahmadsoe/ember-highcharts/pull/438) Bump deepmerge, remove vendor shim ([@RobbieTheWagner](https://github.com/RobbieTheWagner))

#### Committers: 2
- Gaurav Munjal ([@Gaurav0](https://github.com/Gaurav0))
- Robbie Wagner ([@RobbieTheWagner](https://github.com/RobbieTheWagner))


## v3.2.0 (2021-11-08)

#### :memo: Documentation
* [#215](https://github.com/ahmadsoe/ember-highcharts/pull/215) Add link to modules dir in README ([@nlfurniss](https://github.com/nlfurniss))

#### Committers: 1
- Nathaniel Furniss ([@nlfurniss](https://github.com/nlfurniss))


## v3.1.0 (2021-08-04)

#### :rocket: Enhancement
* [#195](https://github.com/ahmadsoe/ember-highcharts/pull/195) Handle when chartOptions change ([@nlfurniss](https://github.com/nlfurniss))

#### :memo: Documentation
* [#197](https://github.com/ahmadsoe/ember-highcharts/pull/197) Document and test callback argument ([@nlfurniss](https://github.com/nlfurniss))
* [#196](https://github.com/ahmadsoe/ember-highcharts/pull/196) Add Gantt chart mode to readme ([@nlfurniss](https://github.com/nlfurniss))

#### :house: Internal
* [#204](https://github.com/ahmadsoe/ember-highcharts/pull/204) Use qunit-dom ([@nlfurniss](https://github.com/nlfurniss))
* [#203](https://github.com/ahmadsoe/ember-highcharts/pull/203) Upgrade ember-qunit ([@nlfurniss](https://github.com/nlfurniss))

#### Committers: 1
- Nathaniel Furniss ([@nlfurniss](https://github.com/nlfurniss))


## v3.0.1 (2021-05-15)

#### :house: Internal
* [#193](https://github.com/ahmadsoe/ember-highcharts/pull/193) set Ember edition to Octane ([@nlfurniss](https://github.com/nlfurniss))

#### Committers: 1
- Nathaniel Furniss ([@nlfurniss](https://github.com/nlfurniss))


## v2.1.0 (2020-09-24)

#### :house: Internal
* [#180](https://github.com/ahmadsoe/ember-highcharts/pull/180) Upgrade ember-cli-babel to v7 ([@nlfurniss](https://github.com/nlfurniss))

#### Committers: 1
- Nathaniel Furniss ([@nlfurniss](https://github.com/nlfurniss))

