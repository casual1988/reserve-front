import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AuthService from "../../service/AuthService";
import logo from "./../../logo-aura-osiguranje.svg";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    localStorage.clear();
  }

  login = (e) => {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    AuthService.login(credentials).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.result));
        this.props.history.push(this.props.history.location.state.referer);
      } else {
        this.setState({ message: res.data.message });
      }
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar className="App-AuraCollor">
            <Typography  className="App-AuraCollor">
            <img src={logo} alt="Logo" height='125px' width='120px'/>   
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xs">
          <Typography variant="h4" style={styles.center} >
            Prijava
          </Typography>
          <form>
            <Typography variant="h4" style={styles.notification}>
              {this.state.message}
            </Typography>
            <TextField
              type="text"
              label="USERNAME"
              fullWidth
              margin="normal"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />

            <TextField
              type="password"
              label="PASSWORD"
              fullWidth
              margin="normal"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />

            <Button
              type="submit"
              variant="contained"
              style={styles.button}
              onClick={this.login}
            >
              Login
            </Button>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    marginTop: 100,
  },
  notification: {
    display: "flex",
    justifyContent: "center",
    color: "#dc3545",
  },
  button: {
    background: "#8f2086",
    color: "white",
  },logo: {
    justifyContent: "center",
  },
};

export default LoginComponent;
