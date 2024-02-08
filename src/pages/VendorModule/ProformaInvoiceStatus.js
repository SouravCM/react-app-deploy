import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
//import { Chart } from "react-google-charts";
//import Button from "@mui/material/Button";
//import Radio from "@mui/material/Radio";
//import RadioGroup from "@mui/material/RadioGroup";
//import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
//import FormLabel from "@mui/material/FormLabel";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import TextField from "@mui/material/TextField";
//import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
//import FormGroup from "@mui/material/FormGroup";

//import { TableVirtuoso, TableComponents } from "react-virtuoso";

import Stack from "@mui/material/Stack";

import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};
const textStyle = {
  margin: "4px",
  padding: "4px",
  width: "90%",
  height: "55px",
};

const columns = [
  {
    id: "sno",
    label: "Sno",
    //minWidth: 50,
    align: "center",
  },
  {
    id: "InvoiceID",
    label: "Invoice ID",
    //  minWidth: 100,
    align: "left",
  },
  {
    id: "fromdate",
    label: "From Date",
    //minWidth: 60,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "todate",
    label: "To Date",
    // minWidth: 50,
    align: "left",
    //format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: "totalamount",
    label: "Total Amount",
    // minWidth: 100,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "vehiclenumber",
    label: "Vehicle Number",
    // minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "approvalstatus",
    label: "Approval Status",
    //minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "Action",
    label: "Action",
    //minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
];

function createData(
  sno,
  InvoiceID,
  fromdate,
  todate,
  totalamount,
  vehiclenumber,
  approvalstatus,
  Action
) {
  return {
    sno,
    InvoiceID,
    fromdate,
    todate,
    totalamount,
    vehiclenumber,
    approvalstatus,
    Action,
  };
}

const rows = [
  createData(
    "1",
    "INV082KH",
    "10 Mar 2023",
    "20 Mar 2023",
    "144000",
    "Multiple",
    "Waiting for Approval",
    "568"
  ),
  createData(
    "1",
    "INV082KH",
    "10 Mar 2023",
    "20 Mar 2023",
    "144000",
    "Multiple",
    "Approve on 15 Mar 2023",
    "568"
  ),
  createData(
    "1",
    "INV082KH",
    "10 Mar 2023",
    "20 Mar 2023",
    "144000",
    "Multiple",
    "Approve on 15 Mar 2023",
    "568"
  ),
];

function PinvoicesListwithApproval() {
  const [status, setstatus] = useState("");
  const [clientname, setclientname] = useState("");

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
    <div>
      <Grid container style={containerStyle}>
        <h3>Proforma Invoice Status</h3>
        <Grid item xs={12} style={ItemStyle}>
          <Paper sx={{ width: "100%", overflow: "hidden", padding: "8px" }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="status"
                    value={status}
                    label="Status"
                    style={textStyle}
                    variant="outlined"
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <MenuItem value={10}>A1234D</MenuItem>
                    <MenuItem value={20}>C4264G</MenuItem>
                    <MenuItem value={30}>F45336J</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Client Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="clientname"
                    value={clientname}
                    label="Client Name"
                    style={textStyle}
                    variant="outlined"
                    onChange={(e) => setclientname(e.target.value)}
                  >
                    <MenuItem value={10}>A1234D</MenuItem>
                    <MenuItem value={20}>C4264G</MenuItem>
                    <MenuItem value={30}>F45336J</MenuItem>
                  </Select>
                </FormControl>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "55px",
                    marginBottom: "11px",
                  }}
                >
                  <FormControl
                    style={{
                      marginLeft: "20px",
                      margin: "30px",
                    }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker label="Start Date & time" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </FormControl>
                  <DemoItem>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker label="End Date & time" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </DemoItem>
                </div>
                <Button
                  variant="outlined"
                  style={{
                    marginLeft: "20px",
                    width: "35%",
                    height: "53px",
                    backgroundColor: "lightblue",
                    marginBottom: "6px",
                  }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
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
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
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
    </div>
  );
}

export default PinvoicesListwithApproval;
