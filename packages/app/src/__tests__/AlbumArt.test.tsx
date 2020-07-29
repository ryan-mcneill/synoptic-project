import React from "react";
import { AlbumArt } from "../components/MusicPlayer";
import { render } from "../utils/testUtils";

describe("The AlbumArt component", () => {
  it("renders correctly when no image path is passed", () => {
    const { container } = render(<AlbumArt />, {
      initialState: { playlist: {} }
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly when given an image path", () => {
    const { container } = render(<AlbumArt />, {
      initialState: { playlist: { current: { albums: [{ _id: "123456" }] } } }
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
