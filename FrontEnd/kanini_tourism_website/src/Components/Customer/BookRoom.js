import { useState,useEffect } from "react";
import './BookRoom.css';
import jsPDF from 'jspdf';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function BookRoom({closeBookRoom,hotelId,roomId,hotelInfo,price})
{
    const Id=Number(hotelId);
    const roomNo = Number(roomId);
    const [hotel, setHotel] = useState({
        
        "id": 0,
        "userId": Number(localStorage.getItem('Id')),
        "hotelId": Id,
        "roomId": roomNo,
        "startDate": "2023-08-08T07:52:55.603Z",
        "endDate": "2023-08-08T07:52:55.603Z"
      })

      const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        
        // Add content to the PDF
        pdf.text('Booking Confirmation', 10, 10);
        pdf.text(`Hotel: ${hotelInfo.name}`, 10, 20);
        pdf.text(`About: ${hotelInfo.description}`, 10, 30);
        pdf.text(`Room No: ${roomId}`, 10, 40);
        pdf.text(`Check-in: ${hotel.startDate}`, 10, 50);
        pdf.text(`Check-out: ${hotel.endDate}`, 10, 60);
        pdf.text(`Total Price: ${price}`, 10, 70);
        const gst = price * 0.18;
        pdf.text(`GST: Rs. ${gst}`, 10, 80);
        const total = price + gst;
        pdf.text(`Total: Rs. ${total}`, 10, 90);
        pdf.text('Happy Stay!!', 10, 100);

        
        // Save the PDF
        pdf.save('booking_confirmation.pdf');
      };
    
      var Bookroom=()=>
        {
        console.log(hotel);
        fetch("http://localhost:5130/api/Booking/Booking",
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
                handleDownloadPDF();
                toast.success('Sucessfully Booked');
                closeBookRoom();
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
            <h4><b>Book Room</b></h4>
            <div>
             
                    <table>
                <tr>
                    <td>
                        <label><b>Check In Date</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Room No"
                            type="Date"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, startDate:event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
                <tr>
                    <td>
                        <label><b>Check Out Date</b></label>
                    </td>
                    <td>
                        <div className="form-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            className="myInput"
                            placeholder="Price"
                            type="Date"
                            id="email"
                            required
                            onChange={(event)=>{
                                setHotel({...hotel, endDate:event.target.value})
                            }
                            }
                        />
                        </div>
                    </td>
                </tr> 
            </table>
            <button type="button" onClick={Bookroom} >Add</button>
            <button type="button" onClick={closeBookRoom} >close</button>
            </div>
          </div>
        </div>
    
    )
}

export default BookRoom;