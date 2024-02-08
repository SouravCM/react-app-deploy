import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Chart } from "react-google-charts";

import AuthServices from "../services/AuthServices";
import DashboardService from "../services/DashboardService";
import GateInOutService from "../services/GateInOutService";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { useQRCode } from "next-qrcode";

import "../print.css";
import CompanyLogo from "../ranelogo.png";

import PrintIcon from "@mui/icons-material/Print";

import {
  GridCsvExportMenuItem,
  GridToolbarContainer,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  backgroundColor: "#F1F9FD",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const main = {
  border: "1px solid",
  margin: "5px",
  padding: "10px",
  align: "center",
};

const imageStyle = {
  width: "75px",
  height: "50px",
};

const companyname = {
  margin: "10px",
};

const titleDiv = {
  marginLeft: "50px",
  marginTop: "10px",
  marginRight: "10px",
  marginBottom: "10px",
};

const tableBottonCss = {
  fontSize: "15px",
};

const tdStyle = {
  align: "right",
  width: "200px",
  textAlign: "center",
};

const signatureStyle = {
  padding: "100px",
};

const signatureRightStyle = {
  textAlign: "center",
};

const ButtonAreaStyle = {
  padding: "4px",
  margin: "4px",
  width: "120px",
  backgroundColor: "#B5493A",
  color: "white",
  border: "none",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "bold",
  cursor: "pointer",
  height: "44px",
};
const ButtonAreaStyle1 = {
  padding: "4px",
  margin: "4px",
  width: "120px",
  backgroundColor: "#57B060",
  color: "white",
  border: "none",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "bold",
  cursor: "pointer",
  height: "44px",
};

function SecurityDashboard() {
  const { Canvas } = useQRCode();
  const [plantName, setplantName] = useState("");
  const [newGatePass, setNewGatePass] = useState("");
  const [transporterName, setTransporterName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [insurance, setInsurance] = useState("");
  const [insExpiry, setInsExpiry] = useState("");
  const [pollution, setPollution] = useState("");
  const [pcExpiry, setPcExpiry] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverLic, setDriverLic] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [storeName, setStoreName] = useState([]);

  const [printopen, setPrintopen] = React.useState(false);

  const handleClosed = () => {
    window.print();
  };

  const handlePrintClose = () => {
    setPrintopen(false);
  };

  const [outVehicles, setOutVehicles] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalInVehicled, setTotalInVehicled] = useState(0);

  const data = [
    ["Task", "Vehicles Gate-In/OUt"],
    ["Gate-In Vehicles", totalVehicles],
    ["Gate-Out Vehicles", outVehicles],
  ];

  // const options = {
  //   title: "Total Vehicles :" + totalVehicles,
  // };

  async function getDetentionVehicles() {
    let userCompany = AuthServices.getSelectedPlant();
    let companyIdVar = userCompany.plantId;
    const dateJson = {
      companyId: companyIdVar,
    };
    let detentionVehicles = await DashboardService.getDetentionVehiclesList(
      dateJson
    );

    if (detentionVehicles.code === 200) {
      setDetentionRows([]);
      detentionVehicles.responseBody.map((gatepass, index) =>
        setDetentionRows((prevState) => [
          ...prevState,
          {
            gatePassId: gatepass.gatepass.id,
            id: index + 1,
            sno: index + 1,
            vehicleno: gatepass.vehicle.registrationNo,
            transporter: gatepass.vehicle.transporter.name,
            drivername: gatepass.driver.name,
            driverLicence: gatepass.driver.licenseNo,
            gatePassNo: gatepass.gatepass.passNo,
            drivermobile: gatepass.driver.mobileNo,
            gatein: moment(new Date(gatepass.gatepass.entryTime)).format(
              "DD-MM-YYYY HH:mm:ss"
            ),
            dentention: gatepass.gatepass.detentionTime,
            purpose: gatepass.gatepass.purpose,
            insuranceno: gatepass.vehicle.insurance,
            insuranceExpiry: gatepass.vehicle.insuranceExpiry
              ? moment(new Date(gatepass.vehicle.insuranceExpiry)).format(
                  "DD-MM-YYYY"
                )
              : "",
            polutionNo: gatepass.vehicle.pcNo,
            polutionExpiry: gatepass.vehicle.pcExpiry
              ? moment(new Date(gatepass.vehicle.pcExpiry)).format("DD-MM-YYYY")
              : "",
            stores: gatepass.stores,
          },
        ])
      );
      // detentionRows.shift();
    } else {
      console.log("Some thing went worng");
    }
  }

  const GateInOutButtons = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <Button
          variant="outlined"
          onClick={getInClicked}
          style={ButtonAreaStyle1}
        >
          Create Pass
        </Button>
        <Button
          variant="outlined"
          onClick={getOutClicked}
          style={ButtonAreaStyle}
        >
          Close Pass
        </Button>
      </div>
    );
  };

  const Boxs = () => {
    const containerStyle = {
      display: "flex",
    };

    const box1Style = {
      border: "3px solid #57B060", // Increase border width to 4px
      borderRadius: "10px",
      padding: "10px",
      margin: "10px",
      width: "22%",
    };

    const box2Style = {
      border: "3px solid #B5493A", // Increase border width to 4px
      borderRadius: "10px",
      padding: "10px",
      margin: "10px",
      width: "22%",
    };

    const box3Style = {
      border: "3px solid #FFB940", // Increase border width to 4px
      borderRadius: "10px",
      padding: "10px",
      margin: "10px",
      width: "24%",
    };

    const h2Style = {
      margin: 0,
      fontSize: "14px",
      textAlign: "center", // center align the text
    };
    const h1Style = {
      margin: 0,
      textAlign: "center", // center align the text
    };

    return (
      <div style={containerStyle}>
        <div style={box1Style} title="Gate Pass Issued Today">
          <h2 style={h2Style}>{"Gate Pass Issued Today"}</h2>
          <h2 style={h1Style}>{totalVehicles}</h2>
        </div>
        <div style={box2Style} title="Gate Out Issued Today">
          <h2 style={h2Style}>{"Gate Out Issued Today"}</h2>
          <h2 style={h1Style}>{outVehicles}</h2>
        </div>
        <div style={box3Style} title="Total No of Vehicles Inside">
          <h2 style={h2Style}>{"Total No of Vehicles Inside"}</h2>
          <h2 style={h1Style}>{totalInVehicled}</h2>
        </div>
      </div>
    );
  };

  const PieChart = () => {
    const options = {
      pieHole: 0.5,
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "#333",
          fontSize: 12,
          fontName: "Arial",
        },
      },
      slices: {
        0: { color: "#57B060" },
        1: { color: "#B5493A" },
      },
      pieSliceTextStyle: {
        fontSize: 10,
      },
    };

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "330px",
        }}
      >
        <Chart
          chartType="PieChart"
          data={data}
          width={"100%"}
          height={"100%"}
          options={options}
        />
        {/* <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span
                style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
              >
                {totalVehicles}
              </span>
            </div>
            <div>
              <span
                style={{ fontSize: "10px", fontWeight: "bold", color: "#333" }}
              >
                Total Vehicles
              </span>
            </div>
          </div>
        </div> */}
      </div>
    );
  };

  // const PieChart1 = () => {
  //   return (
  //     <Chart chartType="PieChart" data={data} width={"75%"} height={"250px"} />
  //   );
  // };

  const [detentionRows, setDetentionRows] = useState([]);
  useEffect(() => {
    const setPrintStyles = () => {
      const style = document.createElement("style");

      style.innerHTML = `
      
    @media print {
      
      @page {
      
            size: A4;
      
            margin: 0;
      
           }
      
          
      
           body {
      
            padding: 0.5cm;
      
           }
      
          }
      
         `;

      document.head.appendChild(style);
    };

    window.onbeforeprint = setPrintStyles;

    window.onafterprint = () => {
      // Clean up the print styles after printing

      const style = document.querySelector("style");

      if (style) {
        document.head.removeChild(style);
      }
    };

    async function getCounts() {
      const today = moment();
      const startOfDay = today.startOf("day").format("YYYY-MM-DD HH:mm:ss");
      const endOfDay = today.endOf("day").format("YYYY-MM-DD HH:mm:ss");
      let userCompany = AuthServices.getSelectedPlant();
      // console.log("yoyo not set" + userCompany);
      let companyIdVar = userCompany.plantId;
      // console.log("yoyo plent not set" + companyIdVar);
      const dateJson = {
        companyId: companyIdVar,
        fromDate: startOfDay,
        toDate: endOfDay,
      };

      let dashboardCounts = await DashboardService.getSecurityCounts(dateJson);

      if (dashboardCounts.code === 200) {
        if (dashboardCounts.responseBody.totalVehicles === null)
          dashboardCounts.responseBody.totalVehicles = 0;
        if (dashboardCounts.responseBody.inVehicles === null)
          dashboardCounts.responseBody.inVehicles = 0;
        if (dashboardCounts.responseBody.outVehicles === null)
          dashboardCounts.responseBody.outVehicles = 0;
        setTotalVehicles(dashboardCounts.responseBody.totalVehicles);
        setOutVehicles(dashboardCounts.responseBody.outVehicles);
      } else {
        setDialogTitle("Security Dashboard");
        setDialogMessage("Something went wrong, check network");
        setOpen(true);
      }
    }
    getCounts();

    async function getTotalInCounts() {
      let userCompany = AuthServices.getSelectedPlant();
      let companyIdVar = userCompany.plantId;
      const dateJson = {
        companyId: companyIdVar,
      };

      let dashboardCounts = await DashboardService.getSecurityCounts(dateJson);

      if (dashboardCounts.code === 200) {
        if (dashboardCounts.responseBody.inVehicles === null)
          dashboardCounts.responseBody.inVehicles = 0;
        setTotalInVehicled(dashboardCounts.responseBody.inVehicles);
      } else {
        setDialogTitle("Security Dashboard");
        setDialogMessage("Something went wrong, check network");
        setOpen(true);
      }
    }
    getTotalInCounts();

    getDetentionVehicles();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = useState();
  const [dialogMessage, setDialogMessage] = useState();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const [openComplete, setOpenComplete] = React.useState(false);
  const handleCloseComplete = () => {
    setOpen(false);
    window.location.reload();
  };
  const [dialogTitleMessageComplete, setDialogTitleMessageComplete] =
    useState();
  const [dialogContentMessageComplete, setDialogContentMessageComplete] =
    useState();

  const handleDeleteClick = async (params) => {
    const rowValues = params.row; // Retrieve the row values

    const cancleDataJason = {
      id: rowValues.gatePassId,
      status: "REJECTED",
      remarks: "Due To Wrong entry",
    };

    let cancleResponce = await GateInOutService.gatePassChangeStatus(
      cancleDataJason
    );
    if (cancleResponce.code === 200) {
      setDialogTitleMessageComplete("GatePass Canceled");
      setDialogContentMessageComplete(
        "GatePass Number " + rowValues.gatePassNo + " has Been Cancled"
      );

      setOpenComplete(true);
    } else {
      setDialogTitle("GatePass Canceling Failed");
      setDialogMessage("Something went wrong, check network");
      setOpen(true);
    }
  };
  const handlePrintClick = async (params) => {
    let plant = AuthServices.getSelectedPlant();

    var stores = params.row.stores
      .map(function (item) {
        return item.name;
      })
      .join(",");

    setplantName(plant.plantName);
    setNewGatePass(params.row.gatePassNo);
    setTransporterName(params.row.transporter);
    setVehicleNumber(params.row.vehicleno);
    setInsurance(params.row.insuranceno);
    setInsExpiry(params.row.insuranceExpiry);
    setPollution(params.row.polutionNo);
    setPcExpiry(params.row.polutionExpiry);
    setDriverName(params.row.drivername);
    setDriverLic(params.row.driverLicence);
    setEntryTime(params.row.gatein);
    setStoreName(stores);
    setPrintopen(true);
  };

  const columns = [
    {
      field: "gatePassId",
      headerName: "Gate Pass Id",
      hide: true,
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "sno",
      headerName: "SL No",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vehicleno",
      headerName: "Vehicle No",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "transporter",
      headerName: "Transporter Name",
      align: "center",
      headerAlign: "center",
      flex: 1.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "drivername",
      headerName: "Driver Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "drivermobile",
      headerName: "Driver Mobile",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "gatePassNo",
      headerName: "Gate Pass No",
      align: "center",
      headerAlign: "center",
      flex: 1.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "gatein",
      headerName: "Gate-In Date & Time",
      align: "center",
      headerAlign: "center",
      flex: 1.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "purpose",
      headerName: "Purpose",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dentention",
      headerName: "Detention (HH:MM)",
      align: "center",
      headerAlign: "center",
      flex: 1.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => handleDeleteClick(params)}
        />,
        <GridActionsCellItem
          icon={<PrintIcon />}
          label="Print"
          color="primary"
          onClick={() => handlePrintClick(params)}
        />,
      ],
    },
  ];

  const csvOptions = { fileName: "List Of Vehicles Inside" };

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer {...props}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExportContainer>
          <GridCsvExportMenuItem options={csvOptions} />
        </GridToolbarExportContainer>
      </GridToolbarContainer>
    );
  }
  const navigate = useNavigate();
  const getInClicked = () => {
    console.log("Clikced on Gate In Button");
    navigate("/MainLayout/GateIn");
  };
  const getOutClicked = () => {
    console.log("Clicked on Gate Out Button");
    navigate("/MainLayout/GateOut");
  };

  return (
    <>
      <Grid container style={containerStyle}>
        <h2 style={{ color: "#15317E", marginLeft: "10px" }}>Dashboard</h2>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: "2px solid #696969",
              borderRadius: "5px",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  flex: 2,
                  padding: "5px",
                  // backgroundColor: "red",
                  // backgroundColor: "yellow",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <PieChart />
              </div>
              <div
                style={{
                  flex: 3,
                  padding: "50px",
                  paddingLeft: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "65px",
                  // backgroundColor: "red",
                }}
              >
                <Boxs />
              </div>
              <div
                style={{
                  flex: 0.5,
                  padding: "50px",
                  paddingLeft: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "65px",
                  // backgroundColor: "red",
                }}
              >
                <GateInOutButtons />
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: "2px solid #696969",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                zIndex: 999,
              }}
            >
              <h3
                style={{
                  color: "#1C3F75",
                }}
                title="Gate Pass In and Out summary from start date to till now"
              >
                List of Vehicles Inside
              </h3>
            </div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={detentionRows}
                columns={columns}
                columnVisibilityModel={{ gatePassId: false }}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
                slots={{ toolbar: CustomToolbar }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "super-app-theme--odd"
                    : "super-app-theme--even"
                }
                sx={{
                  // boxShadow: 2,
                  // border: 2,
                  // borderColor: "#1C3F75",
                  "& .MuiDataGrid-cell:hover": {
                    color: "#1C3F75",
                  },
                  "& .super-app-theme--header": {
                    backgroundColor: "#A9A9A9",
                    fontWeight: "bold",
                  },
                  "& .super-app-theme--even": {
                    backgroundColor: "#E8E8E8",
                  },
                  "& .super-app-theme--odd": {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </div>
          </Paper>
          <div>
            <Dialog
              open={printopen}
              sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "800px",
                  },
                },
              }}
              onClose={handlePrintClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {/* {dialogTitleMessage} */}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  textAlign="center"
                >
                  {/* {newGatePass} */}
                </DialogContentText>
                <br />

                <div style={main}>
                  <div>
                    <table>
                      <tr>
                        <td>
                          <img
                            src={CompanyLogo}
                            style={imageStyle}
                            alt="raneT4u"
                          />
                        </td>
                        <td>
                          <h5 style={companyname}>
                            RANE(MADRAS) LTD. <br />
                            {plantName}
                          </h5>
                        </td>
                        <td>
                          <h4 style={titleDiv}>
                            <u>Vehicle In Pass</u>
                          </h4>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <div>
                      <table style={tableBottonCss}>
                        <tbody>
                          <tr>
                            <td>Vehicle Pass No:</td>
                            <td> {newGatePass}</td>
                          </tr>
                          <tr>
                            <td>Transport Name:</td>
                            <td>{transporterName}</td>
                            <td rowSpan="6" style={tdStyle}>
                              {" "}
                              <Canvas
                                text={newGatePass}
                                options={{
                                  level: "M",
                                  margin: 3,
                                  scale: 4,
                                  width: 175,
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Vehicle No:</td>
                            <td>{vehicleNumber}</td>
                          </tr>
                          <tr>
                            <td>Insurance No:</td>
                            <td>
                              {insurance} / Valid Date: {insExpiry}
                            </td>
                          </tr>
                          <tr>
                            <td>Pollution Certification No:</td>
                            <td>
                              {pollution}/ Valid Date: {pcExpiry}
                            </td>
                          </tr>
                          <tr>
                            <td>Driver Name:</td>
                            <td>
                              {driverName} / DL No : {driverLic}
                            </td>
                          </tr>
                          <tr>
                            <td>Vehicle In(Date & Time):</td>
                            <td>{entryTime}</td>
                          </tr>
                          <tr>
                            <td>Loding/Unloading Location:</td>
                            <td>{storeName}</td>
                          </tr>
                          <br></br>
                          <br></br>

                          <tr style={signatureStyle}>
                            <td style={signatureRightStyle}>
                              Stores in Charge Signature
                            </td>
                            <td></td>
                            <td style={signatureRightStyle}>
                              Security Signature
                            </td>
                          </tr>
                          <tr>
                            <td style={signatureRightStyle}>
                              {" "}
                              Store In Charge Name
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div></div>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <>
                  <Button className="hide-on-print" onClick={handleClosed}>
                    Print
                  </Button>
                  <Button
                    className="hide-on-print"
                    onClick={handlePrintClose}
                    autoFocus
                  >
                    Close
                  </Button>{" "}
                </>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>
      </Grid>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openComplete}
          onClose={handleCloseComplete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialogTitleMessageComplete}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogContentMessageComplete}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Button onClick={handleCloseComplete} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default SecurityDashboard;
