import React, { Component } from "react";
import RolesService from "../../service/RolesService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavBar from "../Navbar";

class RolePermissionsListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: [],
      roles: [],
      message: null,
    };
  }

  componentDidMount() {
    this.loadPermissions();
    this.loadRoles();
  }

  loadPermissions = () => {
    this.setState({ permissions: [] }, () => {
      RolesService.fetchPermissions()
        .then((res) => {
          if (res.data.status === 200) {
            this.setState({ permissions: res.data.result, message: null });
            this.setState({ state: this.state });
          } else {
            this.setState({ message: res.data.message });
          }
        })
        .catch((error) => {
          this.setState({
            permissions: [],
            message: "Greška tokom čitanja dozvola",
          });
        });
    });
  };

  loadRoles = () => {
    RolesService.fetchRoles().then((response) => {
      if (response.data.status === 200) {
        let roles = [];
        response.data.result.forEach((role) => {
          roles.push(role);
        });
        this.setState({ roles: roles });
      } else {
        this.setState({ message: response.data.message });
      }
    });
  };

  handleChange = (role, permission) => {
    if (this.hasPermission(role, permission)) {
      RolesService.unassignPermission(role, permission).then(() => {
        //this.loadPermissions();
      });
    } else {
      RolesService.assignPermission(role, permission).then(() => {
        //this.loadPermissions();
      });
    }
  };

  hasPermission(role, permission) {
    if (role !== undefined && role.permissions !== undefined) {
      for (var i = 0; i < role.permissions.length; i++) {
        if (role.permissions[i].id === permission.id) return true;
      }
    } else {
      console.log("user roles not available");
    }
    return false;
  }

  manageRoles = () => {
    this.props.history.push("/manage-roles");
  };

  splicePrefix = (string) => {
    return string.slice(5, string.length);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Typography variant="h4" style={styles.center}>
            Upravljanje dozvolama
          </Typography>
          <Button
            variant="contained"
            style={styles.link}
            onClick={() => this.manageRoles()}
          >
            Nazad
          </Button>
          {this.state.message && <div>{this.state.message}</div>}
          {!this.state.message && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Uloga</TableCell>
                  {this.state.roles.map((role) => (
                    <TableCell key={role.id} align="right">
                      {role.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.permissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell align="right">
                      {this.splicePrefix(permission.name)}
                    </TableCell>
                    {this.state.roles.map((role) => (
                      <TableCell key={role.id} align="right">
                        <Checkbox
                          onChange={() => this.handleChange(role, permission)}
                          checked={this.hasPermission(role, permission)}
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
  },
  link: {
    background: "#8f2086",
    color: "white",
    marginLeft: 5,
  },
};

export default RolePermissionsListComponent;
