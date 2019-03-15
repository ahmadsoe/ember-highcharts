import Component from '@ember/component';
import { get, set } from '@ember/object';
import { assign } from '@ember/polyfills';
import mapData from '../data/us-ca-map';

export default Component.extend({
  chartOptions: {
    title: {
      text: 'California'
    },
    colorAxis: {
      min: 0
    }
  },

  chartData: [
    {
      name: 'Random data',
      data: [
        {
          'hc-key': 'us-ca-071',
          'value': 5
        },
        {
          'hc-key': 'us-ca-037',
          'value': 10
        },
        {
          'hc-key': 'us-ca-073',
          'value': 20
        }
      ],
      mapData,
      joinBy: 'hc-key',
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }
  ],

  actions: {
    changeTitle() {
      let newOptions = assign({}, get(this, 'chartOptions'), { title: { text: 'United States' } });

      set(this, 'chartOptions', newOptions);
    }
  }
});
