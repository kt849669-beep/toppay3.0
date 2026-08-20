import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Helper to find all HTML files dynamically
function getHtmlFiles(dir, fileList = {}) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = resolve(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      // Build artefacts and dependency folders never contain source HTML.
      const ignoredDirs = ['node_modules', 'dist', 'build', 'coverage', 'public'];

      // Any nested folder carrying its own package.json is a SEPARATE project
      // vendored inside this repo. Its index.html must never become a build
      // input: Vite would resolve that file's root-absolute imports (e.g.
      // "/src/main.tsx") against THIS project's root, breaking the build -- and
      // if it did build, the page would deploy to the live domain as duplicate
      // content. Detecting it by package.json means no folder name to maintain.
      const isNestedProject = fs.existsSync(resolve(fullPath, 'package.json'));

      // Dot-folders (.git, .next, .vercel, ...) are always skipped.
      const isHidden = file.startsWith('.');

      if (!ignoredDirs.includes(file) && !isNestedProject && !isHidden) {
        getHtmlFiles(fullPath, fileList);
      }
    } else if (file.endsWith('.html')) {
      // Use relative path as the key name
      let name = fullPath.replace(__dirname, '').replace(/\\/g, '/').substring(1).replace('.html', '');
      // E.g. user-app/pages/login
      fileList[name] = fullPath;
    }
  }
  return fileList;
}

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'toppay-local-routes',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const routes = {
              '/': '/user-app/pages/login.html',
              '/login': '/user-app/pages/login.html',
              '/home': '/user-app/pages/home.html',
              '/admin': '/admin-app/pages/login.html',
            };
            const pathname = new URL(req.url || '/', 'http://localhost').pathname;
            if (routes[pathname]) {
              res.statusCode = 302;
              res.setHeader('Location', routes[pathname]);
              res.end();
              return;
            }
            next();
          });
        },
      },
    ],
    server: {
      port: 3000,
      host: '0.0.0.0'
    },
    // This is a standalone plain-CSS project. Do not inherit a PostCSS config
    // from a parent workspace when the repository is checked out inside one.
    css: {
      postcss: {
        plugins: []
      }
    },
    build: {
      rollupOptions: {
        input: getHtmlFiles(__dirname)
      }
    }
  };
});
