import { Navigate } from 'react-router-dom';

export default function RedirectToUsers() {
    return <Navigate to="/users" replace />;
}
