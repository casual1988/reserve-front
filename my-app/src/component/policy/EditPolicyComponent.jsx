import React, { Component } from "react";
import PolicyService from "../../service/PolicyService";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NavBar from "../Navbar";

class EditPolicyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      policyNumber: "",
      discount: "",
      discountPercentage: 0,
      firstName: "",
      lastName: "",
      price: "",
      policyType: "",
      description: "",
      message: null,
    };
    this.savePolicy = this.savePolicy.bind(this);
    this.loadPolicy = this.loadPolicy.bind(this);
  }

  componentDidMount() {
    this.loadPolicy();
  }

  loadPolicy() {
    PolicyService.fetchPolicyById(window.localStorage.getItem("policyId")).then(
      (res) => {
        let policy = res.data.result;
        this.setState({
          id: policy.id,
          policyNumber: policy.policyNumber,
          firstName: policy.firstName,
          lastName: policy.lastName,
          discount: policy.discount,
          discountPercentage: policy.discountPercentage,
          price: policy.price,
          description: policy.description,
          insertDate: policy.insertDate,
          userId: policy.userId,
          policyType: policy.policyType,
        });
      }
    );
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { price, discount } = this.state;
      price > 0 && discount > 0
        ? this.setState({
            discountPercentage: parseFloat(
              ((discount * 100) / price).toFixed(2)
            ),
          })
        : this.setState({ discountPercentage: 0 });
    });
  };

  savePolicy = (e) => {
    e.preventDefault();
    let policy = {
      id: this.state.id,
      policyNumber: this.state.policyNumber,
      discount: this.state.discount,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      discountPercentage: this.state.discountPercentage,
      policyType: this.state.policyType,
      price: this.state.price,
      description: this.state.description,
      carType: this.state.carType,
      insertDate: this.state.insertDate,
      userId: this.state.userId,
    };
    PolicyService.editPolicy(policy).then((res) => {
      this.setState({ message: "policy added successfully." });
      this.props.history.push("/list-policy");
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Typography variant="h4" style={style}>
            Izmjena Polise
          </Typography>
          <form>
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
              fullWidth
              disabled
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
              color="primary"
              onClick={this.savePolicy}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push("/list-policy")}
            >
              Odustani
            </Button>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

const style = {
  display: "flex",
  justifyContent: "center",
  marginTop: 50,
};

export default EditPolicyComponent;
