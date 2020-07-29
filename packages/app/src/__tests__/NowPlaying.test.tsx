import React from "react";
import { NowPlaying } from "../components/MusicPlayer";
import { render } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The NowPlaying component", () => {
  it("renders correctly with nothing loaded", () => {
    const { container } = render(<NowPlaying />, {
      initialState: { currentSong: {} }
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly after the data has loaded", () => {
    const { container } = render(<NowPlaying />, {
      initialState: mockState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly when the data has but the artists and songName information isn't pulled through", () => {
    const initialState = { ...mockState };
    delete initialState.playlist.current.artists;
    delete initialState.playlist.current.name;
    const { container } = render(<NowPlaying />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
