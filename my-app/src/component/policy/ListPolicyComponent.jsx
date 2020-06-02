import React, { Component } from 'react'
import PolicyService from "../../service/PolicyService";
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

class ListPolicyComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            policies: [],
            message: null
        }

        this.deletePolicy = this.deletePolicy.bind(this);
        this.editPolicy = this.editPolicy.bind(this);
        this.addPolicy = this.addPolicy.bind(this);
        this.reloadPolicyList = this.reloadPolicyList.bind(this);
    }

    componentDidMount() {
        this.reloadPolicyList();
    }

    reloadPolicyList() {
        PolicyService.fetchPoliciesByUserId()
            .then((res) => {
                this.setState({policies: res.data.result})
            });
    }

    deletePolicy(policyId) {
        PolicyService.deletePolicy(policyId)
           .then(res => {
               this.setState({message : 'Policy deleted successfully.'});
               this.setState({policies: this.state.policies.filter(policy => policy.id !== policyId)});
           })
    }

    editPolicy(id) {
        window.localStorage.setItem("policyId", id);
        this.props.history.push('/edit-policy');
    }

    addPolicy() {
        window.localStorage.removeItem("policyId");
        this.props.history.push('/add-policy');
    }

    render() {
        return (
            <React.Fragment>
                <NavBar/>
                <Container>
                    <Typography variant="h4" style={style}>Policy Details</Typography>
                    <Button variant="contained" color="primary" onClick={() => this.addPolicy()}>
                        Add Policy
                    </Button>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="right">Ime</TableCell>
                                <TableCell align="right">Prezime</TableCell>
                                <TableCell align="right">Broj polise</TableCell>
                                <TableCell align="right">Popust</TableCell>
                                <TableCell align="right">Popust %</TableCell>
                                <TableCell align="right">Dodatni opis</TableCell>
                                <TableCell align="right">Datum unosa</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.policies.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.firstName}</TableCell>
                                    <TableCell align="right">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.policyNumber}</TableCell>
                                    <TableCell align="right">{row.discount}</TableCell>
                                    <TableCell align="right">{row.discountPercentage}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{row.insertDate}</TableCell>
                                    <TableCell align="right" onClick={() => this.editPolicy(row.id)}><CreateIcon /></TableCell>
                                    <TableCell align="right" onClick={() => this.deletePolicy(row.id)}><DeleteIcon /></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
            </React.Fragment>
        );
    }

}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default ListPolicyComponent;