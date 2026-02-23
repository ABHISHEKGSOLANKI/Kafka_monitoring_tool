import React from 'react';
import Adminheader from '../header/adminheader';
import Adminfooter from '../footer/adminfooter';
import Navbar from '../../navigationbar/navigationbar';
import PortfolioContent from '../../adminpage/portfolio/portfoliocontent';
import WhyUs from './whyus';
import Service from './services';
import './adminhome.css'

import pic1 from '../../../assets/portfolioimages/gallery-1.jpg';
import pic2 from '../../../assets/portfolioimages/gallery-2.jpg';
import pic3 from '../../../assets/portfolioimages/gallery-3.jpg';

export default function Home(){
    return(
      <>
        <Adminheader />
          <Navbar />
            <div className='home container-fluid'>
              <h1>PAWAR STUDIO</h1>
              <br />
              <p>
                <span>
                  H I G H     D Y N A M I C     R A N G E     I N T E R F A C E     S T U D I O
                </span>
              </p>
              <br />
              <h1 className='largetext'>Best Wedding Photographer In Koppal</h1>
              <br />
              <h1>Capture Your Special Moments with the Best Wedding Photographer in Koppal</h1>
              <br />
              <p className='welcomemessage'>
                <span>
                  Welcome to PAVAR STUDIO, where we specialize in preserving the magic of your special day. As the best wedding photographer in Koppal, we understand the cultural richness and emotional depth of Indian weddings. Our experienced team, led by Amit Saheta, ensures that every moment is captured with precision and artistry.
                </span>
              </p>
              <br />
              {/* <div id="zCslO4" className="image-wrapper image-wrapper--layout layout-element__component layout-element__component--GridImage" data-v-9ddc5313="" data-v-db1c8849="" data-qa="gridimage:zcslo4">
                <div target="_self" title="" className="image image--grid loaded image-wrapper--desktop" data-selector="data-image" data-animation-role="image" data-v-db1c8849="" data-v-47c05b4e="" data-animation-state="active">
                <img alt="" src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1224,h=346,fit=crop/AGB40oJrbrIww41V/hdri-studio-home-page-AVLb9Q4zyvs95l4j.jpg" 
                srcSet="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=328,h=93,fit=crop/AGB40oJrbrIww41V/hdri-studio-home-page-AVLb9Q4zyvs95l4j.jpg 328w,
                https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=656,h=185,fit=crop/AGB40oJrbrIww41V/hdri-studio-home-page-AVLb9Q4zyvs95l4j.jpg 656w,
                https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=861,h=243,fit=crop/AGB40oJrbrIww41V/hdri-studio-home-page-AVLb9Q4zyvs95l4j.jpg 861w,
                https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=984,h=278,fit=crop/AGB40oJrbrIww41V/hdri-studio-home-page-AVLb9Q4zyvs95l4j.jpg 984w,
                https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1224,h=346,fit=crop/AGB40oJrbrIww41V/hdri-studio-home-page-AVLb9Q4zyvs95l4j.jpg 1224w,
                https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=2448,h=692,fit=crop/AGB40oJrbrIww41V/hdri-studio-home-page-AVLb9Q4zyvs95l4j.jpg 2448w" 
                sizes="(min-width: 920px) 1224px, calc(100vw - 0px)" height="346" width="1224" loading="eager" className="image__image" data-v-47c05b4e="" data-qa="builder-gridelement-gridimage" />
                </div>
              </div> */}

              <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={pic1} className="d-block w-100 carousel-image" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={pic2} className="d-block w-100 carousel-image" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={pic3} className="d-block w-100 carousel-image" alt="..." />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <WhyUs />
              <Service />
              <PortfolioContent />
            </div>
        <Adminfooter />
      </>
    );
};