import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { nanoid } from "nanoid";
import React, { useEffect, useState, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import GridComponent from "../../components/GridComponent";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AuthServices from "../../services/AuthServices";
import MaterialService from "../../services/MaterialService";
import RouteService from "../../services/RouteServices";
import VendorServices from "../../services/VendorServices";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import plannerService from "../../services/PlannerService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, Switch, Typography } from "@mui/material";
import { UpdateRounded } from "@mui/icons-material";
const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
};

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

function EManagePlan() {
  const navigate = useNavigate();
  const [isAdditionalTrip, setIsAdditionalTrip] = useState(false);
  const [planId, setPlanId] = useState();
  const location = useLocation();
  const data = location.state;
  const [routeName, setRouteName] = useState();
  const [planNumber, setPlanNumber] = useState();
  const [test, setTest] = useState("KIrna");
  const [expectedDate, setExpectedDate] = useState(dayjs());
  const [routeId, setRouteId] = React.useState("");
  const [vendorCode, setVendorCode] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [vendorContact, setvendorContact] = React.useState("");
  const [vendorAddress, setvendorAddress] = React.useState("");
  const [isRouteAutocomplide, setIsRouteAutocomplide] = useState(false);
  const [routeListAPI, setRouteListAPI] = useState([{}]);
  const [vendorListAPI, setVendorListAPI] = useState([{}]);
  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [open, setOpen] = React.useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [grossWeight, setGrossWeight] = useState(0);
  const [grossVolume, setGrossVolume] = useState(0);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [openSavePlanDilog, setOpenSavePlanDilog] = React.useState(false);
  const [openComplete, setOpenComplete] = React.useState(false);
  const [dialogTitleMessageComplete, setDialogTitleMessageComplete] =
    useState();
  const [dialogContentMessageComplete, setDialogContentMessageComplete] =
    useState();
  const [rows, setRows] = React.useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetOpenSavePlanDilog = () => {
    setOpenSavePlanDilog(false);
  };

  const handleCloseComplete = () => {
    setOpen(false);
    setOpenComplete(false);
    setOpenSavePlanDilog(false);

    setExpectedDate(dayjs());
    setRouteId("");

    setVendorCode("");
    setVendor("");
    setvendorContact("");
    setvendorAddress("");
    setIsRouteAutocomplide(false);
    setVendorListAPI([{}]);
    setOpen(false);
    setOpenSavePlanDilog(false);
    setOpenComplete(false);
    setRows([]);
    setSelectedMaterials([]);
    setTotalQuantity(0);
    setGrossWeight(0);
    setGrossVolume(0);
    setIsGridVisible(false);

    navigate("/MainLayout/PlannerDashboard");
  };
  ////console.log("ROUTE NAME:==>" + routeName);
  const getPlanDetails = async (e) => {
    let plannerData = await plannerService.getPlanById(data);
    ////console.log("PLan Information:" + JSON.stringify(plannerData));
    if (plannerData.code === 200) {
      setPlanNumber(plannerData.responseBody.planNo);

      setRouteId(plannerData.responseBody.routeId);
      //console.log("ROUTE NAME:" + plannerData.responseBody.route.name);
      setRouteName(plannerData.responseBody.route.name);

      if (plannerData.responseBody.type === "Regular Trip") {
        setIsAdditionalTrip(false);
      } else {
        setIsAdditionalTrip(true);
      }

      setSelectedMaterials([]); //Clear existing list in array
      plannerData.responseBody.items.map((material, index) => {
        // //console.log(
        //   "Vendor Name:" +
        //     material.vendor.name +
        //     "  Material:" +
        //     material.material.description +
        //     "  MaterialID:" +
        //     material.materialId
        // );
        const vendorName = material.vendor.name;
        setSelectedMaterials((prevState) => [
          ...prevState,
          {
            sno: index + 1,

            id: material.id,
            material: material.material.name + " " + material.material.code,
            materialCode: material.material.code,
            materialDescription: material.material.description,
            uom: material.uom,
            unitWeight: material.material.weight,
            unitVolume: material.material.volume,
            vendorId: material.vendorId,
            materialId: material.materialId,
            vendorName: vendorName,
            totalVolume: material.requestedQuantity * material.material.volume,
            totalWeight: material.requestedQuantity * material.material.weight,
            requiredQty: material.requestedQuantity,
          },
        ]);
        return null;
      });
      setIsGridVisible(true);
      handleRouteListChange(plannerData.responseBody.routeId);
    } else if (plannerData.code === 208) {
      setDialogTitleMessage("Plan details not found");
      setDialogContentMessage(plannerData.responseBody);
      setOpen(true);
    } else {
      setDialogTitleMessage("Something went wrong");
      setDialogContentMessage("Unable to get plan details, try again");
      setOpen(true);
    }
  };

  useEffect(() => {
    setPlanId(data);
    getPlanDetails();

    async function fetchRouteList() {
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let routeList = await RouteService.getRouteName(plantId);

      if (routeList.code === 200) {
        setRouteListAPI([]); //Clear existing list in array
        routeList.responseBody.map((route) =>
          setRouteListAPI((prevState) => [
            ...prevState,
            {
              label: route.name,
              id: route.id,
            },
          ])
        );
      } else {
        //console.log("Something went wrong in transporter List getting");
      }
    }
    fetchRouteList();
  }, []);

  const handleRouteListChange = async (id) => {
    //console.log("Autocomplete value changed!");
    let vendordata = await VendorServices.getVendorListByRouteID(id);
    //console.log(id);
    if (vendordata.code === 200) {
      setVendorListAPI([]); //Clear existing list in array
      vendordata.responseBody.map((vendor) =>
        setVendorListAPI((prevState) => [
          ...prevState,
          {
            label: vendor.vendor.name,
            id: vendor.vendor.id,
            code: vendor.vendor.code,
            venderId: vendor.vendor.id,
            vendorContactNo: vendor.vendor.contactNo,
            vendorAddress: vendor.vendor.addressOne,
          },
        ])
      );
      //console.log(vendorListAPI);
    } else {
      //console.log("Something went wrong in Supplier List getting");
    }
  };

  const handleVendorListChange = async (id) => {
    let materialData = await MaterialService.getMaterialListByVendorId(id);
    //console.log("Material Response:" + JSON.stringify(materialData));

    if (materialData.code === 200) {
      setRows([]); //Clear existing list in array
      materialData.responseBody.map((material, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            sno: index + 1,
            id: material.material.id,
            material: material.material.name + " " + material.material.code,
            materialCode: material.material.code,
            materialDescription: material.material.description,
            uom: material.material.weightUOM,
            unitWeight: material.material.weight,
            unitVolume: material.material.volume,
            vendorId: material.vendor.id,
            materialId: material.material.id,
            vendorName: material.vendor.name,
            totalVolume: 0,
            totalWeight: 0,
            requiredQty: 0,
          },
        ])
      );
      //console.log(vendorListAPI);
    } else {
      //console.log("Something went wrong in Supplier List getting");
    }
  };

  const routeListDropdown = {
    options: routeListAPI,
    getOptionLabel: (option) => option.label,
  };

  const vendorListDropdown = {
    options: vendorListAPI,
    getOptionLabel: (option) => option.label,
  };
  const handleAddMaterials = () => {
    const selectedRows = rows
      .filter((material) => material.requiredQty > 0)
      .map((material, index) => ({
        ...material,
        // Generate a unique id for each selected row
      }));
    if (selectedRows.length === 0) {
      // alert("");
      setDialogTitleMessage("Alert!!");
      setDialogContentMessage(
        "No Materials selected. Required Qty is zero for all materials."
      );

      setOpen(true);
      return;
    }
    // Check if selected material with the same materialCode and vendor already exists in selectedMaterials
    const existingMaterials = selectedRows.filter((selectedMaterial) =>
      selectedMaterials.some(
        (existingMaterial) =>
          existingMaterial.materialCode === selectedMaterial.materialCode &&
          existingMaterial.vendorName === selectedMaterial.vendorName
      )
    );

    //Disable Route

    if (existingMaterials.length > 0) {
      // Show popup message for duplicate material

      setDialogTitleMessage("Alert!!");
      setDialogContentMessage(
        "Material with the same code and Supplier already exists."
      );
      setOpen(true);
    } else {
      // Add the selected rows to selectedMaterials
      const updatedSelectedMaterials = [
        ...selectedMaterials,
        ...selectedRows.map((row, index) => ({
          ...row,
          // Reset requiredQty to 0
        })),
      ];
      setSelectedMaterials(updatedSelectedMaterials);
      setRows((prevState) =>
        prevState.map((material) => ({
          ...material,
          requiredQty: 0, // Reset requiredQty to 0 in materialData
        }))
      );
      //console.log("new eow ", rows);
      console.log("select meterial", selectedRows);
      console.log("ipdate meterial", updatedSelectedMaterials);
      setIsRouteAutocomplide(true);
    }
  };
  const handleQtyChange = (id, value) => {
    setSelectedMaterials((prevMaterials) => {
      const updatedMaterials = prevMaterials.map((material) => {
        if (material.id === id) {
          const requiredQty = parseFloat(value, 10) || 0;
          const totalWeight = requiredQty * material.unitWeight;
          const totalVolume = requiredQty * material.unitVolume;

          return {
            ...material,
            requiredQty,
            totalWeight,
            totalVolume,
          };
        }
        return material;
      });

      return updatedMaterials;
    });
  };
  const inputRefs = useRef({});
  const columnsNew = [
    {
      field: "vendorName",
      headerName: "Supplier",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "materialCode",
      headerName: "Material Code",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "materialDescription",
      headerName: "Material Description",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "unitWeight",
      headerName: "Unit Weight(Kg)",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "requiredQty",
      headerName: "Required Qty",
      width: 150,
      headerAlign: "center",
      align: "center",
      editable: false, // Make the RequiredQty column editable
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="number"
            ref={(el) => (inputRefs.current[params.row.id] = el)}
            data-id={params.row.id}
            value={
              params.row.requiredQty >= 0
                ? params.row.requiredQty.toString()
                : ""
            }
            onChange={(e) =>
              handleQtyChange(params.row.id, Math.max(0, e.target.value))
            }
            // value={params.row.requiredQty.toString()}
            //onChange={(e) => handleQtyChange(params.row.id, e.target.value)}
            style={{ width: "70px", textAlign: "center" }}
          />
        </div>
      ),
    },
    {
      field: "totalWeight",
      headerName: "Total Weight(Kg)",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalVolume",
      headerName: "Total Volume(m3)",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DeleteIcon
            onClick={() => handleDeleteRow(params.row.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const handleDeleteRow = (id) => {
    const updatedSelectedMaterials = selectedMaterials.filter(
      (row) => row.id !== id
    );

    const updatedRows = updatedSelectedMaterials.map((row, index) => ({
      ...row,
      id: index + 1,
    }));

    //console.log("UpdatedRows Length:" + updatedRows.length);
    if (updatedRows.length == 0) {
      setIsRouteAutocomplide(false);
    }
    setSelectedMaterials(updatedRows);
  };

  const handelSavePlan = async () => {
    const formatedExpectedDate = moment(new Date(expectedDate)).format(
      "YYYY-MM-DD"
    );

    const plant = AuthServices.getSelectedPlant();
    const plantId = plant.plantId;

    let userId;
    let userDetails = AuthServices.getUserDetails();
    if (userDetails) {
      userId = userDetails.id;
    } else {
      //console.log("User Details is not defiend");
      return;
    }

    const date = moment(new Date()).format("YYYY-MM-DD");

    const transformedItems = selectedMaterials.map((row) => {
      console.log("added row", row); // Add this line to log the 'row' object
      return {
        vendorId: row.vendorId,
        materialId: row.materialId,
        requestedQuantity: row.requiredQty,
        uom: row.uom,
      };
    });

    const planSaveData = {
      id: planId,
      planNo: planNumber,
      planDate: date,
      expectedDate: formatedExpectedDate,
      type: isAdditionalTrip ? "Additional Trip" : "Regular Trip",
      routeId: routeId,
      companyId: plantId,
      status: "OPEN",
      totalWeight: grossWeight,
      totalVolume: grossVolume,
      createdBy: userId,
      items: transformedItems,
    };

    console.log("new plan- ", planSaveData);

    let plaseSavedData = await plannerService.updatePlan(planSaveData);
    console.log("save data- ", plaseSavedData);
    if (plaseSavedData.code === 209) {
      setDialogTitleMessage("Plan Not Updated");
      setDialogContentMessage(plaseSavedData.responseBody);
      setOpen(true);
    } else if (plaseSavedData.code === 200) {
      setDialogTitleMessageComplete("Plan Updated Successfully");
      setDialogContentMessageComplete(
        "Plan Id " + plaseSavedData.responseBody.planNo
      );

      setOpenSavePlanDilog(false);
      setOpenComplete(true);
    } else {
      setDialogTitleMessage("Error!!");
      setDialogContentMessage("unable to update plan check your network");
      setOpen(true);
    }
  };

  const handleUpdatePlan = () => {
    if (selectedMaterials.length === 0) {
      setDialogTitleMessage("Add some items before saving");
      setDialogContentMessage("unable to save plan");
      setOpen(true);
      return;
    }

    let totalRequiredQuantity = 0;
    let totalWeight = 0;
    let totalVolume = 0;

    let flag = 0;
    selectedMaterials.map((material, index) => {
      if (Number(material.requiredQty) === 0) {
        flag = 1;
        return;
      }
    });
    //console.log("FLAG" + flag);
    if (flag === 1) {
      alert("Required Qty is Zero unable to proceed.");
      return;
    }
    selectedMaterials.map((material, index) => {
      //console.log("Material=>" + JSON.stringify(material));
      //console.log("Material Total Qty:" + material.requiredQty);
      totalRequiredQuantity += Number(material.requiredQty);
      totalWeight += material.requiredQty * material.unitWeight;
      totalVolume += material.requiredQty * material.unitVolume;
      return null;
    });

    if (totalWeight === 0 || totalVolume === 0) {
      alert("No Material In the Plan, all Qty is 0");
      return;
    }
    //console.log("Total Required Quantity: " + totalRequiredQuantity);
    //console.log("Total Weight: " + totalWeight);
    //console.log("Total Volume: " + totalVolume);

    //console.log("Total Qty:" + totalRequiredQuantity);
    setTotalQuantity(totalRequiredQuantity);
    setGrossWeight(totalWeight);
    setGrossVolume(totalVolume);

    setOpenSavePlanDilog(true);
  };
  const handleTripType = (e) => {
    //console.log("Trip Type:" + e);
    setIsAdditionalTrip(e);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <Grid container style={containerStyle}>
      <h3 style={{ marginLeft: "8px" }}>Modify Plan - {planNumber}.</h3>
      <Grid item xs={12} style={ItemStyle}>
        <Paper
          sx={{
            width: "100%",
            padding: "6px",
            display: "flex",
          }}
        >
          {" "}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">Regualr Trip </Typography>
            <FormControlLabel
              style={{ marginLeft: "5px" }}
              control={
                <Switch
                  checked={isAdditionalTrip}
                  onChange={(e) => handleTripType(e.target.checked)}
                  color="primary"
                />
              }
              label="Additional Trip"
            />
          </div>
          <TextField
            sx={{ width: "20%", marginLeft: "10px" }}
            id="outlined-read-only-input"
            label="Route"
            InputLabelProps={{ shrink: true }}
            value={routeName}
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <Autocomplete
           options={routeListAPI}
           getOptionLabel={(option) => option.label}
            disablePortal
            id="routeListDropDown"
           
           
            sx={{ width: "20%", marginLeft: "10px" }}
            onChange={(e, r) => {
              //setRouteName(r)
              if (r != null) {
                //setRoute(r.label);
                setRouteId(r.id);
                
                handleRouteListChange(r.id);
                //setSelectedOption(r.name);
              }
            }}
            //value={routeName}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <span>
                    Route List <span style={{ color: "red" }}> *</span>
                  </span>
                }
               
              />
            )}
            disabled={isRouteAutocomplide}
          /> */}
          <Autocomplete
            {...vendorListDropdown}
            disablePortal
            id="vendorListDropDown"
            sx={{ width: "20%", marginLeft: "10px" }}
            onChange={(e, v) => {
              if (v != null) {
                setVendorCode(v.code);
                setVendor(v.label);
                //setVendorId(v.id);
                setvendorAddress(v.vendorAddress);
                setvendorContact(v.vendorContactNo);
                handleVendorListChange(v.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <span>
                    Supplier List <span style={{ color: "red" }}> *</span>
                  </span>
                }
              />
            )}
          />
          <TextField
            sx={{ width: "20%", marginLeft: "10px" }}
            id="outlined-read-only-input"
            label="Supplier Code"
            InputLabelProps={{ shrink: true }}
            value={vendorCode}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{ width: "20%", marginLeft: "10px" }}
            id="outlined-read-only-input"
            label="Address"
            InputLabelProps={{ shrink: true }}
            value={vendorAddress}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{ width: "20%", marginLeft: "10px" }}
            id="outlined-read-only-input"
            label="Contact Number"
            InputLabelProps={{ shrink: true }}
            value={vendorContact}
            InputProps={{
              readOnly: true,
            }}
          />
        </Paper>
      </Grid>
      <Paper
        sx={{
          width: "98%",
          padding: "8px",
          display: "flex",
        }}
      >
        {isGridVisible && (
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ marginRight: "auto" }}>{vendor} Materials List</h3>
              <Button variant="contained" onClick={handleAddMaterials}>
                Add Material To Plan
              </Button>
            </div>

            <Grid container style={{ width: "100%" }}>
              <GridComponent materialData={rows} />
            </Grid>

            {selectedMaterials.length > 0 && (
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h3>Selected Materials</h3>
                <table
                  style={{
                    borderCollapse: "collapse",
                    marginLeft: "auto",
                    marginRight: "auto",
                    tableLayout: "fixed",
                    width: "60%",
                  }}
                >
                  <tbody style={{ display: "flex", flexDirection: "row" }}>
                    <tr style={{ flex: 1, border: "1px solid black" }}>
                      <td
                        style={{
                          paddingRight: "10px",
                          width: "40%",
                          whiteSpace: "nowrap",
                          borderRight: "1px solid black",
                        }}
                      >
                        No. of Vendors
                      </td>
                      <td style={{ width: "30%" }}>
                        <b>
                          {" "}
                          {
                            selectedMaterials.reduce(
                              (acc, curr) => acc.add(curr.vendorName),
                              new Set()
                            ).size
                          }
                        </b>
                      </td>
                    </tr>
                    <tr style={{ flex: 1, border: "1px solid black" }}>
                      <td
                        style={{
                          paddingRight: "10px",
                          width: "40%",
                          whiteSpace: "nowrap",
                          borderRight: "1px solid black",
                        }}
                      >
                        No. of Materials
                      </td>
                      <td style={{ width: "30%" }}>
                        <b> {selectedMaterials.length}</b>
                      </td>
                    </tr>
                    <tr style={{ flex: 1, border: "1px solid black" }}>
                      <td
                        style={{
                          paddingRight: "10px",
                          width: "40%",
                          whiteSpace: "nowrap",
                          borderRight: "1px solid black",
                        }}
                      >
                        Total Weight(kg)
                      </td>
                      <td style={{ width: "30%" }}>
                        <b>
                          {" "}
                          {selectedMaterials.reduce(
                            (acc, curr) => acc + curr.totalWeight,
                            0
                          )}
                        </b>
                      </td>
                    </tr>
                    <tr style={{ flex: 1, border: "1px solid black" }}>
                      <td
                        style={{
                          paddingRight: "10px",
                          width: "40%",
                          whiteSpace: "nowrap",
                          borderRight: "1px solid black",
                        }}
                      >
                        Total Volume(m<sup>3</sup>)
                      </td>
                      <td style={{ width: "30%" }}>
                        <b>
                          {selectedMaterials.reduce(
                            (acc, curr) => acc + curr.totalVolume,
                            0
                          )}
                        </b>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdatePlan}
                  >
                    Update Plan
                  </Button>
                </div>
              </div>
            )}
            <div style={{ height: 300, width: "100%", marginTop: "20px" }}>
              {selectedMaterials.length > 0 && (
                <DataGrid
                  rows={selectedMaterials}
                  columns={columnsNew}
                  pageSize={5}
                />
              )}
            </div>
          </div>
        )}
      </Paper>

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
      <div>
        <Dialog
          open={openSavePlanDilog}
          onClose={handleSetOpenSavePlanDilog}
          style={{ maxWidth: "2000px" }}
        >
          <DialogTitle style={{ display: "flex", justifyContent: "center" }}>
            Plan Details & Confirm
          </DialogTitle>
          <DialogContent>
            <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "center", paddingRight: "10px" }}>
                      Total Quantity
                    </td>
                    <td style={{ textAlign: "center" }}>{totalQuantity}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", paddingRight: "10px" }}>
                      Gross Weight(kg)
                    </td>
                    <td style={{ textAlign: "center" }}>{grossWeight}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center", paddingRight: "10px" }}>
                      Gross Volume(m<sup>3</sup>)
                    </td>
                    <td style={{ textAlign: "center" }}>{grossVolume}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <br />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Expected dispatch date"
                    value={expectedDate}
                    onChange={(newValue) => setExpectedDate(newValue)}
                    format="DD-MM-YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </DialogContent>

          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button color="error" onClick={handleSetOpenSavePlanDilog}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={(e) => {
                handelSavePlan(e);
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openComplete}
          onClose={handleCloseComplete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {dialogTitleMessageComplete}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogContentMessageComplete}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Disagree</Button> */}
            <Button onClick={handleCloseComplete} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Grid>
  );
}

export default EManagePlan;
