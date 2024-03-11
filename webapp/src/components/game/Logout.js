import axios from "axios";

export async function logoutUser() {
    try {
        await axios.get("http://98.66.168.12:8080" + "/auth/logout");
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("jwtRefreshToken");
    } catch (error) {
        console.error("Error logging out user: ", error);
    }
}
