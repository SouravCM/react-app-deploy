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
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { FormControlLabel, Switch, Typography, Modal } from "@mui/material";
import Dropzone from "react-dropzone";
import { RouteTransporterFile } from "../../utils/constants.js";
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

function RouteTransporter() {
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
      field: "transporterCode",
      headerName: "Transporter Code",
      minWidth: 510,
      align: "center",
      headerAlign: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "transporterName",
      headerName: "Transporter Name",
      minWidth: 510,
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
      minWidth: 298,
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

    let deleteResponce = await RouteServices.deleteRouteTransporter(
      rowValues.id
    );

    if (deleteResponce.code === 200) {
      setDialogTitle("Route Transporter Deleted");
      setSuccessMessage(
        "Route " + rowValues.transporterName + " has Been Deleted"
      );

      setOpen(true);
      handelRouteChangeBasedOnID(routeId);
    } else {
      setDialogTitle("Vendor Deletion Failed");
      setSuccessMessage("Something went wrong, check network");
      setOpen(true);
    }
  };

  const [transporterListVar, setTransporterListVar] = useState({});
  const [routeListVar, setrouteListVar] = useState({});
  const [routeId, setRouteId] = useState();
  const [transporterId, setTransporterId] = useState();

  const [isUpload, setIsUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const defaultProps = {
    options: routeListVar,
    getOptionLabel: (option) => option.name,
  };
  const defaultProps1 = {
    options: transporterListVar,
    getOptionLabel: (option) => option.name,
  };

  const [tableData, setTableData] = useState([]);
  async function getAllRouteTransporterList(list) {
    setTableData([]);
    list.map((routeTransporter, index) => {
      setTableData((prevState) => [
        ...prevState,
        {
          id: routeTransporter.id,
          seq: index++,

          transporterCode: routeTransporter.transporter.code,
          transporterName: routeTransporter.transporter.name,
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
        setrouteListVar([]);
        routeArray.map((route, index) => {
          setrouteListVar((prevState) => [
            ...prevState,
            { id: route.id, name: route.name + " (" + route.code + ")" },
          ]);
        });
      } else {
        console.log("Some thing went wrong");
      }
    }
    getRoute();
    async function getTransporter() {
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let transporterList = await RouteServices.getTransporterName(plantId);
      if (transporterList.code === 200) {
        let transporterArray = transporterList.responseBody;
        setTransporterListVar([]);
        transporterArray.map((transporter, index) => {
          setTransporterListVar((prevState) => [
            ...prevState,
            {
              id: transporter.id,
              name: transporter.name + " (" + transporter.code + ")",
            },
          ]);
        });
      } else {
        console.log("Some thing went wrong");
      }
    }
    getTransporter();
  }, []);

  const add = async (e) => {
    console.log("Route Id ==>" + routeId + "Transporer ID:" + transporterId);
    if (!routeId) {
      // console.log("ROUTE ID IS NOT THERE");
      setDialogTitle("Route is emoty");
      setSuccessMessage("Select a route to link transporter");
      setOpen(true);
      return;
    }

    if (!transporterId) {
      // console.log("Transpoert is not available");
      setDialogTitle("Transporter is emoty");
      setSuccessMessage("Select a Transporter to link Route");
      setOpen(true);
      return;
    }

    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    let data = {
      routeId: routeId,
      transporterId: transporterId,
      companyId: plantId,
    };
    let routeAddResponse = await RouteServices.addTransporterRoute(data);
    if (routeAddResponse.code === 200) {
      setDialogTitle("Route Transporter Link Successfully");
      setSuccessMessage("Transporter is assigned to Route successfully");

      setOpen(true);
      handelRouteChangeBasedOnID(routeId);
    } else {
      if (routeAddResponse.code === 209) {
        setDialogTitle("Route Already Exists");
        setSuccessMessage(
          "Change Route Name or Transporter Name and try again"
        );
        setOpen(true);
      }
    }
  };

  async function handelRouteChangeBasedOnID(id) {
    let response = await RouteServices.getListofRouteBasedonSelectedID(id);
    if (response.code === 200) {
      getAllRouteTransporterList(response.responseBody);
    } else {
      setTableData([]);
      console.log("Some thing went wrong");
    }
  }

  const onFileChange = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handelTempleteDownload = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(RouteTransporterFile);
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
      "Route_Transporter_Template.xlsx"
    );
  };

  const uploadRouteTransporter = async (e) => {
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

    let linkRoutrTransporterResponce =
      await LinkServicesObj.uploadLinkRouteTransporter(formData);
    // console.log(
    //   "Update Material Response:" + JSON.stringify(materialAddResponse)
    // );
    if (linkRoutrTransporterResponce.code === 200) {
      setDialogTitle("Linked  Successfully");
      setSuccessMessage(linkRoutrTransporterResponce.responseBody);
      setOpen(true);
      setSelectedFile(null);
      handelRouteChangeBasedOnID(routeId);
    } else {
      if (linkRoutrTransporterResponce.code === 209) {
        setDialogTitle("Linking Failed");
        setSuccessMessage(linkRoutrTransporterResponce.responseBody);
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Route Transporter</h2>
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
                    uploadRouteTransporter(e);
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
              elevation={5}
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
                  //justifyContent: "center",
                }}
              >
                <ThemeProvider theme={formLabelsTheme}>
                  <Autocomplete
                    {...defaultProps}
                    disablePortal
                    id="RouteList"
                    sx={{ width: 500, marginLeft: 1 }}
                    onChange={(e, v) => {
                      if (v != null) {
                        setRouteId(v.id);
                        handelRouteChangeBasedOnID(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      //  <TextField {...params} label="Route Name" />
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
                    //style={ItemStyle}
                    disablePortal
                    id="TransporterList"
                    sx={{ width: 500, marginLeft: 3 }}
                    onChange={(e, v) => {
                      if (v != null) {
                        console.log(
                          "Transporter Selected:" +
                            v.id +
                            "Transporter No:" +
                            v.name
                        );
                        setTransporterId(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      // <TextField {...params} label="Transporter" />
                      <TextField
                        {...params}
                        label={
                          <span>
                            Transporter <span style={{ color: "red" }}> *</span>
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
        <h2>Route Transporter List</h2>
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
        {/* </ThemeProvider> */}
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

export default RouteTransporter;
