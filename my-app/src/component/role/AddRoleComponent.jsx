import React, { Component, Fragment } from "react";
import RoleService from "../../service/RolesService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavBar from "../Navbar";

class AddRoleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  saveRole = (e) => {
    e.preventDefault();
    let role = {
      name: this.state.name,
    };
    RoleService.createRole(role).then((res) => {
      this.setState({ message: "role added successfully." });
      this.props.history.push("/manage-roles");
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Fragment>
        <NavBar />
        <Container>
          <Typography variant="h4" style={styles.center}>
            Nova uloga
          </Typography>
          <form style={formContainer}>
            <TextField
              label="name"
              fullWidth
              margin="normal"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />

            <Button
              variant="contained"
              style={styles.button}
              onClick={this.saveRole}
            >
              Snimi
            </Button>
            <Button
              variant="contained"
              style={styles.button}
              onClick={() => this.props.history.push("/manage-roles")}
            >
              Odustani
            </Button>
          </form>
        </Container>
      </Fragment>
    );
  }
}
const formContainer = {
  display: "flex",
  flexFlow: "row wrap",
};

const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    background: "#8f2086",
    color: "white",
    margin: 5,
    marginBottom: 20,
  },
  state: {
    marginTop: 20,
    marginBottom: 20,
  },
};

export default AddRoleComponent;
