import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));
const formControlStyle = { m: 1, minWidth: 250 };

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
  //paddingTop: "2%",
};

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const columns = [
  {
    field: "store",
    headerName: "Store",
    minWidth: 200,
    align: "center",
  },
  {
    field: "Company",
    headerName: "Company",
    minWidth: 200,
    align: "center",
  },
];

const rows = [{ id: 1, store: "12345", Company: "Kiran" }];

function LinkStoreCompany() {
  // const handlemenuchange = (event) => {
  //   const { value } = event.target;
  //   const newValue = value.replace(/[^A-Za-z]/g, "");
  //   setMenu(newValue);
  // };
  const [linkStore, setLinkStore] = React.useState("");
  const [linkCompany, setLinkCompany] = React.useState("");

  const handleLinkStore = (event) => {
    setLinkStore(event.target.value);
  };
  const handleLinkCompany = (event) => {
    setLinkCompany(event.target.value);
  };
  //const [menu, setMenu] = useState("");

  const add = async (e) => {
    console.log("Button Cliked");
  };

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Link Store Company </h2>

        <Grid item xs={12} style={ItemStyle}>
          <Paper sx={{ width: "99%", overflow: "hidden", padding: "8px" }}>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                alignItems: "center",
                //justifyContent: "center",
              }}
            >
              <FormControl sx={formControlStyle}>
                <InputLabel id="demo-simple-select-standard-label">
                  Select Store from List
                </InputLabel>
                <Select
                  id="linkStore"
                  value={linkStore}
                  onChange={handleLinkStore}
                  label="Select Store from List"
                >
                  <MenuItem value={"Dashboard"}>Security</MenuItem>
                  <MenuItem value={"Gatepass"}>Planner</MenuItem>
                  <MenuItem value={"Plan"}>PlantHead</MenuItem>
                  <MenuItem value={"Action"}>Financehead</MenuItem>
                  <MenuItem value={"Masters"}>Suplier</MenuItem>
                  <MenuItem value={"Reports"}>Trasnporter</MenuItem>
                  <MenuItem value={"Admin"}>PlanAdmin</MenuItem>
                  <MenuItem value={"Audit"}>Corporate</MenuItem>
                  <MenuItem value={"Audit"}>Admin</MenuItem>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>

              <FormControl sx={formControlStyle}>
                <InputLabel id="demo-simple-select-standard-label">
                  Select Company from List
                </InputLabel>
                <Select
                  id="linkCompany"
                  value={linkCompany}
                  onChange={handleLinkCompany}
                  label="Select Company from List"
                >
                  <MenuItem value={"Dashboard"}>Security</MenuItem>
                  <MenuItem value={"Gatepass"}>Planner</MenuItem>
                  <MenuItem value={"Plan"}>PlantHead</MenuItem>
                  <MenuItem value={"Action"}>Financehead</MenuItem>
                  <MenuItem value={"Masters"}>Suplier</MenuItem>
                  <MenuItem value={"Reports"}>Trasnporter</MenuItem>
                  <MenuItem value={"Admin"}>PlanAdmin</MenuItem>
                  <MenuItem value={"Audit"}>Corporate</MenuItem>
                  <MenuItem value={"Audit"}>Admin</MenuItem>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>

              <Button
                variant="outlined"
                onClick={(e) => {
                  add(e);
                }}
                style={{
                  marginLeft: "20px",
                  width: "15%",
                  height: "43px",
                  backgroundColor: "blue",
                  marginBottom: "6px",
                  color: "white",
                }}
              >
                Add
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
          <DataGrid
            //rows={tableData}
            rows={rows}
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

              "& .super-app-theme--even": {
                backgroundColor: "#E8E8E8",
              },

              "& .super-app-theme--odd": {
                backgroundColor: "#ffffff",
              },
            }}
          />
        </div>
      </Grid>
    </div>
  );
}

export default LinkStoreCompany;
