# sveltekit-build-test

When I was trying to upgrade our sveltekit from `1.0.0-next.355` to `1.0.0-next.504`, I faced a problem of building. Building was successfully done, but when I accessed to certain endpoints, 500 internal server error occurs.

This repository is to test building with the latest sveltekit in `main` branch, and older version of sveltekit in [downgrade-sveltekit](https://github.com/UNDP-Data/sveltekit-build-test/tree/downgrade-sveltekit) branch.

## settings

```zsh
cp .env.example .env
vi .env

# set some environmental variables
# for /azstorage.json endpoint
# create and Azure Blob container and set the account name and access key
VITE_AZURE_STORAGE_ACCOUNT=
VITE_AZURE_STORAGE_ACCESS_KEY=

# for /postgres.json endpoint
# prepare PostgreSQL database and set the connection string for your database
VITE_DATABASE_CONNECTION=
```

## reproduction procedure

- install

```zsh
yarn
```

- `yarn run dev`

```zsh
yarn run dev
```

access to [localhost:5173/azstorage.json](http://localhost:5173/azstorage.json) or [localhost:5173/postgres.json](http://localhost:5173/postgres.json).

Endpoint will be done successfully through `yarn run dev`

- `yarn run build`

```zsh
yarn run build
```

now, package is generated under `build` folder

- `yarn run preview`

access to [localhost:4173/azstorage.json](http://localhost:4173/azstorage.json) or [localhost:4173/postgres.json](http://localhost:4173/postgres.json).

Endpoint will be done successfully through `yarn run preview`

- `node build/index.js`

```zsh
node build/index.js

# or

node build
```

1. access to [localhost:3000/azstorage.json](http://localhost:3000/azstorage.json)

return 500 error and the following error occurs in the server side.

```zsh
Listening on 0.0.0.0:3000
Error: Not found: /service-worker.js
    at resolve (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2850:18)
    at resolve (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2873:34)
    at options.hooks.handle (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:3018:59)
    at respond (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2871:42)
Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '/Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/node_modules/punycode/' is not supported resolving ES modules imported from /Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/chunks/_server.ts-f8dfcb54.js
Did you mean to import punycode/punycode.js?
    at new NodeError (node:internal/errors:393:5)
    at finalizeResolution (node:internal/modules/esm/resolve:301:17)
    at moduleResolve (node:internal/modules/esm/resolve:866:10)
    at defaultResolve (node:internal/modules/esm/resolve:1074:11)
    at nextResolve (node:internal/modules/esm/loader:163:28)
    at ESMLoader.resolve (node:internal/modules/esm/loader:838:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:425:18)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:76:40)
    at link (node:internal/modules/esm/module_job:75:36)
Error: Not found: /service-worker.js
    at resolve (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2850:18)
    at resolve (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2873:34)
    at options.hooks.handle (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:3018:59)
    at respond (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2871:42)
```

2. access to [localhost:3000/postgres.json](http://localhost:3000/postgres.json).

return 500 error and the following error occurs in the server side.

```zsh
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'pg-native' imported from /Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/chunks/_server.ts-0d98246d.js
    at new NodeError (node:internal/errors:393:5)
    at packageResolve (node:internal/modules/esm/resolve:810:9)
    at moduleResolve (node:internal/modules/esm/resolve:859:20)
    at defaultResolve (node:internal/modules/esm/resolve:1074:11)
    at nextResolve (node:internal/modules/esm/loader:163:28)
    at ESMLoader.resolve (node:internal/modules/esm/loader:838:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:425:18)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:76:40)
    at link (node:internal/modules/esm/module_job:75:36)
Error: Not found: /service-worker.js
    at resolve (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2850:18)
    at resolve (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2873:34)
    at options.hooks.handle (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:3018:59)
    at respond (file:///Users/j_igarashi/Documents/git/UNDP-Data/geohub-migration/build/server/index.js:2871:42)
```

- Test with old version of sveltekit and adapter-node

This branch [downgrade-sveltekit](https://github.com/UNDP-Data/sveltekit-build-test/tree/downgrade-sveltekit) uses following downgraded versions.

- "@sveltejs/adapter-node": "1.0.0-next.78"
- "@sveltejs/kit": "1.0.0-next.355"

All endpoints can be accessed either `yarn run dev` or `yarn run preview` or `node build`.

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
