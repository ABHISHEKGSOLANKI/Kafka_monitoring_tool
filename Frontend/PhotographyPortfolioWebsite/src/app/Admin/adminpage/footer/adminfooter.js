import React from "react";
import "./adminfooter.css";

export default function AdminFooter(){
    return(
        <footer>
                <ul className="navbar-nav d-flex flex-column flex-md-row align-items-center justify-content-center">
                    <li className="nav-item">
                        <div>
                        <p>
                            <span>
                                <b>Address: </b>
                                <br/>
                                Ramesh STUDIO,
                                Bannikatti, Koppal - 226001
                                Karnataka - India
                            </span>
                        </p>
                    </div>
                    </li>
                    <li className="nav-item">
                        <ul className="container-fluid flex-row">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="Go to Facebook page" className="social-icons__link" data-v-1ee40361="">
                                <svg width="48" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 12.0726C24 5.44354 18.629 0.0725708 12 0.0725708C5.37097 0.0725708 0 5.44354 0 12.0726C0 18.0619 4.38823 23.0264 10.125 23.9274V15.5414H7.07661V12.0726H10.125V9.4287C10.125 6.42144 11.9153 4.76031 14.6574 4.76031C15.9706 4.76031 17.3439 4.99451 17.3439 4.99451V7.94612H15.8303C14.34 7.94612 13.875 8.87128 13.875 9.82015V12.0726H17.2031L16.6708 15.5414H13.875V23.9274C19.6118 23.0264 24 18.0619 24 12.0726Z" fill="currentColor"></path>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Go to Instagram page" className="social-icons__link" data-v-1ee40361="">
                                <svg width="48" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0027 5.84808C8.59743 5.84808 5.85075 8.59477 5.85075 12C5.85075 15.4053 8.59743 18.1519 12.0027 18.1519C15.4079 18.1519 18.1546 15.4053 18.1546 12C18.1546 8.59477 15.4079 5.84808 12.0027 5.84808ZM12.0027 15.9996C9.80212 15.9996 8.00312 14.2059 8.00312 12C8.00312 9.7941 9.79677 8.00046 12.0027 8.00046C14.2086 8.00046 16.0022 9.7941 16.0022 12C16.0022 14.2059 14.2032 15.9996 12.0027 15.9996ZM19.8412 5.59644C19.8412 6.39421 19.1987 7.03135 18.4062 7.03135C17.6085 7.03135 16.9713 6.38885 16.9713 5.59644C16.9713 4.80402 17.6138 4.16153 18.4062 4.16153C19.1987 4.16153 19.8412 4.80402 19.8412 5.59644ZM23.9157 7.05277C23.8247 5.13063 23.3856 3.42801 21.9775 2.02522C20.5747 0.622429 18.8721 0.183388 16.9499 0.0870135C14.9689 -0.0254238 9.03112 -0.0254238 7.05008 0.0870135C5.1333 0.178034 3.43068 0.617075 2.02253 2.01986C0.614389 3.42265 0.180703 5.12527 0.0843279 7.04742C-0.0281093 9.02845 -0.0281093 14.9662 0.0843279 16.9472C0.175349 18.8694 0.614389 20.572 2.02253 21.9748C3.43068 23.3776 5.12794 23.8166 7.05008 23.913C9.03112 24.0254 14.9689 24.0254 16.9499 23.913C18.8721 23.822 20.5747 23.3829 21.9775 21.9748C23.3803 20.572 23.8193 18.8694 23.9157 16.9472C24.0281 14.9662 24.0281 9.03381 23.9157 7.05277ZM21.3564 19.0728C20.9388 20.1223 20.1303 20.9307 19.0755 21.3537C17.496 21.9802 13.7481 21.8356 12.0027 21.8356C10.2572 21.8356 6.50396 21.9748 4.92984 21.3537C3.88042 20.9361 3.07195 20.1276 2.64897 19.0728C2.02253 17.4934 2.16709 13.7455 2.16709 12C2.16709 10.2546 2.02789 6.50129 2.64897 4.92717C3.06659 3.87776 3.87507 3.06928 4.92984 2.6463C6.50931 2.01986 10.2572 2.16443 12.0027 2.16443C13.7481 2.16443 17.5014 2.02522 19.0755 2.6463C20.1249 3.06392 20.9334 3.8724 21.3564 4.92717C21.9828 6.50665 21.8383 10.2546 21.8383 12C21.8383 13.7455 21.9828 17.4987 21.3564 19.0728Z" fill="currentColor"></path>
                                </svg>
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                                <svg width="48" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.4985 6.20286C23.2225 5.16356 22.4092 4.34503 21.3766 4.06726C19.505 3.5625 12 3.5625 12 3.5625C12 3.5625 4.49503 3.5625 2.62336 4.06726C1.59077 4.34508 0.777523 5.16356 0.501503 6.20286C0 8.08666 0 12.017 0 12.017C0 12.017 0 15.9474 0.501503 17.8312C0.777523 18.8705 1.59077 19.6549 2.62336 19.9327C4.49503 20.4375 12 20.4375 12 20.4375C12 20.4375 19.505 20.4375 21.3766 19.9327C22.4092 19.6549 23.2225 18.8705 23.4985 17.8312C24 15.9474 24 12.017 24 12.017C24 12.017 24 8.08666 23.4985 6.20286ZM9.54544 15.5855V8.44855L15.8181 12.0171L9.54544 15.5855Z" fill="currentColor"></path>
                                </svg>
                            </a>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <p>
                            <span>
                                <b>Contact: </b>
                                <br/>
                                E-mail: Rameshpawar039@Gmail.com
                                <br/>
                                Mobile : +91 8088844808 (Ramesh)
                            </span>
                        </p>
                    </li>
                </ul>
            <div className="text-box">
                <p dir="auto" className="body-small">
                    <span>
                        Top Photographer in Koppal • Best Wedding Photographer • Best Candid Photographer in Koppal
                    </span>
                </p>
                <p dir="auto" className="body-small">
                    <span >
                        Best Photographer In Koppal • Best Pre-Wedding Photographer In Koppal • Best Wedding Photographer In Koppal
                    </span>
                </p>
                <p dir="auto" className="body-small">
                    <span >
                        Candid Photography In Koppal • Cinematic Videography In Koppal • Photographer In Koppal
                    </span>
                </p>
            </div>
        </footer>
    );
}