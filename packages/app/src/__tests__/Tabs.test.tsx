import React from "react";
import { Tabs } from "../components/Menu";
import { render, fireEvent } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The Tabs component", () => {
  const initialState = { ...mockState };

  it("renders correctly with the playlist tab open by default", () => {
    const { container } = render(<Tabs />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly when changed to the search tab", () => {
    const { container, getByTitle } = render(<Tabs />, {
      initialState
    });

    const tab = getByTitle("SEARCH");
    fireEvent.click(tab);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly when changed to the songs tab", () => {
    const { container, getByTitle } = render(<Tabs />, {
      initialState
    });

    const tab = getByTitle("SONGS");
    fireEvent.click(tab);

    expect(container.firstChild).toMatchSnapshot();
  });
});
