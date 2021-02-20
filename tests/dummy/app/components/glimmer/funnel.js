import Component from '@glimmer/component';

export default class Funnel extends Component {

  chartOptions = {
    chart: {
      type: 'funnel'
    },
    title: {
      text: 'Sales funnel'
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
  }

  chartData = [
    {
      name: 'Unique users',
      data: [
        ['Website visits', 15654],
        ['Downloads', 4064],
        ['Requested price list', 1987],
        ['Invoice sent', 976],
        ['Finalized', 846]
      ]
    }
  ]

}
