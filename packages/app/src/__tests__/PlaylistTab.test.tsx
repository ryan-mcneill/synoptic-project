import React from "react";
import { PlaylistTab } from "../components/Menu";
import { render } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";
import { PlaylistState } from "../store/types";

describe("The PlaylistTab component", () => {
  let initialState: { playlist: PlaylistState } = {
    playlist: {
      previous: [],
      next: []
    }
  };

  const song = mockState.playlist.current;

  beforeEach(() => {
    initialState = {
      playlist: {
        previous: [],
        next: []
      }
    };
  });

  it("renders correctly with no songs playing", () => {
    const { container } = render(<PlaylistTab />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with songs in previous state", () => {
    initialState.playlist.previous = mockState.playlist.next;
    const { container } = render(<PlaylistTab />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with songs in current state", () => {
    initialState.playlist.current = song;
    const { container } = render(<PlaylistTab />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with songs in next state", () => {
    initialState.playlist.next = mockState.playlist.next;
    const { container } = render(<PlaylistTab />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
