import React from "react";
import { Controls } from "../components/MusicPlayer";
import { render } from "../utils/testUtils";

describe("The Controls component", () => {
  it("renders correctly with default props", () => {
    const { container } = render(<Controls />, {
      initialState: { currentSong: { isPlaying: false } }
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly on a dark background", () => {
    const { container } = render(<Controls />, {
      initialState: {
        currentSong: { isPlaying: false, background: { isDark: true } }
      }
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with the data loaded and the correct song playing", () => {
    const { container } = render(<Controls />, {
      initialState: {
        currentSong: { isPlaying: false },
        playlist: { current: { _id: "1234567890" }}
      }
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
