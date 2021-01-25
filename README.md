# MERN Auth template

## Server

```sh
npx express-generator --no-view --git server
cd server
npm install
```

### Initial cleanup

- Add `.js` extension to the `bin/www` file. *(This is instead of an `index.js` file)*  
- Move the source code to a new `src/` folder *(This requires changing all the relative paths)*

### Configure nodemon

```sh
npm install --save-dev nodemon
```

In `package.json`:

```json
"scripts.start": "nodemon ./src/bin/www",
```

### Configure ES6 configuration

> <https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling>

In `package.json`:

```json
  "type": "module",
```

### Configure environment variables

```sh
touch .env
npm install --save dotenv dotenv-expand
```
