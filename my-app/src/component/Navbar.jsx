import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import AuthService from "../service/AuthService";
import logo from "./../logo-aura-osiguranje.svg";

const style = {
  flexGrow: 1,
};
const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar className="App-AuraCollor">
          <Typography variant="h6" style={style} className="App-AuraCollor">
            <img src={logo} alt="Logo" height="125px" width="120px" />
          </Typography>
          <Typography variant="h5"> Mobile Agent </Typography>
          <Button color="inherit">{AuthService.getUserInfo().username} </Button>
          <Button color="inherit" component={Link} to="/logout">
            Odjavi se
          </Button>
        </Toolbar>
        <header>
          <nav>
            <ul className="navLinks">
              <li>
                <Link to="/list-policy">Početna</Link>
              </li>
              {AuthService.hasAuthority("ROLE_POLICY_CREATE") && (
                <li>
                  <Link to="/add-policy">Dodaj polisu</Link>
                </li>
              )}
              {AuthService.hasAuthority("ROLE_USER_CREATE") && (
                <li>
                  <Link to="/add-user">Dodaj korisnika</Link>
                </li>
              )}
              {AuthService.hasAuthority("ROLE_USER_READ_ALL") && (
                <li>
                  <Link to="/list-user">Lista korisnika</Link>
                </li>
              )}
              {AuthService.hasAuthority("ROLE_REPORTS") && (
                <li>
                  <Link to="/file-download">Export polisa</Link>
                </li>
              )}
            </ul>
          </nav>
        </header>
      </AppBar>
    </div>
  );
};

export default NavBar;
