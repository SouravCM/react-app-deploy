import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
//import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AuthServices from "../../services/AuthServices";
import RouteServices from "../../services/RouteServices.js";
import VendorServices from "../../services/VendorServices";

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
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        density: 'compact',
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

const textStyle = {
  margin: "4px",
  padding: "4px",
  width: "20%",
  height: "40px",
};

const columns = [
  {
    field: "sno",
    headerName: "Sl No",
    align: "center",
    headerAlign: "center",
    minWidth: 50,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "planNo",
    headerName: "Plan No",
    align: "center",
    headerAlign: "center",
    minWidth: 180,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "planDate",
    headerName: "Plan Date",
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
    field: "unitWeight",
    headerName: "Unit Weight",
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
    field: "requestedQuantity",
    headerName: "Requested Quantity",
    align: "center",
    headerAlign: "center",
    minWidth: 200,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "dispatchedQuantity",
    headerName: "Dispatched Quantity",
    align: "center",
    headerAlign: "center",
    minWidth: 200,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
    editable: true,
    type: "number",
  },
  {
    field: "dispatchedDate",
    headerName: "Dispatched Date",
    align: "center",
    headerAlign: "center",
    minWidth: 200,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
    editable: true,
    type: "number",
  },
  {
    field: "pendingQuantity",
    headerName: "Pending Quantity",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
  {
    field: "remarks",
    headerName: "Remarks",
    align: "center",
    headerAlign: "center",
    minWidth: 150,
    flexGrow: 1,
    headerClassName: "super-app-theme--header",
    editable: true,
  },
];

function SupplierUndispatched() {
  const [startDate, setstartDate] = useState(dayjs());
  const [endDate, setendDate] = useState(dayjs());
  const [vendorId, setVendorId] = useState();
  const [allDiapatchDetails, setAllDiapatchDetails] = useState([]);

  const csvOptions = { fileName: "Dispatch Report" };
  const [supplierListVar, setSupplierListVar] = useState([]);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    async function getSupplier() {
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let supplierList = await RouteServices.getListOfSuppliers(plantId);
      if (supplierList.code === 200) {
        let supplierArray = supplierList.responseBody;
        setSupplierListVar([]);
        setSupplierListVar([{ id: 0, name: "All" }])
        supplierArray.map((supplier, index) => {
          setSupplierListVar((prevState) => [
            ...prevState,
            { id: supplier.id, name: supplier.name },
          ]);
        });
      } else {
        setDialogTitleMessage("Getting Supplier list Error");
        setDialogContentMessage("Something went wrong, check your network!!");
        setOpen(true);
      }
    }
    getSupplier();
  }, []);
  const defaultProps1 = {
    options: supplierListVar,
    getOptionLabel: (option) => option.name,
  };
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

  async function getDataDispatchDetails() {
    let userCompany = AuthServices.getSelectedPlant();
    let companyIdVar = userCompany.plantId;

    const formattedEndDate = endDate.endOf("day").format("YYYY-MM-DD HH:mm:ss");
    const formattedStartDate = startDate
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    // let vendor = AuthServices.getVendor();
    // let vendorId = vendor[0].vendor.id;

    var dateJson;
    if(vendorId === 0){
      console.log("Selected ALL");
       dateJson = {
        companyId: companyIdVar,
        vendorId: vendorId,
        fromDate: formattedStartDate,
        toDate: formattedEndDate,
      };
    }else{
      console.log("Select specific ve")

       dateJson = {
        companyId: companyIdVar,
        vendorId: vendorId,
        fromDate: formattedStartDate,
        toDate: formattedEndDate,
      };


    }

    // const dateJson = {
    //   companyId: companyIdVar,
    //   vendorId: vendorId,
    //   fromDate: formattedStartDate,
    //   toDate: formattedEndDate,
    // };

    console.log(dateJson);

    let undispatched = await VendorServices.getVendorMaterialList(dateJson);

    if (undispatched.code === 200) {
      setAllDiapatchDetails([]);

      if (undispatched.responseBody) {
        undispatched.responseBody.map((undispatched, index) =>
          setAllDiapatchDetails((prevState) => [
            ...prevState,
            {
              id: undispatched.planItemId,
              sno: index + 1,
              planNo: undispatched.planNo,
              planDate: moment(new Date(undispatched.planDate)).format(
                "DD-MM-YYYY"
              ),
              material:
                undispatched.material.name + "-" + undispatched.material.code,
              materialCode: undispatched.material.code,
              materialDescription: undispatched.material.description,
              unitWeight: undispatched.material.weight,
              expectedDate: undispatched.expectedDate,
              requestedQuantity: undispatched.requestedQuantity,
              vendorId: undispatched.requestedQuantity,

              dispatchedQuantity: undispatched.dispatchedQuantity,
              dispatchedDate: undispatched.dispatchedOn,
              pendingQuantity:
                undispatched.requestedQuantity -
                undispatched.dispatchedQuantity,
              remarks: undispatched.dispatchedRemarks,
            },
          ])
        );
      } else {
        console.log("No Dispatches!!");
      }

      // detentionRows.shift();
    } else {
      console.log("Some thing went worng");
    }
  }

  return (
    <div>
      <Grid container style={containerStyle}>
        <h3 style={{ marginLeft: "8px" }}>Supplier unDispatch Report</h3>
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
                  <Autocomplete
                    {...defaultProps1}
                    style={textStyle}
                    disablePortal
                    id="VendorList"
                    sx={{ width: 300 }}
                    onChange={(e, v) => {
                      if (v != null) {
                        console.log(
                          "Supplier Selected:" + v.id + "Supller No:" + v.name
                        );
                        setVendorId(v.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Supplier" />
                    )}
                  />

                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "5px",
                      padding: "16px",
                      margin: "8px",
                      width: "auto",
                      height: "auto",
                    }}
                    onClick={getDataDispatchDetails}
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
                Supplier UnDispatches
              </h3>
            </div>
            <ThemeProvider theme={theme}>

            <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
              <DataGrid
                rows={allDiapatchDetails}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
                localeText={{
                  noRowsLabel: "No Materials Dispatched", // Customize the "No Rows" message here
                }}
                slots={{ toolbar: CustomToolbar }}
                getRowClassName={(params) => {
                  const rowValues = params.row; // Replace 'columnName' with the actual column name containing the condition value
                  if (rowValues.status === "REJECTED") {
                    // Replace 'desiredValue' with the value that should trigger the row color change
                    return "super-app-theme--light-red";
                  } else if (params.indexRelativeToCurrentPage % 2 === 0) {
                    return "super-app-theme--odd";
                  } else {
                    return "super-app-theme--even";
                  }
                }}
                sx={{
                  // boxShadow: 2,
                  // border: 2,
                  // borderColor: "#1C3F75",
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
      </Grid>
    </div>
  );
}

export default SupplierUndispatched;
