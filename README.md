# Coin and Company MVP

## Run it

Extract the folder and double-click `index.html`. No Python server or Bash file is required.

The separate JSON and module files remain as development references, but the playable page uses `bundle.js`, which contains the data and engine in one browser-safe file.

After changing `engine/game.js` or data files, rebuild the standalone browser file:

```powershell
node scripts/build-bundle.js
```
