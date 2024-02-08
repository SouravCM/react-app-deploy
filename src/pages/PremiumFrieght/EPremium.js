import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TransporterService from "../../services/TransporterService";
import Autocomplete from "@mui/material/Autocomplete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import FreightServices from "../../services/FreightServices.js";

const containerStyle = {
  padding: "8px",
  height: "100%",
};

const formControlStyle = { m: 1, minWidth: 210 };

const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const EPremium = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  console.log("EPremium:>" + JSON.stringify(data));

  const [dialogTitleMessage, setDialogTitleMessage] = useState();
  const [dialogContentMessage, setDialogContentMessage] = useState();
  const [planID, setPlanID] = useState();
  const [typeofFreight, setTypeofFreight] = React.useState("");
  const [costImpact, setCostImpact] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [materials, setMaterials] = useState("");
  const [transporterName, setTransporterName] = useState("");

  const [regularModeTransport, setRegularModeTransport] = React.useState("");
  const [regularCostOfTransport, setRegularCostOfTransport] = useState("");
  const [premiumModTransport, setpremiumModTransport] = React.useState("");
  const [costOfPremiumTransport, setCostOfPremiumTransport] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [dateCalender, setDateCalender] = useState("");
  const [expactedDate, setExpactedDate] = useState("");
  const [source, setSource] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const [freightNo, setFreightNo] = useState("");
  const [userId, setUserId] = useState();
  const [companyId, setCompanyId] = useState();

  const [level1Remarks, setLevel1Remarks] = useState();

  const [level1PendingCount, setLevel1PendingCount] = useState(0);
  const [level2PendingCount, setLevel2PendingCount] = useState(0);

  const [open, setOpen] = React.useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [transporterListAPI, setTransporterListAPI] = useState([{}]);
  const [transporterId, setTransporterId] = useState();

  const columns = [
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
      minWidth: 180,
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
      headerName: "Delivery Date",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
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
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      renderCell: (params) => {
        const handleEditClick = () => {
          console.log("Edit Clicked" + params.row.id);
          navigate("/MainLayout/EPremium", { state: params.row.id });
        };
        if (params.row.level1Status === "REJECTED") {
          return (
            <>
              <div style={{ width: "8px" }} />{" "}
              <EditIcon color="primary" onClick={handleEditClick} />
              <div style={{ width: "8px" }} />
              {/* <DeleteIcon  color="primary" onClick={handleEditClick}/> */}
            </>
          );
        }
      },
    },
  ];
  const handleCostImpact = (event) => {
    setCostImpact(event.target.value);
  };

  const handleCustomerName = (event) => {
    setCustomerName(event.target.value);
  };

  const handleMaterials = (event) => {
    setMaterials(event.target.value);
  };

  const handleTransporterName = (event) => {
    setTransporterName(event.target.value);
  };

  const transporterListDropdown = {
    options: transporterListAPI,
    getOptionLabel: (option) => option.label,
  };
  const handleTransporterListChange = async (id) => {
    console.log("Autocomplete value changed!" + id);
    setTransporterId(id);
    //Transporter ID: id
  };

  const handleModOfTransport = (event) => {
    setRegularModeTransport(event.target.value);
  };

  const handlePaymentType = (event) => {
    setPaymentType(event.target.value);
  };
  const handleTypeOfFreight = (event) => {
    setTypeofFreight(event.target.value);
  };

  const handlepremiumModOfTransport = (event) => {
    setpremiumModTransport(event.target.value);
  };
  const [formClose, setFormClose] = useState(1);

  useEffect(() => {
    setCostImpact(costOfPremiumTransport - regularCostOfTransport);
  }, [regularCostOfTransport, costOfPremiumTransport]);

  const handleClose = () => {
    setOpen(false);
    navigate("/MainLayout/ManagePremiumFreight");
  };

  const handleSource = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z ]/g, ""); // Limit the length to 10 characters
    setSource(newValue);
  };
  const handleDestination = (event) => {
    const { value } = event.target; // Only allow alphabatic characters
    const newValue = value.replace(/[^A-Za-z ]/g, "");
    setDestination(newValue);
  };
  const handleRegularCost = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^0-9]/g, "");
    if (newValue.length <= 7) {
      setRegularCostOfTransport(newValue);
    }
  };
  const handlePremiumCost = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^0-9]/g, "");
    if (newValue.length <= 7) {
      setCostOfPremiumTransport(newValue);
    }
  };
  const handleVehicleNumber = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, "");
    setVehicleNumber(newValue);
  };
  const handleRemarks = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9. ]/g, "");
    setRemark(newValue);
  };
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    //Set Al values

    setPlanID(data.id);
    setFreightNo(data.freightNo);

    setTypeofFreight(data.type);

    setCompanyId(data.companyId);
    setPaymentType(data.paymentBy); //Drop down
    setSource(data.pickupPoint);
    setDestination(data.deliveryPoint);
    setRegularModeTransport(data.regularMode); //Drop Down
    setRegularCostOfTransport(data.regularCost);
    setCostImpact(data.costImpact);
    setpremiumModTransport(data.premiumMode); //Drop Dwon
    setCostOfPremiumTransport(data.premiumCost);

    setTransporterId(data.transporter.id); //Dropdwon
    // setTransporterName(data.transporter.name), //Dropdwon
    setCustomerName(data.customerName);
    setMaterials(data.materialName);
    // setTypeofFreight(data.type), //drop down

    //setUserId(data.createdBy),
    setDateCalender(data.date); //calender
    setExpactedDate(data.expectedDate); //set calender

    setRemark(data.remarks);
    setLevel1Remarks(data.level1Remarks);

    //End of Setting Values

    async function fetchTransporterList() {
      let userCompany = AuthServices.getSelectedPlant();
      let plantId = userCompany.plantId;
      let transporterList = await TransporterService.getAllTransporterByPlantId(
        plantId
      );

      if (transporterList.code === 200) {
        setTransporterListAPI([]); //Clear existing list in array
        transporterList.responseBody.map((transporter) =>
          setTransporterListAPI((prevState) => [
            ...prevState,
            {
              label: transporter.name,
              id: transporter.id,
            },
          ])
        );
      } else {
        console.log("Something went wrong in transporter List getting");
      }
    }
    fetchTransporterList();

    async function getFreightApprovalLevel1() {
      let requestBody = {};
      const today = moment();
      const startOfDay = today.startOf("day").format("YYYY-MM-DD HH:mm:ss");
      const endOfDay = today.endOf("day").format("YYYY-MM-DD HH:mm:ss");

      let userData = AuthServices.getUserDetails();
      console.log("User Id:=>" + userData.id);
      setUserId(userData.id);

      let userCompanyResponse = AuthServices.getUserCompanyDetails();
      console.log(
        "Company ID==>:" + userCompanyResponse[0].userCompany.company.id
      );
      setCompanyId(userCompanyResponse[0].userCompany.company.id);
      requestBody.comapnyId = userCompanyResponse[0].userCompany.company.id;
      // requestBody.fromDate = startOfDay;
      // requestBody.toDate = endOfDay;

      let freightList = await FreightServices.getFreightList(requestBody);
      console.log("All Freight List:" + JSON.stringify(freightList));

      if (freightList.code === 200) {
        console.log(
          "All  Freight List:=>" + JSON.stringify(freightList.responseBody)
        );

        let materialsArray = freightList.responseBody;
        setTableData([]);
        let level1Count = 0;
        let level2Count = 0;

        materialsArray.map((freight, index) => {
          if (!freight.level1Status) {
            level1Count++;
          }
          if (!freight.level2Status) {
            level2Count++;
          }

          setTableData((prevState) => [
            ...prevState,
            {
              id: index,
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
              costImpact: freight.costImpact,
              paymentBy: freight.paymentBy,
            },
          ]);
          console.log("Lenght:" + tableData.length);
        });

        console.log("COUNT : " + level1Count + "::" + level2Count);
        setLevel1PendingCount(level1Count);
        setLevel2PendingCount(level2Count);
      } else {
        if (freightList.code === 208) {
          setDialogTitleMessage("No Premium Freights");
          setDialogContentMessage("No records found!! Add New Freight");
          setOpen(true);
        }
      }
    }
    getFreightApprovalLevel1();
  }, []);

  const handleFreightDate = (e) => {
    setDateCalender(e.target.value);
  };
  const updateFreight = async (e) => {
    console.log(dateCalender);
    console.log(new Date(dateCalender));
    var convertedDate = moment(new Date(dateCalender)).format("YYYY-MM-DD");
    var convertedDate1 = moment(new Date(expactedDate)).format("YYYY-MM-DD");

    //TODO Add Validations for all fields

    const freightJson = {
      id: planID,
      freightNo: freightNo,
      companyId: companyId,
      paymentBy: paymentType,
      pickupPoint: source,
      deliveryPoint: destination,
      regularMode: regularModeTransport,
      regularCost: regularCostOfTransport,
      costImpact: costOfPremiumTransport - regularCostOfTransport,
      premiumMode: premiumModTransport,
      premiumCost: costOfPremiumTransport,

      transporterId: transporterId,
      transporterName: transporterName,
      customerName: customerName,
      materialName: materials,
      type: typeofFreight,

      createdBy: userId,
      date: convertedDate,
      expectedDate: convertedDate1,

      remarks: remark,
    };
    console.log("request " + JSON.stringify(freightJson));
    let FreightAddResponse = await FreightServices.updatePremiumFreight(
      freightJson
    );
    console.log(
      "Update Freight Response:" + JSON.stringify(FreightAddResponse)
    );
    if (FreightAddResponse.code === 200) {
      console.log("Successfully Added ");
      setDialogTitleMessage("Premium Freight  Updated  Successfully");
      setDialogContentMessage(
        "Premium freight request submitted successfully,\nyour Freight ID: " +
          FreightAddResponse.responseBody.freightNo
      );
      setFormClose(2);
      setOpen(true);
    } else {
      if (FreightAddResponse.code === 209) {
        console.log("Some thing went wrong");
        setDialogTitleMessage("Premium Freight Failed");
        setDialogContentMessage(FreightAddResponse.responseBody);
        setOpen(true);
      }
    }
  };

  return (
    <Grid container style={containerStyle}>
      <h3 style={{ marginLeft: "8px" }}>
        Resubmit Premium Freight {freightNo}
      </h3>
      <Grid item xs={12} style={ItemStyle}>
        <div>
          <Paper
            sx={{
              width: "100%", // Adjusted to full width
              padding: "6px",
            }}
          >
            <h3>Level 1 Reject Remarks : {level1Remarks}</h3>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <FormControl sx={formControlStyle}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Payment Type
                  </InputLabel>
                  <Select
                    id="paymentType"
                    value={paymentType}
                    onChange={handlePaymentType}
                    label="Select Payment Mode"
                  >
                    <MenuItem value={"RML Paid"}>RML Paid</MenuItem>
                    <MenuItem value={"Debit to Transporter"}>
                      Debit to Transporter
                    </MenuItem>
                    <MenuItem value={"Debit to Customer"}>
                      Debit to Customer
                    </MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <FormControl sx={formControlStyle}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Type of Freight
                  </InputLabel>
                  <Select
                    id="typeofFreight"
                    value={typeofFreight}
                    onChange={handleTypeOfFreight}
                    label="Select Type of Freight"
                  >
                    <MenuItem value={"Inward Freight"}>Inward Freight</MenuItem>
                    <MenuItem value={"Outward Freight"}>
                      Outward Freight
                    </MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="dateCalender"
                  label="Freight Date *"
                  variant="outlined"
                  type="date"
                  style={ItemStyle}
                  value={dateCalender}
                  InputLabelProps={{ shrink: true }}
                  onChange={handleFreightDate}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  style={ItemStyle}
                  required
                  id="source"
                  value={source}
                  onChange={handleSource}
                  label="Pickup Point"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  style={ItemStyle}
                  required
                  id="destination"
                  value={destination}
                  onChange={handleDestination}
                  label="Delivery Point"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={2}>
                <FormControl sx={formControlStyle}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Regular Mode
                  </InputLabel>
                  <Select
                    id="regularModeTransport"
                    value={regularModeTransport}
                    onChange={handleModOfTransport}
                    label="Select Regular Mode Of Transport"
                  >
                    <MenuItem value={"Road"}>Road</MenuItem>
                    <MenuItem value={"Ship"}>Ship</MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                {" "}
                <TextField
                  style={ItemStyle}
                  id="regularCostOfTransport"
                  label="Regular Cost of Transport (Rs.)"
                  value={regularCostOfTransport}
                  onChange={handleRegularCost}
                />
              </Grid>
              <Grid item xs={2}>
                <FormControl sx={formControlStyle}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Premium Mode
                  </InputLabel>
                  <Select
                    id="premiumModeTransport"
                    value={premiumModTransport}
                    onChange={handlepremiumModOfTransport}
                    label="Select Premium Mode Of Transport"
                  >
                    <MenuItem value={"Train"}>Train</MenuItem>
                    <MenuItem value={"Air"}>Air</MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  style={ItemStyle}
                  label=" Premium Cost Of Transport(Rs.)"
                  id="costOfPremiumTransport"
                  value={costOfPremiumTransport}
                  onChange={handlePremiumCost}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  style={ItemStyle}
                  id="costimpact"
                  value={costImpact}
                  onChange={handleCostImpact}
                  label="Cost Impact (Rs.)"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  style={ItemStyle}
                  id="customername"
                  value={customerName}
                  onChange={handleCustomerName}
                  label="Enter Customer Name"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  style={ItemStyle}
                  id="materials"
                  value={materials}
                  onChange={handleMaterials}
                  label="Enter Materials & Qty"
                />
              </Grid>
              <Grid item xs={2}>
                {" "}
                <TextField
                  style={ItemStyle}
                  id="expactedDate"
                  label="Delivery Date"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={expactedDate}
                  onChange={(e) => setExpactedDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                {" "}
                <Autocomplete
                  {...transporterListDropdown}
                  disablePortal
                  id="transporterListDropdown"
                  onChange={(e, r) => {
                    if (r != null) {
                      handleTransporterListChange(r.id);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span>
                          Transporter List{" "}
                          <span style={{ color: "red" }}> *</span>
                        </span>
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  style={ItemStyle}
                  id="remark"
                  label="Justification for Premium Freight"
                  value={remark}
                  onChange={handleRemarks}
                />
              </Grid>
            </Grid>

            <div>
              <Button
                variant="contained"
                onClick={(e) => {
                  updateFreight(e);
                }}
                disableElevation
                style={{
                  backgroundColor: "#15317E",
                  borderRadius: "10px",
                  marginTop: "8px",
                }}
              >
                Update Premium Freight Request
              </Button>
            </div>
          </Paper>
        </div>
        <Grid item xs={12}>
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
                  <Typography>{dialogContentMessage}</Typography>
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
      </Grid>
    </Grid>
  );
};

export default EPremium;
