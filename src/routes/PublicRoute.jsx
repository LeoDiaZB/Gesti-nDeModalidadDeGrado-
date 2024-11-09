import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
    const isAuthenticated = localStorage.getItem('userInfo')

    return !isAuthenticated ? children : <Navigate to="/home" />;
}

export default PublicRoute;