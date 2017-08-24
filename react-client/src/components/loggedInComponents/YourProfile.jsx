import React from 'react';

var YourProfile = (props) => (
  <div className="about" >
    <br></br>
    <h2>
      Welcome to PassPass, {props.profileData.first_name}!
    </h2>
  </div>
);


export default YourProfile;
