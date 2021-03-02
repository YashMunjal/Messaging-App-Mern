import React, {useState}from "react";
import { Button, TextField } from "@material-ui/core";
import { apiCall } from "../../utility";
import { useHistory } from "react-router-dom";


export default function Login() {

const [email,setEmail]=useState('');
const [password,setPassword]=useState('');

const history=useHistory();




  const registeredUser=async ()=>{
        const res=await apiCall('/api/login',{email,password});

      //  console.log(res);

      
      if(res.status==='ok'){
        console.log('You are in')
        localStorage.setItem('data',res.data);
        history.push('/chat');
      }else{
        console.log(res.error)
      }
  }

  return (
    <div className="App">
      <div className="form" >
        <h1>Login</h1>
        <form>
          <TextField placeholder="Type Email here"  label="Your Email" value={email} onChange={e=>setEmail(e.target.value)} variant="outlined"></TextField>
          <TextField placeholder="Type Password here"  type="password" label="Your Password" value={password} onChange={e=>setPassword(e.target.value)} variant="outlined"></TextField>
          <Button variant="contained" color="primary" onClick={registeredUser} >Submit</Button>
        </form>
      </div>
    </div>
  );
}
