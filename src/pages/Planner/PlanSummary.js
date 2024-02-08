import React, { useEffect, useState } from "react";
import moment from "moment";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import TripServices from "../../services/TripServices";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DriverService from "../../services/DriverService";
import { FormControlLabel, Switch, Typography, Modal } from "@mui/material";
import { Tooltip } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/en";

import {
  Grid,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
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
import AuthServices from "../../services/AuthServices";
import plannerService from "../../services/PlannerService";
import TransporterService from "../../services/TransporterService";
import VehicleService from "../../services/VehicleService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PacmanLoader from "react-spinners/PacmanLoader";

const theme = createTheme({
  components: {
    MuiDataGrid: {
      defaultProps: {
        density: "compact",
      },
    },
  },
});

const containerStyle = {
  padding: "4px",
  height: "auto",
  margin: "auto",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust background color and opacity for the overlay
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999, // Ensure the overlay is on top
};

function PlanSummary() {
  const navigate = useNavigate();

  const [isMarketVehicle, setIsMarketVehicle] = useState(false);
  const [allPlanner, setAllPlanner] = useState([]);
  const [planRows, setPlanRows] = useState([]);
  const [openDe, setOpenDe] = useState(false);

  const [planID, setpanID] = useState("");
  const [transporterListAPI, setTransporterListAPI] = useState([{}]);
  const [vehicelListAPI, setVehicleListAPI] = useState([{}]);
  const [planGrossWeight, setPlanGrossWeight] = useState("");
  const [planGrossVolume, setPlanGrossVolume] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleVolume, setVehicleVolume] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [vehicleRegiNo, setVehicleRegiNo] = useState("");
  const [planSaveID, setPlanSaveId] = useState("");
  const [percentageUsedVolume, setPercentageUsedVolume] = useState(0);
  const [percentageUsedWeight, setPercentageUsedWeight] = useState(0);
  const [marketVehicleNumber, setMarketVehicleNumber] = useState("");
  const [openError, setopenError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openMarketVehicleChange, setOpenMarketVehicleChange] = useState(false);
  const [transporterId, setTransporterId] = useState(0);
  const [openVendorMaterialList, setOpenVendorMaterialList] =
    React.useState(false);
  const [dialogErrorTitleMessage, setDialogErrorTitleMessage] = useState();
  const [dialogErrorContentMessage, setDialogErrorContentMessage] = useState();
  const [changeMarketVehicle, setChangeMarketVehicle] = useState("");
  const [updateMarketDetaisForTrip, setUpdateMarketDetailsForTrip] =
    useState(0);

  const [deAssign, setDeAssign] = useState({});
  const [driverId, setDriverId] = useState(0);
  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [color, setColor] = useState("error");
  const [color1, setColor1] = useState("error");

  const [driverListAPI, setDriverListAPI] = useState([]);
  const [fromDate, setFromDate] = useState(dayjs());
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleDriverMobile = (event) => {
    const { value } = event.target;
    const newValue = value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (newValue.length <= 10) {
      setDriverMobile(newValue);
    }
    if (value.trim() === "") {
      setColor1("error");
    } else {
      setColor1("primary");
    }
  };

  const handleDriverName = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9\s]/g, ""); // Limit the length to 10 characters
    setDriverName(newValue);

    if (value.trim() === "") {
      setColor("error");
    } else {
      setColor("primary");
    }
  };

  useEffect(() => {
    getPlanDetails();

    async function fetchDriversData() {
      // You can await here
      let driversList = await DriverService.getAllDrivers();
      //console.log("Drivers list:" + JSON.stringify(driversList));
      setDriverListAPI([]);
      if (driversList.code === 200) {
        //Clear existing list in array
        driversList.responseBody.map((driver, index) =>
          setDriverListAPI((prevState) => [
            ...prevState,
            {
              id: index,
              driverId: driver.id,
              name: driver.name,
              mobileNo: driver.mobileNo,
            },
          ])
        );
      } else {
        //console.log("Something went wrong in vehicle List getting");
      }
    }
    // fetchDriversData();
  }, []);

  useEffect(() => {
    //console.log(vehicleVolume);
    const percentageUsed = ((planGrossVolume / vehicleVolume) * 100).toFixed(2);

    if (isFinite(percentageUsed)) {
      // The percentageUsed is not infinity
      //console.log("Percentage Used:", percentageUsed);
      setPercentageUsedVolume(percentageUsed);
    } else {
      // The percentageUsed is infinity
      //console.log("Percentage Used is infinity");
      setPercentageUsedVolume(0);
    }

    if (vehicleVolume === "" || vehicleVolume === null) {
      setPercentageUsedVolume(0);
    }
  }, [planGrossVolume, vehicleVolume]);

  useEffect(() => {
    //console.log(vehicleCapacity);
    const percentageUsed = ((planGrossWeight / vehicleCapacity) * 100).toFixed(
      2
    );

    if (isFinite(percentageUsed)) {
      // The percentageUsed is not infinity
      //console.log("Percentage Used:", percentageUsed);
      setPercentageUsedWeight(percentageUsed);
    } else {
      // The percentageUsed is infinity
      //console.log("Percentage Used is infinity");
      setPercentageUsedWeight(0);
    }

    if (vehicleCapacity === "" || vehicleCapacity === null) {
      setPercentageUsedVolume(0);
    }
  }, [planGrossWeight, vehicleCapacity]);

  const getPlanDetails = async (e) => {
    setLoading(true);
    let plant = AuthServices.getSelectedPlant();
    let plantID = plant.plantId;

    let data = {
      companyId: plantID,
      status: "OPEN",
    };
    let plannerData = await plannerService.getPlanList(data);
    // //console.log("Planns:" + JSON.stringify(plannerData));
    setAllPlanner([]);
    if (plannerData.code === 200) {
      const sortedPlannerData = plannerData.responseBody.sort((a, b) => {
        if (a.vehicleAssigned < b.vehicleAssigned) return -1;
        if (a.vehicleAssigned > b.vehicleAssigned) return 1;
        return 0;
      });

      sortedPlannerData.map((plannerData, index) =>
        setAllPlanner((prevState) => [
          ...prevState,
          {
            id: plannerData.id,
            sno: index + 1,
            planNo: plannerData.planNo,
            planDate: moment(new Date(plannerData.planDate)).format(
              "DD-MM-YYYY"
            ),
            routeId: plannerData.route.id,
            route: plannerData.route.name,
            totalWeight: plannerData.totalWeight,
            vehicleAssigned: plannerData.vehicleAssigned,
            totalVolume: plannerData.totalVolume,
            expectedDate: moment(new Date(plannerData.expectedDate)).format(
              "DD-MM-YYYY"
            ),

            status: plannerData.status,
            items: plannerData.items,
            tripId: plannerData.trip ? plannerData.trip.id : 0,
            tripType: plannerData.trip ? plannerData.trip.tripType : "",
            vehicle: plannerData.trip
              ? plannerData.trip.tripType != "GPS"
                ? plannerData.trip.marketVehicle
                : plannerData.trip.vehicle.registrationNo
              : "",
            transporter: plannerData.trip
              ? plannerData.trip.transporter.name
              : "",
            createdBy: plannerData.creator.name,
          },
        ])
      );
      setLoading(false);
    } else if (plannerData.code === 208) {
      setDialogErrorTitleMessage("No Data");
      setDialogErrorContentMessage("");
      setopenError(true);
      setLoading(false);
    } else {
      setDialogErrorTitleMessage("Error");
      setDialogErrorContentMessage("");
      setopenError(true);
      setLoading(false);
    }
  };

  const planColumns = [
    {
      field: "sno",
      headerName: "Sl No",
      align: "center",
      headerAlign: "center",
      minWidth: 40,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vendor",
      headerName: "Supplier",
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
      field: "requiredQuantity",
      headerName: "Required Quantity",
      align: "center",
      headerAlign: "center",
      minWidth: 130,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalWeight",
      headerName: "Total Weight(Kg)",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalVolume",
      headerName: "Total Volume(m3)",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  const columns = [
    {
      field: "sno",
      headerName: "Sl No",
      align: "center",
      headerAlign: "center",
      minWidth: 10,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "planNo",
      headerName: "Plan No",
      renderCell: (params) => {
        const pno = params.value;
        let color = "blue"; // Define the desired color based on a condition or any other logic
        return <div style={{ color }}>{pno}</div>;
      },
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
      color: "primary",
    },

    {
      field: "planDate",
      headerName: "Plan Date",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "route",
      headerName: "Route",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalWeight",
      headerName: "Total Weight",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "totalVolume",
      headerName: "Total Volume",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "expectedDate",
      headerName: "Expected Date",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vehicleAssigned",
      headerName: "Assigned",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      minWidth: 80,
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
      minWidth: 100,
      headerClassName: "super-app-theme--header",
      cellClassName: "actions",
      renderCell: (params) => {
        const handleClick = () => {
          setpanID(params.row.planNo);
          setPlanGrossWeight(params.row.totalWeight);
          setPlanGrossVolume(params.row.totalVolume);
          setPlanSaveId(params.row.id);
          setVehicleCapacity("");
          setVehicleVolume("");
          setPercentageUsedVolume(0);
          setOpen(true);
          fetchTransporterList(params);
        };
        const handleEditClick = () => {
          //console.log("Edit Clicked" + params.row.id);
          navigate("/MainLayout/EManagePlan", { state: params.row.id });
        };
        const handleManualVehicleChange = () => {
          setOpenMarketVehicleChange(true);
          setUpdateMarketDetailsForTrip(params.row.tripId);
        };

        const handleDeAssignClick = () => {
          setOpenDe(true);
          setDeAssign({
            planid: params.row.id,
            tripId: params.row.tripId,
            vehicle: params.row.vehicle,
            planNo: params.row.planNo,
          });
        };

        if (params.row.vehicleAssigned === "NO") {
          return (
            <>
              <Tooltip title="Assign Vehicle">
                <LocalShippingIcon color="primary" onClick={handleClick} />
              </Tooltip>
              <div style={{ width: "8px" }} />{" "}
              <Tooltip title="Edit Plan">
                <EditIcon color="primary" onClick={handleEditClick} />
              </Tooltip>
              <div style={{ width: "8px" }} />
            </>
          );
        } else {
          if (params.row.status === "OPEN") {
            if (
              params.row.tripType === "GPS" ||
              params.row.tripType === "NOGPS"
            ) {
              return (
                <>
                  <div style={{ width: "8px" }} />{" "}
                  <Tooltip title="Deassign Vehicle">
                    <LinkOffIcon color="error" onClick={handleDeAssignClick} />
                  </Tooltip>
                  <div style={{ width: "15px" }} />
                </>
              );
            } else {
              return (
                <>
                  <Tooltip title="Change Vehicle">
                    <LocalShippingIcon
                      color="success"
                      onClick={handleManualVehicleChange}
                    />
                  </Tooltip>
                  <div style={{ width: "8px" }} />
                  {/* <DeleteIcon  color="primary" onClick={handleEditClick}/> */}
                </>
              );
            }
          }
        }
      },
    },
    {
      field: "tripType",
      headerName: "TripType",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "transporter",
      headerName: "Transporter",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "tripId",
      headerName: "TripId",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      hide: Boolean(true),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "createdBy",
      headerName: "Created By",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      hide: Boolean(true),
      headerClassName: "super-app-theme--header",
    },
  ];
  const csvOptions = { fileName: "Planer Report" };

  const transporterListDropdown = {
    options: transporterListAPI,
    getOptionLabel: (option) => option.label,
  };

  const vehicleListDropdown = {
    options: vehicelListAPI,
    getOptionLabel: (option) => option.label,
  };

  const handleDeClose = () => {
    setOpenDe(false);
  };

  const handleCloseError = () => {
    setopenError(false);
    setDriverId(0);
    setDriverName("");
    setDriverMobile("");
    getPlanDetails();
  };
  const handlePlanDetaislClose = () => {
    setOpenVendorMaterialList(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleManualVehicleChange = async () => {
    if (changeMarketVehicle.length == 0) {
      alert("Enter Vehicle Number");
      return;
    }
    setOpenMarketVehicleChange(false);
    const marketResponse = await TripServices.updateMarketVehileNumber({
      id: updateMarketDetaisForTrip,
      marketVehicle: changeMarketVehicle,
    });
    if (marketResponse.code === 200) {
      setDialogErrorTitleMessage("Market Vehicle Assigned Successfully");
      setDialogErrorContentMessage(
        "Vehicle Number " + changeMarketVehicle + " Assigned Successfully"
      );
      getPlanDetails();
    } else {
      setDialogErrorTitleMessage("Market Vehicle Assigned Failed");
      setDialogErrorContentMessage(
        "Unable to add  " + changeMarketVehicle + " Try again!!"
      );
    }

    setopenError(true);
  };

  const handleMarketVehicleChange = () => {
    setOpenMarketVehicleChange(false);
  };

  const handleChangeMarketVehicle = (event) => {
    const inputValue = event.target.value;
    setChangeMarketVehicle(inputValue);
  };
  const ItemStyleDropDown = {
    padding: "9px",
    margin: "4px",
    marginLeft: "14% !important",
  };
  const handleTransporterListChange = async (id) => {
    //console.log("Autocomplete value changed!");
    setTransporterId(id);
    let vendordata = await VehicleService.getUnAssignedVehicleListByTransporter(
      id
    );
    //console.log(id);
    setVehicleListAPI([]); //Clear existing list in array
    if (vendordata.code === 200) {
      console.log("vehicle" + JSON.stringify(vendordata.responseBody));
      vendordata.responseBody.map((vehicle) =>
        setVehicleListAPI((prevState) => [
          ...prevState,
          {
            label: vehicle.registrationNo,
            id: vehicle.id,
            vehicleCapacity: vehicle.capacity,
            vehicleVolume: vehicle.volume,
          },
        ])
      );
    } else {
      //console.log("Something went wrong in Supplier List getting");
    }
  };

  const handleDeAssignAPI = async () => {
    //TODO API
    //{planid: params.row.id, tripId:params.row.tripId, vehicle: params.row.vehicle, planNo: params.row.planNo}
    setLoading(true);
    setOpenDe(false);
    const response = await TripServices.unAssignVehicle({
      id: deAssign.planid,
      trip: { id: deAssign.tripId },
    });
    console.log("design plan request", deAssign);
    console.log("design plan responce", response);
    if (response.code === 200) {
      setDialogErrorTitleMessage("UnAssign Successfully");
      setDialogErrorContentMessage(
        "Successfully unassigned  Vehicle: " +
          deAssign.vehicle +
          " with Plan:" +
          deAssign.planNo
      );

      setopenError(true);
      setLoading(false);
    } else {
      setDialogErrorTitleMessage("UnAssign Failed");
      setDialogErrorContentMessage(
        "Unable to Unassign  Vehicle: " +
          deAssign.vehicle +
          " with Plan:" +
          deAssign.planNo
      );

      setopenError(true);
      setLoading(false);
    }
  };
  const handleMarketVehicle = (event) => {
    const { value } = event.target; // Only allow alphanumeric characters
    const newValue = value.replace(/[^A-Za-z0-9]/g, ""); // Limit the length to 10 characters
    if (newValue.length <= 10) {
      setMarketVehicleNumber(newValue);
    }
  };

  const getDriverByVehicleId = async (id) => {
    let plant = AuthServices.getSelectedPlant();
    let plantID = plant.plantId;

    const json = {
      companyId: plantID,
      vehicleId: id,
    };

    let driverList = await VehicleService.getDriverByVehicle(json);
    //console.log("Response of Vehicle:" + JSON.stringify(driverList));
    if (driverList.code === 200) {
      setDriverMobile(driverList.responseBody.mobileNo);
      setDriverName(driverList.responseBody.name);
      setDriverId(driverList.responseBody.id);
    } else {
      setDriverMobile("");
      setDriverName("");
      setDriverId(0);
    }
  };

  const handleVehicleAssign = async () => {
    setLoading(true);
    setIsButtonDisabled(true);
    if (vehicleId.length === 0 && !isMarketVehicle) {
      setDialogErrorTitleMessage("Select a Vehicle");
      setDialogErrorContentMessage("");
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }

    if (driverName.length === 0 && !isMarketVehicle) {
      setDialogErrorTitleMessage("Driver Name Missing");
      setDialogErrorContentMessage("Enter Driver Name");
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }

    if (driverMobile.length === 0 && !isMarketVehicle) {
      setDialogErrorTitleMessage("Driver Mobile Missing");
      setDialogErrorContentMessage("Enter Driver Mobile");
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }

    if ((vehicleVolume === null || vehicleVolume === "") && !isMarketVehicle) {
      setDialogErrorTitleMessage("Can't assign a vehicle !!");
      setDialogErrorContentMessage(
        "Selected Vehicle dont have volumn defined. Check Masters, Update volumn for this vehicle"
      );
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }

    if (
      (vehicleCapacity === null || vehicleCapacity === "") &&
      !isMarketVehicle
    ) {
      setDialogErrorTitleMessage("Can't assign a vehicle!!");
      setDialogErrorContentMessage(
        "Selected Vehicle dont have capacity defined. Check Masters, Update capacity for this vehicle"
      );
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }

    if (percentageUsedVolume > 100 && !isMarketVehicle) {
      setDialogErrorTitleMessage("Can't assign a vehicle!!");
      setDialogErrorContentMessage(
        "Plan Volumn is more than vehicle volumn, you cannot assign this vehicle."
      );
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }

    if (transporterId === 0) {
      setDialogErrorTitleMessage("");
      setDialogErrorContentMessage("Please Select a Transporter");
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }
    if (fromDate.length === 0) {
      setDialogErrorTitleMessage("Can't assign a vehicle!!");
      setDialogErrorContentMessage("Please Select Trip Plan Start Date");
      setOpen(true);
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }

    const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    let fromDate_val = moment(new Date(fromDate)).format("YYYY-MM-DD HH:mm:ss");

    let userId;
    let userDetails = AuthServices.getUserDetails();
    if (userDetails) {
      userId = userDetails.id;
    } else {
      //console.log("User Details is not defiend");
      setIsButtonDisabled(false);
      setLoading(false);
      return;
    }

    let vehicleAssigndata = "";
    if (isMarketVehicle) {
      vehicleAssigndata = {
        plan: { id: planSaveID },
        tripStart: fromDate_val,
        assignedBy: userId,
        transporterId: transporterId,
        tripType: "MARKET",
        marketVehicle: marketVehicleNumber,

        driverName: driverName,
        driverMobile: driverMobile,
      };
    } else {
      vehicleAssigndata = {
        plan: { id: planSaveID },
        vehicle: { id: vehicleId, registrationNo: vehicleRegiNo },
        tripStart: date,
        assignedBy: userId,
        transporterId: transporterId,
        tripType: "GPS",
        driverId: driverId,
        driverName: driverName,
        driverMobile: driverMobile,
      };
    }

    //console.log("JSON- " + JSON.stringify(vehicleAssigndata));

    let plaseSavedData = await plannerService.assignVehicle(vehicleAssigndata);
    //console.log("Assign Response:" + JSON.stringify(plaseSavedData));
    if (plaseSavedData.code === 209) {
      setDialogErrorTitleMessage("Vehicle Not Assigned");
      setDialogErrorContentMessage(plaseSavedData.responseBody);
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
    } else if (plaseSavedData.code === 200) {
      setTransporterId(0);
      getPlanDetails();
      setDialogErrorTitleMessage("Vehicle Assigned Successfully");
      setDialogErrorContentMessage(
        "Trip Id " + plaseSavedData.responseBody.tripNo
      );
      setOpen(false);
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
    } else {
      setDialogErrorTitleMessage("Error!!");
      setDialogErrorContentMessage(
        "unable to assign vehicle check your network"
      );
      setopenError(true);
      setIsButtonDisabled(false);
      setLoading(false);
    }
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

  const handleCellClick = (params) => {
    setPlanRows([]); //Clear existing list in array
    //console.log("PARAMS:" + JSON.stringify(params));

    params.row.items.map((item, index) => {
      setPlanRows((prevState) => [
        ...prevState,
        {
          id: item.id,
          sno: index + 1,
          vendor: item.vendor.name,
          materialCode: item.material.code,
          materialDescription: item.material.description,
          requiredQuantity: item.requestedQuantity,
          unitWeight: item.material.weight,
          totalWeight: item.material.weight * item.requestedQuantity,
          totalVolume: item.material.volume * item.requestedQuantity,
        },
      ]);
      return null;
    });
    setOpenVendorMaterialList(true);
  };

  const getColorForPercentage = (percentage) => {
    if (percentage >= 0 && percentage <= 50) {
      return "#f44336";
    } else if (percentage > 50 && percentage <= 80) {
      return "#ff9800";
    } else {
      return "#4caf50";
    }
  };

  const smallerText = {
    fontSize: "8px" /* Adjust the desired font size */,
  };
  const defaultProps1 = {
    options: driverListAPI,
    getOptionLabel: (option) => option.name,
  };

  async function fetchTransporterList(params) {
    setLoading(true);
    let routeId = params.row.routeId;
    let transporterList =
      await TransporterService.getAllTransporterByPlantRoute(routeId);
    //console.log("Transporter List- " + JSON.stringify(transporterList));
    if (transporterList.code === 200) {
      setTransporterListAPI([]); //Clear existing list in array
      transporterList.responseBody.map((transporter) =>
        setTransporterListAPI((prevState) => [
          ...prevState,
          {
            label:
              transporter.transporter.name +
              " (" +
              transporter.transporter.code +
              ")",
            id: transporter.transporter.id,
          },
        ])
      );
      setLoading(false);
    } else {
      alert(transporterList.responseBody);
      setLoading(false);
      return;
    }
  }

  const handleFromDateTimeChange = (value) => {
    setFromDate(value);
  };
  return (
    <div>
      {loading && (
        <div style={overlayStyle}>
          <PacmanLoader color={"#1976d2"} loading={loading} size={30} />
        </div>
      )}
      <Grid container style={containerStyle}>
        <h3 style={{ marginLeft: "10px" }}>Planner Summary</h3>
        <Grid item xs={12} style={ItemStyle}>
          <Paper
            sx={{
              width: "100%",
              padding: "6px",
              display: "flex",
            }}
          >
            <ThemeProvider theme={theme}>
              <div style={{ height: 540, width: "100%", overflow: "scroll" }}>
                <DataGrid
                  rows={allPlanner}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[5, 10, 25]}
                  scrollbarSize={10}
                  columnVisibilityModel={{ tripId: false }}
                  slots={{ toolbar: CustomToolbar }}
                  onCellClick={(params) => {
                    if (params.field === "planNo") {
                      handleCellClick(params);
                    }
                  }}
                  sx={{
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
          <div>
            <Dialog
              open={openError}
              onClose={handleCloseError}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {dialogErrorTitleMessage}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {dialogErrorContentMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* <Button onClick={handleClose}>Disagree</Button> */}
                <Button onClick={handleCloseError} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle
                style={{ display: "flex", justifyContent: "center" }}
              >
                Assign Vehicle for {planID}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Autocomplete
                    {...transporterListDropdown}
                    disablePortal
                    id="transporterListDropdown"
                    sx={{ marginTop: "8px" }}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "95%",
                    }}
                  >
                    <Typography variant="body1">GPS Vehicle </Typography>
                    <FormControlLabel
                      style={{ marginLeft: "5px" }}
                      control={
                        <Switch
                          checked={isMarketVehicle}
                          onChange={(e) => setIsMarketVehicle(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Market Vehicle"
                    />
                  </div>

                  {isMarketVehicle ? (
                    <div>
                      <TextField
                        sx={{ width: "100%", marginTop: "8px" }}
                        label="Market Vehicle"
                        onChange={handleMarketVehicle}
                        value={marketVehicleNumber}
                      />
                      <div style={{ display: "flex", marginTop: "8px" }}>
                        <TextField
                          color={color}
                          sx={{
                            width: "100%",
                            flexGrow: "1",
                            marginRight: "4px",
                          }}
                          label="Driver Name"
                          onChange={handleDriverName}
                          value={driverName}
                        />

                        <TextField
                          color={color1}
                          sx={{ width: "100%", flexGrow: "1" }}
                          label="Driver Mobile"
                          onChange={handleDriverMobile}
                          value={driverMobile}
                        />
                      </div>
                      <div style={{ display: "flex", marginTop: "8px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            renderInput={(props) => (
                              <TextField
                                {...props}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  style: { color: "blue" }, // Change the label color here
                                }}
                              />
                            )}
                            sx={{
                              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "blue", // Change the outline color here
                                },
                            }}
                            format={"DD-MM-YYYY HH:mm:ss"}
                            label="Select Trip Plan Start Date"
                            value={fromDate}
                            onChange={handleFromDateTimeChange}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Autocomplete
                        {...vehicleListDropdown}
                        disablePortal
                        id="vehicleListDropdown"
                        sx={{ width: "100%", marginTop: "8px" }}
                        onChange={(e, v) => {
                          if (v != null) {
                            setVehicleId(v.id);
                            setVehicleRegiNo(v.label);
                            setVehicleCapacity(v.vehicleCapacity);
                            setVehicleVolume(v.vehicleVolume);
                            setDriverId(0);
                            setDriverName("");
                            setDriverMobile("");
                            getDriverByVehicleId(v.id);
                            // settransporterId(r.label);
                            // handleRouteListChange(r.id);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={
                              <span>
                                Vehicle List{" "}
                                <span style={{ color: "red" }}> *</span>
                              </span>
                            }
                          />
                        )}
                      />

                      <div style={{ display: "flex", marginTop: "8px" }}>
                        {/* <Autocomplete
                {...defaultProps1}
                style={ItemStyleDropDown}
                disablePortal
                id="driverListDropDown"
                sx={{ width: 300 }}
                onChange={(e, l) => {
                  if (l != null) {
                   // setLicenceNumber(l.label);
                    //setLicenceId(l.id);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Driver Name" />
                )}
              /> */}

                        <TextField
                          color={color}
                          sx={{
                            width: "100%",
                            flexGrow: "1",
                            marginRight: "4px",
                          }}
                          label="Driver Name"
                          onChange={handleDriverName}
                          value={driverName}
                        />

                        <TextField
                          color={color1}
                          sx={{ width: "100%", flexGrow: "1" }}
                          label="Driver Mobile"
                          onChange={handleDriverMobile}
                          value={driverMobile}
                        />
                      </div>
                      <div style={{ display: "flex", marginTop: "8px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            renderInput={(props) => (
                              <TextField
                                {...props}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                  style: { color: "blue" }, // Change the label color here
                                }}
                              />
                            )}
                            sx={{
                              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "blue", // Change the outline color here
                                },
                            }}
                            format={"DD-MM-YYYY HH:mm:ss"}
                            label="Select Trip Plan Start Date"
                            value={fromDate}
                            onChange={handleFromDateTimeChange}
                          />
                        </LocalizationProvider>
                      </div>

                      <div style={{ marginTop: "4px" }}>
                        <table style={{ width: "100%" }}>
                          <colgroup>
                            <col style={{ width: "35%" }} />
                            <col style={{ width: "15%" }} />
                            <col style={{ width: "35%" }} />
                            <col style={{ width: "15%" }} />
                          </colgroup>
                          <tbody>
                            <tr style={{ padding: "0px" }}>
                              <td style={{ fontSize: "13px" }}>
                                Vehicle Capacity (Kg):
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                {vehicleCapacity}
                              </td>
                              <td style={{ fontSize: "13px" }}>
                                Vehicle Volume (m<sup>3</sup>):
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                {vehicleVolume}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ fontSize: "13px" }}>
                                Plan Gross Weight (Kg):
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                {planGrossWeight}
                              </td>
                              <td style={{ fontSize: "12px" }}>
                                Plan Gross Volume (m<sup>3</sup>):
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                }}
                              >
                                {planGrossVolume}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table>
                          <colgroup>
                            <col style={{ width: "50%" }} />
                            <col style={{ width: "50%" }} />
                          </colgroup>
                          <tbody>
                            <tr>
                              <td style={{ fontSize: "13px" }}>
                                Utilization by Weight:
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  color:
                                    getColorForPercentage(percentageUsedWeight),
                                }}
                              >
                                {percentageUsedWeight}% Utilization of Vehicle
                              </td>
                            </tr>
                            <tr>
                              <td style={{ fontSize: "12px" }}>
                                Utilization by Volume:
                              </td>
                              <td
                                style={{
                                  fontSize: "14px",
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  color:
                                    getColorForPercentage(percentageUsedVolume),
                                }}
                              >
                                {percentageUsedVolume}% Utilization of Vehicle
                              </td>
                            </tr>

                            {/* <tr>
                            <td></td>
                           
                            <td colSpan={2}>
                             
                            </td>
                          </tr> */}
                            {/* <tr>
                            <td></td>
                            <td> &nbsp;</td>
                            <td colSpan={2}>
                             
                            </td>
                          </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div>
                    {/* {!isMarketVehicle && (
                   
                  )} */}

                    {/* {!isMarketVehicle && (
                    
                  )} */}
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleVehicleAssign}
                  disabled={isButtonDisabled}
                >
                  Assign Vehicle
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Grid>

        <div>
          <Modal
            open={openVendorMaterialList}
            onClose={handlePlanDetaislClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                maxWidth: "800px",
                padding: "20px",
                maxHeight: "80vh", // Limit the height to 80% of the viewport height
                overflowY: "auto",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Plan Details
              </Typography>
              <DataGrid
                rows={planRows}
                columns={planColumns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
                className="super-app-theme"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "20px",
                }}
              >
                <Button variant="contained" onClick={handlePlanDetaislClose}>
                  close
                </Button>
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <Dialog
            open={openMarketVehicleChange}
            onClose={handleMarketVehicleChange}
          >
            <DialogTitle>Market Vehicle Number</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>

              <TextField
                required
                margin="dense"
                id="VehicleNumber"
                label="Market Vehicle Number"
                value={changeMarketVehicle}
                onChange={handleChangeMarketVehicle}
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleMarketVehicleChange}
                variant="contained"
                color="primary"
              >
                Close
              </Button>
              <Button
                onClick={handleManualVehicleChange}
                variant="contained"
                color="success"
              >
                Update Vehicle
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog open={openDe} onClose={handleDeClose}>
            <DialogTitle>UnAssign Vehicle</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              Vehicle No: <b>{deAssign.vehicle}</b> Plan No :{" "}
              <b>{deAssign.planNo}</b>
              <br></br> Are you sure you want to UnAssign Vehicle to this plan ?
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeClose}
                variant="contained"
                color="primary"
              >
                No
              </Button>

              <Button
                onClick={handleDeAssignAPI}
                variant="contained"
                color="error"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </div>
  );
}

export default PlanSummary;
