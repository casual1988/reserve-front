import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthService from '../../service/AuthService';
<<<<<<< HEAD
=======
//import logo from './../../logo.svg';
>>>>>>> moj_branch

class LoginComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
        }
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    login = (e) => {
        e.preventDefault();
        const credentials = {username: this.state.username, password: this.state.password};
        AuthService.login(credentials).then(res => {
            if(res.data.status === 200){
                localStorage.setItem("userInfo", JSON.stringify(res.data.result));
<<<<<<< HEAD
                this.props.history.push('/list-user');
=======
                this.props.history.push('/list-policy');
>>>>>>> moj_branch
            }else {
                this.setState({message: res.data.message});
            }
        });
    };

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <React.Fragment>
<<<<<<< HEAD
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            React User Application
=======
                <AppBar position="static" >
                
                    <Toolbar className="App-AuraCollor">
                        <Typography variant="h6" className="App-AuraCollor">
                            AURA - Mobile agent
>>>>>>> moj_branch
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="sm">
<<<<<<< HEAD
                    <Typography variant="h4" style={styles.center}>Login</Typography>
=======
                    <Typography variant="h4" style={styles.center}>Prijava</Typography>
>>>>>>> moj_branch
                    <form>
                        <Typography variant="h4" style={styles.notification}>{this.state.message}</Typography>
                        <TextField type="text" label="USERNAME" fullWidth margin="normal" name="username" value={this.state.username} onChange={this.onChange}/>

                        <TextField type="password" label="PASSWORD" fullWidth margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>

<<<<<<< HEAD
                        <Button variant="contained" color="secondary" onClick={this.login}>Login</Button>
=======
                        <Button variant="contained" style={styles.button} onClick={this.login}>Login</Button>
>>>>>>> moj_branch
                    </form>
                </Container>
            </React.Fragment>
        )
    }

}

const styles= {
    center :{
        display: 'flex',
<<<<<<< HEAD
        justifyContent: 'center'
=======
        justifyContent: 'center',
        marginTop: 150
>>>>>>> moj_branch

    },
    notification: {
        display: 'flex',
        justifyContent: 'center',
        color: '#dc3545'
<<<<<<< HEAD
=======
    },
    button:{
        background: '#8f2086',
        color: "white"
>>>>>>> moj_branch
    }
}

export default LoginComponent;