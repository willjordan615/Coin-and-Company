# Coin and Company MVP

## Run it

Double-click `run_game.bat`. It starts a local Node server, rebuilds `bundle.js`, and opens the fresh served page.

The separate JSON and module files remain as development references, but the playable page uses `bundle.js`, which contains the data and engine in one browser-safe file.

After changing `engine/game.js` or data files, either rerun `run_game.bat` or rebuild the standalone browser file directly:

```powershell
node scripts/build-bundle.js
```

The local server exposes `http://localhost:<port>/__build-info` so you can confirm which build is being served.

## References

- [Trait reference](docs/traits.html): browsable live reference for every profession and trait, where it comes from, broad contract fit, generated contract uses, and special engine effects.
