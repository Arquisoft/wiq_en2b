import { getByTestId, render } from "@testing-library/react";
import React from "react";
import { TopBar } from "../components/Layout";

describe("Top bar component", () => {

    it("should contain all elements", () => {
        const { container } = render(<TopBar />);

        expect(container.querySelectorAll("nav > div > a").length).toBe(5);
        expect(container.querySelectorAll("nav > div > button").length).toBe(1);
        expect(container.querySelectorAll("nav > div > div > div > a").length).toBe(2);
    });

    it("should contain each option the correct link", () => {
        const { container } = render(<TopBar />);

        expect(getByTestId(container, "nav.home").getAttribute("href")).toBe("/");
        expect(getByTestId(container, "nav.api_docs").getAttribute("href")).toBe("/api");
        expect(getByTestId(container, "nav.play").getAttribute("href")).toBe("/play");
        expect(getByTestId(container, "nav.statistics.general").getAttribute("href")).toBe("/statistics/general");
        expect(getByTestId(container, "nav.statistics.personal").getAttribute("href")).toBe("/statistics/personal")
    });
});