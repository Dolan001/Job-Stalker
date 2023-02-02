import axios from "axios";


export const isAuthenticatedUser = async (access_token) => {
    try {
        const response = await axios.post(`${process.env.API_URL}/api/token/verify/`, {
            token: access_token
        })

        return response.status === 200;
    } catch (error) {
        return false
    }
}