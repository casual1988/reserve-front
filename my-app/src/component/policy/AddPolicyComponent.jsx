import React, { Component, Fragment } from "react";
import PolicyService from "../../service/PolicyService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavBar from "../Navbar";
import { TextareaAutosize } from "@material-ui/core";

class AddPolicyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyNumber: "",
      discount: "",
      discountPercentage: 0,
      firstName: "",
      lastName: "",
      price: "",
      policyType: "",
      description: "",
      message: null,
      policyNumberErrorText: null,
    };
    this.savePolicy = this.savePolicy.bind(this);
  }

  savePolicy = (e) => {
    e.preventDefault();
    if (this.state.policyNumberErrorText) return;
    if (!this.state.policyNumber || this.state.policyNumber.length == 0) return;

    let policy = {
      policyNumber: this.state.policyNumber,
      discount: this.state.discount,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      discountPercentage: this.state.discountPercentage,
      price: this.state.price,
      description: this.state.description,
      policyType: this.state.policyType,
    };
    PolicyService.addPolicy(policy).then((res) => {
      this.setState({ message: "Policy added successfully." });
      this.props.history.push("/list-policy");
    });
  };

  onChange = (e) => {
    let field = e.target.name;
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        const { price, discount } = this.state;
        price > 0 && discount > 0
          ? this.setState({
              discountPercentage: parseFloat(
                ((discount * 100) / price).toFixed(2)
              ),
            })
          : this.setState({ discountPercentage: 0 });
        if (field === "policyNumber" || field === "policyType") {
          this.validatePolicyNumber();
        }
      }
    );
  };

  validatePolicyNumber = () => {
    console.log("validate policy number");
    let policyNumber = this.state.policyNumber;
    let policyType = this.state.policyType;
    console.log("policyNumber: " + policyNumber);
    console.log("policyType: " + policyType);
    if (!policyType || !policyType) {
      console.log("policy number is valid locally");
      this.setState({
        policyNumberErrorText: null,
      });
    } else {
      PolicyService.isValidPolicyNumber(policyNumber, policyType).then(
        (response) => {
          console.log(response);
          console.log("valid: ispod");
          console.log(response.data.result);
          this.setState({
            policyNumberErrorText:
              response.data.result == true ? null : response.data.message,
          });
        }
      );
    }
  };

  render() {
    return (
      <Fragment>
        <NavBar />
        <Container>
          <Typography variant="h4" style={styles.center}>
            Dodaj Polisu
          </Typography>
          <form style={formContainer}>
            <TextField
              label="BROJ POLISE"
              fullWidth
              margin="normal"
              name="policyNumber"
              value={this.state.policyNumber}
              onChange={this.onChange}
              onBlur={this.state.validatePolicyNumber}
              helperText={this.state.policyNumberErrorText}
              error={
                this.state.policyNumberErrorText &&
                this.state.policyNumberErrorText.length > 0
              }
            />

            <TextField
              label="IME"
              fullWidth
              margin="normal"
              name="firstName"
              value={this.state.firstName}
              onChange={this.onChange}
            />

            <TextField
              label="PREZIME"
              fullWidth
              margin="normal"
              name="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
            />

            <TextField
              label="PREMIJA IZNOS KM"
              type="number"
              fullWidth
              margin="normal"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
            />

            <TextField
              label="POPUST U KM"
              type="number"
              fullWidth
              margin="normal"
              name="discount"
              value={this.state.discount}
              onChange={this.onChange}
            />

            <TextField
              label="POPUST %"
              type="number"
              disabled
              fullWidth
              margin="normal"
              name="discountPercentage"
              value={
                this.state.discountPercentage !== 0
                  ? this.state.discountPercentage
                  : ""
              }
            />

            <TextField
              label="TIP POLISE"
              fullWidth
              margin="normal"
              name="policyType"
              value={this.state.policyType}
              onChange={this.onChange}
              onBlur={this.state.validatePolicyNumber}
            />

            <TextField
              label="DODATNI OPIS"
              fullWidth
              margin="normal"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />

            <Button
              variant="contained"
              style={styles.button}
              onClick={this.savePolicy}
            >
              Snimi
            </Button>

            <Button
              variant="contained"
              style={styles.button}
              onClick={() => this.props.history.push("/list-policy")}
              disabled={true}
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
  },
};

export default AddPolicyComponent;
