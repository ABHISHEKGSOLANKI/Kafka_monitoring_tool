import React from "react";

import pic1 from '../../../assets/portfolioimages/gallery-1.jpg';
import pic2 from '../../../assets/portfolioimages/gallery-2.jpg';
import pic3 from '../../../assets/portfolioimages/gallery-3.jpg';
import pic4 from '../../../assets/portfolioimages/gallery-4.jpg';
import pic5 from '../../../assets/portfolioimages/gallery-5.jpg';
import pic6 from '../../../assets/portfolioimages/gallery-6.jpg';
import pic7 from '../../../assets/portfolioimages/gallery-7.jpg';
import pic8 from '../../../assets/portfolioimages/gallery-8.jpg';
import pic9 from '../../../assets/portfolioimages/gallery-9.jpg';
import pic10 from '../../../assets/portfolioimages/gallery-10.jpg';
import pic11 from '../../../assets/portfolioimages/gallery-11.jpg';
import pic12 from '../../../assets/portfolioimages/gallery-12.jpg';

export default function PortfolioContent(){
    return(
        <div className='content'>
        <div className="portfolio">
            <h1>Creative Showcase</h1>
            <br />
            <p>
                <span>
                    Explore our stunning collection of high-definition images captured by PAVAR STUDIO
                </span>
            </p>

            <div className='container-fluid'>
                <div className="row  justify-content-center">
                    <div className="column">
                        <img src={pic1} className="img-responsive" alt="Wedding photography sample 1" />
                        <img src={pic2} className="img-responsive" alt="Wedding photography sample 2" />
                        <img src={pic3} className="img-responsive" alt="Wedding photography sample 3" />
                        <img src={pic4} className="img-responsive" alt="Wedding photography sample 4" />
                        <img src={pic5} className="img-responsive" alt="Wedding photography sample 5" />
                        <img src={pic6} className="img-responsive" alt="Wedding photography sample 6" />
                        <img src={pic7} className="img-responsive" alt="Wedding photography sample 7" />
                        <img src={pic8} className="img-responsive" alt="Wedding photography sample 8" />
                        <img src={pic9} className="img-responsive" alt="Wedding photography sample 9" />
                        <img src={pic10} className="img-responsive" alt="Wedding photography sample 10" />
                        <img src={pic11} className="img-responsive" alt="Wedding photography sample 11" />
                        <img src={pic12} className="img-responsive" alt="Wedding photography sample 12" />
                    </div>
                    <div className="column">
                        <img src={pic1} className="img-responsive" alt="Wedding photography sample 1" />
                        <img src={pic2} className="img-responsive" alt="Wedding photography sample 2" />
                        <img src={pic3} className="img-responsive" alt="Wedding photography sample 3" />
                        <img src={pic4} className="img-responsive" alt="Wedding photography sample 4" />
                        <img src={pic5} className="img-responsive" alt="Wedding photography sample 5" />
                        <img src={pic6} className="img-responsive" alt="Wedding photography sample 6" />
                        <img src={pic7} className="img-responsive" alt="Wedding photography sample 7" />
                        <img src={pic8} className="img-responsive" alt="Wedding photography sample 8" />
                        <img src={pic9} className="img-responsive" alt="Wedding photography sample 9" />
                        <img src={pic10} className="img-responsive" alt="Wedding photography sample 10" />
                        <img src={pic11} className="img-responsive" alt="Wedding photography sample 11" />
                        <img src={pic12} className="img-responsive" alt="Wedding photography sample 12" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};