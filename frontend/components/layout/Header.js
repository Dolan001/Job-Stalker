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
                          <Image height="50" width="50" src="/images/logo.png" alt="" />
                      </div>
                      <span className="logo1">Job</span>
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
                          <span>Log in</span>
                      </button>
                  </Link>
              </div>
          </div>
      </div>
  )
}
export default Header;