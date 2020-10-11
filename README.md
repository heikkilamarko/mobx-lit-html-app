# MobX ❤️ lit-html App

This repository contains the source code of a simple responsive web application written in the following framework-agnostic technologies:

- [MobX](https://mobx.js.org/)
- [lit-html](https://lit-html.polymer-project.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Router5](https://router5.js.org/)
- [ag-Grid](https://www.ag-grid.com/)
- [ApexCharts](https://apexcharts.com/).

Build tool: [Snowpack](https://www.snowpack.dev/)

See the app running [here](https://app-mobx-lit-html-app.azurewebsites.net/).

## Development

```bash
> npm i
> npm start
```

## Bundle for production

```bash
> npm run build
```

## Test-drive the production bundle

```bash
> npx serve -s build
```

## Run as Docker container

```bash
> docker-compose up --build
> open http://localhost:5000
```
