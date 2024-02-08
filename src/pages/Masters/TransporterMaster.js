import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import AuthServices from "../../services/AuthServices";
import TransporterService from "../../services/TransporterService";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import GoogleMapReact from "google-map-react";
import { FormControlLabel, Typography } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid-pro";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

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

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const theme = createTheme({
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#db3131",
    },
  },
});

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
};

const textStyle = {
  flex: 1,
  maxWidth: "190px",
  margin: "8px",
};

const IndianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
];

function TransporterMaster() {
  const columns = [
    {
      field: "sno",
      headerName: "SL No",
      align: "center",
      headerAlign: "center",
      minWidth: 30,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "code",
      headerName: "Transporter Code",
      align: "center",
      headerAlign: "center",
      minWidth: 130,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
    },
    {
      field: "name",
      headerName: "Transporter Name",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "contactNo",
      headerName: "Contact Person Number",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
    },
    {
      field: "contactName",
      headerName: "Contact Person Name",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "gstin",
      headerName: "GSTIN",
      align: "center",
      headerAlign: "center",
      minWidth: 130,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },

    {
      field: "state",
      headerName: "State",
      align: "center",
      headerAlign: "center",
      minWidth: 130,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      type: "singleSelect",
      valueOptions: IndianStates,
      editable: true,
    },
    {
      field: "latitude",
      headerName: "latitude",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      //editable: true,
    },
    {
      field: "longitude",
      headerName: "longitude",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      // editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      minWidth: 60,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      getActions: (params) => {
        const id = params.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        const isEdited = editedRows[id];

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<DoneIcon />}
              label="Done"
              onClick={() => handleDoneClick(params)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={() => handleCancelClick(params)}
            />,
          ];
        } else if (isEdited) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={() => handleSaveClick(params)}
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(params)}
          />,
        ];
      },
    },
  ];

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [editedRows, setEditedRows] = useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = async (params) => {
    const id = params.id;
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setEditedRows((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleSaveClick = async (params) => {
    const id = params.id;
    const plant = AuthServices.getSelectedPlant();
    const plantId = plant.plantId;
    const transporterJson = {
      id: params.row.id,
      code: params.row.code,
      contactName: params.row.contactName,
      description: "New Transporter",
      name: params.row.name,
      contactNo: params.row.contactNo,
      gstin: params.row.gstin,
      state: params.row.state,
      latitude: params.row.latitude,
      longitude: params.row.longitude,
      context: "Transporter",
      status: params.row.status,
      parent: { id: plantId },
    };

    let transporterResponse = await TransporterService.updaateTransporter(
      transporterJson
    );

    if (transporterResponse.code === 200) {
      setDialogTitleMessage("Transporter Updated Successfully");
      setDialogContentMessage(
        "Transporter: " +
          params.row.code +
          "  " +
          params.row.name +
          "  updated Successfully"
      );
      setFormClose(2);
      setOpen(true);
    } else {
      if (transporterResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(transporterResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };

  const handleDoneClick = async (params) => {
    const id = params.id;
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setEditedRows((prevState) => ({
      ...prevState,
      [id]: { originalRow: { ...params.row } },
    }));
  };

  // const handleDeleteClick = async (params) => {
  //   const id = params.id;
  //   setRows(rows.filter((row) => row.id !== id));
  // };

  const handleCancelClick = async (params) => {
    const id = params.id;
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  //const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [open, setOpen] = React.useState(false);

  const [code, setcode] = useState("");
  const [contantName, setContantName] = useState("");
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [gstin, setGstin] = useState("");
  const [state, setState] = useState("");
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [address, setAddress] = useState("");

  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);

  const [showDropdown, setShowDropdown] = useState(false);

  const [defaultLatitude, setDefalutLatitude] = useState(12.97);
  const [defalutLongitude, setDefaultLongitude] = useState(77.59);

  const handelContactPersonChange = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (newValue.length <= 10) {
      setContactNo(newValue);
    }
  };
  const handelTransporterCodeChange = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (newValue.length <= 10) {
      setcode(newValue);
    }
  };
  const handleTransporterNameChange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9\s]/g, ""); // Limit the length to 10 characters
    setName(newValue);
  };
  const handleGSTNOChnage = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    setGstin(newValue);
  };

  const handleContactPersonName = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9\s]/g, ""); // Limit the length to 10 characters
    setContantName(newValue);
  };

  const handelSuggectChange = (newValue) => {
    setAddress(newValue);
    setShowDropdown(true); // Close the dropdown when the input value changes
  };

  const [addressTest, setAddressTest] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    const ll = await getLatLng(results[0]);

    const { lat, lng } = ll;
    setLatitude(lat);
    setLongitude(lng);
    setAddress(value);
    setAddressTest(value);
    setCoordinates(ll);
    setShowDropdown(false);
    renderMarkers(lat, lng);
  };

  useEffect(() => {
    // Make the initial API call here after the Google Map API is loaded
    if (map && maps) {
      renderMarkers(defaultLatitude, defalutLongitude);
    }
  }, [map, maps]);

  const onGoogleApiLoaded = ({ map, maps }) => {
    setMap(map);
    setMaps(maps);
  };

  useEffect(() => {
    async function getTransproterList() {
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let transporterList = await TransporterService.getAllTransporterByPlantId(
        plantId
      );
      console.log(transporterList);
      if (transporterList.code === 200) {
        setRows([]);
        transporterList.responseBody.map((transporter, index) =>
          setRows((prevState) => [
            ...prevState,
            {
              id: transporter.id,
              sno: index + 1,
              code: transporter.code,
              name: transporter.name,
              contactNo: transporter.contactNo,
              contactName: transporter.contactName,
              gstin: transporter.gstin,
              state: transporter.state,
              latitude: transporter.latitude,
              longitude: transporter.longitude,
              status: transporter.status,
            },
          ])
        );
      } else {
        setDialogTitleMessage("Getting Transporter list Error");
        setDialogContentMessage("Something went wrong, check your network!!");
        setOpen(true);
      }
    }
    getTransproterList();
  }, []);

  const [formClose, setFormClose] = useState(1);
  const handleClose = () => {
    setOpen(false);
    if (formClose !== 1) {
      setFormClose(1);
      window.location.reload();
    }
  };

  const transportMaster = async (e) => {
    const plant = AuthServices.getSelectedPlant();
    const plantId = plant.plantId;

    if (code.length === 0) {
      setDialogTitleMessage("Transporter Code is empty");
      setDialogContentMessage("Enter transporter code");
      setOpen(true);
      return;
    }
    if (code.length != 10) {
      setDialogTitleMessage("Code is Invalid");
      setDialogContentMessage("Enter 10 digit code");
      setOpen(true);
      return;
    }
    if (name.length === 0) {
      setDialogTitleMessage("Transporter Name is empty");
      setDialogContentMessage("Enter transporter name");
      setOpen(true);
      return;
    }
    if (contantName.length === 0) {
      setDialogTitleMessage("Contact Person Name is empty");
      setDialogContentMessage("Enter contact person name");
      setOpen(true);
      return;
    }
    if (contactNo.length != 10) {
      setDialogTitleMessage("Contact Mobile is Invalid");
      setDialogContentMessage("Enter contact person 10 digit mobile number");
      setOpen(true);
      return;
    }

    if (state.length === 0) {
      setDialogTitleMessage("State is empty");
      setDialogContentMessage("Select a state from list");
      setOpen(true);
      return;
    }

    const transporterJson = {
      code: code,
      contactName: contantName,
      description: "New Transporter",
      name: name,
      contactNo: contactNo,
      gstin: gstin,
      state: state,
      latitude: Latitude,
      longitude: Longitude,
      context: "Transporter",
      status: "Active",
      parent: { id: plantId },
    };

    let transporterResponse = await TransporterService.addTransporter(
      transporterJson
    );

    if (transporterResponse.code === 200) {
      setDialogTitleMessage("Transporter Added Successfully");
      setDialogContentMessage(
        "New Transporter: " + code + " " + name + " added Successfully"
      );
      setFormClose(2);
      setOpen(true);
    } else {
      if (transporterResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(transporterResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const csvOptions = { fileName: "Transporter List" };

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
  //  const handleCloseMap = () => {
  //     setOpen(false);

  //     if (formClose !== 1) {
  //       setFormClose(1);
  //       window.location.reload();
  //     }
  //   };
  const [mapDetails, setMapDetails] = React.useState(false);
  const mapAdd = async (e) => {
    console.log("Map Button clicked");
  };

  const handleMapClose = (map, maps) => {
    setMapDetails(false);
  };

  const handleCellClick = (params) => {
    setMapDetails(true);
  };

  //Setup Map Marker
  const [Markers, setMarker] = useState({
    name: "Current position",
    position: {
      lat: 12.97,
      lng: 77.59,
    },
  });

  // const renderMarkers = (map, maps) => {
  //   console.log(maps);
  //   console.log(map);
  //   let marker = new maps.Marker({
  //     position: Markers.position,
  //     zoom: Markers.zoom,
  //     draggable: true,
  //     dragend: (e) => console.log(e),
  //     map,
  //     title: "Location",
  //   });
  //   return marker;
  // };

  const renderMarkers = (lat, long) => {
    if (map === null || maps === null) {
      return;
    }

    markers.forEach((marker) => marker.setMap(null));

    const newMarker = new maps.Marker({
      position: {
        lat: lat,
        lng: long,
      },

      draggable: true,
      map,
      title: "Location",
    });

    // Update the markers state with the new marker
    setMarkers([newMarker]);
    moveToMarker(newMarker);
  };

  const moveToMarker = (marker) => {
    if (map && maps && marker) {
      map.panTo(marker.getPosition());
    }
  };

  return (
    <Grid container style={containerStyle}>
      <h3 style={{ marginLeft: "8px" }}>Add Transporter</h3>
      <Grid item xs={12} style={ItemStyle}>
        <Paper
          sx={{
            width: "98%",
            padding: "8px",
            display: "flex",
          }}
        >
          <ThemeProvider theme={formLabelsTheme}>
            <form noValidate autoComplete="off">
              <TextField
                required
                id="code"
                label="Transporter Code"
                variant="outlined"
                style={textStyle}
                value={code}
                onChange={handelTransporterCodeChange}
              />
              <TextField
                required
                id="name"
                label="Transporter Name"
                variant="outlined"
                style={textStyle}
                value={name}
                onChange={handleTransporterNameChange}
              />
              <TextField
                required
                id="contantName"
                label="Contact Person Name"
                variant="outlined"
                style={textStyle}
                value={contantName}
                onChange={handleContactPersonName}
              />
              <TextField
                required
                id="contactNo"
                label="Contact Person No"
                variant="outlined"
                style={textStyle}
                value={contactNo}
                onChange={handelContactPersonChange}
              />
              <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="State"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {IndianStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="gstin"
                label="GST No"
                variant="outlined"
                style={textStyle}
                value={gstin}
                onChange={handleGSTNOChnage}
              />
              <Button
                style={{
                  marginTop: "8px",
                  marginLeft: "8px",
                  width: "13%",
                  height: "53px",
                }}
                variant="contained"
                onClick={(e) => {
                  mapAdd(e);
                  handleCellClick(encodeURIComponent);
                }}
              >
                Location on Map
              </Button>

              <TextField
                id="latitude"
                label="latitude"
                variant="outlined"
                style={textStyle}
                value={Latitude}
              />
              <TextField
                id="longitude"
                label="longitude"
                variant="outlined"
                style={textStyle}
                value={Longitude}
              />
              {/* <div style={{ margin: "8px" }}> */}
              <Button
                style={{
                  marginTop: "8px",
                  marginLeft: "8px",
                  width: "13%",
                  height: "53px",
                }}
                variant="contained"
                onClick={(e) => {
                  transportMaster(e);
                }}
              >
                Add New Transporter
              </Button>
              {/* </div> */}
            </form>
          </ThemeProvider>
        </Paper>
      </Grid>
      <Grid item xs={12} style={ItemStyle}>
        <Paper sx={{ width: "100%" }}>
          <h3> List of Transporter </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
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
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
            />
          </div>
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

      <div>
        <Modal
          open={mapDetails}
          onClose={handleMapClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              minWidth: "800px",
              padding: "20px",
            }}
          >
            <div className="map">
              <div style={{ position: "relative" }}>
                <div style={{ height: "50vh", width: "100%" }}>
                  <PlacesAutocomplete
                    value={address}
                    onChange={handelSuggectChange}
                    onSelect={handleSelect}
                    resetInputOnSelect={true}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div style={{ position: "relative" }}>
                        <input
                          {...getInputProps({
                            placeholder: "Search Places",
                            className: "location-search-input",
                            onFocus: () => setShowDropdown(true),
                            onBlur: () => setShowDropdown(false),
                          })}
                        />
                        {showDropdown && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              backgroundColor: "#fff",
                              border: "1px solid #ccc",
                              width: "100%",
                              zIndex: 1000,
                            }}
                          >
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => (
                              <div
                                key={suggestion.placeId}
                                style={{
                                  backgroundColor: suggestion.active
                                    ? "#fafafa"
                                    : "#ffffff",
                                  cursor: "pointer",
                                }}
                                {...getSuggestionItemProps(suggestion)}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </PlacesAutocomplete>
                  {typeof window !== "undefined" && (
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyAhSZCWlSHEejZ-tNLnC-LqaEP3hmRBRg4",
                      }}
                      defaultCenter={{
                        lat: defaultLatitude,
                        lng: defalutLongitude,
                      }}
                      defaultZoom={7}
                      yesIWantToUseGoogleMapApiInternals={true}
                      onGoogleApiLoaded={onGoogleApiLoaded}
                      onClick={(e) => {
                        // console.log("latitude = ", e.lat);
                        // console.log("longitude = ", e.lng);
                        setLatitude(e.lat);
                        setLongitude(e.lng);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                // marginLeft: "86%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <Typography style={{ marginLeft: "1%", width: "300px" }}>
                  Latitude: {Latitude}
                </Typography>
                <Typography style={{ marginLeft: "1%", width: "300px" }}>
                  Longitude: {Longitude}
                </Typography>
              </div>
              <div style={{ align: "right" }}>
                <Button variant="contained" onClick={handleMapClose}>
                  Close
                </Button>{" "}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </Grid>
  );
}

export default TransporterMaster;
