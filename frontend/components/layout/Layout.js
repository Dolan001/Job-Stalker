import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, title = "Job-Stalker" }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            <Header />
            {children}
            <Footer />

        </div>
  )
}

export default Layout