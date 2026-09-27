# Web mods

Add a JavaScript module to this folder and put its filename in mods.json.

```js
export default api => {
  api.on("gameReady", () => console.log("mod loaded"));
  api.on("menuOpen", name => console.log("open:", name));
};
```

## Menu hooks

The loader exposes a small menu layer so mods do not have to depend on internal bundle names:

```js
api.menu.register("settings", {
  onOpen: () => console.log("settings opened"),
  onClose: () => console.log("settings closed")
});

api.on("menuOpen", name => {
  if (name === "settings") console.log("settings hook");
});

api.menu.open("settings");
api.menu.close("settings");
```

`api.menu.list()` returns registered menu names. `api.menu.get(name)` returns a registered menu API.

Mods are loaded before `game.js`, so hooks can be registered before the game starts.
