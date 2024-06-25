import './Home.css';
import React from 'react';
import hotel from '../Images/hero.jpg';
import hotel1 from '../Images/hotel1.jpg';
import hotel2 from '../Images/hotel2.jpeg';
import hotel3 from '../Images/hotel3.webp';
import hotel4 from '../Images/hotel4.jpeg';
import hotel5 from '../Images/hotel5.jpg';
import hotel6 from '../Images/hotel6.jpg';
import logo1 from '../Images/logo.jpg';
import 'boxicons/css/boxicons.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";


function Home() {
    var navigate = useNavigate();
    var Start=()=>{
        navigate('/login');
    }
  return (
    <div >
<header id="header" className="fixed-top  align-items-center"> 
  <Navbar className="custom-navbar" expand="lg" >
                <Navbar.Brand href="#"><h3><b>Voyage Villas</b></h3></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='navbar-nithya'>
                    <Nav className="mr-auto">
                    <Nav.Link >Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#portfolio">View</Nav.Link>
                    <Nav.Link href="#contact">Contact</Nav.Link>
                    <Nav.Link onClick={Start}>Join</Nav.Link> 
                    <Nav.Link><a href="#about" className="" >
          
        </a></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
  </Navbar>
    </header>

    <section id="hero" className="d-flex align-items-center">
      <div className="container" data-aos="zoom-out" data-aos-delay="100">
        <div className="row">
          <div className="col-xl-6">
            <h2>"Discover a world of comfort and luxury, where every stay becomes a cherished memory."</h2>
          </div>
        </div>
      </div>
    </section>

    <section id="about" className="portfolio">
    <div className="section-title">
    <h2>About</h2>
    </div>
    <div className="tab-content">
        <div className="tab-pane active show" id="tab-1">
            <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0" data-aos="fade-up" data-aos-delay="100">
                    <h3>"Escape to relaxation, where dreams find a cozy place to rest and adventures begin at our doorstep."</h3>
                    <p className="fst-italic">
                    Escape to relaxation, where dreams find a cozy place to rest and adventures begin at our doorstep.
                    </p>
                    <ul>
                        <li><i className="ri-check-double-line"></i> Emphasize your hotel's dedication to providing an outstanding guest experience. Discuss how your staff goes the extra mile to ensure guests feel welcome, comfortable, and well-cared for during their stay.</li>
                        <li><i className="ri-check-double-line"></i> Mention any special amenities or services you offer to enhance the guest experience, such as personalized concierge services, spa treatments, or local guided tours.</li>
                        <li><i className="ri-check-double-line"></i>Describe the unique qualities of your hotel's location. Whether it's a stunning beachfront, a vibrant city center, or nestled in serene nature, showcase what makes your hotel's surroundings special.</li>
                    </ul>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center" data-aos="fade-up" data-aos-delay="200">
                    <img src={hotel} alt="" className="img-fluid" />
                </div>
            </div>
        </div>
    </div>
    </section>


    <section id="portfolio" className="portfolio">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Views</h2>
          <p>    "Discover a world of luxury and comfort at renowned hotels like The Ritz-Carlton and Four Seasons, where impeccable service meets breathtaking elegance." </p>
        </div>
        <div className="row portfolio-container" data-aos="fade-up" data-aos-delay="200">
          <div className="col-lg-4 col-md-6 portfolio-item">
            <div className="portfolio-wrap">
              <img src={hotel1} className="img-fluid" alt="App 1" />
              <div className="portfolio-info">
                <h4>The Ritz-Carlton</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item">
            <div className="portfolio-wrap">
              <img src={hotel2} className="img-fluid" alt="App 1" />
              <div className="portfolio-info">
                <h4>Hilton Hotels & Resorts</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item">
            <div className="portfolio-wrap">
              <img src={hotel3} className="img-fluid" alt="App 1" />
              <div className="portfolio-info">
                <h4>Marriott International</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item">
            <div className="portfolio-wrap">
              <img src={hotel4} className="img-fluid" alt="App 1" />
              <div className="portfolio-info">
                <h4>Four Seasons Hotels and Resorts</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item">
            <div className="portfolio-wrap">
              <img src={hotel5} className="img-fluid" alt="App 1" />
              <div className="portfolio-info">
                <h4>InterContinental Hotels & Resorts</h4>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 portfolio-item">
            <div className="portfolio-wrap">
              <img src={hotel6} className="img-fluid" alt="App 1" />
              <div className="portfolio-info">
                <h4>Hyatt Hotels Corporation</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">

        <div className="section-title">
          <h2>Contact</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.</p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">

          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-12">
                <div className="info-box">
                  {/* <i className="bx bx-map"></i> */}
                  <h3>Our Address</h3>
                  <p>Voyage Villas
                    <br/>A108 Adam Street<br/> New York<br/> NY 535022</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box mt-4">
                  {/* <i className="bx bx-envelope"></i> */}
                  <h3>Email Us</h3>
                  <p>queries@gmail.com<br />voyagevillas@gmail.com<br />voyagevillas@yahoo.com</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box mt-4">
                  {/* <i className="bx bx-phone-call"></i> */}
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55<br />+1 6678 254445 41<br />+1 6678 254445 31</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className=" text-center" data-aos="fade-up" data-aos-delay="200">
                    <img src={hotel} alt="" className="img-fluid" />
                </div>
          </div>
        </div>
      </div>
    </section>


    <footer id="footer">
      <div className="container d-md-flex py-4">
        <div className="me-md-auto text-center text-md-start">
          <div className="copyright">
            &copy; Copyright <strong><span>Voyage Villas</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="https://voyagevillas.com/">Voyage Villas</a>
          </div>
        </div>
        <div className="social-links text-center text-md-end pt-3 pt-md-0">
          <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
          <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
          <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
          <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
          <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
        </div>
      </div>
    </footer>

    </div>


  );
}

export default Home;