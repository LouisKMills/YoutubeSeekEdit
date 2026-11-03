# Development notes

## Status

Code is complete for the current spec (v1.1.1). Still to do:

- [ ] Test in Firefox: ← → J L on a normal video, on Shorts, in fullscreen; arrows
      still move the cursor when typing in the search box or a comment.
- [ ] Publish to addons.mozilla.org (see below).

## Rules

- **Bump `version` in `manifest.json` with every functionality change** (anything
  that changes the shipped extension). Patch for fixes (1.1.1 → 1.1.2), minor for
  new features (1.1.x → 1.2.0). AMO rejects an upload whose version isn't higher.
- Keep it minimal. Depend only on standard web APIs (key events, the `<video>`
  element, `browser.storage`), never on YouTube's internal player, class names or
  page structure — those change often and are what break similar extensions.
- Run `npx web-ext lint` before committing; it should report 0 errors/warnings.

## How it works

- `content.js` adds a capture-phase `keydown` listener on `window` at
  `document_start`, so it runs before YouTube's handlers. For ← → J L with no
  modifier keys, outside text fields, it blocks the event and sets
  `video.currentTime` itself (on the playing `<video>`, else the first one).
- Settings `arrow` and `jl` (seconds, default 1) live in `browser.storage.sync`.
  `options.html` is used both as the toolbar popup and the Options page.
- Trade-off: YouTube's "5 seconds" seek bubble no longer shows, because recreating
  it would mean depending on YouTube's internals.

## Manifest notes

- Add-on ID `youtube-seek-edit@LouisKMills` is permanent once uploaded to AMO.
- `data_collection_permissions: { required: ["none"] }` is required by AMO for new
  add-ons; it needs `strict_min_version` 142 (Firefox for Android support).

## Publishing to AMO

1. `npx web-ext build` → `web-ext-artifacts/youtube_seek_edit-<version>.zip`
   (git-ignored).
2. https://addons.mozilla.org/developers/ → Submit a New Add-on → "On this site".
3. Source code requested? No (code isn't minified or bundled).
4. Listing: category Photos, Music & Videos; license MIT; no privacy policy needed
   (no data collected); homepage https://github.com/LouisKMills/YoutubeSeekEdit.
5. Updates: bump version, rebuild, "Upload New Version" on the add-on's AMO page.

## Repo

Commits in this repo use the GitHub noreply address
(`109905179+LouisKMills@users.noreply.github.com`), set in the repo's local git
config, so no personal email is published.
