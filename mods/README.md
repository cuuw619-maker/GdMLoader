# GdMLoader

Web mod loader for the Geometry Dash Web version.

## Project structure

- `index.html` — entry point.
- `src/loader.js` — loader/runtime and asset routing.
- `src/game.js` — bundled game.
- `src/ui.js` — GdMLoader interface, settings, GitHub and level browser.
- `src/style.css` — loader/game layout and UI styles.
- `config/asset-map.json` — external and local asset map.
- `config/mods.json` — enabled mods.
- `mods/` — JavaScript mods.
- `assets/local/` — local branding/game fallback assets.

## Loader UI

After the game starts, the GdMLoader button opens a panel with:

- installed mod count;
- GitHub button;
- level browser with search;
- settings;
- RobTop Games attribution;
- persistent UI preferences.

F6 toggles the loader panel.

## Mod API

The loader exposes `window.GDML`.

```js
export default api => {
  api.on("gameReady", () => {
    console.log("GdMLoader: game ready");
  });

  api.on("levelSelect", level => {
    console.log("Selected level:", level.id, level.name);
  });
};
```

Menu registration is also available:

```js
api.menu.register("settings", {
  onOpen: () => console.log("settings opened"),
  onClose: () => console.log("settings closed")
});
```

Enabled mods are listed in `config/mods.json` by filename.