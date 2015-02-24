# Ember-highcharts

A [Highcharts](http://www.highcharts.com/) component for [Ember CLI](http://www.ember-cli.com/).

## Installation

* `ember install:addon ember-highcharts`

## Usage

In your template:

```handlebars
{{high-charts content=chartData chartOptions=chartOptions}}
```

Then in a controller you can set the `chartData` and `chartOptions` values:

```javascript
import Ember from 'ember';

export default Ember.Controller.extend({
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
  ]
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

## Credit

This add-on is built based on the [gist](https://gist.github.com/poteto/cd2bb47e77bf87c94d33) and [medium](https://medium.com/delightful-ui-for-ember-apps/using-highcharts-js-in-an-ember-app-18a65d611644) by [@poteto](https://github.com/poteto)
