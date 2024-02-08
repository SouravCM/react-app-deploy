import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import moment from "moment";
import GateInOutService from "../../services/GateInOutService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import VehicleService from "../../services/VehicleService";
import Autocomplete from "@mui/material/Autocomplete";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import InputAdornment from "@mui/material/InputAdornment";
import { Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";

const textStyle = {
  padding: "4px",
  margin: "8px",
};
const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};
const paperStyle = {
  width: "auto",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "25px",
  height: "auto",

  margin: "25px",
};
const outStyle = {
  padding: "4x",
  width: "100%",
  marginRight: "16px",
};

function GateOut() {
  const [open, setOpen] = React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const [successMessage, setSuccessMessage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState();
  const [gatePass, setGatePass] = useState();
  const [gatePassId, setGatePassId] = useState();
  const [vehicleNo, setVehicleNo] = useState();
  //const [inVehicleNo, setInVehicleNo] = useState();

  const [driverName, setDriverName] = useState();
  const [gateEntry, setGateEntry] = useState();
  const [detention, setDetention] = useState();
  const [remarks, setRemarks] = useState("");

  //const [vehicleNumber, setVehicleNumber] = useState();
  const [vehicleId, setVehicleId] = useState();
  const [vehicleListAPI, setVehicleListAPI] = useState([{}]);

  const [openComplete, setOpenComplete] = React.useState(false);
  const handleCloseComplete = () => {
    setOpen(false);
    window.location.reload();
  };
  const [dialogTitleMessageComplete, setDialogTitleMessageComplete] =
    useState();
  const [dialogContentMessageComplete, setDialogContentMessageComplete] =
    useState();

  const defaultProps = {
    options: vehicleListAPI,
    getOptionLabel: (option) => option.label,
  };
  useEffect(() => {
    // closeNav();

    async function fetchData() {
      // You can await here
      let plant = AuthServices.getSelectedPlant();
      let plantId = plant.plantId;
      let vehicleList = await VehicleService.getAllGateInVehiclesList(plantId);

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
  }, []);

  const getOutClick = async (e) => {
    if (remarks.length === 0) {
      setDialogTitleMessageComplete("Vehicle Inspection Done By is empty");
      setDialogContentMessageComplete("");
      setOpenComplete(true);
      return;
    }

    let gateExitDetails = await GateInOutService.getOut(gatePassId, remarks);
    if (gateExitDetails.code === 209) {
      setDialogTitle("Gate Out Pass Not Generated");
      setSuccessMessage(gateExitDetails.responseBody);
      setOpen(true);
    } else if (gateExitDetails.code === 200) {
      setDialogTitleMessageComplete("Gate Exit  Successfully");
      setDialogContentMessageComplete(vehicleNo + " Exit Successfully updated");
      setOpenComplete(true);
    } else {
      console.log("Something went wrong");
    }
  };

  const gatePassGenerationByVehicle = async (e) => {
    let gateEntryDetails = await GateInOutService.getGatePassByVehicleID(
      vehicleId
    );

    if (gateEntryDetails.code === 200) {
      setGatePassId(gateEntryDetails.responseBody.gatepass.id);
      setDriverName(gateEntryDetails.responseBody.driver.name);
      setVehicleNo(gateEntryDetails.responseBody.vehicle.registrationNo);
      setGateEntry(
        moment(
          new Date(gateEntryDetails.responseBody.gatepass.entryTime)
        ).format("DD-MM-YYYY HH:mm:ss")
      );
      if (gateEntryDetails.responseBody.gatepass.remarks) {
        setRemarks(gateEntryDetails.responseBody.gatepass.remarks);
      }

      const d = moment(gateEntryDetails.responseBody.gatepass.entryTime);
      var diff = moment().diff(d);
      var duration = moment.duration(diff);
      var hours = duration.hours();
      var minutes = duration.minutes();
      var seconds = duration.seconds();

      setDetention(hours + ":" + minutes + ":" + seconds);
    } else {
      console.log("Some thing went wrong");
    }
  };

  const getPassGeneration = async (e) => {
    let gateEntryDetails = await GateInOutService.getGatePass(gatePass);
    console.log(gateEntryDetails);
    if (gateEntryDetails.code === 200) {
      setGatePassId(gateEntryDetails.responseBody.gatepass.id);
      setDriverName(gateEntryDetails.responseBody.driver.name);
      setVehicleNo(gateEntryDetails.responseBody.vehicle.registrationNo);
      setGateEntry(
        moment(
          new Date(gateEntryDetails.responseBody.gatepass.entryTime)
        ).format("DD-MM-YYYY HH:mm:ss")
      );
      if (gateEntryDetails.responseBody.gatepass.remarks) {
        setRemarks(gateEntryDetails.responseBody.gatepass.remarks);
      }

      const d = moment(gateEntryDetails.responseBody.gatepass.entryTime);
      var diff = moment().diff(d);
      var duration = moment.duration(diff);
      var hours = duration.hours();
      var minutes = duration.minutes();
      var seconds = duration.seconds();

      setDetention(hours + ":" + minutes + ":" + seconds);
    } else {
      console.log("Some thing went wrong");
      setDialogTitle("Network Error");
      setSuccessMessage("Something went wrong check your network");
      setOpen(true);
    }
  };

  const getDetails = async (e) => {
    if (gatePass) {
      //Call Generate GateExit based on GatePass
      getPassGeneration();
    } else {
      if (vehicleId) {
        gatePassGenerationByVehicle();
      } else {
        setDialogTitle("Required Scan or Input");
        setSuccessMessage("Scan GatePass or Enter a Vehicle Number");
        setOpen(true);
      }
    }
  };

  return (
    <>
      <div>
        <div style={{ margin: "16px" }}>
          <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>
            Generate Gate Out for Vehicle
          </h2>
        </div>
        <Grid container style={containerStyle}>
          <Grid item xs={12} style={ItemStyle}>
            <div
              style={{
                width: "auto",
                margin: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ border: "2px solid #696969", borderRadius: "5px" }}>
                <Paper
                  stye={
                    (paperStyle,
                    { border: "2px solid #15317E", borderRadius: "5px" })
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      label="Scan Gate Pass"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <QrCodeScannerIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                      style={textStyle}
                      onChange={(e) => {
                        setGatePass(e.target.value);
                      }}
                    ></TextField>
                    or
                    <Autocomplete
                      {...defaultProps}
                      style={ItemStyle}
                      disablePortal
                      id="vehicleListDropDown"
                      sx={{ width: 200 }}
                      onChange={(e, v) => {
                        if (v != null) {
                          //setVehicleNumber(v.label);
                          setVehicleId(v.id);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Vehicle Number" />
                      )}
                    />
                    {/* <TextField label="Vehicle Number" style={textStyle}
          onChange={(e)=>{
            setInVehicleNo(e.target.value);
          }} 
        ></TextField>*/}
                    <Button
                      style={{ marginRight: "15px" }}
                      variant="contained"
                      onClick={getDetails}
                    >
                      Get
                    </Button>
                  </div>
                </Paper>
              </div>
            </div>
            <div
              style={{
                width: "auto",
                margin: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ border: "2px solid #696969", borderRadius: "5px" }}>
                <Paper stye={paperStyle}>
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
                    {" "}
                    <h3 style={{ color: "#1C3F75", marginLeft: "10px" }}>
                      Gate-In Details
                    </h3>
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
                      label="Vehicle No"
                      InputLabelProps={{ shrink: true }}
                      value={vehicleNo}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
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
                      label="Gate Entry Time"
                      InputLabelProps={{ shrink: true }}
                      value={gateEntry}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      style={outStyle}
                      id="outlined-read-only-input"
                      label="Detention Duration(HH:MM:SS)"
                      InputLabelProps={{ shrink: true }}
                      value={detention}
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
                      required
                      style={outStyle}
                      id="outlined-read-only-input"
                      label="Vehicle Inspection Done By "
                      InputLabelProps={{ shrink: true }}
                      value={remarks}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                      }}
                      multiline
                      maxRows={5}
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
                    <div>
                      <Button variant="contained" onClick={getOutClick}>
                        Gate out Vehicle
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
                </Paper>
              </div>
            </div>
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
                    {successMessage}
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
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default GateOut;
