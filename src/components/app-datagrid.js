import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid } from 'ag-grid-community';
import './app-datagrid.css';

class AppDatagrid extends HTMLElement {
  connectedCallback() {
    const defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    };

    const columnDefs = [
      { headerName: 'Name', field: 'name', sort: 'asc' },
      { headerName: 'Language', field: 'language' },
      { headerName: 'Country', field: 'country' },
    ];

    const rowData = [
      { name: 'Tony Smith', language: 'English', country: 'Ireland' },
      { name: 'Andrew Connell', language: 'Swedish', country: 'Sweden' },
      { name: 'Isabelle Black', language: 'French', country: 'France' },
    ];

    const gridOptions = {
      defaultColDef,
      columnDefs,
      rowData,
    };

    const gridDiv = document.createElement('div');
    gridDiv.classList.add('ag-theme-alpine', 'app-datagrid');

    this.grid = new Grid(gridDiv, gridOptions);

    this.appendChild(gridDiv);
  }

  disconnectedCallback() {
    this.grid?.destroy();
    this.grid = null;
  }
}

customElements.define('app-datagrid', AppDatagrid);
