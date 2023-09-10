// import { useState } from "react";
// import axios from "axios"; 
// import { useCookies } from "react-cookie";
// import { useNavigate, useNavigation } from "react-router-dom";

// export const Auth = () => {
//   return (
//     <div className="auth">
//       <Login />
//       <Register />
//     </div>
//   );
// };

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const [_,setCookies ] = useCookies(["access_token"]) // name of the cookie , "access_token" , we dont need to hve acceess the cookie  , we only need to have access to the function that sets the cookie

//     const navigate = useNavigate( )

//     const onSubmit = async (event)=>{
//         event.preventDefault()
//         try{
//             const response = await axios.post("http://localhost:2999/auth/login",{
//                 username,
//                 password,
//             })

//             setCookies("access_token" , response.data.token) // s e t t i n g   t o k e n  // from backend we sent an object containing a token field and a user._id field.
//             window.localStorage.setItem("userID" ,response.data.userID )// name userID , value response.data.token
//             navigate("/")// we could euther use "navigate("/")" or use window.location.pathname="/"
//         }catch (err){
//             console.error(err)
//         }
//     }

//     return (
//         <Form
//          username={username}
//          setUsername={setUsername}
//          password={password}
//          setPassword={setPassword}
//          label="Login"
//          onSubmit={onSubmit}
//        />
//     )
// };

// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmit =async (event)=>{
//     event.preventDefault()
//     try{
//         await axios.post("http://localhost:2999/auth/register",{
//             username,
//             password,
//         })
//         alert("Registration Completed")
//     }catch(err){
//         console.error(err)
//     }
//   }

//   return (
//     <Form
//          username={username}
//          setUsername={setUsername}
//          password={password}
//          setPassword={setPassword}
//          label="Register"
//          onSubmit={onSubmit}
//        />
//     )
//   }

//  const Form = ({
//     username, 
//     setUsername, 
//     password, 
//     setPassword,
//     label,
//     onSubmit,
// })=> {
//   return (
//     <div className="auth-container">
//       <form onSubmit={onSubmit}>
//         <h2>{label}</h2>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>

//         <button type="submit">{label}</button>
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:2999/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:2999/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};