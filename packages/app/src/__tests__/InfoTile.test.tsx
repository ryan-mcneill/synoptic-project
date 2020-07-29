import React from "react";
import { InfoTile } from "../components/Menu";
import { render, fireEvent } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The InfoTile component", () => {
  const initialState = { ...mockState };
  const mock = {
    title: "Test Title",
    id: "1234567890",
    onClick: jest.fn(),
    subtitle: "Test Subtitle"
  };

  it("renders correctly with all required props", () => {
    const { container } = render(<InfoTile title={mock.title} id={mock.id} />, {
      initialState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with the optional subtitle prop", () => {
    const { container } = render(
      <InfoTile title={mock.title} id={mock.id} subtitle={mock.subtitle} />,
      {
        initialState
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with the optional selected prop", () => {
    const { container } = render(
      <InfoTile
        title={mock.title}
        id={mock.id}
        subtitle={mock.subtitle}
        selected
      />,
      {
        initialState
      }
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("functions correctly when passed an onClick prop", () => {
    const { container, getByText } = render(
      <InfoTile title="Test Title" id={mock.id} onClick={mock.onClick} />
    );
    expect(mock.onClick).not.toHaveBeenCalled();
    fireEvent.click(getByText("Test Title"));
    expect(mock.onClick).toHaveBeenCalled();
    expect(container.firstChild).toMatchSnapshot();
  });
});
