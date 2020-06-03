import React  from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import AuthService from "../service/AuthService";


const style = {
    flexGrow: 1
}
const NavBar = () => {
    return (
            <div>
                <AppBar position="static">
                    <Toolbar className="App-AuraCollor">
                        <Typography variant="h6" style={style} className="App-AuraCollor">
                            AURA - Mobile agent
                        </Typography>
                        <Button color="inherit">{AuthService.getUserInfo().username}</Button>
                        <Button color="inherit" component={Link} to="/">Logout</Button>
                    </Toolbar>
                        <header>

        <nav>
            <ul className='navLinks'>
            <li><Link to="/list-policy">Početna</Link></li>
            <li><Link to="/add-policy">Dodaj polisu</Link></li>
            <li><Link to="/add-user">Dodaj korisnika</Link></li>
            <li><Link to="/list-user">Lista korisnika</Link></li>
            <li><Link to="/file-download">Export polisa</Link></li>
            </ul>
        </nav>
        </header>
                </AppBar>
            </div>
        )
}


export default NavBar;
