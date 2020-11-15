import { html, render } from 'lit-html';
import { personFill } from '../icons';
import './NameCellRenderer.scss';

export default class NameCellRenderer {
  init(params) {
    this.gui = document.createElement('span');
    this.gui.classList.add('app-name-cell-renderer');
    this._renderGui(params.value);
  }

  getGui() {
    return this.gui;
  }

  refresh(params) {
    this._renderGui(params.value);
    return true;
  }

  destroy() {
    // Nothing to do
  }

  _renderGui(value) {
    render(html`${personFill()} ${value}`, this.gui);
  }
}
