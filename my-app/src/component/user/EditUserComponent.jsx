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
            password: ''
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
                password: user.password,
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
                    <Typography variant="h4" style={style}>Izmjena korisnika</Typography>
                    <form>

                        <TextField label="KORISNIČKO IME" fullWidth margin="normal" name="username" value={this.state.username} disabled/>

                        <TextField label="IME" fullWidth margin="normal" name="firstName" value={this.state.firstName} onChange={this.onChange}/>

                        <TextField label="LOZINKA" type="password" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>


                        <TextField label="PREZIME" fullWidth margin="normal" name="lastName" value={this.state.lastName} onChange={this.onChange}/>

                        <TextField label="ZASTUPNIK ID" fullWidth margin="normal" name="employeeId" value={this.state.employeeId} onChange={this.onChange}/>

                        <TextField label="BROJ TELEFONA" fullWidth margin="normal" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange}/>

                        <Button variant="contained" style={styles.button} onClick={this.saveUser}>Snimi</Button>
                        <Button variant="contained" style={styles.button} onClick={() => this.props.history.push('/list-user')}>Odustani</Button>

                    </form>
                </Container>
            </React.Fragment>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center',
    marginTop: 50
}
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

export default EditUserComponent;