import Component from '@glimmer/component';

export default class Treegraph extends Component {
  chartOptions = {
    chart: {
      type: 'treegraph',
    },
    title: {
      text: 'Organizational Structure',
    },
  };

  chartData = [
    {
      keys: ['id', 'parent'],
      data: [
        ['Alice'],
        ['Bill', 'Alice'],
        ['Carson', 'Bill'],
        ['Edward', 'Bill'],
        ['Dwayne', 'Alice'],
      ],
      dataLabels: {
        format: '{point.id}',
      },
    },
  ];
}
