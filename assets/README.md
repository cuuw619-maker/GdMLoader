# Assets

The game bundle requests Geometry Dash resources from `assets/<filename>`. `loader.js` transparently resolves these legacy paths through `asset-map.json`, which points to the matching Web Dashers asset folders.

Keep this directory as the compatibility root. New local resources can be added here when a mod needs them.
