import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const CustomRoute = ({ Component, path, redirect, ...rest }) => {
    const loggedIn = localStorage.getItem('authToken');
    const type = localStorage.getItem('type');
    return (
    <Route
        path={path}
        {...rest}
    >
        {loggedIn === null ? <Component />
        : 
        (<Redirect to={type === 'student' ? '/studentHome' : '/teacherHome'} />)
        }
    </Route>
    );
};


export default CustomRoute;