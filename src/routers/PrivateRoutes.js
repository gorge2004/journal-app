import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect } from 'react-router-dom'

const PrivateRoutes = ({isAuthenticated, component: Component, ...rest}) => {
  return (
      <Route {...rest} component={(props)=>(
          (isAuthenticated)
          ? <Component {...props} />
          : <Redirect to='/auth/login'/>
      )}/>

    
  )
}

PrivateRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

export default PrivateRoutes