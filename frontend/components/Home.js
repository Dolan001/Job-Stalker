import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Pagination from 'react-js-pagination'

import JobItem from './job/JobItem'
import Filters from './layout/Filters'

const Home = ({ data }) => {

    const { jobs, count, result_per_page } = data

    const router = useRouter()
    let { page = 1, keyword } = router.query
    page = Number(page)

    let queryParams;

    if (typeof window !== 'undefined') {
        queryParams = new URLSearchParams(window.location.search)
    }

    const handlePageClick = (currentPage) => { 

        if (queryParams.has('page')) {
            queryParams.set('page', currentPage)
        } else
            queryParams.append('page', currentPage)
        
        router.push({
            search: queryParams.toString()
        })
    }
    
    return (
        <div className='container container-fluid'>
            <div className='row'>
                <div className='col-md-3 col-xl-3 col-lg-4'>
                    <Filters />
                </div>

                <div className='col-xl-9 col-lg-8 content-left-offset'>
                    <div className='my-5'>
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

                    {result_per_page < count && (
                        <div className='d-flex justify-content-center mt-5'>
                            <Pagination
                                activePage={page}
                                itemsCountPerPage={result_per_page}
                                totalItemsCount={count}
                                onChange={handlePageClick}
                                nextPageText={"Next"}
                                prevPageText={"Prev"}
                                firstPageText={"First"}
                                lastPageText={"Last"}
                                itemClass="page-item"
                                linkClass='page-link'
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Home