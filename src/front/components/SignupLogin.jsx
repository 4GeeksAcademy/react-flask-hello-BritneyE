import React, {useState} from "react"
import {Private} from "../pages/Private";

export const SignUp = () =>{
   const [email, setEmail] = useState("") //setEmail updates email variable
   const [password, setPassword] = useState("")
   const [statusmessage, setStatusMessage] = useState("") //setStatusMessage changes statusmessage
   const [token, setToken] = useState("") 
   const [user, setUser] = useState("") 
   const backendUrl = import.meta.env.VITE_BACKEND_URL
   
   const sign_up = () => {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }
    fetch(backendUrl + "api/sign_up", options)
    .then((resp) => resp.json())
    .then((data)=> setStatusMessage(data.message))
   }

   const log_in = () => {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            email: email,
            password: password
        })
    }
    fetch(backendUrl + "api/log_in", options)
    .then((resp) => resp.json())
    .then((data)=> {
        setStatusMessage(data.message)
        setUser(data.user)
        setToken(data.token)
   })

// status message

// const get_user = () => {
// 		let options = {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: "Bearer " + token
// 			}}
// 		fetch(backendUrl + "api/user", options)
// 		.then((resp)=>resp.json())
// 		.then((data)=>console.log("data is here!!!!!", data))
// 	}

   return(
        <div>
            <div>
          <h1>LOG IN / SIGN UP</h1>
        Enter email:
            <input placeholder="Email" 
            value={email} 
            onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
            Enter password:
            <input placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
            {statusmessage}
              <button className="btn-success" onClick={sign_up}>Sign Up</button>
            <button className="btn-success" onClick={log_in}>Log In</button>
            {
                token == null ? "" 
                : 
                <Private />}
        </div>
    )
}