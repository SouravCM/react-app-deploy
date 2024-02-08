import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
//import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
//import { styled } from "@mui/material/styles";
//import { Chart } from "react-google-charts";
import Button from "@mui/material/Button";
//import Radio from "@mui/material/Radio";
//import RadioGroup from "@mui/material/RadioGroup";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import FormControl from "@mui/material/FormControl";
//import Select, { SelectChangeEvent } from "@mui/material/Select";
//import InputLabel from "@mui/material/InputLabel";
//import MenuItem from "@mui/material/MenuItem";

//import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
//import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
//import FormGroup from "@mui/material/FormGroup";
import DriverService from "../../services/DriverService";
import { styled } from "@mui/material/styles";
//import { TableVirtuoso, TableComponents } from "react-virtuoso";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridToolbar, GridEditCellProps } from "@mui/x-data-grid";
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

import {
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
} from "@mui/x-data-grid";
import {
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const paperStyle = {
  padding: "8px",
  height: "auto",
  margin: "auto",
};
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

const textStyle = {
  margin: "4px",
  padding: "4px",
};

function DriverMaster() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [editedRows, setEditedRows] = useState({});
  const [editedValue1, seteditedValue1] = useState([]);
  const [editedValue2, seteditedValue2] = useState([]);
  const dataGridRef = useRef(null);

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

    const driverJson = {
      id: params.row.id,
      name: params.row.drivername,
      licenseNo: params.row.license,
      licenseExpiry: params.row.dlvalidity,
      licenseType: params.row.licensetype,
      status: params.row.status,
      mobileNo: params.row.contact,
    };

    let driverResponse = await DriverService.updateDriver(driverJson);

    if (driverResponse.code === 200) {
      setEditedRows({});
      setDialogTitleMessage("Driver Details Updated");
      setDialogContentMessage(
        "Driver: " + params.row.drivername + "  Successfully"
      );
      setOpen(true);
    } else {
      if (driverResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(driverResponse.responseBody);
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

  const handleDeleteClick = async (params) => {
    const id = params.id;
    setRows(rows.filter((row) => row.id !== id));
  };

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
  //const [corporateCode, setCorporateCode] = useState("");
  //const [Transporter, setTransporter] = useState("");
  const [driverlicense, setdriverlicense] = useState("");
  const [drivername, setdrivername] = useState("");
  const [driverfather, setdriverfather] = useState("");
  const [drivermobile, setdrivermobile] = useState("");
  const [licesetype, setlicesetype] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [licenseexpiry, setlicenseexpiry] = useState("");

  //const [address, setaddress] = useState("");

  const [doorNo, setDoorNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateAP, setStateAP] = useState("");
  const [landmark, setLandMark] = useState("");
  const [pincode, setPinCode] = useState("");

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [open, setOpen] = React.useState(false);

  const [allDrivers, setAllDrivers] = useState([]);

  const [colors, setColor] = useState("error");
  const [colors1, setColor1] = useState("error");
  const [colors2, setColor2] = useState("error");

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handelMobileNumber = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (newValue.length <= 10) {
      setdrivermobile(newValue);
    }
    if (value.trim() === "") {
      setColor1("error");
    } else {
      setColor1("primary");
    }
  };
  const handelDriverName = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9\s]/g, ""); // Limit the length to 10 characters
    setdrivername(newValue);

    if (value.trim() === "") {
      setColor("error");
    } else {
      setColor("primary");
    }
  };
  const handelDriverLicenceNumber = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    setdriverlicense(newValue);
    if (value.trim() === "") {
      setColor2("error");
    } else {
      setColor2("primary");
    }
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    async function getDriversList() {
      let driverList = await DriverService.getAllDrivers();
      if (driverList.code === 200) {
        setRows([]);
        driverList.responseBody.map((driver, index) =>
          setRows((prevState) => [
            ...prevState,
            {
              id: driver.id,
              sno: index + 1,
              drivername: driver.name,
              contact: driver.mobileNo,
              licensetype: driver.licenseType,
              license: driver.licenseNo,
              dlvalidity: new Date(driver.licenseExpiry),
              status: driver.status,
            },
          ])
        );
      } else {
        setDialogTitleMessage("Getting Driver list Error");
        setDialogContentMessage("Something went wrong, check your network!!");
        setOpen(true);
      }
    }
    getDriversList();
  }, []);

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
      field: "drivername",
      headerName: "Driver Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "contact",
      headerName: "Driver Contact",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "license",
      headerName: "Licence No",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "licensetype",
      headerName: "Licence Type",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      type: "singleSelect",
      valueOptions: ["LMV", "HMV"],
      editable: true,
    },
    {
      field: "dlvalidity",
      headerName: "Licence Expiry",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      type: "date",
      headerClassName: "super-app-theme--header",
      editable: true,
      // valueFormatter: (params) => {
      //   const date = new Date(params.value);
      //   const day = date.getDate().toString().padStart(2, "0");
      //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
      //   const year = date.getFullYear().toString();
      //   return `${day}-${month}-${year}`;
      // },
      renderCell: (params) =>
        moment(params.row.dlvalidity).format("DD-MM-YYYY"),
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
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
      flex: 1,
      width: "auto",
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

  const addNewDriver = async (e) => {
    if (drivername.length === 0) {
      setDialogTitleMessage("Driver Name is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    if (driverlicense.length === 0) {
      setDialogTitleMessage("Driver License is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }

    if (drivermobile.length === 0) {
      setDialogTitleMessage("Driver mobile is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    if (licesetype.length === 0) {
      setDialogTitleMessage("Licese Type is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }

    if (licenseexpiry.length === 0) {
      setDialogTitleMessage("License Expiry is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    if (drivermobile.length < 10) {
      setDialogTitleMessage("Please enter 10 digit Mobile no");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }

    const driverJson = {
      name: drivername,
      licenseNo: driverlicense,
      licenseExpiry: licenseexpiry,
      licenseType: licesetype,
      dob: dateofbirth,
      status: "Active",
      mobileNo: drivermobile,
      fatherName: driverfather,
      addressOne: doorNo,
      addressTwo: street,
      city: city,
      state: stateAP,
      landmark: landmark,
      pincode: pincode,
      country: "INDIA",
    };

    let driverResponse = await DriverService.addDriver(driverJson);

    if (driverResponse.code === 200) {
      setDialogTitleMessageComplete("Driver Created Success");
      setDialogContentMessageComplete(
        "New Driver: " + drivername + " added Successfully"
      );
      setOpenComplete(true);
    } else {
      if (driverResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(driverResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //const [plantcode, setplantcode] = React.useState("");

  const csvOptions = { fileName: "Driver List" };

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
    <>
      <Grid container style={containerStyle}>
        <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>Driver Master</h2>

        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "99%",
              overflow: "hidden",
              padding: "8px",
              border: "2px solid #696969",
              borderRadius: "5px",
            }}
          >
            <ThemeProvider theme={formLabelsTheme}>
              <form noValidate autoComplete="off">
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginTop: "10px", color: "#15317E" }}
                >
                  <b>Driver Details</b>
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={2.5}>
                    <div>
                      <TextField
                        color={colors}
                        required
                        id="drivername"
                        label="Driver Name"
                        variant="outlined"
                        style={textStyle}
                        value={drivername}
                        onChange={handelDriverName}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={2.5}>
                    <div>
                      <TextField
                        color={colors1}
                        required
                        id="drivermobile"
                        label="Mobile Number"
                        variant="outlined"
                        style={textStyle}
                        value={drivermobile}
                        onChange={handelMobileNumber}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={2.5}>
                    <div>
                      <TextField
                        color={colors2}
                        required
                        id="driverlicense"
                        label="Driver License Number"
                        variant="outlined"
                        style={textStyle}
                        value={driverlicense}
                        onChange={handelDriverLicenceNumber}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={2}>
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">
                          License Type <span style={{ color: "red" }}> *</span>
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={licesetype}
                          onChange={(e) => setlicesetype(e.target.value)}
                          label="License Type *"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="LMV">
                            <em>LMV</em>
                          </MenuItem>
                          <MenuItem value="HMV">
                            <em>HMV</em>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>

                  <Grid item xs={2}>
                    <div>
                      <TextField
                        id="licenseexpiry"
                        label="License Expiry *"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        style={textStyle}
                        onChange={(e) => setlicenseexpiry(e.target.value)}
                      />
                    </div>
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
                    <div>
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          addNewDriver(e);
                        }}
                      >
                        Add New Driver
                      </Button>
                    </div>
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
                title="List Of Drivers"
              >
                List of Drivers
              </h3>
            </div>
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
    </>
  );
}

export default DriverMaster;
