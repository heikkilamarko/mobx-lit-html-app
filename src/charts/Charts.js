import { html } from 'lit';
import { makeObservable, observable } from 'mobx';
import ApexCharts from 'apexcharts';
import en from 'apexcharts/dist/locales/en.json';
import fi from 'apexcharts/dist/locales/fi.json';
import { stores } from '../shared/stores';
import { addRenderReaction, addWatchReaction, clearReactions } from '../shared/utils';
import './Charts.scss';

export class Charts extends HTMLElement {
	charts = [];

	constructor() {
		super();
		makeObservable(this, {
			charts: observable.ref
		});
		this.charts = [{ el: createChartDiv() }, { el: createChartDiv() }];
	}

	connectedCallback() {
		addRenderReaction(this);

		addWatchReaction(
			this,
			() => stores.i18nStore.locale,
			() => this.createCharts(),
			{ fireImmediately: true }
		);

		addWatchReaction(
			this,
			() => stores.themeStore.theme,
			() => this.createCharts(),
			{ fireImmediately: true }
		);
	}

	disconnectedCallback() {
		clearReactions(this);

		this.charts.forEach(({ chart }) => chart?.destroy());
	}

	render() {
		return html`
			<div class="row g-3">
				${this.charts.map(
					(chart) => html`
						<div class="col-12 col-lg-6">
							<div class="card">
								<div class="card-body">
									<h4 class="card-title text-truncate mb-4">${chart.title}</h4>
									${chart.el}
								</div>
							</div>
						</div>
					`
				)}
			</div>
		`;
	}

	createCharts() {
		const {
			i18nStore: { locale, t },
			themeStore: { theme }
		} = stores;

		this.charts = [
			{
				...this.charts[0],
				title: t('charts.monthlysales'),
				options: {
					theme: {
						mode: theme
					},
					chart: {
						type: 'bar',
						stacked: true,
						height: 400,
						toolbar: {
							show: false
						},
						locales: [en, fi],
						defaultLocale: locale,
						background: 'transparent'
					},
					xaxis: {
						labels: {
							show: false
						},
						axisBorder: {
							show: false
						},
						axisTicks: {
							show: false
						}
					},
					dataLabels: {
						enabled: false
					},
					series: [
						{
							name: t('charts.clothing'),
							data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51, 42, 56]
						},
						{
							name: t('charts.food'),
							data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4]
						}
					]
				}
			},
			{
				...this.charts[1],
				title: t('charts.departmentsales'),
				options: {
					theme: {
						mode: theme
					},
					chart: {
						type: 'donut',
						height: 400,
						toolbar: {
							show: false
						},
						locales: [en, fi],
						defaultLocale: locale,
						background: 'transparent'
					},
					legend: {
						position: 'bottom'
					},
					dataLabels: {
						enabled: false
					},
					series: [21, 23, 19, 14, 6],
					labels: [
						t('charts.clothing'),
						t('charts.food'),
						t('charts.electronics'),
						t('charts.kitchen'),
						t('charts.gardening')
					]
				}
			}
		];

		this.charts.forEach((chart) => {
			chart.chart?.destroy();
			chart.chart = new ApexCharts(chart.el, chart.options);
			chart.chart.render();
		});
	}
}

function createChartDiv() {
	const div = document.createElement('div');
	div.classList.add('app-chart');
	return div;
}
