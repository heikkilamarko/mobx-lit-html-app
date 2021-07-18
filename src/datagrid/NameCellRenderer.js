import { html, render } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import PersonFillIcon from 'bootstrap-icons/icons/person-fill.svg?raw';
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
    render(html`${unsafeSVG(PersonFillIcon)} ${value}`, this.gui);
  }
}
