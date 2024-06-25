import { Navigate } from "react-router-dom";

function CustomerProtected({token,role,children})
{
    token=localStorage.getItem("token");
    role = localStorage.getItem("role");
    if(token!=null && role=="Customer")
        return children;
    return <Navigate to='/'/>
}

export default CustomerProtected;