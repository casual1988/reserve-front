import React, { Component } from "react";
import UserService from "../../service/UserService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavBar from "../Navbar";

class ListUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: null,
    };

    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.addUser = this.addUser.bind(this);
    this.reloadUserList = this.reloadUserList.bind(this);
  }

  componentDidMount() {
    this.reloadUserList();
  }

  reloadUserList() {
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
          message: "Greška tokom čitanja podataka",
        });
      });
  }

  deleteUser(userId) {
    UserService.deleteUser(userId).then((res) => {
      this.setState({ message: "User deleted successfully." });
      this.setState({
        users: this.state.users.filter((user) => user.id !== userId),
      });
    });
  }

  editUser(id) {
    window.localStorage.setItem("userId", id);
    this.props.history.push("/edit-user");
  }

  addUser() {
    window.localStorage.removeItem("userId");
    this.props.history.push("/add-user");
  }

  manageRoles = () => {
    window.localStorage.removeItem("userId");
    this.props.history.push("/manage-roles");
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Typography variant="h4" style={styles.center}>
            Lista Korisnika
          </Typography>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => this.addUser()}
          >
            Dodaj Korisnika
          </Button>
          <Button
            variant="contained"
            style={styles.link}
            onClick={() => this.manageRoles()}
          >
            Upravljaj ulogama
          </Button>
          {this.state.message && <div>{this.state.message}</div>}
          {!this.state.message && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Ime</TableCell>
                  <TableCell align="right">Prezime</TableCell>
                  <TableCell align="right">Korisničko ime</TableCell>
                  <TableCell align="right">Zastupnik ID</TableCell>
                  <TableCell align="right">Broj telefona</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.employeeId}</TableCell>
                    <TableCell align="right">{row.contactNumber}</TableCell>
                    <TableCell align="right">
                      <CreateIcon
                        onClick={() => this.editUser(row.id)}
                      ></CreateIcon>
                    </TableCell>
                    <TableCell align="right">
                      <DeleteIcon
                        onClick={() => this.deleteUser(row.id)}
                      ></DeleteIcon>
                    </TableCell>
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
    marginBottom: 20,
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
};

export default ListUserComponent;
