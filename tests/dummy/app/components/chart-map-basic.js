import Component from '@glimmer/component';
import mapData from '../data/us-ca-map';

export default class MapBasic extends Component {
  chartOptions = {
    title: {
      text: 'California'
    },
    colorAxis: {
      min: 0
    }
  }

  chartData = [
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
}
