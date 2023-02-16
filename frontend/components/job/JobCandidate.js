import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Link from 'next/link';

const JobCandidate = ({ candidatesApplied }) => {
    const[hydrated, setHydrated] = useState(false);
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
            selector: (row) => row.job_id
        },
        {
            name: 'Job Name',
            sortable: true,
            selector: (row) => row.title
        },
        {
            name: 'User ID',
            sortable: true,
            selector: (row) => row.id
        },
        {
            name: 'Candidate Resume',
            sortable: true,
            selector: (row) => row.resume
        },
        {
            name: 'Applied at',
            sortable: true,
            selector: (row) => row.applied_at
        },
    ]

    const data = []

    candidatesApplied && candidatesApplied.forEach((item) => {
        data.push({
            job_id: item.job.job_id,
            title: item.job.title,
            id: item.user,
            salary: item.salary,
            resume: (
                <>
                    <Link href={`${item.resume}`} legacyBehavior>
                        <a
                            className="text-success text-center"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <b>
                                <i aria-hidden className="fas fa-download"></i> View Resume
                            </b>
                        </a>
                    </Link>
                </>
            ),
            applied_at: item.applied_at.substring(0,10)
        })
    });


    return (
        <div className='row'>
            <div className='col-1'></div>
            <div className='col-10 mt-5'>
                <h4 className='my-5'>{candidatesApplied && `${candidatesApplied.length} Candidates applied this job` }</h4>
                <DataTable columns={columns} data={data} pagination responsive />
            </div>
            <div className='col-1'></div>
        </div>
    )
}

export default JobCandidate