import React, { Component } from 'react'
import loading from './spinner.gif'

const Spinner  = ()=> {
  return (
        <div className='text-center'>
            <img src={loading} alt="loading" style={{height:'40px'}}/>
        </div>
    )
}
export default Spinner