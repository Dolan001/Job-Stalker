import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='py-1'>
            <p className='text-center mt-1'>
                Job-Stalker - 2022-2023, All Right Reserved
                <Link className='ml-4' rel='noreferrer' target="_blank" href="#">
                    People illustrations by Job-Stalker
                </Link>
            </p>
        </footer>
    )
}

export default Footer