import React from 'react';
import './AgentRegister.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AgentRegister() {

    const navigate=useNavigate();
    const [agent,setAgent] = useState({
        "agentId": 0,
        "users": {
            "userId": 0,
            "email": "",
            "role": "",
            "status": ""
        },
        "name": "",
        "dob": new Date(),
        "gender": "",
        "age": 0,
        "phoneNo": "",
        "password": ""
    });

    const validate = () => {
        let result = true;
        if (agent.name === "" || agent.name === null) {
            result = false;
            toast.warning('Please Enter Name ');
        }
        else if( agent.password === "" || agent.password=== null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        else if( agent.gender === "" || agent.gender=== null) {
            result = false;
            toast.warning('Please Enter gender');
        }
        else if( agent.phoneNo === "" || agent.phoneNo=== null) {
            result = false;
            toast.warning('Please Enter Phone No');
        }
        else if (agent.users.email === "" || agent.users.email === null) {
            result = false;
            toast.warning('Please Enter Email ');
        }
      else if( agent.dob > new Date()|| agent.dob === null) {
        result = false;
        toast.warning('Please Enter valid DOB');
      }
        return result;
        }

    var assignEmail=(event)=>
    {
        setAgent((agent)=>{
            return ({
                ...agent, "users": { ...agent.users,"email":event.target.value },
            });
        })
      }
    var AgentRegisteration = ()=>{
        if(validate()){
        console.log(agent);
        fetch("http://localhost:5295/api/User/action/AgentRegister",{
          "method":"POST",
          headers:{
              "accept": "text/plain",
              "Content-Type": 'application/json'
          },
          "body":JSON.stringify({...agent,"agent":{} })})
        .then(async (data)=>{
          if(data.status == 201)
          { 
              var myData = await data.json();
              console.log(myData); 
              toast.success('Register Successful!');       
              navigate('/login');     
          }
          if(data.status == 400){
            toast.error('Mail Id Not Available');
          }
        }).catch((err)=>{
          console.log(err.error)
        })
    }
      }

    return (
      <div >
        <section className="LoginPage">
            <style>
            </style>
            <header id="header" className="fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center">
                    <h1 className="logo me-auto">
                    <a href="index.html">Agent Registerartion<span></span></a>
                    </h1>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                    
                    </nav>
                    <Link to={'/customerregister'} className="get-started-btn scrollto">
                    Customer Register
                    </Link>
                    <Link to={'/login'} className="get-started-btn scrollto">
                    Login
                    </Link>
                </div>
            </header>
            
            <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card bg-glass formreg">
                <div className="card-body px-4 py-5">
                <div className="row">
                    <div className="col-md-6 mb-4">
                    {/* First name input */}
                    <div className="form-outline">
                        <input
                        type="text"
                        id="form3Example1"
                        className="form-control"
                        onBlur={(event) => setAgent({ ...agent, name: event.target.value })}
                        />
                        <label className="form-label" htmlFor="form3Example1">
                        Name
                        </label>
                    </div><br/>
                    <div className="form-outline">
                        <select
                        className="form-select"
                        id="form3Example5"
                        onChange={(event) => setAgent({ ...agent, gender: event.target.value })}
                        >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                        <label className="form-label" htmlFor="form3Example5">
                        Gender
                        </label>
                    </div><br/>

                    {/* Email input */}
                    <div className="form-outline">
                        <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        onBlur={assignEmail}
                        />
                        <label className="form-label" htmlFor="form3Example3">
                        Email address
                        </label>
                    </div>
                    </div>

                    <div className="col-md-6 mb-4">
                    {/* Password input */}
                    <div className="form-outline">
                        <input
                        type="password"
                        id="form3Example4"
                        className="form-control"
                        onBlur={(event) => setAgent({ ...agent, password: event.target.value })}
                        />
                        <label className="form-label" htmlFor="form3Example4">
                        Password
                        </label>
                    </div><br/>
                    

                    <div className="form-outline">
                        <input
                        type="text"
                        id="form3Example2"
                        className="form-control"
                        onBlur={(event) => setAgent({ ...agent, phoneNo: event.target.value })}
                        />
                        <label className="form-label" htmlFor="form3Example2">
                        Phone No
                        </label>
                    </div><br/>
                    {/* Last name input */}
                    <div className="form-outline">
                        <input
                        type="date"
                        id="form3Example2"
                        className="form-control"
                        onBlur={(event) => setAgent({ ...agent, dob:event.target.value })}
                        />
                        <label className="form-label" htmlFor="form3Example2">
                        DOB
                        </label>
                    </div>
                        
                    
                    </div>
                </div>

                {/* Submit button */}
                <button type="submit" onClick={AgentRegisteration} className="AReg btn btn-danger btn-block mb-4">
                    Sign up
                </button>

                
                </div>
            </div>
            </div>
        </section>
    </div>
  
  
    );
  }
  
  export default AgentRegister;