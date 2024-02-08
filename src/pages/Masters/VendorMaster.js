import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import AuthServices from "../../services/AuthServices";
import VendorServices from "../../services/VendorServices";
import { Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";

import { ThemeProvider, createTheme } from "@mui/material/styles";

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

import GoogleMapReact from "google-map-react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { FormControlLabel, Switch } from "@mui/material";
import Dropzone from "react-dropzone";
import { VendorTempletFile } from "../../utils/constants.js";
import FileSaver from "file-saver";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinkServicesObj from "../../services/LinkServices";

import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid-pro";
import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AdminServicesObj from "../../services/AdminServices";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        density: "compact",
      },
    },
  },
});
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
};

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

const textStyle = {
  flex: 1,
  maxWidth: "210px",
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
];

function VendorMaster() {
  const columns = [
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
      field: "code",
      headerName: "Vendor Code",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Vendor Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "contactNo",
      headerName: "Contact Person Number",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "contactName",
      headerName: "Contact Person Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email Id",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "gstin",
      headerName: "GSTIN",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "state",
      headerName: "State",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "radius",
      headerName: "Radius (Kms)",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "duration",
      headerName: "Duration(Mins)",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",

      flexGrow: 0.5,
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
  const [code, setcode] = useState("");
  const [contantName, setContantName] = useState("");
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [state, setState] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [defaultLatitude, setDefalutLatitude] = useState(12.97);
  const [defalutLongitude, setDefaultLongitude] = useState(77.59);
  const [multipleEmail, setMultipleEmail] = useState("");

  const [radius, setRadius] = useState(0.1);
  const [duration, setDuration] = useState(30);

  const [rows, setRows] = useState([]);

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);

  const [markers, setMarkers] = useState([]);

  const [isUpload, setIsUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
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
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const vendorJson = {
      id: params.row.id,
      code: params.row.code,
      contactName: params.row.contactName,
      description: "Supplier Updated",
      contactNo: params.row.contactNo,
      email: params.row.email,
      gstin: params.row.gstin,
      state: params.row.state,
      addressOne: params.row.address,
      context: "SUPPLIER",
      status: "Active",
      parent: { id: plantId },
      latitude: params.row.latitude,
      longitude: params.row.longitude,
      radius: params.row.radius,
      standardDuration: params.row.duration,
      contactEmails: params.rowcontactEmails,
      name: params.row.name,
    };

    let vendorResponce = await AdminServicesObj.updateCompany(vendorJson);

    if (vendorResponce.code === 200) {
      setEditedRows({});
      setDialogTitleMessage("Vendor Details Updated");
      setDialogContentMessage("Vendor: " + params.row.name);
      setOpen(true);
    } else {
      if (vendorResponce.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(vendorResponce.responseBody);
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

  const onGoogleApiLoaded = ({ map, maps }) => {
    setMap(map);
    setMaps(maps);
  };

  useEffect(() => {
    // Make the initial API call here after the Google Map API is loaded
    if (map && maps) {
      renderMarkers(defaultLatitude, defalutLongitude);
    }
  }, [map, maps]);

  const handelSuggectChange = (newValue) => {
    setAddress(newValue);
    setShowDropdown(true); // Close the dropdown when the input value changes
  };

  async function getVendorList() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    let vendorList = await VendorServices.getAllVendorByPlantId(plantId);
    // console.log("Vendors List:" + JSON.stringify(vendorList));
    if (vendorList.code === 200) {
      setRows([]);
      vendorList.responseBody.map((vendor, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: vendor.id,
            sno: index + 1,
            code: vendor.code,
            name: vendor.name,
            email: vendor.email,
            address: vendor.addressOne,
            contactNo: vendor.contactNo,
            contactName: vendor.contactName,
            gstin: vendor.gstin,
            state: vendor.state,
            latitude: vendor.latitude,
            longitude: vendor.longitude,
            radius: vendor.radius,
            duration: vendor.standardDuration,
            contactEmails: vendor.contactEmails,
          },
        ])
      );
    } else if (vendorList.code === 208) {
      setDialogTitleMessage("No Data");
      setDialogContentMessage("Add New Vendor");
      setOpen(true);
    } else {
      setDialogTitleMessage("Getting Vendor list Error");
      setDialogContentMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }
  useEffect(() => {
    getVendorList();
  }, []);

  const handelTransporterCodeChange = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (newValue.length <= 10) {
      setcode(newValue);
    }
  };

  const handleContactPersonName = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9\s]/g, ""); // Limit the length to 10 characters
    setContantName(newValue);
  };

  const handleAddress = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9\s]/g, ""); // Limit the length to 10 characters
    setAddress(newValue);
  };

  const handleTransporterNameChange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9\s]/g, ""); // Limit the length to 10 characters
    setName(newValue);
  };

  const handelContactPersonChange = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (newValue.length <= 10) {
      setContactNo(newValue);
    }
  };
  const handleEmailIdChange = (event) => {
    const { value } = event.target;
    // Only allow numbers

    setEmailId(value);
  };
  const handleMulitipkeEmailIdChange = (event) => {
    const { value } = event.target;

    setMultipleEmail(value);
  };
  const handleLatChange = (event) => {
    const { value } = event.target;

    setLatitude(value);
  };
  const handleLongChnage = (event) => {
    const { value } = event.target;

    setLongitude(value);
  };

  const handelRadiusChange = (event) => {
    const { value } = event.target;

    setRadius(value);
  };
  const handelDurationChange = (event) => {
    const { value } = event.target;

    setDuration(value);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGSTNOChnage = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    setGstin(newValue);
  };

  const csvOptions = { fileName: "Vendor List" };

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

  const handleClose = () => {
    setOpen(false);
    setcode("");
    setContantName("");
    setName("");
    setContactNo("");
    setEmailId("");
    setState("");
    setGstin("");
    setAddress("");
    setLatitude("");
    setLongitude("");
    getVendorList();
  };

  const mapAdd = async (e) => {
    console.log("Map Button clicked");
  };

  const vendorMasterAdd = async (e) => {
    const plant = AuthServices.getSelectedPlant();
    const plantId = plant.plantId;

    if (code.length === 0) {
      setDialogTitleMessage("Supplier Code is empty");
      setDialogContentMessage("Enter Valid vendor code");
      setOpen(true);
      return;
    }
    if (name.length === 0) {
      setDialogTitleMessage("Supplier Name is empty");
      setDialogContentMessage("Enter Supplier Name");
      setOpen(true);
      return;
    }
    if (contantName.length === 0) {
      setDialogTitleMessage("Contact Person Name is empty");
      setDialogContentMessage("Enter a person name");
      setOpen(true);
      return;
    }

    if (contactNo.length !== 10) {
      setDialogTitleMessage("Invalid Contact Number");
      setDialogContentMessage("Please enter 10 digit mobile number");
      setOpen(true);
      return;
    }
    if (emailId.length !== 0) {
      if (!validateEmail(emailId)) {
        setDialogTitleMessage("Invalid Email Id");
        setDialogContentMessage("Please enter valid emailId");
        setOpen(true);
        return;
      }
    }
    if (address.length === 0) {
      setDialogTitleMessage("Address is empty");
      setDialogContentMessage("Enter Address");
      setOpen(true);
      return;
    }
    if (state.length === 0) {
      setDialogTitleMessage("State is empty");
      setDialogContentMessage("select a state");
      setOpen(true);
      return;
    }

    const supplierJson = {
      code: code,
      contactName: contantName,
      description: "New Supplier",
      name: name,
      contactNo: contactNo,
      email: emailId,
      gstin: gstin,
      state: state,
      addressOne: address,
      context: "SUPPLIER",
      status: "Active",
      parent: { id: plantId },
      latitude: Latitude,
      longitude: Longitude,
      radius: radius, //In KMS
      standardDuration: duration, //in Mins
      contactEmails: multipleEmail,
    };

    let supplierResponse = await VendorServices.addVendor(supplierJson);

    if (supplierResponse.code === 200) {
      setDialogTitleMessage("Supplier Added Successfully");
      setDialogContentMessage("New Supplier: " + name + " added Successfully");
      setOpen(true);
    } else {
      if (supplierResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(supplierResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };

  const [mapDetails, setMapDetails] = React.useState(false);

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

  const handlePlaceSelect = (place) => {
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLatitude(lat);
      setLongitude(lng);
    }
  };

  const onFileChange = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handelTempleteDownload = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(VendorTempletFile);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    FileSaver.saveAs(
      new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
      "Vendor_Template.xlsx"
    );
  };

  const uploadRouteVendor = async (e) => {
    if (selectedFile === null) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select a File");
      setOpen(true);
      return;
    }
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("companyId", plantId);
    formData.append("context", "SUPPLIER");

    let uploadResponce = await AdminServicesObj.uploadCompanyByContext(
      formData
    );

    if (uploadResponce.code === 200) {
      setDialogTitleMessage("Uploaded  Successfully");
      setDialogContentMessage(uploadResponce.responseBody);
      setOpen(true);
      setSelectedFile(null);
      getVendorList();
    } else {
      if (uploadResponce.code === 209) {
        setDialogTitleMessage("Uploading Failed");
        setDialogContentMessage(uploadResponce.responseBody);
        setOpen(true);
      }
    }
  };

  return (
    <Grid container style={containerStyle}>
      <h3 style={{ marginLeft: "8px" }}>Add Vendor</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "95%",
        }}
      >
        <Typography variant="body1">Add Vendor </Typography>
        <FormControlLabel
          style={{ marginLeft: "5px" }}
          control={
            <Switch
              checked={isUpload}
              onChange={(e) => setIsUpload(e.target.checked)}
              color="primary"
            />
          }
          label="Upload Vendor"
        />
      </div>
      {isUpload ? (
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            elevation={5}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            sx={{
              width: "98%",
              padding: "8px",
              display: "flex",
              border: "2px solid #696969",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <div>
              <Dropzone onDrop={onFileChange}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    style={{
                      border: "1px dashed #ccc",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    <CloudUploadIcon fontSize="large" />
                    <input {...getInputProps()} />
                    <p>Drag & drop a file here, or click to select a file</p>
                    {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                  </div>
                )}
              </Dropzone>
              <Button
                style={{
                  flex: 1,
                  maxWidth: "100px",
                  marginTop: "10px",
                  marginLeft: "8px",
                }}
                variant="contained"
                onClick={(e) => {
                  uploadRouteVendor(e);
                }}
              >
                Upload
              </Button>
              <Button
                style={{
                  flex: 1,
                  maxWidth: "100px",
                  marginTop: "10px",
                  marginLeft: "8px",
                }}
                variant="contained"
                onClick={handelTempleteDownload}
              >
                Template
              </Button>
            </div>
          </Paper>
        </Grid>
      ) : (
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "98%",
              padding: "8px",
              display: "flex",
              border: "2px solid #696969",
              borderRadius: "5px",
            }}
            elevation={5}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemeProvider theme={formLabelsTheme}>
              <form noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      required
                      id="code"
                      label="Vendor Code"
                      variant="outlined"
                      style={textStyle}
                      value={code}
                      onChange={handelTransporterCodeChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      required
                      id="name"
                      label="Vendor Name"
                      variant="outlined"
                      style={textStyle}
                      value={name}
                      onChange={handleTransporterNameChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      required
                      id="contantName"
                      label="Contact Person Name"
                      variant="outlined"
                      style={textStyle}
                      value={contantName}
                      onChange={handleContactPersonName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      required
                      id="contactNo"
                      label="Contact Person No"
                      variant="outlined"
                      style={textStyle}
                      value={contactNo}
                      onChange={handelContactPersonChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      required
                      id="emaild"
                      label="Email Id"
                      variant="outlined"
                      style={textStyle}
                      value={emailId}
                      onChange={handleEmailIdChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      required
                      id="address"
                      label="Address"
                      variant="outlined"
                      style={textStyle}
                      value={address}
                      onChange={handleAddress}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <FormControl sx={{ m: 1, minWidth: 185 }}>
                      <InputLabel id="demo-simple-select-label">
                        State
                      </InputLabel>
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
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      id="gstin"
                      label="GST No"
                      variant="outlined"
                      style={textStyle}
                      value={gstin}
                      onChange={handleGSTNOChnage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Button
                      style={{ marginTop: "18px", marginLeft: "8px" }}
                      variant="contained"
                      onClick={(e) => {
                        mapAdd(e);
                        handleCellClick(encodeURIComponent);
                      }}
                    >
                      Location on Map
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      id="latitude"
                      type="number"
                      label="Latitude"
                      variant="outlined"
                      style={textStyle}
                      value={Latitude}
                      onChange={handleLatChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      id="longitude"
                      type="number"
                      label="Longitude"
                      variant="outlined"
                      style={textStyle}
                      value={Longitude}
                      onChange={handleLongChnage}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      id="radius"
                      type="number"
                      label="Radius (Kms)"
                      variant="outlined"
                      style={textStyle}
                      value={radius}
                      onChange={handelRadiusChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      id="duration"
                      type="number"
                      label="Duration (Mins)"
                      variant="outlined"
                      style={textStyle}
                      value={duration}
                      onChange={handelDurationChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <TextField
                      id="multipleEmail"
                      label="Multiple Emails"
                      variant="outlined"
                      style={textStyle}
                      value={multipleEmail}
                      onChange={handleMulitipkeEmailIdChange}
                      helperText="Please enter multiple emails, comma-separated."
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Button
                      style={{ marginTop: "18px", marginLeft: "8px" }}
                      variant="contained"
                      onClick={(e) => {
                        vendorMasterAdd(e);
                      }}
                    >
                      Add New
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </ThemeProvider>
          </Paper>
        </Grid>
      )}
      <Grid item xs={12} style={ItemStyle}>
        <Paper sx={{ width: "100%" }}>
          <h3> List of Vendor </h3>
          <ThemeProvider theme={theme}>
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

export default VendorMaster;
