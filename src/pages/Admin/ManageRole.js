import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid-pro";

import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import Button from "@mui/material/Button";

import AdminServices from "../../services/AdminServices.js";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthServices from "../../services/AuthServices";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

// const rows = [
//   { id: 1, name: "12345", discription: "Kiran", dashbaordPath: "Kiran" },
// ];

function ManageRole() {
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
      minWidth: 250,
      align: "center",
      headerAlign: "center",
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "description",
      headerName: "Discription",
      headerAlign: "center",
      minWidth: 350,
      align: "center",
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dashboardPagePath",
      headerName: "Dashbaord Path",
      minWidth: 350,
      align: "center",
      headerAlign: "center",
      editable: true,
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
    //const id = params.id;

    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const manageRoleJson = {
      id: params.row.id,
      name: params.row.name,
      description: params.row.description,
      dashboardPagePath: params.row.dashboardPagePath,
    };

    let roleResponse = await AdminServices.updateManageRole(manageRoleJson);

    if (roleResponse.code === 200) {
      setEditedRows({});
      setDialogTitle("Role Details Updated");
      setSuccessMessage("Role  " + params.row.name + " Updated Successfully");
      setOpen(true);
      getRoleList();
    } else {
      if (roleResponse.code === 209) {
        setDialogTitle("Error!!");
        setSuccessMessage(roleResponse.responseBody);
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

  const [rows, setRows] = React.useState([]);

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [editedRows, setEditedRows] = useState({});

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dashboardPagePath, setdashboardPagePath] = useState("");

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
  // const handlenamechange = (event) => {
  //   const { value } = event.target;
  //   const newValue = value.replace(/[^A-Za-z]/g, "");
  //   setName(newValue);
  // };

  useEffect(() => {
    getRoleList();
  }, []);

  async function getRoleList() {
    let roleList = await AdminServices.getAllRoleList();
    console.log(roleList);

    if (roleList.code === 200) {
      setRows([]);
      roleList.responseBody.map((role, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: role.id,
            seq: index++,

            name: role.name,
            description: role.description,
            dashboardPagePath: role.dashboardPagePath,
          },
          // console.log(role),
        ])
      );
    } else {
      setDialogTitle("Getting role list Error");
      setSuccessMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }

  const addRole = async (e) => {
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
      setDialogTitle("Discription is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (dashboardPagePath.length === 0) {
      console.log("dashboardPagePath field is empty");
      setDialogTitle("dashboardPagePath is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    const manageRoleJson = {
      name: name,
      description: description,
      dashboardPagePath: dashboardPagePath,
    };

    let manageRoleResponse = await AdminServices.addManageRole(manageRoleJson);

    if (manageRoleResponse.code === 200) {
      setDialogTitleMessageComplete("Role Created Successfully");
      setDialogContentMessageComplete("Role: " + name + " added Successfully");
      setOpenComplete(true);
    } else {
      if (manageRoleResponse.code === 209) {
        setDialogTitle("Error!!");
        setSuccessMessage(manageRoleResponse.responseBody);
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
        <h2>Manage Role</h2>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              padding: "8px",
              border: "2px solid #696969",
              borderRadius: "5px",
            }}
          >
            <ThemeProvider theme={formLabelsTheme}>
              <Grid
                item
                xs={8}
                style={{
                  display: "flex",
                  alignItems: "center",
                  //justifyContent: "center",
                }}
              >
                <TextField
                  required
                  id="name"
                  label="Name"
                  variant="outlined"
                  sx={{ width: 200, marginLeft: 3 }}
                  value={name}
                  //  onChange={handlenamechange}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  id="discription"
                  label="Description"
                  variant="outlined"
                  sx={{ width: 400, marginLeft: 3 }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  //onChange={handleDiscriptionchange}
                />
                <TextField
                  required
                  id="dashboardPagePath"
                  label="Dashboard Path"
                  variant="outlined"
                  sx={{ width: 200, marginLeft: 3 }}
                  value={dashboardPagePath}
                  onChange={(e) => setdashboardPagePath(e.target.value)}
                  //onChange={handledashboardPagePathchange}
                />

                <Button
                  variant="contained"
                  onClick={(e) => {
                    addRole(e);
                  }}
                  style={{
                    marginLeft: "20px",
                    width: "15%",
                    height: "43px",

                    marginBottom: "6px",
                    color: "white",
                  }}
                >
                  Add Role
                </Button>
              </Grid>
            </ThemeProvider>
          </Paper>
        </Grid>
        <h2>Role List</h2>
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

export default ManageRole;
