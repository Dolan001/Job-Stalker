import React, {Component, useState, useContext, useEffect} from 'react';
import {useRouter} from 'next/router'
import Image from "next/image";
import Link from "next/link"
import {toast} from "react-toastify";

import AuthContext from "../../context/AuthContext";

const UploadResume = ({access_token}) => {

    const [resume, setResume] = useState(null)
    const {loading, user, error, uploaded, clearError, uploadResume, setUploaded} = useContext(AuthContext)

    useEffect(() => {
        if (uploaded) {
            toast.success("Your resume is successfully updated")
            setUploaded(false)
        }
        if (error) {
            toast.error(error)
            clearError();
        }
    }, [error, uploaded, user])


    const submitHandler = (e) => {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('resume', resume);
        const data = formdata.get('resume');

        uploadResume(data, access_token)
    }
    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{width: "100%", height: "100%", position: "relative"}}>
                        <Image src="/images/resume.jpeg" alt="resume" layout={'fill'}/>
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h3> UPLOAD RESUME </h3>
                        </div>
                        <form className="form" onSubmit={submitHandler}>
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-upload"></i>
                                    <input
                                        type="file"
                                        name="resume"
                                        id="customFile"
                                        accept="application/pdf"
                                        onChange={(e) => setResume(e.target.files[0])}
                                        required
                                    />
                                </div>
                            </div>

                            {user && user.resume && (
                                <>
                                    <h4 className="text-center my-3">OR</h4>

                                    <Link href={`https://job-stalker-bucket.s3.amazonaws.com/${user.resume}`} legacyBehavior>
                                        <a
                                            className="text-success text-center ml-4"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <b>
                                                <i aria-hidden className="fas fa-download"></i> Download
                                                Your Resume
                                            </b>
                                        </a>
                                    </Link>
                                </>
                            )}

                            <div className="uploadButtonWrapper">
                                <button type="submit" className="uploadButton">
                                    {loading ? 'Uploading...' : 'Upload'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadResume