import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import SupplierInfo from "../../components/SupplierInfo";
import AuthServices from "../../services/AuthServices";
import TripServices from "../../services/TripServices";
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

function VehiclesOnTrip() {
  const textStyle = {
    margin: "8px",
    padding: "4px",
    width: "50%",
  };

  const containerStyle = {
    padding: "8px",
    height: "100%",
  };
  const ItemStyle = {
    padding: "4px",
    margin: "4px",
  };

  const [error, setError] = useState(false);
  const [openComplete, setOpenComplete] = React.useState(false);
  const [dialogTitleMessageComplete, setDialogTitleMessageComplete] =
    useState();
  const [dialogContentMessageComplete, setDialogContentMessageComplete] =
    useState();
  const [rows, setRows] = useState([]);
  const [routeRows, setRouteRows] = useState([]);
  const [planRows, setPlanRows] = useState([]);
  const [planId, setPlanId] = useState();
  const [planDate, setPlanDate] = useState();
  const [planType, setPlanType] = useState();
  const [planStatus, setPlanStatus] = useState();
  const [plantWeight, setPlanWeight] = useState();
  const [openTripSummary, setOpenTripSummary] = useState(false);
  const [tSTripDate, setTsTripDate] = useState();
  const [tsPlantName, setTsPlantName] = useState();
  const [tstranporterName, setTsTransporterName] = useState();
  const [tsvehicleNo, setTsVehicleNo] = useState();
  const [tsRoute, setTsRoute] = useState();
  const [tsTripNo, setTsTripNo] = useState();
  const [tsStartDateTime, setTsStartDateTime] = useState();
  const [tsEndDateTime, setTsEndDateTime] = useState();
  const [tsDuration, setTsDuration] = useState();
  const [tsTravelTime, setTsTravelTime] = useState();
  const [tsStartLocation, setTsStartLocation] = useState();
  const [tsEndLocation, setTsEndLocation] = useState();
  const [tsStartOdo, setTsStartOdo] = useState();
  const [tsEndOdo, setTsEndOdo] = useState();
  const [tsDistance, setTsDistance] = useState();
  const [odoDistance, setOdoDistance] = useState();
  // const [tsAnnexure, setTsAnnexure] = useState();
  const [tsVehicleCap, setTsVehicleCap] = useState();
  const [tsLoadedWt, setTsLoadedWt] = useState();
  const [tsSupplierInfo, setTsSupplierInfo] = useState([{}]);
  const [open, setOpen] = React.useState(false);
  const [cancelTripDetails, setCancelTripDetails] = useState({});
  const [openVehicleDetails, setVehicleDetails] = React.useState(false);
  const [openRouteList, setOpenRouteList] = useState(false);
  const [openPlanList, setOpenPlanList] = useState(false);
  const [vehicleNo, setVehicleNo] = useState();
  const [transporterName, setTransporterName] = useState();
  const [transporterPerson, setTransporterPerson] = useState();
  const [transporterContact, setTransporterContact] = useState();

  const [driverName, setDriverName] = useState();
  const [driverMobile, setDriverMobile] = useState();
  const [rc, setRc] = useState();
  const [rcExpiry, setRcExpiry] = useState();
  const [insurance, setInsurance] = useState();
  const [insuranceExpiry, setInsuranceExpiry] = useState();
  const [fitness, setFitness] = useState();
  const [fitnessExpiry, setFitnessExpiry] = useState();
  const [pollution, setPollution] = useState();
  const [pollutionExpiry, setPollutionExpiry] = useState();

  const [openMarketClose, setOpenMarketClose] = useState(false);
  const [closingActualDistance, setClosingActualDistance] = useState(0);
  const [closingActualStartDateTime, setClosingActualStartDateTime] =
    useState(null);
  const [closingActualEndDateTime, setClosingActualEndDateTime] =
    useState(null);

  const [pickupPoint, setPickupPoint] = useState();
  const [deliveryPoint, setDeliveryPoint] = useState();

  const [routeCode, setRouteCode] = useState();
  const [routeName, setRouteName] = useState();

  const [loading, setLoading] = useState(false);

  const planColumns = [
    {
      field: "sno",
      headerName: "SL No",
      align: "center",
      headerAlign: "center",
      minWidth: 30,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vendor",
      headerName: "Supplier",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "materialCode",
      headerName: "Material Code",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "material",
      headerName: "Material Description",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "requestedQuantity",
      headerName: "Requested Qty",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "uom",
      headerName: "UOM",
      align: "center",
      headerAlign: "center",
      minWidth: 50,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dispatchedQuantity",
      headerName: "Dispatch Qty",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dispatchedOn",
      headerName: "Dispatched On",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dispatchedRemarks",
      headerName: "Dispatch Remarks",
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
  ];

  const routeColumns = [
    {
      field: "sno",
      headerName: "SL No",
      align: "center",
      headerAlign: "center",
      minWidth: 30,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "sequence",
      headerName: "Sequence",
      align: "center",
      headerAlign: "center",
      minWidth: 30,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "hubName",
      headerName: "Supplier Name",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "plannedArrivalDate",
    //   headerName: "Planned Arrival Date",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 200,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "actualArrivalDate",
      headerName: "Actual Arrival Date",
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "arrivalDelay",
    //   headerName: "Arrival Delay",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 200,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },

    // {
    //   field: "plannedDepartureDate",
    //   headerName: "Planned Departure Date",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 200,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "actualDepartureDate",
      headerName: "Actual Departure Date",
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "departureDelay",
    //   headerName: "Departure Delay",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 200,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "Detention",
      headerName: "Detention",
      align: "center",
      headerAlign: "center",
      minWidth: 200,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 80,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
  ];

  const columns = [
    {
      field: "sno",
      headerName: "SL No",
      align: "center",
      headerAlign: "center",
      minWidth: 50,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "tripNo",
      headerName: "Trip No",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "planNo",
      headerName: "Plan Number",
      renderCell: (params) => {
        const planN = params.value;
        let color = "blue"; // Define the desired color based on a condition or any other logic

        // Apply custom styling to the cell
        return <div style={{ color }}>{planN}</div>;
      },
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "planDate",
      headerName: "Plan Date",
      align: "center",
      headerAlign: "center",
      minWidth: 70,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "transporter",
      headerName: "Transporter",
      align: "center",
      headerAlign: "center",
      minWidth: 180,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "tripType", //Manul or GPS
      headerName: "Vehicle Is",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "vehicleNo",
      headerName: "Vehicle Number",
      renderCell: (params) => {
        const veh = params.value;
        let color = "blue"; // Define the desired color based on a condition or any other logic

        // Apply custom styling to the cell
        return <div style={{ color }}>{veh}</div>;
      },
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "route",
      renderCell: (params) => {
        const rt = params.value;
        let color = "blue"; // Define the desired color based on a condition or any other logic

        // Apply custom styling to the cell
        return <div style={{ color }}>{rt}</div>;
      },
      headerName: "Route",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "source",
      headerName: "Source",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "destination",
      headerName: "Destination",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "actualStartDate",
      headerName: "Start Date Time",
      align: "center",
      headerAlign: "center",
      minWidth: 140,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "actualEndDate",
      headerName: "End Date Time",
      align: "center",
      headerAlign: "center",
      minWidth: 140,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "actualDistance",
      headerName: "Distance",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "actualDuration",
      headerName: "Duration",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Trip Status",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "trip",
      headerName: "TripInfo",
      align: "center",
      headerAlign: "center",
      minWidth: 10,
      flexGrow: 1,
      hide: Boolean(true),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "tripId",
      headerName: "tripId",
      align: "center",
      headerAlign: "center",
      minWidth: 10,
      flexGrow: 1,
      hide: Boolean(true),
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
        const handleCloseTrip = () => {
          console.log("Edit Clicked for Trip Id" + params.row);
          setCancelTripDetails({
            tripId: params.row.tripId,
            tripNo: params.row.tripNo,
          });

          if (params.row.tripType === "GPS") {
            setOpen(true);
          } else {
            setOpenMarketClose(true);
          }
          // navigate("/MainLayout/EPremium", { state: params.row.freightData });
        };

        const handleTripSummary = async () => {
          //  setCancelTripDetails({tripId:params.row.tripId, tripNo:params.row.tripNo });
          console.log("Trip Id" + params.row.tripId);
          const tripSummaryResponse = await TripServices.getTripSummary(
            params.row.tripId
          );
          if (tripSummaryResponse.code === 200) {
            console.log("Response=>" + JSON.stringify(tripSummaryResponse));

            setTsTripDate(
              moment(new Date(tripSummaryResponse.responseBody.date)).format(
                "DD-MM-YYYY"
              )
            ); //change format using moment
            setTsPlantName(tripSummaryResponse.responseBody.plantName);
            setTsTransporterName(
              tripSummaryResponse.responseBody.transporterName
            );
            setTsVehicleNo(tripSummaryResponse.responseBody.vehicleNo);
            setTsRoute(tripSummaryResponse.responseBody.route);
            setTsTripNo(tripSummaryResponse.responseBody.tripNo);
            setTsStartDateTime(
              tripSummaryResponse.responseBody.actualStartDate
                ? moment(
                    new Date(tripSummaryResponse.responseBody.actualStartDate)
                  ).format("DD-MM-YYYY HH:mm")
                : ""
            );
            setTsEndDateTime(
              tripSummaryResponse.responseBody.actualEndDate
                ? moment(
                    new Date(tripSummaryResponse.responseBody.actualEndDate)
                  ).format("DD-MM-YYYY HH:mm")
                : ""
            );
            setTsDuration(
              tripSummaryResponse.responseBody.actualDuration
                ? convertMinutesToHHMM(
                    tripSummaryResponse.responseBody.actualDuration
                  )
                : ""
            );

            // setTsTravelTime(
            //   tripSummaryResponse.responseBody.actualEndDate ||
            //     tripSummaryResponse.responseBody.actualStartDate
            //     ? differenceToHHMM(
            //         tripSummaryResponse.responseBody.actualStartDate,
            //         tripSummaryResponse.responseBody.actualEndDate
            //       )
            //     : ""
            // );

            setTsStartLocation(tripSummaryResponse.responseBody.source);
            setTsEndLocation(tripSummaryResponse.responseBody.destination);
            setTsStartOdo(tripSummaryResponse.responseBody.startOdometer);
            setTsEndOdo(tripSummaryResponse.responseBody.endOdometer);
            const odoDistance = calculateOdoDistance(
              tripSummaryResponse.responseBody.startOdometer,
              tripSummaryResponse.responseBody.endOdometer
            );
            setOdoDistance(odoDistance);
            setTsDistance(tripSummaryResponse.responseBody.actualDistance);

            setTsVehicleCap(tripSummaryResponse.responseBody.vehicleCapacity);
            //setTsLoadedWt(tripSummaryResponse.responseBody.)
            //setTsAnnexure(tripSummaryResponse.responseBody.)
            //setTsTravelTime(tripSummaryResponse.responseBody.)

            setTsSupplierInfo(tripSummaryResponse.responseBody.vendors);

            setOpenTripSummary(true);
          }
        };

        if (params.row.actualStartDate === "NOT STARTED") {
          return (
            <>
              <div style={{ width: "8px" }} />{" "}
              <CloseIcon color="primary" onClick={handleCloseTrip} />
              <div style={{ width: "8px" }} />
              {/* <DeleteIcon  color="primary" onClick={handleEditClick}/> */}
              <AssignmentIcon color="primary" onClick={handleTripSummary} />
            </>
          );
        } else {
          return (
            <>
              <div style={{ width: "8px" }} />
              <AssignmentIcon color="primary" onClick={handleTripSummary} />
            </>
          );
        }
      },
    },
  ];

  useEffect(() => {
    getAllTripsListFromT4U();
  }, []);

  async function getAllTripsListFromT4U() {
    setLoading(true);
    let userCompany = AuthServices.getSelectedPlant();
    let companyId = userCompany.plantId;
    const dateJson = {
      companyId: companyId,
      status: "OPEN",
    };
    let tripsListResponse = await TripServices.getAllTripsFromT4U(dateJson);
    //console.log("Trips Response:" + JSON.stringify(tripsListResponse));
    setRows([]);
    if (tripsListResponse.code === 200) {
      tripsListResponse.responseBody.map((trip, index) =>
        setRows((prevState) => [
          ...prevState,
          {
            id: index + 1,
            sno: index + 1,
            tripId: trip.id,
            tripNo: trip.tripNo,
            planNo: trip.plan.planNo,
            planDate: moment(new Date(trip.plan.planDate)).format("DD-MM-YYYY"),
            transporter: trip.transporter.name,
            tripType: trip.tripType,
            vehicleNo:
              trip.tripType === "GPS" || trip.tripType === "NOGPS"
                ? trip.vehicle.registrationNo
                : trip.marketVehicle,
            driverName: "",
            driverMobile: "",
            lastCommunication: "",
            route: trip.route.code,
            source: trip.route.source.name,
            destination: trip.route.destination.name,
            plannedStartDate: moment(new Date(trip.plannedStartDate)).format(
              "DD-MM-YYYY hh:mm"
            ),
            actualStartDate: trip.actualStartDate
              ? moment(new Date(trip.actualStartDate)).format(
                  "DD-MM-YYYY hh:mm"
                )
              : "NOT STARTED",
            plannedEndDate: moment(new Date(trip.plannedEndDate)).format(
              "DD-MM-YYYY hh:mm"
            ),
            actualEndDate: trip.actualEndDate
              ? moment(new Date(trip.actualEndDate)).format("DD-MM-YYYY hh:mm")
              : "NOT ENDED",
            plannedDistance: trip.plannedDistance,
            actualDuration: trip.actualDuration
              ? convertMinutesToHHMM(trip.actualDuration)
              : "",
            actualDuration: trip.actualDuration,
            plannedDuration: trip.plannedDuration
              ? convertMinutesToHHMM(trip.plannedDuration)
              : "",
            status: trip.status,
            trip: trip,
          },
        ])
      );
      // detentionRows.shift();
      setLoading(false);
    } else {
      console.log("Error" + JSON.stringify(tripsListResponse));
      console.log("Some thing went worng");
      setLoading(false);
    }
  }
  const handlePlanDetailsClose = () => {
    setOpenPlanList(false);
  };
  const handleRouteClose = () => {
    console.log("Clicked Close and closing");
    setOpenRouteList(false);
  };
  const handlePlanClick = (plans, route) => {
    console.log("Plan Information:" + JSON.stringify(plans));
    setPlanId(plans.planNo);
    setPlanDate(moment(new Date(plans.planDate)).format("DD-MM-YYYY"));
    setPlanType(plans.type);
    setPlanWeight(plans.totalWeight);
    setPlanStatus(plans.status);

    setRouteName(route.name);
    setPickupPoint(route.source.name);
    setDeliveryPoint(route.destination.name);

    setPlanRows([]);
    plans.items.map((plan, index) =>
      setPlanRows((prevState) => [
        ...prevState,
        {
          id: index + 1,
          sno: index + 1,

          vendor: plan.vendor.name,
          material: plan.material.name,
          materialCode: plan.material.code,
          materialDescription: plan.material.description,
          requestedQuantity: plan.requestedQuantity,
          uom: plan.uom,
          dispatchedQuantity: plan.dispatchedQuantity,
          dispatchedOn: plan.dispatchedOn
            ? moment(new Date(route.dispatchedOn)).format("DD-MM-YYYY")
            : "",
          dispatchedRemarks: plan.dispatchedRemarks,
        },
      ])
    );

    setOpenPlanList(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancelTrip = async () => {
    setLoading(true);
    const tripCloseResponse = await TripServices.closeTrip({
      id: cancelTripDetails.tripId,
    });
    if (tripCloseResponse.code === 200) {
      setDialogTitleMessageComplete("Trip Closed Successfully");
      setDialogContentMessageComplete(
        "Trip Id " + cancelTripDetails.tripNo + " Closed Successfully"
      );
      setOpen(false);
      setOpenComplete(true);
      setLoading(false);
    } else {
      setDialogTitleMessageComplete("Trip Closed Failed");
      setDialogContentMessageComplete(
        "Trip Id " + cancelTripDetails.tripNo + " Failed to close"
      );
      setOpen(false);
      setOpenComplete(true);
      setLoading(false);
    }
  };
  const handleCloseComplete = () => {
    setOpenComplete(false);

    setClosingActualStartDateTime(null);
    setClosingActualEndDateTime(null);
    setClosingActualDistance(0);
    getAllTripsListFromT4U();
    //window.location.reload();
  };
  const handleCancelManualTrip = async () => {
    setLoading(true);
    //TODO Cancel API call Manual
    console.log("Closing Market Trip:" + closingActualStartDateTime);

    if (closingActualStartDateTime === null) {
      alert("Enter Actual Start Date Time");
      setLoading(false);
      return;
    }

    if (closingActualEndDateTime === null) {
      alert("Enter Actual End Date Time");
      setLoading(false);
      return;
    }

    if (closingActualDistance === 0) {
      alert("Enter Distance");
      setLoading(false);
      return;
    }

    setOpenMarketClose(false);
    const tripCloseResponse = await TripServices.closeTrip({
      id: cancelTripDetails.tripId,
      actualStartDate: closingActualStartDateTime,
      actualEndDate: closingActualEndDateTime,
      actualDistance: closingActualDistance,
      // actualDuration:closingActualDuration
    });
    if (tripCloseResponse.code === 200) {
      setDialogTitleMessageComplete("Market Trip Closed Successfully");
      setDialogContentMessageComplete(
        "Trip Id " + cancelTripDetails.tripNo + " Closed Successfully"
      );
      setOpen(false);
      setOpenComplete(true);
      setLoading(false);
    } else {
      setDialogTitleMessageComplete("Market Trip Closed Failed");
      setDialogContentMessageComplete(
        "Trip Id " + cancelTripDetails.tripNo + " Failed to close"
      );
      setOpen(false);
      setOpenComplete(true);
      setLoading(false);
    }
  };
  const handleActualEndDateTime = (newValue) => {
    const formattedDate = dayjs(newValue).format("YYYY-MM-DD HH:mm:ss");
    console.log("END DATE TIME:", formattedDate);

    if (
      closingActualStartDateTime &&
      dayjs(newValue).isBefore(closingActualStartDateTime)
    ) {
      setError(true);
      setClosingActualStartDateTime(null);
    } else {
      setError(false);
      setClosingActualEndDateTime(formattedDate);
    }
    //setClosingActualEndDateTime(formattedDate);
  };
  const handleActualStartDateTime = (newValue) => {
    console.log(" START DATE TIME:", newValue);
    const formattedDate = dayjs(newValue).format("YYYY-MM-DD HH:mm:ss");

    if (
      closingActualEndDateTime &&
      dayjs(newValue).isAfter(closingActualEndDateTime)
    ) {
      setError(true);
      setClosingActualStartDateTime(null);
    } else {
      setError(false);
      setClosingActualStartDateTime(formattedDate);
    }
  };
  const handleMarketClose = () => {
    setOpenMarketClose(false);
  };
  const handleVehicleDetailsClose = () => {
    setVehicleDetails(false);
  };
  const handleOpenTripSummary = () => {
    setOpenTripSummary(false);
  };
  const handlePrintTripSummary = () => {
    setOpenTripSummary(false);
    window.print();
  };
  const handleVehicleClick = (trip) => {
    console.log("vehicle Information:" + JSON.stringify(trip));

    setVehicleNo(trip.vehicle.registrationNo);
    setTransporterName(trip.vehicle.transporter.name);

    setTransporterPerson(trip.vehicle.transporter.contactName);
    setTransporterContact(trip.vehicle.transporter.contactNo);

    setDriverName(trip.driverName);
    setDriverMobile(trip.driverMobile);
    setRc(trip.vehicle.rcNo);
    setRcExpiry(
      trip.vehicle.rcExpiry
        ? moment(new Date(trip.vehicle.rcExpiry)).format("DD-MM-YYYY")
        : ""
    );

    setInsurance(trip.vehicle.insurance);
    setInsuranceExpiry(
      trip.vehicle.insuranceExpiry
        ? moment(new Date(trip.vehicle.insuranceExpiry)).format("DD-MM-YYYY")
        : ""
    );
    setFitness(trip.vehicle.fcNo);
    setFitnessExpiry(
      trip.vehicle.fcExpiry
        ? moment(new Date(trip.vehicle.fcExpiry)).format("DD-MM-YYYY")
        : ""
    );
    setPollution(trip.vehicle.pcNo);
    setPollutionExpiry(
      trip.vehicle.pcExpiry
        ? moment(new Date(trip.vehicle.pcExpiry)).format("DD-MM-YYYY")
        : ""
    );

    setVehicleDetails(true);
  };
  const handleRouteClick = (hubs, route) => {
    console.log("hubs Information:" + JSON.stringify(hubs));
    console.log("Route Information:" + JSON.stringify(route));

    setRouteCode(route.code);
    setRouteName(route.name);

    setPickupPoint(route.source.name);
    setDeliveryPoint(route.destination.name);

    setRouteRows([]);
    hubs.slice(1, -1).map((route, index) =>
      setRouteRows((prevState) => [
        ...prevState,
        {
          id: index + 1,
          sno: index + 1,
          sequence: route.sequence,
          hubName: route.hubName,
          plannedArrivalDate: route.plannedArrivalDate
            ? moment(new Date(route.plannedArrivalDate)).format(
                "DD-MM-YYYY HH:mm"
              )
            : "",
          plannedDepartureDate: route.plannedDepartureDate
            ? moment(new Date(route.plannedDepartureDate)).format(
                "DD-MM-YYYY HH:mm"
              )
            : "",
          actualArrivalDate: route.actualArrivalDate
            ? moment(new Date(route.actualArrivalDate)).format(
                "DD-MM-YYYY HH:mm"
              )
            : "",
          actualDepartureDate: route.actualDepartureDate
            ? moment(new Date(route.actualDepartureDate)).format(
                "DD-MM-YYYY HH:mm"
              )
            : "",

          status: route.status,
        },
      ])
    );
    console.log("data while rotue is set", routeRows);
    setOpenRouteList(true);
  };

  function convertMinutesToHHMM(minutes) {
    var duration = moment.duration(minutes, "minutes");
    var formattedTime = moment.utc(duration.asMilliseconds()).format("HH:mm");
    return formattedTime;
  }

  function differenceToHHMM(date1, date2) {
    console.log("inside cal diff", date1, date2);
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);
    var duration = moment.duration(momentDate2.diff(momentDate1));
    console.log("duration", duration);
    // Extract hours and minutes
    var hours = Math.floor(duration.asHours());
    var minutes = duration.minutes();

    // Format the difference
    var formattedDifference = moment
      .utc()
      .hours(hours)
      .minutes(minutes)
      .format("HH:mm");
    console.log(" cal diffvalue", formattedDifference);
    return formattedDifference;
  }

  const calculateOdoDistance = (startOdo, endOdo) => {
    // Check if startOdometer or endOdometer is null or 0
    if (
      startOdo === null ||
      startOdo === 0 ||
      endOdo === null ||
      endOdo === 0
    ) {
      return 0; // If either startOdometer or endOdometer is null or 0, set odoDistance to 0
    } else {
      return endOdo - startOdo; // Otherwise, calculate the difference between endOdometer and startOdometer
    }
  };
  return (
    <div>
      {loading && (
        <div style={overlayStyle}>
          <PacmanLoader color={"#1976d2"} loading={loading} size={30} />
        </div>
      )}
      <Grid container style={containerStyle}>
        <h3 style={{ marginLeft: "8px" }}>Trip Summary</h3>
        <Grid item xs={12} style={ItemStyle}>
          <Paper elevation={2}>
            <ThemeProvider theme={theme}>
              <div style={{ height: 550, width: "100%", overflow: "scroll" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  scrollbarSize={10}
                  columnVisibilityModel={{ trip: false, tripId: false }}
                  onCellClick={(params) => {
                    if (params.field === "planNo") {
                      handlePlanClick(
                        params.row.trip.plan,
                        params.row.trip.route
                      );
                    }
                    if (params.field === "vehicleNo") {
                      if (params.row.tripType === "GPS") {
                        handleVehicleClick(params.row.trip);
                      } else {
                        alert("Vehicle Info not available");
                      }
                    }
                    if (params.field === "route") {
                      handleRouteClick(
                        params.row.trip.hubs,
                        params.row.trip.route
                      );
                    }
                  }}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0
                      ? "super-app-theme--odd"
                      : "super-app-theme--even"
                  }
                  sx={{
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
            </ThemeProvider>
          </Paper>
        </Grid>
        <div>
          <Modal
            open={openPlanList}
            onClose={handlePlanDetailsClose}
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
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Plan Details
              </Typography>
              <table>
                <tr>
                  <td>
                    <b>Plan Id:</b>
                  </td>
                  <td>{planId}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Plan Date:</b>
                  </td>
                  <td>{planDate}</td>
                  <td>&nbsp;</td>

                  <td>
                    {" "}
                    <b>Total Weight:</b>
                  </td>
                  <td>{plantWeight}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    {" "}
                    <b>Plan Type:</b>
                  </td>
                  <td>{planType}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Status:</b>
                  </td>
                  <td>{planStatus}</td>
                </tr>
                <tr>
                  <td>
                    <b>Route Name:</b>
                  </td>
                  <td>{routeName}</td>
                  <td>&nbsp;</td>
                  <td>
                    <b>Pickup Point:</b>
                  </td>
                  <td>{pickupPoint}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Delivery Point:</b>
                  </td>
                  <td>{deliveryPoint}</td>
                  <td>&nbsp;</td>
                </tr>
              </table>
              <ThemeProvider theme={theme}>
                <DataGrid
                  rows={planRows}
                  columns={planColumns}
                  pageSize={10}
                  rowsPerPageOptions={[5, 10, 25]}
                  scrollbarSize={10}
                  className="super-app-theme"
                />
              </ThemeProvider>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "20px",
                }}
              >
                <Button variant="contained" onClick={handlePlanDetailsClose}>
                  close
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div>
          <Modal
            open={openRouteList}
            onClose={handleRouteClose}
            style={{
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                maxWidth: "1050px",
                width: "100%",
                height: "450px", // Adjust the height to your desired value
                margin: "0 auto",
                padding: "20px",
                boxSizing: "border-box",
                overflow: "auto",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Route Details:
              </Typography>
              <table style={{ marginBottom: "10px" }}>
                <tr>
                  <td>
                    <b>Route Code:</b>
                  </td>
                  <td>{routeCode}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Route Name:</b>
                  </td>
                  <td>{routeName}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <b>Pickup Point:</b>
                  </td>
                  <td>{pickupPoint}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Delivery Point:</b>
                  </td>
                  <td>{deliveryPoint}</td>
                  <td>&nbsp;</td>
                </tr>
              </table>
              <ThemeProvider theme={theme}>
                <DataGrid
                  rows={routeRows}
                  columns={routeColumns}
                  pageSize={10}
                  autoHeight
                  rowsPerPageOptions={[5, 10, 25]}
                  scrollbarSize={10}
                  className="super-app-theme"
                />
              </ThemeProvider>
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "20px",
                }}
              >
                <Button variant="contained" onClick={handleRouteClose}>
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        </div>
        <div>
          <Modal
            open={openVehicleDetails}
            onClose={handleVehicleDetailsClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                maxWidth: "1000px",
                padding: "8px",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Vehicle Details:
              </Typography>
              <table>
                <tr>
                  <td>
                    <b>Vehicle Registration:</b>
                  </td>
                  <td>{vehicleNo}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Transporter Name:</b>
                  </td>
                  <td>{transporterName}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <b>Transporter Person:</b>
                  </td>
                  <td>{transporterPerson}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Transporter Contact:</b>
                  </td>
                  <td>{transporterContact}</td>
                  <td>&nbsp;</td>
                </tr>

                <tr>
                  <td>
                    <b>Driver:</b>
                  </td>
                  <td>{driverName}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Driver Contact:</b>
                  </td>
                  <td>{driverMobile}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <b>RC Number:</b>
                  </td>
                  <td>{rc}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Rc Expiry:</b>
                  </td>
                  <td>{rcExpiry}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <b>Insurance:</b>
                  </td>
                  <td>{insurance}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Insurance Expiry:</b>
                  </td>
                  <td>{insuranceExpiry}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <b>Fitness:</b>
                  </td>
                  <td>{fitness}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Fitness Expiry:</b>
                  </td>
                  <td>{fitnessExpiry}</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>
                    <b>Pollution:</b>
                  </td>
                  <td>{pollution}</td>
                  <td>&nbsp;</td>
                  <td>
                    {" "}
                    <b>Pollution Expiry:</b>
                  </td>
                  <td>{pollutionExpiry}</td>
                  <td>&nbsp;</td>
                </tr>
              </table>

              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "20px",
                }}
              >
                <Button variant="contained" onClick={handleVehicleDetailsClose}>
                  Close
                </Button>
              </div>
            </div>
          </Modal>
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

        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Close Trip</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              Trip No : {cancelTripDetails.tripNo}
              Are you sure you want to Close Trip ?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary">
                No
              </Button>

              <Button
                onClick={handleCancelTrip}
                variant="contained"
                color="error"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={openMarketClose}
            onClose={handleMarketClose}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Close Market Trip</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div style={{ marginBottom: "8px" }}>
                  Trip No : {cancelTripDetails.tripNo}
                </div>
              </DialogContentText>
              <Grid container spacing={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {error && (
                    <Grid item xs={12}>
                      <p style={{ color: "red" }}>
                        End datetime cannot be less than start datetime.
                      </p>
                    </Grid>
                  )}
                  <Grid item xs={6}>
                    <DateTimePicker
                      label="Actual Start Date time"
                      value={closingActualStartDateTime}
                      onChange={handleActualStartDateTime}
                      format="DD-MM-YYYY HH:mm"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker
                      label="Actual End Date time"
                      value={closingActualEndDateTime}
                      onChange={handleActualEndDateTime}
                      format="DD-MM-YYYY HH:mm"
                    />
                  </Grid>
                </LocalizationProvider>
                <Grid item xs={12}>
                  <TextField
                    id="distance"
                    label="Actual Distance *(Kms)"
                    variant="outlined"
                    value={closingActualDistance}
                    onChange={(e) => setClosingActualDistance(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    style={textStyle}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleMarketClose}
                variant="contained"
                color="primary"
              >
                No
              </Button>

              <Button
                onClick={handleCancelManualTrip}
                variant="contained"
                color="error"
              >
                Close Trip
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Modal
            open={openTripSummary}
            onClose={handleOpenTripSummary}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                padding: "16dp",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                maxHeight: "80%",
                backgroundColor: "#FFF",
                overflowY: "auto",
              }}
            >
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Trip Summary Report
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <table
                    style={{
                      width: "90%",
                      tableLayout: "fixed",
                      border: "1px solid black",
                    }}
                  >
                    <colgroup>
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "75%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td style={{ padding: "4px" }}>Date</td>
                        <td style={{ padding: "4px", textAlign: "left" }}>
                          {tSTripDate}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "4px" }}>Plant Name</td>
                        <td style={{ padding: "4px", textAlign: "left" }}>
                          {tsPlantName}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "4px" }}>Transporter Name</td>
                        <td style={{ padding: "4px", textAlign: "left" }}>
                          {tstranporterName}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "8px",
                  }}
                >
                  <table
                    style={{
                      width: "90%",
                      tableLayout: "fixed",
                      border: "1px solid black",
                    }}
                  >
                    <colgroup>
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td>
                          <b>Trip Summary</b>
                        </td>
                      </tr>

                      <tr>
                        <td>Vehicle Number</td> <td>{tsvehicleNo}</td>
                        <td>Trip No.</td> <td>{tsTripNo}</td>{" "}
                      </tr>
                      <tr>
                        <td>Route</td> <td>{tsRoute}</td>
                        <td></td> <td></td>
                      </tr>
                      <tr>
                        <td>Start Date & Time</td> <td>{tsStartDateTime}</td>
                        <td>End Date & Time</td> <td>{tsEndDateTime}</td>
                      </tr>
                      <tr>
                        <td>Duration</td> <td>{tsDuration}(HH.mm)</td>
                        {/* <td>Travel Time</td> <td>{tsTravelTime}(HH.mm)</td> */}
                      </tr>
                      <tr>
                        <td>Start Location</td> <td>{tsStartLocation}</td>
                        <td>End Location</td> <td>{tsEndLocation}</td>
                      </tr>
                      <tr>
                        <td>Start Odometer</td> <td>{tsStartOdo} Kms</td>
                        <td>End Odometer</td> <td>{tsEndOdo} Kms</td>
                      </tr>
                      <tr>
                        <td>Odometer Distance</td> <td>{odoDistance} Kms</td>
                        <td>Gps Distance</td> <td>{tsDistance} Kms</td>
                        {/* <td>Travel Duration</td> <td>{tsAnnexure} HH:mm</td> */}
                      </tr>
                      <tr>
                        <td></td> <td></td>
                        <td></td> <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "8px",
                  }}
                >
                  <table
                    style={{
                      width: "90%",
                      tableLayout: "fixed",
                      border: "1px solid black",
                    }}
                  >
                    <colgroup>
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                      <col style={{ width: "25%" }} />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td>Vehicle Capacity</td> <td>{tsVehicleCap} Kg</td>
                        <td>Loaded Weight</td> <td>{tsLoadedWt} Kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {tsSupplierInfo.map((vendor, index) => {
                  return <SupplierInfo data={vendor} />;
                })}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginTop: "12px",
                  }}
                >
                  <Button
                    variant="contained"
                    className="hide-on-print"
                    style={{ margin: "4px" }}
                    onClick={handleOpenTripSummary}
                  >
                    close
                  </Button>
                  <Button
                    variant="contained"
                    className="hide-on-print"
                    style={{ margin: "4px" }}
                    onClick={handlePrintTripSummary}
                  >
                    Print
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </Grid>
    </div>
  );
}

export default VehiclesOnTrip;
