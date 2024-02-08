import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import FreightServices from "../../services/FreightServices.js";
import AuthServices from "../../services/AuthServices";
import transporterService from "../../services/TransporterService.js";
import dayjs from "dayjs";

const InvoiceLevel2Approval = () => {
  const [tableData, setTableData] = useState([]);

  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceDistance, setInvoiceDistance] = useState("");
  const [invoiceCreator, setInvoiceCreator] = useState("");
  const [invoiceNoT, setInvoiceNoT] = useState("");
  const [invoiceNoV, setInvoiceNoV] = useState("");
  const [invoiceGstType, setInvoiceGsttype] = useState("");
  const [invoiceGst, setInvoiceGst] = useState("");
  const [invoiceToatlAC, setInvoiceTotalAC] = useState("");
  const [invoiceToatlEC, setInvoiceTotalEC] = useState("");
  const [id, setId] = useState();
  const [userId, setUserId] = useState();

  const [remarks, setRemarks] = useState("");
  const [isValidRemarks, setIsValidRemarks] = useState(true);

  const [open, setOpen] = React.useState(false);

  const [openComplete, setOpenComplete] = React.useState(false);
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
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "estimatedCost",
      headerName: "Estimated Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
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
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "totalEstimatedCost",
      headerName: "Total Estimated Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalActualCost",
      headerName: "Total Actual Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
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
      field: "creator",
      headerName: "Creator",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
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
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      renderCell: (params) => {
        const handleClick = async () => {
          setId(params.row.id);
          setInvoiceNo(params.row.invoiceNo);
          setInvoiceDate(params.row.invoiceDate);
          setInvoiceDistance(params.row.totalDistance);
          setInvoiceCreator(params.row.creator);
          setInvoiceNoT(params.row.noOfTrips);
          setInvoiceNoV(params.row.noOfVehicles);
          setInvoiceGsttype(params.row.gstType);
          setInvoiceGst(params.row.gstPercentage);
          setInvoiceTotalAC(params.row.actualCost);
          setInvoiceTotalEC(params.row.estimatedCost);
          setOpen(true);
        };

        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{ minWidth: "45px", borderRadius: "15px" }}
          >
            Verify
          </Button>
        );
      },
    },
  ];
  const validateRemarks = (remark) => {
    // Additional validation logic
    return remark.length > 0; // Validate that remarks is not empty after trimming whitespace
  };

  const handleCloseComplete = () => {
    setOpen(false);
    setOpenComplete(false);
    getInvoiceLevel1();
  };
  const [dialogTitleMessageComplete, setDialogTitleMessageComplete] =
    useState();
  const [dialogContentMessageComplete, setDialogContentMessageComplete] =
    useState();

  const handleClose = () => {
    setOpen(false);
  };
  const handleRemarks = (event) => {
    const inputValue = event.target.value;
    setRemarks(inputValue);
  };

  const handleCancel = () => {
    setOpen(false);
    console.log("Cancel Button Clicked!!");
  };

  const handleApprove = async () => {
    setOpen(false);
    let approvedOn = dayjs(new Date());
    const formattedDate = approvedOn.format("YYYY-MM-DD HH:mm:ss");
    const jsonBody = {
      id: id,
      level2Status: "APPROVED",
      level2ApprovedBy: userId,
      level2Remarks: remarks,
      level2ApprovedOn: formattedDate,
    };
    // console.log("data- " + JSON.stringify(jsonBody));

    const responseApproval = await transporterService.InvoiceUpdateLevel2Status(
      jsonBody
    );

    if (responseApproval.code === 200) {
      setDialogTitleMessageComplete("Invoice Approval");
      setDialogContentMessageComplete("Invoice Successfully");
      setOpenComplete(true);
    } else {
      setDialogTitleMessageComplete("Invoice Approval");
      setDialogContentMessageComplete("Something went wrong, Try again.");
      setOpenComplete(true);
    }
  };

  const handleReject = async () => {
    setOpen(false);
    let approvedOn = dayjs(new Date());
    const formattedDate = approvedOn.format("YYYY-MM-DD HH:mm:ss");
    if (remarks.length === 0) {
      setDialogTitleMessageComplete("Invoice Approval");
      setDialogContentMessageComplete("Remarks is requried");
      setOpenComplete(true);
    } else {
      const jsonBody = {
        id: id,
        level2Status: "REJECTED",
        level2ApprovedBy: userId,
        level2Remarks: remarks,
        level2ApprovedOn: formattedDate,
      };
      //console.log("data- " + JSON.stringify(jsonBody));

      const responseApproval =
        await transporterService.InvoiceUpdateLevel2Status(jsonBody);

      if (responseApproval.code === 200) {
        setDialogTitleMessageComplete("Invoice Approval");
        setDialogContentMessageComplete("Invoice Rejected Successfully");
        setOpenComplete(true);
      } else {
        setDialogTitleMessageComplete("Invoice Approval");
        setDialogContentMessageComplete("Something went wrong, Try again.");
        setOpenComplete(true);
      }
    }
  };

  const containerStyle = {
    padding: "8px",
    height: "100%",
  };

  const ItemStyle = {
    padding: "4px",
    margin: "4px",
  };

  const tableStyle = {
    padding: "4px",
    margin: "8px",
  };
  const tableTdStyle = {
    padding: "4px",
    marginRight: "4px",
  };
  const tableTdStyle1 = {
    marginLeft: "4px",
    padding: "4x",
  };

  async function getInvoiceLevel1() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    let requestBody = {
      companyId: plantId,
      level1Status: "APPROVED",
      level2Status: "PENDING",
    };

    let invoiceList = await transporterService.getInvoiceList(requestBody);
    //console.log("All Freight List:" + JSON.stringify(freightList));
    setTableData([]);
    if (invoiceList.code === 200) {
      let invoiceArray = invoiceList.responseBody;
      invoiceArray.map((invoice, index) => {
        if (invoice.level1Status != "REJECTED") {
          setTableData((prevState) => [
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
            },
          ]);
        }
      });
    }
  }
  useEffect(() => {
    //get User Details
    let userData = AuthServices.getUserDetails();
    console.log("User Id:" + userData.id);
    setUserId(userData.id);

    getInvoiceLevel1();
  }, []);
  return (
    <div>
      <Grid container style={containerStyle}>
        <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>
          Invoice Level 2 Approval
        </h2>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "100%",
              padding: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "auto",
                width: "auto",
                zIndex: 999,
                marginLeft: "8px",
              }}
            ></div>
            <div style={{ height: 490, width: "100%", overflow: "scroll" }}>
              <DataGrid
                rows={tableData}
                columns={columns}
                defaultDensity="Compact"
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
      </Grid>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Invoice Approval</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <table style={tableStyle}>
              <tr>
                <td style={tableTdStyle}>Invoice No:</td>

                <td style={tableTdStyle1}>
                  <b>{invoiceNo}</b>
                </td>
                <td style={tableTdStyle}>Invoice Date:</td>
                <td style={tableTdStyle1}>
                  <b>{invoiceDate}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Distance:</td>

                <td style={tableTdStyle1}>
                  <b>{invoiceDistance}</b>
                </td>
                <td style={tableTdStyle}>Creator:</td>
                <td style={tableTdStyle1}>
                  <b>{invoiceCreator}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>No of trips:</td>

                <td style={tableTdStyle1}>
                  <b>{invoiceNoT}</b>
                </td>
                <td style={tableTdStyle}>No of Vehicles:</td>

                <td style={tableTdStyle1}>
                  <b>{invoiceNoV}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>GST Type:</td>

                <td style={tableTdStyle1}>
                  <b>{invoiceGstType}</b>
                </td>
                <td style={tableTdStyle}>GST %:</td>

                <td style={tableTdStyle1}>
                  <b>{invoiceGst}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Total Estimated Cost(Rs.):</td>

                <td style={tableTdStyle1}>
                  <b>{invoiceToatlAC}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Total Actual Cost(Rs.):</td>

                <td style={tableTdStyle1}>
                  <b>{invoiceToatlEC}</b>
                </td>
              </tr>
            </table>

            <TextField
              required
              margin="dense"
              id="remarksText"
              label="Remarks"
              value={remarks}
              onChange={handleRemarks}
              error={!isValidRemarks || !validateRemarks(remarks)}
              helperText={
                !isValidRemarks
                  ? "Please enter a valid remarks"
                  : !validateRemarks(remarks)
                  ? "Remarks cannot be empty"
                  : ""
              }
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={handleApprove} variant="contained" color="success">
              Approve
            </Button>
            <Button onClick={handleReject} variant="contained" color="error">
              Reject
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
    </div>
  );
};

export default InvoiceLevel2Approval;
