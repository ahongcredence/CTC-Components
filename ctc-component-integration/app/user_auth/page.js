'use client'
import UserAuth from "./UserAuth"
import React from 'react'
import { useRouter } from 'next/navigation';
import '../globals.css'
function page() {
    const router = useRouter();
    return (
        <div className="component-container">
            <UserAuth />
            <div className='absolute bottom-4 left-4'>
                <button
                    className="usa-button usa-button--secondary"
                    onClick={() => router.push('/')}>
                    Back to Home
                </button>
            </div>

        </ div>
    )
}

export default page