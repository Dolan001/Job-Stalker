import React from 'react'
import Link from 'next/link'

import JobItem from './job/JobItem'

const Home = () => {
  return (
      <div className='container container-fluid'>
          <div className='row'>
              <div className='col-md-3 col-xl-3 col-lg-4'>
                  <p>Filters</p>
              </div>

              <div className='col-xl-9 col-lg-8 content-left-offset'>
                  <div className='my-5'>
                      <h4 className='page-title'>Latest Job</h4>
                      <Link href='/stats'>
                          <button className='btn btn-secondary float-right stats_btn'>
                              Get topic stats
                          </button>
                      </Link>
                      <div className='d-block'>
                          <Link href='/search'>Go to search</Link>
                      </div>
                  </div>

                  <JobItem />
                  <JobItem />
                  
              </div>
          </div>
    </div>
  )
}

export default Home