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

In `package.json`:

```json
  "type": "module",
```

> <https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling>

This is different than using a babel precompiler. Imports must contain file extensions. Shorthands such as `import dotenv/config` do not work. Some global variables like `__dirname` are not accessible.

### Configure environment variables

```sh
touch .env
npm install --save dotenv dotenv-expand
```

## TODO: wpis co i jak

Jednym z elementów tokena jest jego czas życia. Tak długo jak token jest ważny tak długo można go używać bez konieczności sprawdzania użytkownika w bazie danych. I tutaj rodzi się problem – co jeśli ktoś wykradnie taki latający non stop token? Będzie miał dostęp do wszystkich zasobów tego użytkownika. Aby się przed tym jak najbardziej zabezpieczyć powinno się tworzyć tokeny ważne maksymalnie kilka minut. Jednak w takim przypadku użytkownik po kilku minutach korzystania z aplikacji dostawał by informację, że jego sesja wygasła i musi się zalogować ponownie.
Również na ten problem znaleziono rozwiązanie. Jest nim mianowicie drugi token służący do odświeżania tego głównego. Ma on zdecydowanie dłuższy czas życia i zawiera jedynie informacje potrzebne do dostania nowego tokena. Nie da się bezpośrednio za jego pomocą dostać do zasobów. Jest używany w przypadku kiedy główny token wygaśnie.


It's not easy to log out when using a jwt. You cannot manually expire a token after it has been created. One way to do this is to add it to a blacklist on logout. But then you need to query this list on any authorization attempt...
