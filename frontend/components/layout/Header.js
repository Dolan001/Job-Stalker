import React from "react";
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
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
                  <Link href="/employer/jobs/new">
                      <button className="postAJobButton">
                          <span>Post a job</span>
                      </button>
                  </Link>
                  <Link href="/login">
                      <button className="loginButtonHeader">
                          <span>Login</span>
                      </button>
                  </Link>
                  <Link href="/search">
                      <button className="searchButtonHeader">
                          <span>Search</span>
                      </button>
                  </Link>
              </div>
          </div>
      </div>
  )
}
export default Header;