import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "./../../service/AuthService";

class LogoutComponent extends Component {
  state = {};
  componentDidMount() {
    AuthService.logOut();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default LogoutComponent;
