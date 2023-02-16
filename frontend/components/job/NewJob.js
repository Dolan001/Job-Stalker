import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'

import JobContext from '../../context/JobContext'
import { jobType, educationOptions, industryOptions, experienceOptions, jobTypeOptions } from './data'

const NewJob = ({ access_token }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [map, setMap] = useState('')
    const [type, setType] = useState('Permanent')
    const [education, setEducation] = useState('Bachelors')
    const [industry, setIndustry] = useState('Business')
    const [experience, setExperience] = useState('No Experience')
    const [salary, setSalary] = useState('')
    const [positions, setPositions] = useState('')
    const [company, setCompany] = useState('')
    const [last_date, setLast_date] = useState('')

    const { loading, clearError, error, created, newJob, setCreated } = useContext(JobContext)

    useEffect(() => {
        if (error) {
            toast.error(error)
            clearError()
        }

        if (created) {
            toast.success('Job posted successfully')
            setCreated(false)
        }
    }, [error, created])

    const submitHandler = (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
            email,
            address,
            map,
            type,
            education,
            industry,
            experience,
            salary,
            positions,
            company,
            last_date
        }

        console.log(data.last_date);

        newJob(
            {
                title,
                description,
                email,
                address,
                map,
                type,
                education,
                industry,
                experience,
                salary,
                positions,
                company,
                last_date
            }, access_token)

    }

    return (
        <div className="newJobcontainer">
            <div className="formWrapper">
                <div className="headerWrapper">
                    <div className="headerLogoWrapper"></div>
                    <h1>
                        <i aria-hidden className="fas fa-copy mr-2"></i> POST A JOB
                    </h1>
                </div>
                <form className="form" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fab fa-tumblr"></i>
                                    <input type="text"
                                        placeholder="Enter Job Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-file-medical-alt"></i>
                                    <textarea
                                        className="description"
                                        type="text"
                                        placeholder="Enter Job Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-envelope"></i>
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        pattern="\S+@\S+\.\S+"
                                        title="Your email is invalid"
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                                    <input type="text"
                                        placeholder="Enter Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                                    <input type="text"
                                        placeholder="Enter Map Location"
                                        value={map}
                                        onChange={(e) => setMap(e.target.value)}
                                        required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-dollar-sign"></i>
                                    <input
                                        type="number"
                                        placeholder="Enter Salary Range"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-users"></i>
                                    <input
                                        type="number"
                                        placeholder="Enter No. of Positions"
                                        value={positions}
                                        onChange={(e) => setPositions(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-building"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter Company Name"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
                            <div className="boxWrapper">
                                <h5>Job Types:</h5>
                                <div className="selectWrapper">
                                    <select
                                        className="classic"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        {jobTypeOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h5>Education:</h5>
                                <div className="selectWrapper">
                                    <select
                                        className="classic"
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
                                    >
                                        {educationOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h5>Industry:</h5>
                                <div className="selectWrapper">
                                    <select
                                        className="classic"
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                    >
                                        {industryOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h5>Experience:</h5>
                                <div className="selectWrapper">
                                    <select
                                        className="classic"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    >
                                        {experienceOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h5>Last Date:</h5>
                                <div>
                                    <input
                                        type="datetime-local"
                                        value={last_date}
                                        onChange={(e) => setLast_date(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col text-center mt-3">
                            <button className="createButton">
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewJob