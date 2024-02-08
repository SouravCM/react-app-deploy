import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SupplierInfo from "../../components/SupplierInfo";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AuthServices from "../../services/AuthServices";
import TripServices from "../../services/TripServices";
import moment from "moment";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  padding: "8px",
  height: "100%",
};
const ItemStyle = {
  padding: "4px",
  margin: "4px",
};

const formControlStyle = { m: 1, minWidth: 210 };

function VehiclesOnTrip() {
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
  //  const [tsAnnexure, setTsAnnexure] = useState();
  const [tsVehicleCap, setTsVehicleCap] = useState();
  const [tsLoadedWt, setTsLoadedWt] = useState();

  const [tsSupplierInfo, setTsSupplierInfo] = useState([{}]);

  const [openTripSummary, setOpenTripSummary] = useState(false);
  const [reportStatus, setReportStatus] = React.useState("");

  const [rows, setRows] = useState([]);
  const [routeRows, setRouteRows] = useState([]);
  const [planRows, setPlanRows] = useState([]);
  // const [vehicleRows, setVehicleRows] = useState([]);

  const [planId, setPlanId] = useState();
  const [planDate, setPlanDate] = useState();
  const [planType, setPlanType] = useState();
  const [planStatus, setPlanStatus] = useState();
  const [plantWeight, setPlanWeight] = useState();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

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
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      minWidth: 150,
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
    // {
    //   field: "lastCommunication",
    //   headerName: "Last Communication",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 150,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "driverName",
    //   headerName: "Driver Name",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 150,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "driverMobile",
    //   headerName: "Driver Mobile",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 150,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
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
    // {
    //   field: "plannedStartDate",
    //   headerName: "Planned Start Date Time",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 180,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "actualStartDate",
      headerName: "Start Date Time",
      align: "center",
      headerAlign: "center",
      minWidth: 140,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "delayInStart",
    //   headerName: "Delay In Start",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 150,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    // {
    //   field: "plannedEndDate",
    //   headerName: "Planned End Date Time",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 180,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "actualEndDate",
      headerName: "End Date Time",
      align: "center",
      headerAlign: "center",
      minWidth: 140,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "plannedDistance",
    //   headerName: "Planned Distance",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 150,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
    {
      field: "actualDistance",
      headerName: "Distance",
      align: "center",
      headerAlign: "center",
      minWidth: 100,
      flexGrow: 1,
      headerClassName: "super-app-theme--header",
    },
    // {
    //   field: "plannedDuration",
    //   headerName: "Planned Duration",
    //   align: "center",
    //   headerAlign: "center",
    //   minWidth: 180,
    //   flexGrow: 1,
    //   headerClassName: "super-app-theme--header",
    // },
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
      headerName: "TripId",
      align: "center",
      headerAlign: "center",
      minWidth: 10,
      flexGrow: 1,
      hide: Boolean(true),
      headerClassName: "super-app-theme--header",
    },
    {
      field: "tripType",
      headerName: "Trip Type",
      align: "center",
      headerAlign: "center",
      minWidth: 10,
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
            setTsDistance(tripSummaryResponse.responseBody.actualDistance);

            setTsVehicleCap(tripSummaryResponse.responseBody.vehicleCapacity);
            setTsLoadedWt(tripSummaryResponse.responseBody.planWeight);
            //setTsLoadedWt(tripSummaryResponse.responseBody.)
            //setTsAnnexure(tripSummaryResponse.responseBody.)
            //setTsTravelTime(tripSummaryResponse.responseBody.)

            setTsSupplierInfo(tripSummaryResponse.responseBody.vendors);

            setOpenTripSummary(true);
          }
        };

        return (
          <>
            <div style={{ width: "8px" }} />
            <AssignmentIcon color="primary" onClick={handleTripSummary} />
          </>
        );
      },
    },
  ];

  const handleReportStatus = (event) => {
    setReportStatus(event.target.value);
  };

  const handleFromDateTimeChange = (value) => {
    setFromDate(value);
    if (toDate && value >= toDate) {
      setToDate(null);
    }
  };

  const handleToDateTimeChange = (value) => {
    if (value >= fromDate) {
      setToDate(value);
    }
  };
  // useEffect(() => {
  //   getAllTripsListFromT4U();
  // }, []);

  // async function getAllTripsListFromT4U() {
  //   let userCompany = AuthServices.getSelectedPlant();
  //   let companyId = userCompany.plantId;

  //   const dateJson = {
  //     companyId: companyId,
  //     status :"OPEN"

  //   };
  //   let tripsListResponse = await TripServices.getAllTripsFromT4U(dateJson);
  //   //console.log("Trips Response:" + JSON.stringify(tripsListResponse));
  //   if (tripsListResponse.code === 200) {
  //     setRows([]);
  //     tripsListResponse.responseBody.map((trip, index) =>
  //       setRows((prevState) => [
  //         ...prevState,
  //         {
  //           id: trip.id,
  //           sno: index + 1,

  //           tripNo: trip.tripNo,
  //           planNo: trip.plan.planNo,
  //           planDate: moment(new Date(trip.plan.planDate)).format("DD-MM-YYYY"),
  //           vehicleNo: trip.vehicle.registrationNo,
  //           driverName: "",
  //           driverMobile: "",
  //           lastCommunication: "",
  //           route: trip.route.code,
  //           source: trip.route.source.name,
  //           destination: trip.route.destination.name,
  //           plannedStartDate:trip.plannedStartDate? moment(new Date(trip.plannedStartDate)).format(
  //             "DD-MM-YYYY hh:mm"
  //           ):"",
  //           actualStartDate:trip.actualStartDate ? moment(new Date(trip.actualStartDate)).format(
  //             "DD-MM-YYYY hh:mm"
  //           ):"",
  //           plannedEndDate:trip.plannedEndDate? moment(new Date(trip.plannedEndDate)).format(
  //             "DD-MM-YYYY hh:mm"
  //           ):"",
  //           actualEndDate:trip.actualEndDate? moment(new Date(trip.actualEndDate)).format(
  //             "DD-MM-YYYY hh:mm"
  //           ):"",
  //           plannedDistance: trip.plannedDistance,
  //           actualDistance: trip.actualDistance,
  //           plannedDuration: trip.plannedDuration,
  //           actualDuration: trip.actualDuration,
  //           status: trip.status,
  //           trip: trip,
  //         },
  //       ])
  //     );
  //     // detentionRows.shift();
  //   } else {
  //     //console.log("Error" + JSON.stringify(tripsListResponse));
  //     //console.log("Some thing went worng");
  //   }
  // }

  //const [openError, setopenError] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  const [openVehicleDetails, setVehicleDetails] = React.useState(false);

  const [openRouteList, setOpenRouteList] = useState(false);
  const [openPlanList, setOpenPlanList] = useState(false);

  const handlePlanDetailsClose = () => {
    setOpenPlanList(false);
  };

  const handleRouteClose = () => {
    //console.log("Clicked Close and closing");
    setOpenRouteList(false);
  };

  const handlePlanClick = (plans) => {
    console.log("Plan Information:" + JSON.stringify(plans));
    setPlanId(plans.planNo);
    setPlanDate(moment(new Date(plans.planDate)).format("DD-MM-YYYY"));
    setPlanType(plans.type);
    setPlanWeight(plans.totalWeight);
    setPlanStatus(plans.status);

    setPlanRows([]);
    plans.items.map((plan, index) =>
      setPlanRows((prevState) => [
        ...prevState,
        {
          id: index + 1,
          sno: index + 1,

          vendor: plan.vendor.name,
          material: plan.material.description,
          requestedQuantity: plan.requestedQuantity,
          uom: plan.uom,
          dispatchedQuantity: plan.dispatchedQuantity,
          dispatchedOn: plan.dispatchedOn
            ? moment(new Date(plan.dispatchedOn)).format("DD-MM-YYYY")
            : "",
          dispatchedRemarks: plan.dispatchedRemarks,
        },
      ])
    );

    setOpenPlanList(true);
  };

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
    //console.log("vehicle Information:" + JSON.stringify(vehicle));

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
    setInsuranceExpiry(
      trip.vehicle.insuranceExpiry
        ? moment(new Date(trip.vehicle.insuranceExpiry)).format("DD-MM-YYYY")
        : ""
    );
    setInsurance(trip.vehicle.insurance);
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

  const [pickupPoint, setPickupPoint] = useState();
  const [deliveryPoint, setDeliveryPoint] = useState();

  const [routeCode, setRouteCode] = useState();
  const [routeName, setRouteName] = useState();

  const handleRouteClick = (hubs, route) => {
    //console.log("Route Information:" + JSON.stringify(hubs));

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

    setOpenRouteList(true);
  };

  async function getTripsBasedOnCondition() {
    //console.log("fromDate" + fromDate);
    //console.log("toDate" + toDate);

    let userCompany = AuthServices.getSelectedPlant();
    let companyId = userCompany.plantId;

    if (fromDate && toDate) {
      //console.log("From Date:", fromDate);
      //console.log("To Date:", toDate);

      // get the filter param values
      let fromDate_val = moment(new Date(fromDate)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      let toDate_val = moment(new Date(toDate)).format("YYYY-MM-DD HH:mm:ss");
      //console.log("From Date:" + fromDate_val + " ToDate:" + toDate_val);
      // validate the mandatory fields

      if (reportStatus == null || reportStatus.length === 0) {
        alert("Trip Status can't be empty");
        return;
      }

      if (companyId == null) {
        alert("Company id can't be empty");
        return;
      }
      if (fromDate_val == null) {
        alert("From date can't be empty");

        return;
      }
      if (toDate_val == null) {
        alert("To date can't be empty");
        return;
      }

      // form the request json
      //console.log("Status of Report : " + reportStatus);
      let dateJson = {};
      if (reportStatus === "All") {
        dateJson = {
          companyId: companyId,

          fromDate: fromDate_val,
          toDate: toDate_val,
        };
      } else {
        dateJson = {
          companyId: companyId,
          status: reportStatus,
          fromDate: fromDate_val,
          toDate: toDate_val,
        };
      }
      console.log("data", dateJson);
      // const dateJson = {
      //   companyId: companyId,
      //   status :reportStatus,
      //   fromDate: fromDate_val,
      //   toDate: toDate_val,

      // };
      let tripsListResponse = await TripServices.getAllTripsFromT4U(dateJson);
      console.log("Trips Response:" + JSON.stringify(tripsListResponse));
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
              planDate: moment(new Date(trip.plan.planDate)).format(
                "DD-MM-YYYY"
              ),
              vehicleNo: trip.vehicle ? trip.vehicle.registrationNo : "",
              tripType: trip ? trip.tripType : "",
              transporter: trip.transporter ? trip.transporter.name : "",
              driverName: trip.driverName,
              driverMobile: trip.driverMobile,
              lastCommunication: "",
              route: trip.route ? trip.route.code : "",
              source: trip.route ? trip.route.source.name : "",
              destination: trip.route ? trip.route.destination.name : "",
              plannedStartDate: trip.plannedStartDate
                ? moment(new Date(trip.plannedStartDate)).format(
                    "DD-MM-YYYY hh:mm"
                  )
                : "",
              actualStartDate: trip.actualStartDate
                ? moment(new Date(trip.actualStartDate)).format(
                    "DD-MM-YYYY hh:mm"
                  )
                : "",
              plannedEndDate: trip.plannedEndDate
                ? moment(new Date(trip.plannedEndDate)).format(
                    "DD-MM-YYYY hh:mm"
                  )
                : "",
              actualEndDate: trip.actualEndDate
                ? moment(new Date(trip.actualEndDate)).format(
                    "DD-MM-YYYY hh:mm"
                  )
                : "",
              plannedDistance: trip.plannedDistance,
              actualDuration: trip.actualDuration
                ? convertMinutesToHHMM(trip.actualDuration)
                : "",

              actualDistance: trip.actualDistance,
              plannedDuration: trip.plannedDuration
                ? convertMinutesToHHMM(trip.plannedDuration)
                : "",

              status: trip.status,
              trip: trip,
            },
          ])
        );
        // detentionRows.shift();
      } else {
        if (tripsListResponse.code === 208) {
          alert("No Trips Found");
        }
        //console.log("Error" + JSON.stringify(tripsListResponse));
        //console.log("Some thing went worng");
      }
      // Perform additional actions with the selected dates here
    } else {
      //console.log("Please select both From and To dates.");
      alert("Select Proper Dates");
    }
  }

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

  return (
    <Grid container style={containerStyle}>
      <h3 style={{ marginLeft: "8px" }}>Trip Report</h3>
      <Grid item xs={12} style={ItemStyle}>
        <div>
          <Paper elevation={2}>
            <div style={{ padding: "8px", display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ margin: "8px" }}>
                  {" "}
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
                    label="Select From Date"
                    value={fromDate}
                    onChange={handleFromDateTimeChange}
                  />
                </div>

                <div style={{ margin: "8px" }}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} variant="outlined" fullWidth />
                    )}
                    sx={{
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "blue", // Change the outline color here
                        },
                    }}
                    format={"DD-MM-YYYY HH:mm:ss"}
                    label="Select To Date"
                    value={toDate}
                    onChange={handleToDateTimeChange}
                    disabled={!fromDate} // Disable the "To" date picker if "From" date is not selected
                  />
                </div>
              </LocalizationProvider>
              <FormControl sx={formControlStyle}>
                <InputLabel id="demo-simple-select-standard-label">
                  Select Status of Trip
                </InputLabel>
                <Select
                  id="reportStatus"
                  value={reportStatus}
                  onChange={handleReportStatus}
                  label="Select Trips Status"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"OPEN"}>Open</MenuItem>
                  <MenuItem value={"CLOSED"}>Closed</MenuItem>
                </Select>
                <FormHelperText></FormHelperText>
              </FormControl>
              <Button
                variant="contained"
                style={{
                  borderRadius: "5px",
                  padding: "16px",
                  margin: "8px",
                  width: "auto",
                  height: "auto",
                }}
                onClick={(e) => {
                  getTripsBasedOnCondition(e);
                }}
              >
                Search
              </Button>
            </div>
          </Paper>
        </div>
      </Grid>
      <Grid item xs={12} style={ItemStyle}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
          <ThemeProvider theme={theme}>
            <div style={{ height: 400, width: "100%", overflow: "scroll" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                columnVisibilityModel={{ trip: false, tripId: false }}
                rowsPerPageOptions={[5, 10, 25]}
                scrollbarSize={10}
                onCellClick={(params) => {
                  if (params.field === "planNo") {
                    handlePlanClick(params.row.trip.plan);
                  }
                  if (params.field === "vehicleNo") {
                    handleVehicleClick(params.row.trip);
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
              maxHeight: "80vh", // Limit the height to 80% of the viewport height
              overflowY: "auto", // Enable vertical scrolling if content overflows
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Plan Details:
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
            </table>
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
            <table>
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
                  <b>Delivery Date:</b>
                </td>
                <td>{deliveryPoint}</td>
                <td>&nbsp;</td>
              </tr>
            </table>
            <DataGrid
              rows={routeRows}
              columns={routeColumns}
              pageSize={10}
              autoHeight
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
              maxWidth: "800px",
              padding: "20px",
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
                      <td>Duration</td> <td>{tsDuration}(HH:mm)</td>
                      {/* <td>Travel Time</td> <td>{tsTravelTime}(HH:mm)</td> */}
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
                      <td>Distance Travelled</td> <td>{tsDistance} Kms</td>
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
                  style={{ margin: "4px" }}
                  onClick={handleOpenTripSummary}
                >
                  close
                </Button>
                <Button
                  variant="contained"
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
  );
}

export default VehiclesOnTrip;
