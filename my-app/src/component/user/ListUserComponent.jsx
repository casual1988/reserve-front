import React, { Component } from 'react'
import UserService from "../../service/UserService";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from "../Navbar";

class ListUserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.reloadUserList = this.reloadUserList.bind(this);
    }

    componentDidMount() {
        this.reloadUserList();
    }

    reloadUserList() {
        UserService.fetchUsers()
            .then((res) => {
                this.setState({users: res.data.result})
            });
    }

    deleteUser(userId) {
        UserService.deleteUser(userId)
           .then(res => {
               this.setState({message : 'User deleted successfully.'});
               this.setState({users: this.state.users.filter(user => user.id !== userId)});
           })
    }

    editUser(id) {
        window.localStorage.setItem("userId", id);
        this.props.history.push('/edit-user');
    }

    addUser() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-user');
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={styles.center}>Lista Korisnika</Typography>
                    <Button variant="contained" style={styles.button} onClick={() => this.addUser()}>
                        Dodaj Korisnika
                    </Button>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Ime</TableCell>
                                <TableCell align="right">Prezime</TableCell>
                                <TableCell align="right">UserName</TableCell>
                                <TableCell align="right">Zastupnik ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.firstName}</TableCell>
                                    <TableCell align="right">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.username}</TableCell>
                                    <TableCell align="right">{row.employeeId}</TableCell>
                                    <TableCell align="right" >
                                        <CreateIcon onClick={() => this.editUser(row.id)}></CreateIcon></TableCell>
                                    <TableCell  align="right" >
                                       <DeleteIcon onClick={() => this.deleteUser(row.id)}></DeleteIcon></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            </React.Fragment>
        );
    }

}



const styles= {
    center :{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 50

    },
    button:{
        background: '#8f2086',
        color: "white"
    }
}

export default ListUserComponent;