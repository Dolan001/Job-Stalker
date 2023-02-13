import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const JobContext = createContext(null);

export const JobProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(null)
    const [applied, setApplied] = useState(false)
    const [stats, setStats] = useState(null)


    const applyJob = async (id, access_token) => {
        try {
            setLoading(true)

            const res = await axios.post(`${process.env.API_URL}/job-api/apply-job/${id}/`,
                {

                }, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            )

            if (res.data.applied === true) {
                setLoading(false);
                setApplied(true)
            }

        } catch (error) {
            setLoading(false);
            setError(error.response && error.response.data.detail || error.response.data.error)
        }
    }
    //Check job applied
    const checkJobApplied = async (id, access_token) => {
        try {
            setLoading(true)

            const res = await axios.get(`${process.env.API_URL}/job-api/check/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            )

            if (res.data.applied === false) {
                setLoading(false);
                setApplied(false)
            }
            if (res.data.applied === true) {
                setLoading(false);
                setApplied(true)
            }

        } catch (error) {
            setLoading(false);
            setError(error.response && error.response.data.detail || error.response.data.error)
        }
    }

    //Get topic stats
    const topicStats = async (topic) => {
        try {
            setLoading(true)

            const res = await axios.get(`${process.env.API_URL}/job-api/stats/${topic}/`)

            if (res.data) {
                setLoading(false)
                setStats(res.data)
            }
            

        } catch (error) {
            setLoading(false);
            setError(error.response && error.response.data.detail || error.response.data.error)
        }
    }

    //Clear error
    const clearError = () => {
        setError(null)
    }

    return (
        <JobContext.Provider
            value={{
                loading,
                error,
                updated,
                applied,
                stats,
                clearError,
                applyJob,
                checkJobApplied,
                topicStats,
            }}
        >
            {children}
        </JobContext.Provider>
    )

}
export default JobContext