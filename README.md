# PeerX Website

**PeerX** turns an organization account into a signed pass in the device wallet. This repository holds [peerx.org](https://peerx.org) — the landing page, the App Clip entry point, and the site association that routes Universal Links and App Clip invocations.

## Overview

A static site: hand-written HTML, one stylesheet, and a small script for the language toggle and reveal-on-scroll. No build step and no dependencies. The page adapts to the visitor's platform — Apple Wallet on iOS, the app download on Android, both on desktop — and to the system language, English or Russian.

The App Clip flow depends on `/.well-known/apple-app-site-association`. The `_headers` file serves it uncached and unindexed.

## Structure

```
website/
├── index.html                 # Landing page
├── clip/index.html            # App Clip page
├── privacy/index.html         # Privacy policy
├── support/index.html         # Support and FAQ
├── assets/                    # Styles, script, logos
├── .well-known/
│   └── apple-app-site-association
├── _headers                   # Cache and indexing rules
└── wrangler.jsonc             # Cloudflare Workers config
```

## Development

Served by Cloudflare Workers with [Wrangler](https://developers.cloudflare.com/workers/wrangler/):

```sh
wrangler dev      # local preview
wrangler deploy   # publish
```

Static files are served as-is from the repository root; there is nothing to compile.

## License

PeerX is released under the BSD 3-Clause License. See [LICENSE](LICENSE).
