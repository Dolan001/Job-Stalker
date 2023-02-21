import Link from 'next/link'
import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import JobContext from '../../context/JobContext'

const MyJobs = ({ jobs, access_token }) => {

    const router = useRouter()
    const [hydrated, setHydrated] = useState(false);
    const { deleted, setDeleted, loading, deleteJob, error, clearError} = useContext(JobContext)
    useEffect(() => {
        // This forces a rerender, so the job is rendered
        // the second time but not the first
        setHydrated(true);

        if (error) {
            toast.error(error)
            clearError()
        }
        if (deleted) {
            setDeleted(false)
            router.push(router.asPath)
        }

    }, [error, deleted]);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    const JobDeteleHandler = (id) => {
        deleteJob(id, access_token)
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

                    <button className='btn btn-danger mx-1' onClick={() => JobDeteleHandler(job.id)}>
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