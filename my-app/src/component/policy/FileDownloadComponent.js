import React, { Component } from "react";
import axios from "axios";
import AuthService from './../../service/AuthService';

class FileDownloadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined,
    };
  }

 

  downloadReport = () => {
    console.log(AuthService.getAuthHeader());
    axios
      .get(
        "http://185.125.123.102:8282/report",
        {
          headers: {
            "Authorization": AuthService.getAuthToken(),
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

  render() {
    const { token } = this.state;
    return (
      <div className="container">
        

        <div
          className="btn btn-primary"
          onClick={() => {
            this.downloadReport();
          }}
        >
          Download report
        </div>
      </div>
      
    );
  }
}

export default FileDownloadComponent;
