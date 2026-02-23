import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signin from './app/Admin/Signin/signin';
import Home from './app/Admin/adminpage/home/adminhome';
import ContactDetails from  './app/Admin/adminpage/contact/contactdetails';
import Portfolio from './app/Admin/adminpage/portfolio/portfolio';
import Blog from './app/Admin/adminpage/blog/blog';

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          {/* <Route path="/" element={<Signin />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<ContactDetails />} />
          {/* <Route path="/admin/about" element={<About />} /> */}
          <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};
