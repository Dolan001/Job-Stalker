import Layout from "../../components/layout/Layout";
import JobApplied from "../../components/job/JobApplied";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

import axios from "axios";

export default function JobAppliedPage({ jobs }) {
    return (
        <Layout title={'Jobs Appied'}>
            <JobApplied jobs={jobs}/>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {

    const access_token = req.cookies.access
    const user = await isAuthenticatedUser(access_token)

    if (!user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const res = await axios.get(`${process.env.API_URL}/job-api/applied-jobs/`,
        {
            headers: {
                Authorization : `Bearer ${access_token}`
            }
        }
    )

    const jobs = res.data


    return {
        props: {
            jobs
        }
    }

}