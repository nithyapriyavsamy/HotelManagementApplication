import { Navigate } from "react-router-dom";

function AgentProtected({token,role,children})
{
    token=localStorage.getItem("token");
    role = localStorage.getItem("role");
    if(token!=null && role=="Agent")
        return children;
    return <Navigate to='/'/>
}

export default AgentProtected;