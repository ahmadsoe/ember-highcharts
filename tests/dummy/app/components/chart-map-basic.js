import Ember from 'ember';
import mapData from '../data/us-ca-map';

export default Ember.Component.extend({
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
  ]
});
