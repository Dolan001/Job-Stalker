import { Inter } from '@next/font/google'

import Layout from '../../../components/layout/Layout'
import NotFound from '../../../components/layout/NotFound'
import UpdateJob from '../../../components/job/UpdateJob'
import { isAuthenticatedUser } from '../../../utils/isAuthenticated'

import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function CandidatePage({ job, access_token, error }) {

    if (error) return <NotFound />

    return (
        <Layout title='Update Job'>
            <UpdateJob job={job} access_token={ access_token } />
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

    try {

        const res = await axios.get(`${process.env.API_URL}/job-api/jobs/${params.id}/`)

        const job = res.data.job
        // console.log(job);

        return {
            props: {
                job,
                access_token
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