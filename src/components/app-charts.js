import ApexCharts from 'apexcharts';

function createChartDiv() {
  return document.createElement('div');
}

class AppCharts extends HTMLElement {
  connectedCallback() {
    this.chartDiv = createChartDiv();
    this.appendChild(this.chartDiv);

    var options = {
      chart: {
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: 'sales',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    };

    this.chart = new ApexCharts(this.chartDiv, options);
    this.chart.render();
  }

  disconnectedCallback() {
    this.chart?.destroy();
  }
}

customElements.define('app-charts', AppCharts);
