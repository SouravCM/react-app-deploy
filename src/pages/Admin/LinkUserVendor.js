import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

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
import RouteServices from "../../services/RouteServices.js";

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

const textStyle = {
  flex: 1,
  margin: "8px",
};
const ItemStyleAutoComplite = {
  padding: "4px",
  margin: "4px",
  minWidth: "20%",
};

function LinkUserVendor() {
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
      field: "vendorName",
      headerName: "Vendor",
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
  const handleDeleteClick = async (params) => {
    const rowValues = params.row; // Retrieve the row values
    let deleteResponce = await AdminServices.deleteUserVendorLink(rowValues.id);

    if (deleteResponce.code === 200) {
      setDialogTitle("Link Deleted");
      setSuccessMessage(
        "User " +
          rowValues.user +
          " To Vendor " +
          rowValues.vendorName +
          " Link Deleted"
      );

      setOpen(true);
      getUserVendorList();
    } else {
      setDialogTitle("Link deletion Failed");
      setSuccessMessage("Something went wrong, check network");
      setOpen(true);
    }
  };

  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [userListVar, setuserListVar] = useState({});
  const [VendorListVar, setVendorListVar] = useState([]);
  const [vendorName, setVendorName] = useState("");
  const [vendorId, setVendorId] = useState("");
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
    getUserVendorList();
    getVendor();
  }, []);

  async function getUser() {
    let userList = await AdminServices.getUserName();

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
  async function getVendor() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    let supplierList = await RouteServices.getListOfSuppliers(plantId);
    if (supplierList.code === 200) {
      let supplierArray = supplierList.responseBody;
      setVendorListVar([]);
      supplierArray.map((supplier, index) => {
        setVendorListVar((prevState) => [
          ...prevState,
          {
            id: supplier.id,
            name: supplier.name + " (" + supplier.code + ")",
          },
        ]);
      });
    } else {
      setDialogTitle("Getting Vendor list Error");
      setSuccessMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }

  async function getUserVendorList() {
    let userVendorList = await AdminServices.getUserVendorList();

    if (userVendorList.code === 200) {
      setRows([]); //Clear existing list in array
      userVendorList.responseBody.map((data, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: data.id,
            seq: index++,
            user: data.user.name,
            userName: data.user.username,
            vendorName: data.vendor.name,
          },
        ])
      );
    } else {
      console.log("Something went wrong in User Plant List getting");
    }
  }

  const add = async (e) => {
    if (!vendorId) {
      setDialogTitle("Vendoe is empty");
      setSuccessMessage("Select a vendor to link User");
      setOpen(true);
      return;
    }

    if (!userId) {
      setDialogTitle("User is empty");
      setSuccessMessage("Select a User to link Vendor");
      setOpen(true);
      return;
    }
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    let data = {
      userId: userId,
      vendor: {
        id: vendorId,
      },
      company: {
        id: plantId,
      },
    };
    console.log("data " + JSON.stringify(data));
    let linkUserVendorResponce = await AdminServices.linkUserToVendor(data);

    if (linkUserVendorResponce.code === 200) {
      setDialogTitle("User Linked to Vendor Successfully");
      setSuccessMessage(user + " to " + vendorName);
      setOpen(true);
      getUserVendorList();
    } else {
      if (linkUserVendorResponce.code === 209) {
        setDialogTitle("Failed To Link");
        setSuccessMessage(linkUserVendorResponce.responseBody);
        setOpen(true);
      }
    }
  };

  const defaultProps = {
    options: userListVar,
    getOptionLabel: (option) => option.name,
  };
  const defaultProps1 = {
    options: VendorListVar,
    getOptionLabel: (option) => option.name,
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Link User Vendor </h2>

        <Grid item xs={12} style={ItemStyle}>
          <Paper
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
                      console.log(vendorName);
                      setVendorName(v.name);
                      console.log("vale===" + vendorName);

                      setVendorId(v.id);
                    }
                  }}
                  renderInput={(params) => (
                    // <TextField {...params} label="Supplier" />
                    <TextField
                      {...params}
                      label={
                        <span>
                          Select Vendor <span style={{ color: "red" }}> *</span>
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
        <h2>User Vendor List</h2>
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
              {/* <Button onClick={handleClose}>Disagree</Button> */}
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </div>
  );
}

export default LinkUserVendor;
