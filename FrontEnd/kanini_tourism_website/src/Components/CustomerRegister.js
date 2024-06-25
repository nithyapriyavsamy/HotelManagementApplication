import React from 'react';
import './CustomerRegister.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CustomerRegister() {

    const navigate=useNavigate();
    const [customer,setCustomer] = useState({
        "agentId": 0,
        "users": {
            "userId": 0,
            "email": "",
            "role": "string",
            "status": "string"
        },
        "name": "",
        "dob": "",
        "gender": "",
        "age": 0,
        "phoneNo": "",
        "password": ""
    });

    var assignEmail=(event)=>
    {
        setCustomer((customer)=>{
            return ({
                ...customer, "users": { ...customer.users,"email":event.target.value },
            });
        })
      }

      const validate = () => {
        let result = true;
        if (customer.name === "" || customer.name === null) {
            result = false;
            toast.warning('Please Enter Name ');
        }
        else if( customer.password === "" || customer.password=== null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        else if( customer.gender === "" || customer.gender=== null) {
            result = false;
            toast.warning('Please Enter gender');
        }
        else if( customer.phoneNo === "" || customer.phoneNo=== null) {
            result = false;
            toast.warning('Please Enter Phone No');
        }
        else if (customer.users.email === "" || customer.users.email === null) {
            result = false;
            toast.warning('Please Enter Email ');
        }
      else if( customer.dob > new Date()|| customer.dob === null) {
        result = false;
        toast.warning('Please Enter valid DOB');
      }
        return result;
        }

    var CustomerRegisteration = ()=>{
        if(validate()){
        console.log(customer);
        fetch("http://localhost:5295/api/User/action/CustomerRegister",{
          "method":"POST",
          headers:{
              "accept": "text/plain",
              "Content-Type": 'application/json'
          },
          "body":JSON.stringify({...customer,"customer":{} })})
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
                    <a href="index.html">Customer Registerartion<span></span></a>
                    </h1>

                    <nav id="navbar" className="navbar order-last order-lg-0">
                    
                    </nav>
                    <Link to={'/agentregister'} className="get-started-btn scrollto">
                    Agent Register
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
                        onBlur={(event) => setCustomer({ ...customer, name: event.target.value })}
                        />
                        <label className="form-label" htmlFor="form3Example1">
                        Name
                        </label>
                    </div><br/>

                    <div className="form-outline">
                        <select
                        className="form-select"
                        id="form3Example5"
                        onChange={(event) => setCustomer({ ...customer, gender: event.target.value })}
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
                        onBlur={(event) => setCustomer({ ...customer, password: event.target.value })}
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
                        onBlur={(event) => setCustomer({ ...customer, phoneNo: event.target.value })}
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
                        onBlur={(event) => setCustomer({ ...customer, dob:event.target.value })}
                        />
                        <label className="form-label" htmlFor="form3Example2">
                        DOB
                        </label>
                    </div>
                        
                    
                    </div>
                </div>

                {/* Submit button */}
                <button type="submit" onClick={CustomerRegisteration} className="AReg btn btn-danger btn-block mb-4">
                    Sign up
                </button>

                
                </div>
            </div>
            </div>
        </section>
    </div>
  
  
  
    );
  }
  
  export default CustomerRegister;