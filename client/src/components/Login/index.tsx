import React from "react";
import { Button } from "@material-ui/core";
import {Link} from 'react-router-dom';

export default function Login() {
  return (
    <div className="App">
      <Button variant="contained" component={Link} to="/login">Login</Button>
      <Button variant="contained" component={Link} to="/register">Register</Button>
    </div>
  );
}
