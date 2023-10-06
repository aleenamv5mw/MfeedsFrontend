import logo from './logo.png';
import React, { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "<your-application-client-id>",
    authority: "https://login.microsoftonline.com/<your-tenant-id>",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const authResult = await msalInstance.loginPopup({
        scopes: ["openid", "profile", "User.Read"],
      });
      console.log("Authentication result:", authResult);
      //  add login logic 
    } catch (error) {
      console.log("Authentication error:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <div style={{ textAlign: "center", marginBottom: "20px" }}>
   
  </div>
  <form
    onSubmit={handleSubmit}
    style={{
      width: "400px",
      height:"500px",
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      border: "1px solid #e1e1e1"
    }}
  >
     <img src={logo} alt="company logo" style={{ height: "200px" }} />
    <h2 style={{ textAlign: "center" }}>Log in using your company's single sign-on</h2>
    <div className="form-group">
  <label htmlFor="email">Email:</label>
  <input
    type="email"
    id="email"
    className="form-control"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    style={{
      width: "95%",
      padding: "5px", // Adjust padding to make the border a little smaller
      borderRadius: "5px",
      border: "none",
      borderBottom: "2px solid #34B7BD", // Set border thickness to 1 pixel and remove "solid" to make the border straight
      marginBottom: "30px",
    }}
  />
</div>


    <button
      type="submit"
      style={{
        backgroundColor: "#34B7BD",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        width: "100%",
      }}
    >
      Submit
    </button>
  </form>
</div>

  
  );
}

export default LoginForm;
