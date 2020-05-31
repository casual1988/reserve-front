import React, { Component } from 'react'
import PolicyService from "../../service/PolicyService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";

class EditPolicyComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            policyNumber: '',
            discount: '',
            discountPercentage:'',
            firstName: '',
            lastName: '',
            price: '',
            userId: '',
            carType:'',
            description:'',
            message: null
        }
        this.savePolicy = this.savePolicy.bind(this);
        this.loadPolicy = this.loadPolicy.bind(this);
    }

    componentDidMount() {
        this.loadPolicy();
    }

    loadPolicy() {
        PolicyService.fetchPolicyById(window.localStorage.getItem("policyId"))
            .then((res) => {
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
                carType: policy.carType
                })
            });
    }
    
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    savePolicy = (e) => {
        e.preventDefault();
        let policy = {id: this.state.id, policyNumber: this.state.policyNumber, discount: this.state.discount, 
            firstName: this.state.firstName, lastName: this.state.lastName, discountPercentage:this.state.discountPercentage,
            price: this.state.price, userId: this.state.userId, description: this.state.description, carType: this.state.carType};
            PolicyService.editPolicy(policy)
            .then(res => {
                this.setState({message : 'policy added successfully.'});
                this.props.history.push('/list-policy');
            });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Edit policy</Typography>
                    <form>

                    <TextField label="POLICY NUMBER" fullWidth margin="normal" name="policyNumber" value={this.state.policyNumber} onChange={this.onChange}/>

                    <TextField label="DISCOUNT" type="number" fullWidth margin="normal" name="discount" value={this.state.discount} onChange={this.onChange}/>

                    <TextField label="DISCOUNT PERCENTAGE" type="number" fullWidth margin="normal" name="discountPercentage" value={this.state.discountPercentage} onChange={this.onChange}/>

                    <TextField label="FIRST NAME" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>

                    <TextField label="LAST NAME" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>

                    <TextField label="CAR TYPE" fullWidth margin="normal" name="carType" value={this.state.carType} onChange={this.onChange}/>

                    <TextField label="PRICE" type="number" fullWidth margin="normal" name="price" value={this.state.price} onChange={this.onChange}/>

                    <TextField label="USER ID" type="number" fullWidth margin="normal" name="userId" value={this.state.userId} onChange={this.onChange}/>

                    <TextField label="DESCRIPTION" fullWidth margin="normal" name="description" value={this.state.description} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.savePolicy}>Save</Button>

                    </form>
                </Container>
            </React.Fragment>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default EditPolicyComponent;