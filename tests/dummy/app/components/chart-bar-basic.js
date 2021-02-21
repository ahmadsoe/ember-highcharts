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
      allowDecimals: false,
      title: {
        text: 'Fruit eaten'
      }
    }
  }

  chartData = [
    {
      name: 'Jane',
      data: [5, 0, 20]
    },
    {
      name: 'John',
      data: [25, 30, 15]
    }
  ]

  theme = defaultTheme
}
