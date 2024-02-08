import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

import AdminServices from "../../services/AdminServices.js";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AuthServices from "../../services/AuthServices";

import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid-pro";

import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
const formControlStyle = { m: 1, minWidth: 200, marginLeft: 3 };

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};
const ItemStyleAutoComplite = {
  padding: "5px",
  margin: "4px",
  minWidth: "20%",
};

const rows = [
  {
    id: 1,
    name: "12345",
    username: "Kiran",
    password: "Home/career",
    email: "Home/career",
    mobileNo: "1",
    status: "Active",
  },
];

function ManageUser() {
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
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "password",
      headerName: "Password",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "emailId",
      headerName: "Email",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "mobile",
      headerName: "Mobile No",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 200,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        const id = params.id;
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return (
            <Autocomplete
              options={roleListAPI}
              getOptionLabel={(option) => option.label}
              value={
                params && params.value
                  ? roleListAPI.find((role) => role.label === params.value)
                  : null
              }
              onChange={(e, newValue) => handleRoleChange(e, params, newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Role" variant="outlined" />
              )}
            />
          );
        } else {
          return params.value; // Display the role value as text when not in edit mode
        }
      },
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

  const handleRoleChange = (event, params, newValue) => {
    const id = params.id;

    if (newValue) {
      let newRoleValue = newValue.label;
      setRows((prevRows) =>
        prevRows.map((row) => {
          if (row.id === id) {
            return { ...row, role: newRoleValue, roleId: newValue.id };
          }
          return row;
        })
      );
    } else {
      // Handle the case when the dropdown value is cleared (newValue is null)
      setRows((prevRows) =>
        prevRows.map((row) => {
          if (row.id === id) {
            return { ...row, role: null, roleId: null };
          }
          return row;
        })
      );
    }
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
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const manageUserJson = {
      id: params.row.id,
      username: params.row.username,
      name: params.row.name,
      password: params.row.password,
      emailId: params.row.emailId,
      mobile: params.row.mobile,
      status: params.row.status,
      role: { id: params.row.roleId },
    };

    let userResponse = await AdminServices.updateManageUser(manageUserJson);

    if (userResponse.code === 200) {
      setEditedRows({});
      setDialogTitle("User Details Updated");
      setSuccessMessage("User : " + params.row.name + " Updated Successfully");
      setOpen(true);
      getManageUserList();
    } else {
      if (userResponse.code === 209) {
        setDialogTitle("Error!!");
        setSuccessMessage(userResponse.responseBody);
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
  const [editModeRows, setEditModeRows] = useState({});

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [editedRows, setEditedRows] = useState({});
  const [rows, setRows] = React.useState([]);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [emailId, setemailId] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const [roleListAPI, setRoleListAPI] = useState([{}]);
  const [plantListAPI, setPlantListAPI] = useState([{}]);
  const [roleId, setRoleId] = useState();
  const [role, setRole] = useState("");

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState();

  const [plantName, setPlantName] = useState("");
  const [plantId, setPlantId] = useState();

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

  const handlemobileNochange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    if (newValue.length <= 10) {
      setMobile(newValue);
    }
  };
  const handleuserNamechange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, "");
    setUserName(newValue);
  };
  const handlePasswordchange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9@#$%^&*+]/g, "");
    setPassword(newValue);
  };

  useEffect(() => {
    getManageUserList();

    getListRole();
    getPlantList();
  }, []);
  async function getManageUserList() {
    let manageUserList = await AdminServices.getAllManagePageList();
    if (manageUserList.code === 200) {
      setRows([]);
      manageUserList.responseBody.map((manageUser, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: manageUser.id,
            seq: index++,
            name: manageUser.name,
            username: manageUser.username,
            password: manageUser.password,
            mobile: manageUser.mobile,
            emailId: manageUser.emailId,
            status: manageUser.status,
            role: manageUser.role.name,
            roleId: manageUser.role.id,
          },
        ])
      );
    } else {
      setDialogTitle("Getting role list Error");
      setSuccessMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }
  async function getListRole() {
    let roleList = await AdminServices.getRoleList();
    if (roleList.code === 200) {
      setRoleListAPI([]); //Clear existing list in array
      roleList.responseBody.map((role) =>
        setRoleListAPI((prevState) => [
          ...prevState,
          {
            label: role.name,
            id: role.id,
          },
        ])
      );
    } else {
      console.log("Something went wrong in role List getting");
    }
  }
  async function getPlantList() {
    let plantList = await AdminServices.getCompanyByContext("plant");
    if (plantList.code === 200) {
      setPlantListAPI([]); //Clear existing list in array
      plantList.responseBody.map((plant) =>
        setPlantListAPI((prevState) => [
          ...prevState,
          {
            label: plant.name + " (" + plant.code + ")",
            id: plant.id,
          },
        ])
      );
    } else {
      console.log("Something went wrong in plat List getting");
    }
  }

  const addManageUser = async (e) => {
    console.log("Button Cliked");
    if (name.length === 0) {
      console.log("name field is empty");
      setDialogTitle("Name is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }

    if (username.length === 0) {
      console.log("username field is empty");
      setDialogTitle("username is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (password.length === 0) {
      console.log("password field is empty");
      setDialogTitle("password is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (emailId.length === 0) {
      console.log("emailId field is empty");
      setDialogTitle("emailId is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (mobile.length === 0) {
      console.log("MobileNo field is empty");
      setDialogTitle("MobileNo is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (role.length === 0) {
      setDialogTitle("role is empty");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    if (!plantId) {
      // console.log("Material is not available");
      setDialogTitle("Select a  Plant");
      setSuccessMessage("");
      setOpen(true);
      return;
    }
    const manageUserJson = {
      name: name,
      username: username,
      password: password,
      mobile: mobile,
      emailId: emailId,
      status: "Active",
      role: { id: roleId },
    };
    console.log("User data" + JSON.stringify(manageUserJson));
    let manageUserResponse = await AdminServices.addManageUser(manageUserJson);

    console.log("created user responce" + JSON.stringify(manageUserResponse));
    if (manageUserResponse.code === 200) {
      const createdUserDetails = manageUserResponse.responseBody;
      const userId = createdUserDetails.id;
      console.log("User ID" + userId + " & Plant Id" + plantId);
      let data = {
        userId: userId,
        company: {
          id: plantId,
        },
      };
      let linkUserCompanyResponce = await AdminServices.linkUserToPlant(data);

      if (linkUserCompanyResponce.code === 200) {
        setDialogTitleMessageComplete("User Created Successfully");
        setDialogContentMessageComplete(
          "User : " +
            name +
            " added Successfully and Linked to Plant:" +
            plantName
        );
        setOpenComplete(true);
      } else {
        setDialogTitle("User Created But Failed to link to plant");
        setSuccessMessage(linkUserCompanyResponce.responseBody);
        setOpen(true);
      }
    } else {
      if (manageUserResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(manageUserResponse.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  };

  const defaultProps = {
    options: roleListAPI,
    getOptionLabel: (option) => option.label,
  };

  const defaultProps1 = {
    options: plantListAPI,
    getOptionLabel: (option) => option.label,
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Manage User</h2>
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
                  sx={{ minWidth: 240, marginLeft: 2 }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  id="username"
                  label="UserName"
                  variant="outlined"
                  sx={{ minWidth: 240, marginLeft: 3 }}
                  value={username}
                  // onChange={(e) => setUserName(e.target.value)}
                  onChange={handleuserNamechange}
                />
                <TextField
                  required
                  id="password"
                  label="Password"
                  variant="outlined"
                  sx={{ minWidth: 240, marginLeft: 3 }}
                  value={password}
                  //onChange={(e) => setPassword(e.target.value)}
                  onChange={handlePasswordchange}
                />

                <TextField
                  required
                  id="emailId"
                  label="Email ID"
                  variant="outlined"
                  sx={{ minWidth: 240, marginLeft: 3 }}
                  value={emailId}
                  onChange={(e) => setemailId(e.target.value)}
                />
                <TextField
                  required
                  id="mobile"
                  label="Mobile No"
                  variant="outlined"
                  sx={{ minWidth: 240, marginLeft: 3 }}
                  value={mobile}
                  onChange={handlemobileNochange}
                />
              </Grid>

              <Grid
                item
                xs={8}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <Autocomplete
                  {...defaultProps}
                  style={ItemStyleAutoComplite}
                  disablePortal
                  id="vehicleListDropDown"
                  sx={{ width: "240px" }}
                  onChange={(e, v) => {
                    if (v != null) {
                      setRole(v.label);
                      setRoleId(v.id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          Select Role Names{" "}
                          <span style={{ color: "red" }}> *</span>
                        </span>
                      }
                    />
                  )}
                />
                <div>
                  <Autocomplete
                    {...defaultProps1}
                    style={ItemStyleAutoComplite}
                    disablePortal
                    id="vehicleListDropDown"
                    sx={{ width: "240px" }}
                    onChange={(e, v) => {
                      if (v != null) {
                        setPlantName(v.label);
                        setPlantId(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          <span>
                            Select Plant{" "}
                            <span style={{ color: "red" }}> *</span>
                          </span>
                        }
                      />
                    )}
                  />
                </div>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    addManageUser(e);
                  }}
                  style={{
                    marginLeft: "20px",
                    minWidth: "10%",
                    height: "48px",
                    marginBottom: "6px",
                    color: "white",
                  }}
                >
                  Add User
                </Button>
              </Grid>
            </ThemeProvider>
          </Paper>
        </Grid>
        <h2>User List</h2>
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

export default ManageUser;
