import ApexCharts from 'apexcharts';
import en from 'apexcharts/dist/locales/en.json';
import fi from 'apexcharts/dist/locales/fi.json';
import { stores } from '../stores';
import { addWatchReaction, clearReactions, getPrimaryColor } from '../utils';

class AppCharts extends HTMLElement {
  connectedCallback() {
    this.chartDiv = document.createElement('div');
    this.appendChild(this.chartDiv);

    addWatchReaction(
      this,
      () => stores.i18nStore.locale,
      () => this.createChart(),
      { fireImmediately: true },
    );
  }

  disconnectedCallback() {
    clearReactions(this);

    this.chart?.destroy();
    this.chart = null;
  }

  createChart() {
    const { locale, t } = stores.i18nStore;

    const options = {
      colors: [getPrimaryColor()],
      chart: {
        locales: [en, fi],
        defaultLocale: locale,
        type: 'line',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: true,
        },
      },
      series: [
        {
          name: t('charts.sales'),
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    };

    this.chart?.destroy();
    this.chart = new ApexCharts(this.chartDiv, options);
    this.chart.render();
  }
}

customElements.define('app-charts', AppCharts);
