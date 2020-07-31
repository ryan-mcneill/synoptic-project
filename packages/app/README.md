# ⚛️ App

## 📋 Contents

1. [📼 Technologies](#-technologies)
2. [🌳 Structure](#-structure)
3. [📝 Notes](#-notes)

## 📼 Technologies

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)

## 🌳 Structure

This repository features the following directories:

```
:
├─ @types
├─ build
├─ public
├─ src
|   ├─ __mocks__
|   ├─ __tests__
|   ├─ components
|   ├─ store
|   ├─ utils
|   └─ views
:
```

### `@types`

This directory contains type declaration files for modules that don't have them available in the
[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repository.

> There are a couple of modules used at the moment that are marked with `// @ts-ignore` that type files need to be
> written for.

### `build`

Contains the compiled build of the application. These files will be served running in production.

### `public`

Basic files for the React application to hook into.

### `src`

The main entry files for the application.

Specifically of note is `App.tsx`, the main root of the application, serving each of the main views. This is also the
file that launches the initial API calls for data. This file should not under any circumstances have state as part of it.
If state is added to this root file, each re-render would cause the application to re-fetch the data.

### `__mocks__`

This holds all of the mock data for tests.

### `__tests__`

Contains the test files and their snapshots.

### `components`

This contains each of the smaller components of each view. Some of these components are connected to state, whilst some
are not.

### `store`

This is the main entry to the redux implementation. The `types.ts` file contains all the constants and the types
for all the redux parts. If you're unsure about how anything is structured, this is the most useful file to check.

Everything else is structured in a fairly standard redux fashion, splitting the `actions` and `reducers` into their own
folders.

This redux store utilises the `redux-thunk` package along with `axios` to connect it to the middleware.

### `utils`

A few utility functions. Some are not necessarily common between files but have been extracted to increase readability
of code.

### `views`

The application has been split into four distinct views to help separate the code:
- `Menu` - this covers everything inside the pull out menu
- `MusicPlayer` - this contains all the code for the actual music player and the audio playing elements.
- `PageLoader` - this contains the loading icon that appears whilst data is fetching from the database on first load.
- `Timeout` - this contains the implementation of the timeout business requirement, this compliments the `pm2` library
which stores the application as a background process which does not close.

## 📝 Notes

Inline styles have been used for the majority of the styling of this application. This was on purpose, as if in the
future it needed to be ported to being a React Native application it would make it easier. (React Native being a more
mobile optimised version of the language).
