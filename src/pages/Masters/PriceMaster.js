import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AuthServices from "../../services/AuthServices";
import transporterService from "../../services/TransporterService.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteIcon,
  GridToolbar,
} from "@mui/x-data-grid";

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import { Autocomplete, InputAdornment } from "@mui/material";
import vehicleServiceObj from "../../services/VehicleService.js";
import AdminServicesObj from "../../services/AdminServices.js";

const formLabelsTheme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
  },
});

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  backgroundColor: "#F0FFFF",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const ItemStyleAutoComplite = {
  padding: "4px",
  margin: "4px",
  minWidth: "20%",
};

const ItemStyleAutoCompliteTrip = {
  padding: "4px",
  margin: "4px",
  minWidth: "14%",
};

function PriceMaster() {
  const columns = [
    {
      field: "seq",
      headerName: "ID",
      minWidth: 100,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "transporter",
      headerName: "Transporter",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "costPerTrip",
      headerName: "Cost Per Trip",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "costPerKm",
      headerName: "Cost Per KM",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "default",
      headerName: "Default Trip Type",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<GridDeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => handleDeleteClick(params)}
        />,
      ],
    },
  ];
  const handleDeleteClick = async (params) => {
    const rowValues = params.row; // Retrieve the row values
    let deleteResponce = await AdminServicesObj.deletePrice(rowValues.id);

    if (deleteResponce.code === 200) {
      setDialogTitle("Link Deleted");
      setSuccessMessage("Success");
      setOpen(true);
      getPriceList();
    } else {
      setDialogTitle("Link deletion Failed");
      setSuccessMessage("Something went wrong, check network");
      setOpen(true);
    }
  };

  const [rows, setRows] = useState([]);
  const [transporterList, setTransporterList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [typeList, setTypeList] = useState([{ name: "TRIP" }, { name: "KM" }]);
  const [tripType, setTripType] = useState("");
  const [transporterId, setTransporterID] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [tripCost, setTripCost] = useState(0);
  const [kmCost, setKmCost] = useState(0);

  const [successMessage, setSuccessMessage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTrasnporter();
    getPriceList();
  }, []);
  async function getTrasnporter() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    let transporterList = await transporterService.getAllTransporterByPlantId(
      plantId
    );

    if (transporterList.code === 200) {
      let transporterArray = transporterList.responseBody;
      setTransporterList([]);
      transporterArray.map((transporter, index) => {
        setTransporterList((prevState) => [
          ...prevState,
          {
            id: transporter.id,
            name: transporter.name + " (" + transporter.code + ")",
          },
        ]);
      });
    } else {
      setDialogTitle("Getting Transporter list Error");
      setSuccessMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }

  async function getVehicalById(id) {
    let vehicleListAPI = await vehicleServiceObj.getVehicleDetailsByTransporter(
      id
    );

    if (vehicleListAPI.code === 200) {
      let vehicleArray = vehicleListAPI.responseBody;
      setVehicleList([]);
      vehicleArray.map((vehicle, index) => {
        setVehicleList((prevState) => [
          ...prevState,
          {
            id: vehicle.id,
            name: vehicle.registrationNo,
          },
        ]);
      });
    } else {
      setDialogTitle("Getting Vehicle list Error");
      setSuccessMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }

  async function getPriceList() {
    let priceList = await AdminServicesObj.getPriceList();

    if (priceList.code === 200) {
      setRows([]); //Clear existing list in array
      priceList.responseBody.map((data, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: data.id,
            seq: index++,
            vehicle: data.vehicle.registrationNo,
            transporter: data.transporter.name,
            costPerTrip: data.ratePerTrip,
            costPerKm: data.ratePerKm,
            default: data.rateType,
          },
        ])
      );
    } else {
      console.log("Something went wrong in User Plant List getting");
    }
  }

  const handelTripChange = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (newValue.length <= 6) {
      setTripCost(newValue);
    }
  };
  const handelKMChange = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (newValue.length <= 6) {
      setKmCost(newValue);
    }
  };

  const transporterDropdown = {
    options: transporterList,
    getOptionLabel: (option) => option.name,
  };
  const vehicleDropdown = {
    options: vehicleList,
    getOptionLabel: (option) => option.name,
  };
  const typeDropdown = {
    options: typeList,
    getOptionLabel: (option) => option.name,
  };

  const addPrice = async (e) => {
    const plant = AuthServices.getSelectedPlant();
    const plantId = plant.plantId;

    if (transporterId.length === 0) {
      setDialogTitle("Transporter is empty");
      setSuccessMessage("Select a transporter");
      setOpen(true);
      return;
    }
    if (vehicleId.length === 0) {
      setDialogTitle("vehicle is empty");
      setSuccessMessage("Select a vehicle");
      setOpen(true);
      return;
    }
    if (tripCost === 0) {
      setDialogTitle("Trip Cost is empty");
      setSuccessMessage("Please enter trip cost");
      setOpen(true);
      return;
    }
    if (kmCost === 0) {
      setDialogTitle("KM Cost is empty");
      setSuccessMessage("Please enter km cost");
      setOpen(true);
      return;
    }
    if (tripType.length === 0) {
      setDialogTitle("Trip Type is empty");
      setSuccessMessage("select a trip type");
      setOpen(true);
      return;
    }
    const dataJson = {
      company: {
        id: plantId,
      },
      transporter: {
        id: transporterId,
      },
      vehicle: {
        id: vehicleId,
      },
      ratePerTrip: tripCost,
      ratePerKm: kmCost,
      rateType: tripType,
    };
    //console.log("data" + JSON.stringify(dataJson));
    let addResponce = await transporterService.addPriceMaster(dataJson);
    console.log("responce" + JSON.stringify(addResponce));
    if (addResponce.code === 200) {
      setDialogTitle("Success");
      setSuccessMessage("Price Data Added ");
      setOpen(true);
      getPriceList();
    } else {
      if (addResponce.code === 209) {
        setDialogTitle("Error!!");
        setSuccessMessage(addResponce.responseBody);
        setOpen(true);
      } else {
        setDialogTitle("Network Error!!");
        setSuccessMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Price Master</h2>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            elevation={5}
            sx={{
              border: "2px solid #696969",
              borderRadius: "5px",
              padding: "8px",
            }}
          >
            <ThemeProvider theme={formLabelsTheme}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Autocomplete
                  {...transporterDropdown}
                  style={ItemStyleAutoComplite}
                  disablePortal
                  id="transporterList"
                  sx={{ width: "400px" }}
                  onChange={(e, v) => {
                    if (v != null) {
                      setTransporterID(v.id);
                      getVehicalById(v.id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          Select Transporter{" "}
                          <span style={{ color: "red" }}> *</span>
                        </span>
                      }
                    />
                  )}
                />
                <Autocomplete
                  {...vehicleDropdown}
                  style={ItemStyleAutoComplite}
                  disablePortal
                  id="transporterList"
                  sx={{ width: "400px" }}
                  onChange={(e, v) => {
                    if (v != null) {
                      setVehicleId(v.id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          Select Vehicle{" "}
                          <span style={{ color: "red" }}> *</span>
                        </span>
                      }
                    />
                  )}
                />
                <TextField
                  required
                  id="costpertrip"
                  label="Cost Per Trip"
                  variant="outlined"
                  sx={{ minWidth: 150, marginLeft: 2 }}
                  value={tripCost}
                  onChange={handelTripChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">₹</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  id="costperkm"
                  label="Cost Per KM"
                  variant="outlined"
                  sx={{ minWidth: 150, marginLeft: 2 }}
                  value={kmCost}
                  onChange={handelKMChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">₹</InputAdornment>
                    ),
                  }}
                />
                <Autocomplete
                  {...typeDropdown}
                  style={ItemStyleAutoCompliteTrip}
                  disablePortal
                  id="tripType"
                  sx={{ width: "150px" }}
                  onChange={(e, v) => {
                    if (v != null) {
                      setTripType(v.name);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          Default Trip Type{" "}
                          <span style={{ color: "red" }}> *</span>
                        </span>
                      }
                    />
                  )}
                />
                <Button
                  variant="contained"
                  onClick={(e) => {
                    addPrice(e);
                  }}
                  style={{
                    marginLeft: "20px",
                    minWidth: "8%",
                    height: "48px",
                    marginBottom: "6px",
                    color: "white",
                  }}
                >
                  Add
                </Button>
              </Grid>
            </ThemeProvider>
          </Paper>
        </Grid>
        <h2>User Vendor List</h2>
        <div
          style={{
            height: 400,
            width: "100%",
            overflow: "scroll",
            border: "2px solid #696969",
            borderRadius: "7px",
          }}
        >
          <DataGrid
            //rows={tableData}
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 25]}
            scrollbarSize={10}
            components={{
              Toolbar: GridToolbar,
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "super-app-theme--odd"
                : "super-app-theme--even"
            }
            sx={{
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
      </Grid>
    </div>
  );
}

export default PriceMaster;
