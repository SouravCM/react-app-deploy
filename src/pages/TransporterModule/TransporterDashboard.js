import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { Chart } from "react-google-charts";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import { TableVirtuoso, TableComponents } from "react-virtuoso";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const data = [
  ["Plannes", "Count"],
  ["Completed", 60],
  ["Assigned", 20],
  ["Ongoing", 40],
];
const data1 = [
  ["Plannes", "Count"],
  ["Stoped", 80],
  ["Running", 25],
  ["Idele", 15],
];

const countSum = data
  .slice(1)
  .reduce((accumulator, currentValue) => accumulator + currentValue[1], 0);

const options = {
  title: "Total Vehicles :100",
};

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  backgroundColor: "#F0FFFF",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const ButtonAreaStyle = {
  padding: "4px",
  margin: "4px",
  width: "100px",
};

// const PieChart = () => {
//   return (
//     <Chart chartType="PieChart" data={data} width={"75%"} height={"250px"} />
//   );
// };

const PieChart = () => {
  const options = {
    pieHole: 0.5,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#333",
        fontSize: 12,
        fontName: "Arial",
      },
    },
    slices: {
      0: { color: "#357EC7" },
      1: { color: "#50C878" },
      2: { color: "#1AA260" },
    },
    pieSliceTextStyle: {
      fontSize: 10,
    },
  };

  return (
    <div style={{ position: "relative", width: "80%", height: "300px" }}>
      <Chart
        chartType="PieChart"
        data={data}
        width={"100%"}
        height={"100%"}
        options={options}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span
              style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
            >
              {countSum}
            </span>
          </div>
          <div>
            <span
              style={{ fontSize: "10px", fontWeight: "bold", color: "#333" }}
            >
              Total Trips
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PieChart1 = () => {
  const options = {
    pieHole: 0.5,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#333",
        fontSize: 12,
        fontName: "Arial",
      },
    },
    slices: {
      0: { color: "#C32148" },
      1: { color: "#E55451" },
      2: { color: "#FF8040" },
    },
    pieSliceTextStyle: {
      fontSize: 10,
    },
  };

  return (
    <div style={{ position: "relative", width: "80%", height: "300px" }}>
      <Chart
        chartType="PieChart"
        data={data1}
        width={"100%"}
        height={"100%"}
        options={options}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span
              style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}
            >
              {countSum}
            </span>
          </div>
          <div>
            <span
              style={{ fontSize: "10px", fontWeight: "bold", color: "#333" }}
            >
              Total Vehicles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Boxs = () => {
  const box1Style = {
    border: "3px solid #34A56F", // Increase border width to 4px
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    width: "30%",
  };

  const box2Style = {
    border: "3px solid #C34A2C", // Increase border width to 4px
    borderRadius: "10px",
    padding: "10px",
    margin: "10px",
    width: "30%",
  };

  const h2Style = {
    margin: 0,
    textAlign: "center", // center align the text
  };

  return (
    <div>
      <div style={box1Style}>
        <h2 style={h2Style}>{data[1][0]}</h2>
        <h2 style={h2Style}>{data[1][1]}</h2>
      </div>
      <div style={box2Style}>
        <h2 style={h2Style}>{data[2][0]}</h2>
        <h2 style={h2Style}>{data[2][1]}</h2>
      </div>
    </div>
  );
};

const columns = [
  { id: "sno", label: "Sno", minWidth: 50, align: "center" },
  {
    id: "tripId",
    label: "Trip Id",
    minWidth: 150,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "vehicleNo",
    label: "Vehicle No",
    minWidth: 150,
    align: "left",
    //format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "driverName",
    label: "Driver Name",
    minWidth: 50,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "clientName",
    label: "Client Name",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "gpsStatus",
    label: "GPS Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "tripStatus",
    label: "Trip Status",
    minWidth: 100,
    align: "center",
    format: (value, row) => <Button variant="contained">Contained</Button>,
    //format: (value) => value.toFixed(2),
  },
];

function createData(
  sno,
  tripId,
  vehicleNo,
  driverName,
  clientName,
  gpsStatus,
  tripStatus
) {
  return {
    sno,
    tripId,
    vehicleNo,
    driverName,
    clientName,
    gpsStatus,
    tripStatus,
  };
}

const rows = [
  createData(1, "T89009", "TR19HJ7878", "Raj J", "RML", "Running", "On Going"),
  createData(2, "T89008", "TR19HJ9302", "Rahul", "RML", "Idle", "Asigned"),
  createData(
    3,
    "T89007",
    "TR19HJ8894",
    "Jack K",
    "RML",
    "Stopped",
    "Completed"
  ),
];

function TransporterDashboard() {
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
      <h2 style={{ color: "#15317E", marginLeft: "10px" }}>
        Transporter Dashboard
      </h2>
      <Grid item xs={12} style={ItemStyle}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <PieChart />
            </div>
            <div style={{ flex: 1 }}>
              <PieChart1 />
            </div>
          </div>
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
            rowsPerPageOptions={[5, 10, 15]}
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
}

export default TransporterDashboard;
