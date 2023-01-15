import { Inter } from '@next/font/google'

import Layout from '../components/layout/Layout'
import Home from '../components/Home'

import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Index({data}) {
  return (
    <Layout>
      <Home data={ data } />
    </Layout>
  )
}

export async function getServerSideProps() {
  const result = await axios.get(`${process.env.API_URL}/job-api/jobs/`)
  const data = result.data

  return {
    props: {
      data,
    },
  };
}
