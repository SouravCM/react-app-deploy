import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AuthServices from "../../services/AuthServices";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteIcon,
  GridToolbar,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AdminServices from "../../services/AdminServices.js";
import LinkServicesObj from "../../services/LinkServices";

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

const formControlStyle = { m: 1, minWidth: 250 };

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  //paddingTop: "3%",
  backgroundColor: "#F0FFFF",
};

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const textStyle = {
  flex: 1,
  //Width: "20px",
  margin: "8px",
};
const ItemStyleAutoComplite = {
  padding: "4px",
  margin: "4px",
  minWidth: "20%",
};

function LinkStoreCompany() {
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
      field: "user",
      headerName: "User",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "userName",
      headerName: "User Name",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "plant",
      headerName: "Plant",
      align: "center",
      headerAlign: "center",
      flex: 1,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      flex: 0.5,
      width: "auto",
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<GridDeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => handleDeleteClick(params)}
        />,
      ],
    },
  ];

  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [userListVar, setuserListVar] = useState({});
  const [plantListVar, setPlantListVar] = useState([]);
  const [plantName, setPlantName] = useState("");
  const [plantId, setPlantId] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState();
  const [open, setOpen] = React.useState(false);
  const [formClose, setFormClose] = useState(1);

  const [rows, setRows] = useState([]);

  //Dialog Related
  const handleClose = () => {
    setOpen(false);
    if (formClose !== 1) {
      setFormClose(1);
      //      window.location.reload();
    }
  };

  useEffect(() => {
    getUser();
    getUserPlantList();
    // getCompanyByPlant();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const corporateList = await getCompanyByCorporate("corporate");
      const plantList = await getCompanyByCorporate("plant");
      const combinedList = [...corporateList, ...plantList];
      setPlantListVar(combinedList);
    }

    fetchData();
  }, []);

  async function getCompanyByCorporate(context) {
    try {
      let plantList = await AdminServices.getCompanyByContext(context);

      if (plantList.code === 200) {
        let plantArray = plantList.responseBody;
        return plantArray.map((plant) => ({
          id: plant.id,
          label: plant.name + "(" + plant.code + ") ",
        }));
      } else {
        console.log(`Something went wrong in ${context} List getting`);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching ${context} list:`, error);
      return [];
    }
  }
  async function getUser() {
    let userList = await AdminServices.getUserName();
    // console.log("log" + JSON.stringify(userList));
    if (userList.code === 200) {
      setuserListVar([]); //Clear existing list in array
      userList.responseBody.map((user) =>
        setuserListVar((prevState) => [
          ...prevState,
          {
            name: user.name,
            id: user.id,
          },
        ])
      );
    } else {
      console.log("Something went wrong in role List getting");
    }
  }

  async function getUserPlantList() {
    let userPlantList = await AdminServices.getUserPlantList();
    console.log("List Data" + JSON.stringify(userPlantList.responseBody));

    if (userPlantList.code === 200) {
      setRows([]); //Clear existing list in array
      userPlantList.responseBody.map((data, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: data.user.id,
            seq: index++,
            user: data.user.name,
            userName: data.user.username,
            userId: data.user.id,
            plant:
              data.userCompany.company.name +
              "- (" +
              data.userCompany.company.code +
              ")",
            plantId: data.userCompany.company.id,
            rowId: data.userCompany.id,
          },
        ])
      );
    } else {
      console.log("Something went wrong in User Plant List getting");
    }
  }

  const add = async (e) => {
    if (!plantId) {
      // console.log("Vendor ID IS NOT THERE");
      setDialogTitle("Plant is empty");
      setSuccessMessage("Select a plant to link Vendor");
      setOpen(true);
      return;
    }

    if (!userId) {
      // console.log("Material is not available");
      setDialogTitle("Material is empty");
      setSuccessMessage("Select a Material to link Vendor");
      setOpen(true);
      return;
    }

    let data = {
      userId: userId,
      company: {
        id: plantId,
      },
    };
    let linkUserCompanyResponce = await AdminServices.linkUserToPlant(data);

    if (linkUserCompanyResponce.code === 200) {
      setDialogTitle("User Linked to Plant Successfully");
      setSuccessMessage(user + " to " + plantName);
      setOpen(true);
      getUserPlantList();
    } else {
      if (linkUserCompanyResponce.code === 209) {
        setDialogTitle("Failed To Link");
        setSuccessMessage(linkUserCompanyResponce.responseBody);
        setOpen(true);
      }
    }
  };

  const defaultProps = {
    options: userListVar,
    getOptionLabel: (option) => option.name,
  };

  const defaultProps1 = {
    options: plantListVar,
    getOptionLabel: (option) => option.label,
  };

  const handleDeleteClick = async (params) => {
    const rowValues = params.row; // Retrieve the row values
    let deleteResponce = await LinkServicesObj.deleteUserPlaneLink(
      rowValues.rowId
    );
    if (deleteResponce.code === 200) {
      setDialogTitle("Link Deleted");
      setSuccessMessage(
        "User " +
          rowValues.user +
          " To Plant " +
          rowValues.plant +
          " Link Deleted"
      );

      setOpen(true);
      getUserPlantList();
    } else {
      setDialogTitle("Link deletion Failed");
      setSuccessMessage("Something went wrong, check network");
      setOpen(true);
    }
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Link User Plant </h2>

        <Grid item xs={12} style={ItemStyle}>
          <Paper
            //elevation={5}
            sx={{
              border: "2px solid #696969",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <Grid
              item
              xs={7}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemeProvider theme={formLabelsTheme}>
                <Autocomplete
                  {...defaultProps}
                  style={ItemStyleAutoComplite}
                  disablePortal
                  id="vehicleListDropDown"
                  sx={{ width: "220px" }}
                  onChange={(e, v) => {
                    if (v != null) {
                      setUser(v.name);
                      setUserId(v.id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          Select User <span style={{ color: "red" }}> *</span>
                        </span>
                      }
                    />
                  )}
                />
                <Autocomplete
                  {...defaultProps1}
                  style={textStyle}
                  disablePortal
                  id="VendorList"
                  sx={{ width: 300 }}
                  onChange={(e, v) => {
                    if (v != null) {
                      setPlantName(v.label);
                      setPlantId(v.id);
                    }
                  }}
                  renderInput={(params) => (
                    // <TextField {...params} label="Supplier" />
                    <TextField
                      {...params}
                      label={
                        <span>
                          Plant <span style={{ color: "red" }}> *</span>
                        </span>
                      }
                    />
                  )}
                />

                <div style={{ margin: "8px", width: "250px" }}>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      add(e);
                    }}
                  >
                    Link
                  </Button>
                </div>
              </ThemeProvider>
            </Grid>
          </Paper>
        </Grid>
        <h2>User Plant List</h2>
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
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* <div>
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
        </div> */}
      </Grid>
    </div>
  );
}

export default LinkStoreCompany;
