import { Grid } from 'ag-grid-community';
import { stores } from '../stores';
import { addWatchReaction, clearReactions } from '../utils';
import NameCellRenderer from './datagrid/NameCellRenderer';
import './app-datagrid.scss';

function createGridDiv() {
  const div = document.createElement('div');
  div.classList.add('ag-theme-alpine', 'app-datagrid');
  return div;
}

function createGrid(gridDiv, rowData) {
  const defaultColDef = {
    headerValueGetter,
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
    paginationPageSize: 10,
    domLayout: 'autoHeight',
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
  let state = sessionStorage.getItem('app-gridstate');

  if (state) {
    state = JSON.parse(state);
    columnApi.setColumnState(state.columnState);
    api.setFilterModel(state.filterModel);
    api.paginationSetPageSize(state.pageSize);
    api.paginationGoToPage(state.currentPage);
  } else {
    columnApi.autoSizeAllColumns();
  }
}

class AppDatagrid extends HTMLElement {
  connectedCallback() {
    this.gridDiv = createGridDiv();
    this.appendChild(this.gridDiv);

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
      'app-gridstate',
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

  get gridApi() {
    return this.grid.gridOptions.api;
  }

  get gridColumnApi() {
    return this.grid.gridOptions.columnApi;
  }
}

customElements.define('app-datagrid', AppDatagrid);
