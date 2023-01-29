import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'

import Header from './Header'
import Footer from './Footer'

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children, title = "Find your job" }) => {
    return (
        <div>
            <Head>
                <title>{title} - Job Stalker</title>
            </Head>

            <ToastContainer position='bottom-right' />

            <Header />
            {children}
            <Footer />

        </div>
  )
}

export default Layout