import { ColumnState, FilterModel } from 'ag-grid-community';

export interface DatagridState {
  columnState: ColumnState[];
  filterModel: FilterModel;
  pageSize: number;
  currentPage: number;
}
