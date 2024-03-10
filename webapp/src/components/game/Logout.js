import axios from "axios";

export async function logoutUser() {
    try {
        await axios.get(process.env.REACT_APP_API_ENDPOINT + "/auth/logout");
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("jwtRefreshToken");
    } catch (error) {
        console.error("Error logging out user: ", error);
    }
}
