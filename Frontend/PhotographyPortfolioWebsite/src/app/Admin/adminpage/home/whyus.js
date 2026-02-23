import React from "react";

import pic1 from '../../../assets/portfolioimages/gallery-1.jpg';

import './whyus.css';
export default function WhyUs(){
    return(
        <div className='container-fluid' id='whyus'>
            <h1>Why Choose Us?</h1>
            <ui className="navbar-nav d-flex flex-column flex-md-row align-items-center justify-content-center">
                <li className='nav-item' id="whyusimg">
                    <img src={pic1} className='card-img' alt="..." />
                </li>
                <li className='nav-item'>
                    <li>
                        <b>1.xpertise in Indian Weddings: </b>
                        Our photographers are well-versed in the traditions and nuances of Indian weddings, ensuring that every ritual and celebration is beautifully documented.
                    </li>
                    <li>
                        <b>2.High-Quality Imagery: </b>
                        We use state-of-the-art equipment to deliver stunning photographs and videos that you will cherish forever.
                    </li>
                    <li>
                        <b>3.Personalized Service: </b>
                        We work closely with you to understand your vision and style, providing a personalized photography experience that reflects your unique love story.
                    </li>
                </li>
            </ui>
            <div id="ourservices">
                <h3>Our Services:</h3>
                <li>
                    <b>Pre-Wedding Shoots: </b> Capture the excitement and romance leading up to your big day.
                </li>
                <li>
                    <b>Wedding Photography: </b>From the engagement to the reception, we cover every aspect of your wedding.
                </li>
                <li>
                    <b>Candid Shots: </b>We specialize in capturing genuine, spontaneous moments that tell the true story of your celebration.
                </li>
                <li>
                    <b>Traditional Photography: </b>Classic, posed photographs that highlight the important rituals and traditions of your wedding.
                </li>
                <li>
                    <b>Videography: </b>Relive your special day with beautifully edited wedding films.
                </li>

                <p>
                At H.D.R.I. STUDIO, we believe that every wedding is unique, and we are dedicated to providing a photography experience that is as special as your love story. Contact us today to book your session and let us help you create memories that will last a lifetime.
                </p>
            </div>
        </div>
    );
};