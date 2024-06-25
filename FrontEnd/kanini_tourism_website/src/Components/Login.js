import React from 'react';
import './Login.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function Login() {

    const navigate=useNavigate();
    const [user,setUser] = useState({
        "UserId": 0,
        "email":"",
        "password":"",
        "Role": "",
        "status":"",
        "token": ""
    });

    const validate = () => {
        let result = true;
        if (user.email === "" || user.email === null) {
            result = false;
            toast.warning('Please Enter Email ');
        }
        else if( user.password === "" || user.password=== null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }
    var login = ()=>{
        if(validate()){
        fetch("http://localhost:5295/api/User/action/Login",{
          "method":"POST",
          headers:{
              "accept": "text/plain",
              "Content-Type": 'application/json'
          },
          "body":JSON.stringify({...user,"user":{} })})
        .then(async (data)=>{
          if(data.status == 201)
          { 
              var myData = await data.json();
              console.log(myData); 
              localStorage.setItem("token" , myData.token.toString()); 
              localStorage.setItem("role",myData.role);
              localStorage.setItem("Id" , myData.userId.toString()); 
              toast.success('Login Successful!');       
              if(myData.role=="Admin")
              {
                navigate("/adminView") ;             
              }          
              else if(myData.role=="Customer")
              {
                navigate("/customerView") ; 
              } 
              else if(myData.role=="Agent")
              {
                if(myData.status=="Approved") {
                    navigate("/agentView") ; 
                }
                else{
                    toast.error('You are yet to be Approved');
                    navigate("/") ;
                    localStorage.clear(); 
                }
              }          
          }
          if(data.status == 400){
            toast.error('Check your credentials!');
          }
        }).catch((err)=>{
          alert("Check your credentials");
          console.log(err.error)
        })
    }
      }
var areg=()=>{
    navigate('/agentregister')
}
var creg=()=>{
    navigate('/customerregister')
}
var home=()=>{
    navigate('/')
}

    return (
      <div >
        <section className="LoginPage">
            <style>
            </style>
            <header id="header" className="fixed-top  align-items-center"> 
  <Navbar className="custom-navbar" expand="lg" >
                <Navbar.Brand href="#"><h3><b>Voyage Villas</b></h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='navbar-nithya'>
                    <Nav className="mr-auto">
                    <Nav.Link onClick={areg}>Agent Register</Nav.Link>
                    <Nav.Link onClick={creg}>Traveller Register</Nav.Link> 
                    <Nav.Link onClick={home}>Home</Nav.Link> 
                    <Nav.Link><a href="#about" className="" >
          
        </a></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
  </Navbar>
    </header>


            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">
                    <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                        <h1 className=" logintext my-5 display-5 fw-bold ls-tight" style={{ color: 'aqua' }}>
                        <br />
                        <span style={{ color: 'black' }}></span>
                        </h1>
                        <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                        
                        </p>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">
                        <div className="card-body px-4 py-5 px-md-5">
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control" onBlur={(event)=>{
                                        setUser({...user, "email":event.target.value})
                                    }
                                    } />
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>

                            {/* Password input */}
                            <div className="form-outline mb-4">
                                <input type="password" id="form3Example4" className="form-control" onBlur={(event)=>{
                                        setUser({...user, "password":event.target.value})
                                    }
                                } />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            {/* Submit button */}
                            <button type="submit" onClick={login} className=" login btn btn-danger btn-block mb-4">
                                Sign up
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  
  
    );
  }
  
  export default Login;