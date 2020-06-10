import React, { Component } from "react";
import PolicyService from "../../service/PolicyService";
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
import OkCancelDialog from "../dialog/OkCancelDialog";
import Moment from "moment";

class ListPolicyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policies: [],
      message: null,
      showConfirmDeletionDialog: false,
      idToDelete: undefined,
    };
  }

  componentDidMount() {
    this.reloadPolicyList();
  }

  reloadPolicyList = () => {
    PolicyService.fetchPoliciesByUserId().then((res) => {
      this.setState({ policies: res.data.result });
    });
  };

  showConfirmDeletionDialog = () => {
    this.setState({ showConfirmDeletionDialog: true });
  };

  hideConfirmDeletionDialog = () => {
    this.setState({ showConfirmDeletionDialog: false });
  };

  triggerDelete = (policyId) => {
    this.setState({ idToDelete: policyId });
    this.showConfirmDeletionDialog();
  };

  deletePolicy = () => {
    const policyId = this.state.idToDelete;
    PolicyService.deletePolicy(policyId).then((res) => {
      this.setState({ message: "Policy deleted successfully." });
      this.setState({
        policies: this.state.policies.filter(
          (policy) => policy.id !== policyId
        ),
      });
    });
    this.hideConfirmDeletionDialog();
  };

  editPolicy(id) {
    window.localStorage.setItem("policyId", id);
    this.props.history.push("/edit-policy");
  }

  addPolicy() {
    window.localStorage.removeItem("policyId");
    this.props.history.push("/add-policy");
  }

  render() {
    return this.state.showConfirmDeletionDialog ? (
      <OkCancelDialog
        handleCancel={this.hideConfirmDeletionDialog}
        handleOK={this.deletePolicy}
        message="Da li ste sigurni da zelite izbrisati polisu?"
      />
    ) : (
      <React.Fragment>
        <NavBar />
        <Container>
          <Typography variant="h4" style={styles.center}>
            Detalji Polisa
          </Typography>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => this.addPolicy()}
          >
            Dodaj Polisu
          </Button>

          {this.state.policies === null && (
            <div>Greska tokom citanja polisa</div>
          )}
          {this.state.policies !== null && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">Broj polise</TableCell>
                  <TableCell align="right">Ime</TableCell>
                  <TableCell align="right">Prezime</TableCell>
                  <TableCell align="right">Premija u KM</TableCell>
                  <TableCell align="right">Popust u KM</TableCell>
                  <TableCell align="right">Popust %</TableCell>
                  <TableCell align="right">Datum unosa</TableCell>
                  <TableCell align="right">Opis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.policies.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="right">{row.policyNumber}</TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.discount}</TableCell>
                    <TableCell align="right">
                      {row.discountPercentage}
                    </TableCell>
                    <TableCell align="right" >{Moment(row.insertDate).format("DD/MM/YYYY hh:mm")}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">
                      <CreateIcon
                        onClick={() => this.editPolicy(row.id)}
                      ></CreateIcon>
                    </TableCell>
                    <TableCell align="right">
                      <DeleteIcon
                        onClick={() => this.triggerDelete(row.id)}
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

const style = {
  display: "flex",
  justifyContent: "center",
  marginTop: 50,
  color: "8f2086",
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
  },
};

export default ListPolicyComponent;
