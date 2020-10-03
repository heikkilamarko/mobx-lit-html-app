import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid } from 'ag-grid-community';
import { stores } from '../stores';
import './app-datagrid.css';
import { addWatchReaction, clearReactions } from '../utils';

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
    onRowDataChanged: ({ columnApi }) => columnApi.autoSizeAllColumns(),
  };

  return new Grid(gridDiv, gridOptions);
}

function headerValueGetter({ colDef }) {
  return stores.i18nStore.t(`datagrid.${colDef.field}`);
}

class AppDatagrid extends HTMLElement {
  connectedCallback() {
    const gridDiv = createGridDiv();
    const rowData = stores.datagridStore.rows;
    this.grid = createGrid(gridDiv, rowData);
    this.appendChild(gridDiv);

    addWatchReaction(
      this,
      () => stores.i18nStore.locale,
      () => this.gridApi?.refreshHeader(),
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
