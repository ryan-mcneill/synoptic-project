import React from "react";
import { InfoTile } from "../components/Menu";
import { render, fireEvent } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The InfoTile component", () => {
  const initialState = { ...mockState };
  const mock = {
    id: "1234567890",
    onClick: jest.fn(),
    data: mockState.songs.data[0]
  };

  it("renders correctly with all required props", () => {
    const { container } = render(<InfoTile data={mock.data} />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with the optional selected prop", () => {
    const { container } = render(<InfoTile data={mock.data} selected />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with the menu optionally disabled", () => {
    const { container } = render(
      <InfoTile data={mock.data} hasMenu={false} />,
      {
        initialState
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("functions correctly when passed an onClick prop", () => {
    const { container, getByText } = render(
      <InfoTile data={mock.data} onClick={mock.onClick} />
    );
    expect(mock.onClick).not.toHaveBeenCalled();
    fireEvent.click(getByText(mock.data.name));
    expect(mock.onClick).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with no artists data for the subtitle", () => {
    delete mock.data.artists;
    const { container } = render(<InfoTile data={mock.data} />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });
});
