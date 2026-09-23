# Deployment

## Build

```sh
npm ci
npm run test:seo
npm run build
```

Publish the contents of `dist/` to a static host.

## Routing

| URL | File |
| --- | --- |
| `/` | `/user-app/pages/login.html` |
| `/home` | `/user-app/pages/home.html` |
| `/admin` | `/admin-app/pages/login.html` |

Redirect `/login`, `/index.html` and `/portal.html` to `/`.
Public guide aliases redirect to their corresponding `.html` URLs.

`vercel.json` contains the complete route and response-header configuration for hosts that support it. For other hosts, carry over its redirects, rewrites, security headers and cache rules. This configuration does not connect the folder to a hosting account.

## Domain and database

Before publishing on a different domain, update the domain references in the content source and login page, regenerate the public pages, and check the sitemap and canonical URLs. Review database configuration separately as described in [database notes](SUPABASE.md).
