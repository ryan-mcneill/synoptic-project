import React from "react";
import { SongsTab } from "../components/Menu";
import { render, fireEvent } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The SongsTab component", () => {
  const props = {
    artists: mockState.artists.data,
    albums: mockState.albums.data,
    playlists: mockState.playlists.data,
    songs: mockState.songs.data
  };

  it("renders correctly on the SONGS tab", () => {
    const { container } = render(<SongsTab {...props} />, {
      initialState: mockState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly on the ARTISTS tab", () => {
    const { container, getByText } = render(<SongsTab {...props} />, {
      initialState: mockState
    });

    const tabButton = getByText("ARTISTS");
    fireEvent.click(tabButton);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly on the ALBUMS tab", () => {
    const { container, getByText } = render(<SongsTab {...props} />, {
      initialState: mockState
    });

    const tabButton = getByText("ALBUMS");
    fireEvent.click(tabButton);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly on the PLAYLISTS tab", () => {
    const { container, getByText } = render(<SongsTab {...props} />, {
      initialState: mockState
    });

    const tabButton = getByText("PLAYLISTS");
    fireEvent.click(tabButton);

    expect(container.firstChild).toMatchSnapshot();
  });
});
