import React from "react";
import { SongMenu } from "../components/Menu";
import { render, fireEvent } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The SongMenu component", () => {
  const props = {
    songName: "Song title",
    artists: "Artist 1, Artist 2",
    id: "1234567890",
    onClose: jest.fn()
  };

  it("renders correctly with all required props", () => {
    const { container } = render(<SongMenu {...props} />, {
      initialState: mockState
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it("triggers onClose prop when close button is clicked", () => {
    const { getByTitle } = render(<SongMenu {...props} />, {
      initialState: mockState
    });

    expect(props.onClose).not.toHaveBeenCalled();
    const closeButton = getByTitle("Close");
    fireEvent.click(closeButton);
    expect(props.onClose).toHaveBeenCalled();
  });

  it("switches to list playlists when the 'add to playlist' button is clicked", () => {
    const { container, getByText } = render(<SongMenu {...props} />, {
      initialState: mockState
    });
    const addButton = getByText("Add to playlist");
    fireEvent.click(addButton);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("switches back when 'cancel' is clicked", () => {
    const { container, getByText } = render(<SongMenu {...props} />, {
      initialState: mockState
    });
    const addButton = getByText("Add to playlist");
    fireEvent.click(addButton);
    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(container.firstChild).toMatchSnapshot();
  });
});
