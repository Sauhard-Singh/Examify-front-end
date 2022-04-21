import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ Component, path, ...rest }) => {
    const loggedIn = localStorage.getItem('authToken');
    const type = localStorage.getItem('type');

    console.log(type);
    
    return (
        <Route
            path={path}
            {...rest}
        >
        {type === 'student' && loggedIn !== null ? <Component />
        : 
        (<Redirect to="/" />)
        }

        </Route>
    );
};


export default ProtectedRoute;