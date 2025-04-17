import { Navigate } from 'react-router-dom';
import { useAuth } from './hook/AuthContext';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, hasAdminAccess, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && !hasAdminAccess()) {
        return <Navigate to="/" />;
    }

    return children;
}; 