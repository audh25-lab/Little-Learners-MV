# Little Learners MV

A small, kid-friendly web app for early letter learning with a tropical theme.

## How this version works

- Uses `assets/fonts/funster.otf` as the main font.
- Letters page (Letters.html) generates A–Z using the Funster font.
- If you place `assets/letters/A.png`, `assets/letters/B.png`, ... these will be shown in a preview modal when a letter is tapped.
- Simple service worker caches key assets (edit `service-worker.js` to add/remove cache entries).

## Setup

1. Place the Funster font:
