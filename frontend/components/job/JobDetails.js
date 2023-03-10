import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment'

import JobContext from '../../context/JobContext'
import { toast } from 'react-toastify'

const JobDetails = ({ job, candidates, access_token }) => {

    const { loading, applyJob, applied, checkJobApplied, clearError, error } = useContext(JobContext)

    useEffect(() => {
        if (error) {
            toast.error(error)
            clearError()
        }
        if (access_token) {
            checkJobApplied(job.id, access_token)
        } else {
            toast.error("Please login to apply the job")
        }
    }, [error])

    const applyJobHandler = () => {
        applyJob(job.id, access_token)
    }

    const today = moment(Date.now())
    const last_date = moment(job.last_date)
    const is_date_passed = last_date.diff(today, 'days') < 0 ? true : false

    return (
        <div className="job-details-wrapper">
            <div className="container container-fluid">
                <div className="row">
                    <div className="col-xl-9 col-lg-8">
                        <div className="job-details p-3">
                            <div className="job-header p-4">
                                <h2>{job.title}</h2>
                                <span>
                                    <i aria-hidden className="fas fa-building"></i>
                                    <span> {job.industry}</span>
                                </span>
                                <span className="ml-4">
                                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                                    <span> {job.address}</span>
                                </span>

                                <div className="mt-3">
                                    <span>
                                        {
                                            loading ? (
                                                "Loading..."
                                            ) : applied ? (
                                                <button disabled className="btn btn-success px-4 py-2 apply-btn">
                                                    <i aria-hidden className='fas fa-check'></i>
                                                    {loading ? "Loading" : " Applied"}
                                                </button>
                                            ) : access_token ? (
                                                <button disabled={is_date_passed} className="btn btn-primary px-4 py-2 apply-btn" onClick={applyJobHandler}>
                                                    {loading ? "Loading..." : "Apply Now"}
                                                </button>
                                            ) : (
                                                <button disabled className="btn btn-danger px-4 py-2 apply-btn" onClick={applyJobHandler}>
                                                    <i aria-hidden className='fas fa-times'></i>
                                                    {loading ? "Loading..." : " Apply Now"}
                                                </button>
                                            )
                                        }

                                        <span className="ml-4 text-success">
                                            <b>{candidates}</b> candidates has applied to this job.
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className="job-description mt-5">
                                <h4>Description</h4>
                                <p>
                                    {job.description}
                                </p>
                            </div>

                            <div className="job-summary">
                                <h4 className="mt-5 mb-4">Job Summary</h4>
                                <table className="table table-striped">
                                    <tbody>
                                        <tr>
                                            <td>Job Type</td>
                                            <td>:</td>
                                            <td>{job.type}</td>
                                        </tr>

                                        <tr>
                                            <td>Job Industry</td>
                                            <td>:</td>
                                            <td>{job.industry}</td>
                                        </tr>

                                        <tr>
                                            <td>Expected Salary</td>
                                            <td>:</td>
                                            <td>BDT{job.salary}</td>
                                        </tr>

                                        <tr>
                                            <td>Education</td>
                                            <td>:</td>
                                            <td>{job.education}</td>
                                        </tr>

                                        <tr>
                                            <td>Experience</td>
                                            <td>:</td>
                                            <td>{job.experience}</td>
                                        </tr>

                                        <tr>
                                            <td>Company</td>
                                            <td>:</td>
                                            <td>{job.company}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="job-location">
                                <h4>Job Location</h4>
                                <iframe src={job.map}
                                    width="100%"
                                    height="520"
                                    style={{ border: '0' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                // referrerpolicy="no-referrer-when-downgrade"
                                ></iframe>
                                {/* <MapContainer
                                    center={{ lat: lat, lng: lng }}
                                    zoom={13}
                                    scrollWheelZoom={false}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationMarker />
                                </MapContainer> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-4">
                        <div className="job-contact-details p-3">
                            <h4 className="my-4">More Details</h4>
                            <hr />
                            <h5>Email Address:</h5>
                            <p>{job.email}</p>

                            <h5>Job Posted:</h5>
                            <p>{moment.utc(job.created_at).local().startOf('seconds').fromNow()}</p>

                            <h5>Last Date:</h5>
                            <p>{job.last_date.substring(0, 10)}</p>
                        </div>
                        {is_date_passed && !applied && (
                            <div className="mt-5 p-0">
                                <div className="alert alert-danger">
                                    <h5>Note:</h5>
                                    You are not able to apply this job because theclast date is expired. Last
                                    date to apply for this job was: <b>{job.last_date.substring(0, 10)}</b>.
                                    <br /> Checkout others job on Job Stalker.
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDetails