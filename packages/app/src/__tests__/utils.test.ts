import {
  artistsToString,
  filterData,
  filterSongs,
  playlistsToArray
} from "../utils";
import { mockState } from "../__mocks__/state";

describe("The artistsToString utility function", () => {
  const artists = [
    {
      _id: "5f14228b4ee369215e05625a",
      name: "Benjamin Tissot"
    },
    {
      _id: "5f14228b4ee369215e05625b",
      name: "BenSound"
    }
  ];

  it("can transform an array of artists with multiple artists into a comma separated string", () => {
    expect(artistsToString(artists)).toEqual("Benjamin Tissot, BenSound");
  });

  it("can transform an array of artists with one artist into a string", () => {
    artists.pop();
    expect(artistsToString(artists)).toEqual("Benjamin Tissot");
  });
});

describe("The playlistsToArray utility function", () => {
  const playlists = mockState.playlists.data;

  it("can transform the playlists data object to an array containing the names and ids of the respective playlists", () => {
    expect(playlistsToArray(playlists)).toEqual([
      { id: "5f1ffca0faf3a97662868ac0", name: "Test Playlist 1" },
      { id: "5f21389bc969de0689f10656", name: "Test Playlist 2" },
      { id: "5f213936c969de0689f10657", name: "Test Playlist 3" }
    ]);
  });
});

describe("The filterSongs utility function", () => {
  const data = mockState.songs.data;

  it("can return only the songs that have the search term in their name", () => {
    expect(filterSongs(data, "creat")).toEqual([
      {
        _id: "5f1ad1ef17e08f691bb74048",
        albums: [{ _id: "5f1423c54ee369215e05625e", name: "Sample Album A" }],
        artists: [
          { _id: "5f14228b4ee369215e05625a", name: "Benjamin Tissot" },
          { _id: "5f14228b4ee369215e05625b", name: "BenSound" }
        ],
        name: "Creative Minds"
      }
    ]);
  });
});

describe("The filterData utility function", () => {
  const data = mockState.artists.data;

  it("can return only the objects that have the search term in their 'name' key", () => {
    expect(filterData(data, "bensound")).toEqual({
      "5f14228b4ee369215e05625b": {
        name: "BenSound",
        songs: [
          {
            _id: "5f1422054ee369215e056255",
            albums: [
              { _id: "5f1423c54ee369215e05625f", name: "Sample Album B" }
            ],
            artists: [{ _id: "5f14228b4ee369215e05625b", name: "BenSound" }],
            name: "A New Beginning"
          },
          {
            _id: "5f1422054ee369215e056258",
            albums: [
              { _id: "5f1423c54ee369215e05625f", name: "Sample Album B" }
            ],
            artists: [{ _id: "5f14228b4ee369215e05625b", name: "BenSound" }],
            name: "Ukulele"
          },
          {
            _id: "5f1ad1ef17e08f691bb74048",
            albums: [
              { _id: "5f1423c54ee369215e05625e", name: "Sample Album A" }
            ],
            artists: [
              { _id: "5f14228b4ee369215e05625a", name: "Benjamin Tissot" },
              { _id: "5f14228b4ee369215e05625b", name: "BenSound" }
            ],
            name: "Creative Minds"
          }
        ]
      }
    });
  });
});
