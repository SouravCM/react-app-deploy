import React, { useState } from "react";
//import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
//import { Chart } from "react-google-charts";
//import Button from "@mui/material/Button";
//import Radio from "@mui/material/Radio";
//import RadioGroup from "@mui/material/RadioGroup";
//import FormControlLabel from "@mui/material/FormControlLabel";
import moment from "moment";

import FormControl from "@mui/material/FormControl";
//import FormLabel from "@mui/material/FormLabel";

import AuthServices from "../../services/AuthServices";
import VendorServices from "../../services/VendorServices";

import Select, { SelectChangeEvent } from "@mui/material/Select";
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

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        density: "compact",
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

const paperStyle = {
  width: "90%",
  height: "130px",
  overflow: "hidden",
  paddingLeft: "20px",
};

const formControlStyle = { m: 1, minWidth: 250, marginTop: "30px" };

const containerStyle = {
  padding: "8px",
  height: "100%",
};

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const textStyle = {
  margin: "4px",
  padding: "4px",
  width: "20%",
  height: "40px",
};

const columns = [
  {
    field: "sno",
    headerName: "Sl No",
    align: "center",
    headerAlign: "center",
    minWidth: 50,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "plant",
    headerName: "Plant",
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
    field: "vehicle",
    headerName: "Vehicle",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "planNo",
    headerName: "Plan No",
    align: "center",
    headerAlign: "center",
    minWidth: 180,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "planDate",
    headerName: "Plan Date",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "material",
    headerName: "Material",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },

  {
    field: "unitWeight",
    headerName: "Unit Weight",
    align: "center",
    headerAlign: "center",
    minWidth: 100,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "expectedDate",
    headerName: "Expected Date",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "requestedQuantity",
    headerName: "Requested Quantity",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "dispatchedQuantity",
    headerName: "Dispatched Quantity",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
    editable: true,
    type: "number",
  },
  {
    field: "dispatchedDate",
    headerName: "Dispatched Date",
    align: "center",
    headerAlign: "center",
    minWidth: 200,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
    editable: true,
    type: "number",
  },
  {
    field: "pendingQuantity",
    headerName: "Pending Quantity",
    align: "center",
    headerAlign: "center",
    minWidth: 130,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "remarks",
    headerName: "Remarks",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
];

function DispatchReport() {
  const [startDate, setstartDate] = useState(dayjs());
  const [endDate, setendDate] = useState(dayjs());

  const [allDiapatchDetails, setAllDiapatchDetails] = useState([]);

  const csvOptions = { fileName: "Dispatch Report" };

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

  async function getDataDispatchDetails() {
    let userCompany = AuthServices.getSelectedPlant();
    let companyIdVar = userCompany.plantId;

    const formattedEndDate = endDate.endOf("day").format("YYYY-MM-DD HH:mm:ss");
    const formattedStartDate = startDate
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    let vendor = AuthServices.getVendor();
    let vendorId = vendor[0].vendor.id;

    const dateJson = {
      companyId: companyIdVar,
      vendorId: vendorId,
      fromDate: formattedStartDate,
      toDate: formattedEndDate,
    };

    console.log(dateJson);

    let undispatched = await VendorServices.getDispatchReport(dateJson);
    console.log("UnDipatched Report" + JSON.stringify(undispatched));
    if (undispatched.code === 200) {
      setAllDiapatchDetails([]);
      undispatched.responseBody.map((undispatched, index) =>
        setAllDiapatchDetails((prevState) => [
          ...prevState,
          {
            id: undispatched.planItemId,
            sno: index + 1,
            planNo: undispatched.planNo,
            planDate: moment(new Date(undispatched.planDate)).format(
              "DD-MM-YYYY"
            ),
            material:
              undispatched.material.description +
              "-" +
              undispatched.material.code,
            unitWeight: undispatched.material.weight,
            expectedDate: undispatched.expectedDate,
            requestedQuantity: undispatched.requestedQuantity,
            vendorId: undispatched.requestedQuantity,

            dispatchedQuantity: undispatched.dispatchedQuantity,
            dispatchedDate: undispatched.dispatchedOn,
            pendingQuantity:
              undispatched.requestedQuantity - undispatched.dispatchedQuantity,
            remarks: undispatched.dispatchedRemarks,
            plant: undispatched.company.name,
            vehicle: undispatched.vehicleNo ? undispatched.vehicleNo : "",
            transporter: undispatched.transporter
              ? undispatched.transporter.name
              : "",
          },
        ])
      );
      // detentionRows.shift();
    } else {
      console.log("Some thing went worng");
    }
  }

  return (
    <div>
      <Grid container style={containerStyle}>
        <h3 style={{ marginLeft: "8px" }}>Material Dispatch Report</h3>
        <Grid item xs={12} style={ItemStyle}>
          <div>
            <Paper elevation={2}>
              <div style={{ padding: "8px", display: "flex" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div style={{ margin: "8px" }}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(newValue) => setstartDate(newValue)}
                      format="DD-MM-YYYY"
                      size="small"
                    />
                  </div>
                  <div style={{ margin: "8px" }}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      format="DD-MM-YYYY"
                      onChange={(newValue) => setendDate(newValue)}
                      size="small"
                    />
                  </div>
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "5px",
                      padding: "16px",
                      margin: "8px",
                      width: "auto",
                      height: "auto",
                    }}
                    size="small"
                    onClick={getDataDispatchDetails}
                  >
                    Search
                  </Button>
                </LocalizationProvider>
              </div>
            </Paper>
          </div>
        </Grid>
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
                title="List Of Transporter"
              >
                List of Material Dispatches
              </h3>
            </div>
            <ThemeProvider theme={theme}>
              <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
                <DataGrid
                  rows={allDiapatchDetails}
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
            </ThemeProvider>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DispatchReport;
