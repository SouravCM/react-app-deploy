import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import LinkServicesObj from "../../services/LinkServices";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const containerStyle = {
  padding: "4px",
  height: "auto",
  //margin: "auto",
};

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

function LinkRolePage() {
  const [roleId, setRoleId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [roleList, setRoleList] = useState([]);
  const [rows, setRows] = useState([]);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getRoleList() {
      let response = await LinkServicesObj.getRoleList();

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
    async function getPageList() {
      // console.log("Id is" + id);
      let pageList = await LinkServicesObj.getPageList();

      // console.log("All Page List:" + JSON.stringify(pageList.responseBody));

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
    getPageList();
  }, []);

  const roleListDropdown = {
    options: roleList,
    getOptionLabel: (option) => option.label,
  };

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
      headerName: "Page Name",
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

  //const csvOptions = { fileName: "Page List" };

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer {...props}>
        <GridToolbarFilterButton />
        {/* <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExportContainer>
          <GridCsvExportMenuItem options={csvOptions} />
        </GridToolbarExportContainer> */}
      </GridToolbarContainer>
    );
  }

  async function handleRoleChange(id) {
    let roleListBasedonSelectedID =
      await LinkServicesObj.getListRolePageBasedonSelectedID(id);

    if (roleListBasedonSelectedID.code === 200) {
      const roleIdsFromApi = roleListBasedonSelectedID.responseBody.map(
        (item) => item.page.id
      );

      //  console.log("menuIdsFromApi -" + JSON.stringify(menuIdsFromApi));

      const updatedRows = rows.map((row) => ({
        ...row,
        checked: roleIdsFromApi.includes(row.id),
      }));

      setRows(updatedRows);
      // console.log("Ckecked box rows- " + JSON.stringify(rows));
    } else {
      console.log("Some thing went wrong");
    }
  }

  async function linkRolePage() {
    const listRolePage = [];

    for (const item of rows) {
      if (item.checked) {
        listRolePage.push({
          role: {
            id: roleId,
          },
          page: {
            id: item.id,
          },
        });
      }
    }

    if (roleId.length === 0) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select a Role");
      setOpen(true);
      return;
    }
    if (listRolePage.length === 0) {
      setDialogTitleMessage("Error");
      setDialogContentMessage("Please Select at least one Page");
      setOpen(true);
      return;
    }

    let linkResponce = await LinkServicesObj.addLinkRolePageBatch(listRolePage);

    if (linkResponce.code === 200) {
      setDialogTitleMessage("Link Success");
      setDialogContentMessage(
        listRolePage.length + " Page Linked To " + roleName + " Role"
      );
      setOpen(true);
      handleRoleChange(roleId);
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
        <h2>Link Role Page</h2>
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
                    setRoleId(r.id);
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
                List Of Page
              </h3>
            </div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                slots={{ toolbar: CustomToolbar }}
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
          <Button variant="contained" onClick={linkRolePage}>
            Link
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LinkRolePage;
