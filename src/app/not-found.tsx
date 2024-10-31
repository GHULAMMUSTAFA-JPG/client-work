import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Not Found',
};

const NotFound = () => {
    return (
        <section className="home-page">
            <h5>Page Not Found</h5>
            <a href='/'>Back to home</a>
        </section>
    )
}

export default NotFound