import React, { useState, useRef } from "react";
import AuthServices from "../../services/AuthServices";
import Autocomplete from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import RouteServices from "../../services/RouteServices.js";
import Button from "@mui/material/Button";
import { useEffect } from "react";

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
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  backgroundColor: "#F0FFFF",
};

const textStyle = {
  flex: 1,
  maxWidth: "250px",
  margin: "8px",
};

const columns = [
  {
    field: "seq",
    headerName: "ID",
    minWidth: 50,
    align: "center",
    headerAlign: "center",
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "code",
    headerName: "Route Code",
    minWidth: 150,
    align: "center",
    headerAlign: "center",
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "routeName",
    headerName: "Route Name",
    minWidth: 353,
    align: "center",
    headerAlign: "center",
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "source",
    headerName: "Source",
    minWidth: 370,
    align: "center",
    headerAlign: "center",
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Destination",
    headerName: "Destination",
    minWidth: 390,
    align: "center",
    headerAlign: "center",
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
];

function RouteMaster() {
  //const [routeCode, setRouteCode] = useState("");
  const routeNameRef = useRef(null);
  const sourceAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);

  const [source, setSource] = useState("");
  const [Destination, setDestination] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [supplierListVar, setSupplierListVar] = useState([]);

  const [routeName, setRouteName] = useState("");
  const [sourceSupplierId, setSourceSupplierId] = useState();
  const [destinationSupplierId, setdestinationSupplierId] = useState();

  const [open, setOpen] = React.useState(false);

  const [formClose, setFormClose] = useState(1);

  //Dialog Related

  const defaultProps = {
    options: supplierListVar,
    getOptionLabel: (option) => option.name,
  };

  const [tableData, setTableData] = useState([]);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();

  async function getSupplier() {
    //TODO Verify Confirm PlantId need to be passed to get Suppliers List
    let userCompany = AuthServices.getSelectedPlant();
    console.log("Company Infor:" + JSON.stringify(userCompany));
    let plantId = userCompany.plantId;

    let supplierList = await RouteServices.getListOfSuppliers(plantId);
    console.log("Supplier List:" + JSON.stringify(supplierList));
    if (supplierList.code === 200) {
      console.log(
        "Supplier Array:" + JSON.stringify(supplierList.responseBody)
      );
      let supplierArray = supplierList.responseBody;
      setSupplierListVar([{ id: plantId, name: userCompany.plantName }]);

      console.log("Plant ID:" + plantId + " Name:" + userCompany.plantName);
      supplierArray.map((supplier, index) => {
        console.log("Suppler ID:" + supplier.id + "  Name:" + supplier.name);
        setSupplierListVar((prevState) => [
          ...prevState,
          { id: supplier.id, name: supplier.name },
        ]);
      });
    } else {
      setDialogTitleMessage("Getting Routes list Error");
      setDialogContentMessage("Something went wrong, check your network!!");
      setOpen(true);
      console.log("Some thing went wrong");
    }
  }
  async function getRouteList() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    let routeList = await RouteServices.getRoutesList(plantId);
    console.log("Routes List:" + JSON.stringify(routeList));
    if (routeList.code === 200) {
      console.log("Routes List:=>" + JSON.stringify(routeList.responseBody));
      let routesArray = routeList.responseBody;
      setTableData([]);
      routesArray.map((route, index) => {
        console.log(
          "Route Name ID:===>" +
            route.id +
            "  Name:" +
            route.name +
            "SourceName:" +
            route.source.name +
            "DestinationName:" +
            route.destination.name
        );

        setTableData((prevState) => [
          ...prevState,
          {
            id: route.id,
            seq: index++,
            code: route.code,
            routeName: route.name,
            source: route.source.name,
            Destination: route.destination.name,
          },
        ]);
        console.log("Lenght:" + tableData.length);
      });
    }
  }

  const handleClose = () => {
    setOpen(false);
    setRouteName("");

    setSourceSupplierId(null);
    setdestinationSupplierId(null);

    getRouteList();
  };

  useEffect(() => {
    getRouteList();
    getSupplier();
  }, []);

  const saveRoute = async (e) => {
    if (routeName.length === 0) {
      setDialogTitleMessage("Route Name is empty");
      setDialogContentMessage("Enter proper Route Name");
      setOpen(true);
      return;
    }

    console.log("Souce:" + sourceSupplierId);
    if (!sourceSupplierId) {
      setDialogTitleMessage("Source location is empty");
      setDialogContentMessage("Select source location");
      setOpen(true);
      return;
    }
    console.log("Destination:" + destinationSupplierId);
    if (!destinationSupplierId) {
      setDialogTitleMessage("Destination location is empty");
      setDialogContentMessage("Destination  location");
      setOpen(true);
      return;
    }

    //TODO CHange Compnay ID  Verify i passed Plant IDm confirm with Niranjan
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    let data = {
      name: routeName,
      status: "Active",
      code: "RANE" + routeName,
      company: {
        id: plantId,
      },
      source: {
        id: sourceSupplierId,
      },
      destination: {
        id: destinationSupplierId,
      },
    };
    //TODO Verify Right API is Hitting
    let routeAddResponse = await RouteServices.addRoute(data);
    console.log("Add Route Response:" + JSON.stringify(routeAddResponse));
    if (routeAddResponse.code === 200) {
      console.log("Successfully Added ");
      setDialogTitleMessage("Route Added  Successfully");
      setDialogContentMessage(routeName + " Added Successfully");
      setFormClose(2);
      setOpen(true);
    } else {
      console.log("Some thing went wrong");
      setDialogTitleMessage("Route Added  Failed");
      setDialogContentMessage("Something went wrong");
      setOpen(true);
    }
  };
  const handleSourceChange = (event, newValue) => {
    if (newValue != null) {
      console.log("Source Value: " + JSON.stringify(newValue));
      setSourceSupplierId(newValue.id);
      setSource(newValue.name);
    } else {
      setSource(null);
      setSourceSupplierId(null);
    }
  };
  return (
    <div>
      <Grid container style={containerStyle}>
        <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>Add Routes</h2>
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
                required
                id="RouteName"
                label="Route Name"
                variant="outlined"
                style={textStyle}
                inputRef={routeNameRef}
                onChange={(e) => setRouteName(e.target.value)}
              />
              <Autocomplete
                {...defaultProps}
                style={textStyle}
                disablePortal
                id="SupplierList"
                sx={{ width: 300 }}
                onChange={handleSourceChange}
                renderInput={(params) => (
                  <TextField {...params} label="Source" />
                )}
              />
              <Autocomplete
                {...defaultProps}
                style={textStyle}
                disablePortal
                id="VendorsList"
                sx={{ width: 300 }}
                onChange={(e, v) => {
                  if (v != null) {
                    setdestinationSupplierId(v.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Destination" />
                )}
              />
              <div style={{ margin: "8px" }}>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    saveRoute(e);
                  }}
                >
                  Add Route
                </Button>
              </div>
            </ThemeProvider>
          </Paper>
        </Grid>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: "2px solid #696969",
              borderRadius: "5px",
            }}
          >
            {/* <h3> List of Routes </h3> */}
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
                title="List Of Routes"
              >
                List of Routes
              </h3>
            </div>
            <div style={{ height: 400, width: "99%" }}>
              <DataGrid
                rows={tableData}
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
          </Paper>
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
      </Grid>
    </div>
  );
}
export default RouteMaster;
