import React, { Component, Fragment } from "react";
import PolicyService from "../../service/PolicyService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavBar from "../Navbar";

class AddPolicyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policyNumber: "",
      discount: "",
      discountPercentage: "",
      firstName: "",
      lastName: "",
      price: "",
      policyType: "",
      description: "",
      message: null,
    };
    this.savePolicy = this.savePolicy.bind(this);
  }

  savePolicy = (e) => {
    e.preventDefault();
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
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        const { price, discount } = this.state;
        price && discount
          ? this.setState({
              discountPercentage: ((discount * 100) / price).toFixed(2),
            })
          : this.setState({ discountPercentage: 0 });
      }
    );
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
              value={this.state.discountPercentage}
            />

            <TextField
              label="TIP POLISE"
              fullWidth
              margin="normal"
              name="policyType"
              value={this.state.policyType}
              onChange={this.onChange}
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
