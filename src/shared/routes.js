import { html } from 'lit';

export const routes = addActions([
	{
		name: 'browse',
		path: '/browse',
		template: html`<app-browse></app-browse>`,
		navbar: true
	},
	{
		name: 'browse.detail',
		path: '/browse/:id',
		template: html`<app-detail></app-detail>`,
		navbar: false
	},
	{
		name: 'counter',
		path: '/counter',
		template: html`<app-counter></app-counter>`,
		navbar: true
	},
	{
		name: 'jokes',
		path: '/jokes',
		template: html`<app-jokes></app-jokes>`,
		navbar: true
	},
	{
		name: 'datagrid',
		path: '/datagrid',
		template: html`<app-datagrid></app-datagrid>`,
		navbar: true
	},
	{
		name: 'charts',
		path: '/charts',
		template: html`<app-charts></app-charts>`,
		navbar: true
	},
	{
		name: 'form',
		path: '/form',
		template: html`<app-form></app-form>`,
		navbar: true
	},
	{
		name: 'widgets',
		path: '/widgets',
		template: html`<app-widgets></app-widgets>`,
		navbar: true
	}
]);

routes.push({
	path: '*all',
	action: () => ({ redirect: '/browse' })
});

function addActions(routes) {
	routes.forEach(
		(route) =>
			(route.action = (ctx) => ({
				...route,
				params: { ...ctx.params, ...ctx.queryParams }
			}))
	);

	return routes;
}
