<p align="center"><img src="app/icon-192.png" width="96" alt="HQ"></p>
<h1 align="center">HQ</h1>
<p align="center">A personal command console — work, calendar, tasks, fitness, money, habits, notes.<br>One file. Your own Cloudflare Worker. Your own passphrase. Your data, encrypted where it matters.</p>

---

## Deploy your own (browser only, ~5 minutes, free)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Storage & Databases → Workers KV → Create** → name it `HQ_KV`
2. **Compute → Workers & Pages → Create → Start with Hello World** → name it (e.g. `hq`) → Deploy
3. **Edit code** → select all → paste the contents of [`worker/worker.js`](worker/worker.js) → **Deploy**
4. Worker → **Settings → Bindings → Add → KV namespace** → variable name `HQ_KV` → pick the namespace → Save
5. Open your worker URL → **FIRST RUN** screen → create the door passphrase → in-app onboarding (name, areas, modules, daily goal, theme)

Install it: iPhone → Safari → Share → *Add to Home Screen*. Desktop → install icon in the address bar. Works offline; syncs across all your devices.

### Optional variables (Worker → Settings → Variables and Secrets)
| Name | Type | What it does |
|---|---|---|
| `PASSPHRASE` | text | Override the first-run passphrase |
| `ANTHROPIC_API_KEY` | secret | Turns the fitness coach into real Claude |
| `ALERT_EMAIL` + `RESEND_API_KEY` | text + secret | Email you on failed door attempts (or `WEB3FORMS_KEY`) |
| `ALERT_FROM` | text | Sender for Resend (verified domain) |

## Features
- **Overview** — customizable blocks (reorder / hide), power level, live ticker
- **Profile** — avatar, banner, accent, **ten themes with living animated atmospheres** (Broadcast, Oracle, Phosphor, Violet, Daylight, Neon, Ember, Arctic, Monolith, Sakura), decorations earned by using the app, custom painted art
- **Calendar** — month · week · agenda; Sun/Mon start; iOS-style on mobile with swipe + day list
- **Work** — projects grouped by your own areas
- **Tasks** — kanban, priorities, edit, undo
- **Fitness** — any daily movement, 8-week ramp, programmed sessions, coach
- **Golf** (optional) — skill radar, practice lab, bag gapping, rounds
- **Money** — ledger, partner 50/50 splits, **AES-encrypted** portfolio vault with live quotes
- **Habits** — streak grid
- **Notes** — search, pin, folders, **AES-locked** notes, iOS-style on mobile
- **Settings** — modules on/off, areas editor, cloud snapshots (7 days), security, door log, export/import

## Themes
<p align="center"><img src="docs/themes.png" width="820" alt="Themes"></p>
Every theme drives its own canvas atmosphere: glyph rain, perspective grid, rising embers, aurora ribbons, film grain, falling petals. All respect `prefers-reduced-motion` and stay off on phones.

## Security model
Salted passphrase hash · HttpOnly HMAC session cookie · login throttled (8 fails / 15 min) · breach screen + door log · logout · stale-write rejection on sync · rolling daily snapshots · vault + locked notes encrypted client-side (PBKDF2 → AES-256-GCM); ciphertext is what reaches storage, cloud, and exports.

## Repo layout
```
worker/worker.js     ← the deployable (app embedded); paste this into Cloudflare
app/                 ← readable source: index.html, sw.js, manifest, icons
docs/                ← decoration art spec
```
`worker/worker.js` is generated from `app/` — edit the app, then re-embed (see below).

## Rebuild the worker after editing `app/`
```bash
python3 scripts/embed.py   # rewrites worker/worker.js with app/ contents
```

## Multi-user / SaaS
This is one HQ per Worker. To host many users on one domain, put auth in front (Cloudflare Access, Clerk…) and key KV per user (`state:{uid}`, `media:{uid}`, `backup:{uid}:{day}`); the app already talks to `/api/state`, `/api/media`, `/api/backup`.

## License
MIT
