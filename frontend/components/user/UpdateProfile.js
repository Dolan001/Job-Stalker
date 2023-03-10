import React, {Component, useState, useContext, useEffect} from 'react';
import {useRouter} from 'next/router'
import Image from "next/image";
import {toast} from "react-toastify";

import AuthContext from "../../context/AuthContext";

const UpdateProfile = ({access_token}) => {

    const [username, setUsername] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {updated, loading, error, user, clearError, updateProfile, setUpdated} = useContext(AuthContext)

    const router = useRouter()

    useEffect(() => {
        if(user){
            setUsername(user.username)
            setFirst_name(user.first_name)
            setLast_name(user.last_name)
            setEmail(user.email)
        }
        if(updated){
            toast.success('Updated Successfully')
            setUpdated(false)
            router.push('/profile')
        }
        if (error) {
            toast.error(error)
            clearError();
        }
    }, [error, user, updated])


    const submitHandler = (e) => {
        e.preventDefault()
        updateProfile({username, first_name, last_name, email, password}, access_token)
    }

    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{width: "100%", height: "100%", position: "relative"}}>
                        <Image src="/images/profile.webp" alt="register" layout={'fill'}/>
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h3 className={'mt-2'}>Update Profile</h3>
                        </div>
                        <form className="form" onSubmit={submitHandler}>
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user"></i>
                                    <input type="text"
                                           placeholder="Enter Username"
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}
                                           />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user"></i>
                                    <input type="text"
                                           placeholder="Enter First Name"
                                           value={first_name}
                                           onChange={(e) => setFirst_name(e.target.value)}
                                           />
                                </div>

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user-tie"></i>
                                    <input type="text"
                                           placeholder="Enter Last name"
                                           value={last_name}
                                           onChange={(e) => setLast_name(e.target.value)}
                                           />
                                </div>

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-envelope"></i>
                                    <input type="email"
                                           placeholder="Enter Your Email"
                                           pattern='\S+@\S+\.\S+'
                                           title='Your email is invalid'
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/*<div className="inputBox">*/}
                                {/*    <i aria-hidden className="fas fa-user-file"></i>*/}
                                {/*    <input type="file"*/}
                                {/*           placeholder="Upload resume"*/}
                                {/*           value={resume}*/}
                                {/*           onChange={(e) => setResume(e.target.value)}*/}
                                {/*           />*/}
                                {/*</div>*/}

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        minLength={6}
                                    />
                                </div>
                            </div>
                            <div className="registerButtonWrapper">
                                <button type="submit" className="registerButton">
                                    {loading ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile