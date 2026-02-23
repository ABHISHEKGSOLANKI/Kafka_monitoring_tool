import React, { useState } from 'react';
import './signin.css'; // Import the CSS file
// import Signinheader from './signinheader';
// import Signinfooter from './signinfooter';
import {useNavigate} from 'react-router-dom';
// import Home from '../adminpage/home/adminhome';



function Signin() {
  // Define state variables for username, password, and visibility of fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUsernameField, setShowUsernameField] = useState(true);
  const navigate = useNavigate();
  const handleProccedBtn = () =>{setShowUsernameField(false);}
  const handleSubmitBtn = () =>{
    console.log("Username: "+username);
    console.log("Password: "+password);
    navigate('/admin/home');
  } 

  return (

    <div className="signin">
      {/* Render username field and 'Proceed' button if showUsernameField is true */}

      <h2>Login</h2>
      {showUsernameField && (
        <div>
          <input type="text" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)} />
          <br />
          <button onClick={handleProccedBtn}>Proceed</button>
        </div>
      )}

      {/* Render password input only if showUsernameField is false */}
      {!showUsernameField && (
        <div className="password">
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button onClick={handleSubmitBtn}>Submit</button>
          
        </div>
      )}

    </div>
    
  );
}

export default Signin;
