import React, { Component } from "react";
import UserService from "../../service/UserService";
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
import DeleteIcon from "@material-ui/icons/Delete";
import OkCancelDialog from "../dialog/OkCancelDialog";
import NavBar from "../Navbar";

class EditUserRolesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      roles: [],
      message: null,
      selectedRoleId: null,
      showConfirmDeleteDialog: false,
    };
  }

  componentDidMount() {
    this.reloadUserList();
    this.loadRoles();
  }

  reloadUserList = () => {
    this.setState({ users: [] }, () => {
      UserService.fetchUsers()
        .then((res) => {
          if (res.data.status === 200) {
            this.setState({ users: res.data.result, message: null });
          } else {
            this.setState({ message: res.data.message });
          }
        })
        .catch((error) => {
          this.setState({
            users: [],
            message: "Greška tokom čitanja korisnika",
          });
        });
    });
  };

  triggerRoleDeletion = (roleId) => {
    this.setState({ selectedRoleId: roleId, showConfirmDeleteDialog: true });
  };

  deleteRole = () => {
    RolesService.deleteRole(this.state.selectedRoleId).then(() => {
      this.loadRoles();
      this.setState({ showConfirmDeleteDialog: false });
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

  handleChange = (user, role) => {
    if (this.hasRole(user, role)) {
      UserService.unassignRole(user, role).then(() => {
        this.reloadUserList();
      });
    } else {
      UserService.assignRole(user, role).then(() => {
        this.reloadUserList();
      });
    }
  };

  hasRole(user, role) {
    if (user !== undefined && user.roles !== undefined) {
      for (var i = 0; i < user.roles.length; i++) {
        if (user.roles[i].id === role.id) return true;
      }
    } else {
      console.log("user roles not available");
    }
    return false;
  }

  managePermissions = () => {
    window.localStorage.removeItem("userId");
    this.props.history.push("/manage-permissions");
  };

  render() {
    console.log("selectedRoleId: " + this.state.selectedRoleId);
    return (
      <React.Fragment>
        {this.state.showConfirmDeleteDialog && (
          <OkCancelDialog
            handleCancel={() =>
              this.setState({ showConfirmDeleteDialog: false })
            }
            handleOK={this.deleteRole}
            message="Da li ste sigurni da zelite izbrisati ulogu?"
          />
        )}
        <NavBar />
        <Container>
          <Typography variant="h4" style={styles.center}>
            Upravljanje ulogama
          </Typography>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => this.props.history.push("/create-role")}
          >
            Dodaj ulogu
          </Button>
          <Button
            variant="contained"
            style={styles.link}
            onClick={() => this.managePermissions()}
          >
            Upravljaj dozvolama
          </Button>
          {this.state.message && <div>{this.state.message}</div>}
          {!this.state.message && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Korisnik</TableCell>
                  {this.state.roles.map((role) => (
                    <TableCell key={role.id} align="right">
                      {role.name}
                      <DeleteIcon
                        onClick={() => this.triggerRoleDeletion(role.id)}
                      ></DeleteIcon>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((row) => (
                  <TableRow
                    key={row.id}
                    style={
                      this.selectedRoleId === row.id
                        ? styles.selectedUser
                        : null
                    }
                  >
                    <TableCell align="right">
                      {row.firstName} {row.lastName}
                    </TableCell>
                    {this.state.roles.map((role) => (
                      <TableCell key={role.id} align="right">
                        <Checkbox
                          onChange={() => this.handleChange(row, role)}
                          checked={this.hasRole(row, role)}
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
  button: {
    background: "#8f2086",
    color: "white",
    marginRight: "5px",
  },

  link: {
    background: "inherit",
    color: "#8f2086",
    marginRight: "5px",
  },
  selectedUser: {
    background: "#8f2086",
  },
};

export default EditUserRolesComponent;
