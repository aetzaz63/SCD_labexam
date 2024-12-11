import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";
import logo from "../logo.png"; // Import the logo

const Base_URL = config.baseURL;

const HomePage = () => {
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }

        const decodedToken = decodeJwtToken(authToken);
        const userId = decodedToken.sub;

        const response = await axios.get(`${Base_URL}/fetchuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        setUserDetails(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const decodeJwtToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  };

  const containerStyle = {
    textAlign: "center",
    marginTop: "4rem",
  };

  const logoStyle = {
    width: "150px",
    height: "auto",
    marginBottom: "20px",
  };

  const titleStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#0074D9",
    marginBottom: "1rem",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: "#0074D9",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <img src={logo} alt="TracknRetrieve Logo" style={logoStyle} />
        <h1 style={titleStyle}>TracknRetrieve</h1>
        <h2 style={headingStyle}>Welcome to the Lost and Found Tracking System</h2>
        {!user || !userDetails ? (
          <>
            <p style={paragraphStyle}>Please sign in to continue</p>
            <Link to="/sign-in">
              <button className="sign-in-button" style={buttonStyle}>
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <>
            <p style={paragraphStyle}>
              Welcome {" "}
              <b>
                {userDetails.data.gotUser.username}-(
                {userDetails.data.gotUser.rollno})
              </b>
              , proceed to raising a concern
            </p>
            <Link to="/raise-a-concern">
              <button className="sign-in-button" style={buttonStyle}>
                Raise
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
