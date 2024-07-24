import { getFormatStandardDate } from "../../utils/helpers/date";

export const ProductOrderOption: any = {
    chart: {
      type: "area",
      zoomType: 'x'
    },
    title: {
      text: 'Product Orders',
      align: 'left',
    },
    xAxis: {
      type: 'datetime',
      labels: {
        formatter: function(value: any) {
          return getFormatStandardDate(value.value);
        }
      },  
    },
    yAxis: {
      title: {
        text: 'Total Product'
      }
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, '#6dc3fe'],
            [0, '#6dc3fe'],
            [1, '#ffffff']
          ]
        },
      },
      lineWidth: 1,
            marker: {
            enabled: false
            },
            shadow: false,
            states: {
            hover: {
                lineWidth: 1
            }
            }
    },
};