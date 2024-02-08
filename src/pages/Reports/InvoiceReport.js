import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography, Modal, Autocomplete, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";

import {
  DataGrid,
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
import plannerService from "../../services/PlannerService";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import transporterService from "../../services/TransporterService";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

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
  padding: "8px",
  height: "100%",
};

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const ItemStyle1 = {
  padding: "4px",
  margin: "4px",
  border: "2px solid #696969",
  borderRadius: "5px",
  paddingLeft: "0px",
  backgroundColor: "white",
};

function InvoiceReport() {
  const [startDate, setstartDate] = useState(dayjs());
  const [endDate, setendDate] = useState(dayjs());
  const [InvoiceList, setInvoiceList] = useState([]);
  const [gstTypeList, setGstTypeList] = useState([
    { name: "ALL" },
    { name: "PENDING" },
    { name: "APPROVED" },
    { name: "REJECTED" },
  ]);

  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [transporterList, setTransporterList] = useState([]);
  const [level1Status, setLevel1Status] = useState("");
  const [level2Status, setLevel2Status] = useState("");
  const [level3Status, setLevel3Status] = useState("");
  const [transporterId, setTransporterID] = useState("");
  const [isTransporter, setIsTransporter] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTrasnporter();
  }, []);
  const getInvoiceDetails = async (e) => {
    const formattedEndDate = endDate.endOf("day").format("YYYY-MM-DD HH:mm:ss");
    const formattedStartDate = startDate
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    let plant = AuthServices.getSelectedPlant();
    let plantID = plant.plantId;

    let data = {
      fromDate: formattedStartDate,
      toDate: formattedEndDate,
      companyId: plantID,
    };

    let transporter = AuthServices.getTransporter();
    // console.log("transporter" + JSON.stringify(transporter));

    if (Array.isArray(transporter) && transporter.length === 0) {
      if (transporterId !== "" && transporterId !== "ALL") {
        data.transporterId = transporterId;
      }
    } else {
      if (isTransporter) {
        let transporterIDFromcooke = transporter[0].transporter.id;
        if (transporterId !== "" && transporterId !== "ALL") {
          data.transporterId = transporterIDFromcooke;
        }
      } else {
        let transporterIDFromcooke = transporter[0].transporter.id;
        data.transporterId = transporterIDFromcooke;
      }
    }

    if (level1Status !== "" && level1Status !== "ALL") {
      data.level1Status = level1Status;
    }

    if (level2Status !== "" && level2Status !== "ALL") {
      data.level2Status = level2Status;
    }

    if (level3Status !== "" && level3Status !== "ALL") {
      data.level3Status = level3Status;
    }

    console.log("data" + JSON.stringify(data));
    let invoiceData = await transporterService.getInvoiceList(data);
    console.log("Invoice:" + JSON.stringify(invoiceData));
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
            level1Status: invoice.level1Status,
            level1ApprovedBy: invoice.level1Approver
              ? invoice.level1Approver.name
              : "",
            level1ApprovedOn: invoice.level1ApprovedOn,
            level1Remarks: invoice.level1Remarks,
            level2Status: invoice.level2Status,
            level2ApprovedBy: invoice.level2Approver
              ? invoice.level2Approver.name
              : "",
            level2ApprovedOn: invoice.level2ApprovedOn,
            level2Remarks: invoice.level2Remarks,
            level3Status: invoice.level3Status,
            level3ApprovedBy: invoice.level3Approver
              ? invoice.level3Approver.name
              : "",
            level3ApprovedOn: invoice.level3ApprovedOn,
            level3Remarks: invoice.level3Remarks,
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

  async function getTrasnporter() {
    let transporter = AuthServices.getTransporter();
    if (Array.isArray(transporter) && transporter.length === 0) {
      setIsTransporter(true);
      console.log("Transporter array is empty. Setting something...");
      // Set something here
    } else {
      setIsTransporter(false);
      console.log("Transporter array is not empty.");
    }

    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;
    let transporterList = await transporterService.getAllTransporterByPlantId(
      plantId
    );

    if (transporterList.code === 200) {
      let transporterArray = transporterList.responseBody;
      setTransporterList([]);

      let updatedTransporterList = [
        {
          id: "ALL", // Assign a unique identifier for the "ALL" option
          name: "ALL",
        },
        ...transporterArray.map((transporter) => ({
          id: transporter.id,
          name: transporter.name + " (" + transporter.code + ")",
        })),
      ];

      // Update the state with the new array
      setTransporterList(updatedTransporterList);
    } else {
      setDialogTitleMessage("Getting Transporter list Error");
      setDialogContentMessage("Something went wrong, check your network!!");
      setOpen(true);
    }
  }

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
      field: "level1Status",
      headerName: "Level 1 Status",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "level1ApprovedBy",
      headerName: "Level 1 Approved By",
      align: "center",
      headerAlign: "center",
      minWidth: 160,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "level1ApprovedOn",
      headerName: "Level 1 Approved On",
      align: "center",
      headerAlign: "center",
      minWidth: 250,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "level1Remarks",
      headerName: "Level 1 Remarks",
      align: "center",
      headerAlign: "center",
      minWidth: 250,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "level2Status",
      headerName: "Level 2 Status",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "level2ApprovedBy",
      headerName: "Level 2 Approved By",
      align: "center",
      headerAlign: "center",
      minWidth: 160,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "level2ApprovedOn",
      headerName: "Level 2 Approved On",
      align: "center",
      headerAlign: "center",
      minWidth: 250,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "level2Remarks",
      headerName: "Level 2 Remarks",
      align: "center",
      headerAlign: "center",
      minWidth: 250,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "level3Status",
      headerName: "Level 3 Status",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "level3ApprovedBy",
      headerName: "Level 3 Approved By",
      align: "center",
      headerAlign: "center",
      minWidth: 160,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "level3ApprovedOn",
      headerName: "Level 3 Approved On",
      align: "center",
      headerAlign: "center",
      minWidth: 250,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "level3Remarks",
      headerName: "Level 3 Remarks",
      align: "center",
      headerAlign: "center",
      minWidth: 250,
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
  ];
  const csvOptions = { fileName: "Invoice Report" };

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

  const gstTypeDropdown = {
    options: gstTypeList,
    getOptionLabel: (option) => option.name,
  };

  const transporterDropdown = {
    options: transporterList,
    getOptionLabel: (option) => option.name,
  };

  return (
    <Grid container style={containerStyle}>
      <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>Invoice Report</h2>
      <Grid item xs={12} style={ItemStyle1}>
        <Paper
          sx={{
            width: "98%",
            height: "80%",
            padding: "0px",
            display: "flex",
            margin: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              marginTop: "-8px",
              marginLeft: "10px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setstartDate(newValue)}
                  format="DD-MM-YYYY"
                />
              </DemoContainer>
            </LocalizationProvider>

            {/* Add a gap between the DatePickers using marginLeft */}
            <div style={{ marginLeft: "10px" }}></div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setendDate(newValue)}
                  format="DD-MM-YYYY"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          {isTransporter ? (
            <Autocomplete
              {...transporterDropdown}
              disablePortal
              id="transporterDropDown"
              sx={{ width: "30%", marginLeft: "10px" }}
              onChange={(e, r) => {
                if (r != null) {
                  setTransporterID(r.id);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label={<span>Transporter</span>} />
              )}
            />
          ) : null}
          <Autocomplete
            {...gstTypeDropdown}
            disablePortal
            id="level1status"
            sx={{ width: "20%", marginLeft: "10px" }}
            onChange={(e, r) => {
              if (r != null) {
                setLevel1Status(r.name);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label={<span>Level 1 Status</span>} />
            )}
          />{" "}
          <Autocomplete
            {...gstTypeDropdown}
            disablePortal
            id="level2status"
            sx={{ width: "20%", marginLeft: "10px" }}
            onChange={(e, r) => {
              if (r != null) {
                setLevel2Status(r.name);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label={<span>Level 2 Status</span>} />
            )}
          />{" "}
          <Autocomplete
            {...gstTypeDropdown}
            disablePortal
            id="level3status"
            sx={{ width: "20%", marginLeft: "10px" }}
            onChange={(e, r) => {
              if (r != null) {
                setLevel3Status(r.name);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label={<span>Level 3 Status</span>} />
            )}
          />
          <Button
            variant="contained"
            onClick={(e) => {
              getInvoiceDetails(e);
            }}
            style={{
              marginLeft: "20px",
              minWidth: "8%",
              height: "48px",
              marginBottom: "6px",
              color: "white",
            }}
          >
            Add
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} style={ItemStyle}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
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
              title="List Of Transporter"
            >
              List of Plans
            </h3>
          </div>
          <ThemeProvider theme={theme}>
            <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
              <DataGrid
                rows={InvoiceList}
                columns={columns}
                pageSize={10}
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
  );
}

export default InvoiceReport;
