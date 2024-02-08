import React, { useEffect, useState } from "react";
import moment from "moment";

import { Button, Grid, Paper, TextField, Tooltip } from "@mui/material";

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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import transporterService from "../../services/TransporterService";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";

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

function DebitNoteLevel2Approval() {
  const [dnList, setdnList] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();

  const [invoiceNo, setInvoiceNo] = useState("");
  const [debitNoteNo, setDebitNoteNo] = useState("");
  const [debitNoteDate, setDebitNoteDate] = useState("");
  const [debitNoteCreator, setDebitNoteCreator] = useState("");
  const [debitNoteGstType, setDebitNoteGsttype] = useState("");
  const [debitNoteGst, setDebitNoteGst] = useState("");
  const [debitNoteCost, setDebitNoteCost] = useState("");
  const [debitNoteTotalCost, setDebitNoteTotalCost] = useState("");
  const [transporter, setTransporter] = useState("");

  const [remarks, setRemarks] = useState("");
  const [isValidRemarks, setIsValidRemarks] = useState(true);

  const [id, setId] = useState();
  const [userId, setUserId] = useState();

  const [complited, setComplited] = React.useState(false);

  const handleRemarks = (event) => {
    const inputValue = event.target.value;
    setRemarks(inputValue);
  };

  const validateRemarks = (remark) => {
    // Additional validation logic
    return remark.length > 0; // Validate that remarks is not empty after trimming whitespace
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openDilog, setOpenDilog] = React.useState(false);
  const handleCloseDilog = () => {
    setOpenDilog(false);

    if (complited) {
      getDNDetails();
    }
  };

  useEffect(() => {
    let userData = AuthServices.getUserDetails();
    console.log("User Id:" + userData.id);
    setUserId(userData.id);
    getDNDetails();
  }, []);

  const getDNDetails = async (e) => {
    setComplited(false);
    let plant = AuthServices.getSelectedPlant();
    let plantID = plant.plantId;
    let transporter = AuthServices.getTransporter();

    let transporterId = transporter[0].transporter.id;

    let data = {
      companyId: plantID,
      level1Status: "APPROVED",
      level2Status: "PENDING",
    };
    let dnData = await transporterService.getDNList(data);
    // //console.log("Planns:" + JSON.stringify(plannerData));
    setdnList([]);
    if (dnData.code === 200) {
      dnData.responseBody.map((dn, index) =>
        setdnList((prevState) => [
          ...prevState,
          {
            id: dn.id,
            sno: index + 1,
            debtNoteDate: moment(new Date(dn.debtNoteDate)).format(
              "DD-MM-YYYY"
            ),
            transporter: dn.transporter.name,
            debitNoteNum: dn.debitNoteNum,
            invoiceNo: dn.invoice.invoiceNo,
            actualCost: dn.actualCost,
            gstType: dn.gstType,
            gstPercentage: dn.gstPercentage,
            totalCost: dn.totalCost,
            creator: dn.creator.name,
            level1Status: dn.level1Status,
            level1ApprovedBy: dn.level1Approver ? dn.level1Approver.name : "",
            level1ApprovedOn: dn.level1ApprovedOn,
            level1Remarks: dn.level1Remarks,
          },
        ])
      );
    } else if (dnData.code === 208) {
      setDialogTitleMessage("No Data");
      setDialogContentMessage("");
      setOpenDilog(true);
    } else {
      setDialogTitleMessage("Error");
      setDialogContentMessage("");
      setOpenDilog(true);
    }
  };

  const columns = [
    {
      field: "sno",
      headerName: "Sl No",
      align: "center",
      headerAlign: "center",
      minWidth: 2,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "debtNoteDate",
      headerName: "Debit Note Date",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "debitNoteNum",
      headerName: "Debit Note No",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "invoiceNo",
      headerName: "Invoice No",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 2,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "actualCost",
      headerName: "Cost",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
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
      field: "totalCost",
      headerName: "Total Cost",
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
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "transporter",
      headerName: "Transporter",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
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
          setDebitNoteNo(params.row.debitNoteNum);
          setDebitNoteDate(params.row.debtNoteDate);
          setDebitNoteCreator(params.row.creator);
          setDebitNoteGsttype(params.row.gstType);
          setDebitNoteGst(params.row.gstPercentage);
          setDebitNoteCost(params.row.actualCost);
          setDebitNoteTotalCost(params.row.totalCost);
          setTransporter(params.row.transporter);
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

    const responseApproval =
      await transporterService.DebitNoteUpdateLevel2Status(jsonBody);

    if (responseApproval.code === 200) {
      setDialogTitleMessage("Debit Note Approval");
      setDialogContentMessage("Debit Note Successfully");
      setOpenDilog(true);
      setComplited(true);
    } else {
      setDialogTitleMessage("Debit Note Approval");
      setDialogContentMessage("Something went wrong, Try again.");
      setOpenDilog(true);
      setComplited(true);
    }
  };

  const handleReject = async () => {
    setOpenDilog(false);
    let approvedOn = dayjs(new Date());
    const formattedDate = approvedOn.format("YYYY-MM-DD HH:mm:ss");
    if (remarks.length === 0) {
      setDialogTitleMessage("Debit Note Approval");
      setDialogContentMessage("Remarks is requried");
      setOpenDilog(true);
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
        await transporterService.DebitNoteUpdateLevel2Status(jsonBody);

      if (responseApproval.code === 200) {
        setDialogTitleMessage("Debit Note");
        setDialogContentMessage("Debit Note Rejected Successfully");
        setOpenDilog(true);
        setComplited(true);
      } else {
        setDialogTitleMessage("Debit Note");
        setDialogContentMessage("Something went wrong, Try again.");
        setOpenDilog(true);
        setComplited(true);
      }
    }
  };

  return (
    <Grid container style={containerStyle}>
      <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>
        Debit Note level 1 Approval
      </h2>
      <Grid item xs={12} style={ItemStyle}>
        <Paper
          sx={{
            width: "100%",
            padding: "6px",
            display: "flex",
          }}
        >
          <div style={{ height: 540, width: "100%", overflow: "scroll" }}>
            <DataGrid
              rows={dnList}
              columns={columns}
              defaultDensity="Compact"
              pageSize={20}
              rowsPerPageOptions={[5, 10, 25]}
              scrollbarSize={10}
              slots={{ toolbar: CustomToolbar }}
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Invoice Approval</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <table style={tableStyle}>
              <tr>
                <td style={tableTdStyle}>Debit Note No:</td>

                <td style={tableTdStyle1}>
                  <b>{debitNoteNo}</b>
                </td>
                <td style={tableTdStyle}>Debit Note Date:</td>
                <td style={tableTdStyle1}>
                  <b>{debitNoteDate}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Transporter:</td>

                <td style={tableTdStyle1}>
                  <b>{transporter}</b>
                </td>
                <td style={tableTdStyle}>Creator:</td>
                <td style={tableTdStyle1}>
                  <b>{debitNoteCreator}</b>
                </td>
              </tr>

              <tr>
                <td style={tableTdStyle}>GST Type:</td>

                <td style={tableTdStyle1}>
                  <b>{debitNoteGstType}</b>
                </td>
                <td style={tableTdStyle}>GST %:</td>

                <td style={tableTdStyle1}>
                  <b>{debitNoteGst}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Total Cost(Rs.):</td>

                <td style={tableTdStyle1}>
                  <b>{debitNoteCost}</b>
                </td>
              </tr>
              <tr>
                <td style={tableTdStyle}>Cost(Rs.):</td>

                <td style={tableTdStyle1}>
                  <b>{debitNoteTotalCost}</b>
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
          open={openDilog}
          onClose={handleCloseDilog}
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
            <Button onClick={handleCloseDilog} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Grid>
  );
}

export default DebitNoteLevel2Approval;
