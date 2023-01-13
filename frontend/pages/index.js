import { Inter } from '@next/font/google'

import Layout from '../components/layout/Layout'
import Home from '../components/Home'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}
