import React, { Component } from 'react'
import Loading from './Loading.gif'

const Spinner=()=> {
    return (
      <div>
        <img src={Loading} alt="Loading" />
      </div>
    )
}

export default Spinner