<div align="center">

<img src="./assets/local/branding/MLLogo.png" width="160" alt="GdMLoader">

# GdMLoader

**Web mod loader for Geometry Dash Web.**

[Open GdMLoader](https://cuuw619-maker.github.io/GdMLoader/) · [GitHub](https://github.com/cuuw619-maker/GdMLoader)

</div>

## What it is

GdMLoader is a browser-side mod loader built around the existing Geometry Dash Web game. The loader UI is integrated into the game page instead of being a separate menu or demo page.

The project is structured so that the game runtime, loader, configuration, local assets and future mods are separated.

## Project structure

```text
GdMLoader/
├── index.html
├── src/
│   ├── game.js       # game bundle
│   ├── loader.js     # loader/runtime
│   ├── ui.js         # in-game loader interface
│   └── style.css     # interface/layout styles
├── config/
│   ├── asset-map.json
│   └── mods.json
├── mods/             # future JavaScript mods
└── assets/
    └── local/
        ├── branding/
        ├── fonts/
        ├── game/
        └── ui/
```

## In-game loader

After Geometry Dash starts, the GdMLoader control is available directly over the game. It opens the loader without leaving the game.

The interface currently contains:

- Mods — loaded mod count and GitHub access.
- Levels — level IDs, names and search.
- Settings — persistent loader preferences.
- RobTop Games attribution.
- GdMLoader branding using the project's local logo.

The panel can also be opened with **F6**.

## Levels

The level browser reads level data from `config/asset-map.json`. Selecting a level stores it in `GDML.selectedLevel` and emits:

```js
api.on("levelSelect", level => {
  console.log(level.id, level.name, level.file);
});
```

The browser is an interface layer; actual game-level loading remains handled by the game runtime.

## Mods

Enabled JavaScript mods are listed in `config/mods.json`.

Example:

```json
[
  "example.js"
]
```

A mod can use the GdMLoader API:

```js
export default api => {
  api.on("gameReady", () => {
    console.log("Game is ready");
  });

  api.menu.register("myMenu", {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed")
  });
};
```

## Asset system

External Geometry Dash Web assets are resolved through `config/asset-map.json`.

GdMLoader's own files are kept under `assets/local/`, preventing the repository root from becoming a flat asset dump.

## Attribution

Geometry Dash and its original game assets are property of **RobTop Games**. GdMLoader is an independent third-party project and is not presented as an official RobTop Games product.

## Links

- Web: https://cuuw619-maker.github.io/GdMLoader/
- Repository: https://github.com/cuuw619-maker/GdMLoader
