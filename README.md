[![CI Status](https://github.com/ahmadsoe/ember-highcharts/actions/workflows/CI.yml/badge.svg?branch=master)](https://github.com/ahmadsoe/ember-highcharts/actions/workflows/CI.yml)
[![Ember Observer Score](http://emberobserver.com/badges/ember-highcharts.svg)](http://emberobserver.com/addons/ember-highcharts)
[![Code Climate](https://codeclimate.com/github/ahmadsoe/ember-highcharts/badges/gpa.svg)](https://codeclimate.com/github/ahmadsoe/ember-highcharts)
[![npm version](https://badge.fury.io/js/ember-highcharts.svg)](https://badge.fury.io/js/ember-highcharts)

# ember-highcharts

A [Highcharts](http://www.highcharts.com/products/highcharts), [Highstock](http://www.highcharts.com/products/highstock),
and [Highmaps](http://www.highcharts.com/products/highmaps) component for [Ember CLI](http://www.ember-cli.com/).


## Compatibility

* Ember.js v4.12 or above
* Ember CLI v4.12 or above
* Node.js v18 or above

## Legacy versions

* If you need support for Ember < 3, use ember-highcharts < v1.2.0
* If you need support for Ember < 2.12.0, use ember-highcharts < v1.0.0
* If you need support for Ember < 1.13.0, use ember-highcharts v0.1.3


## Installation

```
ember install ember-highcharts
```


## Usage

This component takes in five arguments:

```handlebars
<HighCharts
  @mode={{this.mode}}
  @chartOptions={{this.chartOptions}}
  @content={{this.content}}
  @theme={{this.theme}}
  @callback={{this.callBackFunc}}
/>
```
### mode

The `mode` argument is optional and it determines whether to use Highcharts, Highstock, or Highmaps.
The possible values are:

| Value          | Description                 |
| -------------- | --------------------------- |
| falsy value    | defaults to Highcharts mode |
| "StockChart"   | uses Highstock mode         |
| "Map"          | uses Highmaps mode          |
| "Gantt"        | uses Highcharts Gantt mode  |

### chartOptions

The `chartOptions` argument is a generic object for setting different options with Highcharts/Highstock/Highmaps.
Use this option to set things like the chart title and axis settings.

### content

The `content` argument matches up with the `series` option in the Highcharts/Highstock/Highmaps API.
Use this option to set the series data for your chart.

### theme

The `theme` argument is optional and it allows you to pass in a
[Highcharts theme](http://www.highcharts.com/docs/chart-design-and-style/themes).

### callback

The `callback` argument is optional and allows you to pass in a function that runs when the chart has finished loading ([API](https://api.highcharts.com/class-reference/Highcharts.Chart#Chart)).

### Example Bar Chart

Here's an example of how to create a basic bar chart:

```js
// component.js
import Component from '@glimmer/component';
import defaultTheme from '../themes/default-theme';

export default class BarBasic extends Component {
  chartOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    }
  }

  chartData = [{
    name: 'Jane',
    data: [1, 0, 4]
  }, {
    name: 'John',
    data: [5, 7, 3]
  }];

  theme = defaultTheme
}
```

```handlebars
<HighCharts
  @chartOptions={{this.chartOptions}}
  @content={{this.chartData}}
  @theme={{this.theme}}
/>
```

Check out more chart examples in the [tests/dummy app](tests/dummy/app) in this repo.

## Configuration

This addon will load Highcharts by default. Highcharts has many optional features like Highstock and Highmaps.
You can add the `emberHighCharts` option to your `ember-cli-build.js` file to load these optional features:

```js
// all possible options
var app = new EmberApp({
  emberHighCharts: {
    includeHighCharts: false,
    includeHighStock: true,
    includeHighMaps: false,
    includeHighChartsMore: true,
    includeHighCharts3D: true,
    includeModules: ['map', 'broken-axis', 'heatmap', ... ]
    /* Some available modules include:
      boost, broken-axis, canvas-tools, data, drilldown, exporting, funnel,
      heatmap, map, no-data-to-display, offline-exporting, solid-gauge, treemap.
    */
  }
});
```
All modules can be found [here](https://github.com/highcharts/highcharts/tree/master/ts/masters/modules).

### Highstock

Highcharts is already included in Highstock, so it is not necessary to load both.
Using the following configuration to load Highstock:

```js
var app = new EmberApp({
  emberHighCharts: {
    includeHighCharts: false,
    includeHighStock: true
  }
});
```

### Highmaps

Highcharts is not included in Highmaps. If you only need to use Highmaps use the following configuration:

```js
var app = new EmberApp({
  emberHighCharts: {
    includeHighCharts: false,
    includeHighMaps: true
  }
});
```

If you need to use Highmaps and Highcharts then use the following configuration:

```js
var app = new EmberApp({
  emberHighCharts: {
    includeHighCharts: true,
    includeModules: ['map']
  }
});
```


### Global Highcharts Config Options

Ember-highcharts provides its own set of default configurations in `addon/utils/option-loader.js`.
At runtime you can optionally configure custom styles by providing a `app/highcharts-configs/application.js` file.
This file should provide a hook that returns the final configuration.

```js
// app/highcharts-configs/application.js

export default function(defaultOptions) {
  defaultOptions.credits.href = 'http://www.my-great-chart.com';
  defaultOptions.credits.text = 'great charts made cheap';
  defaultOptions.credits.enabled = true;

  return defaultOptions;
}
```

### Generating Chart Components

Ember-highcharts also provides blueprints to easily create sub-classes of the default high-charts component.

```bash
ember generate chart <chart-name>
```

### Obtaining a Reference to the Chart Instance

The `chart` instance is exposed to the yielded content if used in block form:

```handlebars
<HighCharts
  @mode={{this.mode}}
  @chartOptions={{this.chartOptions}}
  @content={{this.content}}
  @theme={{this.theme}}
  as |chart|
>
  <MyCustomLegend @chart={{chart}}>
</HighCharts>
```

_where `<MyCustomLegend>` is an example component that may wish to access the `chart` instance_.


## Contributing

See [contributing guidelines](CONTRIBUTING.md).


## Changelog

See [CHANGELOG.md](CHANGELOG.md).


## Licensing

Highcharts has its own seperate [licensing agreement](https://shop.highsoft.com/highcharts).

The ember-highcharts addon is released under the MIT license.

## Credit

This add-on is built based on the [gist](https://gist.github.com/poteto/cd2bb47e77bf87c94d33) and
[medium](https://medium.com/delightful-ui-for-ember-apps/using-highcharts-js-in-an-ember-app-18a65d611644)
by [@poteto](https://github.com/poteto)
