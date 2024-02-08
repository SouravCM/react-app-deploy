import React, { useEffect, useState } from "react";
import moment from "moment";

import { Button, Grid, Paper, Tooltip, Typography } from "@mui/material";

import {
  DataGrid,
  GridActionsCellItem,
  GridCsvExportMenuItem,
  GridToolbarContainer,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import AuthServices from "../../services/AuthServices";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import transporterService from "../../services/TransporterService";
import EditIcon from "@mui/icons-material/Edit";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PublishIcon from "@mui/icons-material/Publish";
import Dropzone from "react-dropzone";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        density: "compact",
      },
    },
  },
});

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

function ManageInvoice() {
  const [invoiceList, setInvoiceList] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUpload, setIsUpload] = useState(false);
  const [invoiceId, setInvoiceID] = useState();

  const onFileChange = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getInvoiceDetails();
  }, []);

  const getInvoiceDetails = async (e) => {
    let plant = AuthServices.getSelectedPlant();
    let plantID = plant.plantId;
    let transporter = AuthServices.getTransporter();

    let transporterId = transporter[0].transporter.id;

    let data = {
      companyId: plantID,
      transporterId: transporterId,
      level1Status: "PENDING",
    };
    let invoiceData = await transporterService.getInvoiceList(data);
    // //console.log("Planns:" + JSON.stringify(plannerData));
    setInvoiceList([]);
    if (invoiceData.code === 200) {
      invoiceData.responseBody.map((invoice, index) =>
        setInvoiceList((prevState) => [
          ...prevState,
          {
            id: invoice.id,
            sno: index + 1,
            invoiceDate: moment(new Date(invoice.invoiceDate)).format(
              "DD-MM-YYYY"
            ),
            invoiceNo: invoice.invoiceNo,
            totalDistance: invoice.totalDistance,
            estimatedCost: invoice.estimatedCost,
            actualCost: invoice.actualCost,
            gstType: invoice.gstType,
            gstPercentage: invoice.gstPercentage,
            totalEstimatedCost: invoice.totalEstimatedCost,
            totalActualCost: invoice.totalActualCost,
            noOfVehicles: invoice.noOfVehicles,
            noOfTrips: invoice.noOfTrips,
            creator: invoice.creator.name,
          },
        ])
      );
    } else if (invoiceData.code === 208) {
      setDialogTitleMessage("No Data");
      setDialogContentMessage("");
      setOpen(true);
    } else {
      setDialogTitleMessage("Error");
      setDialogContentMessage("");
      setOpen(true);
    }
  };

  const columns = [
    {
      field: "sno",
      headerName: "Sl No",
      align: "center",
      headerAlign: "center",
      minWidth: 10,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "invoiceNo",
      headerName: "Invoice No",
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      flexGrow: 2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalDistance",
      headerName: "Total Distance",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "estimatedCost",
      headerName: "Estimated Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "actualCost",
      headerName: "Actual Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "gstType",
      headerName: "GST Type",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "gstPercentage",
      headerName: "GST Percentage",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "totalEstimatedCost",
      headerName: "Total Estimated Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalActualCost",
      headerName: "Total Actual Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "noOfVehicles",
      headerName: "Vehicle Nos",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "noOfTrips",
      headerName: "Trip Nos",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "creator",
      headerName: "Creator",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 130,
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      renderCell: (params) => {
        const handleEditClick = () => {
          //console.log("Edit Clicked" + JSON.stringify(params.row.id));
          navigate("/MainLayout/EGenerateInvoice", { state: params.row.id });
        };

        const handleViewClick = () => {
          //console.log("Edit Clicked" + JSON.stringify(params.row.id));
          navigate("/MainLayout/InvoiceView", { state: params.row.id });
        };
        const handleUploadClick = async (params) => {
          setInvoiceID(params.row.id);
          setIsUpload(true);
        };

        return (
          <>
            <GridActionsCellItem
              title="Upload Document"
              color="success"
              icon={<PublishIcon />}
              label="Upload"
              onClick={() => handleUploadClick(params)}
            />

            <GridActionsCellItem
              title="Edit Invoice"
              color="primary"
              icon={<EditIcon />}
              label="Edit"
              onClick={() => handleEditClick()}
            />

            <GridActionsCellItem
              title="View Invoice"
              color="warning"
              icon={<FileOpenIcon />}
              label="Done"
              onClick={() => handleViewClick()}
            />
          </>
        );
      },
    },
  ];
  const csvOptions = { fileName: "Planer Report" };

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer {...props}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExportContainer>
          <GridCsvExportMenuItem options={csvOptions} />
        </GridToolbarExportContainer>
      </GridToolbarContainer>
    );
  }

  const uploadRouteVendor = async (e) => {
    if (selectedFile === null) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select a File");
      setOpen(true);
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("invoiceId", invoiceId);

    let uploadResponce = await transporterService.uploadInvoiceDocument(
      formData
    );

    if (uploadResponce.code === 200) {
      setDialogTitleMessage("Success");
      setDialogContentMessage("Document Upload Success");
      setOpen(true);
      setSelectedFile(null);
      setIsUpload(false);
    } else {
      if (uploadResponce.code === 209) {
        setDialogTitleMessage("Failed");
        setDialogContentMessage("Failed To Upload Document");
        setOpen(true);
      }
    }
  };

  return (
    <Grid container style={containerStyle}>
      <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>Invoice Summary</h2>
      {isUpload ? (
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{ color: "#1C3F75", margin: "10px 0" }}
            >
              Please upload supporting document for your invoice{" "}
            </Typography>
          </Grid>
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
                  color="error"
                  onClick={(e) => {
                    setIsUpload(false);
                    setSelectedFile(null);
                  }}
                >
                  Cancle
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "100%",
              padding: "6px",
              display: "flex",
            }}
          >
            <ThemeProvider theme={theme}>
              <div style={{ height: 540, width: "100%", overflow: "scroll" }}>
                <DataGrid
                  rows={invoiceList}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[5, 10, 25]}
                  scrollbarSize={10}
                  slots={{ toolbar: CustomToolbar }}
                  sx={{
                    "& .MuiDataGrid-cell:hover": {
                      color: "#1C3F75",
                    },
                    "& .super-app-theme--header": {
                      backgroundColor: "#A9A9A9",
                      fontWeight: "bold",
                    },
                    "& .super-app-theme--green": {
                      backgroundColor: "#ffffff",
                    },
                    "& .super-app-theme--odd": {
                      backgroundColor: "#ffffff",
                    },
                    "& .super-app-theme--light-red": {
                      backgroundColor: "#ffccbc",
                    },
                  }}
                />
              </div>
            </ThemeProvider>
          </Paper>
        </Grid>
      )}
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
  );
}

export default ManageInvoice;
