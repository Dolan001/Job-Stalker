import Link from 'next/link'
import React from 'react'
import DataTable from 'react-data-table-component'

const JobApplied = ({ jobs }) => {
    // console.log(jobs);

    const columns = [
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
            name: 'Education',
            sortable: true,
            selector: (row) => row.education
        },
        {
            name: 'Experience',
            sortable: true,
            selector: (row) => row.experience
        },
        {
            name: 'AppliedOn',
            sortable: true,
            selector: (row) => row.appliedOn
        },
        {
            name: 'Action',
            sortable: true,
            selector: (row) => row.action
        },
    ]

    const data = []

    jobs && jobs.forEach(item => {
        data.push({
            title: item.job.title,
            salary: item.job.salary,
            education: item.job.education,
            experience: item.job.experience,
            appliedOn: item.applied_at.substring(0, 10),
            action: (
                <Link href={`/job/${item.job.id}`}  legacyBehavior>
                    <a className='btn btn-primary'>
                        <i aria-hidden className='fa fa-eye'></i>
                    </a>
                </Link>
            )
        })
    });


  return (
      <div className='row'>
          <div className='col-1'></div>
          <div className='col-10 mt-5'>
              <h4 className='my-5'>Jobs Applied</h4>
              <DataTable columns={columns} data={ data } />
          </div>
          <div className='col-1'></div>
    </div>
  )
}

export default JobApplied