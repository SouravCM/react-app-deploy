import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useQRCode } from "next-qrcode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
//import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import VehicleService from "../../services/VehicleService";
import DriverService from "../../services/DriverService";
import GateInOutService from "../../services/GateInOutService";
import AuthServices from "../../services/AuthServices";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CompanyLogo from "../../ranelogo.png";
import { Link } from "react-router-dom";
import "../../print.css";
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
// const textStyle = {
//   padding: "4px",
//   margin: "8px",
// };
// const containerStyle = {
//   padding: "4px",
//   height: "auto",
//   margin: "auto",
// };
const ItemStyle = {
  padding: "8px",
  margin: "4px",
};
const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  backgroundColor: "#F0FFFF",
};
const paperStyle = {
  width: "auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "25px",
  height: "auto",

  margin: "25px",
  backgroundColor: "#151B54",
};
const outStyle = {
  padding: "4x",
  width: "100%",
  marginRight: "16px",
};

const maindiv = {
  display: "flex",
  justifyContent: "center",

  width: "auto",
};
const subdiv = {
  flex: "1",
  // alignItems: "center",
  justifyContent: "flex-start",
};
// const paperdiv = {
//   alignItems: "center",
//   justifyContent: "center",
// };

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
const contentDiv = {
  border: "1px solid",
  marginTop: "25px",
  width: "100%",
};
const leftDiv = {
  float: "left",
};
const rightDiv = {
  float: "right",
  width: "250px",
  height: "250px",
};
const qrImageStyle = {
  width: "75px",
  height: "75px",
};
const titleDiv = {
  marginLeft: "50px",
  marginTop: "10px",
  marginRight: "10px",
  marginBottom: "10px",
};
const signatureStyle = {
  padding: "100px",
};
const signatureRightStyle = {
  textAlign: "center",
};
const tableStyle = {
  width: "100%",
};
const tdStyle = {
  align: "right",
  width: "200px",
  textAlign: "center",
};
const tableBottonCss = {
  fontSize: "15px",
};

const ItemStyleDropDown = {
  padding: "9px",
  margin: "4px",
  marginLeft: "14% !important",
};

function GateIn() {
  const { Canvas } = useQRCode();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);

    window.location.reload();
  };

  const handleClosed = () => {
    //  setButtonEnable(false)
    window.print();
    //setButtonEnable(true)
  };
  const [buttonEnable, setButtonEnable] = useState(true);
  const [newGatePass, setNewGatePass] = useState();
  const [checked, setChecked] = React.useState([]);
  const [reason, setReason] = useState();

  const [vehicleListAPI, setVehicleListAPI] = useState([{}]);
  const [storesList, setStoresList] = useState([{}]);

  const [vehicleNumber, setVehicleNumber] = useState();
  const [vehicleId, setVehicleId] = useState();

  const [rc, setRc] = useState();
  const [rcExpiry, setRcExpiry] = useState();
  const [rcExpiryError, setRcExpiryError] = useState();

  const [fc, setFc] = useState();
  const [fcExpiry, setFcExpiry] = useState();
  const [fcExpiryError, setFcExpiryError] = useState();

  const [insurance, setInsurance] = useState();
  const [insExpiry, setInsExpiry] = useState();
  const [insExpiryError, setInsExpiryError] = useState();

  const [driverLic, setDriverLic] = useState();
  const [driverId, setDriverId] = useState();
  const [driverName, setDriverName] = useState();
  const [driverMobile, setDriverMobile] = useState();

  const [driverAge, setDriverAge] = useState();
  const [licExpiry, setLicExpiry] = useState();
  const [licExpiryError, setLicExpiryError] = useState();
  const [licType, setLicType] = useState();
  const [driverAddress, setDriverAddress] = useState();

  const [pollution, setPollution] = useState();
  const [pcExpiry, setPcExpiry] = useState();
  const [pcExpiryError, setPcExpiryError] = useState();

  const [transporterName, setTransporterName] = useState();
  const [storeName, setStoreName] = useState([]);
  const [entryTime, setEntryTime] = useState();
  //  const [vehicleSuccess, setVehicleSuccess] = useState();
  //  const [companyId, setCompanyId] = useState();

  const [licenceNumber, setLicenceNumber] = useState();
  const [licenceId, setLicenceId] = useState();
  const [licenceListAPI, setLicenceListAPI] = useState([{}]);

  const [plantName, setplantName] = useState();

  const [openError, setopenError] = React.useState(false);

  const handleCloseError = () => {
    setopenError(false);
  };

  const [dialogErrorTitleMessage, setDialogErrorTitleMessage] = useState();
  const [dialogErrorContentMessage, setDialogErrorContentMessage] = useState();

  useEffect(() => {
    // closeNav();

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

    async function fetchData() {
      // You can await here
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let vehicleList = await VehicleService.listActiveTransportertVehicle(
        plantId
      );

      if (vehicleList.code === 200) {
        setVehicleListAPI([]); //Clear existing list in array
        vehicleList.responseBody.map((vehicle) =>
          setVehicleListAPI((prevState) => [
            ...prevState,
            { label: vehicle.registrationNo, id: vehicle.id },
          ])
        );
      } else {
        console.log("Something went wrong in vehicle List getting");
      }
    }
    fetchData();

    async function fetchStoresData() {
      let userData = AuthServices.getUserDetails();
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;

      let storesList = await GateInOutService.getStoresList(plantId);

      if (storesList.code === 200) {
        setChecked([]);
        setStoresList([]); //Clear existing list in array
        storesList.responseBody.map((store) =>
          setStoresList((prevState) => [
            ...prevState,
            { name: store.name, storeId: store.id },
          ])
        );
      } else {
        console.log("Something went wrong in vehicle List getting");
      }
    }
    fetchStoresData();

    async function fetchLicenecData() {
      // You can await here
      let licenecList = await DriverService.getAllDrivers();

      if (licenecList.code === 200) {
        setLicenceListAPI([]); //Clear existing list in array
        licenecList.responseBody.map((licence) =>
          setLicenceListAPI((prevState) => [
            ...prevState,
            { label: licence.licenseNo, id: licence.id },
          ])
        );
      } else {
        console.log("Something went wrong in vehicle List getting");
      }
    }
    fetchLicenecData();
  }, []);

  const generateGatePass = async (e) => {
    var today = new Date();

    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    const entryTimePrint =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      +today.getFullYear() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

    setEntryTime(entryTimePrint);

    const storesSelected = [];
    setStoreName([]);
    checked.map(
      (ch) => {
        storesSelected.push({ storeId: ch.storeId });

        setStoreName((prevState) => [...prevState, ch.name + ", "]);
      }
      //setStoreName.push(ch.name)}
    );

    const insuranceExpired = moment(insExpiry, "DD-MM-YYYY").isSameOrAfter(
      moment(),
      "day"
    );
    const licenceExpired = moment(licExpiry, "DD-MM-YYYY").isSameOrAfter(
      moment(),
      "day"
    );
    const polutionExpired = moment(pcExpiry, "DD-MM-YYYY").isSameOrAfter(
      moment(),
      "day"
    );
    const RcExpired = moment(rcExpiry, "DD-MM-YYYY").isSameOrAfter(
      moment(),
      "day"
    );

    if (driverId) {
      if (reason) {
        if (storesSelected.length > 0) {
          if (RcExpired) {
            if (polutionExpired) {
              if (insuranceExpired) {
                if (licenceExpired) {
                  let companyIdVar;
                  let userCompany = AuthServices.getSelectedPlant();
                  if (userCompany) {
                    companyIdVar = userCompany.plantId;
                  } else {
                    console.log("User Compay is not defiend");
                    return;
                  }
                  let userId;
                  let userDetails = AuthServices.getUserDetails();
                  if (userDetails) {
                    userId = userDetails.id;
                  } else {
                    console.log("User Details is not defiend");
                    return;
                  }
                  const data = {
                    companyId: companyIdVar,
                    vehicleId: vehicleId,
                    driverId: driverId,
                    entryTime: date,
                    purpose: reason,
                    status: "DRAFT",
                    createdBy: userId,
                    stores: storesSelected,
                  };

                  //Call API
                  let gatepass = await GateInOutService.generateGatePass(
                    companyIdVar,
                    vehicleId,
                    driverId,
                    date,
                    reason,
                    "DRAFT",
                    userId,
                    storesSelected
                  );
                  console.log(gatepass);
                  if (gatepass.code === 209) {
                    setDialogErrorTitleMessage("Gate Pass Not Generated");
                    setDialogErrorContentMessage(gatepass.responseBody);
                    setopenError(true);
                  } else if (gatepass.code === 200) {
                    setplantName(userCompany.plantName);
                    setDialogTitleMessage("Gate Pass Generated Successfully");
                    setNewGatePass(gatepass.responseBody.passNo);
                    setOpen(true);
                  } else {
                    setDialogErrorTitleMessage("Error!!");
                    setDialogErrorContentMessage(
                      "unable to generate gatepass check your network"
                    );
                    setopenError(true);
                  }
                } else {
                  setDialogErrorTitleMessage("Licence Expired");
                  setDialogErrorContentMessage("");
                  setopenError(true);
                }
              } else {
                setDialogErrorTitleMessage("Insurance Expired");
                setDialogErrorContentMessage("");
                setopenError(true);
              }
            } else {
              setDialogErrorTitleMessage("Polution Expired");
              setDialogErrorContentMessage("");
              setopenError(true);
            }
          } else {
            setDialogErrorTitleMessage("RC Expired");
            setDialogErrorContentMessage("");
            setopenError(true);
          }
        } else {
          setDialogErrorTitleMessage("Location Required");
          setDialogErrorContentMessage(
            "Select Location(s) inside plan for " + reason
          );
          setopenError(true);
        }
      } else {
        setDialogErrorTitleMessage("Reason Required");
        setDialogErrorContentMessage("Reason for Gate pass, Select a reason");
        setopenError(true);
      }
    } else {
      setDialogErrorTitleMessage("Driver Details Required");
      setDialogErrorContentMessage(
        "Enter any Driver license or add new Driver"
      );
      setopenError(true);
    }

    //All Validations above
  };

  const getDriverDetails = async (e) => {
    e.preventDefault();

    let driverDetails = await DriverService.getDriverByLicense({
      licenseNo: licenceNumber,
    });

    setDriverId(driverDetails.responseBody.id);
    setDriverName(driverDetails.responseBody.name);
    setDriverMobile(driverDetails.responseBody.mobileNo);
    setLicType(driverDetails.responseBody.licenseType);
    setLicExpiry(
      driverDetails.responseBody.licenseExpiry
        ? moment(new Date(driverDetails.responseBody.licenseExpiry)).format(
            "DD-MM-YYYY"
          )
        : ""
    );
    setDriverLic(driverDetails.responseBody.licenseNo);

    var TodayDate = new Date();
    if (driverDetails.responseBody.licenseExpiry) {
      if (
        new Date(driverDetails.responseBody.licenseExpiry).getTime() <=
        TodayDate.getTime()
      ) {
        // alert("The Date must be Bigger or Equal to today date");
        setLicExpiryError("License Expired");
      } else {
        setLicExpiryError("");
      }
    }
  };

  const getVehicleDetails = async (e) => {
    e.preventDefault();

    //Get Vehicle Details by Hitting Vehicle Id

    let vehicleDetails = await VehicleService.getVehicleDetails(vehicleId);

    if (vehicleDetails.code === 200) {
      //set all vehicle details to Textfields
      var TodayDate = new Date();
      //RC Code

      setVehicleId(vehicleDetails.responseBody.id);
      setRc(vehicleDetails.responseBody.rcNo);
      setRcExpiry(
        vehicleDetails.responseBody.rcExpiry
          ? moment(new Date(vehicleDetails.responseBody.rcExpiry)).format(
              "DD-MM-YYYY"
            )
          : ""
      );

      if (vehicleDetails.responseBody.rcExpiry) {
        if (
          new Date(vehicleDetails.responseBody.rcExpiry).getTime() <=
          TodayDate.getTime()
        ) {
          // alert("The Date must be Bigger or Equal to today date");
          setRcExpiryError("RC Expired");
        } else {
          setRcExpiryError("");
        }
      }

      setFc(vehicleDetails.responseBody.fcNo);
      setFcExpiry(
        vehicleDetails.responseBody.fcExpiry
          ? moment(new Date(vehicleDetails.responseBody.fcExpiry)).format(
              "DD-MM-YYYY"
            )
          : ""
      );
      if (vehicleDetails.responseBody.fcExpiry) {
        if (
          new Date(vehicleDetails.responseBody.fcExpiry).getTime() <=
          TodayDate.getTime()
        ) {
          // alert("The Date must be Bigger or Equal to today date");
          setFcExpiryError("FC Expired");
        } else {
          setFcExpiryError("");
        }
      }

      setInsurance(vehicleDetails.responseBody.insurance);
      setInsExpiry(
        vehicleDetails.responseBody.insuranceExpiry
          ? moment(
              new Date(vehicleDetails.responseBody.insuranceExpiry)
            ).format("DD-MM-YYYY")
          : ""
      );
      if (vehicleDetails.responseBody.insuranceExpiry) {
        if (
          new Date(vehicleDetails.responseBody.insuranceExpiry).getTime() <=
          TodayDate.getTime()
        ) {
          // alert("The Date must be Bigger or Equal to today date");
          setInsExpiryError("Insurance Expired");
        } else {
          setInsExpiryError("");
        }
      }
      //Set Pollution
      setPollution(vehicleDetails.responseBody.pcNo);
      setPcExpiry(
        vehicleDetails.responseBody.pcExpiry
          ? moment(new Date(vehicleDetails.responseBody.pcExpiry)).format(
              "DD-MM-YYYY"
            )
          : ""
      );
      if (vehicleDetails.responseBody.pcExpiry) {
        if (
          new Date(vehicleDetails.responseBody.pcExpiry).getTime() <=
          TodayDate.getTime()
        ) {
          // alert("The Date must be Bigger or Equal to today date");
          setPcExpiryError("Pollution Expired");
        } else {
          setPcExpiryError("");
        }
      }

      setTransporterName(vehicleDetails.responseBody.transporter.name);
    } else {
      console.log("Vehicle Not Found!!!!");
    }
  };

  //const [radioSelectedOption, setRadioSelectedOption] = useState();

  const defaultProps = {
    options: vehicleListAPI,
    getOptionLabel: (option) => option.label,
  };

  const defaultProps1 = {
    options: licenceListAPI,
    getOptionLabel: (option) => option.label,
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const addVehicle = () => {
    navigate("/MainLayout/VehicleMaster");
  };
  const addDriver = () => {
    navigate("/MainLayout/DriverMaster");
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper style={{ height: "auto", padding: "8px" }}>
            <div>
              <h3>Vehicle Details</h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
              }}
            >
              <Autocomplete
                {...defaultProps}
                style={ItemStyle}
                disablePortal
                id="vehicleListDropDown"
                sx={{ width: 200 }}
                onChange={(e, v) => {
                  if (v != null) {
                    setVehicleNumber(v.label);
                    setVehicleId(v.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Vehicle Number" />
                )}
              />

              <Button
                variant="contained"
                onClick={(e) => {
                  getVehicleDetails(e);
                }}
                style={ItemStyle}
              >
                Get
              </Button>
              <p style={{ margin: "8px" }}>or</p>
              <Button
                variant="contained"
                onClick={addVehicle}
                style={(ItemStyle, { backgroundColor: "#FFB940" })}
              >
                Add Vehicles
              </Button>
            </div>
            <h3>Vehicle Information</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
                margin: "4px",
              }}
            >
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Registration Certificate (RC)"
                InputLabelProps={{ shrink: true }}
                value={rc}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="RC Expiry Date"
                InputLabelProps={{ shrink: true }}
                value={rcExpiry}
                helperText={rcExpiryError}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
                margin: "4px",
              }}
            >
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Fitness Certificate (FC)"
                InputLabelProps={{ shrink: true }}
                value={fc}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="FC Expiry Date"
                InputLabelProps={{ shrink: true }}
                value={fcExpiry}
                helperText={fcExpiryError}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
                margin: "4px",
              }}
            >
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Insurance"
                InputLabelProps={{ shrink: true }}
                value={insurance}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Insurance Expiry Date"
                InputLabelProps={{ shrink: true }}
                value={insExpiry}
                helperText={insExpiryError}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
                margin: "4px",
              }}
            >
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Pollution"
                InputLabelProps={{ shrink: true }}
                value={pollution}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Pollution Expiry Date"
                InputLabelProps={{ shrink: true }}
                value={pcExpiry}
                helperText={pcExpiryError}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ height: "auto", padding: "8px" }}>
            <div>
              <h3>Driver Details</h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
                margin: "4px",
              }}
            >
              <Autocomplete
                {...defaultProps1}
                style={ItemStyleDropDown}
                disablePortal
                id="vehicleListDropDown"
                sx={{ width: 300 }}
                onChange={(e, l) => {
                  if (l != null) {
                    setLicenceNumber(l.label);
                    setLicenceId(l.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Licence Number" />
                )}
              />
              <Button
                variant="contained"
                onClick={(e) => {
                  getDriverDetails(e);
                }}
                style={ItemStyle}
              >
                Get
              </Button>{" "}
              <p style={{ margin: "8px" }}>or</p>
              <Button
                variant="contained"
                onClick={addDriver}
                style={(ItemStyle, { backgroundColor: "#FFB940" })}
              >
                Add Driver
              </Button>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "25px",
                width: "auto",
                marginBottom: "8px",
              }}
            >
              {" "}
              <h3>Driver Information</h3>
            </div>
            <div style={{ marginTop: "8px", padding: "8px" }}></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
                margin: "4px",
              }}
            >
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Driver Name"
                InputLabelProps={{ shrink: true }}
                value={driverName}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Driver Mobile"
                InputLabelProps={{ shrink: true }}
                value={driverMobile}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
                margin: "4px",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                padding: "8px",
                margin: "4px",
              }}
            >
              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="DL Expiry"
                InputLabelProps={{ shrink: true }}
                value={licExpiry}
                helperText={licExpiryError}
                FormHelperTextProps={{
                  style: { color: "red" },
                }}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                style={outStyle}
                id="outlined-read-only-input"
                label="Driver Type"
                InputLabelProps={{ shrink: true }}
                value={licType}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper style={{ height: "auto", padding: "8px" }}>
            <div>
              <h3> Reason for Gate-In</h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
              }}
            >
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
                <RadioGroup
                  onChange={(e, val) => {
                    setReason(val);
                  }}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Loading"
                    control={<Radio />}
                    label="Loading"
                  />
                  <FormControlLabel
                    value="UnLoading"
                    control={<Radio />}
                    label="Un-Loading"
                  />
                  <FormControlLabel
                    value="Both"
                    control={<Radio />}
                    label="Both"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <List
                sx={{
                  width: "80%%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <h3>Locations in Plant</h3>
                {storesList.map((value) => {
                  const labelId = `checkbox-list-label-${value.id}`;

                  return (
                    <ListItem key={value.id} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(value)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={value.id} primary={value.name} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div
        style={{
          width: "auto",
          margin: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Button variant="contained" onClick={generateGatePass}>
            Generate GatePass
          </Button>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <Button
            variant="contained"
            component={Link}
            to="/MainLayout/SecurityDashboard"
            style={{ backgroundColor: "#FFB940" }}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div>
        <Dialog
          open={open}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "800px",
              },
            },
          }}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {/* {dialogTitleMessage} */}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" textAlign="center">
              {/* {newGatePass} */}
            </DialogContentText>
            <br />

            <div style={main}>
              <div>
                <table>
                  <tr>
                    <td>
                      <img src={CompanyLogo} style={imageStyle} />
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
                      <td style={signatureRightStyle}>Security Signature</td>
                    </tr>
                    <tr>
                      <td style={signatureRightStyle}> Store In Charge Name</td>
                    </tr>
                  </table>
                </div>
                <div></div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            {buttonEnable ? (
              <>
                <Button className="hide-on-print" onClick={handleClosed}>
                  Print
                </Button>
                <Button
                  className="hide-on-print"
                  onClick={handleClose}
                  autoFocus
                >
                  Close
                </Button>{" "}
              </>
            ) : (
              <></>
            )}
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openError}
          onClose={handleCloseError}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialogErrorTitleMessage}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogErrorContentMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Button onClick={handleCloseError} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>

    // <>

    //   <Grid style={containerStyle}>
    //     <div style={{ margin: "16px" }}>
    //       <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>
    //         Generate Gate In Pass
    //       </h2>
    //     </div>
    //     <Container style={maindiv}>
    //       <Box style={subdiv}>
    //         <div
    //           style={{
    //             width: "auto",
    //             margin: "20px",
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <div style={{ border: "2px solid #696969", borderRadius: "5px" }}>
    //             <Paper stye={paperStyle}>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                 }}
    //               >
    //                 <Autocomplete
    //                   {...defaultProps}
    //                   style={ItemStyle}
    //                   disablePortal
    //                   id="vehicleListDropDown"
    //                   sx={{ width: 200 }}
    //                   onChange={(e, v) => {
    //                     if (v != null) {
    //                       setVehicleNumber(v.label);
    //                       setVehicleId(v.id);
    //                     }
    //                   }}
    //                   renderInput={(params) => (
    //                     <TextField {...params} label="Vehicle Number" />
    //                   )}
    //                 />

    //                 <Button
    //                   variant="contained"
    //                   onClick={(e) => {
    //                     getVehicleDetails(e);
    //                   }}
    //                   style={ItemStyle}
    //                 >
    //                   Get
    //                 </Button>
    //                 <p style={{ margin: "8px" }}>or</p>
    //                 <Button
    //                   variant="contained"
    //                   onClick={addVehicle}
    //                   style={(ItemStyle, { backgroundColor: "#FFB940" })}
    //                 >
    //                   Add Vehicles
    //                 </Button>
    //               </div>

    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "25px",
    //                   width: "auto",
    //                   marginBottom: "8px",
    //                 }}
    //               >
    //                 {" "}
    //                 <h3>Vehicle Details</h3>
    //               </div>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                   margin: "4px",
    //                 }}
    //               >
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Registration Certificate (RC)"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={rc}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="RC Expiry Date"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={rcExpiry}
    //                   helperText={rcExpiryError}
    //                   FormHelperTextProps={{
    //                     style: { color: "red" },
    //                   }}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //               </div>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                   margin: "4px",
    //                 }}
    //               >
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Fitness Certificate (FC)"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={fc}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="FC Expiry Date"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={fcExpiry}
    //                   helperText={fcExpiryError}
    //                   FormHelperTextProps={{
    //                     style: { color: "red" },
    //                   }}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //               </div>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                   margin: "4px",
    //                 }}
    //               >
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Insurance"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={insurance}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />

    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Insurance Expiry Date"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={insExpiry}
    //                   helperText={insExpiryError}
    //                   FormHelperTextProps={{
    //                     style: { color: "red" },
    //                   }}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //               </div>

    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                   margin: "4px",
    //                 }}
    //               >
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Pollution"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={pollution}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />

    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Pollution Expiry Date"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={pcExpiry}
    //                   helperText={pcExpiryError}
    //                   FormHelperTextProps={{
    //                     style: { color: "red" },
    //                   }}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //               </div>
    //             </Paper>
    //           </div>
    //         </div>
    //       </Box>
    //       <Box style={subdiv}>
    //         <div
    //           style={{
    //             width: "auto",
    //             margin: "20px",
    //             display: "flex",
    //             alignItems: "center",
    //             justifyContent: "center",
    //           }}
    //         >
    //           <div style={{ border: "2px solid #696969", borderRadius: "5px" }}>
    //             <Paper stye={paperStyle}>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                   margin: "4px",
    //                 }}
    //               >
    //                 <Autocomplete
    //                   {...defaultProps1}
    //                   style={ItemStyleDropDown}
    //                   disablePortal
    //                   id="vehicleListDropDown"
    //                   sx={{ width: 300 }}
    //                   onChange={(e, l) => {
    //                     if (l != null) {
    //                       setLicenceNumber(l.label);
    //                       setLicenceId(l.id);
    //                     }
    //                   }}
    //                   renderInput={(params) => (
    //                     <TextField {...params} label="Licence Number" />
    //                   )}
    //                 />
    //                 <Button
    //                   variant="contained"
    //                   onClick={(e) => {
    //                     getDriverDetails(e);
    //                   }}
    //                   style={ItemStyle}
    //                 >
    //                   Get
    //                 </Button>{" "}
    //                 <p style={{ margin: "8px" }}>or</p>
    //                 <Button
    //                   variant="contained"
    //                   onClick={addDriver}
    //                   style={(ItemStyle, { backgroundColor: "#FFB940" })}
    //                 >
    //                   Add Driver
    //                 </Button>
    //               </div>

    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "25px",
    //                   width: "auto",
    //                   marginBottom: "8px",
    //                 }}
    //               >
    //                 {" "}
    //                 <h3>Driver Details</h3>
    //               </div>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                   margin: "4px",
    //                 }}
    //               >
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Driver Name"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={driverName}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Driver Mobile"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={driverMobile}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //               </div>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                   margin: "4px",
    //                 }}
    //               ></div>
    //               <div
    //                 style={{
    //                   display: "flex",
    //                   alignItems: "center",
    //                   justifyContent: "center",
    //                   height: "auto",
    //                   width: "auto",
    //                   padding: "8px",
    //                   margin: "4px",
    //                 }}
    //               >
    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="DL Expiry"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={licExpiry}
    //                   helperText={licExpiryError}
    //                   FormHelperTextProps={{
    //                     style: { color: "red" },
    //                   }}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />

    //                 <TextField
    //                   style={outStyle}
    //                   id="outlined-read-only-input"
    //                   label="Driver Type"
    //                   InputLabelProps={{ shrink: true }}
    //                   value={licType}
    //                   InputProps={{
    //                     readOnly: true,
    //                   }}
    //                 />
    //               </div>
    //             </Paper>
    //           </div>
    //         </div>
    //       </Box>
    //     </Container>
    //     <div
    //       style={{
    //         width: "auto",
    //         margin: "10px",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <div style={{ border: "2px solid #696969", borderRadius: "5px" }}>
    //         <Paper stye={paperStyle}>
    //           <div
    //             style={{
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "flex-start",
    //               height: "auto",
    //               width: "auto",
    //               padding: "8px",
    //               margin: "4px",
    //             }}
    //           >
    //             <FormControl>
    //               <FormLabel id="demo-row-radio-buttons-group-label">
    //                 Reason for Gate-In
    //               </FormLabel>
    //               <RadioGroup
    //                 onChange={(e, val) => {
    //                   setReason(val);
    //                 }}
    //                 row
    //                 aria-labelledby="demo-row-radio-buttons-group-label"
    //                 name="row-radio-buttons-group"
    //               >
    //                 <FormControlLabel
    //                   value="Loading"
    //                   control={<Radio />}
    //                   label="Loading"
    //                 />
    //                 <FormControlLabel
    //                   value="UnLoading"
    //                   control={<Radio />}
    //                   label="Un-Loading"
    //                 />
    //                 <FormControlLabel
    //                   value="Both"
    //                   control={<Radio />}
    //                   label="Both"
    //                 />
    //               </RadioGroup>
    //             </FormControl>
    //           </div>
    //           <div>
    //             <List
    //               sx={{
    //                 width: "100%",
    //                 maxWidth: 360,
    //                 bgcolor: "background.paper",
    //               }}
    //             >
    //               Locations in Plant
    //               {storesList.map((value) => {
    //                 const labelId = `checkbox-list-label-${value.id}`;

    //                 return (
    //                   <ListItem key={value.id} disablePadding>
    //                     <ListItemButton
    //                       role={undefined}
    //                       onClick={handleToggle(value)}
    //                       dense
    //                     >
    //                       <ListItemIcon>
    //                         <Checkbox
    //                           edge="start"
    //                           checked={checked.indexOf(value) !== -1}
    //                           tabIndex={-1}
    //                           disableRipple
    //                           inputProps={{ "aria-labelledby": labelId }}
    //                         />
    //                       </ListItemIcon>
    //                       <ListItemText id={value.id} primary={value.name} />
    //                     </ListItemButton>
    //                   </ListItem>
    //                 );
    //               })}
    //             </List>
    //           </div>
    //         </Paper>
    //       </div>
    //     </div>

    //     <div
    //       style={{
    //         width: "auto",
    //         margin: "20px",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <div>
    //         <Button variant="contained" onClick={generateGatePass}>
    //           Generate GatePass
    //         </Button>
    //       </div>
    //       <div style={{ marginLeft: "10px" }}>
    //         <Button
    //           variant="contained"
    //           component={Link}
    //           to="/MainLayout/Dashboard"
    //           style={{ backgroundColor: "#FFB940" }}
    //         >
    //           Back to Dashboard
    //         </Button>
    //       </div>
    //     </div>
    //     <div>
    //       <Dialog
    //         open={open}
    //         sx={{
    //           "& .MuiDialog-container": {
    //             "& .MuiPaper-root": {
    //               width: "100%",
    //               maxWidth: "800px", // Set your width here
    //             },
    //           },
    //         }}
    //         onClose={handleClose}
    //         aria-labelledby="alert-dialog-title"
    //         aria-describedby="alert-dialog-description"
    //       >
    //         <DialogTitle id="alert-dialog-title">
    //           {/* {dialogTitleMessage} */}
    //         </DialogTitle>
    //         <DialogContent>
    //           <DialogContentText
    //             id="alert-dialog-description"
    //             textAlign="center"
    //           >
    //             {/* {newGatePass} */}
    //           </DialogContentText>
    //           <br />

    //           <div style={main}>
    //             <div>
    //               <table>
    //                 <tr>
    //                   <td>
    //                     <img src={CompanyLogo} style={imageStyle} />
    //                   </td>
    //                   <td>
    //                     <h5 style={companyname}>
    //                       RANE(MADRAS) LTD. <br />
    //                       {plantName}
    //                     </h5>
    //                   </td>
    //                   <td>
    //                     <h4 style={titleDiv}>
    //                       <u>Vehicle In Pass</u>
    //                     </h4>
    //                   </td>
    //                 </tr>
    //               </table>
    //             </div>
    //             <div>
    //               <div>
    //                 <table style={tableBottonCss}>
    //                   <tr>
    //                     <td>Vehicle Pass No:</td>
    //                     <td> {newGatePass}</td>
    //                   </tr>
    //                   <tr>
    //                     <td>Transport Name:</td>
    //                     <td>{transporterName}</td>
    //                     <td rowSpan="6" style={tdStyle}>
    //                       {" "}
    //                       <Canvas
    //                         text={newGatePass}
    //                         options={{
    //                           level: "M",
    //                           margin: 3,
    //                           scale: 4,
    //                           width: 175,
    //                         }}
    //                       />
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td>Vehicle No:</td>
    //                     <td>{vehicleNumber}</td>
    //                   </tr>
    //                   <tr>
    //                     <td>Insurance No:</td>
    //                     <td>
    //                       {insurance} / Valid Date: {insExpiry}
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td>Pollution Certification No:</td>
    //                     <td>
    //                       {pollution}/ Valid Date: {pcExpiry}
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td>Driver Name:</td>
    //                     <td>
    //                       {driverName} / DL No : {driverLic}
    //                     </td>
    //                   </tr>
    //                   <tr>
    //                     <td>Vehicle In(Date & Time):</td>
    //                     <td>{entryTime}</td>
    //                   </tr>
    //                   <tr>
    //                     <td>Loding/Unloading Location:</td>
    //                     <td>{storeName}</td>
    //                   </tr>
    //                   <br></br>
    //                   <br></br>

    //                   <tr style={signatureStyle}>
    //                     <td style={signatureRightStyle}>
    //                       Stores in Charge Signature
    //                     </td>
    //                     <td></td>
    //                     <td style={signatureRightStyle}>Security Signature</td>
    //                   </tr>
    //                   <tr>
    //                     <td style={signatureRightStyle}>
    //                       {" "}
    //                       Store In Charge Name
    //                     </td>
    //                   </tr>
    //                 </table>
    //               </div>
    //               <div></div>
    //             </div>
    //           </div>
    //         </DialogContent>
    //         <DialogActions>
    //           {buttonEnable ? (
    //             <>
    //               <Button className="hide-on-print" onClick={handleClosed}>
    //                 Print
    //               </Button>
    //               <Button
    //                 className="hide-on-print"
    //                 onClick={handleClose}
    //                 autoFocus
    //               >
    //                 Close
    //               </Button>{" "}
    //             </>
    //           ) : (
    //             <></>
    //           )}
    //         </DialogActions>
    //       </Dialog>
    //     </div>
    //     <div>
    //       <Dialog
    //         open={openError}
    //         onClose={handleCloseError}
    //         aria-labelledby="alert-dialog-title"
    //         aria-describedby="alert-dialog-description"
    //       >
    //         <DialogTitle id="alert-dialog-title">
    //           {dialogErrorTitleMessage}
    //         </DialogTitle>
    //         <DialogContent>
    //           <DialogContentText id="alert-dialog-description">
    //             {dialogErrorContentMessage}
    //           </DialogContentText>
    //         </DialogContent>
    //         <DialogActions>
    //           {/* <Button onClick={handleClose}>Disagree</Button> */}
    //           <Button onClick={handleCloseError} autoFocus>
    //             Close
    //           </Button>
    //         </DialogActions>
    //       </Dialog>
    //     </div>
    //   </Grid>
    // </>
  );
}

export default GateIn;
