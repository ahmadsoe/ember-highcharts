# Ember-highcharts [![Build Status](https://travis-ci.org/ahmadsoe/ember-highcharts.svg)](https://travis-ci.org/ahmadsoe/ember-highcharts) [![npm version](https://badge.fury.io/js/ember-highcharts.svg)](http://badge.fury.io/js/ember-highcharts)

A [Highcharts](http://www.highcharts.com/products/highcharts), [Highstock](http://www.highcharts.com/products/highstock) and [Highmaps](http://www.highcharts.com/products/highmaps) component for [Ember CLI](http://www.ember-cli.com/).

## Installation

```
ember install:addon ember-highcharts
```

This addon will use Highcharts by default, if you want to use Highstocks, Highmaps and/or Highcharts-more, add this options to your `Brocfile.js`:

```javascript
var app = new EmberApp({
  ---
  emberHighCharts: {
    includeHighCharts: false,
    includeHighStock: true,
    includeHighMaps: true,
    includeHighChartsMore: true
  }
  ---
});
```

## Usage

In your template:

```handlebars
{{high-charts mode=chartMode content=chartData chartOptions=chartOptions theme=theme}}
```

Then in a controller you can set the `chartMode`, `chartData`, `chartOptions` and `theme` values:

```javascript
import Ember from 'ember';
import defaultTheme from '../themes/default-theme';

export default Ember.Controller.extend({
  chartMode: 'StockChart', // Available options: a falsy value, 'StockChart', 'Map'.
                           // If `mode` is not provided or is a falsy value, the chart is initialized in Charts mode.
                           // If `mode` is a string, it is passed to Highcharts as the first argument.
                           // When Highcharts introduces a new mode, you will be able to use it here right away.

  chartOptions: {
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
  },

  chartData: [
    {
      name: 'Jane',
      data: [1, 0, 4]
    }, {
      name: 'John',
      data: [5, 7, 3]
    }
  ],

  theme: defaultTheme
});
```

### Configuring Default Styles

Ember-highcharts provides its own set of default configurations in
`addon/utils/option-loader.js`.  At runtime you can optionally configure custom
styles by providing a `app/highcharts-configs/application.js` file.  This
file should provide a hook that returns the final configuration.

```javascript
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

### Overriding Chart Redrawing

This addon observes changes to chartData and redraws the chart using the highcharts
[Series.setData](http://api.highcharts.com/highcharts#Series.setData) method. You can extend this
component to handle advanced redrawing use cases like dynamically updating labels and titles
(ex: [Chart.setTitle()](http://api.highcharts.com/highcharts#Chart.setTitle)).

```javascript
// components/dynamic-high-charts.js
import Ember from 'ember';
import EmberHighChartsComponent from 'ember-highcharts/components/high-charts';

export default EmberHighChartsComponent.extend({

  contentDidChange: Ember.observer('content.@each.isLoaded', function() {
    // add redraw logic here. ex:
    var chart = this.get('chart');
    var seriesName = this.get('content')[0].name;
    chart.series[0].update({ name: seriesName, data: this.get('content')[0].data }, false);
    chart.setTitle(null, { text: seriesName }, false);
    chart.redraw();
  })

});
```

```handlebars
{{dynamic-high-charts mode=chartMode content=chartData chartOptions=chartOptions theme=theme}}
```

## Contributing

see [contributing guidelines](contributing.md).

## Changelog

see [CHANGELOG.md](CHANGELOG.md).

## Credit

This add-on is built based on the [gist](https://gist.github.com/poteto/cd2bb47e77bf87c94d33) and [medium](https://medium.com/delightful-ui-for-ember-apps/using-highcharts-js-in-an-ember-app-18a65d611644) by [@poteto](https://github.com/poteto)
