import React, { Component, Fragment } from 'react'
import UserService from "../../service/UserService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";

class AddUserComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            employeeId: '',
            contactNumber: '',
            message: null
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {username: this.state.username, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, employeeId: this.state.employeeId, contactNumber: this.state.contactNumber};
        UserService.addUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/list-user');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Dodaj Korisnika</Typography>
                    <form style={formContainer}>

                        <TextField label="USERNAME" fullWidth margin="normal" name="username" value={this.state.username} onChange={this.onChange}/>

                        <TextField label="PASSWORD" type="password" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>

                        <TextField label="IME" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>

                        <TextField label="PREZIME" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>

                        <TextField label="ZASTUPNIK ID" fullWidth margin="normal" name="employeeId" value={this.state.employeeId} onChange={this.onChange}/>

                        <TextField label="BROJ TELEFONA" fullWidth margin="normal" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Snimi</Button>
                        <Button variant="contained" color="primary" onClick={() => this.props.history.push('/list-user')}>Odustani</Button>
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
    justifyContent: 'center',
    marginTop: 50
}

export default AddUserComponent;