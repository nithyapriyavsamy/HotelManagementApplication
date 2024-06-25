import { useState,useEffect } from "react";
import './ViewAgents.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ViewAgents()
{
    const navigate = useNavigate();
    const [agents,setAgents]=useState([]);
    const [filterAgents,setFilterAgents]=useState([]);
    var [filter,setFilter] = useState();

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  Agents()
        return () => { ignore = true; }
        },[]);

    var Agents=()=>
    {
        console.log("*");
        fetch("http://localhost:5295/api/User/action/AllAgents",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            // "body":JSON.stringify({...statusDTO,"statusDTO":{} })
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                const responseData=await data.json();
                setAgents(responseData);
                setFilterAgents(responseData);
                console.log(agents);
            }
        })
        .catch((err)=>
        {
                console.log(err.error);
        })
    }

    var Logout=()=>{
        localStorage.clear();
    }

    var FilterGet = () => {

        if (filter == "All" ) {
            setAgents(filterAgents);
        } 
        else{
            setAgents(filterAgents.filter(agent => agent.users.status === filter));
        }
    }

   
    

    return(
        <div>
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">
                        <h1 className="logo me-auto">
                        <a href="index.html">Admin<span></span></a>
                        </h1>

                        <nav id="navbar" className="navbar order-last order-lg-0">
                        <select className="get-started-btn scrollto filterbtn"  onChange={(event)=>{
                        filter=event.target.value;
                        console.log(filter);
                        FilterGet();
                    }}>
                        <option value="All"  selected >All</option>
                        <option value="Approved"  selected >Approved</option>
                        <option value="Denied"  selected >Denied</option>
                        <option value="Requested"  selected >Requested</option>
                    </select>
                        
                        </nav>
                        <Link to={'/'} onClick={Logout} className="get-started-btn scrollto filterbtn">
                        Logout
                        </Link>
                    </div>
                </header>
            </div>
            <div className="agentslist row" style={{marginTop:'100px'}}>
      {agents.map((agent, index) => (
        <div key={index} className="col-md-3 mb-3">
          <div className="card doctorcard card-body card shadow p-3 rounded">
            <h5 className="card-title"><b>{agent.agentId}</b></h5>
            <p className="card-text"><b>{agent.name}</b></p>
            <p className="card-text"><b>DOB - {new Date(agent.dob).toLocaleDateString()}</b></p>
            <p className="card-text"><b>Age - {agent.age}</b></p>
            <p className="card-text"><b>Gender - {agent.gender}</b></p>
            <p className="card-text"><b>Phone - {agent.phoneNo}</b></p>
            <p className="card-text"><b>Status - {agent.users.status}</b></p>
            <div className="approve">
            <button className="btn btn-success" onClick={()=>{
                        const requestBody={
                                "userId": agent.agentId,
                                "email": "string",
                                "password": "string",
                                "role": "string",
                                "status": "Approved",
                                "token": "string"
                        }
                        console.log(requestBody);
                        fetch("http://localhost:5295/api/User/action/ChangeStatus",
                        {
                            "method":"POST",
                            headers:{
                                "accept": "text/plain",
                                "Content-Type": "application/json",
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            "body":JSON.stringify({...requestBody,"requestBody":{} })
                        })
                        .then(async (data)=>
                        {
                            if(data.status == 200)
                            {
                                Agents()
                            }
                        })
                        .catch((err)=>
                        {
                                console.log(err.error)
                        })
                }}>Approve</button>
                <button className="btn btn-danger" onClick={()=>{
                        const requestBody={
                            "userId": agent.agentId,
                                "email": "string",
                                "password": "string",
                                "role": "string",
                                "status": "Denied",
                                "token": "string"
                        }
                        console.log(requestBody);
                        fetch("http://localhost:5295/api/User/action/ChangeStatus",
                        {
                            "method":"POST",
                            headers:{
                                "accept": "text/plain",
                                "Content-Type": "application/json",
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            "body":JSON.stringify({...requestBody,"requestBody":{} })
                        })
                        .then(async (data)=>
                        {
                            if(data.status == 200)
                            {
                                Agents()
                            }
                        })
                        .catch((err)=>
                        {
                                console.log(err.error)
                        })
                }}>Deny</button>
                </div>
          </div>
        </div>
      ))}
    </div>
        </div>
    )
}

export default ViewAgents;