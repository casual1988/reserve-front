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
                    <Toolbar>
                        <Typography variant="h6" style={style}>
                            React User Application
                        </Typography>
                        <Button color="inherit">{AuthService.getUserInfo().username}</Button>
                        <Button color="inherit" component={Link} to="/">Logout</Button>
                    </Toolbar>
                        <header>

        <nav>
            <ul className='navLinks'>
            <li><Link to="/list-policy">Pocetna</Link></li>
            <li><Link to="/add-policy">Dodaj policu</Link></li>
            <li><Link to="/add-user">Dodaj korisnika</Link></li>
            <li><Link to="/list-user">Lista korisnika</Link></li>
    
            </ul>
        </nav>
        </header>
                </AppBar>
            </div>
        )
}


export default NavBar;
