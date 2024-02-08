import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import LinkServices from "../../services/LinkServices.js";

import { Autocomplete, Button, Checkbox, TextField } from "@mui/material";
import {
  GridCsvExportMenuItem,
  GridToolbarContainer,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const containerStyle = {
  padding: "4px",
  height: "auto",
  //margin: "auto",
};
const formControlStyle = { m: 1, minWidth: 250 };
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

function LinkRoleMenu() {
  const [roleList, setRoleList] = useState([]);
  const [rows, setRows] = useState([]);
  const [roleName, setRoleName] = useState();
  const [roleID, setRoleID] = useState("");

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getRoleList() {
      let response = await LinkServices.getRoleList();

      if (response.code === 200) {
        setRoleList(
          response.responseBody.map((role) => ({
            label: role.name,
            id: role.id,
          }))
        );
      } else {
        console.log("Something went wrong");
      }
    }
    getRoleList();

    async function getMenuList() {
      // console.log("Id is" + id);
      let menuList = await LinkServices.getAllMenuList();

      //  console.log("All Menu List:" + JSON.stringify(menuList.responseBody));

      if (menuList.code === 200) {
        setRows([]);
        menuList.responseBody.map((menu, index) =>
          setRows((prevState) => [
            ...prevState,
            {
              id: menu.id,
              sl: index + 1,
              menu: menu.name,
              description: menu.description,
              checked: false,
            },
          ])
        );
      } else {
        console.log("Some thing went wrong");
      }
    }
    getMenuList();
  }, []);

  // useEffect(() => {
  //   // This effect will run whenever the 'rows' state changes
  //   console.log("Updated rows:", rows);
  // }, [rows]);

  async function handleRoleChange(id) {
    let menuListBasedonSelectedID =
      await LinkServices.getListMenuBasedonSelectedID(id);

    if (menuListBasedonSelectedID.code === 200) {
      const menuIdsFromApi = menuListBasedonSelectedID.responseBody.map(
        (item) => item.menu.id
      );

      //  console.log("menuIdsFromApi -" + JSON.stringify(menuIdsFromApi));

      const updatedRows = rows.map((row) => ({
        ...row,
        checked: menuIdsFromApi.includes(row.id),
      }));

      setRows(updatedRows);
      // console.log("Ckecked box rows- " + JSON.stringify(rows));
    } else {
      console.log("Some thing went wrong");
    }
  }

  const roleListDropdown = {
    options: roleList,
    getOptionLabel: (option) => option.label,
  };

  const csvOptions = { fileName: "List Of Vehicles Inside" };

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

  const columns = [
    {
      field: "checked",
      headerName: "Select",
      align: "center",
      headerAlign: "center",
      flex: 0.3,
      width: "auto",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={(event) =>
            handleCheckboxChange(params.id, event.target.checked)
          }
        />
      ),
    },
    {
      field: "sl",
      headerName: "Sl No",
      align: "center",
      headerAlign: "center",
      flex: 0.2,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "menu",
      headerName: "Menu",
      align: "center",
      headerAlign: "center",
      flex: 2,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "description",
      headerName: "Description",
      align: "center",
      headerAlign: "center",
      flex: 2,
      width: "auto",
      headerClassName: "super-app-theme--header",
    },
  ];

  function handleCheckboxChange(id, isChecked) {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, checked: isChecked } : row
      )
    );
    //  console.log("update rows- " + JSON.stringify(rows));
  }

  async function linkRoleMenu() {
    //alert("Link clicked");
    // console.log("Chicked List- " + JSON.stringify(rows));

    const listRowsMenu = [];

    for (const item of rows) {
      if (item.checked) {
        listRowsMenu.push({
          role: {
            id: roleID,
          },
          menu: {
            id: item.id,
          },
        });
      }
    }

    if (roleID.length === 0) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select a Role");
      setOpen(true);
      return;
    }
    if (listRowsMenu.length === 0) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select at least one Menu");
      setOpen(true);
      return;
    }

    let linkResponce = await LinkServices.addLinkMenuRoleBatch(listRowsMenu);

    if (linkResponce.code === 200) {
      setDialogTitleMessage("Link Success");
      setDialogContentMessage(
        listRowsMenu.length + " Menu Linked To " + roleName + " Role"
      );
      setOpen(true);
      handleRoleChange(roleID);
    } else {
      if (linkResponce.code === 209) {
        setDialogTitleMessage("Error!!");
        setDialogContentMessage(linkResponce.responseBody);
        setOpen(true);
      } else {
        setDialogTitleMessage("Network Error!!");
        setDialogContentMessage("Some thing went wrong!! check your network!!");
        setOpen(true);
      }
    }
  }

  return (
    <div>
      <Grid container style={containerStyle}>
        <h2>Link Role Menu</h2>
        <Grid item xs={12} style={ItemStyle}>
          <Paper sx={{ width: "99%", overflow: "hidden", padding: "8px" }}>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Autocomplete
                {...roleListDropdown}
                disablePortal
                id="RoleDropDown"
                sx={{ width: "30%", marginLeft: "10px" }}
                onChange={(e, r) => {
                  if (r != null) {
                    setRoleName(r.label);
                    setRoleID(r.id);
                    handleRoleChange(r.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label={<span>Select Role</span>} />
                )}
              />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              border: "2px solid #696969",
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
                title="Gate Pass In and Out summary from start date to till now"
              >
                List Of Menu
              </h3>
            </div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                // columnVisibilityModel={{ gatePassId: false }}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
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
      <div
        style={{
          width: "auto",
          margin: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Button variant="contained" onClick={linkRoleMenu}>
            Link
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LinkRoleMenu;
