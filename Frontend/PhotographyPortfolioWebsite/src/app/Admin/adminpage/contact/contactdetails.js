import React from "react";
import Adminheader from '../header/adminheader';
import Adminfooter from '../footer/adminfooter';
import Navbar from '../../navigationbar/navigationbar';
import './contactdetails.css'
import ownerImage from '../../../assets/contactimages/owner.jpg';
import logo from '../../../assets/contactimages/Logo.jpg';

export default function Contactdetails() {
    return (
<>
    <Adminheader />
    <Navbar />
    <div className="contactdetails">
        <div className="container-fluid">
            <ul className="navbar-nav d-flex flex-column flex-md-row align-items-center" id="contactdetailsnav">
                <li className="mb-4 mb-md-0">
                    <img src={ownerImage} alt="Owner" className="ownerimage" />
                </li>
                <li className="contactus mb-4 mb-md-0">
                    <h1>Contact Us</h1>
                    <br />
                    <p className="text-area">
                        <span>
                            For more information or to book a consultation
                        </span>
                    </p>
                    <img src={logo} alt="Logo" className="logoimage" />
                    <br />
                    <p className="text-area">
                        <span>
                            Please call us at 
                            <br />
                            +91 8088844808
                        </span>
                    </p>
                    <p className="text-area">
                        <span>
                            Inquiry: Rameshpawar039@Gmail.com
                        </span>
                    </p>
                </li>
                <li className="contactbox">
                    <div className="box-border">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Contact</label>
                                <input type="email" className="form-control" id="clientname" placeholder="Enter your name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                                <input type="number" className="form-control" id="clientmobilenumber" placeholder="Enter your mobile number" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </li>
            </ul>
        </div>
        <div className="contactusdiscription">
            <p>
                <span>
                    Welcome to PAVAR STUDIO, where we pride ourselves on being the best wedding photographer in Lucknow. Our team specializes in capturing the beautiful moments of Indian weddings with an unparalleled level of expertise and artistry. If you’re looking for a photographer who understands the intricacies and rich traditions of Indian weddings, look no further. At PAVAR STUDIO, we offer a wide range of services to meet all your needs, including pre-wedding photoshoots, wedding photography, wedding videography, and more. Our cinematic wedding videos and documentary-style wedding films bring your special day to life, allowing you to relive the joy and emotions of your celebration.
                    <br /><br />
                    Our commitment to quality extends beyond wedding photography and videography. We also offer matrimonial photography, event photography and videography, photo restoration, photo collage creation, fashion portraits, and maternity photography. Each service is tailored to capture the essence of your moments and turn them into timeless memories. Our team is led by Amit Saheta, who brings years of experience and a passion for photography to every project. We work closely with you to understand your vision and style, ensuring that every shot reflects your unique love story.
                </span>
            </p>
        </div>
    </div>
    <Adminfooter />
</>

    );
}