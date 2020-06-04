import React, { Component } from "react";
import axios from "axios";
import AuthService from "./../../service/AuthService";
import { TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import NavBar from "../Navbar";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";

class FileDownloadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: new Date(),
      dateFromString: Moment(this.dateFrom).format("yyyy-MM-DD"),
      dateTo: new Date(),
      dateToString: Moment(this.dateTo).format("yyyy-MM-DD"),
    };
  }

  downloadReport = () => {
    console.log(this.state.dateFrom);
    console.log(this.state.dateTo);
    console.log(AuthService.getAuthHeader());
    axios
      .get(
        "http://185.125.123.102:8282/report?dateFrom=" +
          Moment(this.state.dateFrom).format("yyyy-MM-DD") +
          "&dateTo=" +
          (Moment(this.state.dateTo).format("yyyy-MM-DD") !== "Invalid date" &&
            Moment(this.state.dateTo).format("yyyy-MM-DD")),
        {
          headers: {
            Authorization: AuthService.getAuthToken(),
            "Content-Disposition": "attachment; filename=template.xlsx",
            "Content-Type":
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        //const effectiveFileName = "my filename.xlsx";
        //FileSaver.saveAs(response.data, effectiveFileName);

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        console.log(response.headers);
        link.setAttribute("download", "AurisPolisaTabela.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
        //document.body.removeChild(link);
        //window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log(error);
        console.log("FileDownloadComponent cant authenticate");
      });
  };

  handleStartChange = (e) => {
    this.setState({
      dateFrom: new Date(e.target.value),
      dateFromString: Moment(e.target.value).format("yyyy-MM-DD"),
    });
  };

  handleEndChange = (e) => {
    this.setState({
      dateTo: new Date(e.target.value),
      dateToString: Moment(e.target.value).format("yyyy-MM-DD"),
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
            <div
              className="btn btn-primary"
              onClick={(e) => {
                this.downloadReport(e);
              }}
            >
              Download report
            </div>
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

const dateStyle = {
  fontSize: "150%",
};

export default FileDownloadComponent;
