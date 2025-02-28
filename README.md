# trauer-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Project Structure

This project is built using Vite, Vue 3, and Vue Router. The following is the structure of the project:

Public Folder
The public folder contains various JSON files that are fetched for different parts of the application:

fetch("/person.json").then((res) => res.json())
fetch("/obituaries.json").then((res) => res.json())
fetch("/video.json").then((res) => res.json())
fetch("/candles.json").then((res) => res.json())
fetch("/condolences.json").then((res) => res.json())

Assets Folder
This folder holds JavaScript and CSS files for the project.

Source (src) Folder

Components: This folder contains reusable components used across the application.

Layouts: Different layouts used in the application:

Admin Layout (Dashboard)
Default Website Layout
Empty Layout (without header/footer)
Router: Contains route definitions for the website.

Stores (Pinia): Used for state management.

Views: This folder holds the homepage and other views/pages of the application.

main.js
The entry point of the project, where the root files are initialized.

jsconfig.js
Configuration file for the Vue components compiler.

vite.config.js
Configuration file for the build tool, Vite.

### Visualize Vite bundle

https://www.npmjs.com/package/vite-bundle-visualizer

### Why OKLCH in CSS

https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
