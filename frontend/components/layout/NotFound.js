import React from 'react'
import Link from 'next/link'

import Layout from './Layout'

const NotFound = () => {
    return (
            <div className='page-not-found-wrapper'>
                <img src='/images/404.webp' height='450' width='500' alt='404 not found' />

                <h5>
                    Page not found go to <Link href="/">Homepage</Link>{" "}
                </h5>
            </div>
  )
}

export default NotFound