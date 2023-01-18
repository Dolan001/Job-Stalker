import { Inter } from '@next/font/google'

import Layout from '../../components/layout/Layout'
import JobDetails from '../../components/job/JobDetails'
import NotFound from '../../components/layout/NotFound'

import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function JobDetailsPage({ job, candidates, error }) {

    if (error) return <NotFound />

    return (
        <Layout title={job.title}>
            <JobDetails job={job} candidates={candidates} />
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    
    try {
        const res = await axios.get(`${process.env.API_URL}/job-api/jobs/${params.id}/`)

        const job = res.data.job
        const candidates = res.data.candidates

        return {
            props: {
                job,
                candidates,
            }
        }
        
    } catch (error) {
        return {
            props: {
                error: error.response.data.detail
            }
        }
    }
}