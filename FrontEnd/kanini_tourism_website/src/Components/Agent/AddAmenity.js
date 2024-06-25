import { useState,useEffect } from "react";
import './AddHotel.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function AddAmenity({closeAddAmenity,id})
{
    const [hotel, setHotel] = useState({
        "id": 0,
        "hotelId" : Number(id),
        "amenityType": ""
      })

      const validate = () => {
        let result = true;
        if (hotel.amenityType === "" || hotel.amenityType === null) {
            result = false;
            toast.warning('Please Enter Amenity Type ');
        }
        return result;
    }
    
      var AddAmenity=()=>
        {
            if(validate()){
        console.log(hotel);
        fetch("http://localhost:5083/api/Amenity/action/AddAmenity",
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
                const responseData=(await data.json());
                toast.success('Added');
                console.log(responseData);
                closeAddAmenity();
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    }
    
     
    
      return (
        <div className="popup">
          <div className="popup-inner">
          <h4><b>Add Amenity</b></h4>
            <div>
             
                    <table>
                <tr>
                    <td>
                        <label><b>Amenity</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Amenity"
                            type="text"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, amenityType:event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
            </table>
            <button type="button" onClick={AddAmenity} >Add</button>
            <button type="button" onClick={closeAddAmenity} >close</button>
            </div>
          </div>
        </div>
    
    )
}

export default AddAmenity;