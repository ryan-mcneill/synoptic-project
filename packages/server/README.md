# 🖥 Server

## 📋 Contents

1. [📼 Technologies](#-technologies)
2. [🌳 Structure](#-structure)
3. [🔌 API Documentation](#-api-documentation)
   1. [getAllSongs](#getallsongs)
   2. [getArtists](#getartists)
   3. [getSongsByArtist](#getsongsbyartist)
   4. [getAlbums](#getalbums)
   5. [getSongsByAlbum](#getsongsbyalbum)
   6. [getPlaylists](#getplaylists)
   7. [getSongsByPlaylist](#getsongsbyplaylist)
   8. [getSong](#getsong)
   9. [getAlbumArt](#getalbumart)
   10. [createPlaylist](#createplaylist)
   11. [updatePlaylist](#updateplaylist)

## 📼 Technologies

- [NodeJS](https://nodejs.org/)
- [ExpressJS](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)

## 🌳 Structure

This repository featrures the following directories:

```
:
├─ dist
├─ src
|   ├─ models
|   ├─ routes
|   └─ static
:
```

### `src`

This contains one file `index.ts` which is the main entry to the server. This deals with importing the appropriate routes
and the models from mongoose. It connects to the MongoDB server and launches the Express server.

### `dist`

Once the typescript has been built, this is the folder it will output to.

### `models`

This folder contains the definitions of the schema models for the MongoDB database. They are created using mongoose.

### `routes`

This folder contains all of the defined code for serving each of the routes. They are split between each of the domains
they fall under e.g. `/api/albums` would fall under `albumRoutes.js`, `/api/song/:id` would fall under `songRoutes.js`.

> TODO: These need to be converted to TypeScript.

### `static`

This folder is the quick solution for storing the actual music and image files served to the front-end application.

> One possible solution for this would be: store these files in the database along with their associated documents (songs
> in the songs documents and album art in the albums documents) as a file buffer. Then each time these files are required,
> the server would output them into a `temp` folder, serving to the application from here. When the server was shut down
> (or in this case, the hardware turned off), it would then scrap that `temp` folder.

## 🔌 API Documentation

### getAllSongs

This API returns all songs from a specific album.

|        |                      |
| ------ | -------------------- |
| type   | `GET`                |
| route  | `/api/songs/all/all` |
| params | none                 |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```json
[
  {
    "_id": "5f1422054ee369215e056255",
    "name": "A New Beginning",
    "artists": [
      {
        "_id": "5f14228b4ee369215e05625b",
        "name": "BenSound"
      }
    ],
    "albums": [
      {
        "_id": "5f1423c54ee369215e05625f",
        "name": "Sample Album B"
      }
    ]
  }
]
```

### getArtists

This API returns a list of all the artists

|        |                |
| ------ | -------------- |
| type   | `GET`          |
| route  | `/api/artists` |
| params | N/A            |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```json
[
  {
    "_id": "5f14228b4ee369215e05625a",
    "name": "Benjamin Tissot",
    "songs": [
      "5f14218d4ee369215e05624f",
      "5f1422054ee369215e056256",
      "5f1422054ee369215e056257"
    ]
  }
]
```

### getSongsByArtist

This API returns all songs by a specific artist.

|        |                         |
| ------ | ----------------------- |
| type   | `GET`                   |
| route  | `/api/songs/artist/:id` |
| params | `id` - ID of artist     |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```json
[
  {
    "_id": "5f1422054ee369215e056255",
    "name": "A New Beginning",
    "artists": [
      {
        "_id": "5f14228b4ee369215e05625b",
        "name": "BenSound"
      }
    ],
    "albums": [
      {
        "_id": "5f1423c54ee369215e05625f",
        "name": "Sample Album B"
      }
    ]
  }
]
```

### getAlbums

This API returns a list of all the albums

|        |               |
| ------ | ------------- |
| type   | `GET`         |
| route  | `/api/albums` |
| params | N/A           |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```json
[
  {
    "artists": ["5f14228b4ee369215e05625a"],
    "artPath": ["src", "static", "assets", "albumCovers", "Sample 1.jpg"],
    "_id": "5f1423c54ee369215e05625e",
    "name": "Sample Album A",
    "songs": [
      "5f14218d4ee369215e05624f",
      "5f1422054ee369215e056256",
      "5f1422054ee369215e056257"
    ]
  }
]
```

### getSongsByAlbum

This API returns all songs from a specific album.

|        |                        |
| ------ | ---------------------- |
| type   | `GET`                  |
| route  | `/api/songs/album/:id` |
| params | `id` - ID of album     |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```json
[
  {
    "_id": "5f1422054ee369215e056255",
    "name": "A New Beginning",
    "artists": [
      {
        "_id": "5f14228b4ee369215e05625b",
        "name": "BenSound"
      }
    ],
    "albums": [
      {
        "_id": "5f1423c54ee369215e05625f",
        "name": "Sample Album B"
      }
    ]
  }
]
```

### getPlaylists

This API returns a list of all the playlists

|        |                  |
| ------ | ---------------- |
| type   | `GET`            |
| route  | `/api/playlists` |
| params | N/A              |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```json
[
  {
    "songs": [
      "5f1422054ee369215e056257",
      "5f1ad1ef17e08f691bb74048",
      "5f1422054ee369215e056258",
      "5f1422054ee369215e056255"
    ],
    "_id": "5f1ffca0faf3a97662868ac0",
    "name": "Test Playlist 1"
  }
]
```

### getSongsByPlaylist

This API returns all songs from a specific album.

|        |                           |
| ------ | ------------------------- |
| type   | `GET`                     |
| route  | `/api/songs/playlist/:id` |
| params | `id` - ID of playlist     |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```json
[
  {
    "_id": "5f1422054ee369215e056257",
    "name": "Going Higher",
    "artists": [
      {
        "_id": "5f14228b4ee369215e05625a",
        "name": "Benjamin Tissot"
      }
    ],
    "albums": [
      {
        "_id": "5f1423c54ee369215e05625e",
        "name": "Sample Album A"
      }
    ]
  }
]
```

### getSong

This API returns the song audio file.

|        |                   |
| ------ | ----------------- |
| type   | `GET`             |
| route  | `/api/song/:id`   |
| params | `id` - ID of song |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```
~audio-file~
```

### getAlbumArt

This API returns the song audio file.

|        |                      |
| ------ | -------------------- |
| type   | `GET`                |
| route  | `/api/album/art/:id` |
| params | `id` - ID of album   |

| example request |
| --------------- |


```
N/A
```

| example response |
| ---------------- |


```
~image-file~
```

### createPlaylist

This API returns a list of all the playlists

|        |                     |
| ------ | ------------------- |
| type   | `POST`              |
| route  | `/api/playlist/new` |
| params | none                |

| example request |
| --------------- |


```
{
    "name": "Test Playlist 1",
    "songs": ["5f1422054ee369215e056257"]
}
```

| example response |
| ---------------- |


```
none
```

### updatePlaylist

This API returns a list of all the playlists

|        |                       |
| ------ | --------------------- |
| type   | `POST`                |
| route  | `/api/playlist/:id`   |
| params | `id` - ID of playlist |

| example request |
| --------------- |


```
{
    "songs": ["5f1422054ee369215e056257", "5f1ad1ef17e08f691bb74048"]
}
```

| example response |
| ---------------- |


```
none
```
