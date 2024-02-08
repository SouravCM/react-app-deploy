import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SupplierInfo from "../../components/SupplierInfo";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AuthServices from "../../services/AuthServices";
import TripServices from "../../services/TripServices";
import moment from "moment";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import {
  DataGrid,
  GridCsvExportMenuItem,
  GridToolbarContainer,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import vehicleServiceObj from "../../services/VehicleService";
import { Autocomplete } from "@mui/material";
import transporterService from "../../services/TransporterService";
import PacmanLoader from "react-spinners/PacmanLoader";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        density: "compact",
      },
    },
  },
});
const containerStyle = {
  padding: "8px",
  height: "100%",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust background color and opacity for the overlay
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999, // Ensure the overlay is on top
};

const formControlStyle = { m: 1, minWidth: 410 };

function VehicleHistoryTrack() {
  const [fromDate, setFromDate] = useState(dayjs(new Date()));
  const [toDate, setToDate] = useState(dayjs(new Date()));
  const [vehicleNo, setVehicleNo] = useState("");

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [vehicleHistoryList, setVehicleHistoryList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);

  const handleFromDateTimeChange = (value) => {
    setFromDate(value);
    if (toDate && value >= toDate) {
      setToDate(null);
    }
  };

  const handleToDateTimeChange = (value) => {
    if (value >= fromDate) {
      setToDate(value);
    }
  };

  useEffect(() => {
    getVehicleList();
  }, []);

  async function getVehicleList() {
    let transporter = AuthServices.getTransporter();
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    let vehicleResponce;
    //  await transporterService.getAllTransporterByPlantId(
    //     plantId
    //   );
    if (Array.isArray(transporter) && transporter.length === 0) {
      console.log("Transporter array is empty. Setting something...");
      vehicleResponce = await vehicleServiceObj.getAllVehiclesListByPlantCode(
        plantId
      );
    } else {
      let transporterID = transporter[0].transporter.id;
      vehicleResponce = await vehicleServiceObj.getVehicleDetailsByTransporter(
        transporterID
      );
      console.log("Transporter array is not empty.");
    }

    if (vehicleResponce.code === 200) {
      let vehicleArray = vehicleResponce.responseBody;
      setVehicleList([]);

      let updatedVehicleList = [
        ...vehicleArray.map((vehicle) => ({
          id: vehicle.id,
          name: vehicle.registrationNo,
        })),
      ];

      // Update the state with the new array
      setVehicleList(updatedVehicleList);
    } else {
      setDialogTitleMessage("Getting Transporter list Error");
      setDialogContentMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }

  const vehilceDropDown = {
    options: vehicleList,
    getOptionLabel: (option) => option.name,
  };

  const csvOptions = { fileName: "Vehicle History" };

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

  const getVehicleHistoryDetails = async (e) => {
    setLoading(true);
    if (vehicleNo.length === 0) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select a Vehicle");
      setOpen(true);
      setLoading(false);
      return;
    }
    const formattedEndDate = toDate.format("YYYY-MM-DD HH:mm:ss");
    const formattedStartDate = fromDate.format("YYYY-MM-DD HH:mm:ss");
    let data = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      vehicleNo: [vehicleNo],
    };

    let vehicleHistoryData = await transporterService.vehicleHistory(data);

    setVehicleHistoryList([]);
    if (vehicleHistoryData.code === 200) {
      vehicleHistoryData.responseBody.map((vehicleHistory, index) =>
        setVehicleHistoryList((prevState) => [
          ...prevState,
          {
            id: index + 1,
            sno: index + 1,
            date: moment(new Date(vehicleHistory.date)).format(
              "DD-MM-YYYY HH:mm:ss"
            ),
            status: vehicleHistory.status,
            ignition: vehicleHistory.ignition,
            speed: vehicleHistory.speed,
            odometer: vehicleHistory.odometer,
            distance: vehicleHistory.distance,
            lat: vehicleHistory.latitude,
            long: vehicleHistory.longitude,
            location: vehicleHistory.location,
          },
        ])
      );
      setLoading(false);
    } else if (vehicleHistoryData.code === 208) {
      setDialogTitleMessage("No Data");
      setDialogContentMessage("");
      setOpen(true);
      setLoading(false);
    } else {
      setDialogTitleMessage("Error");
      setDialogContentMessage("");
      setOpen(true);
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "sno",
      headerName: "Sl No",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 0.5,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "date",
      headerName: "Date",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "ignition",
      headerName: "Ignition",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "speed",
      headerName: "Speed",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "odometer",
      headerName: "Odometer",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "distance",
      headerName: "Distance",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lat",
      headerName: "Latitude",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "long",
      headerName: "Longitude",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "location",
      headerName: "Location",
      align: "center",
      headerAlign: "center",
      width: "auto",
      flex: 2.5,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <div>
      {loading && (
        <div style={overlayStyle}>
          <PacmanLoader color={"#525f7f"} loading={loading} size={30} />
        </div>
      )}
      <Grid container style={containerStyle}>
        <h3 style={{ marginLeft: "8px" }}>Vehicle History Tracking</h3>
        <Grid item xs={12} style={ItemStyle}>
          <div>
            <Paper elevation={2}>
              <div style={{ padding: "8px", display: "flex" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div style={{ margin: "8px" }}>
                    {" "}
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            style: { color: "blue" }, // Change the label color here
                          }}
                        />
                      )}
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "blue", // Change the outline color here
                          },
                      }}
                      format={"DD-MM-YYYY HH:mm:ss"}
                      label="Select From Date"
                      value={fromDate}
                      onChange={handleFromDateTimeChange}
                    />
                  </div>

                  <div style={{ margin: "8px" }}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField {...props} variant="outlined" fullWidth />
                      )}
                      sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "blue", // Change the outline color here
                          },
                      }}
                      format={"DD-MM-YYYY HH:mm:ss"}
                      label="Select To Date"
                      value={toDate}
                      onChange={handleToDateTimeChange}
                      disabled={!fromDate} // Disable the "To" date picker if "From" date is not selected
                    />
                  </div>
                </LocalizationProvider>
                <Autocomplete
                  {...vehilceDropDown}
                  disablePortal
                  id="level1status"
                  sx={{ width: "20%", marginLeft: "10px", marginTop: "8px" }}
                  onChange={(e, r) => {
                    if (r != null) {
                      setVehicleNo(r.name);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<span>Select Vehicle</span>}
                    />
                  )}
                />{" "}
                <Button
                  variant="contained"
                  style={{
                    borderRadius: "5px",
                    padding: "16px",
                    margin: "8px",
                    width: "auto",
                    height: "auto",
                  }}
                  onClick={(e) => {
                    getVehicleHistoryDetails(e);
                  }}
                >
                  Search
                </Button>
              </div>
            </Paper>
          </div>
          <Grid item xs={12} style={ItemStyle}>
            <Paper
              sx={{
                width: "100%",
                overflow: "hidden",
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
                  title="History"
                >
                  History
                </h3>
              </div>
              <ThemeProvider theme={theme}>
                <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
                  <DataGrid
                    rows={vehicleHistoryList}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    scrollbarSize={10}
                    slots={{ toolbar: CustomToolbar }}
                    sx={{
                      "& .MuiDataGrid-cell:hover": {
                        color: "#1C3F75",
                      },
                      "& .super-app-theme--header": {
                        backgroundColor: "#A9A9A9",
                        fontWeight: "bold",
                      },
                      "& .super-app-theme--green": {
                        backgroundColor: "#ffffff",
                      },
                      "& .super-app-theme--odd": {
                        backgroundColor: "#ffffff",
                      },
                      "& .super-app-theme--light-red": {
                        backgroundColor: "#ffccbc",
                      },
                    }}
                  />
                </div>
              </ThemeProvider>
            </Paper>
          </Grid>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {dialogTitleMessage}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {dialogContentMessage}
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
        </Grid>
      </Grid>
    </div>
  );
}

export default VehicleHistoryTrack;
