import { html } from 'lit';

export const routes = [
	withAction({
		name: 'browse',
		path: '/browse',
		template: html`<app-browse></app-browse>`,
		navbar: true
	}),
	withAction({
		name: 'browse.detail',
		path: '/browse/:id',
		template: html`<app-detail></app-detail>`,
		navbar: false
	}),
	withAction({
		name: 'counter',
		path: '/counter',
		template: html`<app-counter></app-counter>`,
		navbar: true
	}),
	withAction({
		name: 'jokes',
		path: '/jokes',
		template: html`<app-jokes></app-jokes>`,
		navbar: true
	}),
	withAction({
		name: 'datagrid',
		path: '/datagrid',
		template: html`<app-datagrid></app-datagrid>`,
		navbar: true
	}),
	withAction({
		name: 'charts',
		path: '/charts',
		template: html`<app-charts></app-charts>`,
		navbar: true
	}),
	withAction({
		name: 'form',
		path: '/form',
		template: html`<app-form></app-form>`,
		navbar: true
	}),
	withAction({
		name: 'widgets',
		path: '/widgets',
		template: html`<app-widgets></app-widgets>`,
		navbar: true
	}),
	{
		path: '*all',
		action: () => ({ redirect: '/browse' })
	}
];

function withAction(route) {
	route.action = (ctx) => ({
		...route,
		params: { ...ctx.params, ...ctx.queryParams }
	});

	return route;
}
