import { html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import LightThemeIcon from 'bootstrap-icons/icons/sun-fill.svg?raw';
import DarkThemeIcon from 'bootstrap-icons/icons/moon-fill.svg?raw';
import { stores } from '../shared/stores';
import { addRenderReaction, clearReactions } from '../shared/utils';

const THEMES = [
	{
		id: 'light',
		labelKey: 'theme.light',
		icon: LightThemeIcon
	},
	{
		id: 'dark',
		labelKey: 'theme.dark',
		icon: DarkThemeIcon
	}
];

export class ThemePicker extends HTMLElement {
	connectedCallback() {
		addRenderReaction(this);
	}

	disconnectedCallback() {
		clearReactions(this);
	}

	render() {
		const {
			i18nStore: { t },
			themeStore: { theme }
		} = stores;

		const icon = unsafeSVG(theme === 'light' ? LightThemeIcon : DarkThemeIcon);

		return html`
			<a
				class="nav-link dropdown-toggle"
				href="#"
				id="themeDropdown"
				role="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				${icon}
			</a>
			<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="themeDropdown">
				${THEMES.map(
					(item) => html`
						<li>
							<a class="dropdown-item" href @click=${(event) => this.handleClick(event, item.id)}>
								<span class="text-primary pe-2">${unsafeSVG(item.icon)}</span>
								${t(item.labelKey)}</a
							>
						</li>
					`
				)}
			</ul>
		`;
	}

	handleClick(event, theme) {
		event.preventDefault();
		stores.themeStore.setTheme(theme);
	}
}
