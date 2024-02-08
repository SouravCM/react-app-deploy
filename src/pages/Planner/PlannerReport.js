import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Typography, Modal } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";
import React, { useState } from "react";

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

function PlannerReport() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [startDate, setstartDate] = useState(dayjs());
  const [endDate, setendDate] = useState(dayjs());
  const [allPlanner, setAllPlanner] = useState([]);

  const [openError, setopenError] = React.useState(false);

  const handleCloseError = () => {
    setopenError(false);
  };

  const [dialogErrorTitleMessage, setDialogErrorTitleMessage] = useState();
  const [dialogErrorContentMessage, setDialogErrorContentMessage] = useState();

  const getDataGate = async (e) => {
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
    let plannerData = await plannerService.getPlanList(data);
    console.log("Planer Data:" + JSON.stringify(plannerData));
    if (plannerData.code === 200) {
      const sortedPlannerData = plannerData.responseBody.sort((a, b) => {
        if (a.vehicleAssigned < b.vehicleAssigned) return -1;
        if (a.vehicleAssigned > b.vehicleAssigned) return 1;
        return 0;
      });
      setAllPlanner([]);
      sortedPlannerData.map((plannerData, index) =>
        setAllPlanner((prevState) => [
          ...prevState,
          {
            id: plannerData.id,
            sno: index + 1,
            planNo: plannerData.planNo,
            planDate: moment(new Date(plannerData.planDate)).format(
              "DD-MM-YYYY"
            ),
            route: plannerData.route.name,
            totalWeight: plannerData.totalWeight,
            vehicleAssigned: plannerData.vehicleAssigned,
            totalVolume: plannerData.totalVolume,
            expectedDate: moment(new Date(plannerData.expectedDate)).format(
              "DD-MM-YYYY"
            ),
            type: plannerData.type,
            status: plannerData.status,
            items: plannerData.items,
          },
        ])
      );
    } else if (plannerData.code === 208) {
      setDialogErrorTitleMessage("No Data");
      setDialogErrorContentMessage("");
      setopenError(true);
    } else {
      setDialogErrorTitleMessage("Error");
      setDialogErrorContentMessage("");
      setopenError(true);
    }
  };

  const columns = [
    {
      field: "sno",
      headerName: "Sl No",
      align: "center",
      headerAlign: "center",
      minWidth: 30,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "type",
      headerName: "Trip Type",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "planNo",
      headerName: "Plan No",
      renderCell: (params) => {
        const pno = params.value;
        let color = "blue"; // Define the desired color based on a condition or any other logic
        return <div style={{ color }}>{pno}</div>;
      },
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      color: "primary",
    },

    {
      field: "planDate",
      headerName: "Plan Date",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "route",
      headerName: "Route",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalWeight",
      headerName: "Total Weight",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalVolume",
      headerName: "Total Volume",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vehicleAssigned",
      headerName: "Vehicle Assigned",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "expectedDate",
      headerName: "Expected Date",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
  ];
  const planColumns = [
    {
      field: "sno",
      headerName: "Sl No",
      align: "center",
      headerAlign: "center",
      minWidth: 40,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vendor",
      headerName: "Supplier",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "materialCode",
      headerName: "Material Code",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "materialDescription",
      headerName: "Material Description",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "requiredQuantity",
      headerName: "Required Quantity",
      align: "center",
      headerAlign: "center",
      minWidth: 130,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalWeight",
      headerName: "Total Weight(Kg)",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalVolume",
      headerName: "Total Volume(m3)",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
  ];
  const csvOptions = { fileName: "Planner Report" };
  const [planRows, setPlanRows] = useState([]);
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
  const [openVendorMaterialList, setOpenVendorMaterialList] =
    React.useState(false);
  const handlePlanDetaislClose = () => {
    setOpenVendorMaterialList(false);
  };
  const handleCellClick = (params) => {
    setPlanRows([]); //Clear existing list in array
    console.log("PARAMS:" + JSON.stringify(params));
    params.row.items.map((item, index) => {
      setPlanRows((prevState) => [
        ...prevState,
        {
          id: item.id,
          sno: index + 1,
          vendor: item.vendor.name,
          materialCode: item.material.code,
          materialDescription: item.material.description,
          requiredQuantity: item.requestedQuantity,
          unitWeight: item.material.weight,
          totalWeight: item.material.weight * item.requestedQuantity,
          totalVolume: item.material.volume * item.requestedQuantity,
        },
      ]);
      return null;
    });
    setOpenVendorMaterialList(true);
  };
  return (
    <Grid container style={containerStyle}>
      <h3 style={{ marginLeft: "8px" }}>Planner Report</h3>
      <Grid item xs={12} style={ItemStyle}>
        <div>
          <Paper elevation={2}>
            <div style={{ padding: "8px", display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ margin: "8px" }}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setstartDate(newValue)}
                    format="DD-MM-YYYY"
                  />
                </div>

                <div style={{ margin: "8px" }}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    format="DD-MM-YYYY"
                    onChange={(newValue) => setendDate(newValue)}
                  />
                </div>
                <Button
                  variant="contained"
                  style={{
                    borderRadius: "5px",
                    padding: "16px",
                    margin: "8px",
                    width: "auto",
                    height: "auto",
                  }}
                  onClick={getDataGate}
                >
                  Search
                </Button>
              </LocalizationProvider>
            </div>
          </Paper>
        </div>
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
                rows={allPlanner}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
                slots={{ toolbar: CustomToolbar }}
                onCellClick={(params) => {
                  if (params.field === "planNo") {
                    handleCellClick(params);
                  }
                }}
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
          <Modal
            open={openVendorMaterialList}
            onClose={handlePlanDetaislClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                maxWidth: "800px",
                padding: "20px",
                maxHeight: "80vh", // Limit the height to 80% of the viewport height
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Plan Details
              </Typography>
              <DataGrid
                rows={planRows}
                columns={planColumns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
                className="super-app-theme"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "20px",
                }}
              >
                <Button variant="contained" onClick={handlePlanDetaislClose}>
                  close
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div>
          <Dialog
            open={openError}
            onClose={handleCloseError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {dialogErrorTitleMessage}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {dialogErrorContentMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{ display: "flex", justifyContent: "center" }}
            >
              {/* <Button onClick={handleClose}>Disagree</Button> */}
              <Button onClick={handleCloseError} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </Grid>
  );
}

export default PlannerReport;
