import axios from "axios";

export async function logoutUser() {
    try {
        await axios.get(process.env.REACT_APP_API_ENDPOINT + "/auth/logout");
    } catch (error) {
        console.error("Error logging out user: ", error);
    }
}
