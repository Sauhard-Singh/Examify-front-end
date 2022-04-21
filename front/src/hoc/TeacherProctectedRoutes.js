import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const TeacherProtectedRoute = ({ Component, path, ...rest }) => {
    const loggedIn = localStorage.getItem('authToken');
    const type = localStorage.getItem('type');
    return (
        <Route
            path={path}
            {...rest}
        >
            {type === 'teacher' && loggedIn !== null ? <Component />
            : 
            (<Redirect to="/" />)
        }
        </Route>
    );
};


export default  TeacherProtectedRoute;