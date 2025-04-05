import { html, nothing } from 'lit';
import { ref } from 'lit/directives/ref.js';
import {
	createGrid,
	AllCommunityModule,
	ModuleRegistry,
	themeBalham,
	colorSchemeLight,
	colorSchemeDark
} from 'ag-grid-community';
import { stores } from '../shared/stores';
import { addRenderReaction, addWatchReaction, clearReactions } from '../shared/utils';
import NameCellRenderer from './NameCellRenderer';

const lightTheme = themeBalham.withPart(colorSchemeLight).withParams({
	accentColor: 'var(--bs-primary)',
	browserColorScheme: 'light'
});

const darkTheme = themeBalham.withPart(colorSchemeDark).withParams({
	accentColor: 'var(--bs-primary)',
	browserColorScheme: 'dark'
});

ModuleRegistry.registerModules([AllCommunityModule]);

const APP_DATAGRID_STORAGE_KEY = 'app-datagrid';

export class Datagrid extends HTMLElement {
	connectedCallback() {
		addRenderReaction(this);

		addWatchReaction(
			this,
			() => stores.themeStore.theme,
			(themeMode) => {
				document.body.dataset.agThemeMode = themeMode;
				this.gridApi?.setGridOption('theme', themeMode === 'light' ? lightTheme : darkTheme);
			}
		);

		addWatchReaction(
			this,
			() => stores.i18nStore.locale,
			() => {
				this.gridApi?.destroy();
				this.gridApi = createDatagrid(this.gridDiv, stores.datagridStore.rows);
			}
		);

		addWatchReaction(
			this,
			() => stores.datagridStore.rows,
			(rows) => {
				if (!this.gridApi) {
					this.gridApi = createDatagrid(this.gridDiv, rows);
				} else {
					this.gridApi.setGridOption('rowData', rows);
				}
			}
		);

		stores.datagridStore.load();
	}

	disconnectedCallback() {
		clearReactions(this);

		if (!this.gridApi) return;

		sessionStorage.setItem(
			APP_DATAGRID_STORAGE_KEY,
			JSON.stringify({
				columnState: this.gridApi.getColumnState(),
				filterModel: this.gridApi.getFilterModel(),
				pageSize: this.gridApi.paginationGetPageSize(),
				currentPage: this.gridApi.paginationGetCurrentPage()
			})
		);

		this.gridApi?.destroy();
		this.gridApi = null;
	}

	render() {
		const {
			datagridStore: { isLoading, hasError, error }
		} = stores;

		if (isLoading) {
			return nothing;
		}

		if (hasError) {
			return html`<app-error-card .text=${error.message}></app-error-card>`;
		}

		return html`<div style="height:36rem" ${ref((el) => (this.gridDiv = el))}></div>`;
	}
}

function createDatagrid(gridDiv, rowData) {
	const defaultColDef = {
		headerValueGetter,
		lockVisible: true,
		sortable: true,
		filter: true,
		resizable: true,
		floatingFilter: true,
		filterParams: { newRowsAction: 'keep' }
	};

	/** @type {import('ag-grid-community').ColDef[]} */
	const columnDefs = [
		{ field: 'name', sort: 'asc', cellRenderer: NameCellRenderer },
		{ field: 'language' },
		{ field: 'country' },
		{ field: 'job_title' },
		{ field: 'notes' }
	];

	/** @type {import('ag-grid-community').GridOptions<any>} */
	const gridOptions = {
		theme: stores.themeStore.theme === 'light' ? lightTheme : darkTheme,
		defaultColDef,
		columnDefs,
		rowData,
		pagination: true,
		paginationPageSize: 50,
		getLocaleText: getLocaleText.bind(this),
		onFirstDataRendered: onFirstDataRendered.bind(this)
	};

	return createGrid(gridDiv, gridOptions);
}

function headerValueGetter({ colDef }) {
	return stores.i18nStore.t(`datagrid.${colDef.field}`);
}

function getLocaleText({ key, defaultValue }) {
	return stores.i18nStore.t(`ag_grid.${key}`, null, defaultValue);
}

function onFirstDataRendered(
	/** @type {import('ag-grid-community').FirstDataRenderedEvent<any, any>} */ { api }
) {
	const storedState = sessionStorage.getItem(APP_DATAGRID_STORAGE_KEY);

	if (storedState) {
		/** @type {import('./types').DatagridState} */
		const state = JSON.parse(storedState);
		api.applyColumnState({ state: state.columnState });
		api.setGridOption('paginationPageSize', state.pageSize);
		api.setFilterModel(state.filterModel);
		api.paginationGoToPage(state.currentPage);
	} else {
		api.autoSizeAllColumns();
	}
}
