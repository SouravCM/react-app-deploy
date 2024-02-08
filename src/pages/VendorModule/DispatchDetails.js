import React, { useEffect, useState, useRef } from "react";
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
import Typography from "@mui/material/Typography";

import VehicleService from "../../services/VehicleService";
import Autocomplete from "@mui/material/Autocomplete";
import AuthServices from "../../services/AuthServices";
import VendorServices from "../../services/VendorServices";

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
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid-pro";

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

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

// set the locale globally
dayjs.locale("en");

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
};

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const formControlStyle = { m: 3, minWidth: 200, marginTop: "30px" };

function VendorDashboard() {
  const nameInputRef = useRef();
  const [planListAPI, setPlanListAPI] = useState([{}]);

  const [rows, setRows] = useState([]);

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [editedRows, setEditedRows] = useState({});

  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [dilogContentMessageColor, setDilogContentMessageColor] = useState();

  const theme = createTheme({
    components: {
      MuiDataGrid: {
        defaultProps: {
          density: "compact",
        },
      },
    },
  });

  const handleEditRowsModelChange = (model) => {
    if (model.editRow !== undefined) {
      // Get the focused column field
      const focusedColumn = model.columns[model.editRow.cellMode].field;
      console.log("FOCUED:" + focusedColumn);
      // Check if the focused column is 'name' (adjust the field name accordingly)
      if (focusedColumn === "dispatchedQuantity") {
        // Focus on the name input field
        nameInputRef.current?.focus();
      }
    }
  };
  const handleClose = () => {
    setDilogContentMessageColor("");
    setOpen(false);
  };

  const [openError, setopenError] = React.useState(false);

  const handleCloseError = () => {
    setopenError(false);
  };

  const [dialogErrorTitleMessage, setDialogErrorTitleMessage] = useState();
  const [dialogErrorContentMessage, setDialogErrorContentMessage] = useState();

  const defaultProps = {
    options: planListAPI,
    getOptionLabel: (option) => option.label,
  };

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
    const userData = AuthServices.getUserDetails();

    const dispatchedJson = {
      id: params.row.id,
      dispatchedBy: userData.id,
      dispatchedQuantity: params.row.dispatchedQuantity,
      dispatchedRemarks: params.row.remarks,
    };

    if (params.row.dispatchedQuantity > params.row.requestedQuantity) {
      setDialogTitleMessage("Error");
      setDialogContentMessage(
        "Dispatch Quantity must be less than or equal to requested quantity"
      );
      setEditedRows({});
      setOpen(true);
      return;
    }

    let dispatchDetails = await VendorServices.updateVendorDispatchDetails(
      dispatchedJson
    );

    if (dispatchDetails.code === 200) {
      setEditedRows({});
      getUndispatchedMaterials();
      setDialogTitleMessage("Dispatch Details Updated");
      setDialogContentMessage("");
      if (params.row.dispatchedQuantity < params.row.requestedQuantity) {
        setDialogTitleMessage("Dispatch Details Updated");
        setDialogContentMessage(
          "Supplier must borne the cost of shipping pending quantites in the plan"
        );
        setDilogContentMessageColor("error");
      }

      setOpen(true);
    } else {
      if (dispatchDetails.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(dispatchDetails.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }

    console.log("dispatchedJson " + JSON.stringify(dispatchedJson));
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

  useEffect(() => {
    getUndispatchedMaterials();
  }, []);

  async function getUndispatchedMaterials() {
    let userCompany = AuthServices.getSelectedPlant();
    let vendor = AuthServices.getVendor();

    let vendorId = vendor[0].vendor.id;
    let companyIdVar = userCompany.plantId;

    const dateJson = {
      companyId: companyIdVar,
      vendorId: vendorId,
    };

    let undispatched = await VendorServices.getVendorMaterialList(dateJson);
    console.log("Respnse:" + JSON.stringify(undispatched));
    if (undispatched.code === 200) {
      setRows([]);
      undispatched.responseBody.map((undispatched, index) =>
        setRows((prevState) => [
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
            remarks: "",
            dispatchedQuantity: "",
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
      console.log("Error" + JSON.stringify(undispatched));
      console.log("Some thing went worng");
    }
  }

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
      minWidth: 150,
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
      minWidth: 200,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dispatchedQuantity",
      headerName: "Dispatched Quantity",
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "number",
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

  const csvOptions = { fileName: "Undispatched Details" };

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
          Dispatch Material
        </h2>

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
                Undispatched Materials List
              </h3>
            </div>

            <ThemeProvider theme={theme}>
              <div style={{ height: 450, width: "100%", overflow: "scroll" }}>
                <DataGrid
                  rows={rows}
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
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  defaultDensity="Compact"
                />
              </div>
            </ThemeProvider>
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
                <DialogContentText
                  id="alert-dialog-description"
                  color={dilogContentMessageColor}
                >
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

export default VendorDashboard;
