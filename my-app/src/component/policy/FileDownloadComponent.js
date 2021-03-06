import React, { Component } from "react";
import axios from "axios";
import AuthService from "./../../service/AuthService";
import { TextField, CircularProgress } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import NavBar from "../Navbar";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

class FileDownloadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: new Date(),
      dateFromString: Moment(this.dateFrom).format("yyyy-MM-DD"),
      dateTo: new Date(),
      dateToString: Moment(this.dateTo).format("yyyy-MM-DD"),
      loading: false,
      errMsg: undefined,
    };
  }

  downloadReport = () => {
    this.setState({ loading: true });
    axios
      .get(
        "http://localhost:8080/report?dateFrom=" +
          this.state.dateFromString +
          "&dateTo=" +
          this.state.dateToString,
        {
          headers: {
            Authorization: AuthService.getAuthToken(),
            "Content-Disposition": "attachment; filename=template.xlsx",
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
          responseType: "arraybuffer",
          timeout: 10000,
        }
      )
      .then((response) => {
        this.setState({ loading: false });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "AurisPolisaTabela.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
        this.setState({ errMsg: "Došlo je do greške." });
      });
  };

  handleStartChange = (e) => {
    this.setState({
      dateFrom: new Date(e.target.value),
      dateFromString:
        Moment(e.target.value).format("yyyy-MM-DD") !== "Invalid date"
          ? Moment(e.target.value).format("yyyy-MM-DD")
          : "",
    });
  };

  handleEndChange = (e) => {
    this.setState({
      dateTo: new Date(e.target.value),
      dateToString:
        Moment(e.target.value).format("yyyy-MM-DD") !== "Invalid date"
          ? Moment(e.target.value).format("yyyy-MM-DD")
          : "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <Typography variant="h4" style={titleStyle}>
            Izvoz polisa
          </Typography>
          <div className="">
            <TextField
              id="dateFrom"
              label="Datom od"
              type="date"
              defaultValue={this.state.dateFromString}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                this.handleStartChange(e);
              }}
            />
            <TextField
              id="dateTo"
              label="Datum do"
              type="date"
              defaultValue={this.state.dateToString}
              InputLabelProps={{
                shrink: true,
              }}
              style={dateStyle}
              onChange={(e) => {
                this.handleEndChange(e);
              }}
            />
            {!this.state.loading && (
              <Button
                variant="contained"
                style={saveButton}
                endIcon={<SaveIcon />}
                onClick={() => this.downloadReport()}
              >
                Generiši izvještaj
              </Button>
            )}
            {this.state.loading && <CircularProgress />}
            {this.state.errMsg && <div>{this.state.errMsg}</div>}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

const titleStyle = {
  display: "flex",
  marginTop: 50,
  marginBottom: 50,
};

const dateStyle = {};

const saveButton = {
  background: "#8f2086",
  color: "white",
  margin: 5,
};

export default FileDownloadComponent;
