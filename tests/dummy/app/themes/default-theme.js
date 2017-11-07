export default {
  colors: [
    '#258be2',
    '#666666',
    '#f45b5b',
    '#8085e9',
    '#8d4654',
    '#7798bf',
    '#aaeeee',
    '#ff0066',
    '#eeaaee',
    '#55bf3b',
    '#df5353',
    '#7798bf',
    '#aaeeee'
  ],
  chart: {
    backgroundColor: null,
    style: {
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
    }
  },
  title: {
    style: {
      color: 'black',
      // fontSize: '18px',
      fontWeight: 'bold'
    }
  },
  subtitle: {
    style: {
      color: 'black'
    }
  },
  tooltip: {
    borderWidth: 0,
    style: {
      fontSize: '16px'
    }
  },
  legend: {
    itemStyle: {
      fontWeight: 'bold',
      fontSize: '14px'
    }
  },
  xAxis: {
    labels: {
      style: {
        color: '#6e6e70',
        fontSize: '16px'
      }
    },
    title: {
      style: {
        fontSize: '14px'
      }
    }
  },
  yAxis: {
    labels: {
      style: {
        color: '#6e6e70',
        fontSize: '16px'
      }
    },
    title: {
      style: {
        fontSize: '14px'
      }
    }
  },
  plotOptions: {
    series: {
      shadow: true
    },
    candlestick: {
      lineColor: '#404048'
    }
  },
  navigator: {
    xAxis: {
      gridLineColor: '#D0D0D8'
    }
  },
  rangeSelector: {
    buttonTheme: {
      fill: 'white',
      stroke: '#C0C0C8',
      'stroke-width': 1,
      states: {
        select: {
          fill: '#D0D0D8'
        }
      }
    }
  },
  scrollbar: {
    trackBorderColor: '#C0C0C8'
  },
  background2: '#E0E0E8',
  global: {
    timezoneOffset: new Date().getTimezoneOffset()
  },
  credits: {
    enabled: false
  }
};
