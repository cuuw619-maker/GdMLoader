# Web mods

Add a JavaScript module to this folder and put its filename in mods.json.

```js
export default api => {
  api.on("gameReady", () => console.log("mod loaded"));
};
```

Mods are loaded before game.js.
