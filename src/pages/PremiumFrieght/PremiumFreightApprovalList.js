import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
//import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
//import DeleteIcon from "@mui/icons-material/Delete";
//import IconButton from "@mui/material/IconButton";

const containerStyle = {
  padding: "4px",
  height: "100%",

  // margin: "auto",
  backgroundColor: "#F0FFFF",
};

const paperStyle = {
  width: "90%",
  height: "130px",
  overflow: "hidden",
  paddingLeft: "20px",
};

const formControlStyle = { m: 1, minWidth: 250, marginTop: "30px" };

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const columns = [
  { id: "sno", label: "Sno", minWidth: 50, align: "center" },
  {
    id: "planId",
    label: "Plan Id",
    minWidth: 50,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "pfId",
    label: "PF Id",
    minWidth: 50,
    align: "left",
    //format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "source",
    label: "Source",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "destination",
    label: "Destination",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "modeOfTransport",
    label: "Mode Of Transport",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "transportCost",
    label: "Transport Cost",
    minWidth: 100,
    align: "center",
    format: (value, row) => <Button variant="contained">Contained</Button>,
    //format: (value) => value.toFixed(2),
  },
  {
    id: "requiredQuantity",
    label: "Required Quantity",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "totalWeight",
    label: "Total Weight",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "totalVolume",
    label: "Total Volume",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "dispatchDate",
    label: "Dispatch Date",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "approvalStatus",
    label: "Approval Status",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
];

function createData(
  sno,
  planId,
  pfId,
  source,
  destination,
  modeOfTransport,
  transportCost,
  requiredQuantity,
  totalWeight,
  totalVolume,
  dispatchDate,
  approvalStatus,
  actions
) {
  return {
    sno,
    planId,
    pfId,
    source,
    destination,
    modeOfTransport,
    transportCost,
    requiredQuantity,
    totalWeight,
    totalVolume,
    dispatchDate,
    approvalStatus,
    actions,
  };
}

const rows = [
  createData(
    1,
    "PFL7896K",
    "GHEF8976",
    "Banglore",
    "Delhi",
    "Air",
    "$800",
    "20 ton",
    "100 ton",
    "15  ton",
    "03-05-2023",
    "Pending For Approval",
    "Submit"
  ),
];

// const SaveButton = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "20px",
//         color: "#15317E",
//       }}
//     >
//       <Button
//         variant="contained"
//         disableElevation
//         style={{ backgroundColor: "#15317E", borderRadius: "18px" }}
//       >
//         Save Premium Freight Plan
//       </Button>
//     </div>
//   );
// };

const SelectData = () => {
  //  const [planId, setplanId] = React.useState("");

  // const handlePlanId = (event) => {
  //   setplanId(event.target.value);
  // };

  return (
    <Paper sx={paperStyle}>
      {/* <FormControl sx={formControlStyle}>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <TextField
            label="Plan Id"
            fullWidth
            sx={{ marginRight: 2, width: "200px" }}
          />
          <TextField
            label="Premium Plan Id"
            fullWidth
            sx={{ marginRight: 2, width: "200px" }}
          />
        </div>
      </FormControl> */}

      <FormControl sx={formControlStyle}>
        <div style={{ display: "flex", flexWrap: "nowrap", marginTop: "-8px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker label="Start Date & time" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </FormControl>
      <FormControl sx={formControlStyle}>
        <div style={{ display: "flex", flexWrap: "nowrap", marginTop: "-8px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker label="End Date & time" />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </FormControl>
      <FormControl sx={formControlStyle}>
        <div style={{ display: "flex", flexWrap: "nowrap", marginTop: "8px" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "blue", borderRadius: "18px" }}
          >
            Search
          </Button>
        </div>
      </FormControl>
    </Paper>
  );
};

const PremiumFreightApprovalList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container style={containerStyle}>
      <h3 style={{ color: "#1C3F75", marginLeft: "10px" }}>
        Premium Freight Plan List
      </h3>
      <Grid item xs={12} style={ItemStyle}>
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <SelectData />
        </div>
      </Grid>
      <Grid item xs={12} style={ItemStyle}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          console.log("Yolo", value);
                          if (value !== "Submit") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Button
                                    variant="outlined"
                                    style={{
                                      borderRadius: "18px",
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    style={{
                                      borderRadius: "18px",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    Error
                                  </Button>
                                </div>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PremiumFreightApprovalList;
