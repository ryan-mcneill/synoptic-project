import React from "react";
import { SongList } from "../components/Menu";
import { render } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The SongList component", () => {
  const data = mockState.songs.data;

  it("renders nothing when not visible", () => {
    const { container } = render(<SongList data={data} isVisible={false} />, {
      initialState: mockState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly when visible", () => {
    const { container } = render(<SongList data={data} isVisible />, {
      initialState: mockState
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
