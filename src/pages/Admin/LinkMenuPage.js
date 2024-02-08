import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
//import { styled } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LinkServices from "../../services/LinkServices.js";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import {
  Autocomplete,
  Button,
  Checkbox,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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

function LinkMenuPage() {
  const [menuList, setMenuList] = useState([]);
  const [rows, setRows] = useState([]);
  const [menuId, setMenuId] = useState("");
  const [menuName, setMenuName] = useState("");
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getMenuList() {
      let menuList = await LinkServices.getMenuList();

      if (menuList.code === 200) {
        setMenuList(
          menuList.responseBody.map((menu) => ({
            label: menu.name,
            id: menu.id,
          }))
        );
      } else {
        console.log("Some thing went wrong");
      }
    }
    getMenuList();

    async function getMenuListPage() {
      // console.log("Id is" + id);
      let pageList = await LinkServices.getPageList();

      // console.log("page JSon" + JSON.stringify(pageList));
      if (pageList.code === 200) {
        setRows([]);
        pageList.responseBody.map((page, index) =>
          setRows((prevState) => [
            ...prevState,
            {
              id: page.id,
              sl: index + 1,
              page: page.displayName,
              description: page.description,
              checked: false,
            },
          ])
        );
      } else {
        console.log("Some thing went wrong");
      }
    }
    getMenuListPage();
  }, []);

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
      field: "page",
      headerName: "Page",
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

  async function handleMenuChange(id) {
    let pageListBasedonSelectedID =
      await LinkServices.getPageListBasedonSelectedID(id);

    // console.log("Selected" + JSON.stringify(pageListBasedonSelectedID));
    if (pageListBasedonSelectedID.code === 200) {
      const pageIdsFromApi = pageListBasedonSelectedID.responseBody.map(
        (item) => item.page.id
      );

      //  console.log("menuIdsFromApi -" + JSON.stringify(menuIdsFromApi));

      const updatedRows = rows.map((row) => ({
        ...row,
        checked: pageIdsFromApi.includes(row.id),
      }));

      setRows(updatedRows);
      // console.log("Ckecked box rows- " + JSON.stringify(rows));
    } else {
      console.log("Some thing went wrong");
    }
  }

  const menuListDropdown = {
    options: menuList,
    getOptionLabel: (option) => option.label,
  };

  async function linkMenuPage() {
    //alert("Link clicked");
    // console.log("Chicked List- " + JSON.stringify(rows));

    const linkMenuPage = [];

    for (const item of rows) {
      if (item.checked) {
        linkMenuPage.push({
          menu: {
            id: menuId,
          },
          page: {
            id: item.id,
          },
        });
      }
    }

    if (menuId.length === 0) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select a Menu");
      setOpen(true);
      return;
    }
    if (linkMenuPage.length === 0) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select at least one Page");
      setOpen(true);
      return;
    }

    let linkResponce = await LinkServices.addLinkMEnuPageBatch(linkMenuPage);

    if (linkResponce.code === 200) {
      setDialogTitleMessage("Link Success");
      setDialogContentMessage(
        linkMenuPage.length + " Page Linked To " + menuName + " Role"
      );
      setOpen(true);
      handleMenuChange(menuId);
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
        <h2>Link Menu Page</h2>
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
              <Autocomplete
                {...menuListDropdown}
                disablePortal
                id="RoleDropDown"
                sx={{ width: "30%", marginLeft: "10px" }}
                onChange={(e, r) => {
                  if (r != null) {
                    setMenuName(r.label);
                    setMenuId(r.id);
                    handleMenuChange(r.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label={<span>Select Menu</span>} />
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
                List Of Page
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
          <Button variant="contained" onClick={linkMenuPage}>
            Link
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LinkMenuPage;
