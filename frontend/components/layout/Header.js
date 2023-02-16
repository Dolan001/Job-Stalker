import React, { useContext } from "react";
import Link from 'next/link'
import Image from 'next/image'

import AuthContext from "../../context/AuthContext";

const Header = () => {

    const { loading, user, logout } = useContext(AuthContext)

    const logoutHandler = () => {
        logout();
    }

    return (
        <div className="navWrapper">
            <div className="navContainer">
                <Link href='/'>
                    <div className="logoWrapper">
                        <div className="logoImgWrapper">
                            <Image height="38" width="38" src="/images/logo3.png" alt="" />
                        </div>
                        <span className="logo1">Job </span>
                        <span className="logo2">Stalker</span>
                    </div>
                </Link>
                <div className="btnsWrapper">
                    <Link href="/job/new">
                        <button className="postAJobButton">
                            <span>Post a job</span>
                        </button>
                    </Link>

                    <Link href="/search">
                        <button className="searchButtonHeader">
                            <span>Search</span>
                        </button>
                    </Link>

                    {
                        user ? (
                            <div className='dropdown ml-3'>
                                <a href='#'
                                    className='btn dropdown-toggle mr-4'
                                    id="dropDownMenuButton"
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <span>Hi, {user.username}</span> {" "}
                                </a>
                                <div className='dropdown-menu' aria-labelledby='dropDownMenuButton'>
                                    <Link href="/job/me" legacyBehavior>
                                        <a className='dropdown-item'>My Jobs</a>
                                    </Link>
                                    <Link href="/profile/applied" legacyBehavior>
                                        <a className='dropdown-item'>Applied Jobs</a>
                                    </Link>
                                    <Link href="/profile" legacyBehavior>
                                        <a className='dropdown-item'>My Profile</a>
                                    </Link>
                                    <Link href="/upload/resume" legacyBehavior>
                                        <a className='dropdown-item'>Upload resume</a>
                                    </Link>
                                    <Link href="/" legacyBehavior>
                                        <a className='dropdown-item text-danger' onClick={logoutHandler}>Logout</a>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            !loading && (
                                <Link href="/login">
                                    <button className="loginButtonHeader">
                                        <span>Login</span>
                                    </button>
                                </Link>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default Header;