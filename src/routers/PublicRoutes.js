import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect } from 'react-router-dom'

const PublicRoutes = ({isAuthenticated, component: Component, ...rest}) => {
  return (
    <Route {...rest} component={(props)=>(
        (isAuthenticated)
        ? <Redirect to='/'/>
        :  <Component {...props} />
    )}/>);
}

PublicRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}
export default PublicRoutes