<div align="center">

<img src="./MLLogo.png" width="160" alt="GdMLoader logo">

# GdMLoader

**Mod loader for the Geometry Dash Web version.**

[Open GdMLoader](https://cuuw619-maker.github.io/GdMLoader/) · [GitHub Repository](https://github.com/cuuw619-maker/GdMLoader)

</div>

## Features

- Compact loader: `index.html → loader.js → mods → game.js`
- JavaScript mods from `mods.json`
- Menu registration and hooks
- `GDMLHook()` and event API
- Existing Geometry Dash Web game bundle
- User-activation startup for browser AudioContext policy
- `bigFont` fallback assets

## Mod example

```js
export default api => {
  api.on("gameReady", () => console.log("GdMLoader: game ready"));

  api.menu.register("myMenu", {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed")
  });
};
```

Add the file to `mods/` and its filename to `mods.json`.

## Web version

**Launch:** https://cuuw619-maker.github.io/GdMLoader/

**Source:** https://github.com/cuuw619-maker/GdMLoader
