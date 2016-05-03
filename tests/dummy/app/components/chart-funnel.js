import Ember from 'ember';

export default Ember.Component.extend({

  chartOptions: {
    chart: {
      type: 'funnel'
    },

    title: {
      text: 'Sales funnel'
    },

    credits: {
      enabled: false
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          color: 'black',
          softConnector: true
        },
        neckWidth: '30%',
        neckHeight: '25%'
      }
    },

    legend: {
      enabled: true
    }

  },

  chartData: [{
    name: 'Unique users',
    data: [
      ['Website visits', 15654],
      ['Downloads', 4064],
      ['Requested price list', 1987],
      ['Invoice sent', 976],
      ['Finalized', 846]
    ]
  }]

});
