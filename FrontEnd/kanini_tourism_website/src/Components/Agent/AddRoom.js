import { useState,useEffect } from "react";
import './AddHotel.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function AddRoom({closeAddRoom,id})
{
    const Id=Number(id);
    const [hotel, setHotel] = useState({
        "id": 0,
        "hotelId": Id,
        "roomNo": 0,
        "price": 0.01,
        "capacity": 2147483647,
        "roomType": "string"
      })
    
      var Addroom=()=>
        {
        console.log(hotel);
        fetch("http://localhost:5083/api/Room/action/AddRoom",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body:JSON.stringify(hotel)})
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                toast.success('Added');
                closeAddRoom();
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
            <h4><b>Add Room</b></h4>
            <div>
             
                    <table>
                <tr>
                    <td>
                        <label><b>Room No</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Room No"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, roomNo:Number(event.target.value)})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Price</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Price"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, price:Number(event.target.value)})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Capacity</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Capacity"
                            type="number"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, capacity:Number(event.target.value)})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Room Type</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <select
                        className="form-select myInput"
                        id="form3Example5"
                        onChange={(event) => setHotel({ ...hotel, roomType: event.target.value })}
                        >
                        <option value="">Select Type</option>
                        <option value="AC">AC</option>
                        <option value="Non-AC">Non-AC</option>
                        </select>
                        </div>
                    </td>
                </tr> 
            </table>
            <button type="button" onClick={Addroom} >Add</button>
            <button type="button" onClick={closeAddRoom} >close</button>
            </div>
          </div>
        </div>
    
    )
}

export default AddRoom;