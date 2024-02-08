import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import React, { useState } from "react";
import AuthServices from "../../services/AuthServices";
import FreightServices from "../../services/FreightServices.js";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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

const columns = [
  {
    field: "seq",
    headerName: "SL No",
    minWidth: 100,
    align: "center",
    headerAlign: "center",
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "type",
    headerName: "Type of Freight",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },

  {
    field: "date",
    headerName: "Date",
    align: "center",
    headerAlign: "center",
    minWidth: 110,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "freightNo",
    headerName: "Freight Number",
    align: "center",
    headerAlign: "center",
    minWidth: 190,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "pickupPoint",
    headerName: "Pickup Point",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "deliveryPoint",
    headerName: "Delivery Point",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "regularMode",
    headerName: "Regular Mode",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "regularCost",
    headerName: "Regular Cost",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "premiumMode",
    headerName: "Premium Mode",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "premiumCost",
    headerName: "Premium Cost",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "costImpact",
    headerName: "Cost Impact",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "paymentBy",
    headerName: "Payment By",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "materialName",
    headerName: "Materials",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },

  {
    field: "transporterName",
    headerName: "Transporter Name",
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
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "remarks",
    headerName: "Remarks",
    align: "center",
    headerAlign: "center",
    minWidth: 250,
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
    field: "createdBy",
    headerName: "Raised By",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
];

const PremiumFreightPlanReport = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [tableData, setTableData] = useState([]);
  //  const currentDateTime = new Date();

  const handleFromDateTimeChange = (value) => {
    setFromDate(value);
    if (toDate && value >= toDate) {
      setToDate(null);
    }
  };

  const handleToDateTimeChange = (value) => {
    if (value >= fromDate) {
      setToDate(value);
    }
  };

  async function searchPremiumFreight() {
    let userCompany = AuthServices.getSelectedPlant();
    let plantId = userCompany.plantId;

    if (fromDate && toDate) {
      console.log("From Date:", fromDate);
      console.log("To Date:", toDate);

      // get the filter param values
      let fromDate_val = moment(new Date(fromDate)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      let toDate_val = moment(new Date(toDate)).format("YYYY-MM-DD HH:mm:ss");
      console.log("From Date:" + fromDate_val + " ToDate:" + toDate_val);
      // validate the mandatory fields
      if (plantId == null) {
        alert("Company id can't be empty");
        return;
      }
      if (fromDate_val == null) {
        alert("From date can't be empty");

        return;
      }
      if (toDate_val == null) {
        alert("To date can't be empty");
        return;
      }

      // form the request json
      const requestBody = {
        companyId: plantId,
        fromDate: fromDate_val,
        toDate: toDate_val,
      };

      console.log("REquest==>" + requestBody);

      let freightList = await FreightServices.getFreightList(requestBody);
      console.log("All PremiumFreight List:" + JSON.stringify(freightList));

      if (freightList.code === 200) {
        console.log(
          "All  Freight List:=>" + JSON.stringify(freightList.responseBody)
        );

        let materialsArray = freightList.responseBody;
        setTableData([]);
        materialsArray.map((freight, index) => {
          setTableData((prevState) => [
            ...prevState,
            {
              id: freight.id,
              seq: index++,
              type: freight.type,
              customerName: freight.customerName,
              materialName: freight.materialName,
              transporterName: freight.transporter.name,
              date: moment(new Date(freight.date)).format(
                "DD-MM-YYYY HH:mm:ss"
              ),
              freightNo: freight.freightNo,
              pickupPoint: freight.pickupPoint,
              deliveryPoint: freight.deliveryPoint,
              regularMode: freight.regularMode,
              regularCost: freight.regularCost,
              premiumMode: freight.premiumMode,
              premiumCost: freight.premiumCost,
              costImpact: freight.costImpact,
              vehicleNo: freight.vehicleNo,
              expectedDate: moment(new Date(freight.expectedDate)).format(
                "DD-MM-YYYY HH:mm:ss"
              ),
              remarks: freight.remarks,

              level1ApprovedOn: freight.level1ApprovedOn,
              level1Status: !freight.level1Status
                ? "PENDING"
                : freight.level1Status,
              level1ApprovedBy: !freight.level1Approver
                ? ""
                : freight.level1Approver.name,
              level1Remarks: freight.level1Remarks,
              level2ApprovedOn: freight.level2ApprovedOn,
              level2Status: !freight.level2Status
                ? "PENDING"
                : freight.level2Status,
              level2ApprovedBy: !freight.level2Approver
                ? ""
                : freight.level2Approver.name,
              level2Remarks: freight.level2Remarks,
              createdBy: freight.creator.name,
              paymentBy: freight.paymentBy,
            },
          ]);
        });
      } else {
        if (freightList.code === 208) {
          setTableData([]);
        } else {
          //TODO set Dialog here to show wrong
          console.log("Some thing went wrong");
        }
      }

      // Perform additional actions with the selected dates here
    } else {
      console.log("Please select both From and To dates.");
      alert("Select Proper Dates");
    }
  }

  return (
    <Grid container style={containerStyle}>
      <h3 style={{ marginLeft: "8px" }}>Premium Freight Report</h3>
      <Grid item xs={12} style={ItemStyle}>
        <div>
          <Paper elevation={2}>
            <div style={{ padding: "8px", display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ margin: "8px" }}>
                  {" "}
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        variant="outlined"
                        fullWidth
                        InputLabelProps={{
                          style: { color: "blue" }, // Change the label color here
                        }}
                      />
                    )}
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "blue", // Change the outline color here
                        },
                    }}
                    format={"DD-MM-YYYY HH:mm:ss"}
                    label="Select From Date"
                    value={fromDate}
                    onChange={handleFromDateTimeChange}
                  />
                </div>

                <div style={{ margin: "8px" }}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} variant="outlined" fullWidth />
                    )}
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "blue", // Change the outline color here
                        },
                    }}
                    format={"DD-MM-YYYY HH:mm:ss"}
                    label="Select To Date"
                    value={toDate}
                    onChange={handleToDateTimeChange}
                    disabled={!fromDate} // Disable the "To" date picker if "From" date is not selected
                  />
                </div>
              </LocalizationProvider>

              <Button
                variant="contained"
                style={{
                  borderRadius: "5px",
                  padding: "16px",
                  margin: "8px",
                  width: "auto",
                  height: "auto",
                }}
                onClick={(e) => {
                  searchPremiumFreight(e);
                }}
              >
                Search
              </Button>
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
              marginLeft: "10px",
            }}
          ></div>
          <ThemeProvider theme={theme}>
            <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
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
          </ThemeProvider>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PremiumFreightPlanReport;
