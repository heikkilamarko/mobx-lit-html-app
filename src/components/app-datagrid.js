import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid } from 'ag-grid-community';
import { stores } from '../stores';
import { addWatchReaction, clearReactions } from '../utils';
import './app-datagrid.css';

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
  };

  const columnDefs = [
    { field: 'name', sort: 'asc' },
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
    localeTextFunc,
    onRowDataChanged,
  };

  return new Grid(gridDiv, gridOptions);
}

function headerValueGetter({ colDef }) {
  return stores.i18nStore.t(`datagrid.${colDef.field}`);
}

function localeTextFunc(key, defaultValue) {
  return stores.i18nStore.t(`ag_grid.${key}`, null, defaultValue);
}

function onRowDataChanged({ columnApi }) {
  columnApi.autoSizeAllColumns();
}

class AppDatagrid extends HTMLElement {
  connectedCallback() {
    this.gridDiv = createGridDiv();
    this.grid = createGrid(this.gridDiv, stores.datagridStore.rows);
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
      (rows) => this.gridApi?.setRowData(rows),
    );

    stores.datagridStore.load();
  }

  disconnectedCallback() {
    clearReactions(this);

    this.grid?.destroy();
    this.grid = null;
  }

  get gridApi() {
    return this.grid?.gridOptions.api;
  }
}

customElements.define('app-datagrid', AppDatagrid);
