import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import TextField from "@mui/material/TextField";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Button from "@mui/material/Button";
import AdminServices from "../../services/AdminServices.js";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthServices from "../../services/AuthServices";
import storeServices from "../../services/StoreServices.js";
import {
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid-pro";

import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

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

const rows = [
  {
    id: 1,
    name: "12345",
    latitude: "Kiran",
    longitude: "Kiran",
    radius: "22",
    status: "Active",
  },
];

function StoreMaster() {
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
      field: "name",
      headerName: "Name",
      minWidth: 300,
      align: "center",
      headerAlign: "center",
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "latitude",
      headerName: "Latitude",
      headerAlign: "center",
      minWidth: 200,
      align: "center",
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "longitude",
      headerName: "Longitude",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "radius",
      headerName: "Radius",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flexGrow: 1,
      align: "center",
      editable: true,
      type: "singleSelect",
      valueOptions: ["Active", "Inactive"],
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
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

    const storeUpdateJson = {
      id: params.row.id,
      name: params.row.name,
      latitude: params.row.latitude,
      longitude: params.row.longitude,
      radius: params.row.radius,
      status: params.row.status,
      company: { id: plantId },
    };
    //console.log("request=== " + JSON.stringify(storeUpdateJson));

    let updateStoreResponse = await storeServices.updateStore(storeUpdateJson);

    if (updateStoreResponse.code === 200) {
      setEditedRows({});
      setDialogTitleMessage("Store Details Updated");
      setDialogContentMessage(
        "Store : " + params.row.name + " Updated Successfully"
      );
      setOpen(true);
      getStoreMasterList();
    } else {
      if (updateStoreResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(updateStoreResponse.responseBody);
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

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [editedRows, setEditedRows] = useState({});
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");
  const [rows, setRows] = React.useState([]);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);

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

  const handleNamechange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z ]/g, "");
    setName(newValue);
  };
  const handleLatitudechange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^0-9.]/g, "");
    setLatitude(newValue);
  };
  const handleLongitudechange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^0-9.]/g, "");
    setLongitude(newValue);
  };
  const handleRadiuschange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^0-9.]/g, "");
    setRadius(newValue);
  };

  useEffect(() => {
    getStoreMasterList();
  }, []);
  async function getStoreMasterList() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    let manageStoreMaster = await storeServices.getStoreList(plantId);
    if (manageStoreMaster.code === 200) {
      setRows([]);
      manageStoreMaster.responseBody.map((manageStore, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: manageStore.id,
            seq: index++,
            name: manageStore.name,
            latitude: manageStore.latitude,
            longitude: manageStore.longitude,
            radius: manageStore.radius,
            status: manageStore.status,
          },
        ])
      );
    } else {
      setDialogTitleMessage("Getting Store list Error");
      setDialogContentMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }

  const addStore = async (e) => {
    const plant = AuthServices.getSelectedPlant();
    const plantId = plant.plantId;
    //console.log("Button Cliked");
    if (name.length === 0) {
      // console.log("name field is empty");
      setDialogTitleMessage("Name is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }

    if (latitude.length === 0) {
      // console.log("latitude field is empty");
      setDialogTitleMessage("latitude is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    if (longitude.length === 0) {
      //console.log("longitude field is empty");
      setDialogTitleMessage("longitude is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    if (radius.length === 0) {
      // console.log("radius field is empty");
      setDialogTitleMessage("radius is empty");
      setDialogContentMessage("");
      setOpen(true);
      return;
    }
    const manageStoreJson = {
      name: name,
      latitude: latitude,
      longitude: longitude,
      radius: radius,
      status: "Active",
      company: { id: plantId },
    };

    let storeResponse = await storeServices.addStore(manageStoreJson);

    if (storeResponse.code === 200) {
      setDialogTitleMessageComplete("Store Added Success");
      setDialogContentMessageComplete("Store: " + name + " added Successfully");
      setOpenComplete(true);
    } else {
      if (storeResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(storeResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Store Master</h2>
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
                xs={8}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  required
                  id="name"
                  label="Name"
                  variant="outlined"
                  sx={{ minWidth: 200, marginLeft: 2 }}
                  value={name}
                  //onChange={(e) => setName(e.target.value)}
                  onChange={handleNamechange}
                />
                <TextField
                  required
                  id="latitude"
                  label="Latitude"
                  variant="outlined"
                  sx={{ minWidth: 150, marginLeft: 3 }}
                  value={latitude}
                  onChange={handleLatitudechange}
                />
                <TextField
                  required
                  id="longitude"
                  label="Longitude"
                  variant="outlined"
                  sx={{ minWidth: 150, marginLeft: 3 }}
                  value={longitude}
                  onChange={handleLongitudechange}
                />
                <TextField
                  required
                  id="radius"
                  label="Radius"
                  variant="outlined"
                  sx={{ minWidth: 150, marginLeft: 3 }}
                  value={radius}
                  onChange={handleRadiuschange}
                />

                <Button
                  variant="contained"
                  onClick={(e) => {
                    addStore(e);
                  }}
                  style={{
                    marginLeft: "20px",
                    minWidth: "10%",
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
        <h2>Store List</h2>

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
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
          />
        </div>
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
              <Button onClick={handleCloseComplete} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </div>
  );
}

export default StoreMaster;
