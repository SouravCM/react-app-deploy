import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AuthServices from "../../services/AuthServices";
import RouteServices from "../../services/RouteServices.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { FormControlLabel, Switch, Typography, Modal } from "@mui/material";
import Dropzone from "react-dropzone";
import { RouteVenordFile } from "../../utils/constants.js";
import FileSaver from "file-saver";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  //Width: "20px",
  margin: "8px",
};

function RouteVendor() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState();

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
      field: "vendorCode",
      headerName: "Vendor Code",
      minWidth: 453,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vendorName",
      headerName: "Vendor Name",
      minWidth: 555,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "action",
      type: "actions",
      headerAlign: "center",
      headerName: "Actions",
      minWidth: 300,
      align: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",

      cellClassName: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => handleDeleteClick(params)}
        />,
      ],
    },
  ];
  const handleDeleteClick = async (params) => {
    const rowValues = params.row; // Retrieve the row values

    let deleteResponce = await RouteServices.deleteRouteVendor(rowValues.id);

    if (deleteResponce.code === 200) {
      console.log(rowValues);
      setDialogTitle("Vendor Deleted");
      setSuccessMessage(
        "Vendor : " + rowValues.vendorName + " has Been Deleted"
      );

      setOpen(true);
      handelRouteVendorChange(routeId);
    } else {
      setDialogTitle("Vendor Deletion Failed");
      setSuccessMessage("Something went wrong, check network");
      setOpen(true);
    }
  };

  const [vendorId, setVendorId] = useState();
  const [routeId, setRouteId] = useState();

  const [routeListVar, setRouteListVar] = useState([{}]);
  const [supplierListVar, setSupplierListVar] = useState([]);

  const [open, setOpen] = React.useState(false);

  const [formClose, setFormClose] = useState(1);

  const [isUpload, setIsUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  //Dialog Related
  const handleClose = () => {
    setOpen(false);
    if (formClose !== 1) {
      setFormClose(1);
    }
  };
  const [tableData, setTableData] = useState([]);
  async function getAllRouteVendorsList(list) {
    setTableData([]);
    list.map((routeTransporter, index) => {
      setTableData((prevState) => [
        ...prevState,
        {
          id: routeTransporter.id,
          seq: index++,
          vendorCode: routeTransporter.vendor.code,
          vendorName: routeTransporter.vendor.name,
        },
      ]);
    });
  }

  useEffect(() => {
    async function getRoute() {
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let routeList = await RouteServices.getRouteName(plantId);
      if (routeList.code === 200) {
        let routeArray = routeList.responseBody;
        setRouteListVar([]);
        routeArray.map((route, index) => {
          setRouteListVar((prevState) => [
            ...prevState,
            { id: route.id, name: route.name + " (" + route.code + ")" },
          ]);
        });
      } else {
        setDialogTitle("Getting Routes list Error");
        setSuccessMessage("Something went wrong, check your network!!");
        setOpen(true);
      }
    }
    getRoute();
    async function getSupplier() {
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let supplierList = await RouteServices.getListOfSuppliers(plantId);
      if (supplierList.code === 200) {
        let supplierArray = supplierList.responseBody;
        setSupplierListVar([]);
        supplierArray.map((supplier, index) => {
          setSupplierListVar((prevState) => [
            ...prevState,
            {
              id: supplier.id,
              name: supplier.name + " (" + supplier.code + ")",
            },
          ]);
        });
      } else {
        setDialogTitle("Getting Supplier list Error");
        setSuccessMessage("Something went wrong, check your network!!");
        setOpen(true);
      }
    }
    getSupplier();
  }, []);

  const defaultProps = {
    options: routeListVar,
    getOptionLabel: (option) => option.name,
  };

  const defaultProps1 = {
    options: supplierListVar,
    getOptionLabel: (option) => option.name,
  };
  const add = async (e) => {
    if (!routeId) {
      setDialogTitle("Route is Empty");
      setSuccessMessage("Select a route to link supplier");
      setOpen(true);
      return;
    }
    if (!vendorId) {
      setDialogTitle("Supplier is empty");
      setSuccessMessage("Select supplier to link to route");
      setOpen(true);
      return;
    }
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    let data = {
      routeId: routeId,
      vendorId: vendorId,
      companyId: plantId,
    };
    let routeAddResponse = await RouteServices.addVendorRoute(data);
    if (routeAddResponse.code === 200) {
      setDialogTitle("Route Vendor Link Successfully");
      setSuccessMessage("Vendor is assigned to Route successfully");
      setOpen(true);
      handelRouteVendorChange(routeId);
    } else {
      if (routeAddResponse.code === 209) {
        setDialogTitle("Route Vendor Already Exists");
        setSuccessMessage("Change Route Name or Vendor Name and try again");
        setOpen(true);
      }
    }
  };
  async function handelRouteVendorChange(id) {
    let response = await RouteServices.getRouteBasedonSelectedID(id);
    if (response.code === 200) {
      getAllRouteVendorsList(response.responseBody);
    } else {
      setTableData([]);
      console.log("Some thing went wrong!!!!!");
    }
  }

  const onFileChange = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handelTempleteDownload = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(RouteVenordFile);
    let bytesLength = byteCharacters.length;
    let slicesCount = Math.ceil(bytesLength / sliceSize);
    let byteArrays = new Array(slicesCount);
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      let begin = sliceIndex * sliceSize;
      let end = Math.min(begin + sliceSize, bytesLength);
      let bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    FileSaver.saveAs(
      new Blob(byteArrays, { type: "application/vnd.ms-excel" }),
      "Route_Vendor_Template.xlsx"
    );
  };

  const uploadRouteVendor = async (e) => {
    if (selectedFile === null) {
      setDialogTitle("Error");
      setSuccessMessage("Please Select a File");
      setOpen(true);
      return;
    }
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("companyId", plantId);

    let linkRoutrVendorResponce = await LinkServicesObj.uploadLinkRouteVendor(
      formData
    );
    // console.log(
    //   "Update Material Response:" + JSON.stringify(materialAddResponse)
    // );
    if (linkRoutrVendorResponce.code === 200) {
      setDialogTitle("Linked  Successfully");
      setSuccessMessage(linkRoutrVendorResponce.responseBody);
      setOpen(true);
      setSelectedFile(null);
      handelRouteVendorChange(routeId);
    } else {
      if (linkRoutrVendorResponce.code === 209) {
        setDialogTitle("Linking Failed");
        setSuccessMessage(linkRoutrVendorResponce.responseBody);
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Route Vendor</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "95%",
          }}
        >
          <Typography variant="body1">Add Link </Typography>
          <FormControlLabel
            style={{ marginLeft: "5px" }}
            control={
              <Switch
                checked={isUpload}
                onChange={(e) => setIsUpload(e.target.checked)}
                color="primary"
              />
            }
            label="Upload Link"
          />
        </div>
        {isUpload ? (
          <Grid item xs={12} style={ItemStyle}>
            <Paper
              elevation={5}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              sx={{
                width: "98%",
                padding: "8px",
                display: "flex",
                border: "2px solid #696969",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <div>
                <Dropzone onDrop={onFileChange}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      style={{
                        border: "1px dashed #ccc",
                        padding: "20px",
                        textAlign: "center",
                      }}
                    >
                      <CloudUploadIcon fontSize="large" />
                      <input {...getInputProps()} />
                      <p>Drag & drop a file here, or click to select a file</p>
                      {selectedFile && (
                        <p>Selected File: {selectedFile.name}</p>
                      )}
                    </div>
                  )}
                </Dropzone>
                <Button
                  style={{
                    flex: 1,
                    maxWidth: "100px",
                    marginTop: "10px",
                    marginLeft: "8px",
                  }}
                  variant="contained"
                  onClick={(e) => {
                    uploadRouteVendor(e);
                  }}
                >
                  Upload
                </Button>
                <Button
                  style={{
                    flex: 1,
                    maxWidth: "100px",
                    marginTop: "10px",
                    marginLeft: "8px",
                  }}
                  variant="contained"
                  onClick={handelTempleteDownload}
                >
                  Template
                </Button>
              </div>
            </Paper>
          </Grid>
        ) : (
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
                xs={8}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ThemeProvider theme={formLabelsTheme}>
                  <Autocomplete
                    {...defaultProps}
                    style={textStyle}
                    disablePortal
                    id="RouteList"
                    sx={{ width: 500, marginLeft: 1 }}
                    onChange={(e, v) => {
                      if (v != null) {
                        setRouteId(v.id);
                        handelRouteVendorChange(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          <span>
                            Route Name <span style={{ color: "red" }}> *</span>
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
                        setVendorId(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          <span>
                            Vendor <span style={{ color: "red" }}> *</span>
                          </span>
                        }
                      />
                    )}
                  />

                  <div style={{ margin: "8px", width: "150px" }}>
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        add(e);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </ThemeProvider>
              </Grid>
            </Paper>
          </Grid>
        )}
        <h2>Route Vendor List</h2>

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
      </Grid>
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
    </div>
  );
}

export default RouteVendor;
