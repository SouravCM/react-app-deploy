import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import MaterialServices from "../../services/MaterialServices.js";
import AuthServices from "../../services/AuthServices";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControlLabel, Switch, Typography, Modal } from "@mui/material";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileSaver from "file-saver";
import { MaterialTempleteFile } from "../../utils/constants.js";

import {
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid-pro";

import CancelIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PacmanLoader from "react-spinners/PacmanLoader";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        density: "compact",
      },
    },
  },
});

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
  maxWidth: "190px",
  margin: "8px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust background color and opacity for the overlay
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999, // Ensure the overlay is on top
};
const loaderStyle = {
  backgroundColor: "transparent", // Set loader background to transparent
};

function MaterialMaster() {
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
      headerName: "code",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      editable: true,

      headerClassName: "super-app-theme--header",
    },

    {
      field: "description",
      headerName: "Description",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      editable: true,

      headerClassName: "super-app-theme--header",
    },

    {
      field: "uom",
      headerName: "UOM",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      editable: true,

      headerClassName: "super-app-theme--header",
    },
    {
      field: "packQty",
      headerName: "Pack Qty",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      editable: true,

      headerClassName: "super-app-theme--header",
    },
    {
      field: "weight",
      headerName: "Weight of Pack(Kg)",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      editable: true,

      headerClassName: "super-app-theme--header",
    },
    {
      field: "length",
      headerName: "Pack Length(mts)",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      editable: true,

      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "width",
      headerName: "Pack Width(mts)",
      align: "center",
      headerAlign: "center",
      editable: true,

      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "height",
      headerName: "Pack Height(mts)",
      align: "center",
      headerAlign: "center",
      editable: true,

      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "volume",
      headerName: "Volume",
      align: "center",
      editable: true,

      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
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
    //const id = params.id;

    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const materialUpdateJson = {
      id: params.row.id,
      name: "RML Material",
      code: params.row.code,
      description: params.row.description,
      weightUOM: params.row.uom,
      standardPackQuantity: params.row.packQty,
      weight: params.row.weight,
      length: params.row.length,
      width: params.row.width,
      height: params.row.height,
      volume: params.row.volume,
      status: params.row.status,

      company: { id: plantId },
    };
    //console.log("request=== " + JSON.stringify(materialUpdateJson));

    let updateMaterialResponse = await MaterialServices.updateMaterialList(
      materialUpdateJson
    );

    if (updateMaterialResponse.code === 200) {
      setEditedRows({});
      setDialogTitleMessage("Material Details Updated");
      setDialogContentMessage(
        "Material : " + params.row.code + " Updated Successfully"
      );
      setOpen(true);
      getAllMaterialList();
    } else {
      if (updateMaterialResponse.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(updateMaterialResponse.responseBody);
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

  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [uom, setuom] = useState();
  const [packQty, setPackQty] = useState();
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [volume, setVolume] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const [open, setOpen] = React.useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Calculate the volume whenever any of the dimensions change
    const volume1 = length * width * height;
    setVolume(volume1);
  }, [length, width, height]);

  const handleClose = () => {
    setCode("");
    setDescription("");
    setuom("");
    setPackQty("");
    setWeight("");
    setLength("");
    setWidth("");
    setHeight("");
    setOpen(false);
    if (tableData.length != 0) getAllMaterialList();
  };

  const handleUoM = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, "");
    setuom(newValue);
  };

  const handlePackQty = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, "");
    setPackQty(newValue);
  };

  const handlecodechange = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9 ]/g, ""); // Limit the length to 10 characters
    if (newValue.length <= 10) {
      setCode(newValue);
    }
  };
  const handleDescription = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9 ]/g, "");
    setDescription(newValue);
  };
  const handleweight = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9 .]/g, "");
    setWeight(newValue);
  };

  const handleVolume = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, "");
    setVolume(newValue);
  };

  const [tableData, setTableData] = useState([]);
  async function getAllMaterialList() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    let materialsList = await MaterialServices.getMaterialList(plantId);
    // console.log("All Material List:" + JSON.stringify(materialsList));

    if (materialsList.code === 200) {
      // console.log(
      //   "All  Material List:=>" + JSON.stringify(materialsList.responseBody)
      // );
      setTableData([]);
      let materialsArray = materialsList.responseBody;

      materialsArray.map((material, index) => {
        setTableData((prevState) => [
          ...prevState,
          {
            id: material.id,
            seq: index++,
            code: material.code,
            description: material.description,
            uom: material.weightUOM,
            packQty: material.standardPackQuantity,
            weight: material.weight,
            length: material.length,
            width: material.width,
            height: material.height,
            volume: material.volume,
            status: material.status,
          },
        ]);
        // console.log("Lenght:" + tableData.length);
      });
    } else {
      setDialogTitleMessage("Material list failed");
      setDialogContentMessage(
        "Something went wrong while getting material list, try again!"
      );
      setOpen(true);
    }
  }
  useEffect(() => {
    getAllMaterialList();
  }, []);

  const uploadMaterial = async (e) => {
    setLoading(true);
    if (selectedFile === null) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select a File");
      setOpen(true);
      return;
    }
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("companyId", plantId);

    let materialAddResponse = await MaterialServices.uploadMaterialList(
      formData
    );
    // console.log(
    //   "Update Material Response:" + JSON.stringify(materialAddResponse)
    // );
    if (materialAddResponse.code === 200) {
      setLoading(false);
      setDialogTitleMessage("Material Added  Successfully");
      setDialogContentMessage(materialAddResponse.responseBody);
      setOpen(true);
      setSelectedFile(null);
      getAllMaterialList();
    } else {
      if (materialAddResponse.code === 209) {
        setLoading(false);
        setDialogTitleMessage("Material Adding Failed");
        setDialogContentMessage(materialAddResponse.responseBody);
        setOpen(true);
      }
    }
  };

  const addMaterial = async (e) => {
    //console.log("Button Cliked");
    if (code.length === 0) {
      //console.log("code is empty");
      setDialogTitleMessage("Material Code is empty");
      setDialogContentMessage("Enter Material code");
      setOpen(true);
      return;
    }
    if (description.length === 0) {
      setDialogTitleMessage("Material Description is empty");
      setDialogContentMessage("Enter Material description");
      setOpen(true);
      return;
    }
    if (uom.length === 0) {
      setDialogTitleMessage("Material UOM is empty");
      setDialogContentMessage("Enter Material UOM");
      setOpen(true);
      return;
    }
    if (packQty.length === 0) {
      setDialogTitleMessage("Material PackQty is empty");
      setDialogContentMessage("Enter Material PackQty");
      setOpen(true);
      return;
    }

    if (weight.length === 0) {
      //console.log("weight is empty");
      setDialogTitleMessage("Material Weight is empty");
      setDialogContentMessage("Enter Material Weight");
      setOpen(true);
      return;
    }
    if (length.length === 0) {
      setDialogTitleMessage("Material Length is empty");
      setDialogContentMessage("Enter Material Length");
      setOpen(true);
      return;
    }
    if (width.length === 0) {
      setDialogTitleMessage("Material Width is empty");
      setDialogContentMessage("Enter Material Width");
      setOpen(true);
      return;
    }
    if (height.length === 0) {
      setDialogTitleMessage("Material Height is empty");
      setDialogContentMessage("Enter Material Height");
      setOpen(true);
      return;
    }
    if (volume.length === 0) {
      setDialogTitleMessage("Material Volumn is empty");
      setDialogContentMessage("Enter Material Volumn");
      setOpen(true);
      return;
    }

    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    const materialJson = {
      code: code,
      name: "RML Material",
      description: description,
      make: make,
      model: model,
      weight: weight,
      weightUOM: uom,
      standardPackQuantity: packQty,
      length: length,
      width: width,
      height: height,
      status: "Active",
      volume: volume,
      company: { id: plantId },
    };
    // console.log("request " + JSON.stringify(materialJson));
    let materialAddResponse = await MaterialServices.addMaterialMaster(
      materialJson
    );
    //console.log("Add Material Response:" + JSON.stringify(materialAddResponse));
    if (materialAddResponse.code === 200) {
      // console.log("Successfully Added ");
      setDialogTitleMessage("Material Added  Successfully");
      setDialogContentMessage(description + " Added Successfully");
      setOpen(true);
    } else {
      if (materialAddResponse.code === 209) {
        setDialogTitleMessage("Material Adding Failed");
        setDialogContentMessage("Something went wrong, try again!!");
        setOpen(true);
      }
    }
  };

  const onFileChange = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handelTempleteDownload = () => {
    let sliceSize = 1024;
    let byteCharacters = atob(MaterialTempleteFile);
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
      "Material_Template.xlsx"
    );
  };

  return (
    <div>
      {loading && (
        <div style={overlayStyle}>
          <PacmanLoader color={"#1976d2"} loading={loading} size={30} />
        </div>
      )}
      <Grid container style={containerStyle}>
        <h3 style={{ marginLeft: "8px" }}>Add Material</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "95%",
          }}
        >
          <Typography variant="body1">Add Material </Typography>
          <FormControlLabel
            style={{ marginLeft: "5px" }}
            control={
              <Switch
                checked={isUpload}
                onChange={(e) => setIsUpload(e.target.checked)}
                color="primary"
              />
            }
            label="Upload Material"
          />
        </div>
        {isUpload ? (
          <Grid item xs={12} style={ItemStyle}>
            <Paper
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              sx={{
                width: "98%",
                padding: "8px",
                display: "flex",
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
                    uploadMaterial(e);
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              sx={{
                width: "98%",
                padding: "8px",
                display: "flex",
              }}
            >
              <ThemeProvider theme={formLabelsTheme}>
                <form noValidate autoComplete="off">
                  <TextField
                    required
                    id="Code"
                    label="Material Code"
                    variant="outlined"
                    style={textStyle}
                    value={code}
                    onChange={handlecodechange}
                  />

                  <TextField
                    required
                    id="description"
                    label="Material Description"
                    variant="outlined"
                    style={textStyle}
                    value={description}
                    onChange={handleDescription}
                  />
                  <TextField
                    required
                    id="uom"
                    label="UoM"
                    variant="outlined"
                    style={textStyle}
                    value={uom}
                    onChange={handleUoM}
                  />
                  <TextField
                    required
                    id="packQty"
                    label="Pack Qty"
                    variant="outlined"
                    style={textStyle}
                    value={packQty}
                    onChange={handlePackQty}
                  />

                  <TextField
                    required
                    id="weight"
                    label="Weight of the Pack"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">kg</InputAdornment>
                      ),
                    }}
                    style={textStyle}
                    value={weight}
                    onChange={handleweight}
                  />

                  <TextField
                    id="length"
                    label="Pack Length"
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mts</InputAdornment>
                      ),
                    }}
                    style={textStyle}
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                  <TextField
                    id="width"
                    label="Pack Width"
                    variant="outlined"
                    style={textStyle}
                    value={width}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mts</InputAdornment>
                      ),
                    }}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                  <TextField
                    id="height"
                    label="Pack Height"
                    variant="outlined"
                    style={textStyle}
                    value={height}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">mts</InputAdornment>
                      ),
                    }}
                    onChange={(e) => setHeight(e.target.value)}
                  />

                  <TextField
                    disabled
                    id="volume"
                    label="Volume"
                    variant="outlined"
                    style={textStyle}
                    value={volume}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          mt<sup>3</sup>
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleVolume}
                  />

                  <Button
                    style={{
                      flex: 1,
                      maxWidth: "150px",
                      marginTop: "18px",
                      marginLeft: "8px",
                    }}
                    variant="contained"
                    onClick={(e) => {
                      addMaterial(e);
                    }}
                  >
                    Add
                  </Button>
                </form>
              </ThemeProvider>
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} style={ItemStyle}>
          <Paper sx={{ width: "100%" }}>
            <h3> List of Materials </h3>
            <ThemeProvider theme={theme}>
              <div style={{ height: 400, width: "100%" }}>
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
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                />
              </div>
            </ThemeProvider>
          </Paper>

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
      </Grid>
    </div>
  );
}

export default MaterialMaster;
