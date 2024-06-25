import { useState,useEffect } from "react";
import './ViewHotels.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import hotel1 from "../../Images/hero.jpg";
import hotel2 from '../../Images/hero1.jpg';
import hotel3 from '../../Images/hotel1.jpg';
import MyBookings from "./MyBookings";
import styled from 'styled-components';

function ViewHotels()
{
    const navigate = useNavigate();
    const [hotels,setHotels]=useState([]);
    const staticImages = [
        hotel1,
        hotel2,
        hotel3
    ];
    

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  Hotels()
        return () => { ignore = true; }
        },[]);

    var Hotels=()=>
    {
        fetch("http://localhost:5083/api/Hotel/action/GetAllHotels",
        {
            "method":"GET",
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
                setHotels(responseData);
                // setFilterAgents(responseData);
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
        <div className="viewHotels">
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">
                        <h1 className="logo me-auto">
                        <a href="index.html">Hotels<span></span></a>
                        </h1>

                        <nav id="navbar" className="navbar order-last order-lg-0">
                        </nav>
                        <Link to={'/myBooking'}  className="get-started-btn scrollto">
                        Bookings
                        </Link>
                        <Link to={'/'} onClick={Logout} className="get-started-btn scrollto">
                        Logout
                        </Link>
                    </div>
                </header>
            </div>
            <section id="portfolio" className="portfolio">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Hotels</h2>
          <p>    "Discover a world of luxury and comfort at renowned hotels like The Ritz-Carlton and Four Seasons, where impeccable service meets breathtaking elegance." </p>
        </div>
        <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
        {hotels.map((hotel,index)=>{
                        return(
        <div className="col-lg-4 col-md-6 portfolio-item">
            <div className="portfolio-wrap" onClick={()=>{navigate(`/booking/${hotel.id}`)}}>
            <img src={staticImages[index % staticImages.length]}  className="img-fluid" alt="App 1" style={{height:'150px',width:'420px'}}/>
              <div className="portfolio-info">
                <h4>{hotel.contactNumber}</h4>
                <h4>{hotel.email}</h4>
                <div className="portfolio-links contentofhotel">
                  <h5>{hotel.minimumPrice}-{hotel.maximumPrice}</h5>
                </div>
              </div>
              </div> 
              <div className="portfolio-wrap belowContent" onClick={()=>{navigate(`/booking/${hotel.id}`)}}>
              <br/><h4><b>{hotel.name}</b></h4>
                <div className="portfolio-links ">
                    <table>
                        <tr>
                            <td>About</td>
                            <td>{hotel.description}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{hotel.address},{hotel.city},{hotel.state},{hotel.country}</td>
                        </tr>
                    </table>
                    </div>
              </div>
        </div>
         )}) }
         </div>
      </div>
    </section>
        </div>
    )
}

export default ViewHotels;