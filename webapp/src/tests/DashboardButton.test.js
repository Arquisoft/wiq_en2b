import each from "jest-each";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import DashboardButton from "../components/dashboard/DashboardButton";


describe("Dashboard Button", () => {

    each(["FaKiwiBird", "IoIosFootball", "FaGlobeAmericas",
        "IoLogoGameControllerB", "FaPalette",
        "FaRandom"]).test("the proper icon renderized", async (iconName) => {
            const props = {
                "label": "label",
                "selectedButton": "label",
                "onClick": () => {},
                "iconName": iconName
            };

            render(<DashboardButton {...props} />);

            await waitFor( async () => {
                expect(await screen.findByTestId(iconName)).toBeEnabled();
            });
    });

});