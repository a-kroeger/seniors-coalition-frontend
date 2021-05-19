import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <div className="error-body">
            <Helmet>
            <title>Oops... Error 404</title>
            </Helmet>
            <h1>Whoops! Error 404</h1>
            <h2>It looks like your request didn't return any results.</h2>
            <p>Hint: Be sure to double check your URL!</p>
            <Link className="button" to="/">Go to homepage</Link>
        </div>
    )
}
