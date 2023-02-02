import { useState, useEffect, createContext } from "react";
import {useRouter} from "next/router";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => {
        if(!user){
            loadUser()
        }
    }, [user])

    //Login User
    const login = async ({username, password}) => {
        try{

            setLoading(true)

            const res = await axios.post('/api/auth/login', {
                username,
                password
            })

            if(res.data.success){
                await loadUser();
                setIsAuthenticated(true);
                setLoading(false);
                router.push("/")
            }

        }catch (error) {
            setLoading(false);
            setError(error.response && error.response.data.detail || error.response.data.error)
        }
    }

    const register = async ({username, first_name, last_name, email, password}) => {

        try{
            setLoading(true)

            const res = await axios.post(`${process.env.API_URL}/account-api/register/`, {
                username,
                first_name,
                last_name,
                email,
                password
            })

            console.log(res.data.error)
            if(res.data.detail){
                setLoading(false);
                router.push("/login")
            }

        }catch (error) {
            setLoading(false);
            setError(error.response && error.response.data.detail || error.response.data.error)
        }
    }

    //Load User
    const loadUser = async () => {
        try{

            setLoading(true)

            const res = await axios.get('/api/auth/user')

            if(res.data.user){
                setIsAuthenticated(true);
                setLoading(false);
                setUser(res.data.user)
            }

        }catch (error) {
            setLoading(false);
            setIsAuthenticated(false)
            setUser(null)
            setError(error.response && error.response.data.detail || error.response.data.error)
        }
    }

    //logout User
    const logout = async () => {
        try{

            const res = await axios.post('/api/auth/logout')

            if(res.data.success){
                setIsAuthenticated(false);
                setUser(null)
            }

        }catch (error) {
            setLoading(false);
            setIsAuthenticated(false)
            setUser(null)
            setError(error.response && error.response.data.detail || error.response.data.error)
        }
    }

    //Clear error
    const clearError = () => {
        setError(null)
    }

    return (
        <AuthContext.Provider
            value={{
                loading,
                user,
                isAuthenticated,
                error,
                register,
                login,
                logout,
                loadUser,
                clearError
            }}

        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext