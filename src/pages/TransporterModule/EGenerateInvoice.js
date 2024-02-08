import React, { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete";
import AuthServices from "../../services/AuthServices";

import Button from "@mui/material/Button";

import moment from "moment";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PacmanLoader from "react-spinners/PacmanLoader";

import dayjs from "dayjs";
import "dayjs/locale/en"; // load locale data

import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";

import {
  GridToolbarContainer,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";

import transporterService from "../../services/TransporterService";
import vehicleServiceObj from "../../services/VehicleService";
import authService from "../../services/AuthServices";

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

const ItemStyle1 = {
  padding: "4px",
  margin: "4px",
  border: "2px solid #696969",
  borderRadius: "5px",
  paddingLeft: "0px",
  backgroundColor: "white",
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

const formControlStyle = { m: 2, minWidth: 200, marginTop: "30px" };

const paperStyle = {
  width: "30%",
  height: "130px",
  border: "2px solid #696969",
  borderRadius: "5px",
  paddingLeft: "0px",
};

function EditToolbar(props) {
  return (
    <GridToolbarContainer>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={props.handelClickAdd}
      >
        Add Trip
      </Button>
      <Button
        color="success"
        startIcon={<SaveIcon />}
        onClick={props.handleUpdateInvoice}
      >
        Update Invoice
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

function EGenerateInvoice() {
  const location = useLocation();
  const data = location.state;
  const [invoiceId, setInvoiceId] = useState();
  const [vehicleList, setVehicleList] = useState([]);
  const inputRefs = useRef({});
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [invoiceDate, setInvoiceDate] = useState(dayjs());
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [gst, setGst] = useState("");
  const [gstType, setGstType] = useState("");
  const [loading, setLoading] = useState(false);
  const [complited, setComplited] = useState(false);
  const navigate = useNavigate();
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [dueDate, setDueDate] = useState(dayjs());

  const handleClose = () => {
    setOpen(false);
    if (complited) {
      navigate("/MainLayout/ManageInvoice");
    }
  };

  const [gstList, setgstList] = useState([
    { name: "IGST" },
    { name: "CGST & SGST" },
  ]);
  const [gstTypeList, setGstTypeList] = useState([
    { name: "15" },
    { name: "12" },
    { name: "18" },
    { name: "28" },
  ]);
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
      flex: 1.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
      type: "singleSelect",
      valueOptions: vehicleList.map((vehicle) => vehicle.number),
    },
    {
      field: "trip",
      headerName: "Trip",
      align: "center",
      headerAlign: "center",
      flex: 2,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "fromDate",
      headerName: "From Date",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
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
      editable: true,
      type: "date",
      renderCell: (params) =>
        params.row.toDate ? moment(params.row.toDate).format("DD-MM-YYYY") : "",
    },
    {
      field: "rateType",
      headerName: "Rate Type",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
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
      editable: true,
    },
    {
      field: "distance",
      headerName: "Distance",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "eCost",
      headerName: "Estimated Cost",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
      editable: true,
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

        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(params)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(params)}
              color="inherit"
            />,
          ];
        }

        if (params && params.row.edit) {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={() => handleEditClick(params)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(params)}
              color="inherit"
            />,
          ];
        } else {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => handleDeleteClick(params)}
              color="inherit"
            />,
          ];
        }
      },
    },
  ];

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

  useEffect(() => {
    getVehicalById();
  }, []);

  useEffect(() => {
    setInvoiceId(data);
    getformInvoice();
  }, []);

  const gstDropdown = {
    options: gstList,
    getOptionLabel: (option) => option.name,
  };

  const gstTypeDropdown = {
    options: gstTypeList,
    getOptionLabel: (option) => option.name,
  };

  const getformInvoice = async (e) => {
    let invoiceData = await transporterService.getInvoiceById(data);
    setInvoiceDate(dayjs(new Date(invoiceData.responseBody.invoiceDate)));
    setDueDate(dayjs(new Date(invoiceData.responseBody.dueDate)));
    setInvoiceNumber(invoiceData.responseBody.invoiceNo);
    if (invoiceData.code === 200) {
      setRows([]);
      invoiceData.responseBody.items.map((invoice, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: index + 1,
            seq: index + 1,
            vehicle: invoice.vehicle.registrationNo,
            trip: invoice.tripNo,
            fromDate: invoice.startDate ? new Date(invoice.startDate) : "",
            toDate: invoice.endDate ? new Date(invoice.endDate) : "",
            rateType: invoice.rateType,
            distance: invoice.distance,
            rate: invoice.rate,
            eCost: invoice.estimatedCost,
            aCost: invoice.actualCost ? invoice.actualCost : 0,
            edit: invoice.tripType === "SYSTEM" ? false : true,
            vehicleId: invoice.vehicle.id,
            tripType: invoice.tripType,
            tripId: invoice.tripId,
          },
        ])
      );
    } else if (invoiceData.code === 208) {
      setDialogTitleMessage("No Data");
      setDialogContentMessage("");
      setOpen(true);
    } else {
      setDialogTitleMessage("Error");
      setDialogContentMessage("");
      setOpen(true);
    }
  };

  // data grid related Block start
  const handelClickAdd = () => {
    const id = nanoid();
    setRows((prevRows) => [
      ...prevRows,
      {
        id,
        seq: prevRows.length + 1,
        vehicle: "",
        trip: "",
        fromDate: "",
        toDate: "",
        rateType: "",
        rate: 0,
        distance: 0,
        eCost: 0,
        aCost: 0,
        edit: true,
        vehicleId: "",
        tripType: "ADDITIONAL",
        tripId: 0,
      },
    ]);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "vehicle" },
    });
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const processRowUpdate = (newRow) => {
    // Find the selected vehicle object in the vehicleList
    const selectedVehicle = vehicleList.find(
      (vehicle) => vehicle.number === newRow.vehicle
    );

    // Create an updatedRow with the vehicleId
    const updatedRow = {
      ...newRow,
      isNew: false,
      vehicleId: selectedVehicle ? selectedVehicle.id : null,
    };

    // Update the rows with the new data
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    // Return the updatedRow
    return updatedRow;
  };

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
  const handleSaveClick = async (params) => {
    const id = params.id;
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log("New Row", params);
  };
  const handleCancelClick = (params) => {
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
  const handleEditClick = async (params) => {
    const id = params.id;
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  // data grid releted block end

  async function getVehicalById() {
    let transporter = AuthServices.getTransporter();
    //console.log("USers" + JSON.stringify(transporter));
    let transporterId = transporter[0].transporter.id;
    let vehicleListAPI = await vehicleServiceObj.getVehicleDetailsByTransporter(
      201
    );
    if (vehicleListAPI.code === 200) {
      const transformedVehicleList = vehicleListAPI.responseBody.map(
        (vehicle) => ({
          id: vehicle.id,
          number: vehicle.registrationNo,
        })
      );
      setVehicleList(transformedVehicleList);
    } else {
      setDialogTitleMessage("Getting Vehicle list Error");
      setDialogContentMessage("No Vehicle Rigistered For You");
      setOpen(true);
    }
  }
  const handleUpdateInvoice = async () => {
    setLoading(true);
    if (gst.length === 0) {
      setDialogTitleMessage("GST is empty");
      setDialogContentMessage("Selet a GST");
      setOpen(true);
      setLoading(false);
      return;
    }
    if (gstType.length === 0) {
      setDialogTitleMessage("GST Type is empty");
      setDialogContentMessage("Selet a GST Type");
      setOpen(true);
      setLoading(false);
      return;
    }
    const plant = authService.getSelectedPlant();
    const plantId = plant.plantId;
    let transporter = AuthServices.getTransporter();

    let transporterId = transporter[0].transporter.id;
    let userId;
    let userDetails = AuthServices.getUserDetails();
    if (userDetails) {
      userId = userDetails.id;
    } else {
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
      estimatedCost: row.eCost,
      actualCost: row.aCost,
    }));

    const invoiceSaveData = {
      id: data,
      invoiceNo: invoiceNumber,
      companyId: plantId,
      transporterId: transporterId,
      invoiceDate: moment(new Date(invoiceDate))
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      gstType: gstType,
      gstPercentage: gst,
      createdBy: userId,
      items: transformedItems,
      dueDate: moment(new Date(dueDate))
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
    };
    console.log("JSON" + JSON.stringify(invoiceSaveData));

    let invoiceSavedData = await transporterService.updateInvoice(
      invoiceSaveData
    );
    console.log("Responce" + JSON.stringify(invoiceSavedData));
    if (invoiceSavedData.code === 209) {
      setLoading(false);
      setDialogTitleMessage("Invoice Not Updated Created");
      setDialogContentMessage(invoiceSavedData.responseBody);
      setOpen(true);
    } else if (invoiceSavedData.code === 200) {
      setLoading(false);
      setDialogTitleMessage("Invoice Updated Successfully");
      setDialogContentMessage("");
      setOpen(true);
      setComplited(true);
    } else {
      setLoading(false);
      setDialogTitleMessage("Error!!");
      setDialogContentMessage("unable to update invoice check your network");
      setOpen(true);
    }
  };
  const handleCancel = async () => {
    navigate("/MainLayout/ManageInvoice");
  };
  return (
    <div>
      {loading && (
        <div style={overlayStyle}>
          <PacmanLoader color={"#525f7f"} loading={loading} size={30} />
        </div>
      )}
      <Grid container style={containerStyle}>
        <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>Edit Invoice</h2>
        <Grid item xs={12} style={ItemStyle1}>
          <Paper
            sx={{
              width: "98%",
              height: "80%",
              padding: "0px",
              display: "flex",
              margin: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                marginTop: "-8px",
                marginLeft: "10px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Invoice Date"
                    value={invoiceDate}
                    onChange={(newValue) => setInvoiceDate(newValue)}
                    format="DD-MM-YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <Autocomplete
              {...gstDropdown}
              disablePortal
              id="gst"
              sx={{ width: "20%", marginLeft: "10px" }}
              onChange={(e, r) => {
                if (r != null) {
                  setGstType(r.name);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <span>
                      GST <span style={{ color: "red" }}> *</span>
                    </span>
                  }
                />
              )}
            />{" "}
            <Autocomplete
              {...gstTypeDropdown}
              disablePortal
              id="routeListDropDown"
              sx={{ width: "20%", marginLeft: "10px" }}
              onChange={(e, r) => {
                if (r != null) {
                  setGst(r.name);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <span>
                      GST Rate <span style={{ color: "red" }}> *</span>
                    </span>
                  }
                />
              )}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "nowrap",
                marginTop: "-8px",
                marginLeft: "10px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Due Date"
                    value={dueDate}
                    onChange={(newValue) => setDueDate(newValue)}
                    format="DD-MM-YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
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
                    handelClickAdd={handelClickAdd}
                    handleUpdateInvoice={handleUpdateInvoice}
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
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
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

export default EGenerateInvoice;
