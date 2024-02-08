import React, { useEffect, useRef, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
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

import PacmanLoader from "react-spinners/PacmanLoader";

import Button from "@mui/material/Button";
import GateInOutService from "../../services/GateInOutService";
import moment from "moment";
import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteForeverIcon,
  GridDeleteIcon,
  GridToolbar,
} from "@mui/x-data-grid";

import SaveIcon from "@mui/icons-material/Save";
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
import transporterService from "../../services/TransporterService";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import authService from "../../services/AuthServices";

// set the locale globally
dayjs.locale("en");

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
  width: "30%",
  height: "130px",
  border: "2px solid #696969",
  borderRadius: "5px",
  paddingLeft: "0px",
};

const ItemStyle1 = {
  padding: "4px",
  margin: "4px",
  border: "2px solid #696969",
  borderRadius: "5px",
  paddingLeft: "0px",
  backgroundColor: "white",
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

function EditToolbar(props) {
  return (
    <GridToolbarContainer>
      <Button
        color="success"
        startIcon={<SaveIcon />}
        onClick={props.handleGenerateDebit}
      >
        Update
      </Button>
      <Button
        color="error"
        startIcon={<SaveIcon />}
        onClick={props.handleCancel}
      >
        Cancel Update
      </Button>
    </GridToolbarContainer>
  );
}

function EGenerateDebitNote() {
  const location = useLocation();
  const data = location.state;
  const [debitNoteNum, setDebitNoteNum] = useState("");
  const [invoiceNum, setInvoiceNum] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [debitDate, setDebitDate] = useState(dayjs());
  const [invoiceDate, setInvoiceDate] = useState(dayjs());
  const [gst, setGst] = useState("");
  const [gstType, setGstType] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [transporter, setTransporter] = useState("");
  const [rows, setRows] = useState([]);
  const inputRefs = useRef({});
  const [loading, setLoading] = useState(false);
  const [complited, setComplited] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    if (complited) {
      navigate("/MainLayout/ManageDebitNote");
    }
  };

  useEffect(() => {
    setInvoiceId(data);
    getDebitNote();
  }, []);

  async function getDebitNote() {
    let debitNoteDataResponce = await transporterService.getDebitNoteById(data);

    setGst(debitNoteDataResponce.responseBody.gstPercentage);
    setGstType(debitNoteDataResponce.responseBody.gstType);
    setInvoiceDate(
      dayjs(new Date(debitNoteDataResponce.responseBody.invoice.invoiceDate))
    );
    setDebitDate(
      dayjs(new Date(debitNoteDataResponce.responseBody.debtNoteDate))
    );
    setTransporter(debitNoteDataResponce.responseBody.transporter.name);
    setInvoiceNum(debitNoteDataResponce.responseBody.invoice.invoiceNo);
    setDebitNoteNum(debitNoteDataResponce.responseBody.debitNoteNum);
    setRows([]);
    debitNoteDataResponce.responseBody.items.map((debit, index) =>
      setRows((prevState) => [
        ...prevState,
        {
          id: index + 1,
          seq: index + 1,
          vehicle: debit.vehicle.registrationNo,
          trip: debit.tripNo,
          fromDate: debit.startDate ? new Date(debit.startDate) : "",
          toDate: debit.endDate ? new Date(debit.endDate) : "",
          rateType: debit.rateType,
          distance: debit.distance,
          rate: debit.rate,
          aCost: debit.actualCost,
          tripType: debit.tripType,
          tripNo: debit.tripNo,
          tripId: debit.tripId,
          vehicleId: debit.vehicle.id,
          remarks: debit.remarks,
        },
      ])
    );
  }

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
      field: "vehicle",
      headerName: "Vehicle",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",

      type: "singleSelect",
    },
    {
      field: "tripType",
      headerName: "Trip Type",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "tripNo",
      headerName: "Trip No",
      align: "center",
      headerAlign: "center",
      flex: 2,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "fromDate",
      headerName: "From Date",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",

      type: "date",
      renderCell: (params) =>
        params.row.fromDate
          ? moment(params.row.fromDate).format("DD-MM-YYYY")
          : "",
    },
    {
      field: "toDate",
      headerName: "To Date",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",

      type: "date",
      renderCell: (params) =>
        params.row.toDate ? moment(params.row.toDate).format("DD-MM-YYYY") : "",
    },
    {
      field: "distance",
      headerName: "Distance",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "rateType",
      headerName: "Rate Type",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",

      type: "singleSelect",
      valueOptions: ["KM", "TRIP"],
    },
    {
      field: "rate",
      headerName: "Rate",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "aCost",
      headerName: "Actual Cost",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="number"
            ref={(el) => (inputRefs.current[params.row.id] = el)}
            data-id={params.row.id}
            value={params.row.aCost.toString()}
            onChange={(e) => handleQtyChange(params.row.id, e.target.value)}
            //  onBlur={(e) =>
            //   handleQtyChange(params.row.id, e.target.value)}
            style={{ width: "70px", textAlign: "center" }}
          />
        </div>
      ),
    },

    {
      field: "remarks",
      headerName: "Remarks",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            ref={(el) => (inputRefs.current[params.row.id] = el)}
            data-id={params.row.id}
            value={params.row.remarks.toString()}
            onChange={(e) => handleRemarksChange(params.row.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, params.row.id)}
            onFocus={(e) => e.stopPropagation()} // Prevent the focus event from reaching the parent cell
            style={{ width: "70px", textAlign: "center", whiteSpace: "nowrap" }}
          />
        </div>
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      getActions: (params) => {
        const id = params.id;

        return [
          <GridActionsCellItem
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params)}
            color="error"
          />,
        ];
      },
    },
  ];

  const handleDeleteClick = (params) => {
    const id = params.id;
    setRows(rows.filter((row) => row.id !== id));

    const updatedSEQRows = rows.filter((row) => row.id !== id);
    setRows(updatedSEQRows);

    // Update the serial number (S.No) for the remaining rows
    const updatedRows = updatedSEQRows.map((row, index) => ({
      ...row,
      seq: index + 1,
    }));

    setRows(updatedRows);
  };

  const handleQtyChange = (id, value) => {
    setRows((prevMaterials) => {
      const updatedMaterials = prevMaterials.map((material) => {
        if (material.id === id) {
          const aCost = parseFloat(value, 10) || 0;

          return {
            ...material,
            aCost,
          };
        }
        return material;
      });

      return updatedMaterials;
    });
  };

  const handleRemarksChange = (id, value) => {
    if (value === " ") {
      setRows((prevMaterials) => {
        const updatedMaterials = prevMaterials.map((material) => {
          if (material.id === id) {
            const remarks = material.remarks + " ";

            return {
              ...material,
              remarks,
            };
          }
          return material;
        });

        return updatedMaterials;
      });
    } else {
      setRows((prevMaterials) => {
        const updatedMaterials = prevMaterials.map((material) => {
          if (material.id === id) {
            const remarks = value;

            return {
              ...material,
              remarks,
            };
          }
          return material;
        });

        return updatedMaterials;
      });
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      const nextRowIndex = id + 1;
      const nextRow = rows.find((row) => row.id === nextRowIndex);

      if (nextRow) {
        // Move to the next row
        inputRefs.current[nextRowIndex].focus();
      } else {
        // If there is no next row, you may want to handle it according to your requirements
      }
    } else if (e.key === " ") {
      e.preventDefault(); // Prevent the default action for space key press
      e.stopPropagation(); // Stop propagation to prevent it from reaching the DataGrid
      handleRemarksChange(id, " ");
    }
  };

  const handleGenerateDebit = async () => {
    setLoading(true);
    const plant = authService.getSelectedPlant();
    const plantId = plant.plantId;
    let transporter = AuthServices.getTransporter();
    let transporterId = transporter[0].transporter.id;
    let userId;
    let userDetails = AuthServices.getUserDetails();
    if (userDetails) {
      userId = userDetails.id;
    } else {
      setLoading(false);
      //console.log("User Details is not defiend");
      return;
    }
    const transformedItems = rows.map((row) => ({
      tripType: row.tripType,
      tripId: row.tripId,
      tripNo: row.trip,
      vehicleId: row.vehicleId,
      startDate: moment(new Date(row.fromDate))
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(new Date(row.toDate))
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      distance: row.distance,
      rateType: row.rateType,
      rate: row.rate,
      actualCost: row.aCost,
      remarks: row.remarks,
    }));
    const debitSaveData = {
      id: data,
      debitNoteNum: debitNoteNum,
      companyId: plantId,
      transporterId: transporterId,
      debtNoteDate: moment(new Date(debitDate))
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      gstType: gstType,
      gstPercentage: gst,
      createdBy: userId,
      invoiceId: invoiceId,
      items: transformedItems,
    };

    //    console.log("JSON" + JSON.stringify(debitSaveData));
    let debitSavedData = await transporterService.addDebitNote(debitSaveData);
    console.log("Responce" + JSON.stringify(debitSavedData));
    if (debitSavedData.code === 209) {
      setLoading(false);
      setDialogTitleMessage("Debit Note Not Updated");
      setDialogContentMessage(debitSavedData.responseBody);
      setOpen(true);
    } else if (debitSavedData.code === 200) {
      setLoading(false);
      setDialogTitleMessage("Debit Note Updated Successfully");
      setDialogContentMessage("");
      setOpen(true);
      setComplited(true);
    } else {
      setLoading(false);
      setDialogTitleMessage("Error!!");
      setDialogContentMessage("unable to update debit note check your network");
      setOpen(true);
    }
  };

  const handleCancel = async () => {
    navigate("/MainLayout/ManageDebitNote");
  };
  return (
    <div>
      {loading && (
        <div style={overlayStyle}>
          <PacmanLoader color={"#525f7f"} loading={loading} size={30} />
        </div>
      )}
      <Grid container style={containerStyle}>
        <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>
          Edit Debit Note
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
                <TextField
                  id="invoiceNo"
                  label="Invoice NO"
                  InputLabelProps={{ shrink: true }}
                  style={textStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={invoiceNum}
                />
              </div>
            </FormControl>
            {/* <FormControl sx={formControlStyle}>
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
                    //onClick={getDataGate}
                  >
                    Search
                  </Button>
                </div>
              </FormControl> */}
          </Paper>
        </Grid>

        <Grid item xs={12} style={ItemStyle}>
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
            }}
            sx={{
              width: "99%",
              overflow: "hidden",
              padding: "8px",
              border: "2px solid #696969",
              borderRadius: "5px",
            }}
          >
            <ThemeProvider theme={formLabelsTheme}>
              <TextField
                id="debitNoteNum"
                label="Debit Note No"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                style={textStyle}
                InputProps={{
                  readOnly: true,
                }}
                value={debitNoteNum}
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginTop: "-6px",
                  marginLeft: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Debit Note Date"
                      value={debitDate}
                      onChange={(newValue) => setDebitDate(newValue)}
                      format="DD-MM-YYYY"
                      style={textStyle}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginTop: "-6px",
                  marginLeft: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Invoice Date"
                      value={invoiceDate}
                      format="DD-MM-YYYY"
                      style={textStyle}
                      disabled
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <TextField
                id="gst"
                label="GST"
                InputLabelProps={{ shrink: true }}
                style={textStyle}
                InputProps={{
                  readOnly: true,
                }}
                value={gst}
              />
              <TextField
                id="gsttType"
                label="GST Type"
                InputLabelProps={{ shrink: true }}
                style={textStyle}
                InputProps={{
                  readOnly: true,
                }}
                value={gstType}
              />
              <TextField
                id="transporter"
                label="Transporter"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                style={textStyle}
                InputProps={{
                  readOnly: true,
                }}
                value={transporter}
              />
            </ThemeProvider>
          </Paper>
        </Grid>

        <div style={{ width: "100%" }}>
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
              slots={{
                toolbar: () => (
                  <EditToolbar
                    handleGenerateDebit={handleGenerateDebit}
                    handleCancel={handleCancel}
                  />
                ),
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
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
              //   editMode="row"
              //   rowModesModel={rowModesModel}
              //   onRowModesModelChange={handleRowModesModelChange}
              //   onRowEditStart={handleRowEditStart}
              //   onRowEditStop={handleRowEditStop}
              //   processRowUpdate={processRowUpdate}
              // isCellEditable={(params) => params.row.id > 5}
            />
          </div>
        </div>
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
    </div>
  );
}
export default EGenerateDebitNote;
