import React from "react";
import { SearchTab } from "../components/Menu";
import { render, fireEvent } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The SearchTab component", () => {
  const initialState = { ...mockState };

  it("renders correctly on first load", () => {
    const { container } = render(<SearchTab />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with no results", () => {
    const { container, getByPlaceholderText, getByDisplayValue } = render(
      <SearchTab />,
      {
        initialState
      }
    );

    const input = getByPlaceholderText("Type to search...");
    const button = getByDisplayValue("Search");

    fireEvent.change(input, {
      target: { value: "String that doesn't exist in results" }
    });
    fireEvent.click(button);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with results", () => {
    const { container, getByPlaceholderText, getByDisplayValue } = render(
      <SearchTab />,
      {
        initialState
      }
    );

    const input = getByPlaceholderText("Type to search...");
    const button = getByDisplayValue("Search");

    fireEvent.change(input, {
      target: { value: "Creative" }
    });
    fireEvent.click(button);

    expect(container.firstChild).toMatchSnapshot();
  });
});
