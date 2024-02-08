import moment from "moment";
import React, { useEffect, useState } from "react";
//import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

//import { styled } from "@mui/material/styles";
//import { Chart } from "react-google-charts";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import AuthServices from "../../services/AuthServices";
import TransporterService from "../../services/TransporterService";
import VehicleService from "../../services/VehicleService";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { DataGrid } from "@mui/x-data-grid";
import {
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid-pro";

import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import {
  GridCsvExportMenuItem,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";

import InputAdornment from "@mui/material/InputAdornment";

import { createTheme, ThemeProvider } from "@mui/material/styles";

//import { TableVirtuoso, TableComponents } from "react-virtuoso";

// const theme = createTheme({
//   typography: {
//     fontFamily: ["Arial", "sans-serif"].join(","),
//   },
//   palette: {
//     primary: {
//       main: "#db3131",
//     },
//   },
// });

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
};

const textStyle = {
  margin: "4px",
  padding: "4px",
  width: "220px",
};
const textStyle2 = {
  margin: "4px",
  padding: "4px",
  width: "25%",
};

const textStyle3 = {
  margin: "4px",
  padding: "4px",
  width: "40%",
};

//const rows = [];
function VehicleMaster() {
  const columns = [
    {
      field: "sno",
      headerName: "SL No",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "vehicleno",
      headerName: "Vehicle Number",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "transporter",
      headerName: "Transporter",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "rcNo",
      headerName: "RC No",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "rcExpiry",
      headerName: "RC Expiry",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "date",
      renderCell: (params) =>
        params.row.rcExpiry
          ? moment(params.row.rcExpiry).format("DD-MM-YYYY")
          : "",
    },
    {
      field: "insurance",
      headerName: "Insurance No",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "insuranceExpiry",
      headerName: "Insurance Expiry",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "date",
      renderCell: (params) =>
        params.row.insuranceExpiry
          ? moment(params.row.insuranceExpiry).format("DD-MM-YYYY")
          : "",
    },
    {
      field: "pcNo",
      headerName: "Polution Certificate",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "pcExpiry",
      headerName: "Polution Expiry",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "date",
      renderCell: (params) =>
        params.row.pcExpiry
          ? moment(params.row.pcExpiry).format("DD-MM-YYYY")
          : "",
    },
    {
      field: "fcNo",
      headerName: "Fitness No",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "fcExpiry",
      headerName: "Fitness Expiry",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "date",
      renderCell: (params) =>
        params.row.fcExpiry
          ? moment(params.row.fcExpiry).format("DD-MM-YYYY")
          : "",
    },
    {
      field: "volume",
      headerName: "Volume",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      editable: true,
      type: "number",
      headerClassName: "super-app-theme--header",
      // editable: true,
    },
    {
      field: "capacity",
      headerName: "Capacity",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flexGrow: 1,
      editable: true,
      type: "number",
      headerClassName: "super-app-theme--header",
      // editable: true,
      // type: "number",
    },
    {
      field: "vehicleRaneGps",
      headerName: "Vehicle Fitted with RaneT4U GPS",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      // editable: true,
      // type: "boolean",
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
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
      minWidth: 150,
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
  //const [editedValue1, seteditedValue1] = useState([]);
  //const [editedValue2, seteditedValue2] = useState([]);
  // const dataGridRef = useRef(null);

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
    //const id = params.id;
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const vehicleJson = {
      id: params.row.id,
      registrationNo: params.row.vehicleno,
      rcNo: params.row.rcNo,
      status: params.row.status,
      rcExpiry: params.row.rcExpiry,
      capacity: params.row.capacity,
      length: params.row.length,
      width: params.row.width,
      height: params.row.height,
      volume: params.row.volume,
      fcNo: params.row.fcNo,
      fcExpiry: params.row.fcExpiry,
      insurance: params.row.insurance,
      insuranceExpiry: params.row.insuranceExpiry,
      fittedGps: params.row.vehicleRaneGps,
      uom: "feet",
      pcNo: params.row.pcNo,
      pcExpiry: params.row.pcExpiry,
      transporter: { id: params.row.transporterId },
      company: { id: plantId },
    };

    console.log(vehicleJson);

    let vehicleResponse = await VehicleService.updateVehicle(vehicleJson);

    if (vehicleResponse.code === 200) {
      setEditedRows({});
      setDialogTitleMessage("Veicle Details Updated");
      setDialogContentMessage(
        "Vehicle: " + params.row.vehicleno + "  Successfully"
      );
      setOpen(true);
    } else {
      if (vehicleResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(vehicleResponse.responseBody);
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
  //const [corporateCode, setCorporateCode] = useState("");
  // const [type, setType] = useState("");
  //const [make, setMake] = useState("");
  const [Transporter, setTransporter] = useState("");
  const [VehicleNumber, setVehicleNumber] = useState("");
  const [VehicleCapacity, setVehicleCapacity] = useState("");
  //const [VehicleModel, setVehicleModel] = useState("");
  const [RCNo, setRCNo] = useState("");
  const [FitnessNo, setFitnessNo] = useState("");
  const [Insurance, setInsurance] = useState("");
  const [RCNoExpiry, setRCNoExpiry] = useState("");
  const [FitnessNoExpiry, setFitnessNoExpiry] = useState("");
  const [InsuranceExpiry, setInsuranceExpiry] = useState("");

  const [vlength, setvlength] = useState(1);
  const [vwidth, setvwidth] = useState(1);
  const [vheight, setvheight] = useState(1);
  const [vvolumn, setvvolumn] = useState(0);
  // const [ratePerKm, setRatePerKm] = useState("");
  // const [emptyWeight, setEmptyWeight] = useState("");
  const [pcNo, setpcNo] = useState("");
  const [pcExpiry, setpcExpiry] = useState("");

  //const [page, setPage] = React.useState(0);
  //const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();

  const [transporterId, setTransporterId] = useState();

  const [open, setOpen] = React.useState(false);

  //const [allVehicle, setAllVehilce] = useState([]);

  const [transporterListAPI, setTransporterListAPI] = useState([{}]);

  //const vehicleNumberRef = useRef(null);

  const [isGPSFitted, setIsGPSFitted] = useState(false);
  var isGPSFittedString = "";

  // const handleCheckboxChange = (event) => {
  //   setIsGPSFitted(event.target.checked);
  // };

  const handleVehicleNumberChange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    if (newValue.length <= 10) {
      setVehicleNumber(newValue);
    }
  };
  const handleFC = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    setFitnessNo(newValue);
  };
  const handleRc = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    setRCNo(newValue);
  };
  const handleInsurance = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    setInsurance(newValue);
  };
  const handelPc = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    setpcNo(newValue);
  };

  useEffect(() => {
    // Calculate the volume whenever any of the dimensions change
    const newVolume = vlength * vwidth * vheight;
    setvvolumn(newVolume);
  }, [vlength, vwidth, vheight]);

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

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  useEffect(() => {
    async function fetchData() {
      // You can await here
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let transporterList = await TransporterService.getAllTransporterByPlantId(
        plantId
      );

      if (transporterList.code === 200) {
        setTransporterListAPI([]); //Clear existing list in array
        transporterList.responseBody.map((transporter) =>
          setTransporterListAPI((prevState) => [
            ...prevState,
            {
              label: transporter.name + " (" + transporter.code + ")",
              id: transporter.id,
            },
          ])
        );
      } else {
        console.log("Something went wrong in transporter List getting");
      }
    }
    fetchData();

    async function getVehicleList() {
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let vehicelList = await VehicleService.getAllVehiclesListByPlantCode(
        plantId
      );
      if (vehicelList.code === 200) {
        setRows([]);
        vehicelList.responseBody.map((vehicle, index) =>
          setRows((prevState) => [
            ...prevState,
            {
              id: vehicle.id,
              sno: index + 1,
              vehicleno: vehicle.registrationNo,
              transporter: vehicle.transporter.name,
              rcNo: vehicle.rcNo,
              rcExpiry: vehicle.rcExpiry ? new Date(vehicle.rcExpiry) : "",
              insurance: vehicle.insurance,
              insuranceExpiry: vehicle.insuranceExpiry
                ? new Date(vehicle.insuranceExpiry)
                : "",
              volume: vehicle.volume,
              pcNo: vehicle.pcNo,
              pcExpiry: vehicle.pcExpiry ? new Date(vehicle.pcExpiry) : "",
              fcNo: vehicle.fcNo,
              fcExpiry: vehicle.fcExpiry ? new Date(vehicle.fcExpiry) : "",
              vehicleRaneGps: vehicle.fittedGps,
              capacity: vehicle.capacity,
              status: vehicle.status,
              transporterId: vehicle.transporter.id,
              height: vehicle.height,
              width: vehicle.width,
              length: vehicle.length,
            },
          ])
        );
      } else if (vehicelList.code === 208) {
        return;
      } else {
        setDialogTitleMessage("Getting Driver list Error");
        setDialogContentMessage("Something went wrong, check your network!!");
        setOpen(true);
      }
    }
    getVehicleList();
  }, []);

  const addNewVehicle = async (e) => {
    if (isGPSFitted) {
      isGPSFittedString = "Yes";
    } else {
      isGPSFittedString = "No";
    }

    if (Transporter.length === 0) {
      setDialogTitleMessage("Transporter is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    if (VehicleNumber.length === 0) {
      setDialogTitleMessage("Registration Number is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }

    if (RCNo.length === 0) {
      console.log("RC No is empty");
      setDialogTitleMessage("RC No is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }

    // if (FitnessNo.length === 0) {
    //   console.log("FitnessNo is empty");
    //   setDialogTitleMessage("Fitness No is empty");
    //   setDialogContentMessage("");
    //   setOpen(true);
    //   return;
    // }
    if (Insurance.length === 0) {
      setDialogTitleMessage("Insurance is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }

    if (pcNo.length === 0) {
      setDialogTitleMessage("Polution Certificate is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    if (RCNoExpiry.length === 0) {
      setDialogTitleMessage("RC No Expiry is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    // if (FitnessNoExpiry.length === 0) {
    //   setDialogTitleMessage("Fitnes sNo Expiry is empty");
    //   setDialogContentMessage("");
    //   setOpen(true);
    //   return;
    // }
    if (InsuranceExpiry.length === 0) {
      setDialogTitleMessage("Insurance Expiry is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    if (pcExpiry.length === 0) {
      setDialogTitleMessage("Polution Certificate Expiry is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    // if (vlength == 1) {
    //   setDialogTitleMessage("Length is empty");
    //   setDialogContentMessage("");
    //   setOpen(true);
    //   return;
    // }
    // if (vwidth == 1) {
    //   setDialogTitleMessage("Width is empty");
    //   setDialogContentMessage("");
    //   setOpen(true);
    //   return;
    // }
    // if (vheight == 1) {
    //   setDialogTitleMessage("Height is empty");
    //   setDialogContentMessage("");
    //   setOpen(true);
    //   return;
    // }
    // if (VehicleCapacity.length === 0) {
    //   setDialogTitleMessage("Vehicle Capacity is empty");
    //   setDialogContentMessage("");
    //   setOpen(true);
    //   return;
    // }
    if (VehicleNumber.length < 8) {
      setDialogTitleMessage("Please enter at least 8 digit Vehicle no");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }

    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const vehicleJson = {
      registrationNo: VehicleNumber,
      rcNo: RCNo,
      status: "Active",
      rcExpiry: RCNoExpiry,
      capacity: VehicleCapacity,
      length: vlength,
      width: vwidth,
      height: vheight,
      volume: vvolumn,
      fcNo: FitnessNo,
      fcExpiry: FitnessNoExpiry,
      insurance: Insurance,
      insuranceExpiry: InsuranceExpiry,
      fittedGps: isGPSFittedString,
      uom: "meter",
      pcNo: pcNo,
      pcExpiry: pcExpiry,
      transporter: { id: transporterId },
      company: { id: plantId },
    };

    let vehicleResponse = await VehicleService.addVehicle(vehicleJson);

    if (vehicleResponse.code === 200) {
      setDialogTitleMessageComplete("Vehicle Added Successfully");
      setDialogContentMessageComplete(
        "New Vehicle: " + VehicleNumber + " Added Successfully"
      );

      setOpenComplete(true);
    } else {
      if (vehicleResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(vehicleResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };

  const defaultProps = {
    options: transporterListAPI,
    getOptionLabel: (option) => option.label,
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const csvOptions = { fileName: "Vehicle List" };

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

  return (
    <Grid container style={containerStyle}>
      <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>Vehicle Master</h2>

      <Grid item xs={12} style={ItemStyle}>
        <Paper
          elevation={5}
          sx={{ border: "2px solid #696969", borderRadius: "5px" }}
        >
          <ThemeProvider theme={formLabelsTheme}>
            <form noValidate autoComplete="off">
              <Typography
                variant="h6"
                gutterBottom
                style={{ marginTop: "20px", color: "#15317E" }}
              >
                <b> Vehicle Details</b>
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Autocomplete
                    {...defaultProps}
                    style={ItemStyleAutoComplite}
                    disablePortal
                    id="vehicleListDropDown"
                    sx={{ width: "220px" }}
                    onChange={(e, v) => {
                      if (v != null) {
                        setTransporter(v.label);
                        setTransporterId(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          <span>
                            Transporter <span style={{ color: "red" }}> *</span>
                          </span>
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    required
                    id="VehicleNumber"
                    label="Vehicle Number"
                    variant="outlined"
                    style={textStyle}
                    value={VehicleNumber}
                    onChange={handleVehicleNumberChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    required
                    id="RCNo"
                    label="RC Number"
                    variant="outlined"
                    style={textStyle}
                    value={RCNo}
                    onChange={handleRc}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    required
                    id="RCNoExpiry"
                    label="RC Expiry"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    style={(textStyle, { width: "220px" })}
                    onChange={(e) => setRCNoExpiry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    required
                    id="pcNo"
                    label="Polution Certificate"
                    variant="outlined"
                    style={textStyle}
                    value={pcNo}
                    onChange={handelPc}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    required
                    id="pcExpiry"
                    label="Polution Expiry"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    style={(textStyle, { width: "220px" })}
                    onChange={(e) => setpcExpiry(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    required
                    id="Insurance"
                    label="Insurance"
                    variant="outlined"
                    style={textStyle}
                    value={Insurance}
                    onChange={handleInsurance}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    required
                    id="InsuranceExpiry"
                    label="Insurance Expiry"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    style={(textStyle, { width: "220px" })}
                    onChange={(e) => setInsuranceExpiry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="FitnessNo"
                    label="Fitness Certificate"
                    variant="outlined"
                    style={textStyle}
                    value={FitnessNo}
                    onChange={handleFC}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    id="FitnessNoExpiry"
                    label="FC Expiry"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    style={(textStyle, { width: "220px" })}
                    onChange={(e) => setFitnessNoExpiry(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    type="number"
                    id="VehicleCapacity"
                    label="Capacity"
                    variant="outlined"
                    style={(textStyle, { width: "220px" })}
                    onChange={(e) => setVehicleCapacity(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    type="number"
                    id="vlength"
                    label="Length"
                    variant="outlined"
                    style={textStyle2}
                    onChange={(e) => setvlength(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type="number"
                    id="vwidth"
                    label="Width"
                    variant="outlined"
                    style={textStyle2}
                    onChange={(e) => setvwidth(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type="number"
                    id="vheight"
                    label="Height"
                    variant="outlined"
                    style={textStyle2}
                    onChange={(e) => setvheight(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">m</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    disabled
                    id="vvolumn"
                    label="Volumn"
                    defaultValue="0"
                    value={vvolumn}
                    style={textStyle3}
                    onChange={(e) => setvvolumn(e.target.value)}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <span>
                            m<sup>3</sup>
                          </span>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      addNewVehicle(e);
                    }}
                  >
                    Add New Vehicle
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Your content */}
                </Grid>
              </Grid>
            </form>
          </ThemeProvider>
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
              title="List Of Transporter"
            >
              List of Vehicle
            </h3>
          </div>
          <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
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
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
            />
          </div>
        </Paper>

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
  );
}

export default VehicleMaster;
