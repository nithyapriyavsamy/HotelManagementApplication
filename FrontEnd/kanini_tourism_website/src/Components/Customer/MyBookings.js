import { useState,useEffect } from "react";
import './MyBookings.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import hotel1 from '../../Images/hero.jpg';


function MyBookings()
{
    const navigate = useNavigate();
    const [bookings,setBookings]=useState([]);
    const [Iddto,setIdDTO]=useState({
        "userId": Number(localStorage.getItem('Id'))
      });
    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  Hotels()
        return () => { ignore = true; }
        },[]);

    var Hotels=()=>
    {
        console.log(Iddto)
        fetch("http://localhost:5130/api/Booking/FetchBookingByUserId",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            "body":JSON.stringify(Iddto)
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                const responseData=await data.json();
                setBookings(responseData);
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
    
    

    return(
        <div className="myBookings">
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">
                        <h1 className="logo me-auto">
                        <a href="index.html">My Bookings<span></span></a>
                        </h1>
                        <nav id="navbar" className="navbar order-last order-lg-0">
                        </nav>
                        <Link to={'/customerView'}  className="get-started-btn scrollto">
                            Back
                        </Link>
                        <Link to={'/'} onClick={Logout} className="get-started-btn scrollto">
                            Logout
                        </Link>

                    </div>
                </header>

            </div>
            <div class="row roomsarea" style={{marginTop: '100px'}}>
                        {bookings.map((bk, index) => (
                                    <div className="col-sm-2 forback">
                                    <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{bk.roomId}</h5>
                                        <p className="card-text"><b>Check-In-Date </b>{new Date(bk.startDate).toLocaleDateString()}</p>
                                        <p className="card-text"><b>Check-Out-Date </b>{new Date(bk.endDate).toLocaleDateString()}</p>
                                    </div>
                                    </div>
                                </div>
                                ))}
                    </div>
        </div>
    )
}

export default MyBookings;