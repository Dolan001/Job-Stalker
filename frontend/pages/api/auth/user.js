import axios from "axios";
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'GET') {

        const cookies = cookie.parse(req.headers.cookie || '')
        const access = cookies.access || false

        if(!access){
            return res.status(401).json({
                error: "Log in first to access resources"
            })
        }

        try {
            const response = await axios.get(`${process.env.API_URL}/account-api/my-profile/`, {
                headers: {
                    'Authorization': `Bearer ${access}`
                }
            })

            if(response.data){
                return res.status(200).json({
                    user: response.data
                })
            }

        } catch (error) {
            res.setHeader('Set-Cookie', [
                cookie.serialize('access', '', {
                    maxAge: -1,
                    path: '/',
                })
            ])
            res.status(error?.response.status).json({
                error: "Session expired, please log in again",
            })
        }
    }
}