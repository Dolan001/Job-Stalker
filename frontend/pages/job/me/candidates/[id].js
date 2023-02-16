import { Inter } from '@next/font/google'

import Layout from '../../../../components/layout/Layout'
import NotFound from '../../../../components/layout/NotFound'
import JobCandidate from '../../../../components/job/JobCandidate'
import { isAuthenticatedUser } from '../../../../utils/isAuthenticated'

import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function CandidatePage({ candidatesApplied, error }) {

    if (error) return <NotFound />

    return (
        <Layout title='Job Candidates'>
            <JobCandidate candidatesApplied={candidatesApplied} />
        </Layout>
    )
}

export async function getServerSideProps({ req, params }) {

    const access_token = req.cookies.access
    const user = await isAuthenticatedUser(access_token)

    if (!user) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }
    console.log('user');

    try {

        const res = await axios.get(`${process.env.API_URL}/job-api/applied-my-job/${params.id}/`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const candidatesApplied = res.data
        console.log(candidatesApplied);

        return {
            props: {
                candidatesApplied
            }
        }

    } catch (error) {
        return {
            props: {
                error: error.response
            }
        }
    }
}