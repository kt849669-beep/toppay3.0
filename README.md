# TopPay

Mobile web application with user and administrator panels, backed by Supabase.

## Local development

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` for the user login or `http://localhost:3000/admin` for the administrator login.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run generate:seo` | Generate guides, robots.txt and sitemap.xml |
| `npm run build` | Generate public pages and build into dist/ |
| `npm run preview` | Serve the built static files locally |
| `npm run test:seo` | Check metadata, canonical URLs, links and sitemap entries |

The preview server serves file paths directly. Use `/user-app/pages/login.html` or `/admin-app/pages/login.html` when previewing a build.

## Project layout

| Directory | Contents |
| --- | --- |
| `user-app/` | User pages, styles and browser scripts |
| `admin-app/` | Administrator pages, styles and browser scripts |
| `public/` | Public assets and generated guides |
| `shared/` | Shared styles, components and utilities |
| `database/` | Database schema and policy files |
| `tests/` | SEO audit |
| `docs/` | Project, deployment and database notes |

See [project notes](docs/PROJECT.md), [deployment](docs/DEPLOYMENT.md) and [database configuration](docs/SUPABASE.md).

## Configuration

The active browser database client is in `user-app/js/config/supabase.js`.
The public site domain and guide content are maintained in `seo-content.cjs`.
Changing a hosting account does not update these values automatically.

`vercel.json` defines routing and response headers. It contains no account, project ID or repository connection.
