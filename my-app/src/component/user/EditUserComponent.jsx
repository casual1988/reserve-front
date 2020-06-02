import React, { Component } from 'react'
import UserService from "../../service/UserService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";

class EditUserComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            username: '',
            firstName: '',
            lastName: '',
            employeeId: '',
            contactNumber: '',
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        UserService.fetchUserById(window.localStorage.getItem("userId"))
            .then((res) => {
                let user = res.data.result;
                this.setState({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                employeeId: user.employeeId,
                contactNumber: user.contactNumber,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, employeeId: this.state.employeeId, contactNumber: this.state.contactNumber};
        UserService.editUser(user)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                this.props.history.push('/list-user');
            });
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Edit User</Typography>
                    <form>

                        <TextField label="USERNAME" fullWidth margin="normal" name="username" value={this.state.username} disabled/>

                        <TextField label="IME" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>

                        <TextField label="PREZIME" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>

                        <TextField label="ZASTUPNIK ID" fullWidth margin="normal" name="employeeId" value={this.state.employeeId} onChange={this.onChange}/>

                        <TextField label="BROJ TELEFONA" fullWidth margin="normal" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange}/>

                        <Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>

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

export default EditUserComponent;