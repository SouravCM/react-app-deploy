import React, { useEffect, useState } from "react";
//import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
//import { styled } from "@mui/material/styles";
//import { Chart } from "react-google-charts";
//import Button from "@mui/material/Button";
//import Radio from "@mui/material/Radio";
//import RadioGroup from "@mui/material/RadioGroup";
//import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
//import FormLabel from "@mui/material/FormLabel";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

//import TextField from "@mui/material/TextField";
//import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
//import FormGroup from "@mui/material/FormGroup";

//import { TableVirtuoso, TableComponents } from "react-virtuoso";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import VehicleService from "../../services/VehicleService";
import Autocomplete from "@mui/material/Autocomplete";
import AuthServices from "../../services/AuthServices";

import Button from "@mui/material/Button";
import GateInOutService from "../../services/GateInOutService";
import moment from "moment";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import InputAdornment from "@mui/material/InputAdornment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import dayjs from "dayjs";
import "dayjs/locale/en"; // load locale data

import {
  GridToolbarExportContainer,
  GridToolbarContainer,
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

// set the locale globally
dayjs.locale("en");

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

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
  width: "90%",
  height: "55px",
};
const formControlStyle = { m: 3, minWidth: 200, marginTop: "30px" };

const paperStyle = {
  width: "90%",
  height: "130px",
  border: "2px solid #696969",
  borderRadius: "5px",
  paddingLeft: "0px",
};

const columns = [
  {
    field: "sno",
    headerName: "Sl No",
    align: "center",
    headerAlign: "center",
    minWidth: 60,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "gatePAssNo",
    headerName: "Gate Pass No",
    align: "center",
    headerAlign: "center",
    minWidth: 350,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "vehicleNumber",
    headerName: "Vehicle Number",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "transporterName",
    headerName: "Transporter Name",
    align: "center",
    headerAlign: "center",
    minWidth: 200,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "driverName",
    headerName: "Driver Name",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "driverNumber",
    headerName: "Driver number",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "gateInTime",
    headerName: "Gate In Time",
    align: "center",
    headerAlign: "center",
    minWidth: 200,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "gateOutTime",
    headerName: "Gate Out Time",
    align: "center",
    headerAlign: "center",
    minWidth: 200,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "detentionTime",
    headerName: "Detention Time (HH:MM)",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "purpose",
    headerName: "Purpose",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "location",
    headerName: "Location",
    align: "center",
    headerAlign: "center",
    minWidth: 250,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "status",
    headerName: "Status",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
];

function GatePassReport() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [startDate, setstartDate] = useState(dayjs());
  const [endDate, setendDate] = useState(dayjs());

  const [vehicleListAPI, setVehicleListAPI] = useState([{}]);
  const [vehicleNumber, setVehicleNumber] = useState();
  const [vehicleId, setVehicleId] = useState("");
  const [allGatePass, setAllGatePass] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [openError, setopenError] = React.useState(false);

  const handleCloseError = () => {
    setopenError(false);
  };

  const [dialogErrorTitleMessage, setDialogErrorTitleMessage] = useState();
  const [dialogErrorContentMessage, setDialogErrorContentMessage] = useState();

  const handleEndDateChange = (date) => {
    setendDate(date);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const defaultProps = {
    options: vehicleListAPI,
    getOptionLabel: (option) => option.label,
  };

  useEffect(() => {
    // closeNav();

    async function fetchVehicleDropdown() {
      // You can await here
      let plant = AuthServices.getSelectedPlant();
      let plantID = plant.plantId;
      let vehicleList = await VehicleService.getAllVehiclesListByPlantCode(
        plantID
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
    fetchVehicleDropdown();
  }, []);

  const getDataGate = async (e) => {
    const formattedEndDate = endDate.endOf("day").format("YYYY-MM-DD HH:mm:ss");
    const formattedStartDate = startDate
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");

    let plant = AuthServices.getSelectedPlant();
    let plantID = plant.plantId;
    var data = {};

    if (vehicleId.length == 0) {
      data = {
        fromDate: formattedStartDate,
        toDate: formattedEndDate,
        companyId: plantID,
      };
    } else {
      data = {
        vehicleId: vehicleId,
        fromDate: formattedStartDate,
        toDate: formattedEndDate,
        companyId: plantID,
      };
    }
    let gatePassData = await GateInOutService.getGatePassListByVehicleAndDate(
      data
    );
    if (gatePassData.code === 200) {
      setAllGatePass([]);
      let storeList = "";
      gatePassData.responseBody.map((gatePassData, index) =>{

      console.log("GatePadd Report:=>"+JSON.stringify(gatePassData.stores))
      // storeList = storeList + gatePassData.stores[0].name;
      //console.log("Store List:"+index+"[]"+storeList);
      let storeslist = gatePassData.stores;
      let storeList = "";
      storeslist.map((store,index)=>{
        if(storeList.length===0){
          storeList =  store.name;
        }
         else {
          storeList = storeList +", "+ store.name;
        }
       
        console.log("Name=>"+store.name);

      });
        console.log("NAME OF STORES:"+storeList);
      setAllGatePass((prevState) => [
          ...prevState,
          {
            id: index + 1,
            sno: index + 1,
            vehicleNumber: gatePassData.vehicle.registrationNo,
            transporterName: gatePassData.vehicle.transporter.name,
            driverNumber: gatePassData.driver.mobileNo,
            driverName: gatePassData.driver.name,
            gateInTime: moment(
              new Date(gatePassData.gatepass.entryTime)
            ).format("DD-MM-YYYY HH:mm:ss"),
            gateOutTime: gatePassData.gatepass.exitTime
              ? moment(new Date(gatePassData.gatepass.exitTime)).format(
                  "DD-MM-YYYY HH:mm:ss"
                )
              : "",

            detentionTime: gatePassData.gatepass.detentionTime,
            gatePAssNo: gatePassData.gatepass.passNo,
            purpose: gatePassData.gatepass.purpose,
            location : storeList,
            status: gatePassData.gatepass.status,
          },
        ])}

      );

    } else if (gatePassData.code === 208) {
      setDialogErrorTitleMessage("No Data");
      setDialogErrorContentMessage("");
      setopenError(true);
    } else {
      setDialogErrorTitleMessage("Error");
      setDialogErrorContentMessage("");
      setopenError(true);
    }
  };

  const csvOptions = { fileName: "Gate Pass Report" };

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
    <div>
      <Grid container style={containerStyle}>
        <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>
          Gate Pass Report
        </h2>
        <Grid item xs={12} style={ItemStyle}>
          <Paper sx={paperStyle}>
            <FormControl sx={formControlStyle}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginTop: "-6px",
                }}
              >
                <Autocomplete
                  {...defaultProps}
                  style={ItemStyle}
                  disablePortal
                  id="vehicleListDropDown"
                  sx={{
                    width: 200,
                    "& .MuiAutocomplete-popup": {
                      zIndex: 9, // set the zIndex to a higher value than the Paper component
                    },
                  }}
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
              </div>
            </FormControl>
            <FormControl sx={formControlStyle}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginTop: "-8px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setstartDate(newValue)}
                      format="DD-MM-YYYY"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </FormControl>
            <FormControl sx={formControlStyle}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginTop: "-8px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      format="DD-MM-YYYY"
                      onChange={(newValue) => setendDate(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </FormControl>
            <FormControl sx={formControlStyle}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginTop: "8px",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#FFB940", borderRadius: "18px" }}
                  onClick={getDataGate}
                >
                  Search
                </Button>
              </div>
            </FormControl>
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
                List of Gate Pass
              </h3>
            </div>
            <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
              <DataGrid
                rows={allGatePass}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
                slots={{ toolbar: CustomToolbar }}
                getRowClassName={(params) => {
                  const rowValues = params.row; // Replace 'columnName' with the actual column name containing the condition value
                  if (rowValues.status === "REJECTED") {
                    // Replace 'desiredValue' with the value that should trigger the row color change
                    return "super-app-theme--light-red";
                  } else if (params.indexRelativeToCurrentPage % 2 === 0) {
                    return "super-app-theme--odd";
                  } else {
                    return "super-app-theme--even";
                  }
                }}
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
          </Paper>
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
              <DialogActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* <Button onClick={handleClose}>Disagree</Button> */}
                <Button onClick={handleCloseError} autoFocus>
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

export default GatePassReport;
