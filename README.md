# Kannada Learning MVP

A simple offline web app to help kids practice Kannada matching:

- Left column: sound (Romanized)
- Right column: Kannada script
- Match pairs with instant feedback

## Included levels

- Varnamaale (full)
- Gunitaakshara (`ಕ` series)
- Ottakshara (basic conjuncts)

## Modes

- `Match Game`: classic left-right matching
- `Learning Mode` dropdown options:
  - `Gunitaakshara`
  - `Varnamaale (All)`
  - `Varnamaale (Swara)`
  - `Varnamaale (Vyanjana)`
- In `Gunitaakshara`, vowel signs are color-highlighted and shown as:
  - `ಕ + sign = full form`
- After a Gunitaakshara lesson, use `Practice Mistakes` to retry only missed letters.

## Run locally

From this folder:

```bash
python3 -m http.server 8080
```

Then open:

`http://localhost:8080`

## Publish on GitHub Pages

This repository is configured with a GitHub Actions workflow at:

- `.github/workflows/pages.yml`

### One-time setup in GitHub

1. Push your latest `main` branch to GitHub.
2. Open repository settings: `Settings` → `Pages`.
3. Under **Build and deployment**, choose:
   - **Source**: `GitHub Actions`
4. Wait for the `Deploy static site to GitHub Pages` workflow to complete.

### Your public URL

- Default project URL format:
  - `https://<github-username>.github.io/<repository-name>/`
- For this repo, it should be:
  - `https://smita3112.github.io/kannada_basic/`

### Optional custom domain

If you buy a domain later, add it in `Settings` → `Pages` → `Custom domain` and configure DNS at your registrar.

## Notes

- The app uses browser speech by default.
- If you add `audio` path per item in `data.js`, it will play that recording first.
- Place your recordings in these folders:
  - `audio/varnamaale/`
  - `audio/gunita/`
  - `audio/ottakshara/`
- Recommended file naming (if you choose to map by id):
  - `audio/varnamaale/aa.mp3`
  - `audio/gunita/ki.mp3`
  - `audio/ottakshara/kka.mp3`
- Supported formats: `.mp3`, `.m4a`, `.wav`.

Example mapping in `data.js`:

```js
{ id: "aa", sound: "ā (aa)", text: "ಆ", audio: "audio/varnamaale/aa.mp3" }
```

### Best audio quality tips

- Record one clear syllable per file with a short pause at end.
- Use a quiet room and hold phone mic at consistent distance.
- Keep each clip around `0.5s` to `1.2s` for quick response.
