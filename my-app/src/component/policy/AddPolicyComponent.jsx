import React, { Component, Fragment } from 'react'
import PolicyService from "../../service/PolicyService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";

class AddPolicyComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            policyNumber: '',
            discount: '',
            discountPercentage:'',
            firstName: '',
            lastName: '',
            price: '',
            carType:'',
            userId: '',
            description:'',
            message: null
        }
        this.savePolicy = this.savePolicy.bind(this);
    }

    savePolicy = (e) => {
        e.preventDefault();
        let policy = {policyNumber: this.state.policyNumber, discount: this.state.discount, 
            firstName: this.state.firstName, lastName: this.state.lastName, discountPercentage:this.state.discountPercentage,
            price: this.state.price, userId: this.state.userId, description: this.state.description, carType: this.state.carType};
        PolicyService.addPolicy(policy)
            .then(res => {
                this.setState({message : 'Policy added successfully.'});
                this.props.history.push('/list-policy');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Add Policy</Typography>
                    <form style={formContainer}>

                        <TextField label="POLICY NUMBER" fullWidth margin="normal" name="policyNumber" value={this.state.policyNumber} onChange={this.onChange}/>

                        <TextField label="DISCOUNT" type="number" fullWidth margin="normal" name="discount" value={this.state.discount} onChange={this.onChange}/>

                        <TextField label="DISCOUNT PERCENTAGE" type="number" fullWidth margin="normal" name="discountPercentage" value={this.state.discountPercentage} onChange={this.onChange}/>

                        <TextField label="FIRST NAME" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>

                        <TextField label="LAST NAME" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>

                        <TextField label="CAR TYPE" fullWidth margin="normal" name="carType" value={this.state.carType} onChange={this.onChange}/>

                        <TextField label="PRICE" type="number" fullWidth margin="normal" name="price" value={this.state.price} onChange={this.onChange}/>

                        <TextField label="USER ID" type="number" fullWidth margin="normal" name="userId" value={this.state.userId} onChange={this.onChange}/>

                        <TextField label="DESCRIPTION" fullWidth margin="normal" name="description" value={this.state.description} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.savePolicy}>Snimi</Button>
                        <Button variant="contained" color="primary" onClick={() => this.props.history.push('/list-policy')}>Odustani</Button>
                    </form>
                </Container>
            </Fragment>
        );
    }
}
const formContainer = {
    display: 'flex',
    flexFlow: 'row wrap'
};

const style ={
    display: 'flex',
    justifyContent: 'center'

}

export default AddPolicyComponent;