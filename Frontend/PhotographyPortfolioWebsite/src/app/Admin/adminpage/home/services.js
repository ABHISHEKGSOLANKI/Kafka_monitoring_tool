import React from "react";

import pic1 from '../../../assets/portfolioimages/gallery-1.jpg';
import pic2 from '../../../assets/portfolioimages/gallery-2.jpg';
import pic3 from '../../../assets/portfolioimages/gallery-3.jpg';
import pic4 from '../../../assets/portfolioimages/gallery-4.jpg';

export default function Service(){
    return(
        <div>
            <h1>Capture Memories Forever</h1>
            <p>
                Professional photography and videography services for all occasions, commercial or non-commercial.
            </p>
            <div class="row row-cols-1 row-cols-md-4 g-2">
                <div class="col">
                    <div class="card">
                    <img src={pic1} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                    <img src={pic2} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                    <img src={pic3} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                    <img src={pic4} class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};