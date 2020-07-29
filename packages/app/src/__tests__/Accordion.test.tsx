import React from "react";
import { Accordion } from "../components/Menu";
import { render } from "../utils/testUtils";
import { mockState } from "../__mocks__/state";

describe("The Accordion component", () => {
  it("renders correctly with data loaded", () => {
    const data = mockState.albums.data["5f1423c54ee369215e05625e"].songs;
    const title = mockState.albums.data["5f1423c54ee369215e05625e"].name;
    const { container } = render(<Accordion title={title} data={data} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
