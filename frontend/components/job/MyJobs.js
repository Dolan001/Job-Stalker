import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const MyJobs = ({ jobs, access_token }) => {

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        // This forces a rerender, so the job is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    const columns = [
        {
            name: 'Job ID',
            sortable: true,
            selector: (row) => row.id
        },
        {
            name: 'Job Name',
            sortable: true,
            selector: (row) => row.title
        },
        {
            name: 'Salary',
            sortable: true,
            selector: (row) => row.salary
        },
        {
            name: 'Action',
            sortable: true,
            selector: (row) => row.action
        },
    ]

    const data = []

    jobs && jobs.forEach((job) => {
        data.push({
            id: job.id,
            title: job.title,
            salary: job.salary,
            action: (
                <>
                    <Link href={`/job/${job.id}`} legacyBehavior>
                        <a className='btn btn-primary'>
                            <i aria-hidden className='fa fa-eye'></i>
                        </a>
                    </Link>

                    <Link href={`/job/me/candidates/${job.id}`} legacyBehavior>
                        <a className='btn btn-success my-2 mx-1'>
                            <i aria-hidden className='fa fa-users'></i>
                        </a>
                    </Link>

                    <Link href={`/job/me/${job.id}`} legacyBehavior>
                        <a className='btn btn-warning'>
                            <i aria-hidden className='fa fa-pencil'></i>
                        </a>
                    </Link>

                    <button className='btn btn-danger mx-1'>
                        <i className='fa fa-trash'></i>
                    </button>
                </>
            )
        })
    });


    return (
        <div className='row'>
            <div className='col-1'></div>
            <div className='col-10 mt-5'>
                <h4 className='my-5'>My Jobs</h4>
                <DataTable columns={columns} data={data} pagination responsive />
            </div>
            <div className='col-1'></div>
        </div>
    )
}

export default MyJobs