import React from "react";
import { MusicPlayer } from "../views";
import { render } from "../utils/testUtils";

describe("The MusicPlayer component", () => {
  it("renders as default with dark UI elements on a light background", () => {
    const { container } = render(<MusicPlayer />, {
      initialState: { currentSong: {} }
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with dark UI elements when the background is light", () => {
    const { container } = render(<MusicPlayer />, {
      initialState: { currentSong: { background: { isDark: false } } }
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with light UI elements when the background is dark", () => {
    const { container } = render(<MusicPlayer />, {
      initialState: { currentSong: { background: { isDark: true } } }
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
