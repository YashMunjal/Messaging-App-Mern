import React, {useState}from "react";
import { Button, TextField } from "@material-ui/core";
import { apiCall } from "../../utility";


export default function Register() {

const [email,setEmail]=useState('');
const [password,setPassword]=useState('');



  const registeredUser=async ()=>{
        const res=await apiCall('/api/register',{email,password});
    console.log(res);
  }

  return (
    <div className="App">
      <div className="form" >
        <h1>Register</h1>
        <form>
          <TextField placeholder="Type Email here"  label="Your Email" value={email} onChange={e=>setEmail(e.target.value)} variant="outlined"></TextField>
          <TextField placeholder="Type Password here"  type="password" label="Your Password" value={password} onChange={e=>setPassword(e.target.value)} variant="outlined"></TextField>
          <Button variant="contained" color="primary" onClick={registeredUser} >Submit</Button>
        </form>
      </div>
    </div>
  );
}
