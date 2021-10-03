import { html, nothing } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { Grid } from 'ag-grid-community';
import { stores } from '../shared/stores';
import {
  addRenderReaction,
  addWatchReaction,
  clearReactions,
} from '../shared/utils';
import NameCellRenderer from './NameCellRenderer';

const APP_DATAGRID_STORAGE_KEY = 'app-datagrid';

export class Datagrid extends HTMLElement {
  connectedCallback() {
    addRenderReaction(this);

    addWatchReaction(
      this,
      () => stores.i18nStore.locale,
      () => {
        this.grid?.destroy();
        this.grid = createGrid(this.gridDiv, stores.datagridStore.rows);
      },
    );

    addWatchReaction(
      this,
      () => stores.datagridStore.rows,
      (rows) => {
        if (!this.grid) {
          this.grid = createGrid(this.gridDiv, rows);
        } else {
          this.gridApi.setRowData(rows);
        }
      },
    );

    stores.datagridStore.load();
  }

  disconnectedCallback() {
    clearReactions(this);

    if (!this.grid) return;

    sessionStorage.setItem(
      APP_DATAGRID_STORAGE_KEY,
      JSON.stringify({
        columnState: this.gridColumnApi.getColumnState(),
        filterModel: this.gridApi.getFilterModel(),
        pageSize: this.gridApi.paginationGetPageSize(),
        currentPage: this.gridApi.paginationGetCurrentPage(),
      }),
    );

    this.grid?.destroy();
    this.grid = null;
  }

  render() {
    const { isLoading, hasError, error } = stores.datagridStore;

    if (isLoading) {
      return nothing;
    }

    if (hasError) {
      return html`<app-error-card .text=${error.message}></app-error-card>`;
    }

    return html`<div
      class="ag-theme-alpine"
      style="height:36rem"
      ${ref((el) => (this.gridDiv = el))}
    ></div>`;
  }

  get gridApi() {
    return this.grid.gridOptions.api;
  }

  get gridColumnApi() {
    return this.grid.gridOptions.columnApi;
  }
}

function createGrid(gridDiv, rowData) {
  const defaultColDef = {
    headerValueGetter,
    lockVisible: true,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    filterParams: { newRowsAction: 'keep' },
  };

  const columnDefs = [
    { field: 'name', sort: 'asc', cellRenderer: NameCellRenderer },
    { field: 'language' },
    { field: 'country' },
    { field: 'job_title' },
    { field: 'notes' },
  ];

  const gridOptions = {
    defaultColDef,
    columnDefs,
    rowData,
    pagination: true,
    paginationPageSize: 50,
    // domLayout: 'autoHeight',
    localeTextFunc: localeTextFunc.bind(this),
    onFirstDataRendered: onFirstDataRendered.bind(this),
  };

  return new Grid(gridDiv, gridOptions);
}

function headerValueGetter({ colDef }) {
  return stores.i18nStore.t(`datagrid.${colDef.field}`);
}

function localeTextFunc(key, defaultValue) {
  return stores.i18nStore.t(`ag_grid.${key}`, null, defaultValue);
}

function onFirstDataRendered({ api, columnApi }) {
  let state = sessionStorage.getItem(APP_DATAGRID_STORAGE_KEY);

  if (state) {
    state = JSON.parse(state);
    columnApi.applyColumnState({ state: state.columnState });
    api.setFilterModel(state.filterModel);
    api.paginationSetPageSize(state.pageSize);
    api.paginationGoToPage(state.currentPage);
  } else {
    columnApi.autoSizeAllColumns();
  }
}
