import { useState,useEffect } from "react";
import './HotelEdit.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AddHotel from "./AddHotel";
import AddAmenity from "./AddAmenity";
import AddRoom from "./AddRoom";
import AddImage from "./AddImage";


function HotelEdit()
{
    const navigate = useNavigate();
    const [hotel,setHotel]=useState({
        "id": 1,
        "name": "Novotel",
        "description": "The best one in the city of chennai",
        "email": "novotel@gmail.com",
        "address": "74,Anna nagar",
        "contactNumber": "1234567890",
        "city": "chennai",
        "country": "India",
        "state": "Tamil Nadu",
        "minimumPrice": 2000,
        "maximumPrice": 4000,
        "agentId": 1,
        "images": [],
    "amenityType": [],
    "rooms": []
    });
    const [Iddto,setIdDTO]=useState({
        "id": 0
      });
    const [images,setImages]=useState([]);
    const [amenity,setAmenity]=useState([]);
    const [romms,setRooms]=useState([]);

    const [openAmenity,setOpenAmenity]=useState(false);
    const [openImage,setOpenImage]=useState(false);
    const [openAddRoom,setOpenAddRoom]=useState(false);
    var {id}=useParams();

    useEffect(() => {
        let ignore = false;
        
        if (!ignore)  Hotel()
        return () => { ignore = true; }
        },[]);

        var Hotel=()=>
        {
            console.log(id);
            fetch("http://localhost:5083/api/Hotel/action/GetHotel",
            {
                "method":"POST",
                headers:{
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                "body":JSON.stringify({"id":id })
            })
            .then(async (data)=>
            {
                if (data.status === 200) {
                    const responseData = await data.json();
                    setHotel(responseData);
                    if(responseData.amenityType!=null){
                        setAmenity(responseData.amenityType);
                    }
                    if(responseData.images!=null){
                        setImages(responseData.images);
                    }
                    if(responseData.rooms!=null){
                        setRooms(responseData.rooms);
                    }
                    
                }
                if(data.status == 400)
                {
                    console.log("hotels");
                    // setFilterAgents(responseData);
                }
            })
            .catch((err)=>
            {
                    console.log(err.error);
            })
        }

        var DeleteAmenity=()=>
        {
            fetch("http://localhost:5083/api/Amenity/action/DeleteAmenity",
            {
                "method":"DELETE",
                headers:{
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                 "body":JSON.stringify(Iddto)
            })
            .then(async (data)=>
            {
                if (data.status === 200) {
                    toast.success('Deleted');
                    Hotel();
                }
                if(data.status == 400)
                {
                    
                }
            })
            .catch((err)=>
            {
                    console.log(err.error);
            })
        }

        var DeleteRoom=()=>
        {
            fetch("http://localhost:5083/api/Room/action/DeleteRoom",
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
                if (data.status === 200) {
                    toast.success('Deleted');
                    Hotel();
                }
                if(data.status == 400)
                {
                    
                }
            })
            .catch((err)=>
            {
                    console.log(err.error);
            })
        }

     const  Logout=()=>{
        localStorage.clear();
     }

    const OpenAmenity=()=>{
        setOpenAmenity(true);
    }
    const CloseAmenity=()=>{
        setOpenAmenity(false);
        Hotel();
    }
    const OpenAddRoom=()=>{
        setOpenAddRoom(true);
    }
    const CloseAddRoom=()=>{
        setOpenAddRoom(false);
        Hotel();
    }
    const OpenAddImage=()=>{
        setOpenImage(true);
    }
    const CloseAddImage=()=>{
        setOpenImage(false);
        Hotel();
    }

    return(
        <div>
            <div>
                <header id="header" className="fixed-top d-flex align-items-center">
                    <div className="container d-flex align-items-center">
                        <h1 className="logo me-auto">
                        <a href="index.html">{hotel.name}<span></span></a>
                        </h1>
                        <nav id="navbar" className="navbar order-last order-lg-0">
                        </nav>
                        <Link className="get-started-btn scrollto" onClick={OpenAmenity} >Add Amenity</Link>
                        {openAmenity && <AddAmenity id={id} closeAddAmenity={CloseAmenity} />}

                        <Link className="get-started-btn scrollto" onClick={OpenAddImage} >Add Image</Link>
                        {openImage && <AddImage id={id} CloseAddImage={CloseAddImage} />}

                        <Link className="get-started-btn scrollto" onClick={OpenAddRoom} >Add Room</Link>
                        {openAddRoom && <AddRoom id={id} closeAddRoom={CloseAddRoom} />}

                        <Link className="get-started-btn scrollto" to='/' onClick={Logout} >Logout</Link>

                    </div>
                </header>
            </div>
            <div className="editContent">
                    <section id="portfolio" className="portfolio">
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                            <h2>Hotel Images</h2>
                            
                            </div>
                            <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
                            {images.map((im, index) => (
                                <div className="col-lg-4 col-md-6 portfolio-item imagesabout" key={index}>
                                    <div className="portfolio-wrap">
                                        <img src={im.imageUrl} className="img-fluid" alt={`Image ${index}`} style={{ height: '200px', width: '350px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    </section>
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                            <h2>Amenities</h2>
                            </div>
                            <div className="row amenitylist">
                            {amenity.map((ame,index)=>{
                                            return(
                                                <div className="col-sm-2 amenityshow">
                                                <div className="card " >
                                                <button type="button" class="close btn" aria-label="Close" onClick={()=>{
                                                    setIdDTO({id:ame.id})
                                                    DeleteAmenity()
                                                }} style={{position: 'absolute', top: '2px', right: '2px'}}>
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                <div className="card-body" >
                                                    <h5 className="card-title"><b>{ame.amenityType}</b></h5>
                                                </div>
                                                </div>
                                            </div>
                    )}) }</div>
                        </div>
                        <br/>
                            <div className="section-title">
                            <h2>Rooms</h2>
                            </div>
                    <div class="row roomsarea">
                        {romms.map((rm, index) => (
                                    <div className="col-sm-2">
                                    <div className="card">
                                    <button type="button" class="close btn" aria-label="Close" onClick={()=>{
                                                    setIdDTO({id:rm.id})
                                                    DeleteRoom()
                                                }} style={{position: 'absolute', top: '2px', right: '2px'}}>
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                    <div className="card-body">
                                        <h5 className="card-title">{rm.roomNo}</h5>
                                        <p className="card-text">Capacity : {rm.capacity}</p>
                                        <p className="card-text">Price : {rm.price}</p>
                                        <a  className="btn btn-danger">{rm.roomType}</a>
                                    </div>
                                    </div>
                                </div>
                                ))}
                    </div>
        </div>
        </div>
    )
}

export default HotelEdit;