import React from 'react'
import spinner from '../images/bar-loader.gif'

export const Spinner = () => {
    return (
        <>
          <img src={spinner} alt="Loading..." style={{position: 'relative', width: '200px', margin: 'auto', display: 'block', top: '300px' }} /> 
        </>
    )
}

export default Spinner