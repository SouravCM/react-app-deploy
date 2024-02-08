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
import { styled } from "@mui/material/styles";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import AuthServices from "../../services/AuthServices";
import vendorServices from "../../services/VendorServices";
import MaterialServices from "../../services/MaterialServices";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { FormControlLabel, Switch, Typography, Modal } from "@mui/material";
import Dropzone from "react-dropzone";
import { VendorMaterialFile } from "../../utils/constants.js";
import FileSaver from "file-saver";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinkServicesObj from "../../services/LinkServices";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";
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

function VendorMaterial() {
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
      field: "materialCode",
      headerAlign: "center",
      headerName: "Material Code",
      minWidth: 500,
      align: "center",
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "materialName",
      headerAlign: "center",
      headerName: "Material Name",
      minWidth: 410,
      align: "center",
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

    let deleteResponce = await vendorServices.deleteVendorMaterial(
      rowValues.id
    );

    if (deleteResponce.code === 200) {
      setDialogTitle("Material Deleted");
      setSuccessMessage(
        "Material " + rowValues.materialName + " has Been Deleted"
      );

      setOpen(true);
      handelRouteChangeBasedOnID(VendorId);
    } else {
      setDialogTitle("Material Deletion Failed");
      setSuccessMessage("Something went wrong, check network");
      setOpen(true);
    }
  };

  const [materialApi, setMaterialApi] = useState({});
  const [vendorListApli, setVendorListApli] = useState({});
  const [VendorId, setVendorId] = useState();
  const [materialId, setMaterialId] = useState();
  const [open, setOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [dialogTitle, setDialogTitle] = useState();

  const [isUpload, setIsUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const vendorListApi = {
    options: vendorListApli,
    getOptionLabel: (option) => option.label,
  };
  const meterialListApi = {
    options: materialApi,
    getOptionLabel: (option) => option.label,
  };

  const [tableData, setTableData] = useState([]);

  async function getVendorMaterialList(list) {
    setTableData([]);
    list.map((vendorMaterial, index) => {
      setTableData((prevState) => [
        ...prevState,
        {
          id: vendorMaterial.id,
          seq: index++,
          materialCode: vendorMaterial.material.code,
          materialName: vendorMaterial.material.description,
        },
      ]);
    });
  }
  useEffect(() => {
    async function getVendor() {
      let userCompany = AuthServices.getSelectedPlant();
      //console.log("Company Infor:" + JSON.stringify(userCompany));
      let plantId = userCompany.plantId;
      let vendorList = await vendorServices.getAllVendorByPlantId(plantId);

      if (vendorList.code === 200) {
        let vendorArray = vendorList.responseBody;
        setVendorListApli([]);
        vendorArray.map((vendor, index) => {
          setVendorListApli((prevState) => [
            ...prevState,
            { id: vendor.id, label: "(" + vendor.code + ") " + vendor.name },
          ]);
        });
      } else {
        console.log("Some thing went wrong");
      }
    }
    getVendor();
    async function getMaterials() {
      let userCompany = AuthServices.getSelectedPlant();
      //console.log("Company Infor:" + JSON.stringify(userCompany));
      let plantId = userCompany.plantId;
      let materialList = await MaterialServices.getMaterialList(plantId);

      if (materialList.code === 200) {
        let materialArray = materialList.responseBody;
        setMaterialApi([]);
        materialArray.map((material, index) => {
          setMaterialApi((prevState) => [
            ...prevState,
            {
              id: material.id,
              label: "(" + material.code + ") " + material.description,
            },
          ]);
        });
      } else {
        console.log("Some thing went wrong");
      }
    }
    getMaterials();
  }, []);

  const add = async (e) => {
    // console.log("Route Id ==>" + routeId + "Transporer ID:" + transporterId);
    if (!VendorId) {
      // console.log("Vendor ID IS NOT THERE");
      setDialogTitle("Vendor is empty");
      setSuccessMessage("Select a route to link Vendor");
      setOpen(true);
      return;
    }

    if (!materialId) {
      // console.log("Material is not available");
      setDialogTitle("Material is empty");
      setSuccessMessage("Select a Material to link Vendor");
      setOpen(true);
      return;
    }

    let userCompany = AuthServices.getSelectedPlant();

    let plantId = userCompany.plantId;

    // console.log("Route Id ==>" + routeId + "Transporer ID:" + transporterId);
    let data = {
      materialId: materialId,
      vendorId: VendorId,
      companyId: plantId,
    };
    let vendorMaterialAddResponse = await vendorServices.addVendorMaterial(
      data
    );

    if (vendorMaterialAddResponse.code === 200) {
      setDialogTitle("Vendor Material Link Successfully");
      setSuccessMessage("Vendor is assigned to Material successfully");
      setOpen(true);
      handelRouteChangeBasedOnID(VendorId);
    } else {
      if (vendorMaterialAddResponse.code === 209) {
        setDialogTitle("Material Already Exists");
        setSuccessMessage("Change Vendor  or Material  and try again");
        setOpen(true);
      }
    }
  };
  async function handelRouteChangeBasedOnID(id) {
    let response = await vendorServices.getVendorBasedonSelectedID(id);
    if (response.code === 200) {
      getVendorMaterialList(response.responseBody);
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
    let byteCharacters = atob(VendorMaterialFile);
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
      "Vendor_Material_Template.xlsx"
    );
  };

  const uploadVendorMaterial = async (e) => {
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

    let linkVendorMaterialResponce =
      await LinkServicesObj.uploadLinkVendorMaterial(formData);
    // console.log(
    //   "Update Material Response:" + JSON.stringify(materialAddResponse)
    // );
    if (linkVendorMaterialResponce.code === 200) {
      setDialogTitle("Linked  Successfully");
      setSuccessMessage(linkVendorMaterialResponce.responseBody);
      setOpen(true);
      setSelectedFile(null);
      handelRouteChangeBasedOnID(VendorId);
    } else {
      if (linkVendorMaterialResponce.code === 209) {
        setDialogTitle("Linking Failed");
        setSuccessMessage(linkVendorMaterialResponce.responseBody);
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Vendor Material</h2>
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
                    uploadVendorMaterial(e);
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
                  // justifyContent: "center",
                }}
              >
                <ThemeProvider theme={formLabelsTheme}>
                  <Autocomplete
                    {...vendorListApi}
                    disablePortal
                    id="RouteList"
                    sx={{ width: 500, marginLeft: 1 }}
                    onChange={(e, v) => {
                      if (v != null) {
                        setVendorId(v.id);
                        handelRouteChangeBasedOnID(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      //<TextField {...params} label="Supplier" />
                      <TextField
                        {...params}
                        label={
                          <span>
                            Supplier <span style={{ color: "red" }}> *</span>
                          </span>
                        }
                      />
                    )}
                  />

                  <Autocomplete
                    {...meterialListApi}
                    disablePortal
                    id="TransporterList"
                    sx={{ width: 500, marginLeft: 3 }}
                    onChange={(e, v) => {
                      if (v != null) {
                        setMaterialId(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      // <TextField {...params} label="Material" />
                      <TextField
                        {...params}
                        label={
                          <span>
                            Material <span style={{ color: "red" }}> *</span>
                          </span>
                        }
                      />
                    )}
                  />

                  <div style={{ margin: "10px", width: "150px" }}>
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
        <h2>Vendor Material Linked List</h2>

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
      </Grid>
    </div>
  );
}

export default VendorMaterial;
