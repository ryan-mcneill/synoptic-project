import React from "react";
import { TabButton } from "../components/Menu";
import { render, fireEvent } from "../utils/testUtils";
import { faIcons } from "@fortawesome/free-solid-svg-icons";

describe("The TabButton component", () => {
  it("renders correctly with text", () => {
    const mockFn = jest.fn();
    const { container } = render(<TabButton onClick={mockFn} title="Title" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with text as selected", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <TabButton onClick={mockFn} title="Title" isSelected />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("onClick callback functions correctly", () => {
    const mockFn = jest.fn();
    const { getByText } = render(
      <TabButton onClick={mockFn} title="Title" isSelected />
    );

    expect(mockFn).not.toHaveBeenCalled();
    const button = getByText("Title");
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });

  it("renders correctly with an icon", () => {
    const mockFn = jest.fn();
    const { container } = render(<TabButton onClick={mockFn} icon={faIcons} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders correctly with icon as selected", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <TabButton onClick={mockFn} icon={faIcons} isSelected />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it("only renders the icon when passed icon and title", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <TabButton onClick={mockFn} icon={faIcons} title="Title" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
