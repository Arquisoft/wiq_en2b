import { render, screen } from "@testing-library/react";
import Statistics from "pages/Statistics";
import React from "react";

describe("Statistics", () => {

  it("renders the spinning wheel while no data is loaded", async () => {
    // TODO: mock Axios here once connectivity is implemented

        render(<Statistics />);
        expect(screen.getByTestId("spinning-wheel")).toBeVisible();
    });

    it("renders the spinning wheel while no data is loaded", async () => {
        // TODO: mock Axios here once connectivity is implemented

        render(<Statistics />);
        expect(screen.getByTestId("spinning-wheel")).toBeVisible();
    });

});
