import React, { useEffect, useState } from "react";
import moment from "moment";

import { Button, Grid, Paper, Tooltip } from "@mui/material";

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

function ManageDebitNote() {
  const [dnList, setdnList] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDNDetails();
  }, []);

  const getDNDetails = async (e) => {
    let plant = AuthServices.getSelectedPlant();
    let plantID = plant.plantId;

    let data = {
      companyId: plantID,
      level1Status: "PENDING",
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
          },
        ])
      );
    } else if (dnData.code === 208) {
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      renderCell: (params) => {
        const handleEditClick = () => {
          //console.log("Edit Clicked" + JSON.stringify(params.row.id));
          navigate("/MainLayout/EGenerateDebitNote", { state: params.row.id });
        };

        return (
          <Tooltip title="Edit Plan">
            <EditIcon color="primary" onClick={handleEditClick} />
          </Tooltip>
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

  return (
    <Grid container style={containerStyle}>
      <h2 style={{ color: "#1C3F75", marginLeft: "10px" }}>
        Debit Note Summary
      </h2>
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
                rows={dnList}
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

export default ManageDebitNote;
