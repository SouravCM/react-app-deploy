import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AuthServices from "../../services/AuthServices";

import AdminServices from "../../services/AdminServices.js";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { createTheme, ThemeProvider } from "@mui/material/styles";
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
    description: "Kiran",
    pagePath: "Home/career",
    iconPath: "Home/career",
    sequence: "1",
  },
];

function ManagePage() {
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
      field: "displayName",
      headerName: "Display Name",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 385,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "pagePath",
      headerName: "Page Path",
      minWidth: 300,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "iconPath",
      headerName: "Icon Path",
      minWidth: 289,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "sequence",
      headerName: "Sequence",
      minWidth: 150,
      align: "center",
      headerAlign: "center",
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

    const managePageJson = {
      id: params.row.id,

      displayName: params.row.displayName,
      name: params.row.name,
      description: params.row.description,
      pagePath: params.row.pagePath,
      iconPath: params.row.iconPath,
      sequence: params.row.sequence,
    };

    let pageResponse = await AdminServices.updateManagePage(managePageJson);

    if (pageResponse.code === 200) {
      setEditedRows({});
      setDialogTitle("Page Details Updated");
      setSuccessMessage("Page : " + params.row.name + " Updated Successfully");
      setOpen(true);
      getManagePageList();
    } else {
      if (pageResponse.code === 209) {
        setDialogTitle("Error!!");
        setSuccessMessage(pageResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitle("Network Error!!");
        setSuccessMessage("Some thing went wrong!! check your network!!");
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

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [editedRows, setEditedRows] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconPath, setIconPath] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [sequence, setSequence] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [rows, setRows] = React.useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState();

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
  const handleSequencechange = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, "");
    setSequence(newValue);
  };

  useEffect(() => {
    getManagePageList();
  }, []);
  async function getManagePageList() {
    let managePageList = await AdminServices.getAllMenuPageList();
    if (managePageList.code === 200) {
      setRows([]);
      managePageList.responseBody.map((ManagePage, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: ManagePage.id,
            seq: index++,
            name: ManagePage.name,
            description: ManagePage.description,
            iconPath: ManagePage.iconPath,
            pagePath: ManagePage.pagePath,
            sequence: ManagePage.sequence,
            displayName: ManagePage.displayName,
          },
        ])
      );
    } else {
      setDialogTitle("Getting Page list Error");
      setSuccessMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }

  const addManagePage = async (e) => {
    console.log("Button Cliked");
    if (name.length === 0) {
      console.log("name field is empty");
      setDialogTitle("Name is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }

    if (description.length === 0) {
      console.log("description field is empty");
      setDialogTitle("description is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (pagePath.length === 0) {
      console.log("pagePath field is empty");
      setDialogTitle("pagePath is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (iconPath.length === 0) {
      console.log("iconPath field is empty");
      setDialogTitle("iconPath is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (sequence.length === 0) {
      console.log("sequence field is empty");
      setDialogTitle("sequence is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    const managePageJson = {
      name: name,
      description: description,
      pagePath: pagePath,
      iconPath: iconPath,
      sequence: sequence,
      displayName: displayName,
    };

    let managePageResponse = await AdminServices.addManagePage(managePageJson);

    if (managePageResponse.code === 200) {
      setDialogTitleMessageComplete("Page Created Successfully");
      setDialogContentMessageComplete("Page : " + name + " added Successfully");
      setOpenComplete(true);
    } else {
      if (managePageResponse.code === 209) {
        setDialogTitle("Error!!");
        setSuccessMessage(managePageResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitle("Network Error!!");
        setSuccessMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };
  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Manage Page</h2>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            elevation={5}
            sx={{
              border: "2px solid #696969",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <ThemeProvider theme={formLabelsTheme}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  //justifyContent: "center",
                }}
              >
                <TextField
                  required
                  id="displayName"
                  label="Display Name"
                  variant="outlined"
                  sx={{ width: 350, marginLeft: 3 }}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <TextField
                  required
                  id="name"
                  label="Name"
                  variant="outlined"
                  sx={{ width: 350, marginLeft: 3 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}

                  //  onChange={handlenamechange}
                />
                <TextField
                  required
                  id="description"
                  label="Description"
                  variant="outlined"
                  sx={{ width: 400, marginLeft: 3 }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}

                  //onChange={handleDescriptionchange}
                />
                <TextField
                  required
                  id="pagePath"
                  label="Page Path"
                  variant="outlined"
                  sx={{ width: 300, marginLeft: 3 }}
                  value={pagePath}
                  onChange={(e) => setPagePath(e.target.value)}

                  //onChange={handlePagePathchange}
                />

                <TextField
                  required
                  id="iconPath"
                  label="Icon Path"
                  variant="outlined"
                  sx={{ width: 300, marginLeft: 3 }}
                  value={iconPath}
                  onChange={(e) => setIconPath(e.target.value)}

                  //onChange={handleiconPathchange}
                />
                <TextField
                  required
                  id="sequence"
                  label="Sequence"
                  variant="outlined"
                  sx={{ width: 250, marginLeft: 3 }}
                  value={sequence}
                  onChange={handleSequencechange}
                />

                <Button
                  variant="contained"
                  onClick={(e) => {
                    addManagePage(e);
                  }}
                  style={{
                    marginLeft: "20px",
                    width: "20%",
                    height: "48px",
                    marginBottom: "6px",
                    color: "white",
                  }}
                >
                  Add Page
                </Button>
              </Grid>
            </ThemeProvider>
          </Paper>
        </Grid>
        <h2> Page List</h2>
        <div
          style={{
            height: 400,
            width: "100%",
            overflow: "scroll",
            border: "2px solid #696969",
            borderRadius: "5px",
          }}
        >
          <DataGrid
            //rows={tableData}
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
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {successMessage}
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
    </div>
  );
}

export default ManagePage;
