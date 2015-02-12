# Ember-highcharts

A [Highcharts](http://www.highcharts.com/) component for [Ember CLI](http://www.ember-cli.com/).

## Installation

* `npm install --save-dev ember-highcharts`
* `ember g ember-highcharts`

## Usage

In your template:
```handlebars
{{high-charts content=chartData chartOptions=chartOptions}}
```
Then in a controller you can set the `chartData` and `chartOptions` values:
```
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

## Credit

This add-on is built based on the [gist](https://gist.github.com/poteto/cd2bb47e77bf87c94d33) and [medium](https://medium.com/delightful-ui-for-ember-apps/using-highcharts-js-in-an-ember-app-18a65d611644) by [@poteto](https://github.com/poteto)
