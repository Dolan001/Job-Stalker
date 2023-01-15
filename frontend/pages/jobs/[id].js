import { Inter } from '@next/font/google'

import Layout from '../../components/layout/Layout'

import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function JobDetails({ job, candidates }) {

    console.log(job, candidates)
    return (
        <Layout>
            <h1>Job Details</h1>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const res = await axios.get(`${process.env.API_URL}/job-api/jobs/${params.id}/`)
    const job = res.data.job
    const candidates = res.data.candidates

    return {
        props: {
            job,
            candidates,
        }
    }
}