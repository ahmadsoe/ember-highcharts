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

  chartData: [{
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
      },
    ],
    mapData: mapData,
    joinBy: 'hc-key',
    name: 'Random data',
    states: {
      hover: {
        color: '#BADA55'
      }
    },
    dataLabels: {
      enabled: true,
      format: '{point.name}'
    }
  }]

});
