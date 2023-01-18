import React from 'react'
import Link from 'next/link'

import JobItem from './job/JobItem'

import { useRouter } from 'next/router'

const Home = ({ data }) => {

    const { jobs, count, result_per_page } = data
    const router = useRouter()
    let { keyword } = router.query
  return (
      <div className='container container-fluid'>
          <div className='row'>
              <div className='col-md-3 col-xl-3 col-lg-4'>
                  <p>Filters</p>
              </div>

              <div className='col-xl-9 col-lg-8 content-left-offset'>
                  <div className='my-4'>
                      <h3 className='page-title'>
                          {
                              keyword
                                  ? `${jobs.length} Results for ${keyword}`
                                  : "Latest Jobs"
                          }
                      </h3>
                      <Link href='/stats'>
                          <button className='btn btn-secondary float-right stats_btn'>
                              Get topic stats
                          </button>
                      </Link>
                  </div>

                  {jobs && jobs.map((job) => <JobItem key={job.id} job={job} />)}
                  
              </div>
          </div>
    </div>
  )
}

export default Home