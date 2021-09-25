import { Props } from 'react-apexcharts'
import { theme } from 'styles/theme'

export const options: Props = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    offsetX: 0,
    offsetY: -10,
    background: {
      enabled: true,
      foreColor: theme.colors.gray[50],
      padding: 4,
      borderRadius: 1,
      borderWidth: 0,
      borderColor: theme.colors.gray[50],
      opacity: 0.3
    }
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z'
    ]
  },
  colors: ['#B83280', '#F687B3'],
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
}
