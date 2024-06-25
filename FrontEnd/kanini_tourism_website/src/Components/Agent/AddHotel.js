import { useState,useEffect } from "react";
import './AddHotel.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function AddHotel({closeAddHotel,refresh})
{
    const [hotel, setHotel] = useState({
        "id": 0,
        "name": "string",
        "description": "stringstringstringstrings",
        "email": "user@example.com",
        "address": "string",
        "contactNumber": "stringstri",
        "city": "string",
        "country": "India",
        "state": "string",
        "minimumPrice": 0,
        "maximumPrice": 0,
        "agentId": 1
      })
    
      var AddHotel=()=>
    {
        setHotel({...hotel, "agentId":Number(localStorage.getItem('Id'))});
        console.log("*");
        console.log(hotel);
        fetch("http://localhost:5083/api/Hotel/action/AddHotel",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            "body":JSON.stringify({...hotel,"hotel":{} })})
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                const responseData=(await data.json());
                toast.success('Added');
                refresh();
                console.log(responseData);
                closeAddHotel();
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    
     
    
      return (
        <div className="popup">
          <div className="popup-inner">
            <h4><b>Add Hotel</b></h4>
            <div>
             
                    <table>
                <tr>
                    <td>
                        <label><b>Name</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Role Name"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "name":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>About</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="About"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "description":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td> 
                </tr>
                <tr>
                    <td>
                        <label><b>Email</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Email"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "email":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label><b>Address</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Address"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "address":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>City</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="City"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "city":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>State</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="State"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "state":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                {/* <tr>
                    <td>
                        <label><b>Country</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Country"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "country":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr>  */}
                
                <tr>
                    <td>
                        <label><b>Min Price</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Minimum Price"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "minimumPrice":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label><b>Max Price</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Maximum Price"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, "maximumPrice":event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr>
            </table>
            <button type="button" onClick={AddHotel} >Add</button>
            <button type="button" onClick={closeAddHotel} >close</button>
            </div>
          </div>
        </div>
    
    )
}

export default AddHotel;