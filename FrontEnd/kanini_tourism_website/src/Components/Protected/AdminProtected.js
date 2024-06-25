import { Navigate } from "react-router-dom";

function AdminProtected({token,role,children})
{
    token=localStorage.getItem("token");
    role = localStorage.getItem("role");
    if(token!=null && role=="Admin")
        return children;
    return <Navigate to='/'/>
}

export default AdminProtected;