import Component from '@glimmer/component';

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const WIND_DATA = [
  0, 10, 15, 10, 20, 45, 47, 90, 110, 115, 130, 150, 160, 188, 190, 185, 192,
];

export default class LineBasic extends Component {
  chartOptions = {
    chart: {
      type: 'line',
      polar: true,
    },
    title: {
      text: 'Wind direction history',
    },
    xAxis: {
      tickInterval: 45,
      min: 0,
      max: 360,
      labels: {
        formatter: function ({ value }) {
          return DIRECTIONS[Math.round(value / 45)];
        },
      },
    },
    yAxis: {
      min: 0,
      max: 1,
      labels: {
        enabled: false,
      },
    },
    tooltip: false,
  };

  chartData = [
    {
      name: 'Amisbühl',
      data: WIND_DATA.map((x, i) => ({ x, y: i / (WIND_DATA.length - 1) })),
      connectEnds: false,
    },
  ];
}
